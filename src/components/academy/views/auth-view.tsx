"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { GraduationCap, Sparkles, Shield, BookOpen, Trophy, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { AGE_BANDS } from "@/lib/age-bands";

const FEATURES = [
  { icon: BookOpen, title: "5 Curricula", desc: "Pearson, Cambridge, IB, British, US Common Core" },
  { icon: Trophy, title: "Gamified", desc: "XP, levels, badges, streaks, daily quests" },
  { icon: Headphones, title: "Audio Lessons", desc: "AI-generated narration for any content" },
  { icon: Sparkles, title: "AI Tutor", desc: "Explain, summarize, quiz, flashcards" },
];

export function AuthView() {
  const [mode, setMode] = useState<"welcome" | "guest" | "demo">("welcome");
  const [loading, setLoading] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestGrade, setGuestGrade] = useState("5");
  const [demoEmail, setDemoEmail] = useState("");
  const [demoPass, setDemoPass] = useState("");

  const googleEnabled = typeof window !== "undefined" && (window as any).__EDUGENE_GOOGLE__;

  const handleGoogle = async () => {
    setLoading(true);
    await signIn("google", { callbackUrl: "/" });
  };

  const handleGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Use manual form submission for reliable cookie setting across environments
      const csrfRes = await fetch("/api/auth/csrf");
      const { csrfToken } = await csrfRes.json();
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "/api/auth/callback/guest";
      form.innerHTML = `<input name="name" value="${(guestName || "Guest Student").replace(/"/g, '&quot;')}"><input name="grade" value="${guestGrade || "5"}"><input name="csrfToken" value="${csrfToken}"><input name="callbackUrl" value="/">`;
      document.body.appendChild(form);
      form.submit();
    } catch (err: any) {
      setLoading(false);
      toast.error("Sign-in failed", { description: err.message });
    }
  };

  const handleDemo = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const csrfRes = await fetch("/api/auth/csrf");
      const { csrfToken } = await csrfRes.json();
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "/api/auth/callback/demo";
      form.innerHTML = `<input name="email" value="${demoEmail.replace(/"/g, '&quot;')}"><input name="password" value="${demoPass.replace(/"/g, '&quot;')}"><input name="csrfToken" value="${csrfToken}"><input name="callbackUrl" value="/">`;
      document.body.appendChild(form);
      form.submit();
    } catch (err: any) {
      setLoading(false);
      toast.error("Sign-in failed", { description: err.message });
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left — Hero */}
      <div className="lg:w-1/2 bg-gradient-to-br from-brand via-brand to-emerald-700 text-brand-foreground p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 text-9xl">🌱</div>
          <div className="absolute top-40 right-20 text-7xl">🦊</div>
          <div className="absolute bottom-32 left-1/3 text-8xl">🦉</div>
          <div className="absolute bottom-20 right-10 text-9xl">🦌</div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
              <GraduationCap size={24} />
            </div>
            <div>
              <div className="text-xl font-bold">EduGene</div>
              <div className="text-xs opacity-80">K-12 Learning That Grows With You</div>
            </div>
          </div>
        </div>

        <div className="relative z-10 my-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-bold leading-tight mb-4"
          >
            Master Grade 1–12 across 5 global curricula.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg opacity-90 leading-relaxed mb-8"
          >
            AI-powered lessons, audio narration, flashcards, quizzes, sample exams, and mind maps.
            Built for every student to score their best — and love learning along the way.
          </motion.p>

          <div className="grid grid-cols-2 gap-3">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/15"
              >
                <f.icon size={20} className="mb-2 opacity-90" />
                <div className="font-semibold text-sm">{f.title}</div>
                <div className="text-xs opacity-80 leading-snug">{f.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-xs opacity-75">
          Grades 1–3 · 4–6 · 7–9 · 10–12 — each with age-adaptive themes, mascots, and tone.
        </div>
      </div>

      {/* Right — Auth */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-background">
        <div className="w-full max-w-md">
          {mode === "welcome" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-bold mb-2">Welcome 👋</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Sign in to track your progress, earn XP, and unlock your full potential.
              </p>

              <div className="space-y-3">
                {googleEnabled ? (
                  <Button
                    onClick={handleGoogle}
                    disabled={loading}
                    className="w-full h-12 text-base"
                    size="lg"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </Button>
                ) : (
                  <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-lg p-3 text-xs text-amber-800 dark:text-amber-300">
                    <strong>Google OAuth not configured.</strong> Set <code className="bg-amber-100 dark:bg-amber-900/50 px-1 rounded">GOOGLE_CLIENT_ID</code> and <code className="bg-amber-100 dark:bg-amber-900/50 px-1 rounded">GOOGLE_CLIENT_SECRET</code> env vars to enable Google sign-in. Meanwhile, use Guest or Demo accounts below.
                  </div>
                )}

                <Button
                  onClick={() => setMode("guest")}
                  variant="outline"
                  className="w-full h-12 text-base"
                  size="lg"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Continue as Guest Student
                </Button>

                <Button
                  onClick={() => setMode("demo")}
                  variant="ghost"
                  className="w-full h-12 text-sm text-muted-foreground"
                  size="lg"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Demo: Parent / Teacher access
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center mt-6">
                By continuing, you agree to EduGene&apos;s Terms of Service and Privacy Policy.
                No password required for guest mode — your progress is saved locally.
              </p>
            </motion.div>
          )}

          {mode === "guest" && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <button
                onClick={() => setMode("welcome")}
                className="text-sm text-muted-foreground hover:text-foreground mb-4"
              >
                ← Back
              </button>
              <h2 className="text-2xl font-bold mb-2">Hello there! 🌟</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Pick a nickname and your grade — let&apos;s set up your learning adventure.
              </p>
              <form onSubmit={handleGuest} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nickname</Label>
                  <Input
                    id="name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Alex"
                    maxLength={20}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="grade">Grade Level</Label>
                  <select
                    id="grade"
                    value={guestGrade}
                    onChange={(e) => setGuestGrade(e.target.value)}
                    className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((g) => (
                      <option key={g} value={g}>
                        Grade {g} — {AGE_BANDS[
                          g <= 3 ? "sprouts" : g <= 6 ? "explorers" : g <= 9 ? "scholars" : "masters"
                        ].label}
                      </option>
                    ))}
                  </select>
                </div>
                <Button type="submit" disabled={loading} className="w-full h-12 text-base">
                  {loading ? "Setting up..." : "Start Learning →"}
                </Button>
              </form>
            </motion.div>
          )}

          {mode === "demo" && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <button
                onClick={() => setMode("welcome")}
                className="text-sm text-muted-foreground hover:text-foreground mb-4"
              >
                ← Back
              </button>
              <h2 className="text-2xl font-bold mb-2">Demo Access</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Try EduGene as a parent or teacher to see oversight features.
              </p>
              <form onSubmit={handleDemo} className="space-y-4">
                <div>
                  <Label htmlFor="demoEmail">Email</Label>
                  <Input
                    id="demoEmail"
                    type="email"
                    value={demoEmail}
                    onChange={(e) => setDemoEmail(e.target.value)}
                    placeholder="parent@edugene.local or teacher@edugene.local"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="demoPass">Password</Label>
                  <Input
                    id="demoPass"
                    type="password"
                    value={demoPass}
                    onChange={(e) => setDemoPass(e.target.value)}
                    placeholder="Any password works"
                    className="mt-1.5"
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full h-12 text-base">
                  {loading ? "Signing in..." : "Sign in to Demo"}
                </Button>
                <div className="text-xs text-muted-foreground bg-muted rounded-md p-3 space-y-1">
                  <div className="font-medium">Demo accounts:</div>
                  <div>👨‍👩‍👧 Parent: <code className="bg-background px-1 rounded">parent@edugene.local</code></div>
                  <div>👩‍🏫 Teacher: <code className="bg-background px-1 rounded">teacher@edugene.local</code></div>
                  <div className="opacity-75">Any password works in demo mode.</div>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
