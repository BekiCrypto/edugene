import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Global Academy — K-12 Learning Platform",
  description:
    "Full K-12 learning and exam prep across Pearson Edexcel, Cambridge, British National, IB, and US Common Core curricula. Lessons, quizzes, sample exams, mind maps — offline-ready.",
  keywords: [
    "K-12",
    "Academy",
    "Pearson Edexcel",
    "Cambridge",
    "IGCSE",
    "A-Level",
    "IB",
    "Common Core",
    "British National Curriculum",
  ],
  authors: [{ name: "Global Academy" }],
  manifest: "/manifest.json",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Global Academy — K-12 Learning Platform",
    description:
      "Lessons, quizzes, sample exams, and mind maps across 5 global curricula. Offline-ready.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f766e",
  width: "device-width",
  initialScale: 1,
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
        {children}
        <Toaster />
        <SonnerToaster richColors position="top-right" />
      </body>
    </html>
  );
}
