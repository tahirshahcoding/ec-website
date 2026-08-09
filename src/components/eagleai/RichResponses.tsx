"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, ChevronDown, ChevronUp, Layers } from "lucide-react";
import { useState } from "react";

const cardMotion = {
  hidden: { opacity: 0, y: 16, scale: 0.98, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function BlockLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] font-bold tracking-[0.15em] text-[#94A3B8] uppercase mb-4 flex items-center gap-2">
      <span className="w-4 h-px bg-gradient-to-r from-[#5B5FFF] to-transparent" />
      {children}
    </div>
  );
}

export function RecommendationBlock({
  title = "Next.js + FastAPI + PostgreSQL",
  reasons = ["Scalable", "Easy API integration", "Strong ecosystem"],
}: {
  title?: string;
  reasons?: string[];
}) {
  return (
    <motion.div
      variants={cardMotion}
      initial="hidden"
      animate="visible"
      className="my-6 rounded-2xl border border-[#E3E8F5] bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0_8px_30px_rgba(91,95,255,0.1)] hover:border-[#5B5FFF]/30 transition-all overflow-hidden"
    >
      <BlockLabel>Recommendation</BlockLabel>

      <h3 className="text-[16px] font-bold text-[#0F172A] mb-4">{title}</h3>

      <div>
        <div className="text-[12px] font-semibold tracking-wider text-[#64748B] uppercase mb-3">Why</div>
        <ul className="space-y-2">
          {reasons.map((reason, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + idx * 0.06, duration: 0.4 }}
              className="flex items-start gap-2 text-[14px] text-[#475569]"
            >
              <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#5B5FFF] to-[#8B5CF6] shrink-0" />
              {reason}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function PortfolioCard({
  title = "Hotel Management System",
  tags = ["Offline-first", "Next.js"],
  href = "/portfolio/hotel-management",
  description,
}: {
  title?: string;
  tags?: string[];
  href?: string;
  description?: string;
}) {
  return (
    <motion.div
      variants={cardMotion}
      initial="hidden"
      animate="visible"
      className="my-6 rounded-2xl border border-[#E3E8F5] bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0_8px_30px_rgba(15,23,42,0.08)] hover:border-[#5B5FFF]/30 hover:-translate-y-0.5 transition-all group"
    >
      <BlockLabel>Relevant project</BlockLabel>

      <h3 className="text-[16px] font-bold text-[#0F172A] mb-3">{title}</h3>

      {description && (
        <p className="text-[13px] text-[#475569] leading-relaxed mb-4">{description}</p>
      )}

      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag, idx) => (
          <motion.span
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + idx * 0.05 }}
            className="text-[11px] font-medium text-[#64748B] bg-[#F1F5F9] px-2.5 py-1 rounded-md border border-[#E3E8F5]"
          >
            {tag}
          </motion.span>
        ))}
      </div>

      <Link
        href={href}
        className="inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-[0.05em] text-[#5B5FFF] group-hover:text-[#4a4eff] transition-colors"
      >
        View project <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </motion.div>
  );
}

export function ServiceCard({
  title = "Custom Software Development",
  href = "/services/software",
  description,
}: {
  title?: string;
  href?: string;
  description?: string;
}) {
  return (
    <motion.div
      variants={cardMotion}
      initial="hidden"
      animate="visible"
      className="my-6 rounded-2xl border border-[#E3E8F5] bg-gradient-to-br from-white to-[#F8FAFC] p-5 hover:border-[#5B5FFF]/40 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(91,95,255,0.1)] transition-all group"
    >
      <BlockLabel>Recommended service</BlockLabel>

      <h3 className="text-[16px] font-bold text-[#0F172A] mb-3">{title}</h3>

      {description && (
        <p className="text-[13px] text-[#475569] leading-relaxed mb-5">{description}</p>
      )}

      <Link
        href={href}
        className="inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-[0.05em] text-[#5B5FFF] group-hover:text-[#4a4eff] transition-colors"
      >
        Explore service <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </motion.div>
  );
}

export function LeadAction({
  title = "READY TO DISCUSS THIS PROJECT?",
  buttonText = "Start a consultation",
  onClick,
}: {
  title?: string;
  buttonText?: string;
  onClick?: () => void;
}) {
  return (
    <motion.div
      variants={cardMotion}
      initial="hidden"
      animate="visible"
      className="my-8 flex flex-col items-start gap-4"
    >
      <div className="text-[11px] font-bold tracking-[0.15em] text-[#64748B] uppercase flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#5B5FFF] animate-pulse" />
        {title}
      </div>

      <motion.button
        whileHover={{ scale: 1.03, y: -1 }}
        whileTap={{ scale: 0.97 }}
        onClick={onClick}
        className="inline-flex items-center gap-2 rounded-full bg-[#0F172A] px-6 py-3 text-[12px] font-semibold tracking-[0.05em] text-white transition-all hover:bg-[#1E293B] shadow-[0_4px_14px_rgba(15,23,42,0.2)]"
      >
        {buttonText} <span className="text-[14px] leading-none">→</span>
      </motion.button>
    </motion.div>
  );
}

export function RagSources({
  sources = [
    { name: "Portfolio.md", url: "#" },
    { name: "EagleAI.md", url: "#" },
    { name: "Services.md", url: "#" },
  ],
}: {
  sources?: { name: string; url: string }[];
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="mt-8 pt-4 border-t border-[#E3E8F5]"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-[11px] font-medium text-[#64748B] hover:text-[#0F172A] transition-colors"
      >
        Based on EagleNest knowledge
        <span className="flex items-center gap-1 text-[#94A3B8]">
          <span className="w-1 h-1 rounded-full bg-[#CBD5E1]"></span>
          Sources · {sources.length}
          {expanded ? <ChevronUp size={12} className="ml-1" /> : <ChevronDown size={12} className="ml-1" />}
        </span>
      </button>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 rounded-xl border border-[#E3E8F5] bg-white overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-[#E3E8F5] bg-[#F8FAFC] text-[10px] font-bold tracking-[0.15em] text-[#94A3B8] uppercase">
            SOURCES
          </div>
          <ul className="divide-y divide-[#E3E8F5]">
            {sources.map((source, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05 * idx }}
              >
                <a href={source.url} className="flex items-center justify-between px-4 py-3 hover:bg-[#F8FAFC] transition-colors group text-[13px]">
                  <span className="text-[#475569] font-medium group-hover:text-[#0F172A]">{source.name}</span>
                  <ArrowUpRight size={13} className="text-[#94A3B8] group-hover:text-[#5B5FFF] transition-colors" />
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
}

export function ArchitectureBlock({
  title = "Recommended Architecture",
  stack = [],
  description,
  note,
}: {
  title?: string;
  stack?: string[];
  description?: string;
  note?: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      variants={cardMotion}
      initial="hidden"
      animate="visible"
      className="my-6 rounded-2xl border border-[#E3E8F5] bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0_8px_30px_rgba(91,95,255,0.08)] hover:border-[#5B5FFF]/30 transition-all"
    >
      <BlockLabel>
        <span className="flex items-center gap-1.5">
          <Layers size={11} /> Architecture
        </span>
      </BlockLabel>

      <h3 className="text-[16px] font-bold text-[#0F172A] mb-5">{title}</h3>

      {stack.length > 0 && (
        <div className="flex flex-col items-stretch">
          {stack.map((layer, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + idx * 0.1, duration: 0.4 }}
            >
              <div className="rounded-lg border border-[#E3E8F5] bg-gradient-to-br from-[#F8FAFC] to-white px-4 py-2.5 text-[13px] font-medium text-[#0F172A] text-center hover:border-[#5B5FFF]/40 transition-colors">
                {layer}
              </div>
              {idx < stack.length - 1 && (
                <div className="flex justify-center py-1 text-[#94A3B8]">
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden>
                    <path d="M6 1V11M6 11L2.5 7.5M6 11L9.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {description && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-[0.05em] text-[#5B5FFF] hover:text-[#4a4eff] transition-colors"
        >
          {expanded ? "Hide details" : "Expand details"}
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      )}

      {expanded && description && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 overflow-hidden"
        >
          <div className="rounded-xl bg-[#F8FAFC] border border-[#E3E8F5] p-4">
            <p className="text-[13px] text-[#475569] leading-relaxed">{description}</p>
            {note && <p className="text-[12px] text-[#94A3B8] mt-3">* {note}</p>}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
