"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { container } from "@/lib/layout";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const industries = [
  "Healthcare",
  "Education",
  "Restaurants",
  "Hospitality",
  "Law Firms",
  "Travel & Tourism",
  "Retail",
  "Construction",
  "Manufacturing",
  "Professional Services",
  "Startups",
  "SMEs",
];

export function Industries() {
  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      {/* Soft ambient light */}
      <div className="pointer-events-none absolute right-[6%] top-[10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.04),transparent_62%)]" aria-hidden />

      <div className={`${container} relative`}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          {/* Left — intro */}
          <div className="lg:col-span-4">
            <SectionHeading
              index="03"
              eyebrow="Industries"
              title="Built for your industry."
              description="Our solutions are engineered for the realities of specific industries — not generic software bolted onto different names."
            />
          </div>

          {/* Right — ruled panel */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-8"
          >
            <div className="grid gap-x-12 rounded-[22px] border border-[#D6DAE6] bg-white px-7 py-2 shadow-[0_8px_30px_rgba(15,23,42,0.04)] sm:grid-cols-2 lg:grid-cols-3 lg:px-10">
              {industries.map((industry) => (
                <motion.div
                  key={industry}
                  variants={fadeInUp}
                  className="group flex items-center justify-between border-b border-[#E3E8F5] py-4.5 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:[&:nth-last-child(-n+3)]:border-b-0"
                >
                  <span className="text-[15px] font-medium text-[#3F3F46] transition-colors duration-300 group-hover:text-[#0F172A]">
                    {industry}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-[#CBD5E1] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#5B5FFF]" strokeWidth={1.8} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
