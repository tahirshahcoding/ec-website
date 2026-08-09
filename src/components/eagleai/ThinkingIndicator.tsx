"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { EagleOrb } from "./EagleOrb";
import { cn } from "@/lib/utils";

const GENERIC_PHASES = [
  "Reading your request",
  "Thinking it through",
  "Searching EagleNest knowledge",
  "Crafting a response",
];

interface ThinkingIndicatorProps {
  status?: string | null;
  className?: string;
  hideOrb?: boolean;
  /** Map a backend status phrase to an index of the generic phase list. */
}

function phaseIndexForStatus(status?: string | null): number {
  if (!status) return -1;
  const lower = status.toLowerCase();
  if (lower.includes("routing")) return 0;
  if (lower.includes("retriev") || lower.includes("search") || lower.includes("analyzing")) return 2;
  if (lower.includes("generat")) return 3;
  if (lower.includes("think")) return 1;
  return -1;
}

export function ThinkingIndicator({ status, className, hideOrb }: ThinkingIndicatorProps) {
  const base = phaseIndexForStatus(status);
  const [phase, setPhase] = useState(base >= 0 ? base : 0);

  // Cycle through phases while no explicit status is available.
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    const explicit = phaseIndexForStatus(status);
    if (explicit >= 0) {
      setPhase(explicit);
      return;
    }
    if (status) {
      setPhase(0);
      return;
    }
    timerRef.current = setInterval(() => {
      setPhase((p) => (p + 1) % GENERIC_PHASES.length);
    }, 2600);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status]);

  const label = base >= 0 ? status : GENERIC_PHASES[phase];

  return (
    <div className={cn("flex items-start gap-3", className)}>
      {!hideOrb && (
        <div className="relative shrink-0 pt-1">
          <EagleOrb size={38} />
        </div>
      )}
      <div className="flex flex-col gap-2.5 pt-1.5">
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-semibold text-[#0F172A]">EagleAI is working</span>
          <span className="flex items-center gap-1 pl-1">
            <span className="typing-dot" />
            <span className="typing-dot" />
            <span className="typing-dot" />
          </span>
        </div>
        <div className="relative h-5">
          <motion.span
            key={label}
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-0 whitespace-nowrap text-[12.5px] text-[#64748B]"
          >
            {label}
          </motion.span>
        </div>
      </div>
    </div>
  );
}
