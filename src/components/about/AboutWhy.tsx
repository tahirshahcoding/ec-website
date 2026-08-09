"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Brain, Layers, Zap, PenTool, Headset, Users } from "lucide-react";
import { AboutSectionHeading } from "@/components/about/AboutSectionHeading";
import { container } from "@/lib/layout";

const features = [
  {
    icon: Brain,
    title: "AI-first thinking",
    description: "AI isn't an add-on — it's woven into how we analyze problems and design smart solutions.",
  },
  {
    icon: Layers,
    title: "Modern technology stack",
    description: "Next.js, Python, and cloud-native tools chosen for speed, security, and scale.",
  },
  {
    icon: Zap,
    title: "Performance focused",
    description: "Blazing-fast load times and clean architectures under the hood — always.",
  },
  {
    icon: PenTool,
    title: "Clean design",
    description: "Premium UI/UX that makes your product feel effortless and look world-class.",
  },
  {
    icon: Headset,
    title: "Long-term support",
    description: "We stay after launch — supporting, improving, and scaling with you.",
  },
];

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Python",
  "Tailwind CSS",
  "Motion",
  "PostgreSQL",
  "Docker",
  "AWS",
  "OpenAI",
];

export function AboutWhy() {
  return (
    <section className="border-y border-[#D6DAE6] bg-[#F5F6FF] py-24 lg:py-32">
      <div className={container}>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Left — sticky heading */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <AboutSectionHeading
                index="03"
                eyebrow="Why EagleNest"
                title="One partner. Every discipline."
                description="Instead of hiring separate agencies for software, AI, branding, and marketing, you work with one experienced partner capable of delivering complete digital solutions."
              />

              {/* Image Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ type: "spring", stiffness: 200, damping: 24, delay: 0.2 }}
                className="mt-10 relative aspect-[4/3] w-full overflow-hidden rounded-[24px] bg-[#F8FAFC] border border-[#E2E8F0] shadow-sm flex items-center justify-center"
              >
                <Image
                  src="/cube.png"
                  alt="EagleNest capabilities"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ type: "spring", stiffness: 200, damping: 24, delay: 0.3 }}
                className="mt-6 flex items-center gap-5 rounded-[20px] bg-white border border-[#E2E8F0] p-4 pr-6 shadow-sm"
              >
                <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#5B5FFF] text-white shadow-[0_8px_16px_rgba(91,95,255,0.25)]">
                  <Users className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[15px] font-bold text-[#0F172A]">We don&apos;t just build products.</p>
                  <p className="text-[14px] text-[#475569]">We build long-term partnerships.</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right — numbered rows */}
          <div className="lg:col-span-7">
            <div className="relative">
              {/* Vertical timeline line */}
              <div className="absolute left-[7px] top-8 bottom-8 w-px bg-[#E2E8F0]" />

              <div className="flex flex-col">
                {features.map((feature, i) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ type: "spring", stiffness: 220, damping: 24, delay: i * 0.05 }}
                    className="relative flex items-center gap-6 py-8 border-b border-[#E2E8F0] last:border-0"
                  >
                    {/* Intersection Node */}
                    <span className="absolute left-[3px] top-1/2 -translate-y-1/2 h-[9px] w-[9px] rounded-full bg-white border border-[#CBD5E1]" />

                    {/* Number */}
                    <span className="ml-[40px] text-[15px] font-bold text-[#5B5FFF] w-6 shrink-0">
                      0{i + 1}
                    </span>

                    {/* Icon Circle */}
                    <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-[#F1F5F9]">
                      <feature.icon className="h-7 w-7 text-[#5B5FFF]" strokeWidth={1.25} />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-[16px] font-bold tracking-tight text-[#0F172A]">
                        {feature.title}
                      </h3>
                      <p className="mt-1 text-[14px] leading-[1.6] text-[#475569]">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stack strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 200, damping: 24 }}
              className="mt-6 rounded-[20px] border border-[#E2E8F0] bg-white px-8 py-6 shadow-sm"
            >
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#5B5FFF]">
                The stack behind the studio
              </p>
              <div className="flex flex-wrap gap-2">
                {stack.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-[#D6DAE6] px-3.5 py-1.5 text-[12px] font-medium text-[#52525B] transition-colors duration-300 hover:border-[#5B5FFF]/30 hover:text-[#5B5FFF]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
