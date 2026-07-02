/**
 * Exam & Mind Map Builder — generates sample exams and mind maps from
 * the generated lesson content for each subject-grade pair.
 */

export function buildExam(
  subjectLabel: string,
  grade: number,
  lessons: any[]
) {
  const questions: any[] = [];
  let num = 1;
  let totalMarks = 0;

  // 4 MCQs from first lessons' quizzes
  for (let i = 0; i < Math.min(4, lessons.length); i++) {
    const l = lessons[i];
    const q = l.quiz?.questions?.[0];
    if (q) {
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
  }

  // 2 short answer questions
  for (let i = 0; i < Math.min(2, lessons.length); i++) {
    const l = lessons[i];
    questions.push({
      number: num++,
      type: "short-answer",
      prompt: `Explain in 2–3 sentences: ${l.objectives?.[0] || l.summary}`,
      modelAnswer: l.summary,
      marks: 4,
      explanation: "Award full marks for a correct, concise explanation referencing the key terms.",
      topicTag: l.title,
    });
    totalMarks += 4;
  }

  // 1 essay
  if (lessons.length > 0) {
    const l = lessons[lessons.length - 1];
    questions.push({
      number: num++,
      type: "essay",
      prompt: `Discuss in detail: ${l.title}. Use examples and key terms from this unit.`,
      modelAnswer: l.studyGuide || l.summary,
      marks: 10,
      explanation: "Award marks for: definition (2), examples (3), key terms (3), structure (2).",
      topicTag: l.title,
    });
    totalMarks += 10;
  }

  // Determine unit title from first lesson
  const unitTitle = lessons[0]?.title ? `${lessons[0].title} & Related Topics` : `Grade ${grade} Unit`;

  return {
    title: `${subjectLabel} — Grade ${grade} Sample Exam`,
    paperCode: `Paper G${grade}: ${unitTitle}`,
    durationMin: 45 + grade * 3,
    totalMarks,
    description: `End-of-unit sample examination for Grade ${grade} ${subjectLabel}, covering ${lessons.length} topics from this unit. Use this paper to practise timing, question interpretation, and answer structuring.`,
    instructions:
      "Read each question carefully. Answer all questions in the spaces provided. For multiple-choice questions, circle the single best option. For short-answer and essay questions, write in clear, complete sentences. Show working where required. Total marks are shown next to each question.",
    questions,
  };
}

export function buildMindMap(
  subjectLabel: string,
  grade: number,
  lessons: any[]
) {
  const center = `Grade ${grade} ${subjectLabel}`;
  const nodes: any[] = [
    { id: "c", label: center, x: 400, y: 320, color: "#0f172a" },
  ];
  const edges: any[] = [];

  const colors = ["#0ea5e9", "#f97316", "#16a34a", "#a855f7", "#dc2626", "#eab308", "#14b8a6", "#ec4899"];

  // Branch per lesson (up to 8)
  const maxLessons = Math.min(8, lessons.length);
  for (let i = 0; i < maxLessons; i++) {
    const l = lessons[i];
    const angle = (i / maxLessons) * Math.PI * 2 - Math.PI / 2;
    const r = 220;
    const id = `b${i}`;
    nodes.push({
      id,
      label: l.title,
      x: 400 + Math.cos(angle) * r,
      y: 320 + Math.sin(angle) * r,
      color: colors[i % colors.length],
      parent: "c",
    });
    edges.push({ from: "c", to: id });

    // Two leaf key terms per lesson
    const terms = (l.keyTerms || []).slice(0, 2);
    for (let j = 0; j < terms.length; j++) {
      const t = terms[j];
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
    }
  }

  return {
    title: `${subjectLabel} — Grade ${grade} Mind Map`,
    description: `Visual study guide connecting the key topics in Grade ${grade} ${subjectLabel}. Use it for quick revision before quizzes and exams.`,
    centerNode: center,
    nodes,
    edges,
  };
}
