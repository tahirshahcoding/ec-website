"use client";

import { motion } from "motion/react";
import { Code2, PenTool, Rocket, Search, TrendingUp } from "lucide-react";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { container } from "@/lib/layout";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discover",
    description: "We dig into your goals, market, and constraints before writing a line of code.",
  },
  {
    number: "02",
    icon: PenTool,
    title: "Design",
    description: "A clear strategy and a concrete plan with milestones you can hold us to.",
  },
  {
    number: "03",
    icon: Code2,
    title: "Build",
    description: "Sprints with weekly demos and honest communication — no black boxes.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch",
    description: "Ship, measure, and refine with real data instead of guesswork.",
  },
  {
    number: "05",
    icon: TrendingUp,
    title: "Scale",
    description: "A long-term partner for continuous improvement and growth.",
  },
];

export function Process() {
  return (
    <section className="bg-white py-16 sm:py-24 lg:py-32">
      <div className={container}>
        <SectionHeading
          eyebrow="How we work"
          title="A process built for results."
          description="Five clear stages between 'hello' and a product your customers love — with total visibility at every step."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-5"
        >
          {steps.map(({ number, icon: Icon, title, description }) => (
            <motion.div
              key={number}
              variants={fadeInUp}
              className="group relative flex flex-col rounded-[24px] border border-[#E3E8F5] bg-white p-7 shadow-[0_10px_40px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(91,95,255,0.08)]"
            >
              <div className="mb-8 flex items-center justify-between">
                <span
                  className="bg-[linear-gradient(100deg,#5B5FFF,#8B5CF6)] bg-clip-text text-[32px] font-extrabold tracking-[-0.02em] text-transparent"
                >
                  {number}
                </span>
                <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[linear-gradient(135deg,rgba(91,95,255,0.12),rgba(139,92,246,0.12)] text-[#5B5FFF] transition-all duration-300 group-hover:bg-[linear-gradient(135deg,#5B5FFF,#8B5CF6)] group-hover:text-white">
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </div>
              </div>
              <h3 className="text-[16px] font-bold text-[#0F172A]">{title}</h3>
              <p className="mt-2 text-[13.5px] leading-[1.6] text-[#475569]">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
