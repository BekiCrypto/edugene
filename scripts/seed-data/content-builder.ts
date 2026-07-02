/**
 * Content builder — generates lessons, per-lesson quizzes, sample exams, and
 * mind map study guides for a (subjectSlug, grade) pair.
 *
 * The content is genuine, age-appropriate, and aligned to the topic progression
 * you would expect from any of the seeded curricula. Each subject has a topic
 * progression table for Grades 1–12; the builder selects 3–5 lessons per grade,
 * one quiz per lesson, one sample exam per grade, and one mind map per grade.
 */

import {
  mathTopics,
  englishTopics,
  scienceTopics,
  socialTopics,
  computingTopics,
  type TopicUnit,
} from "./topics";

export interface BuiltQuiz {
  timeLimit: number;
  questions: {
    prompt: string;
    options: string[];
    answerIdx: number;
    explanation: string;
  }[];
}

export interface BuiltLesson {
  title: string;
  slug: string;
  summary: string;
  objectives: string[];
  content: string;
  studyGuide: string;
  keyTerms: { term: string; definition: string }[];
  examples: { title: string; body: string }[];
  durationMin: number;
  difficulty: "introductory" | "core" | "advanced";
  quiz: BuiltQuiz;
}

export interface BuiltExamQuestion {
  number: number;
  type: "multiple-choice" | "short-answer" | "essay";
  prompt: string;
  options?: string[];
  answerIdx?: number;
  modelAnswer: string;
  marks: number;
  explanation: string;
  topicTag?: string;
}

export interface BuiltExam {
  title: string;
  paperCode: string;
  durationMin: number;
  totalMarks: number;
  description: string;
  instructions: string;
  questions: BuiltExamQuestion[];
}

export interface MindMapNode {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  parent?: string;
}
export interface MindMapEdge {
  from: string;
  to: string;
  label?: string;
}
export interface BuiltMindMap {
  title: string;
  description: string;
  centerNode: string;
  nodes: MindMapNode[];
  edges: MindMapEdge[];
}

export interface BuiltSubjectContent {
  lessons: BuiltLesson[];
  exams: BuiltExam[];
  mindMaps: BuiltMindMap[];
}

const SUBJECT_TOPICS: Record<string, TopicUnit[]> = {
  mathematics: mathTopics,
  "english-language": englishTopics,
  sciences: scienceTopics,
  "social-studies": socialTopics,
  computing: computingTopics,
};

const SUBJECT_LABEL: Record<string, string> = {
  mathematics: "Mathematics",
  "english-language": "English Language",
  sciences: "Sciences",
  "social-studies": "Social Studies",
  computing: "ICT & Computing",
};

export function buildSubjectContent(subjectSlug: string, grade: number): BuiltSubjectContent {
  const topics = SUBJECT_TOPICS[subjectSlug] ?? mathTopics;
  const subjectLabel = SUBJECT_LABEL[subjectSlug] ?? "Subject";
  // For each grade we pick the topic with matching gradeBand, fall back to nearest band.
  const unit = pickUnitForGrade(topics, grade);
  if (!unit) {
    return { lessons: [], exams: [], mindMaps: [] };
  }

  const lessons: BuiltLesson[] = unit.lessons.map((l) => ({
    title: l.title,
    slug: l.slug,
    summary: l.summary,
    objectives: l.objectives,
    content: l.content,
    studyGuide: l.studyGuide,
    keyTerms: l.keyTerms,
    examples: l.examples,
    durationMin: l.durationMin,
    difficulty: l.difficulty,
    quiz: l.quiz,
  }));

  const exams: BuiltExam[] = [
    buildExam(subjectLabel, grade, unit),
  ];

  const mindMaps: BuiltMindMap[] = [
    buildMindMap(subjectLabel, grade, unit),
  ];

  return { lessons, exams, mindMaps };
}

function pickUnitForGrade(topics: TopicUnit[], grade: number): TopicUnit | null {
  // Direct match first
  for (const t of topics) {
    if (gradeMatchesBand(grade, t.gradeBand)) return t;
  }
  // Nearest by midpoint
  let best: TopicUnit | null = null;
  let bestDist = 99;
  for (const t of topics) {
    const [a, b] = t.gradeBand.split("-").map((x) => parseInt(x, 10));
    const mid = (a + b) / 2;
    const d = Math.abs(mid - grade);
    if (d < bestDist) {
      bestDist = d;
      best = t;
    }
  }
  return best;
}

function gradeMatchesBand(grade: number, band: string): boolean {
  const [a, b] = band.split("-").map((x) => parseInt(x, 10));
  return grade >= a && grade <= b;
}

function buildExam(
  subjectLabel: string,
  grade: number,
  unit: TopicUnit
): BuiltExam {
  // Mix MCQ + short answer + essay across lessons
  const questions: BuiltExamQuestion[] = [];
  let num = 1;
  let totalMarks = 0;
  // 4 MCQs from first lessons' quizzes
  for (let i = 0; i < Math.min(4, unit.lessons.length); i++) {
    const l = unit.lessons[i];
    const q = l.quiz.questions[0];
    questions.push({
      number: num++,
      type: "multiple-choice",
      prompt: q.prompt,
      options: q.options,
      answerIdx: q.answerIdx,
      modelAnswer: q.options[q.answerIdx],
      marks: 2,
      explanation: q.explanation,
      topicTag: l.title,
    });
    totalMarks += 2;
  }
  // 2 short answers
  for (let i = 0; i < Math.min(2, unit.lessons.length); i++) {
    const l = unit.lessons[i];
    questions.push({
      number: num++,
      type: "short-answer",
      prompt: `Explain in 2–3 sentences: ${l.objectives[0]}`,
      modelAnswer: l.summary,
      marks: 4,
      explanation:
        "Award full marks for a correct, concise explanation referencing the key terms in the lesson summary.",
      topicTag: l.title,
    });
    totalMarks += 4;
  }
  // 1 essay
  if (unit.lessons.length > 0) {
    const l = unit.lessons[unit.lessons.length - 1];
    questions.push({
      number: num++,
      type: "essay",
      prompt: `Discuss in detail: ${l.title}. Use examples and the key terms from this unit.`,
      modelAnswer: l.studyGuide,
      marks: 10,
      explanation:
        "Award marks for: definition (2), examples (3), use of key terms (3), structure & clarity (2).",
      topicTag: l.title,
    });
    totalMarks += 10;
  }

  return {
    title: `${subjectLabel} — Grade ${grade} ${unit.unitTitle} Sample Exam`,
    paperCode: `Paper G${grade}: ${unit.unitTitle}`,
    durationMin: 45 + grade * 3,
    totalMarks,
    description: `End-of-unit sample examination for Grade ${grade} ${subjectLabel}, aligned with ${unit.unitTitle}. Use this paper to practise timing, question interpretation, and answer structuring.`,
    instructions:
      "Read each question carefully. Answer all questions in the spaces provided. For multiple-choice questions, circle the single best option. For short-answer and essay questions, write in clear, complete sentences. Show working where required. Total marks are shown next to each question.",
    questions,
  };
}

function buildMindMap(
  subjectLabel: string,
  grade: number,
  unit: TopicUnit
): BuiltMindMap {
  const center = unit.unitTitle;
  const nodes: MindMapNode[] = [
    { id: "c", label: center, x: 400, y: 320, color: "#0f172a" },
  ];
  const edges: MindMapEdge[] = [];

  // Branch per lesson
  unit.lessons.forEach((l, i) => {
    const angle = (i / unit.lessons.length) * Math.PI * 2 - Math.PI / 2;
    const r = 220;
    const id = `b${i}`;
    nodes.push({
      id,
      label: l.title,
      x: 400 + Math.cos(angle) * r,
      y: 320 + Math.sin(angle) * r,
      color: SUBJECT_COLOR[i % SUBJECT_COLOR.length],
      parent: "c",
    });
    edges.push({ from: "c", to: id });
    // Two leaf key terms per lesson
    const terms = l.keyTerms.slice(0, 2);
    terms.forEach((t, j) => {
      const leafId = `${id}-${j}`;
      const lr = 90;
      const langle = angle + (j === 0 ? -0.4 : 0.4);
      nodes.push({
        id: leafId,
        label: t.term,
        x: 400 + Math.cos(angle) * r + Math.cos(langle) * lr,
        y: 320 + Math.sin(angle) * r + Math.sin(langle) * lr,
        color: "#475569",
        parent: id,
      });
      edges.push({ from: id, to: leafId, label: "includes" });
    });
  });

  return {
    title: `${subjectLabel} — Grade ${grade} ${unit.unitTitle} Mind Map`,
    description: `Visual study guide connecting the key concepts in ${unit.unitTitle}. Use it for quick revision before quizzes and exams.`,
    centerNode: center,
    nodes,
    edges,
  };
}

const SUBJECT_COLOR = ["#0ea5e9", "#f97316", "#16a34a", "#a855f7", "#dc2626"];
