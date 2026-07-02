/**
 * EduGene — Comprehensive Seed Script v2
 *
 * Seeds ALL curricula with comprehensive content from the syllabus catalogue.
 * Each subject gets 8 topics per grade × 12 grades = 96 lessons per subject,
 * 5 subjects × 5 curricula = 2,400 lessons, 2,400 quizzes, 600 exams, 600 mind maps.
 *
 * Run: bun run scripts/seed-v2.ts
 */
import { PrismaClient } from "@prisma/client";
import { curriculaSeed } from "./seed-data/curricula";
import { generateLesson } from "./seed-data/content-generator";
import { buildExam, buildMindMap } from "./seed-data/exam-builder";
import { MATH_SYLLABUS } from "./seed-data/syllabus/math-syllabus";
import { SCIENCE_SYLLABUS } from "./seed-data/syllabus/science-syllabus";
import { ENGLISH_SYLLABUS } from "./seed-data/syllabus/english-syllabus";
import { SOCIAL_SYLLABUS } from "./seed-data/syllabus/social-syllabus";
import { COMPUTING_SYLLABUS } from "./seed-data/syllabus/computing-syllabus";

const db = new PrismaClient();

const SYLLABUS_MAP: Record<string, any[]> = {
  mathematics: MATH_SYLLABUS,
  sciences: SCIENCE_SYLLABUS,
  "english-language": ENGLISH_SYLLABUS,
  "social-studies": SOCIAL_SYLLABUS,
  computing: COMPUTING_SYLLABUS,
};

async function main() {
  console.log("🧹 Clearing existing content data…");
  await db.achievement.deleteMany().catch(() => {});
  await db.studentProgress.deleteMany().catch(() => {});
  await db.mindMap.deleteMany();
  await db.examQuestion.deleteMany();
  await db.sampleExam.deleteMany();
  await db.quizQuestion.deleteMany();
  await db.quiz.deleteMany();
  await db.lesson.deleteMany();
  await db.note.deleteMany();
  await db.flashcard.deleteMany();
  await db.flashcardDeck.deleteMany();
  await db.subject.deleteMany();
  await db.curriculum.deleteMany();

  console.log("🌱 Seeding comprehensive content (5 curricula × 5 subjects × 12 grades × 8 topics)…\n");

  let lessonCount = 0;
  let quizCount = 0;
  let examCount = 0;
  let mapCount = 0;
  let questCount = 0;

  for (const c of curriculaSeed) {
    const curriculum = await db.curriculum.create({
      data: {
        code: c.code,
        name: c.name,
        publisher: c.publisher,
        region: c.region,
        description: c.description,
        color: c.color,
        grades: c.grades,
      },
    });
    console.log(`📚 ${curriculum.name}`);

    for (const s of c.subjects) {
      const subject = await db.subject.create({
        data: {
          curriculumId: curriculum.id,
          name: s.name,
          slug: s.slug,
          icon: s.icon,
          color: s.color,
          description: s.description,
          grades: s.grades,
        },
      });

      const gradeSet = expandGrades(s.grades);
      const syllabus = SYLLABUS_MAP[s.slug] || MATH_SYLLABUS;

      for (const grade of gradeSet) {
        // Find the syllabus for this grade
        const gradeSyllabus = syllabus.find((g: any) => g.grade === grade);
        if (!gradeSyllabus) continue;

        const lessonsForGrade: any[] = [];

        // Generate full lessons from syllabus topics
        for (let i = 0; i < gradeSyllabus.topics.length; i++) {
          const topic = gradeSyllabus.topics[i];
          const generated = generateLesson(topic);

          const lesson = await db.lesson.create({
            data: {
              subjectId: subject.id,
              grade,
              title: generated.title,
              slug: `${generated.slug}-g${grade}`,
              summary: generated.summary,
              objectives: generated.objectives.join("\n"),
              content: generated.content,
              studyGuide: generated.studyGuide,
              keyTerms: JSON.stringify(generated.keyTerms),
              examples: JSON.stringify(generated.examples),
              durationMin: generated.durationMin,
              difficulty: generated.difficulty,
              order: i + 1,
            },
          });
          lessonCount++;
          lessonsForGrade.push(generated);

          // Per-lesson quiz
          await db.quiz.create({
            data: {
              lessonId: lesson.id,
              title: `${generated.title} — Quick Check`,
              description: `Formative quiz for Grade ${grade} ${s.name}: ${generated.title}`,
              timeLimit: generated.quiz.timeLimit,
              questions: {
                create: generated.quiz.questions.map((q: any) => ({
                  prompt: q.prompt,
                  options: JSON.stringify(q.options),
                  answerIdx: q.answerIdx,
                  explanation: q.explanation,
                })),
              },
            },
          });
          quizCount++;
        }

        // Sample exam for the grade (1 per subject-grade)
        const exam = buildExam(s.name, grade, lessonsForGrade);
        await db.sampleExam.create({
          data: {
            subjectId: subject.id,
            title: exam.title,
            paperCode: exam.paperCode,
            durationMin: exam.durationMin,
            totalMarks: exam.totalMarks,
            gradeLevel: grade,
            description: exam.description,
            instructions: exam.instructions,
            questions: {
              create: exam.questions.map((q: any) => ({
                number: q.number,
                type: q.type,
                prompt: q.prompt,
                options: q.options ? JSON.stringify(q.options) : null,
                answerIdx: q.answerIdx ?? null,
                modelAnswer: q.modelAnswer,
                marks: q.marks,
                explanation: q.explanation,
                topicTag: q.topicTag ?? null,
              })),
            },
          },
        });
        examCount++;

        // Mind map for the grade
        const mindMap = buildMindMap(s.name, grade, lessonsForGrade);
        await db.mindMap.create({
          data: {
            subjectId: subject.id,
            grade,
            title: mindMap.title,
            description: mindMap.description,
            centerNode: mindMap.centerNode,
            nodesJson: JSON.stringify(mindMap.nodes),
            edgesJson: JSON.stringify(mindMap.edges),
          },
        });
        mapCount++;
      }

      console.log(`  ✓ ${s.name}: ${gradeSet.length} grades seeded`);
    }
    console.log("");
  }

  console.log("📊 Comprehensive seed summary:");
  console.log(`  Curricula:  ${curriculaSeed.length}`);
  console.log(`  Subjects:   ${curriculaSeed.reduce((a, c) => a + c.subjects.length, 0)}`);
  console.log(`  Lessons:    ${lessonCount}`);
  console.log(`  Quizzes:    ${quizCount} (${quizCount * 4} questions)`);
  console.log(`  Exams:      ${examCount}`);
  console.log(`  Mind maps:  ${mapCount}`);
  console.log(`\n✅ Seed complete! Total content items: ${lessonCount + quizCount + examCount + mapCount}`);
}

function expandGrades(spec: string): number[] {
  const set = new Set<number>();
  for (const part of spec.split(",")) {
    const p = part.trim();
    const m = p.match(/^(\d+)\s*[-–]\s*(\d+)$/);
    if (m) {
      const a = parseInt(m[1], 10);
      const b = parseInt(m[2], 10);
      for (let g = a; g <= b; g++) set.add(g);
    } else if (/^\d+$/.test(p)) {
      set.add(parseInt(p, 10));
    }
  }
  return Array.from(set).sort((a, b) => a - b);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
