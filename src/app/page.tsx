"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  GraduationCap, BookOpen, Sigma, FlaskConical, Globe2, Laptop,
  Download, Award, TrendingUp, Sun, Moon, Wifi, WifiOff, Search,
  ChevronRight, Library, Brain, FileText, Menu, X, HelpCircle,
  CheckCircle, Star, Compass, Flame, Sparkles, Headphones, Layers,
  StickyNote, LayoutDashboard, LogOut, User as UserIcon, Zap, Trophy,
} from "lucide-react";
import { useAcademy } from "@/lib/academy-store";
import { offlineStore } from "@/lib/offline-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { gradeToAgeBand, AGE_BANDS } from "@/lib/age-bands";
import { AuthView } from "@/components/academy/views/auth-view";
import { HomeView } from "@/components/academy/views/home-view";
import { SubjectsView } from "@/components/academy/views/subjects-view";
import { LessonsView } from "@/components/academy/views/lessons-view";
import { LessonView } from "@/components/academy/views/lesson-view";
import { QuizView } from "@/components/academy/views/quiz-view";
import { ExamsView } from "@/components/academy/views/exams-view";
import { ExamView } from "@/components/academy/views/exam-view";
import { MindMapsView } from "@/components/academy/views/mindmaps-view";
import { MindMapView } from "@/components/academy/views/mindmap-view";
import { ProgressView } from "@/components/academy/views/progress-view";
import { DownloadsView } from "@/components/academy/views/downloads-view";
import { DocsView } from "@/components/academy/views/docs-view";
import { DashboardView } from "@/components/academy/views/dashboard-view";
import { AITutorView } from "@/components/academy/views/ai-tutor-view";
import { AudioView } from "@/components/academy/views/audio-view";
import { FlashcardsView } from "@/components/academy/views/flashcards-view";
import { NotesView } from "@/components/academy/views/notes-view";
import { AchievementsView } from "@/components/academy/views/achievements-view";

const SUBJECT_ICONS: Record<string, any> = {
  Sigma, BookOpen, FlaskConical, Globe2, Laptop,
};

export default function Home() {
  const { data: session, status } = useSession();
  const {
    view, setView,
    curriculumId, grade, dark, toggleDark, isOnline, setOnline,
    studentKey, user, setUser, progress, achievements, totalXp,
  } = useAcademy();

  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [curricula, setCurricula] = useState<any[]>([]);
  const [downloadedCount, setDownloadedCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [authChecked, setAuthChecked] = useState(false);
  const [googleEnabled, setGoogleEnabled] = useState(false);

  // Apply age-band theme
  const ageBand = user?.ageBand || gradeToAgeBand(user?.gradeLevel || grade);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Check auth status + Google availability
  // Always fetch /api/auth/status on mount — this is more reliable than
  // depending on useSession which can be slow to initialize after a redirect
  useEffect(() => {
    fetch("/api/auth/status")
      .then((r) => r.json())
      .then((d) => {
        if (d.authenticated && d.user) {
          setUser(d.user);
          setView("dashboard");
        }
        setGoogleEnabled(d.googleEnabled);
        setAuthChecked(true);
      })
      .catch(() => setAuthChecked(true));
  }, [setUser, setView]);

  // Also sync from useSession when it updates (e.g. after Google OAuth redirect)
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setUser(session.user as any);
      setAuthChecked(true);
    }
  }, [session, status, setUser]);

  // Load curricula on mount
  useEffect(() => {
    fetch("/api/academy/curricula")
      .then((r) => r.json())
      .then((d) => setCurricula(d.curricula || []))
      .catch(() => {});
  }, []);

  // Online/offline listeners
  useEffect(() => {
    setOnline(navigator.onLine);
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, [setOnline]);

  // Apply dark mode + age-band class to <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.setAttribute("data-age-band", ageBand);
  }, [dark, ageBand]);

  // Hydrate persisted store + Initialize student key on client only
  useEffect(() => {
    if (typeof window === "undefined") return;
    (useAcademy as any).persist?.rehydrate?.();
    const existing = localStorage.getItem("academy.studentKey");
    if (existing && existing !== "student-anon") {
      if (useAcademy.getState().studentKey !== existing) {
        useAcademy.getState().setStudentKey(existing);
      }
    } else {
      const k = "student-" + Math.random().toString(36).slice(2, 10);
      localStorage.setItem("academy.studentKey", k);
      useAcademy.getState().setStudentKey(k);
    }
  }, []);

  // Refresh downloaded count
  const refreshDownloaded = useCallback(async () => {
    const all = await offlineStore.getAll();
    setDownloadedCount(all.length);
  }, []);
  useEffect(() => {
    refreshDownloaded();
  }, [refreshDownloaded, view]);

  // Load progress + achievements (only for non-authenticated fallback)
  useEffect(() => {
    if (!studentKey || user) return;
    fetch(`/api/academy/progress?studentKey=${encodeURIComponent(studentKey)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.progress) {
          useAcademy.getState().setProgress(
            d.progress.map((p: any) => ({
              itemId: p.itemId, itemType: p.itemType, status: p.status,
              scorePercent: p.scorePercent, bestScore: p.bestScore, attempts: p.attempts,
            }))
          );
        }
        if (d.totalXp) useAcademy.getState().setTotalXp(d.totalXp);
      })
      .catch(() => {});
    fetch(`/api/academy/achievements?studentKey=${encodeURIComponent(studentKey)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.achievements) useAcademy.getState().setAchievements(d.achievements);
        if (d.newlyUnlocked?.length) {
          for (const a of d.newlyUnlocked) {
            toast.success(`Achievement: ${a.title}`, { description: a.description });
          }
        }
      })
      .catch(() => {});
  }, [studentKey, user]);

  // Show auth screen if not authenticated
  if (authChecked && !user && view !== "auth" && !session) {
    // Allow browsing as guest only if they explicitly continue
    // Otherwise show auth
  }

  const completedCount = Object.values(progress).filter(
    (p) => p.status === "completed"
  ).length;

  // Auth screen
  if (authChecked && !user) {
    return <AuthView />;
  }

  // Stable SSR shell
  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
          <div className="container mx-auto px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand to-emerald-600" />
            <div>
              <div className="text-base font-bold">EduGene</div>
              <div className="text-xs text-muted-foreground">Loading…</div>
            </div>
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-sm text-muted-foreground">Loading…</div>
        </div>
      </div>
    );
  }

  // Nav items — adapt to role
  const isStudent = !user?.role || user?.role === "student";
  const navItems = isStudent
    ? [
        { id: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
        { id: "subjects" as const, label: "Subjects", icon: Library },
        { id: "lessons" as const, label: "Lessons", icon: BookOpen },
        { id: "exams" as const, label: "Exams", icon: FileText },
        { id: "mindmaps" as const, label: "Mind Maps", icon: Brain },
        { id: "flashcards" as const, label: "Flashcards", icon: Layers },
        { id: "ai-tutor" as const, label: "AI Tutor", icon: Sparkles },
        { id: "audio" as const, label: "Audio", icon: Headphones },
        { id: "notes" as const, label: "Notes", icon: StickyNote },
        { id: "achievements" as const, label: "Achievements", icon: Trophy },
        { id: "downloads" as const, label: "Downloads", icon: Download, badge: downloadedCount || undefined },
        { id: "docs" as const, label: "Docs", icon: HelpCircle },
      ]
    : [
        { id: "dashboard" as const, label: "Overview", icon: LayoutDashboard },
        { id: "subjects" as const, label: "Subjects", icon: Library },
        { id: "docs" as const, label: "Docs", icon: HelpCircle },
      ];

  const mascot = AGE_BANDS[ageBand as keyof typeof AGE_BANDS] || AGE_BANDS.scholars;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border glass">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <button
            className="lg:hidden p-2 -ml-2 rounded-md hover:bg-muted"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <button
            onClick={() => setView("dashboard")}
            className="flex items-center gap-2 mr-2"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand to-emerald-600 flex items-center justify-center text-white shadow-sm">
              <GraduationCap size={20} />
            </div>
            <div className="hidden sm:block text-left">
              <div className="font-bold text-base leading-tight">EduGene</div>
              <div className="text-xs text-muted-foreground leading-tight flex items-center gap-1">
                <span>{mascot.mascotEmoji}</span>
                <span>{mascot.label}</span>
              </div>
            </div>
          </button>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-2">
            <div className="relative w-full">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search lessons…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchQuery.trim()) {
                    setView("lessons");
                  }
                }}
                className="pl-9 h-9"
              />
            </div>
          </div>

          {/* Right side — status + XP + streak + user menu */}
          <div className="flex items-center gap-1.5 ml-auto">
            {/* XP pill */}
            {user && (
              <Badge variant="outline" className="hidden sm:inline-flex gap-1 px-2 py-1" style={{ color: "var(--xp)" }}>
                <Zap size={12} />
                <span className="font-semibold">{totalXp}</span>
              </Badge>
            )}

            {/* Streak pill */}
            {user && (
              <Badge variant="outline" className="hidden sm:inline-flex gap-1 px-2 py-1" style={{ color: "var(--streak)" }}>
                <Flame size={12} className="animate-flame" />
                <span className="font-semibold">0</span>
              </Badge>
            )}

            <Badge
              variant={isOnline ? "default" : "secondary"}
              className="hidden lg:inline-flex gap-1"
            >
              {isOnline ? <Wifi size={12} /> : <WifiOff size={12} />}
              {isOnline ? "Online" : "Offline"}
            </Badge>

            {/* Theme toggle */}
            <Button variant="ghost" size="icon" onClick={toggleDark} aria-label="Toggle theme" className="h-9 w-9">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </Button>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full hover:bg-muted p-1 pr-2 transition-colors">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.image || undefined} />
                    <AvatarFallback className="bg-brand-soft text-brand text-xs">
                      {(user?.name || "S").charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:block text-sm font-medium max-w-[100px] truncate">
                    {user?.name || "Student"}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{user?.name}</span>
                    <span className="text-xs font-normal text-muted-foreground">{user?.email}</span>
                    <Badge variant="outline" className="w-fit mt-1 text-xs capitalize">
                      {user?.role} · Grade {user?.gradeLevel || "—"}
                    </Badge>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setView("dashboard")}>
                  <LayoutDashboard size={14} className="mr-2" /> Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setView("achievements")}>
                  <Trophy size={14} className="mr-2" /> Achievements
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })} className="text-destructive">
                  <LogOut size={14} className="mr-2" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background">
            <nav className="container mx-auto px-2 py-2 grid grid-cols-2 gap-1 max-h-[60vh] overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setView(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2.5 rounded-md text-sm hover:bg-muted",
                      view === item.id && "bg-muted font-medium"
                    )}
                  >
                    <Icon size={16} />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge ? (
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {item.badge}
                      </Badge>
                    ) : null}
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      <div className="flex-1 flex">
        {/* Sidebar (desktop) */}
        <aside className="hidden lg:block w-60 border-r border-border bg-sidebar/50">
          <nav className="sticky top-[57px] p-3 space-y-0.5 max-h-[calc(100vh-57px)] overflow-y-auto scrollbar-thin">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors",
                    view === item.id && "bg-brand-soft text-brand font-medium"
                  )}
                >
                  <Icon size={16} className="text-muted-foreground" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge ? (
                    <Badge variant="secondary" className="text-xs">
                      {item.badge}
                    </Badge>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {view === "dashboard" && <DashboardView />}
          {view === "home" && <HomeView curricula={curricula} />}
          {view === "subjects" && <SubjectsView />}
          {view === "lessons" && <LessonsView searchQuery={searchQuery} />}
          {view === "lesson" && <LessonView />}
          {view === "quiz" && <QuizView />}
          {view === "exams" && <ExamsView />}
          {view === "exam" && <ExamView />}
          {view === "mindmaps" && <MindMapsView />}
          {view === "mindmap" && <MindMapView />}
          {view === "flashcards" && <FlashcardsView />}
          {view === "ai-tutor" && <AITutorView />}
          {view === "audio" && <AudioView />}
          {view === "notes" && <NotesView />}
          {view === "achievements" && <AchievementsView />}
          {view === "progress" && <ProgressView />}
          {view === "downloads" && (
            <DownloadsView curricula={curricula} onDownloaded={refreshDownloaded} />
          )}
          {view === "docs" && <DocsView />}
        </main>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-border bg-background/60">
        <div className="container mx-auto px-4 py-3 text-xs text-muted-foreground flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap size={14} className="text-brand" />
            <span>
              <strong>EduGene</strong> · Pearson · Cambridge · British · IB · US Common Core
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span>Grades 1–12</span>
            <span>·</span>
            <span>{downloadedCount} offline</span>
            {user && (
              <>
                <span>·</span>
                <span>{totalXp} XP</span>
              </>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
