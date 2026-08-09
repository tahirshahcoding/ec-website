"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ArrowRight, Plus } from "lucide-react";
import { EagleOrb } from "@/components/eagleai/EagleOrb";

const suggestions = [
  { label: "Build me an ERP", icon: "🏗️" },
  { label: "Show relevant projects", icon: "🗂️" },
  { label: "Estimate my project", icon: "📊" },
  { label: "What can EagleNest build?", icon: "🦅" },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function EagleAILandingPage() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const sessionId = Math.random().toString(36).substring(2, 9);
    sessionStorage.setItem(`eagleai_initial_query_${sessionId}`, query);
    router.push(`/eagleai/session/${sessionId}`);
  };

  return (
    <div className="relative min-h-screen pt-[120px] pb-24 px-4 sm:px-6 flex flex-col items-center overflow-hidden">
      {/* Ambient background */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div
          className="orb-blob orb-blob-a"
          style={{ top: "6%", left: "8%", width: 420, height: 420, background: "rgba(91,95,255,0.22)" }}
        />
        <div
          className="orb-blob orb-blob-b"
          style={{ top: "18%", right: "6%", width: 380, height: 380, background: "rgba(139,92,246,0.18)" }}
        />
        <div
          className="orb-blob orb-blob-a"
          style={{ bottom: "4%", left: "32%", width: 460, height: 460, background: "rgba(236,72,153,0.10)" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-3xl flex flex-col items-center mt-8 md:mt-14"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-10"
        >
          <EagleOrb size={92} float />
        </motion.div>

        <motion.div variants={container} initial="hidden" animate="visible" className="flex flex-col items-center mb-10">
          <motion.p
            variants={item}
            className="text-[12px] font-bold tracking-[0.22em] text-[#64748B] mb-3 uppercase flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            EagleNest
          </motion.p>
          <motion.h1
            variants={item}
            className="text-5xl md:text-[72px] lg:text-[88px] font-bold tracking-tight leading-none mb-6 text-center"
          >
            <span className="text-gradient-shimmer">EagleAI</span>
          </motion.h1>
          <motion.p
            variants={item}
            className="text-lg md:text-2xl text-[#475569] font-medium text-center max-w-xl"
          >
            Intelligence for your next digital move.
          </motion.p>
        </motion.div>

        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full relative group mt-2"
        >
          <p className="text-[13px] font-medium text-[#64748B] mb-3 ml-4">
            Describe what you&apos;re trying to build.
          </p>

          <div className="relative rounded-2xl md:rounded-[32px] border border-[#E3E8F5] bg-white/90 backdrop-blur-sm shadow-[0_8px_30px_rgba(15,23,42,0.04)] group-focus-within:shadow-[0_8px_50px_rgba(91,95,255,0.12)] group-focus-within:border-[#5B5FFF]/40 transition-all duration-300 overflow-hidden">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="I want to build a management system for my hotel..."
              className="w-full bg-transparent px-6 py-5 md:py-6 text-[15px] md:text-[17px] text-[#0F172A] placeholder:text-[#94A3B8] resize-none focus:outline-none min-h-[140px]"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSearch(e);
                }
              }}
            />

            <div className="absolute bottom-4 right-4 left-4 flex items-center justify-between">
              <button
                type="button"
                className="hidden sm:flex items-center gap-1.5 text-[12px] font-semibold tracking-[0.05em] text-[#64748B] hover:text-[#0F172A] transition-colors group/ctx"
              >
                <span className="w-4 h-4 rounded-full border border-[#CBD5E1] flex items-center justify-center transition-all group-hover/ctx:border-[#5B5FFF] group-hover/ctx:text-[#5B5FFF]">
                  <Plus size={10} strokeWidth={2.5} />
                </span>
                Add context
              </button>

              <motion.button
                type="submit"
                disabled={!query.trim()}
                whileHover={query.trim() ? { scale: 1.04 } : undefined}
                whileTap={query.trim() ? { scale: 0.96 } : undefined}
                className={query.trim()
                  ? "flex items-center gap-2 rounded-full bg-[#5B5FFF] px-5 py-2.5 text-[12px] font-semibold tracking-[0.1em] text-white hover:bg-[#4a4eff] shadow-[0_4px_16px_rgba(91,95,255,0.35)] transition-shadow"
                  : "flex items-center gap-2 rounded-full bg-[#E2E8F0] px-5 py-2.5 text-[12px] font-semibold tracking-[0.1em] text-[#94A3B8] cursor-not-allowed"}
              >
                Send
                <motion.span
                  animate={focused && query.trim() ? { x: [0, 3, 0] } : {}}
                  transition={{ repeat: Infinity, duration: 1.4 }}
                  className="text-[14px] leading-none"
                >
                  →
                </motion.span>
              </motion.button>
            </div>
          </div>
        </motion.form>

        {!query.trim() && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-12 w-full flex flex-col items-center"
          >
            <p className="text-[11px] font-semibold tracking-[0.15em] text-[#94A3B8] uppercase mb-6">
              Try asking
            </p>
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap justify-center gap-3 max-w-2xl"
            >
              {suggestions.map(({ label, icon }) => (
                <motion.button
                  key={label}
                  variants={item}
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setQuery(label)}
                  className="group flex items-center gap-2 rounded-full border border-[#E3E8F5] bg-white/80 px-4 py-2.5 text-[13.5px] font-medium text-[#475569] hover:text-[#5B5FFF] hover:border-[#5B5FFF]/40 hover:shadow-[0_4px_20px_rgba(91,95,255,0.12)] transition-all"
                >
                  <span className="text-[14px]">{icon}</span>
                  {label}
                  <ArrowRight
                    size={13}
                    className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                  />
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
