import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getIdentityFromRequest } from "@/lib/identity";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

export const dynamic = "force-dynamic";

const AUDIO_CACHE_DIR = path.join(process.cwd(), "public", "audio-cache");
const MAX_CHUNK = 950; // safe under 1024 limit

function splitTextIntoChunks(text: string, maxLength = MAX_CHUNK): string[] {
  const chunks: string[] = [];
  const sentences = text.match(/[^.!?]+[.!?]+|\S[^.!?]*$/g) || [text];
  let current = "";
  for (const sentence of sentences) {
    if ((current + sentence).length <= maxLength) {
      current += sentence;
    } else {
      if (current) chunks.push(current.trim());
      if (sentence.length > maxLength) {
        // hard split very long sentences
        for (let i = 0; i < sentence.length; i += maxLength) {
          chunks.push(sentence.slice(i, i + maxLength).trim());
        }
        current = "";
      } else {
        current = sentence;
      }
    }
  }
  if (current) chunks.push(current.trim());
  return chunks.filter(Boolean);
}

// POST /api/academy/tts — generate (or fetch cached) audio for text
// Body: { text, voice?, speed?, itemType?, itemId?, title? }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      text,
      voice = "tongtong",
      speed = 1.0,
      itemType = "custom",
      itemId,
      title,
    } = body;

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json({ error: "text is required" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    const identity = await getIdentityFromRequest(body.studentKey);

    // Check cache by hash of text+voice+speed
    const hash = crypto
      .createHash("sha1")
      .update(`${text}|${voice}|${speed}`)
      .digest("hex")
      .slice(0, 16);
    const audioPath = `/audio-cache/${hash}.wav`;
    const fullPath = path.join(AUDIO_CACHE_DIR, `${hash}.wav`);

    // Check DB cache
    const existing = await db.audioDescription.findFirst({
      where: { audioPath, studentKey: identity.studentKey },
    });

    if (existing) {
      return NextResponse.json({
        audioUrl: audioPath,
        cached: true,
        id: existing.id,
      });
    }

    // Check filesystem cache (another student generated same audio)
    let fileExists = false;
    try {
      await fs.access(fullPath);
      fileExists = true;
    } catch {
      // not on disk
    }

    if (!fileExists) {
      // Generate audio via z-ai-web-dev-sdk
      const ZAI = (await import("z-ai-web-dev-sdk")).default;
      const zai = await ZAI.create();

      const chunks = splitTextIntoChunks(text.trim());
      const buffers: Buffer[] = [];

      for (const chunk of chunks) {
        const response = await zai.audio.tts.create({
          input: chunk,
          voice,
          speed,
          response_format: "wav",
          stream: false,
        });
        const arrayBuffer = await response.arrayBuffer();
        buffers.push(Buffer.from(new Uint8Array(arrayBuffer)));
      }

      // For single chunk: write directly. For multiple: concatenate WAV files
      // (Simple approach: just write the first chunk — TTS API returns full WAV)
      // For better UX with long text, we concatenate PCM data stripping headers
      const finalBuffer = buffers.length === 1
        ? buffers[0]
        : await concatenateWav(buffers);

      await fs.mkdir(AUDIO_CACHE_DIR, { recursive: true });
      await fs.writeFile(fullPath, finalBuffer);
    }

    // Save to DB
    const record = await db.audioDescription.create({
      data: {
        userId: identity.userId,
        studentKey: identity.studentKey,
        itemType,
        itemId: itemId || null,
        title: title || text.slice(0, 80),
        sourceText: text,
        voice,
        speed,
        format: "wav",
        audioPath,
      },
    });

    return NextResponse.json({
      audioUrl: audioPath,
      cached: false,
      id: record.id,
    });
  } catch (error: any) {
    console.error("TTS API error:", error);
    return NextResponse.json(
      { error: error?.message || "TTS generation failed" },
      { status: 500 }
    );
  }
}

// Simple WAV concatenation: strip headers from all but first, recombine PCM data
// NOTE: This works for same-format WAVs from the TTS API. For production use a
// proper audio library; this is a pragmatic simplification.
async function concatenateWav(buffers: Buffer[]): Promise<Buffer> {
  if (buffers.length === 0) return Buffer.alloc(0);
  if (buffers.length === 1) return buffers[0];

  // Parse first WAV header
  const first = buffers[0];
  const sampleRate = first.readUInt32LE(24);
  const channels = first.readUInt16LE(22);
  const bitsPerSample = first.readUInt16LE(34);

  // Extract PCM data from each
  const pcmChunks: Buffer[] = [];
  let totalDataLen = 0;
  for (const buf of buffers) {
    // Standard WAV header is 44 bytes
    const dataStart = 44;
    if (buf.length > dataStart) {
      pcmChunks.push(buf.subarray(dataStart));
      totalDataLen += buf.length - dataStart;
    }
  }

  // Build new WAV
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + totalDataLen, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20); // PCM
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * channels * (bitsPerSample / 8), 28);
  header.writeUInt16LE(channels * (bitsPerSample / 8), 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write("data", 36);
  header.writeUInt32LE(totalDataLen, 40);

  return Buffer.concat([header, ...pcmChunks]);
}
