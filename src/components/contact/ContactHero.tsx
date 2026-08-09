"use client";

import { motion } from "motion/react";
import { ArrowRight, CalendarClock } from "lucide-react";
import { spring, staggerContainer } from "@/lib/motion";

const NAV_H = 80;

const lineVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: spring.slow },
};

const wordVariants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: spring.snappy },
};

const HEADLINE = [
  { words: ["Let's", "Build"] },
  { words: ["Something"] },
  { words: ["Exceptional."], accent: true },
];

/* ─── Animated network illustration ─────────────────────────────────────── */

const NODES = [
  { cx: 50, cy: 190, label: "AI" },
  { cx: 190, cy: 90, label: "Software" },
  { cx: 340, cy: 150, label: "Design" },
  { cx: 210, cy: 300, label: "Strategy" },
  { cx: 430, cy: 260, label: "Growth" },
  { cx: 390, cy: 420, label: "Automation" },
];

const LINKS = [
  { x1: 50, y1: 190, x2: 190, y2: 90, speed: "7s", delay: "0s" },
  { x1: 190, y1: 90, x2: 340, y2: 150, speed: "8s", delay: "1.1s" },
  { x1: 340, y1: 150, x2: 210, y2: 300, speed: "7.5s", delay: "0.6s" },
  { x1: 210, y1: 300, x2: 50, y2: 190, speed: "9s", delay: "1.7s" },
  { x1: 340, y1: 150, x2: 430, y2: 260, speed: "8.5s", delay: "0.3s" },
  { x1: 210, y1: 300, x2: 390, y2: 420, speed: "7.8s", delay: "1.4s" },
  { x1: 430, y1: 260, x2: 390, y2: 420, speed: "9.5s", delay: "2s" },
  { x1: 50, y1: 190, x2: 210, y2: 300, speed: "8.2s", delay: "0.9s" },
];

function ContactNetwork() {
  return (
    <div
      className="relative h-[380px] w-full select-none sm:h-[460px] lg:h-[540px]"
      role="img"
      aria-label="Abstract network illustration showing how ideas connect across AI, software, design, strategy, growth, and automation"
    >
      {/* Soft ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(91,95,255,0.1),transparent_62%)]"
        aria-hidden
      />

      <svg
        viewBox="0 0 480 480"
        fill="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        {/* Static guide lines */}
        {LINKS.map((link, i) => (
          <line
            key={`l-${i}`}
            x1={link.x1}
            y1={link.y1}
            x2={link.x2}
            y2={link.y2}
            stroke="rgba(91,95,255,0.16)"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
        ))}

        {/* Flowing dashes — animated pulses travelling along the lines */}
        {LINKS.map((link, i) => (
          <line
            key={`f-${i}`}
            x1={link.x1}
            y1={link.y1}
            x2={link.x2}
            y2={link.y2}
            stroke="url(#flowGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            className="contact-flow"
            style={{
              animationDuration: link.speed,
              animationDelay: link.delay,
            }}
          />
        ))}

        <defs>
          <linearGradient id="flowGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#5B5FFF" stopOpacity="0" />
            <stop offset="50%" stopColor="#5B5FFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Nodes */}
      {NODES.map((node, i) => (
        <motion.div
          key={node.label}
          className="absolute z-10"
          style={{ left: `${(node.cx / 480) * 100}%`, top: `${(node.cy / 480) * 100}%` }}
          initial={{ opacity: 0, scale: 0.5, x: "-50%", y: "-50%" }}
          animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
          transition={{ type: "spring", stiffness: 240, damping: 18, delay: 0.4 + i * 0.12 }}
        >
          <motion.div
            className="flex flex-col items-center"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5 + i * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
          >
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5B5FFF]/40 [animation-duration:3s]" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-[linear-gradient(135deg,#5B5FFF,#8B5CF6)] ring-4 ring-white shadow-[0_4px_16px_rgba(91,95,255,0.4)]" />
            </span>
            <span className="mt-3 rounded-full border border-[#E3E8F5] bg-white/95 px-3 py-1.5 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-[#5B5FFF] shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
              {node.label}
            </span>
          </motion.div>
        </motion.div>
      ))}

      {/* Centre mark — a subtle node the network flows through */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden>
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#D2D8F0] bg-white/90 shadow-[0_16px_48px_rgba(91,95,255,0.14)] backdrop-blur">
          <svg viewBox="0 0 40 40" fill="none" className="h-9 w-9">
            <path
              d="M20 3L37 11.5v17L20 37L3 28.5v-17L20 3Z"
              stroke="url(#monoGrad)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M20 11v18M12 15l16 10M28 15L12 25"
              stroke="url(#monoGrad)"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="monoGrad" x1="3" y1="3" x2="37" y2="37">
                <stop stopColor="#5B5FFF" />
                <stop offset="1" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <style jsx global>{`
        .contact-flow {
          stroke-dasharray: 3 18;
          stroke-dashoffset: 0;
          animation-name: contactFlow;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes contactFlow {
          to { stroke-dashoffset: -126; }
        }
        @media (prefers-reduced-motion: reduce) {
          .contact-flow {
            animation: none !important;
            stroke-dasharray: 0 0;
            stroke-opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */

export function ContactHero() {
  return (
    <section
      className="relative flex items-center overflow-hidden bg-white"
      style={{ minHeight: `calc(100vh - ${NAV_H}px)`, paddingTop: NAV_H }}
    >
      {/* Subtle lighting */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(91,95,255,0.07),transparent_62%)]" />
        <div className="absolute right-[4%] top-[14%] h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.07),transparent_62%)]" />
      </div>

      <div className="grid w-full items-center gap-12 px-6 py-14 sm:px-10 lg:grid-cols-12 lg:gap-8 lg:px-16 lg:py-0 xl:px-24">
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
            Contact · Let&apos;s talk
          </motion.p>

          <motion.h1
            className="mb-8 font-extrabold text-[#0F172A] leading-[0.98] tracking-[-0.03em]"
            style={{ fontSize: "clamp(38px, 7vw, 74px)" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
            }}
          >
            {HEADLINE.map((line, li) => (
              <span key={li} className="block overflow-hidden pb-[0.08em]">
                {line.words.map((w, wi) => (
                  <motion.span
                    key={wi}
                    variants={wordVariants}
                    className={`mr-[0.22em] inline-block last:mr-0 ${line.accent ? "text-[#5B5FFF]" : ""
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
            className="mb-10 max-w-[540px] text-[17px] leading-[1.7] text-[#52525B] sm:text-[18px]"
          >
            Whether you&apos;re launching a startup, scaling your business, or exploring AI
            solutions, we&apos;d love to hear about your project.
          </motion.p>

          <motion.div variants={lineVariants} className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <a
              href="#inquiry"
              className="group flex w-full items-center justify-center gap-2.5 rounded-[14px] bg-[#0F172A] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1E293B] sm:w-auto"
            >
              Start Your Project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="mailto:team.eaglenestcreations@gmail.com?subject=Discovery%20Call"
              className="flex w-full items-center justify-center gap-2.5 rounded-[14px] border border-[#D6DAE6] bg-white px-7 py-3.5 text-sm font-semibold text-[#0F172A] transition-colors duration-300 hover:border-[#0F172A] sm:w-auto"
            >
              <CalendarClock className="h-4 w-4 text-[#5B5FFF]" strokeWidth={1.8} />
              Book a Discovery Call
            </a>
          </motion.div>
        </motion.div>

        {/* ── Right: abstract network animation ── */}
        <motion.div
          className="relative lg:col-span-5"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.25 }}
        >
          <ContactNetwork />
        </motion.div>
      </div>
    </section>
  );
}
