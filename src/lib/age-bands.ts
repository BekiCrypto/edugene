/**
 * EduGene age-band design system.
 * Each age band has its own mascot, theme, copy tone, and UI density.
 */

export type AgeBand = "sprouts" | "explorers" | "scholars" | "masters";

export interface AgeBandConfig {
  id: AgeBand;
  label: string;
  gradeRange: string;
  mascotName: string;
  mascotEmoji: string;
  mascotSpecies: string;
  mascotBlurb: string;
  tagline: string;
  tone: string;
  uiDensity: "comfortable" | "default" | "compact";
  celebrationStyle: "confetti" | "sparkles" | "subtle" | "sophisticated";
  features: string[];
}

export const AGE_BANDS: Record<AgeBand, AgeBandConfig> = {
  sprouts: {
    id: "sprouts",
    label: "Little Sprouts",
    gradeRange: "Grades 1–3",
    mascotName: "Sprout",
    mascotEmoji: "🌱",
    mascotSpecies: "Seedling",
    mascotBlurb: "Hi friend! I'm Sprout. Let's grow your brain power together, one tiny step at a time!",
    tagline: "Growing every day!",
    tone: "warm, encouraging, simple words, lots of praise",
    uiDensity: "comfortable",
    celebrationStyle: "confetti",
    features: [
      "Big friendly buttons",
      "Read-aloud on every page",
      "Star rewards",
      "Sticker collection",
    ],
  },
  explorers: {
    id: "explorers",
    label: "Explorers",
    gradeRange: "Grades 4–6",
    mascotName: "Compass",
    mascotEmoji: "🦊",
    mascotSpecies: "Fox",
    mascotBlurb: "Hey explorer! I'm Compass. Ready to discover new ideas and crack some puzzles?",
    tagline: "Curiosity unlocked!",
    tone: "adventurous, curious, friendly, slightly challenging",
    uiDensity: "default",
    celebrationStyle: "sparkles",
    features: [
      "Quest-style lessons",
      "Badge hunting",
      "Streak tracking",
      "Mind maps",
    ],
  },
  scholars: {
    id: "scholars",
    label: "Scholars",
    gradeRange: "Grades 7–9",
    mascotName: "Gene",
    mascotEmoji: "🦉",
    mascotSpecies: "Owl",
    mascotBlurb: "Welcome, scholar. I'm Gene. Together we'll build deep understanding and exam-ready skills.",
    tagline: "Wisdom in progress.",
    tone: "clear, focused, respectful, academically rigorous",
    uiDensity: "default",
    celebrationStyle: "subtle",
    features: [
      "Exam-style questions",
      "AI study buddy",
      "Flashcards & SRS",
      "Audio summaries",
    ],
  },
  masters: {
    id: "masters",
    label: "Masters",
    gradeRange: "Grades 10–12",
    mascotName: "Sage",
    mascotEmoji: "🦌",
    mascotSpecies: "Stag",
    mascotBlurb: "Welcome, master. I'm Sage. Final stretch before your exams — let's make every minute count.",
    tagline: "Mastery awaits.",
    tone: "sophisticated, concise, exam-focused, no fluff",
    uiDensity: "compact",
    celebrationStyle: "sophisticated",
    features: [
      "Past-paper practice",
      "Weak-area analytics",
      "AI tutor 24/7",
      "Study planner",
    ],
  },
};

export function gradeToAgeBand(grade: number | null | undefined): AgeBand {
  if (!grade || grade < 1) return "sprouts";
  if (grade <= 3) return "sprouts";
  if (grade <= 6) return "explorers";
  if (grade <= 9) return "scholars";
  return "masters";
}

export function ageBandList(): AgeBandConfig[] {
  return [AGE_BANDS.sprouts, AGE_BANDS.explorers, AGE_BANDS.scholars, AGE_BANDS.masters];
}
