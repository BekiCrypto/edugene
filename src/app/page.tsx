"use client";

import { useEffect, useState, useCallback } from "react";
import {
  GraduationCap,
  BookOpen,
  Sigma,
  FlaskConical,
  Globe2,
  Laptop,
  Download,
  Award,
  TrendingUp,
  Sun,
  Moon,
  Wifi,
  WifiOff,
  Search,
  ChevronRight,
  Library,
  Brain,
  FileText,
  Menu,
  X,
  HelpCircle,
  CheckCircle,
  Star,
  Compass,
  Flame,
} from "lucide-react";
import { useAcademy } from "@/lib/academy-store";
import { offlineStore } from "@/lib/offline-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
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

const SUBJECT_ICONS: Record<string, any> = {
  Sigma,
  BookOpen,
  FlaskConical,
  Globe2,
  Laptop,
};

const ACHIEVEMENT_ICONS: Record<string, any> = {
  BookOpen,
  Flame,
  CheckCircle: HelpCircle,
  Award,
  FileText,
  Star,
  Compass,
};

export default function Home() {
  const {
    view,
    setView,
    curriculumId,
    grade,
    dark,
    toggleDark,
    isOnline,
    setOnline,
    studentKey,
    progress,
    achievements,
  } = useAcademy();

  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [curricula, setCurricula] = useState<any[]>([]);
  const [downloadedCount, setDownloadedCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Mark as mounted (client-only) to avoid hydration mismatches with persisted state
  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Apply dark mode class
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // Hydrate persisted store + initialize student key on client only
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Rehydrate zustand-persist store
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

  // Load progress on mount
  useEffect(() => {
    if (!studentKey) return;
    fetch(`/api/academy/progress?studentKey=${encodeURIComponent(studentKey)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.progress) {
          useAcademy.getState().setProgress(
            d.progress.map((p: any) => ({
              itemId: p.itemId,
              itemType: p.itemType,
              status: p.status,
              scorePercent: p.scorePercent,
              bestScore: p.bestScore,
              attempts: p.attempts,
            }))
          );
        }
      })
      .catch(() => {});
    fetch(`/api/academy/achievements?studentKey=${encodeURIComponent(studentKey)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.achievements) {
          useAcademy.getState().setAchievements(d.achievements);
        }
        if (d.newlyUnlocked?.length) {
          for (const a of d.newlyUnlocked) {
            toast.success(`Achievement unlocked: ${a.title}`, {
              description: a.description,
            });
          }
        }
      })
      .catch(() => {});
  }, [studentKey]);

  const currentCurriculum = curricula.find((c) => c.id === curriculumId);

  const navItems = [
    { id: "home" as const, label: "Home", icon: GraduationCap },
    { id: "subjects" as const, label: "Subjects", icon: Library },
    { id: "lessons" as const, label: "Lessons", icon: BookOpen },
    { id: "exams" as const, label: "Exams", icon: FileText },
    { id: "mindmaps" as const, label: "Mind Maps", icon: Brain },
    { id: "progress" as const, label: "Progress", icon: TrendingUp },
    { id: "downloads" as const, label: "Downloads", icon: Download, badge: downloadedCount || undefined },
    { id: "docs" as const, label: "Docs", icon: HelpCircle },
  ];

  const completedCount = Object.values(progress).filter(
    (p) => p.status === "completed"
  ).length;

  // Render a stable SSR shell, then hydrate the actual app on the client.
  // This avoids hydration mismatches from persisted zustand state.
  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
          <div className="container mx-auto px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600" />
            <div className="text-base font-bold">Global Academy</div>
            <div className="text-xs text-muted-foreground">K-12 Learning Platform</div>
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-sm text-muted-foreground">Loading…</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <button
            className="lg:hidden p-2 -ml-2 rounded-md hover:bg-muted"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <button
            onClick={() => setView("home")}
            className="flex items-center gap-2 mr-2"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-sm">
              <GraduationCap size={20} />
            </div>
            <div className="hidden sm:block text-left">
              <div className="font-bold text-base leading-tight">Global Academy</div>
              <div className="text-xs text-muted-foreground leading-tight">K-12 Learning Platform</div>
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

          <div className="flex items-center gap-1 ml-auto">
            <Badge
              variant={isOnline ? "default" : "secondary"}
              className="hidden sm:inline-flex gap-1"
            >
              {isOnline ? <Wifi size={12} /> : <WifiOff size={12} />}
              {isOnline ? "Online" : "Offline"}
            </Badge>
            {completedCount > 0 && (
              <Badge variant="outline" className="hidden sm:inline-flex gap-1">
                <Award size={12} /> {completedCount}
              </Badge>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDark}
              aria-label="Toggle theme"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background">
            <nav className="container mx-auto px-2 py-2 grid grid-cols-2 gap-1">
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
                      "flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-muted",
                      view === item.id && "bg-muted font-medium"
                    )}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
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
        <aside className="hidden lg:block w-60 border-r border-border bg-background/60">
          <nav className="sticky top-[57px] p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors",
                    view === item.id && "bg-muted font-medium"
                  )}
                >
                  <Icon size={16} className="text-muted-foreground" />
                  <span>{item.label}</span>
                  {item.badge ? (
                    <Badge variant="secondary" className="ml-auto text-xs">
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
          {view === "home" && <HomeView curricula={curricula} />}
          {view === "subjects" && <SubjectsView />}
          {view === "lessons" && <LessonsView searchQuery={searchQuery} />}
          {view === "lesson" && <LessonView />}
          {view === "quiz" && <QuizView />}
          {view === "exams" && <ExamsView />}
          {view === "exam" && <ExamView />}
          {view === "mindmaps" && <MindMapsView />}
          {view === "mindmap" && <MindMapView />}
          {view === "progress" && <ProgressView />}
          {view === "downloads" && (
            <DownloadsView
              curricula={curricula}
              onDownloaded={refreshDownloaded}
            />
          )}
          {view === "docs" && <DocsView />}
        </main>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-border bg-background/60">
        <div className="container mx-auto px-4 py-4 text-xs text-muted-foreground flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap size={14} />
            <span>
              Global Academy · Pearson Edexcel · Cambridge · British National · IB · US Common Core
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span>Grades 1–12</span>
            <span>·</span>
            <span>{downloadedCount} grade bundles offline</span>
            <span>·</span>
            <span>{achievements.length} achievements</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
