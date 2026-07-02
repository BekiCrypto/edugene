/**
 * EduGene Zustand store — central app state.
 * Holds navigation, selections, auth, progress, XP, badges, streaks.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AgeBand } from "@/lib/age-bands";

export type View =
  | "home"
  | "auth"
  | "subjects"
  | "lessons"
  | "lesson"
  | "quiz"
  | "exams"
  | "exam"
  | "mindmaps"
  | "mindmap"
  | "dashboard"
  | "flashcards"
  | "notes"
  | "ai-tutor"
  | "audio"
  | "progress"
  | "achievements"
  | "downloads"
  | "docs"
  | "parent";

export interface ProgressItem {
  itemId: string;
  itemType: "lesson" | "quiz" | "exam" | "flashcard" | "lesson-note";
  status: "not-started" | "in-progress" | "completed";
  scorePercent?: number | null;
  bestScore?: number | null;
  attempts: number;
  xpEarned?: number;
}

export interface AchievementItem {
  code: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

export interface BadgeItem {
  code: string;
  title: string;
  description: string;
  icon: string;
  tier: string;
  xpReward: number;
  unlockedAt: string;
}

export interface QuestItem {
  id: string;
  type: string;
  title: string;
  description: string;
  target: number;
  progress: number;
  xpReward: number;
  completed: boolean;
}

export interface UserSession {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: string;
  gradeLevel: number | null;
  ageBand: string | null;
}

interface EduGeneState {
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

  // Student identity (legacy fallback for non-auth)
  studentKey: string;
  setStudentKey: (k: string) => void;

  // Auth
  user: UserSession | null;
  setUser: (u: UserSession | null) => void;

  // Progress + gamification
  progress: Record<string, ProgressItem>;
  achievements: AchievementItem[];
  badges: BadgeItem[];
  quests: QuestItem[];
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  setProgress: (items: ProgressItem[]) => void;
  upsertProgress: (item: ProgressItem) => void;
  setAchievements: (items: AchievementItem[]) => void;
  setBadges: (items: BadgeItem[]) => void;
  setQuests: (items: QuestItem[]) => void;
  setTotalXp: (xp: number) => void;
  addXp: (xp: number) => void;
  setStreak: (current: number, longest: number) => void;

  // Online/offline
  isOnline: boolean;
  setOnline: (b: boolean) => void;

  // Dark mode
  dark: boolean;
  toggleDark: () => void;
}

const keyOf = (item: { itemId: string; itemType: string }) =>
  `${item.itemType}:${item.itemId}`;

export const useAcademy = create<EduGeneState>()(
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

      studentKey: "student-anon",
      setStudentKey: (k) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("academy.studentKey", k);
        }
        set({ studentKey: k, progress: {}, achievements: [], badges: [], quests: [], totalXp: 0 });
      },

      user: null,
      setUser: (u) => set({ user: u }),

      progress: {},
      achievements: [],
      badges: [],
      quests: [],
      totalXp: 0,
      currentStreak: 0,
      longestStreak: 0,
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
      setBadges: (items) => set({ badges: items }),
      setQuests: (items) => set({ quests: items }),
      setTotalXp: (xp) => set({ totalXp: xp }),
      addXp: (xp) => set({ totalXp: get().totalXp + xp }),
      setStreak: (current, longest) =>
        set({ currentStreak: current, longestStreak: longest }),

      isOnline: true,
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
      name: "edugene-store",
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
