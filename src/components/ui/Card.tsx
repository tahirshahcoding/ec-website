"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { cardHover } from "@/lib/motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export function Card({ children, className, hoverable = false }: CardProps) {
  const base =
    "rounded-2xl bg-white border border-[#E3E8F5] shadow-[0_1px_3px_rgba(15,23,42,0.06),0_12px_40px_rgba(15,23,42,0.07)] p-6";

  if (hoverable) {
    return (
      <motion.div
        variants={cardHover}
        initial="rest"
        whileHover="hover"
        className={cn(base, className)}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={cn(base, className)}>
      {children}
    </div>
  );
}
