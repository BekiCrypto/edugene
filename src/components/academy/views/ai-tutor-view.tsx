"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import {
  Sparkles, Send, BookOpen, FileText, Layers, Calendar,
  Loader2, Bot, User, ChevronDown,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAcademy } from "@/lib/academy-store";
import { Mascot } from "@/components/academy/mascot";
import { toast } from "sonner";
import type { AgeBand } from "@/lib/age-bands";

interface Message {
  role: "user" | "ai";
  content: string;
  type?: string;
  deckId?: string;
}

const ACTIONS = [
  { id: "tutor", label: "Ask Tutor", icon: Sparkles, desc: "Ask any question about the lesson" },
  { id: "explain", label: "Explain", icon: BookOpen, desc: "Get a deep explanation of the lesson" },
  { id: "summarize", label: "Summarize", icon: FileText, desc: "Quick revision summary" },
  { id: "quiz", label: "Make Quiz", icon: FileText, desc: "5 practice questions with answers" },
  { id: "flashcards", label: "Flashcards", icon: Layers, desc: "8 AI-generated flashcards (auto-saved)" },
  { id: "study-plan", label: "Study Plan", icon: Calendar, desc: "7-day mastery plan" },
] as const;

export function AITutorView() {
  const { user, lessonId, setView } = useAcademy();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [action, setAction] = useState<string>("tutor");
  const [loading, setLoading] = useState(false);
  const [lesson, setLesson] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const ageBand = (user?.ageBand as AgeBand) || "scholars";

  useEffect(() => {
    if (!lessonId) return;
    // Try to fetch lesson context
    fetch(`/api/academy/lessons?subjectId=${useAcademy.getState().subjectId}&grade=${useAcademy.getState().grade}`)
      .then((r) => r.json())
      .then((d) => {
        const l = d.lessons?.find((x: any) => x.id === lessonId);
        if (l) setLesson(l);
      })
      .catch(() => {});
  }, [lessonId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (loading) return;
    const userMsg = input.trim() || (action !== "tutor" ? `Run: ${action}` : "");
    if (!userMsg && action === "tutor") return;
    // If no lesson is selected and action needs content, use input as customText
    if (!lessonId && action !== "tutor" && !input.trim()) {
      toast.error("Please type some text or open a lesson first");
      return;
    }

    const newMessages: Message[] = [...messages, { role: "user", content: userMsg, type: action }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const payload: any = {
        type: action,
        lessonId: lessonId || undefined,
        prompt: action === "tutor" ? userMsg : undefined,
        ageBand,
      };
      // If no lesson and user typed text, use it as custom text for content-based actions
      if (!lessonId && action !== "tutor" && userMsg && userMsg.length > 20) {
        payload.customText = userMsg;
      }
      const res = await fetch("/api/academy/ai-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setMessages([
        ...newMessages,
        {
          role: "ai",
          content: data.response,
          type: action,
          deckId: data.deckId,
        },
      ]);

      if (data.deckId) {
        toast.success("Flashcards generated!", {
          description: "Saved to your flashcard decks.",
          action: { label: "Review", onClick: () => setView("flashcards") },
        });
      }
    } catch (e: any) {
      toast.error("AI request failed", { description: e.message });
      setMessages([
        ...newMessages,
        { role: "ai", content: "Sorry, I couldn't process that. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="text-brand" size={20} />
          <h1 className="text-2xl font-bold">AI Study Buddy</h1>
          <Badge variant="outline" className="ml-auto">Powered by EduGene AI</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {lesson
            ? `Context: ${lesson.title}`
            : "Ask me anything, or pick an action below to generate study materials."}
        </p>
      </div>

      {/* Action picker */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
        {ACTIONS.map((a) => {
          const Icon = a.icon;
          return (
            <button
              key={a.id}
              onClick={() => setAction(a.id)}
              className={`p-3 rounded-lg border text-left transition-all ${
                action === a.id
                  ? "border-brand bg-brand-soft/50"
                  : "border-border hover:border-brand/40 hover:bg-muted/50"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon size={16} className={action === a.id ? "text-brand" : "text-muted-foreground"} />
                <span className="text-sm font-medium">{a.label}</span>
              </div>
              <div className="text-xs text-muted-foreground leading-snug">{a.desc}</div>
            </button>
          );
        })}
      </div>

      {/* Chat */}
      <Card className="flex flex-col h-[60vh] min-h-[400px]">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
          {messages.length === 0 && (
            <div className="h-full flex items-center justify-center">
              <Mascot
                band={ageBand}
                size="lg"
                message="Hi! I'm your AI study buddy. Ask me to explain a topic, generate flashcards, or build a study plan. I learn from your lessons!"
              />
            </div>
          )}
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.role === "ai" && (
                <div className="w-8 h-8 rounded-full bg-brand-soft flex items-center justify-center shrink-0">
                  <Bot size={16} className="text-brand" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl p-3 ${
                  m.role === "user"
                    ? "bg-brand text-brand-foreground rounded-tr-sm"
                    : "bg-muted rounded-tl-sm"
                }`}
              >
                {m.role === "ai" ? (
                  <div className="prose prose-sm dark:prose-invert max-w-none [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0 [&_h1]:text-base [&_h1]:font-bold [&_h2]:text-sm [&_h2]:font-bold [&_h3]:text-sm [&_h3]:font-semibold [&_code]:bg-muted [&_code]:px-1 [&_code]:rounded [&_pre]:bg-muted [&_pre]:p-2 [&_pre]:rounded">
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-sm whitespace-pre-wrap">{m.content}</p>
                )}
                {m.deckId && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-2"
                    onClick={() => setView("flashcards")}
                  >
                    <Layers size={14} className="mr-1" /> Review flashcards
                  </Button>
                )}
              </div>
              {m.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <User size={16} className="text-muted-foreground" />
                </div>
              )}
            </motion.div>
          ))}
          {loading && (
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-soft flex items-center justify-center">
                <Bot size={16} className="text-brand" />
              </div>
              <div className="bg-muted rounded-2xl rounded-tl-sm p-4 flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                <span className="text-sm text-muted-foreground">Thinking...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t p-3 flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={
              action === "tutor"
                ? "Ask anything about your lesson..."
                : `Press send to run "${action}" ${lesson ? `on "${lesson.title}"` : ""}`
            }
            className="min-h-[44px] max-h-32 resize-none"
            rows={1}
          />
          <Button onClick={handleSend} disabled={loading} size="icon" className="h-11 w-11 shrink-0">
            <Send size={18} />
          </Button>
        </div>
      </Card>
    </div>
  );
}
