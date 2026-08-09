"use client";

import { motion } from "motion/react";
import { BrainCircuit, Cloud, Database, Layout, Server } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { container } from "@/lib/layout";
import { blurInUp, staggerContainer } from "@/lib/motion";

interface StackGroup {
  icon: LucideIcon;
  label: string;
  items: string[];
}

const groups: StackGroup[] = [
  {
    icon: Layout,
    label: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion"],
  },
  {
    icon: Server,
    label: "Backend",
    items: ["Python", "FastAPI", "Django", "Node.js"],
  },
  {
    icon: BrainCircuit,
    label: "AI",
    items: ["OpenAI", "LangChain", "LlamaIndex", "Vector Databases", "RAG", "AI Agents", "Machine Learning"],
  },
  {
    icon: Database,
    label: "Database",
    items: ["PostgreSQL", "Supabase", "MySQL", "SQLite"],
  },
  {
    icon: Cloud,
    label: "Infrastructure",
    items: ["Docker", "Vercel", "AWS", "Cloudflare", "GitHub Actions"],
  },
];

export function TechStack() {
  return (
    <section className="relative overflow-hidden border-y border-[#D6DAE6] bg-white py-24 lg:py-32">
      {/* Soft ambient light */}
      <div className="pointer-events-none absolute left-[8%] top-[18%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(91,95,255,0.04),transparent_62%)]" aria-hidden />

      <div className={`${container} relative`}>
        <SectionHeading
          index="04"
          eyebrow="Technology stack"
          title="Modern tools. Proven choices."
          description="A pragmatic, current stack — chosen for performance, scalability, and the people who have to maintain it after we hand it over."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
        >
          {groups.map(({ icon: Icon, label, items }) => (
            <motion.div
              key={label}
              variants={blurInUp}
              className="group flex flex-col rounded-[22px] border border-[#D6DAE6] bg-white p-7 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#5B5FFF]/30 hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
            >
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#F5F6FF] text-[#5B5FFF] ring-1 ring-[#E3E8F5] transition-all duration-300 group-hover:bg-[linear-gradient(135deg,#5B5FFF,#8B5CF6)] group-hover:text-white">
                <Icon className="h-5 w-5" strokeWidth={1.7} />
              </div>

              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
                {label}
              </p>

              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#D6DAE6] bg-white px-3 py-1 text-[12px] font-medium text-[#52525B] transition-colors duration-300 hover:border-[#5B5FFF]/30 hover:text-[#5B5FFF]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
