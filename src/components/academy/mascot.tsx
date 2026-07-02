"use client";

import { motion } from "framer-motion";
import { AGE_BANDS, type AgeBand } from "@/lib/age-bands";
import { cn } from "@/lib/utils";

interface MascotProps {
  band: AgeBand;
  size?: "sm" | "md" | "lg" | "xl";
  message?: string;
  animate?: boolean;
  className?: string;
}

const SIZES = {
  sm: "text-2xl w-10 h-10",
  md: "text-4xl w-16 h-16",
  lg: "text-6xl w-24 h-24",
  xl: "text-7xl w-32 h-32",
};

/**
 * EduGene mascot — age-band aware character that delivers encouragement.
 * Each age band has its own mascot species and personality.
 */
export function Mascot({ band, size = "md", message, animate = true, className }: MascotProps) {
  const config = AGE_BANDS[band];

  return (
    <div className={cn("flex items-start gap-3", className)}>
      <motion.div
        className={cn(
          "shrink-0 rounded-full bg-brand-soft flex items-center justify-center",
          SIZES[size],
          animate && "animate-mascot"
        )}
        initial={animate ? { scale: 0.8, opacity: 0 } : false}
        animate={animate ? { scale: 1, opacity: 1 } : undefined}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        aria-hidden
      >
        <span className="select-none">{config.mascotEmoji}</span>
      </motion.div>
      {message && (
        <div className="flex-1 min-w-0">
          <div className="bg-card border border-border rounded-2xl rounded-tl-sm p-3 shadow-sm">
            <div className="text-xs font-semibold text-brand mb-0.5 flex items-center gap-1">
              {config.mascotName}
              <span className="text-muted-foreground font-normal">· {config.mascotSpecies}</span>
            </div>
            <p className="text-sm text-foreground leading-snug">{message}</p>
          </div>
        </div>
      )}
    </div>
  );
}

/** Speech bubble version for empty states / onboarding */
export function MascotBubble({
  band,
  message,
  cta,
  onCta,
}: {
  band: AgeBand;
  message: string;
  cta?: string;
  onCta?: () => void;
}) {
  return (
    <div className="flex flex-col items-center text-center gap-4 py-8 max-w-md mx-auto">
      <Mascot band={band} size="xl" animate />
      <div>
        <div className="text-lg font-bold mb-1">{AGE_BANDS[band].mascotName}</div>
        <p className="text-sm text-muted-foreground leading-relaxed">{message}</p>
      </div>
      {cta && (
        <button
          onClick={onCta}
          className="px-6 py-2.5 bg-brand text-brand-foreground rounded-full font-medium hover:opacity-90 transition shadow-sm"
        >
          {cta}
        </button>
      )}
    </div>
  );
}
