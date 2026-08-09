"use client";

import { motion } from "motion/react";
import { ArrowRight, Brain, Cpu, Lightbulb, PenTool } from "lucide-react";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { container } from "@/lib/layout";
import { fadeInRight, fadeInUp, staggerContainer } from "@/lib/motion";

const values = [
  {
    icon: Lightbulb,
    title: "Strategy first",
    description: "Every project begins with a sharp point of view, not a template.",
  },
  {
    icon: Cpu,
    title: "Engineering depth",
    description: "Senior builders who ship production-grade systems — no hand-offs.",
  },
  {
    icon: PenTool,
    title: "Design-led",
    description: "Interfaces that feel premium because they are deliberately crafted.",
  },
  {
    icon: Brain,
    title: "AI-native",
    description: "Intelligence woven into products from day one, not bolted on later.",
  },
];

export function About() {
  return (
    <section className="border-t border-[#E3E8F5] bg-[#F5F6FF] py-16 sm:py-24 lg:py-32">
      <div className={container}>
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <SectionHeading
              eyebrow="About EagleNest"
              title={
                <>
                  We don&apos;t just execute.
                  <br />
                  We think.
                </>
              }
              description="EagleNest is a tight-knit studio of engineers, designers, and marketers who believe great products come from great thinking. We partner with founders and teams to ship software that looks premium, works beautifully, and grows businesses."
            />
            <motion.div variants={fadeInUp}>
              <a
                href="/about"
                className="group inline-flex items-center gap-2 text-[15px] font-semibold text-[#5B5FFF] transition-colors hover:text-[#8B5CF6]"
              >
                More about the studio
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-5 sm:grid-cols-2"
          >
            {values.map(({ icon: Icon, title, description }) => (
              <motion.div
                key={title}
                variants={fadeInRight}
                className="group rounded-[24px] border border-[#E3E8F5] bg-white p-7 shadow-[0_10px_40px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(91,95,255,0.08)]"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[14px] bg-[linear-gradient(135deg,rgba(91,95,255,0.12),rgba(139,92,246,0.12)] text-[#5B5FFF] transition-colors duration-300 group-hover:text-[#8B5CF6]">
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </div>
                <h3 className="text-[16px] font-bold text-[#0F172A]">{title}</h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-[#475569]">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
