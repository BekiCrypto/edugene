import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getIdentityFromRequest } from "@/lib/identity";

export const dynamic = "force-dynamic";

// POST /api/academy/ai-tutor
// Body: { type, lessonId?, prompt?, customText?, ageBand? }
// type: "explain" | "summarize" | "quiz" | "flashcards" | "study-plan" | "tutor"
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, lessonId, prompt, customText, ageBand } = body;

    if (!type) {
      return NextResponse.json({ error: "type is required" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    const identity = await getIdentityFromRequest(body.studentKey);

    // Build context from lesson if provided
    let lessonContent = "";
    let lessonTitle = "";
    let lessonSummary = "";
    if (lessonId) {
      const lesson = await db.lesson.findUnique({
        where: { id: lessonId },
        include: { subject: true },
      });
      if (lesson) {
        lessonTitle = lesson.title;
        lessonSummary = lesson.summary;
        lessonContent = `${lesson.content}\n\nKey Terms: ${lesson.keyTerms}\n\nStudy Guide: ${lesson.studyGuide}`;
      }
    }
    if (customText) {
      lessonContent = customText;
      lessonTitle = "Custom text";
    }

    const ZAI = (await import("z-ai-web-dev-sdk")).default;
    const zai = await ZAI.create();

    // Build system + user prompts based on type
    const bandTone =
      ageBand === "sprouts"
        ? "Use simple words, short sentences, and an encouraging tone for a 6-8 year old. Use analogies to everyday things."
        : ageBand === "explorers"
        ? "Use friendly, adventurous language for a 9-11 year old. Include one curiosity-sparking question."
        : ageBand === "masters"
        ? "Be concise and exam-focused for a 16-18 year old preparing for high-stakes exams. Include exam technique tips."
        : "Be clear, academically rigorous, and age-appropriate for a 12-15 year old.";

    let systemPrompt = `You are EduGene AI, an expert K-12 tutor. ${bandTone} Always be accurate, encouraging, and pedagogically sound. Use Markdown for formatting.`;
    let userPrompt = "";

    switch (type) {
      case "explain":
        userPrompt = `Explain this lesson topic in depth for a student:\n\nTitle: ${lessonTitle}\nSummary: ${lessonSummary}\n\nContent:\n${lessonContent}\n\n${prompt ? `Specific question: ${prompt}` : "Provide a clear, thorough explanation with examples."}`;
        break;
      case "summarize":
        userPrompt = `Create a concise but comprehensive summary of this lesson for revision. Use bullet points and bold key terms.\n\nTitle: ${lessonTitle}\nContent:\n${lessonContent}`;
        break;
      case "quiz":
        userPrompt = `Generate 5 multiple-choice practice questions based on this lesson. Format each as:\n**Q1.** [question]\nA) [option]\nB) [option]\nC) [option]\nD) [option]\n**Answer:** [letter]. **Explanation:** [why]\n\nLesson content:\n${lessonContent}`;
        break;
      case "flashcards":
        userPrompt = `Generate 8 flashcards from this lesson content. Format as JSON array: [{"front": "question or term", "back": "answer or definition"}]. Only output the JSON, no other text.\n\nLesson content:\n${lessonContent}`;
        break;
      case "study-plan":
        userPrompt = `Create a 7-day study plan to master this topic. For each day, list: focus area, time estimate, and 2-3 specific activities.\n\nTopic: ${lessonTitle}\nContent summary: ${lessonSummary}`;
        break;
      case "tutor":
      default:
        userPrompt = prompt || `Help me understand: ${lessonTitle}`;
        if (lessonContent) {
          systemPrompt += `\n\nYou are tutoring on this lesson:\n${lessonContent.slice(0, 3000)}`;
        }
        break;
    }

    const completion = await zai.chat.completions.create({
      messages: [
        { role: "assistant", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      thinking: { type: "disabled" },
    });

    const response = completion.choices[0]?.message?.content || "";

    // Save to DB
    const aiPrompt = await db.aIPrompt.create({
      data: {
        userId: identity.userId,
        studentKey: identity.studentKey,
        type,
        sourceType: lessonId ? "lesson" : "custom",
        sourceId: lessonId || null,
        prompt: userPrompt.slice(0, 2000),
        response,
      },
    });

    // If flashcards type, try to parse and save as a deck
    let deckId = null;
    if (type === "flashcards" && identity.userId) {
      try {
        const cards = JSON.parse(response.replace(/```json|```/g, "").trim());
        if (Array.isArray(cards) && cards.length > 0) {
          const deck = await db.flashcardDeck.create({
            data: {
              userId: identity.userId,
              lessonId: lessonId || null,
              title: `AI Flashcards: ${lessonTitle || "Custom"}`,
              description: "Generated by EduGene AI",
              cards: {
                create: cards.slice(0, 20).map((c: any) => ({
                  front: String(c.front || c.question || ""),
                  back: String(c.back || c.answer || ""),
                })),
              },
            },
          });
          deckId = deck.id;
        }
      } catch {
        // not parseable — return as text
      }
    }

    return NextResponse.json({
      response,
      id: aiPrompt.id,
      deckId,
    });
  } catch (error: any) {
    console.error("AI Tutor API error:", error);
    return NextResponse.json(
      { error: error?.message || "AI request failed" },
      { status: 500 }
    );
  }
}
