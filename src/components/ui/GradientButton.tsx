"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface GradientButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  arrow?: boolean;
}

export function GradientButton({ href, children, className, arrow = true }: GradientButtonProps) {
  const classes = cn(
    "group relative inline-flex h-14 items-center justify-center gap-2.5 overflow-hidden rounded-full px-8 text-[15px] font-semibold text-[#0F172A]",
    "gradient-border bg-white transition-transform duration-300 will-change-transform hover:scale-[1.03]",
    "shadow-[0_8px_30px_rgba(15,23,42,0.05)] hover:shadow-[0_18px_50px_rgba(91,95,255,0.18)]",
    className
  );

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {arrow && (
        <ArrowRight
          className="relative z-10 h-4 w-4 text-[#5B5FFF] transition-transform duration-300 group-hover:translate-x-1"
          strokeWidth={2}
        />
      )}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.03 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button type="button" className={classes} whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.03 }}>
      {content}
    </motion.button>
  );
}
