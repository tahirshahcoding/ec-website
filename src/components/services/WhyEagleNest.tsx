"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { container } from "@/lib/layout";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const reasons = [
  "AI-first approach",
  "Modern technology stack",
  "Premium UI/UX",
  "Scalable architecture",
  "Performance-focused development",
  "Business-oriented solutions",
  "Transparent communication",
  "Long-term partnerships",
];

export function WhyEagleNest() {
  return (
    <section className="relative overflow-hidden border-y border-[#D6DAE6] bg-white py-24 lg:py-32">
      {/* Soft ambient light */}
      <div className="pointer-events-none absolute left-[6%] top-[16%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.04),transparent_62%)]" aria-hidden />

      <div className={`${container} relative`}>
        <SectionHeading
          index="06"
          eyebrow="Why EagleNest"
          title="Why clients choose us."
          description="Not just a software house or a marketing agency — a technology partner that designs, builds, launches, and scales intelligent digital products."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason}
              variants={fadeInUp}
              className="group flex items-start gap-3.5 rounded-[18px] border border-[#D6DAE6] bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#5B5FFF]/30 hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
            >
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#5B5FFF,#8B5CF6)] text-white transition-transform duration-300 group-hover:scale-110"
                aria-hidden
              >
                <Check className="h-3 w-3" strokeWidth={2.6} />
              </span>
              <p className="text-[15px] font-semibold leading-snug text-[#0F172A]">{reason}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
