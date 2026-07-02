"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  BookOpen,
  FileText,
  Brain,
  Download,
  TrendingUp,
  HelpCircle,
  WifiOff,
  Library,
  Award,
  Search,
} from "lucide-react";

export function DocsView() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
          <HelpCircle size={20} /> Documentation
        </h1>
        <p className="text-sm text-muted-foreground">
          Everything you need to know to get the most out of Global Academy.
        </p>
      </div>

      <Card className="p-5 mb-4">
        <h2 className="font-semibold text-lg mb-2 flex items-center gap-2">
          <GraduationCap size={18} /> What is Global Academy?
        </h2>
        <p className="text-sm text-foreground/90 leading-relaxed mb-2">
          Global Academy is a K-12 learning platform that brings together course
          materials, learning guides, quizzes, sample exams, and mind map study
          guides for five major international curricula. It is designed to make
          learning and exam preparation easier for students from Grade 1 to Grade 12,
          regardless of which curriculum they follow or where they live.
        </p>
        <p className="text-sm text-foreground/90 leading-relaxed">
          Each curriculum is broken down by subject (Mathematics, English Language,
          Sciences, Social Studies, ICT &amp; Computing), and each subject is
          organised by grade. Every grade band has its own lessons with rich course
          content, revision notes, key terminology, worked examples, a formative
          quiz, a sample exam, and a mind map study guide. Everything can be
          downloaded for offline use.
        </p>
      </Card>

      <Card className="p-5 mb-4">
        <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <Library size={18} /> Curricula covered
        </h2>
        <div className="space-y-3">
          <CurriculumRow
            name="Pearson Edexcel International"
            grades="1-12"
            description="International GCSE and International A-Level qualifications studied in over 80 countries. Emphasis on application of knowledge and structured problem solving."
          />
          <CurriculumRow
            name="Cambridge IGCSE & A-Level"
            grades="1-12"
            description="Cambridge Primary, Lower Secondary, IGCSE, and AS/A-Level. Taken in 160+ countries with structured assessment objectives and critical thinking focus."
          />
          <CurriculumRow
            name="British National Curriculum"
            grades="1-12"
            description="Key Stages 1-5 leading to GCSEs and A-Levels. Defines clear programmes of study for every subject with age-appropriate progression."
          />
          <CurriculumRow
            name="International Baccalaureate (IB)"
            grades="1-12"
            description="PYP (3-11), MYP (11-16), and Diploma (16-19). Inquiry-based learning through transdisciplinary themes and the Theory of Knowledge."
          />
          <CurriculumRow
            name="US Common Core (K-12)"
            grades="1-12"
            description="Common Core State Standards for English Language Arts and Mathematics. Emphasises analytical reading, evidence-based writing, and mathematical modelling."
          />
        </div>
      </Card>

      <Card className="p-5 mb-4">
        <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <BookOpen size={18} /> How to use the app
        </h2>
        <ol className="space-y-3 text-sm text-foreground/90">
          <Step number={1} title="Pick your curriculum">
            On the Home tab, choose the curriculum you are studying. Each card shows
            the publisher, region, grade range, and number of subjects.
          </Step>
          <Step number={2} title="Pick your grade">
            Tap the grade button (1–12). Grades not supported by your curriculum are
            greyed out. Already-downloaded grades show a green dot.
          </Step>
          <Step number={3} title="Browse subjects">
            Click any subject card to open its lessons. Use the Subjects tab to
            browse all subjects available for your selection.
          </Step>
          <Step number={4} title="Open a lesson">
            Each lesson has four tabs: <strong>Material</strong> (the main course
            content with learning objectives), <strong>Study Guide</strong> (quick
            revision notes), <strong>Key Terms</strong> (definitions to memorise),
            and <strong>Examples</strong> (worked problems).
          </Step>
          <Step number={5} title="Take the quiz">
            At the bottom of every lesson is a quick formative quiz. Answer all
            questions, then submit to see instant feedback and explanations for each
            question.
          </Step>
          <Step number={6} title="Practise with sample exams">
            The Exams tab shows full sample exam papers with timers, multiple
            question types (multiple-choice, short-answer, essay), and full mark
            schemes that appear after submission.
          </Step>
          <Step number={7} title="Revise with mind maps">
            The Mind Maps tab shows interactive visual study guides. Drag to pan,
            scroll to zoom, and click any node to highlight its connections. Try
            redrawing the map from memory as a self-test.
          </Step>
          <Step number={8} title="Track your progress">
            The Progress tab shows every lesson, quiz, and exam you have completed,
            your best scores, and achievements you have unlocked. Use the same
            student ID across devices to share progress.
          </Step>
        </ol>
      </Card>

      <Card className="p-5 mb-4">
        <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <Download size={18} /> Offline mode
        </h2>
        <p className="text-sm text-foreground/90 leading-relaxed mb-3">
          Global Academy is a Progressive Web App (PWA). You can download an entire
          grade bundle (all subjects, lessons, quizzes, exams, and mind maps for one
          grade) and study without an internet connection. This is perfect for
          commutes, travel, areas with poor connectivity, or simply saving data.
        </p>
        <ol className="space-y-2 text-sm text-foreground/90 mb-3">
          <li className="flex gap-2">
            <span className="font-semibold text-teal-600">1.</span>
            <span>Open the Downloads tab.</span>
          </li>
          <li className="flex gap-2">
            <span className="font-semibold text-teal-600">2.</span>
            <span>
              Pick a curriculum and grade, then click <strong>Download</strong>.
              The bundle is saved to your browser's IndexedDB storage.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="font-semibold text-teal-600">3.</span>
            <span>
              When you open the app offline (or lose connection), the app
              automatically loads content from the cached bundle. A badge shows when
              you're reading from offline cache.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="font-semibold text-teal-600">4.</span>
            <span>
              For the best experience, install the app: on Chrome/Edge click the
              install icon in the address bar; on iOS Safari tap Share → "Add to
              Home Screen".
            </span>
          </li>
        </ol>
        <div className="p-3 bg-muted/50 rounded-md text-xs text-muted-foreground flex items-start gap-2">
          <WifiOff size={14} className="mt-0.5 shrink-0" />
          <div>
            <strong>Progress tracking offline:</strong> Your quiz and exam attempts
            are queued locally and synced to the server next time you're online. The
            app badge in the header shows your current online/offline status.
          </div>
        </div>
      </Card>

      <Card className="p-5 mb-4">
        <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <Award size={18} /> Achievements
        </h2>
        <p className="text-sm text-foreground/90 leading-relaxed mb-3">
          Achievements unlock automatically as you study. They appear in the Progress
          tab and as toast notifications when you unlock them. Current achievements:
        </p>
        <ul className="text-sm space-y-1 text-foreground/90">
          <li><strong>First Steps</strong> — opened your first lesson.</li>
          <li><strong>Getting Warmer</strong> — started 5 lessons.</li>
          <li><strong>Quiz Rookie</strong> — completed your first quiz.</li>
          <li><strong>Quiz Master</strong> — completed 10 quizzes.</li>
          <li><strong>Exam Debut</strong> — sat your first sample exam.</li>
          <li><strong>High Scorer</strong> — scored 90% or above on any quiz or exam.</li>
          <li><strong>Subject Explorer</strong> — visited 3 different subjects.</li>
        </ul>
      </Card>

      <Card className="p-5 mb-4">
        <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <Search size={18} /> Tips for effective study
        </h2>
        <ul className="text-sm space-y-2 text-foreground/90">
          <li className="flex gap-2">
            <span className="text-teal-600 font-bold">·</span>
            <span>
              <strong>Active recall:</strong> After reading a lesson, close the
              material and try to write the summary from memory. Compare with the
              Study Guide tab.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-teal-600 font-bold">·</span>
            <span>
              <strong>Spaced repetition:</strong> Revisit lessons at increasing
              intervals (1 day, 3 days, 1 week, 1 month). Use the Progress tab to
              see what you have covered.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-teal-600 font-bold">·</span>
            <span>
              <strong>Mind map reconstruction:</strong> After studying a unit, try
              to redraw the mind map from memory. Then compare with the original to
              spot gaps.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-teal-600 font-bold">·</span>
            <span>
              <strong>Practice under exam conditions:</strong> When you take a
              sample exam, do it in one sitting, no notes, with the timer running.
              Then read every mark scheme explanation, even for questions you got
              right.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-teal-600 font-bold">·</span>
            <span>
              <strong>Mix subjects:</strong> Use the search bar at the top to find
              related lessons across subjects — for example, "fractions" appears in
              Maths but also in Science when calculating concentrations.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-teal-600 font-bold">·</span>
            <span>
              <strong>Download for offline:</strong> If you know you'll be without
              internet (travel, commuting), pre-download the grades you need.
            </span>
          </li>
        </ul>
      </Card>

      <Card className="p-5 mb-4">
        <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <TrendingUp size={18} /> For teachers and parents
        </h2>
        <p className="text-sm text-foreground/90 leading-relaxed mb-2">
          Global Academy supports multiple curricula side by side, making it easy to
          compare what students learn at the same grade in different systems. Teachers
          can use the sample exams as ready-made formative assessments, and the mind
          maps as lesson planning aids.
        </p>
        <p className="text-sm text-foreground/90 leading-relaxed">
          Each student has a unique student ID (stored locally) that tracks their
          progress. For classroom use, have each student set a recognisable ID (e.g.
          their name) so progress can be looked up individually. The Progress tab
          shows completion rates, best scores, and attempt counts.
        </p>
      </Card>

      <Card className="p-5 mb-4">
        <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <Brain size={18} /> How content is organised
        </h2>
        <p className="text-sm text-foreground/90 leading-relaxed mb-3">
          Each subject is divided into grade bands (1-2, 3-4, 5-6, 7-8, 9-10, 11-12).
          Within each band, the curriculum selects a representative unit with 2-3
          lessons. Each lesson contains:
        </p>
        <ul className="text-sm space-y-1 text-foreground/90 mb-3">
          <li><strong>Course material</strong> — multi-section markdown content covering the topic in depth, with learning objectives at the top.</li>
          <li><strong>Study guide</strong> — condensed revision notes for quick review before quizzes and exams.</li>
          <li><strong>Key terms</strong> — definitions of the most important vocabulary in the lesson.</li>
          <li><strong>Worked examples</strong> — sample problems with full solutions.</li>
          <li><strong>Formative quiz</strong> — 4 multiple-choice questions with instant feedback and explanations.</li>
        </ul>
        <p className="text-sm text-foreground/90 leading-relaxed">
          Each grade also has one sample exam (mix of multiple-choice, short-answer,
          and essay questions) and one mind map study guide per subject. The mind map
          connects the unit's central concept to lesson topics and key terms in a
          visual graph.
        </p>
      </Card>

      <Card className="p-5">
        <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <HelpCircle size={18} /> FAQ
        </h2>
        <div className="space-y-3">
          <Faq q="Do I need an account?">
            No. Global Academy uses a locally-stored student ID to track your
            progress. You can change it in the Progress tab if you want to share a
            device or transfer your progress.
          </Faq>
          <Faq q="Does my progress sync across devices?">
            Your progress is stored on the server under your student ID. If you use
            the same ID on another device, your progress will load. Downloaded
            offline bundles are device-specific.
          </Faq>
          <Faq q="How much storage do offline bundles use?">
            Each grade bundle is typically 50–200 KB of JSON. The Downloads tab
            shows total used and your browser's storage quota.
          </Faq>
          <Faq q="Why are short-answer and essay questions auto-marked?">
            For instant feedback, we use keyword-overlap auto-marking. For
            high-stakes practice, ask a teacher or peer to review your written
            answers against the model answer and mark scheme shown after submission.
          </Faq>
          <Faq q="Can I suggest improvements or report errors?">
            This is a demonstration app showing how a full K-12 platform can be
            built on Next.js. The content is original material aligned to each
            curriculum's typical scope and sequence, but not endorsed by the
            curriculum providers.
          </Faq>
        </div>
      </Card>
    </div>
  );
}

function CurriculumRow({
  name,
  grades,
  description,
}: {
  name: string;
  grades: string;
  description: string;
}) {
  return (
    <div className="border-l-2 border-teal-400 pl-3">
      <div className="flex items-center gap-2">
        <span className="font-medium text-sm">{name}</span>
        <Badge variant="outline" className="text-xs">
          Grades {grades}
        </Badge>
      </div>
      <div className="text-xs text-muted-foreground mt-1">{description}</div>
    </div>
  );
}

function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-3">
      <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs flex items-center justify-center font-semibold shrink-0">
        {number}
      </span>
      <div className="flex-1">
        <div className="font-medium text-sm">{title}</div>
        <div className="text-sm text-muted-foreground mt-0.5">{children}</div>
      </div>
    </li>
  );
}

function Faq({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="font-medium text-sm mb-1">{q}</div>
      <div className="text-sm text-muted-foreground">{children}</div>
    </div>
  );
}
