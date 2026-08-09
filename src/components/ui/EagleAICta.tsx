"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface EagleAICtaProps {
  text?: string;
  className?: string;
  variant?: "outline" | "solid";
}

export function EagleAICta({ 
  text = "Talk to EagleAI", 
  className,
  variant = "outline" 
}: EagleAICtaProps) {
  return (
    <Link
      href="/eagleai"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[12px] font-semibold tracking-[0.15em] transition-all",
        variant === "outline" 
          ? "border border-[#5B5FFF]/40 text-[#5B5FFF] hover:bg-[#5B5FFF]/[0.06] hover:border-[#5B5FFF]/60"
          : "bg-[#5B5FFF] text-white hover:bg-[#4a4eff] shadow-[0_4px_14px_rgba(91,95,255,0.25)] hover:shadow-[0_6px_20px_rgba(91,95,255,0.3)]",
        className
      )}
    >
      <span className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
        {text}
      </span>
      <span className="text-[14px]">↗</span>
    </Link>
  );
}
