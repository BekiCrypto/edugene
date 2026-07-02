# 🎓 EduGene — K-12 Learning That Grows With You

A complete, production-ready, AI-powered K-12 learning platform covering **5 global curricula** (Pearson Edexcel, Cambridge, British National, IB, US Common Core) across **Grades 1–12** with **2,160+ lessons**, AI tutoring, audio narration, flashcards with spaced repetition, gamification, and offline support.

![EduGene](public/logo.svg)

## ✨ Features

### 📚 Comprehensive Content Library
- **2,160 lessons** across 5 curricula × 5 subjects × 12 grades
- **8,640 quiz questions** with explanations
- **270 sample exams** with mark schemes
- **270 interactive mind maps**
- Each lesson: rich content, study guide, key terms, worked examples, and quiz
- Subjects: Mathematics, English Language, Sciences, Social Studies, ICT & Computing

### 🤖 AI-Powered Learning
- **AI Study Buddy** — 6 action types: Ask, Explain, Summarize, Make Quiz, Generate Flashcards, Study Plan
- **Audio Studio** — Text-to-speech narration (NotebookLM-style) with 7 voices and speed control
- Powered by `z-ai-web-dev-sdk` (LLM + TTS)

### 🎨 Age-Adaptive UI
Four themes with unique mascots, automatically applied based on grade:
- 🌱 **Little Sprouts** (G1–3) — Sprout the Seedling
- 🦊 **Explorers** (G4–6) — Compass the Fox
- 🦉 **Scholars** (G7–9) — Gene the Owl
- 🦌 **Masters** (G10–12) — Sage the Stag

### 🏆 Gamification
- **20 levels** (Seed → EduGene Legend)
- **18 badges** across 4 tiers (bronze/silver/gold/platinum)
- **Daily streaks** with weekly bonuses
- **Daily quests** (3 per day)
- **XP system**: lessons (50), quizzes (80+), exams (200+), flashcards (5), notes (10)

### 🔐 Authentication
- **Google OAuth** (NextAuth v4)
- **Guest Student** mode (no signup required)
- **Demo Parent/Teacher** accounts for oversight testing
- Role-based access (student/parent/teacher/admin)

### 📱 Student Tools
- **Flashcards** with SM-2 spaced repetition algorithm
- **Notes** with markdown, colors, tags, and pinning
- **Dashboard** with analytics, activity chart, and weak-area detection
- **Offline mode** — download grade bundles to IndexedDB; PWA with service worker

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Database | Prisma ORM + SQLite (21 models) |
| Auth | NextAuth v4 (Google OAuth + Credentials) |
| State | Zustand (persisted) |
| Animations | Framer Motion |
| AI | z-ai-web-dev-sdk (LLM + TTS) |
| Markdown | ReactMarkdown |
| Offline | IndexedDB + Service Worker (PWA) |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun
- npm/bun package manager

### Installation

```bash
# Clone the repo
git clone https://github.com/BekiCrypto/edugene.git
cd edugene

# Install dependencies
bun install
# or npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your values (see below)

# Set up the database
bun run db:push

# Seed comprehensive content (2,160 lessons)
bun run scripts/seed-v2.ts

# Start the dev server
bun run dev
```

Visit `http://localhost:3000`

### Environment Variables

Create a `.env` file:

```env
DATABASE_URL="file:./db/custom.db"
NEXTAUTH_SECRET="your-secret-here"  # Generate: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (optional — enables Google sign-in)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

#### Getting Google OAuth Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable **Google+ API** and **Google Identity Services**
4. Go to **Credentials** → **Create Credentials** → **OAuth client ID**
5. Application type: **Web application**
6. Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
7. Copy the Client ID and Secret to your `.env`

## 📁 Project Structure

```
edugene/
├── prisma/
│   └── schema.prisma              # 21 database models
├── public/
│   ├── logo.svg                   # EduGene brand logo
│   ├── manifest.json              # PWA manifest
│   ├── sw.js                       # Service worker
│   └── audio-cache/               # TTS audio cache (runtime)
├── scripts/
│   ├── seed-v2.ts                 # Comprehensive content seeder
│   └── seed-data/
│       ├── syllabus/              # K-12 syllabus catalogues
│       │   ├── math-syllabus.ts   # 96 math topics
│       │   ├── science-syllabus.ts
│       │   ├── english-syllabus.ts
│       │   ├── social-syllabus.ts
│       │   └── computing-syllabus.ts
│       ├── content-generator.ts   # Turns syllabus → full lessons
│       ├── exam-builder.ts        # Generates exams & mind maps
│       └── curricula.ts           # Curriculum definitions
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout with SessionProvider
│   │   ├── page.tsx               # Main app shell (auth gate + nav)
│   │   ├── globals.css            # EduGene brand system (4 age-band themes)
│   │   └── api/
│   │       ├── auth/
│   │       │   ├── [...nextauth]/route.ts  # NextAuth handler
│   │       │   └── status/route.ts         # Session checker
│   │       └── academy/
│   │           ├── curricula/     # List curricula
│   │           ├── subjects/      # List subjects
│   │           ├── lessons/       # List lessons
│   │           ├── quiz/          # Get quiz
│   │           ├── exam/          # Get exam
│   │           ├── mindmap/       # Get mind maps
│   │           ├── progress/      # Track progress + XP
│   │           ├── achievements/  # Legacy achievements
│   │           ├── badges/        # Badge system
│   │           ├── quests/        # Daily quests
│   │           ├── streak/        # Streak tracking
│   │           ├── dashboard/     # Aggregated analytics
│   │           ├── tts/           # AI text-to-speech
│   │           ├── ai-tutor/      # AI study buddy (LLM)
│   │           ├── flashcards/    # SRS flashcards
│   │           ├── notes/         # Student notes
│   │           ├── download/      # Offline bundle download
│   │           └── search/        # Full-text search
│   ├── lib/
│   │   ├── auth.ts                # NextAuth config
│   │   ├── db.ts                  # Prisma client
│   │   ├── academy-store.ts       # Zustand store
│   │   ├── age-bands.ts           # 4 age-band configs
│   │   ├── gamification.ts        # XP/levels/badges/quests engine
│   │   ├── identity.ts            # Auth identity resolver
│   │   └── offline-store.ts       # IndexedDB wrapper
│   └── components/
│       ├── providers.tsx          # SessionProvider wrapper
│       ├── academy/
│       │   ├── mascot.tsx         # Age-band mascot
│       │   ├── markdown.tsx       # Custom markdown renderer
│       │   └── views/
│       │       ├── auth-view.tsx
│       │       ├── dashboard-view.tsx
│       │       ├── home-view.tsx
│       │       ├── subjects-view.tsx
│       │       ├── lessons-view.tsx
│       │       ├── lesson-view.tsx
│       │       ├── quiz-view.tsx
│       │       ├── exams-view.tsx
│       │       ├── exam-view.tsx
│       │       ├── mindmaps-view.tsx
│       │       ├── mindmap-view.tsx
│       │       ├── flashcards-view.tsx
│       │       ├── ai-tutor-view.tsx
│       │       ├── audio-view.tsx
│       │       ├── notes-view.tsx
│       │       ├── achievements-view.tsx
│       │       ├── progress-view.tsx
│       │       ├── downloads-view.tsx
│       │       └── docs-view.tsx
│       └── ui/                    # shadcn/ui components
└── package.json
```

## 🎯 Usage

### For Students
1. **Sign in** with Google or as a Guest
2. **Pick your curriculum** (Pearson, Cambridge, IB, British, US Common Core)
3. **Pick your grade** (1–12) — the theme adapts automatically
4. **Browse subjects** and open lessons
5. **Study** with 4 tabs: Material, Study Guide, Key Terms, Examples
6. **Take quizzes** to earn XP and unlock badges
7. **Use AI Tutor** for explanations, summaries, and flashcards
8. **Generate audio** for any lesson (NotebookLM-style)
9. **Review flashcards** with spaced repetition
10. **Download grade bundles** for offline study

### Demo Accounts
- **Parent**: `parent@edugene.local` (any password)
- **Teacher**: `teacher@edugene.local` (any password)

## 🗄 Database Schema

21 Prisma models:
- **Auth**: User, Account, Session, VerificationToken
- **Content**: Curriculum, Subject, Lesson, Quiz, QuizQuestion, SampleExam, ExamQuestion, MindMap
- **Progress**: StudentProgress, Achievement, UserBadge, Streak, DailyQuest, StudySession
- **Tools**: Note, FlashcardDeck, Flashcard (with SM-2 SRS fields)
- **AI**: AudioDescription, AIPrompt
- **Oversight**: ParentLink, Enrollment

## 🔧 Scripts

```bash
bun run dev          # Start dev server (port 3000)
bun run build        # Production build
bun run lint         # ESLint
bun run db:push      # Push schema to database
bun run db:generate  # Regenerate Prisma client
bun run db:reset     # Reset database (destructive)

bun run scripts/seed-v2.ts  # Seed 2,160+ lessons
```

## 🌍 Curricula Covered

| Curriculum | Publisher | Region | Grades |
|-----------|-----------|--------|--------|
| Pearson Edexcel International | Pearson | Global / UK | 1–12 |
| Cambridge IGCSE & A-Level | Cambridge Assessment | Global | 1–12 |
| British National Curriculum | UK Dept for Education | United Kingdom | 1–12 |
| International Baccalaureate | IBO | Global | 1–12 |
| US Common Core | CCSS Initiative | United States | K–12 |

## 📦 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import repo at [vercel.com](https://vercel.com)
3. Add environment variables
4. Deploy

### Self-hosted
```bash
bun run build
bun run start
```

## 📝 License

MIT License — see [LICENSE](LICENSE) file.

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repo
2. Create a feature branch
3. Submit a pull request

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com), [shadcn/ui](https://ui.shadcn.com)
- AI powered by [z-ai-web-dev-sdk](https://www.npmjs.com/package/z-ai-web-dev-sdk)
- Icons by [Lucide](https://lucide.dev)
- Animations by [Framer Motion](https://www.framer.com/motion)

---

**EduGene** — Making world-class K-12 education accessible to every student, everywhere. 🌍
