"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Brain, Code2, Megaphone, PenTool, TrendingUp, Zap } from "lucide-react";
import { spring, staggerContainer } from "@/lib/motion";

const NAV_H = 80;

const wordVariants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: spring.snappy },
};

const lineVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: spring.slow },
};

const LINES = [
  { words: ["Built", "by", "engineers."], accent: false },
  { words: ["Shaped", "by", "designers."], accent: false },
  { words: ["Driven", "by", "AI."], accent: true },
];

/* ─── 3D scene data ──────────────────────────────────────────────────────── */

const CHIPS = [
  {
    icon: Brain,
    label: "AI",
    top: "1%",
    left: "18%",
    depth: 48,
    tint: "bg-[#5B5FFF]/[0.12] text-[#5B5FFF]",
    delay: 0.2,
  },
  {
    icon: Code2,
    label: "Software",
    top: "7%",
    left: "72%",
    depth: 72,
    tint: "bg-[#8B5CF6]/[0.12] text-[#8B5CF6]",
    delay: 0.35,
  },
  {
    icon: PenTool,
    label: "Design",
    top: "50%",
    left: "0%",
    depth: 56,
    tint: "bg-[#EC4899]/[0.12] text-[#EC4899]",
    delay: 0.5,
  },
  {
    icon: Megaphone,
    label: "Marketing",
    top: "64%",
    left: "82%",
    depth: 66,
    tint: "bg-[#3B82F6]/[0.12] text-[#3B82F6]",
    delay: 0.65,
    posClass: "about-chip-marketing",
  },
  {
    icon: Zap,
    label: "Automation",
    top: "87%",
    left: "32%",
    depth: 42,
    tint: "bg-[#10B981]/[0.12] text-[#10B981]",
    delay: 0.8,
  },
  {
    icon: TrendingUp,
    label: "Growth",
    top: "24%",
    left: "94%",
    depth: 34,
    tint: "bg-[#8B5CF6]/[0.12] text-[#8B5CF6]",
    delay: 0.95,
    posClass: "about-chip-grow",
  },
];

function SceneChip({
  icon: Icon,
  label,
  top,
  left,
  depth,
  tint,
  delay,
  posClass,
}: {
  icon: React.ElementType;
  label: string;
  top: string;
  left: string;
  depth: number;
  tint: string;
  delay: number;
  posClass?: string;
}) {
  return (
    <motion.div
      className={`absolute z-10 ${posClass ?? ""}`}
      style={{ top, left, z: depth }}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 240, damping: 18, delay }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="group flex cursor-default flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-[18px] border border-[#E3E8F5] bg-white/95 shadow-[0_10px_40px_rgba(0,0,0,0.05)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#5B5FFF]/40 group-hover:shadow-[0_20px_60px_rgba(91,95,255,0.16)]">
            <div className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${tint}`}>
              <Icon className="h-4 w-4" strokeWidth={1.7} />
            </div>
          </div>
          <span className="mt-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#64748B] transition-colors duration-300 group-hover:text-[#5B5FFF]">
            {label}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function AboutScene() {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 140, damping: 22 });
  const springY = useSpring(rotateY, { stiffness: 140, damping: 22 });

  function handleMove(e: React.PointerEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 10);
    rotateX.set(-py * 10);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div className="relative h-[340px] w-full select-none sm:h-[440px] lg:h-[560px] [perspective:1100px]">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(91,95,255,0.1),transparent_62%)]"
        aria-hidden
      />

      {/* 3D tilt stage */}
      <motion.div
        ref={ref}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
        className="relative h-full w-full [transform-style:preserve-3d]"
        role="img"
        aria-label="EagleNest's brand mark at the centre of its disciplines — AI, software, design, marketing, automation, and growth"
      >
        {/* Central eagle — the identity */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-[76%] w-[76%]">
            <div
              className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_40%,rgba(91,95,255,0.16),transparent_62%)]"
              aria-hidden
            />
            <div className="absolute inset-2 rounded-full border border-[#D2D8F0]" aria-hidden />
            <div className="absolute inset-[18%] rounded-full border border-dashed border-[#5B5FFF]/[0.22]" aria-hidden />
            <div className="absolute inset-[34%] rounded-full border border-[#5B5FFF]/[0.16]" aria-hidden />

            {/* Central monogram — the brand mark */}
            <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
              <div className="flex h-28 w-28 items-center justify-center rounded-[28px] bg-white p-4 shadow-[0_24px_80px_rgba(15,23,42,0.14)] ring-1 ring-[#D2D8F0] sm:h-32 sm:w-32">
                <Image
                  src="/logo.png"
                  alt="EagleNest Creations Logo"
                  width={96}
                  height={96}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Orbiting discipline chips */}
        {CHIPS.map((chip) => (
          <SceneChip key={chip.label} {...chip} />
        ))}
      </motion.div>

      <style jsx global>{`
        @media (max-width: 640px) {
          .about-chip-grow {
            left: 78% !important;
          }
        }
        @media (max-width: 380px) {
          .about-chip-marketing {
            left: 72% !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */

export function AboutHero() {
  return (
    <section
      className="relative flex items-center overflow-hidden bg-white"
      style={{ minHeight: `calc(100vh - ${NAV_H}px)`, paddingTop: NAV_H }}
    >
      {/* Subtle lighting */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(91,95,255,0.08),transparent_62%)]" />
        <div className="absolute bottom-[8%] right-[6%] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.06),transparent_62%)]" />
      </div>

      <div className="grid w-full items-center gap-14 px-6 py-14 sm:px-10 lg:grid-cols-12 lg:gap-10 lg:px-16 lg:py-0 xl:px-24">
        <motion.div
          className="flex max-w-[640px] flex-col lg:col-span-7"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={lineVariants}
            className="mb-8 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#6B7280]"
          >
            <span className="inline-block h-px w-8 bg-[#5B5FFF]" aria-hidden />
            About EagleNest · Est. 2022
          </motion.p>

          <motion.h1
            className="mb-8 font-extrabold text-[#0F172A] leading-[0.98] tracking-[-0.03em]"
            style={{ fontSize: "clamp(38px, 7vw, 76px)" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
            }}
          >
            {LINES.map((line, li) => (
              <span key={li} className="block overflow-hidden pb-[0.08em]">
                {line.words.map((w, wi) => (
                  <motion.span
                    key={wi}
                    variants={wordVariants}
                    className={`mr-[0.22em] inline-block last:mr-0 ${
                      line.accent ? "text-[#5B5FFF]" : ""
                    }`}
                  >
                    {w}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>

          <motion.p
            variants={lineVariants}
            className="mb-10 max-w-[560px] text-[17px] leading-[1.7] text-[#52525B] sm:text-[18px]"
          >
            EagleNest Creations is a technology studio in Swat, Pakistan — where software
            engineering, artificial intelligence, and design live under one roof. We partner with
            founders and teams to ship products that look premium, work beautifully, and grow
            businesses.
          </motion.p>

          <motion.div variants={lineVariants} className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <a
              href="#story"
              className="group flex w-full items-center justify-center gap-2.5 rounded-[14px] bg-[#0F172A] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1E293B] sm:w-auto"
            >
              Read our story
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <Link
              href="/portfolio"
              className="flex w-full items-center justify-center gap-2.5 rounded-[14px] border border-[#D6DAE6] bg-white px-7 py-3.5 text-sm font-semibold text-[#0F172A] transition-colors duration-300 hover:border-[#0F172A] sm:w-auto"
            >
              See our work
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Right: 3D eagle identity scene ── */}
        <motion.div
          className="relative lg:col-span-5"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.25 }}
        >
          <AboutScene />
        </motion.div>
      </div>
    </section>
  );
}
