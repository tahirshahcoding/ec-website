"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { buttonHover } from "@/lib/motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
  href?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

  const variants = {
    primary:
      "bg-[#5B5FFF] text-white hover:bg-[#4a4bee] [background:linear-gradient(135deg,#5B5FFF,#8B5CF6)]",
    secondary:
      "border border-[#5B5FFF]/30 text-[#0F172A] hover:border-[#5B5FFF]/60 hover:bg-[#5B5FFF]/5 bg-white",
    ghost: "text-[#475569] hover:text-[#0F172A] hover:bg-[#0F172A]/5",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  return (
    <motion.button
      variants={buttonHover}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      className={cn(base, variants[variant], sizes[size], className)}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
}
