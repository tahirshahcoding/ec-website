"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { serviceIcons } from "@/components/services/serviceIcons";
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

const LINES = [
  { words: ["Every", "discipline."], accent: false },
  { words: ["One", "studio."], accent: true },
];

const FOCUS_WORDS = ["AI", "Software", "Web", "Mobile", "UI/UX", "Branding", "Marketing", "SEO", "Content", "Cloud"];

const tags: Record<string, string> = {
  ai: "Intelligence",
  software: "Engineering",
  web: "Front-end",
  mobile: "Mobile",
  uiux: "Design",
  branding: "Brand",
  marketing: "Growth",
  seo: "Visibility",
  content: "Media",
  cloud: "Infrastructure",
};

/* ─── Rotating focus word ───────────────────────────────────────────────── */

function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((current) => (current + 1) % FOCUS_WORDS.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-flex h-[1.15em] items-end overflow-hidden align-baseline">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={FOCUS_WORDS[index]}
          initial={{ y: "105%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-105%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[linear-gradient(100deg,#5B5FFF,#8B5CF6,#EC4899)] bg-clip-text font-black text-transparent tracking-[-0.03em]"
          style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
        >
          {FOCUS_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ─── Capability index ──────────────────────────────────────────────────── */

function CapabilityIndex() {
  return (
    <motion.div
      variants={lineVariants}
      className="overflow-hidden rounded-[22px] border border-[#D6DAE6] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)]"
    >
      <div className="flex items-center justify-between border-b border-[#D6DAE6] px-5 py-3.5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B7280]">
          Capability index
        </p>
        <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#5B5FFF]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute h-full w-full animate-ping rounded-full bg-[#5B5FFF]/40" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-[#5B5FFF]" />
          </span>
          Ten of ten
        </span>
      </div>

      {services.map((service, i) => {
        const Icon = serviceIcons[service.icon];
        return (
          <a
            key={service.id}
            href="#services"
            className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-[#E3E8F5] px-5 py-3.5 transition-colors duration-300 last:border-b-0 hover:bg-[#F5F6FF]"
          >
            <span className="text-[11px] font-semibold tabular-nums text-[#C0C0C8] transition-colors duration-300 group-hover:text-[#5B5FFF]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="flex items-center gap-3.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#F5F6FF] text-[#5B5FFF] ring-1 ring-[#E3E8F5] transition-all duration-300 group-hover:bg-[linear-gradient(135deg,#5B5FFF,#8B5CF6)] group-hover:text-white">
                <Icon className="h-4 w-4" strokeWidth={1.7} />
              </span>
              <span className="text-[15px] font-semibold tracking-[-0.01em] text-[#0F172A] transition-colors duration-300 group-hover:text-[#5B5FFF]">
                {service.title}
              </span>
            </span>
            <span className="flex items-center gap-3">
              <span className="hidden text-[10px] font-semibold uppercase tracking-[0.16em] text-[#64748B] sm:block">
                {tags[service.id] ?? service.subServices.length}
              </span>
              <ArrowUpRight
                className="h-4 w-4 text-[#CBD5E1] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#5B5FFF]"
                strokeWidth={1.8}
              />
            </span>
          </a>
        );
      })}
    </motion.div>
  );
}

/* ─── Service marquee ───────────────────────────────────────────────────── */

const marqueeItems = [
  ...services.map((s) => s.title),
  "AI Agents",
  "SaaS Platforms",
  "Design Systems",
  "Lead Generation",
  "CI/CD Pipelines",
  "Cross-platform Apps",
];

function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div className="mt-16 overflow-hidden border-t border-[#D6DAE6] pt-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <motion.div
        className="flex w-max items-center gap-10"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 34, ease: "linear", repeat: Infinity }}
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#6B7280] transition-colors duration-300 hover:text-[#5B5FFF]">
              {item}
            </span>
            <span className="h-1.5 w-1.5 rotate-45 bg-[#5B5FFF]/40" aria-hidden />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Section ───────────────────────────────────────────────────────────── */

export function ServicesHero() {
  return (
    <section className="relative flex flex-col overflow-hidden bg-white">
      {/* Top half with image background */}
      <div 
        className="relative flex flex-col justify-center overflow-hidden bg-[#0F172A]"
        style={{ minHeight: `calc(100vh - ${NAV_H}px)`, paddingTop: NAV_H }}
      >
        <Image 
          src="/services-hero.png" 
          alt="Digital Services" 
          fill 
          className="object-cover opacity-40 mix-blend-screen"
          priority 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/40 via-[#0F172A]/60 to-[#0F172A]/90" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 mx-auto w-full max-w-[1400px] flex-1 px-6 pb-16 pt-10 sm:px-10 lg:px-16 xl:px-24 flex flex-col justify-center"
        >
          <div className="max-w-[800px]">
            {/* Top meta row */}
            <motion.div
              variants={lineVariants}
              className="flex items-center justify-between border-b border-white/10 pb-5"
            >
              <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">
                <span className="inline-block h-px w-8 bg-[#5B5FFF]" aria-hidden />
                Services · 01—10
              </p>
              <p className="hidden text-[11px] font-medium uppercase tracking-[0.24em] text-white/60 sm:block">
                Est. 2022 · Swat, PK
              </p>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="pt-12 font-black text-white leading-[1] tracking-[-0.03em] sm:pt-16"
              style={{ fontSize: "clamp(40px, 8vw, 96px)" }}
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
                        line.accent ? "bg-[linear-gradient(100deg,#5B5FFF,#8B5CF6)] bg-clip-text text-transparent" : ""
                      }`}
                    >
                      {w}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.h1>

            {/* Rotating focus line */}
            <motion.div variants={lineVariants} className="mt-8 flex items-center gap-4 sm:mt-10">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute h-full w-full animate-ping rounded-full bg-[#22C55E]/50" />
                <span className="relative h-2 w-2 rounded-full bg-[#22C55E]" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
                Focus
              </span>
              <RotatingWord />
            </motion.div>

            {/* Copy + CTAs */}
            <motion.p
              variants={lineVariants}
              className="mt-6 max-w-[560px] text-[16px] leading-[1.7] text-white/80 sm:text-[18px]"
            >
              Instead of isolated services, EagleNest combines engineering, artificial intelligence,
              design, branding, and digital marketing into one integrated ecosystem — every engagement
              focused on solving real business problems.
            </motion.p>

            <motion.div variants={lineVariants} className="mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Link
                href="/contact"
                className="group flex w-full items-center justify-center gap-2.5 rounded-[14px] bg-[#5B5FFF] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4B4FE0] sm:w-auto"
              >
                Start your project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#services"
                className="flex w-full items-center justify-center gap-2.5 rounded-[14px] border border-white/20 bg-white/5 backdrop-blur-md px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/10 hover:border-white/40 sm:w-auto"
              >
                View the services
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom half with Capability Index and Marquee */}
      <div className="relative z-20 bg-white pt-16 pb-8">
        <div className={container}>
          <div className="lg:max-w-[720px] mx-auto">
            <CapabilityIndex />
          </div>
        </div>
        
        {/* Marquee — anchored to the bottom */}
        <div className={container}>
          <Marquee />
        </div>
      </div>
    </section>
  );
}
