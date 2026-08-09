"use client";

import { motion } from "motion/react";
import { staggerContainerFast, fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  once?: boolean;
}

export function AnimatedText({
  text,
  className,
  as: Tag = "p",
  once = true,
}: AnimatedTextProps) {
  const words = text.split(" ");
  const MotionComponent = (motion[Tag] || motion.p) as typeof motion.div;

  return (
    <MotionComponent
      variants={staggerContainerFast}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      className={cn("flex flex-wrap gap-x-[0.3em]", className)}
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={fadeInUp}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </MotionComponent>
  );
}
