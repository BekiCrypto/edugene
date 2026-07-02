/**
 * Academy App — Seed Script
 * Populates multiple global curricula (Pearson Edexcel, Cambridge, British National,
 * IB, US Common Core) with subjects, lessons, quizzes, sample exams, and mind maps
 * across Grades 1–12.
 *
 * Run: bun run scripts/seed.ts
 */
import { PrismaClient } from "@prisma/client";
import { curriculaSeed } from "./seed-data/curricula";
import { buildSubjectContent } from "./seed-data/content-builder";

const db = new PrismaClient();

async function main() {
  console.log("🧹 Clearing existing data…");
  await db.achievement.deleteMany();
  await db.studentProgress.deleteMany();
  await db.mindMap.deleteMany();
  await db.examQuestion.deleteMany();
  await db.sampleExam.deleteMany();
  await db.quizQuestion.deleteMany();
  await db.quiz.deleteMany();
  await db.lesson.deleteMany();
  await db.subject.deleteMany();
  await db.curriculum.deleteMany();

  console.log("🌱 Seeding curricula, subjects, lessons, quizzes, exams, mind maps…");
  let lessonCount = 0;
  let quizCount = 0;
  let examCount = 0;
  let mapCount = 0;

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
    console.log(`  ✓ ${curriculum.name}`);

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
      for (const grade of gradeSet) {
        const built = buildSubjectContent(s.slug, grade);
        // Lessons + quizzes
        for (let i = 0; i < built.lessons.length; i++) {
          const l = built.lessons[i];
          const lesson = await db.lesson.create({
            data: {
              subjectId: subject.id,
              grade,
              title: l.title,
              slug: `${l.slug}-g${grade}`,
              summary: l.summary,
              objectives: l.objectives.join("\n"),
              content: l.content,
              studyGuide: l.studyGuide,
              keyTerms: JSON.stringify(l.keyTerms),
              examples: JSON.stringify(l.examples),
              durationMin: l.durationMin,
              difficulty: l.difficulty,
              order: i + 1,
            },
          });
          lessonCount++;

          // Per-lesson quiz
          await db.quiz.create({
            data: {
              lessonId: lesson.id,
              title: `${l.title} — Quick Check`,
              description: `Short formative quiz for Grade ${grade} ${s.name}: ${l.title}`,
              timeLimit: l.quiz.timeLimit,
              questions: {
                create: l.quiz.questions.map((q: any) => ({
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

        // Sample exam for the grade (1 per subject-grade where supported)
        for (const ex of built.exams) {
          await db.sampleExam.create({
            data: {
              subjectId: subject.id,
              title: ex.title,
              paperCode: ex.paperCode,
              durationMin: ex.durationMin,
              totalMarks: ex.totalMarks,
              gradeLevel: grade,
              description: ex.description,
              instructions: ex.instructions,
              questions: {
                create: ex.questions.map((q: any) => ({
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
        }

        // Mind map study guide for the grade
        for (const m of built.mindMaps) {
          await db.mindMap.create({
            data: {
              subjectId: subject.id,
              grade,
              title: m.title,
              description: m.description,
              centerNode: m.centerNode,
              nodesJson: JSON.stringify(m.nodes),
              edgesJson: JSON.stringify(m.edges),
            },
          });
          mapCount++;
        }
      }
    }
  }

  console.log("\n📊 Seed summary:");
  console.log(`  Curricula: ${curriculaSeed.length}`);
  console.log(`  Subjects:  ${curriculaSeed.reduce((a, c) => a + c.subjects.length, 0)}`);
  console.log(`  Lessons:   ${lessonCount}`);
  console.log(`  Quizzes:   ${quizCount}`);
  console.log(`  Exams:     ${examCount}`);
  console.log(`  Mind maps: ${mapCount}`);
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
