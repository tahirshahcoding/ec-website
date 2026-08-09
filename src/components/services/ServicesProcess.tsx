"use client";

import { motion } from "motion/react";
import { Search, ClipboardList, Code2, Rocket, LineChart, ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";

interface Step {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "01",
    icon: Search,
    title: "Discover",
    description: "We learn about your business, goals, and challenges.",
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "Plan",
    description: "We strategize and create a roadmap tailored to you.",
  },
  {
    number: "03",
    icon: Code2,
    title: "Build",
    description: "We design, develop, and bring ideas to life.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch",
    description: "We launch, test, and ensure everything works.",
  },
  {
    number: "05",
    icon: LineChart,
    title: "Grow",
    description: "We optimize and scale for long-term success.",
  },
];

const processColors = [
  { text: "text-[#8B5CF6]", bg: "bg-[#8B5CF6]/10", border: "border-[#8B5CF6]/20" }, // 01 Discover
  { text: "text-pink-500", bg: "bg-pink-50", border: "border-pink-100" }, // 02 Plan
  { text: "text-blue-500", bg: "bg-blue-50", border: "border-blue-100" }, // 03 Build
  { text: "text-teal-500", bg: "bg-teal-50", border: "border-teal-100" }, // 04 Launch
  { text: "text-[#8B5CF6]", bg: "bg-[#8B5CF6]/10", border: "border-[#8B5CF6]/20" }, // 05 Grow
];

export function ServicesProcess() {
  return (
    <section className="relative bg-white py-24 lg:py-32">
      <div className="relative mx-auto w-full max-w-[1800px] px-6 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Header Section */}
        <div className="mb-20">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#5B5FFF]">
            Our Process
            <span className="inline-block h-px w-8 bg-[#5B5FFF]/30" aria-hidden />
          </p>
          <h2 className="text-[32px] font-extrabold leading-[1.1] tracking-[-0.04em] text-[#0F172A] md:text-[42px] lg:text-[48px]">
            A Proven Process<br />
            That Delivers <span className="text-[#8B5CF6]">Results.</span>
          </h2>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col md:flex-row md:items-start justify-between gap-8 md:gap-4"
        >
          {steps.map((step, index) => {
            const color = processColors[index % processColors.length];
            return (
            <div key={step.number} className="flex-1 relative flex flex-col md:flex-row items-center md:items-start group">
              <motion.div variants={fadeInUp} className="flex flex-col flex-1 z-10 w-full text-center md:text-left items-center md:items-start">
                
                {/* Icon Circle */}
                <div className={`relative flex h-24 w-24 mb-6 items-center justify-center rounded-full shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md border ${color.bg} ${color.border}`}>
                  <step.icon className={`h-8 w-8 transition-transform duration-300 group-hover:scale-110 ${color.text}`} strokeWidth={1.5} />
                </div>
                
                {/* Text Content */}
                <div className="flex flex-col">
                  <span className="text-[12px] font-semibold text-[#6B7280] mb-1">
                    {step.number}
                  </span>
                  <h3 className="text-[16px] font-bold tracking-[-0.01em] text-[#0F172A] mb-2">{step.title}</h3>
                  <p className="text-[13px] leading-[1.6] text-[#475569] max-w-[200px] mx-auto md:mx-0">{step.description}</p>
                </div>
              </motion.div>

              {/* Arrow Indicator (hidden on mobile, last item has none) */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute top-12 left-1/2 md:left-auto md:-right-4 lg:-right-8 -translate-y-1/2 items-center justify-center z-0">
                   <ChevronRight className="w-5 h-5 text-[#CBD5E1]" />
                </div>
              )}
            </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
