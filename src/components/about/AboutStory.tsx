"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { GradientButton } from "@/components/ui/GradientButton";
import { container } from "@/lib/layout";
import { blurInUp, staggerContainer } from "@/lib/motion";

const milestones = [
  {
    year: "2022",
    title: "The idea",
    description: "EagleNest began with a simple belief: technology should be simple, and design should be elegant.",
  },
  {
    year: "2023",
    title: "Learning the craft",
    description: "Late nights spent mastering AI, software, and design — one experiment at a time.",
  },
  {
    year: "2024",
    title: "First clients",
    description: "The first businesses trusted us with their digital presence — and the results spoke for themselves.",
  },
  {
    year: "2025",
    title: "A team forms",
    description: "Engineers, designers, and marketers came together as a multi-disciplinary studio.",
  },
  {
    year: "2026",
    title: "All-in on AI",
    description: "We went deep on artificial intelligence — chatbots, RAG systems, and intelligent automation.",
  },
];

/* ─── Abstract studio poster (stand-in until a video is provided) ────────── */

function StudioArt() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(91,95,255,0.16),transparent_55%),radial-gradient(circle_at_85%_30%,rgba(139,92,246,0.18),transparent_55%),radial-gradient(circle_at_60%_95%,rgba(236,72,153,0.12),transparent_55%)]" />
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(91,95,255,0.4) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden
      />

      {/* Abstract nest */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 560 460" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <linearGradient id="nestGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5B5FFF" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        <g stroke="rgba(91,95,255,0.2)" strokeWidth="1.2">
          {[0, 1, 2, 3].map((ring) => {
            const r = 60 + ring * 70;
            return (
              <circle key={ring} cx="280" cy="230" r={r} strokeDasharray={ring === 3 ? "3 10" : undefined} />
            );
          })}
        </g>
        <g stroke="url(#nestGrad)" strokeWidth="1.5" opacity="0.6">
          <path d="M280 230 C 340 180, 400 230, 340 300 C 300 350, 240 300, 280 230 Z" />
        </g>
        {[[280, 230], [400, 300], [160, 320], [440, 160], [120, 150], [350, 120]].map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="13" fill="white" stroke="rgba(91,95,255,0.35)" strokeWidth="1.5" />
            <circle cx={cx} cy={cy} r="4.5" fill="url(#nestGrad)" />
          </g>
        ))}
      </svg>

      {/* Ambient orbs */}
      <div className="absolute -left-10 top-10 h-32 w-32 rounded-full bg-[#5B5FFF]/10 blur-2xl" aria-hidden />
      <div className="absolute -right-8 bottom-8 h-32 w-32 rounded-full bg-[#8B5CF6]/10 blur-2xl" aria-hidden />

      {/* Chips */}
      <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-white bg-white/90 px-3 py-1.5 text-[10px] font-bold text-[#5B5FFF] shadow-[0_8px_24px_rgba(91,95,255,0.16)]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
        Swat, Pakistan
      </div>
      <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full border border-white bg-white/90 px-3 py-1.5 text-[10px] font-bold text-[#8B5CF6] shadow-[0_8px_24px_rgba(139,92,246,0.16)]">
        Est. 2022
      </div>
    </div>
  );
}

/* ─── Media panel ────────────────────────────────────────────────────────── */

function StoryMedia() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 90, damping: 18 }}
      className="relative aspect-[3/4] max-h-[500px] w-full mx-auto overflow-hidden rounded-[20px] border border-[#D6DAE6] shadow-[0_16px_48px_rgba(15,23,42,0.08)] transition-transform duration-700 ease-out hover:scale-[1.01]"
    >
      <StudioArt />

      <video
        src="/videos/story.mp4"
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        onError={(e) => {
          e.preventDefault();
        }}
      />
    </motion.div>
  );
}

/* ─── Timeline ───────────────────────────────────────────────────────────── */

function StoryTimeline() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 78%", "end 65%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.4 });

  return (
    <motion.ol
      ref={listRef}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="relative mt-6"
    >
      {/* Rail */}
      <span className="absolute bottom-0 left-[5px] top-0 w-px bg-[#D6DAE6]" aria-hidden />
      {/* Draw-on-scroll gradient line */}
      <motion.span
        className="absolute bottom-0 left-[5px] top-0 w-px origin-top bg-[linear-gradient(180deg,#5B5FFF,#8B5CF6)]"
        style={{ scaleY }}
        aria-hidden
      />

      {milestones.map((milestone) => (
        <motion.li
          key={milestone.title}
          variants={blurInUp}
          className="relative pb-4 pl-8 last:pb-0"
        >
          {/* Node */}
          <span className="absolute left-0 top-1.5 flex h-3 w-3 items-center justify-center" aria-hidden>
            <span className="absolute h-3 w-3 animate-ping rounded-full bg-[#5B5FFF]/30 [animation-duration:2s]" />
            <span className="relative h-3 w-3 rounded-full bg-[linear-gradient(135deg,#5B5FFF,#8B5CF6)] ring-4 ring-white" />
          </span>

          <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
            <span className="tabular-nums text-[#5B5FFF]">{milestone.year}</span>
          </p>
          <h3 className="text-[14.5px] font-bold tracking-[-0.01em] text-[#0F172A]">{milestone.title}</h3>
          <p className="mt-0.5 max-w-[380px] text-[12.5px] leading-[1.5] text-[#4B5563]">
            {milestone.description}
          </p>
        </motion.li>
      ))}
    </motion.ol>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */

export function AboutStory() {
  return (
    <section id="story" className="relative overflow-hidden border-y border-[#D6DAE6] bg-white py-10 lg:py-14">
      {/* Soft ambient light */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(91,95,255,0.04),transparent_62%)]" aria-hidden />

      <div className={`${container} relative`}>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <StoryMedia />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-[500px]"
          >
            <motion.p
              variants={blurInUp}
              className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] bg-[linear-gradient(100deg,#5B5FFF,#8B5CF6)] bg-clip-text text-transparent"
            >
              Our Story
            </motion.p>

            <motion.h2
              variants={blurInUp}
              className="font-black text-[#0F172A] leading-[0.95] tracking-[-0.04em]"
              style={{ fontSize: "clamp(32px, 3.5vw, 48px)" }}
            >
              Ideas. Innovation.{" "}
              <span className="bg-[linear-gradient(100deg,#5B5FFF,#8B5CF6,#EC4899)] bg-clip-text text-transparent">
                Impact.
              </span>
            </motion.h2>

            <motion.p variants={blurInUp} className="mt-4 text-[14.5px] leading-[1.65] text-[#4B5563]">
              EagleNest Creations is a technology studio born in Swat, Pakistan — where software
              engineering, artificial intelligence, and design live under one roof.
            </motion.p>

            <motion.div variants={blurInUp} className="mt-5">
              <GradientButton href="/portfolio">Explore our work</GradientButton>
            </motion.div>

            <StoryTimeline />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
