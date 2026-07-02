"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Headphones, Play, Pause, Loader2, Volume2, VolumeX,
  BookOpen, FileText, Sparkles, Download, Trash2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAcademy } from "@/lib/academy-store";
import { Mascot } from "@/components/academy/mascot";
import { toast } from "sonner";
import type { AgeBand } from "@/lib/age-bands";

const VOICES = [
  { id: "tongtong", name: "Tong Tong — Warm", lang: "Universal" },
  { id: "chuichui", name: "Chui Chui — Lively", lang: "Universal" },
  { id: "xiaochen", name: "Xiao Chen — Calm", lang: "Universal" },
  { id: "jam", name: "Jam — British Gentleman", lang: "English" },
  { id: "kazi", name: "Kazi — Clear Standard", lang: "English" },
  { id: "douji", name: "Dou Ji — Natural", lang: "Universal" },
  { id: "luodo", name: "Luodo — Expressive", lang: "Universal" },
];

interface AudioItem {
  id: string;
  title: string;
  audioPath: string;
  itemType: string;
  createdAt: string;
  voice: string;
}

export function AudioView() {
  const { user, lessonId, setView } = useAcademy();
  const [text, setText] = useState("");
  const [voice, setVoice] = useState("tongtong");
  const [speed, setSpeed] = useState(1);
  const [loading, setLoading] = useState(false);
  const [nowPlaying, setNowPlaying] = useState<string | null>(null);
  const [history, setHistory] = useState<AudioItem[]>([]);
  const [lesson, setLesson] = useState<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const ageBand = (user?.ageBand as AgeBand) || "scholars";

  useEffect(() => {
    if (!lessonId) return;
    fetch(`/api/academy/lessons?subjectId=${useAcademy.getState().subjectId}&grade=${useAcademy.getState().grade}`)
      .then((r) => r.json())
      .then((d) => {
        const l = d.lessons?.find((x: any) => x.id === lessonId);
        if (l) {
          setLesson(l);
          setText(stripMarkdown(l.content));
        }
      })
      .catch(() => {});
  }, [lessonId]);

  const handleGenerate = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text first");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/academy/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: text.trim(),
          voice,
          speed,
          itemType: lesson ? "lesson" : "custom",
          itemId: lessonId || undefined,
          title: lesson?.title || text.slice(0, 60),
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      toast.success("Audio ready!", {
        description: data.cached ? "Loaded from cache" : "Generated fresh",
      });

      // Set nowPlaying immediately so the UI shows the audio player
      setNowPlaying(data.audioUrl);
      // Also try to auto-play
      playAudio(data.audioUrl);
    } catch (e: any) {
      toast.error("Audio generation failed", { description: e.message });
    } finally {
      setLoading(false);
    }
  };

  const playAudio = async (url: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const a = new Audio(url);
    a.playbackRate = speed;
    audioRef.current = a;
    // Set nowPlaying immediately so the UI shows even if autoplay is blocked
    setNowPlaying(url);
    a.onended = () => setNowPlaying(null);
    a.onerror = () => {
      toast.error("Failed to play audio");
      setNowPlaying(null);
    };
    try {
      await a.play();
    } catch {
      // Autoplay blocked — the <audio controls> element lets user start manually
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setNowPlaying(null);
  };

  const loadHistory = () => {
    // Best-effort: list files in audio-cache via a small endpoint or skip
    // For now we'll fetch lesson context to populate
  };

  const handleQuickText = (which: "material" | "guide" | "summary") => {
    if (!lesson) return;
    if (which === "material") setText(stripMarkdown(lesson.content));
    else if (which === "guide") setText(stripMarkdown(lesson.studyGuide));
    else if (which === "summary") {
      setText(`Lesson: ${lesson.title}.\n\nSummary: ${lesson.summary}.\n\nKey terms: ${lesson.keyTerms}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <Headphones className="text-brand" size={20} />
          <h1 className="text-2xl font-bold">Audio Studio</h1>
          <Badge variant="outline" className="ml-auto">AI Text-to-Speech</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Turn any lesson into an audio narration — like NotebookLM for your studies.
          Listen on the go, or download for offline.
        </p>
      </div>

      <Mascot
        band={ageBand}
        size="md"
        message="Paste your text or load a lesson, pick a voice, and hit Generate. Your audio saves automatically for next time!"
        className="mb-4"
      />

      {/* Quick-load buttons */}
      {lesson && (
        <div className="flex flex-wrap gap-2 mb-3">
          <Button size="sm" variant="outline" onClick={() => handleQuickText("material")}>
            <BookOpen size={14} className="mr-1" /> Lesson material
          </Button>
          <Button size="sm" variant="outline" onClick={() => handleQuickText("guide")}>
            <FileText size={14} className="mr-1" /> Study guide
          </Button>
          <Button size="sm" variant="outline" onClick={() => handleQuickText("summary")}>
            <Sparkles size={14} className="mr-1" /> Quick summary
          </Button>
        </div>
      )}

      <Card className="p-4 mb-4">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste any text to convert to audio..."
          className="min-h-[160px] resize-y"
        />
        <div className="text-xs text-muted-foreground mt-1 text-right">
          {text.length} / 4000 characters
        </div>
      </Card>

      {/* Voice + speed controls */}
      <Card className="p-4 mb-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Voice</label>
            <Select value={voice} onValueChange={setVoice}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {VOICES.map((v) => (
                  <SelectItem key={v.id} value={v.id}>
                    {v.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">
              Speed: {speed.toFixed(1)}×
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full h-10"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0.5×</span>
              <span>1×</span>
              <span>2×</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Generate button */}
      <div className="flex gap-2 mb-4">
        <Button
          onClick={handleGenerate}
          disabled={loading || !text.trim()}
          className="flex-1 h-12"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="mr-2 animate-spin" />
              Generating audio...
            </>
          ) : (
            <>
              <Volume2 size={18} className="mr-2" />
              Generate Audio
            </>
          )}
        </Button>
        {nowPlaying && (
          <Button onClick={stopAudio} variant="outline" size="lg" className="h-12">
            <VolumeX size={18} className="mr-2" /> Stop
          </Button>
        )}
      </div>

      {/* Now playing indicator */}
      {nowPlaying && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-4 bg-brand-soft/30 border-brand/30 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex gap-1 items-end h-6">
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-brand rounded-full"
                    animate={{ height: ["30%", "100%", "30%"] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </div>
              <div className="flex-1 text-sm font-medium">Now playing...</div>
              <Button onClick={stopAudio} variant="outline" size="sm">
                <VolumeX size={16} className="mr-1" /> Stop
              </Button>
            </div>
            <audio controls autoPlay src={nowPlaying} className="w-full h-10" />
          </Card>
        </motion.div>
      )}

      {/* Tips */}
      <Card className="p-4 bg-muted/30">
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="font-medium text-foreground">💡 Tips</div>
          <div>• Audio is cached — generating the same text again is instant.</div>
          <div>• Long text is split into chunks and stitched together automatically.</div>
          <div>• Try the "Jam" voice for a British accent, or "Tong Tong" for warmth.</div>
          <div>• Use slower speed (0.8×) for difficult topics, faster (1.5×) for review.</div>
        </div>
      </Card>
    </div>
  );
}

function stripMarkdown(md: string): string {
  return md
    .replace(/#{1,6}\s+/g, "")        // headings
    .replace(/\*\*(.+?)\*\*/g, "$1")  // bold
    .replace(/\*(.+?)\*/g, "$1")      // italic
    .replace(/`(.+?)`/g, "$1")        // inline code
    .replace(/\[(.+?)\]\(.+?\)/g, "$1") // links
    .replace(/^[-*]\s+/gm, "• ")      // list items
    .replace(/^\|.+\|$/gm, "")        // table rows
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
