/**
 * Curricula metadata + subject catalogue.
 * Five global curricula are seeded, each with the same core subject slugs so
 * students can switch between boards while keeping the same subject area.
 */

export interface SubjectSeed {
  name: string;
  slug: string;
  icon: string; // lucide icon name
  color: string;
  description: string;
  grades: string; // e.g. "1-12"
}

export interface CurriculumSeed {
  code: string;
  name: string;
  publisher: string;
  region: string;
  description: string;
  color: string;
  grades: string;
  subjects: SubjectSeed[];
}

const CORE_SUBJECTS: SubjectSeed[] = [
  {
    name: "Mathematics",
    slug: "mathematics",
    icon: "Sigma",
    color: "#0ea5e9",
    description:
      "Number, algebra, geometry, statistics and reasoning. Builds from counting and place value in early grades through calculus and discrete maths in senior years.",
    grades: "1-12",
  },
  {
    name: "English Language",
    slug: "english-language",
    icon: "BookOpen",
    color: "#f97316",
    description:
      "Reading, writing, speaking and listening. Develops grammar, comprehension, composition, and analytical writing skills required by every international board.",
    grades: "1-12",
  },
  {
    name: "Sciences",
    slug: "sciences",
    icon: "FlaskConical",
    color: "#16a34a",
    description:
      "Combined science in primary years, branching into Biology, Chemistry, and Physics from Grade 6 onward. Covers scientific inquiry, theory, and lab skills.",
    grades: "1-12",
  },
  {
    name: "Social Studies",
    slug: "social-studies",
    icon: "Globe2",
    color: "#a855f7",
    description:
      "History, geography, civics, and economics. Builds global awareness, source-analysis skills, and understanding of human societies across time.",
    grades: "1-12",
  },
  {
    name: "ICT & Computing",
    slug: "computing",
    icon: "Laptop",
    color: "#dc2626",
    description:
      "Digital literacy, algorithms, programming, data, networks, and e-safety. Progresses from scratch-style blocks to Python and web development.",
    grades: "3-12",
  },
];

const CORE_SUBJECTS_JUNIOR: SubjectSeed[] = CORE_SUBJECTS.map((s) => ({
  ...s,
  grades: s.slug === "computing" ? "3-8" : "1-8",
}));

export const curriculaSeed: CurriculumSeed[] = [
  {
    code: "pearson-edexcel",
    name: "Pearson Edexcel International",
    publisher: "Pearson",
    region: "Global / UK",
    description:
      "Pearson Edexcel International GCSE and International A-Level qualifications are studied in over 80 countries. The syllabi emphasise application of knowledge, structured problem solving, and clear mathematical/scientific reasoning, and are accepted by universities worldwide.",
    color: "#7c3aed",
    grades: "1-12",
    subjects: CORE_SUBJECTS,
  },
  {
    code: "cambridge",
    name: "Cambridge IGCSE & A-Level",
    publisher: "Cambridge Assessment International Education",
    region: "Global",
    description:
      "Cambridge qualifications are taken in more than 160 countries. Cambridge Primary (5–11), Lower Secondary (11–14), IGCSE (14–16), and AS/A-Level (16–19) build deep subject mastery through structured assessment objectives and an emphasis on critical thinking.",
    color: "#dc2626",
    grades: "1-12",
    subjects: CORE_SUBJECTS,
  },
  {
    code: "british-national",
    name: "British National Curriculum (Key Stages 1–5)",
    publisher: "UK Department for Education",
    region: "United Kingdom",
    description:
      "The English National Curriculum organises learning into Key Stages 1–5 and culminates in GCSEs and A-Levels. It defines clear programmes of study for every subject and supports a structured, age-appropriate progression from age 5 to 18.",
    color: "#1d4ed8",
    grades: "1-12",
    subjects: CORE_SUBJECTS_JUNIOR,
  },
  {
    code: "ib",
    name: "International Baccalaureate (PYP / MYP / DP)",
    publisher: "International Baccalaureate Organization",
    region: "Global",
    description:
      "The IB continuum — Primary Years (3–12), Middle Years (11–16), and Diploma (16–19) — develops inquiry-based learners through transdisciplinary themes, approaches to learning, and the Theory of Knowledge. Widely recognised by leading universities.",
    color: "#0f766e",
    grades: "1-12",
    subjects: CORE_SUBJECTS,
  },
  {
    code: "us-common-core",
    name: "US Common Core (K–12)",
    publisher: "Common Core State Standards Initiative",
    region: "United States",
    description:
      "The Common Core State Standards define what K–12 students should know in English Language Arts and Mathematics. The standards emphasise analytical reading, evidence-based writing, and mathematical modelling for college and career readiness.",
    color: "#b45309",
    grades: "1-12",
    subjects: CORE_SUBJECTS,
  },
];
