/**
 * Topic catalogue per subject. Each subject has multiple TopicUnits, one per
 * grade band. The content builder picks the unit whose gradeBand contains the
 * requested grade (or the nearest unit).
 */

export interface TopicQuizQuestion {
  prompt: string;
  options: string[];
  answerIdx: number;
  explanation: string;
}
export interface TopicLesson {
  title: string;
  slug: string;
  summary: string;
  objectives: string[];
  content: string; // markdown
  studyGuide: string; // markdown revision notes
  keyTerms: { term: string; definition: string }[];
  examples: { title: string; body: string }[];
  durationMin: number;
  difficulty: "introductory" | "core" | "advanced";
  quiz: {
    timeLimit: number;
    questions: TopicQuizQuestion[];
  };
}
export interface TopicUnit {
  unitTitle: string;
  gradeBand: string; // e.g. "1-2"
  lessons: TopicLesson[];
}

export { mathTopics } from "./math";
export { englishTopics } from "./english";
export { scienceTopics } from "./science";
export { socialTopics } from "./social";
export { computingTopics } from "./computing";
