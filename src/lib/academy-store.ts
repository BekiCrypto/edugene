/**
 * Zustand store — central app state for the Academy app.
 * Holds the current view, selected curriculum, grade, subject, lesson, exam,
 * mind map, progress tracking, and student identity.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type View =
  | "home"
  | "subjects"
  | "lessons"
  | "lesson"
  | "quiz"
  | "exams"
  | "exam"
  | "mindmaps"
  | "mindmap"
  | "progress"
  | "downloads"
  | "docs";

export interface ProgressItem {
  itemId: string;
  itemType: "lesson" | "quiz" | "exam";
  status: "not-started" | "in-progress" | "completed";
  scorePercent?: number | null;
  bestScore?: number | null;
  attempts: number;
}

export interface AchievementItem {
  code: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

interface AcademyState {
  // Navigation
  view: View;
  setView: (v: View) => void;

  // Selections
  curriculumId: string | null;
  grade: number | null;
  subjectId: string | null;
  lessonId: string | null;
  examId: string | null;
  mindMapId: string | null;

  setCurriculum: (id: string | null) => void;
  setGrade: (g: number | null) => void;
  setSubject: (id: string | null) => void;
  setLesson: (id: string | null) => void;
  setExam: (id: string | null) => void;
  setMindMap: (id: string | null) => void;

  // Student identity
  studentKey: string;
  setStudentKey: (k: string) => void;

  // Progress + achievements (in-memory mirror of server)
  progress: Record<string, ProgressItem>;
  achievements: AchievementItem[];
  setProgress: (items: ProgressItem[]) => void;
  upsertProgress: (item: ProgressItem) => void;
  setAchievements: (items: AchievementItem[]) => void;

  // Online/offline status
  isOnline: boolean;
  setOnline: (b: boolean) => void;

  // Dark mode
  dark: boolean;
  toggleDark: () => void;
}

const keyOf = (item: { itemId: string; itemType: string }) =>
  `${item.itemType}:${item.itemId}`;

export const useAcademy = create<AcademyState>()(
  persist(
    (set, get) => ({
      view: "home",
      setView: (v) => set({ view: v }),

      curriculumId: null,
      grade: null,
      subjectId: null,
      lessonId: null,
      examId: null,
      mindMapId: null,

      setCurriculum: (id) => set({ curriculumId: id, subjectId: null, lessonId: null }),
      setGrade: (g) => set({ grade: g, subjectId: null, lessonId: null }),
      setSubject: (id) => set({ subjectId: id, lessonId: null }),
      setLesson: (id) => set({ lessonId: id }),
      setExam: (id) => set({ examId: id }),
      setMindMap: (id) => set({ mindMapId: id }),

      studentKey: "student-anon", // initialized client-side in mounted effect
      setStudentKey: (k) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("academy.studentKey", k);
        }
        set({ studentKey: k, progress: {}, achievements: [] });
      },

      progress: {},
      achievements: [],
      setProgress: (items) => {
        const map: Record<string, ProgressItem> = {};
        for (const it of items) map[keyOf(it)] = it;
        set({ progress: map });
      },
      upsertProgress: (item) => {
        const k = keyOf(item);
        set({ progress: { ...get().progress, [k]: item } });
      },
      setAchievements: (items) => set({ achievements: items }),

      isOnline: true, // initialized client-side in mounted effect
      setOnline: (b) => set({ isOnline: b }),

      dark: false,
      toggleDark: () => {
        const next = !get().dark;
        set({ dark: next });
        if (typeof document !== "undefined") {
          document.documentElement.classList.toggle("dark", next);
        }
      },
    }),
    {
      name: "academy-store",
      skipHydration: true,
      partialize: (s) => ({
        curriculumId: s.curriculumId,
        grade: s.grade,
        studentKey: s.studentKey,
        dark: s.dark,
      }),
    }
  )
);
