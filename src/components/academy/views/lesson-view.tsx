"use client";

import { useEffect, useState, useMemo } from "react";
import { useAcademy } from "@/lib/academy-store";
import { offlineStore } from "@/lib/offline-store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Clock,
  ChevronLeft,
  ListChecks,
  Lightbulb,
  BookText,
  FileText,
  ChevronRight,
  Target,
  Quote,
} from "lucide-react";
import { Markdown } from "@/components/academy/markdown";

export function LessonView() {
  const {
    curriculumId,
    grade,
    subjectId,
    lessonId,
    setLesson,
    setView,
  } = useAcademy();
  const [lesson, setLessonState] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [allLessons, setAllLessons] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("material");

  useEffect(() => {
    if (!lessonId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    (async () => {
      // Try offline first
      if (curriculumId && grade && subjectId) {
        const bundle = await offlineStore.getBundle(curriculumId, grade);
        if (bundle) {
          const subj = bundle.subjects.find((s: any) => s.subject.id === subjectId);
          if (subj) {
            setAllLessons(subj.lessons);
            const l = subj.lessons.find((x: any) => x.id === lessonId);
            if (l) {
              setLessonState(l);
              setLoading(false);
              return;
            }
          }
        }
      }
      // Network fallback
      try {
        const r = await fetch(`/api/academy/lessons?subjectId=${subjectId}&grade=${grade}`);
        const d = await r.json();
        if (d.lessons) {
          setAllLessons(d.lessons);
          const l = d.lessons.find((x: any) => x.id === lessonId);
          setLessonState(l);
        }
      } catch {}
      setLoading(false);
    })();
  }, [lessonId, curriculumId, grade, subjectId]);

  const keyTerms = useMemo(
    () => (lesson ? safeParse(lesson.keyTerms) || [] : []),
    [lesson]
  );
  const examples = useMemo(
    () => (lesson ? safeParse(lesson.examples) || [] : []),
    [lesson]
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <div className="animate-pulse space-y-3">
          <div className="h-6 w-2/3 bg-muted rounded" />
          <div className="h-32 bg-muted rounded" />
          <div className="h-32 bg-muted rounded" />
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="p-6 text-center">
          <p className="text-sm text-muted-foreground mb-3">Lesson not found.</p>
          <Button onClick={() => setView("lessons")}>Back to lessons</Button>
        </Card>
      </div>
    );
  }

  const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex >= 0 && currentIndex < allLessons.length - 1
      ? allLessons[currentIndex + 1]
      : null;
  const quiz = lesson.quizzes?.[0];

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <button
        onClick={() => setView("lessons")}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-3"
      >
        <ChevronLeft size={14} /> All lessons
      </button>

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="outline">Lesson {lesson.order}</Badge>
          <Badge variant="outline" className="capitalize">
            {lesson.difficulty}
          </Badge>
          <span className="text-xs text-muted-foreground flex items-center gap-1 ml-auto">
            <Clock size={12} /> {lesson.durationMin} min
          </span>
        </div>
        <h1 className="text-2xl font-bold mb-2">{lesson.title}</h1>
        <p className="text-sm text-muted-foreground">{lesson.summary}</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 sm:grid-cols-4 mb-4">
          <TabsTrigger value="material" className="text-xs sm:text-sm">
            <BookText size={14} className="sm:mr-1" /> Material
          </TabsTrigger>
          <TabsTrigger value="guide" className="text-xs sm:text-sm">
            <Lightbulb size={14} className="sm:mr-1" /> Study Guide
          </TabsTrigger>
          <TabsTrigger value="terms" className="text-xs sm:text-sm">
            <ListChecks size={14} className="sm:mr-1" /> Key Terms
          </TabsTrigger>
          <TabsTrigger value="examples" className="text-xs sm:text-sm">
            <Quote size={14} className="sm:mr-1" /> Examples
          </TabsTrigger>
        </TabsList>

        <TabsContent value="material" className="space-y-3">
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-3 text-sm font-medium text-muted-foreground">
              <Target size={14} /> Learning objectives
            </div>
            <ul className="list-disc pl-5 text-sm space-y-1 mb-4">
              {lesson.objectives?.split("\n").filter(Boolean).map((o: string, i: number) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
            <Markdown content={lesson.content} />
          </Card>
        </TabsContent>

        <TabsContent value="guide" className="space-y-3">
          <Card className="p-5 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900">
            <div className="flex items-center gap-2 mb-3 text-sm font-medium text-amber-700 dark:text-amber-400">
              <Lightbulb size={14} /> Quick revision notes
            </div>
            <Markdown content={lesson.studyGuide} />
          </Card>
        </TabsContent>

        <TabsContent value="terms" className="space-y-2">
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-3 text-sm font-medium text-muted-foreground">
              <ListChecks size={14} /> Key terminology
            </div>
            <div className="space-y-2">
              {keyTerms.map((t: any, i: number) => (
                <div key={i} className="border-l-2 border-teal-400 pl-3 py-1">
                  <div className="font-semibold text-sm">{t.term}</div>
                  <div className="text-sm text-muted-foreground">{t.definition}</div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="space-y-2">
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-3 text-sm font-medium text-muted-foreground">
              <Quote size={14} /> Worked examples
            </div>
            <div className="space-y-3">
              {examples.map((ex: any, i: number) => (
                <div key={i} className="p-3 bg-muted/50 rounded-md">
                  <div className="font-semibold text-sm mb-1">{ex.title}</div>
                  <div className="text-sm text-foreground/90 whitespace-pre-wrap">
                    {ex.body}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quiz CTA */}
      {quiz && (
        <Card className="mt-4 p-4 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/30 dark:to-emerald-950/30 border-teal-200 dark:border-teal-900">
          <div className="flex items-center gap-3">
            <FileText size={20} className="text-teal-600 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm">Ready to test yourself?</div>
              <div className="text-xs text-muted-foreground">
                {quiz.questions.length} questions · {quiz.timeLimit} min · instant feedback
              </div>
            </div>
            <Button
              size="sm"
              onClick={() => {
                useAcademy.getState().setLesson(lesson.id);
                setView("quiz");
              }}
            >
              Take quiz <ChevronRight size={14} />
            </Button>
          </div>
        </Card>
      )}

      {/* Prev / Next */}
      <div className="mt-6 flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={!prevLesson}
          onClick={() => setLesson(prevLesson?.id)}
        >
          <ChevronLeft size={14} /> Previous
        </Button>
        <span className="text-xs text-muted-foreground">
          {currentIndex + 1} / {allLessons.length}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={!nextLesson}
          onClick={() => setLesson(nextLesson?.id)}
        >
          Next <ChevronRight size={14} />
        </Button>
      </div>
    </div>
  );
}

function safeParse(v: any): any {
  if (Array.isArray(v)) return v;
  if (v && typeof v === "object") return v;
  if (typeof v === "string") {
    try {
      return JSON.parse(v);
    } catch {
      return [];
    }
  }
  return [];
}
