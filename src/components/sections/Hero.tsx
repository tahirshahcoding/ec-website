"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, ShieldCheck, Timer } from "lucide-react";
import { HeroVisual } from "@/components/sections/HeroVisual";
import { container } from "@/lib/layout";
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

const TRUST = [
  { icon: CheckCircle2, label: "Free consultation", tint: "from-[#5B5FFF]/[0.14] to-[#5B5FFF]/[0.06] text-[#5B5FFF]" },
  { icon: ShieldCheck, label: "No commitment", tint: "from-[#8B5CF6]/[0.14] to-[#EC4899]/[0.08] text-[#8B5CF6]" },
  { icon: Timer, label: "Reply within 24h", tint: "from-[#06B6D4]/[0.14] to-[#3B82F6]/[0.08] text-[#0E9CBE]" },
];

export function Hero() {
  return (
    <section
      className="relative flex items-center overflow-hidden bg-white"
      style={{ minHeight: `calc(100svh - ${NAV_H}px)`, paddingTop: NAV_H }}
    >
      {/* Soft gradient lighting — radial gradients only, no filter blur */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[62%] pointer-events-none" aria-hidden>
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] rounded-full bg-[radial-gradient(circle,rgba(91,95,255,0.2),transparent_62%)]"
          animate={{ opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.16),transparent_62%)]"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[18%] right-[8%] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.15),transparent_62%)]"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[12%] left-[10%] w-[340px] h-[340px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.13),transparent_62%)]"
          animate={{ opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className={`${container} grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-8 items-center py-8 sm:py-14 lg:py-0`}>
        {/* ── Left: content ─────────────────────────────────────────────────── */}
        <motion.div
          className="lg:col-span-5 flex flex-col max-w-[620px] order-1"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={lineVariants} className="mb-5 sm:mb-9">
            <span className="gradient-border-soft inline-flex items-center gap-2 sm:gap-2.5 rounded-full py-1.5 pl-2 pr-3 sm:pr-4 text-[10px] sm:text-[11px] font-medium tracking-wide text-[#475569] shadow-[0_2px_8px_rgba(91,95,255,0.1)]">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-[#5B5FFF]/[0.14] to-[#EC4899]/[0.12]">
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#5B5FFF] to-[#EC4899]" />
              </span>
              Digital Innovation Studio
            </span>
          </motion.div>

          {/* Headline — word-by-word reveal, only "We Elevate." is gradient */}
          <motion.h1
            className="font-extrabold text-[#0F172A] leading-[0.95] tracking-[-0.03em] mb-5 sm:mb-8"
            style={{ fontSize: "clamp(36px, 8vw, 92px)" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
            }}
            initial="hidden"
            animate="visible"
          >
            <span className="block overflow-hidden pb-[0.08em]">
              {["We", "Code."].map((w, i) => (
                <motion.span key={i} variants={wordVariants} className="inline-block mr-[0.22em] last:mr-0">
                  {w}
                </motion.span>
              ))}
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              {["We", "Create."].map((w, i) => (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  className={`inline-block mr-[0.22em] last:mr-0 ${i === 1 ? "text-gradient-cyan" : ""}`}
                >
                  {w}
                </motion.span>
              ))}
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span variants={wordVariants} className="inline-block text-gradient-shimmer">
                We Elevate.
              </motion.span>
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={lineVariants}
            className="text-[15px] sm:text-[18px] md:text-[20px] font-normal leading-[1.65] sm:leading-[1.7] text-[#475569] max-w-[500px] mb-7 sm:mb-11"
          >
            EagleNest Creations is a digital innovation company helping brands grow
            through intelligent AI solutions, world-class software, and strategic
            marketing.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={lineVariants} className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <div className="relative sm:w-auto">
              <div className="absolute -inset-1.5 rounded-[24px] bg-gradient-to-br from-[#5B5FFF]/40 via-[#8B5CF6]/30 to-[#EC4899]/25 blur-lg motion-safe:animate-pulse" aria-hidden />
              <Link
                href="/contact"
                className="group relative flex w-full items-center justify-center gap-2.5 rounded-[18px] px-7 py-3.5 text-sm font-semibold text-white bg-gradient-to-br from-[#5B5FFF] via-[#8B5CF6] to-[#EC4899] bg-[length:200%_200%] shadow-[0_8px_24px_rgba(91,95,255,0.32)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(91,95,255,0.45)] active:translate-y-0 hover:bg-right sm:w-auto"
              >
                Start a project
                <ArrowRight
                  size={16}
                  strokeWidth={1.8}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
            <Link
              href="/portfolio"
              className="flex w-full items-center justify-center gap-2.5 rounded-[18px] border border-[#5B5FFF]/20 bg-white px-7 py-3.5 text-sm font-medium text-[#0F172A] transition-colors duration-300 hover:border-[#5B5FFF]/40 hover:bg-[#5B5FFF]/[0.04] hover:text-[#5B5FFF] sm:w-auto"
            >
              Explore our work
            </Link>
          </motion.div>

          {/* Micro trust */}
          <motion.ul variants={lineVariants} className="mt-6 sm:mt-10 lg:mt-11 flex flex-wrap items-center gap-x-5 sm:gap-x-6 gap-y-2.5 sm:gap-y-3">
            {TRUST.map(({ icon: Icon, label, tint }) => (
              <li key={label} className="flex items-center gap-2 sm:gap-2.5 text-[12px] sm:text-[13px] font-medium text-[#475569]">
                <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${tint}`}>
                  <Icon size={13} strokeWidth={1.8} />
                </span>
                {label}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* ── Right: orbiting ecosystem ─────────────────────────────────────── */}
        <motion.div
          className="lg:col-span-7 relative h-[280px] sm:h-[420px] lg:h-[680px] order-2"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.2 }}
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}
