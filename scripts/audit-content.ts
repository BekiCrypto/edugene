import { db } from '../src/lib/db';

async function main() {
  const curricula = await db.curriculum.findMany({ include: { subjects: true } });
  console.log('=== CURRENT CONTENT AUDIT ===\n');
  
  let totalLessons = 0;
  for (const c of curricula) {
    console.log(`\n${c.name} (${c.code})`);
    for (const s of c.subjects) {
      const lessons = await db.lesson.findMany({
        where: { subjectId: s.id },
        orderBy: { grade: 'asc' },
      });
      console.log(`  ${s.name}: ${lessons.length} lessons total`);
      // Show per-grade breakdown
      const byGrade: Record<number, number> = {};
      for (const l of lessons) {
        byGrade[l.grade] = (byGrade[l.grade] || 0) + 1;
      }
      for (let g = 1; g <= 12; g++) {
        if (byGrade[g]) {
          console.log(`    Grade ${g}: ${byGrade[g]} lessons`);
        }
      }
      totalLessons += lessons.length;
    }
  }
  console.log(`\n=== TOTAL: ${totalLessons} lessons across all curricula ===`);
  
  // Sample a lesson to see content depth
  const sample = await db.lesson.findFirst({ where: { grade: 9, subject: { name: 'Mathematics' } } });
  if (sample) {
    console.log(`\nSample lesson: "${sample.title}"`);
    console.log(`  Content: ${sample.content.length} chars`);
    console.log(`  Study guide: ${sample.studyGuide.length} chars`);
    console.log(`  Key terms: ${sample.keyTerms.length} chars`);
    console.log(`  Examples: ${sample.examples.length} chars`);
  }
}
main().finally(() => process.exit(0));
