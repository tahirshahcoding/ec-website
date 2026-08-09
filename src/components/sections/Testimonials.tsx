"use client";

import { motion } from "motion/react";
import { Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { container } from "@/lib/layout";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const testimonials = [
  {
    quote:
      "EagleNest took a vague idea and turned it into a product our investors actually asked to see. The attention to detail is on another level.",
    name: "Maya Chen",
    role: "CEO, Nexus AI",
    initials: "MC",
  },
  {
    quote:
      "The team didn't just build a brand — they built the confidence to go raise. Our seed round closed faster than we expected.",
    name: "Omar Hassan",
    role: "Founder, Verdant",
    initials: "OH",
  },
  {
    quote:
      "Weekly demos, honest feedback, zero drama. They shipped ahead of schedule and the dashboard our team uses every day is flawless.",
    name: "Priya Sharma",
    role: "CMO, Pulse",
    initials: "PS",
  },
];

const avatarGradients = [
  "bg-[linear-gradient(135deg,#5B5FFF,#8B5CF6)]",
  "bg-[linear-gradient(135deg,#8B5CF6,#EC4899)]",
  "bg-[linear-gradient(135deg,#3B82F6,#5B5FFF)]",
];

export function Testimonials() {
  return (
    <section className="bg-white py-16 sm:py-24 lg:py-32">
      <div className={container}>
        <SectionHeading
          align="center"
          eyebrow="Client stories"
          title="What partners say."
          description="We measure success by the businesses our work helps grow — here's what a few of them told us."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-5 sm:gap-7 md:grid-cols-3"
        >
          {testimonials.map(({ quote, name, role, initials }, i) => (
            <motion.figure
              key={name}
              variants={fadeInUp}
              className="flex flex-col rounded-[24px] border border-[#E3E8F5] bg-white p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(91,95,255,0.08)]"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-[#5B5FFF] text-[#5B5FFF]" strokeWidth={0} />
                  ))}
                </div>
                <Quote className="h-6 w-6 text-[#E3E8F5]" strokeWidth={1.5} />
              </div>
              <blockquote className="flex-1 text-[15px] leading-[1.75] text-[#334155]">
                “{quote}”
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-4">
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-full text-[13px] font-bold text-white ${avatarGradients[i % avatarGradients.length]}`}
                >
                  {initials}
                </span>
                <div>
                  <p className="text-[14px] font-bold text-[#0F172A]">{name}</p>
                  <p className="text-[12.5px] text-[#64748B]">{role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
