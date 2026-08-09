"use client";

import { motion } from "motion/react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  index?: string;
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={cn(
        "mb-10 sm:mb-16 lg:mb-20",
        align === "center" && "flex flex-col items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <motion.p
          variants={fadeInUp}
          className="mb-6 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.18em]"
        >
          <span className="inline-block h-px w-8 bg-[#5B5FFF]" aria-hidden />
          {index && <span className="tabular-nums text-[#5B5FFF]">{index}</span>}
          <span className="bg-[linear-gradient(100deg,#5B5FFF,#8B5CF6)] bg-clip-text text-transparent">
            {eyebrow}
          </span>
        </motion.p>
      )}
      <motion.h2
        variants={fadeInUp}
        className="font-extrabold text-[#0F172A] leading-[1.05] tracking-[-0.03em]"
        style={{ fontSize: "clamp(28px, 4.5vw, 52px)" }}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeInUp}
          className="mt-6 text-[15px] leading-[1.7] text-[#475569] max-w-[560px] sm:text-[17px]"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
