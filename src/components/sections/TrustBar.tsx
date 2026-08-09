"use client";

import { motion } from "motion/react";
import { fadeInUp } from "@/lib/motion";

const BRANDS = [
  { name: "Google", className: "font-bold tracking-tight" },
  { name: "Microsoft", className: "font-semibold tracking-tight" },
  { name: "Slack", className: "font-bold tracking-tight" },
  { name: "AWS", className: "font-bold tracking-[0.18em]" },
  { name: "Notion", className: "font-medium tracking-tight" },
  { name: "Stripe", className: "font-bold tracking-tight" },
  { name: "Vercel", className: "font-black tracking-[0.14em]" },
];

export function TrustBar() {
  return (
    <section className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 pb-6 bg-white">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="w-full rounded-[20px] sm:rounded-[28px] border border-[#E3E8F5] bg-white shadow-[0_20px_60px_rgba(91,95,255,0.06)] px-4 sm:px-6 md:px-12 py-8 sm:py-10"
      >
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.24em] text-[#64748B] mb-8">
          Trusted by teams at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 lg:gap-x-16">
          {BRANDS.map(({ name, className }) => (
            <span
              key={name}
              className={`text-[19px] text-[#64748B] transition-colors duration-300 hover:text-[#475569] cursor-default ${className}`}
            >
              {name}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
