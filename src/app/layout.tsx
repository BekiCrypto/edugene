import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EduGene — K-12 Learning That Grows With You",
  description:
    "Master Grade 1–12 across Pearson Edexcel, Cambridge, British National, IB, and US Common Core. AI tutor, audio lessons, flashcards, quizzes, exams, and gamified study — offline-ready.",
  keywords: [
    "K-12",
    "EduGene",
    "Pearson Edexcel",
    "Cambridge",
    "IGCSE",
    "A-Level",
    "IB",
    "Common Core",
    "British National Curriculum",
    "AI tutor",
    "flashcards",
    "spaced repetition",
  ],
  authors: [{ name: "EduGene" }],
  manifest: "/manifest.json",
  applicationName: "EduGene",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "EduGene",
  },
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "EduGene — K-12 Learning That Grows With You",
    description:
      "AI-powered K-12 learning across 5 global curricula. Audio lessons, flashcards, quizzes, exams, mind maps, gamified progress. Offline-ready.",
    type: "website",
    siteName: "EduGene",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f766e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js').catch(() => {});
                });
              }
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <Providers>
          {children}
          <Toaster />
          <SonnerToaster richColors position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
