"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CONFETTI_COLORS = ["#10b981", "#f59e0b", "#8b5cf6", "#ef4444", "#3b82f6", "#ec4899"];
const CONFETTI_EMOJIS = ["🎉", "⭐", "✨", "🏆", "🌟", "💫", "🎊", "✅"];

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  emoji?: string;
  delay: number;
  duration: number;
  rotation: number;
}

export function Confetti({ trigger }: { trigger: number }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (trigger === 0) return;
    const newPieces: ConfettiPiece[] = [];
    for (let i = 0; i < 40; i++) {
      newPieces.push({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: -10,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        emoji: i % 3 === 0 ? CONFETTI_EMOJIS[i % CONFETTI_EMOJIS.length] : undefined,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 1.5,
        rotation: Math.random() * 720 - 360,
      });
    }
    setPieces(newPieces);
    const timer = setTimeout(() => setPieces([]), 4000);
    return () => clearTimeout(timer);
  }, [trigger]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      <AnimatePresence>
        {pieces.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: `${p.x}vw`, y: "-10vh", opacity: 1, rotate: 0 }}
            animate={{ y: "110vh", opacity: 0, rotate: p.rotation }}
            exit={{ opacity: 0 }}
            transition={{ duration: p.duration, delay: p.delay, ease: "easeOut" }}
            className="absolute text-2xl"
            style={{ color: p.color }}
          >
            {p.emoji || (
              <div
                className="w-3 h-3 rounded-sm"
                style={{ background: p.color }}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/** Floating decorative mascots for hero sections */
export function FloatingMascots() {
  const items = [
    { emoji: "🌱", className: "top-[15%] left-[8%] animate-float text-7xl opacity-20" },
    { emoji: "🦊", className: "top-[25%] right-[12%] animate-float-slow text-6xl opacity-20" },
    { emoji: "🦉", className: "bottom-[30%] left-[15%] animate-float-delayed text-7xl opacity-20" },
    { emoji: "🦌", className: "bottom-[20%] right-[8%] animate-float text-6xl opacity-20" },
    { emoji: "📚", className: "top-[45%] left-[40%] animate-float-slow text-5xl opacity-10" },
    { emoji: "✨", className: "top-[10%] left-[50%] animate-twinkle text-4xl opacity-30" },
    { emoji: "🎯", className: "bottom-[50%] right-[40%] animate-float-delayed text-5xl opacity-15" },
    { emoji: "🧠", className: "top-[35%] right-[30%] animate-float text-4xl opacity-15" },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map((item, i) => (
        <div key={i} className={`absolute ${item.className} select-none`}>
          {item.emoji}
        </div>
      ))}
    </div>
  );
}

/** Animated sparkles for backgrounds */
export function Sparkles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-twinkle text-brand-soft"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
            fontSize: `${10 + (i % 4) * 6}px`,
            animationDelay: `${(i * 0.3) % 2}s`,
          }}
        >
          ✦
        </div>
      ))}
    </div>
  );
}
