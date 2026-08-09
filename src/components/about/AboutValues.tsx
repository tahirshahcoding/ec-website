"use client";

import { motion } from "motion/react";
import { ShieldCheck, Lightbulb, Target, Users, TrendingUp } from "lucide-react";

import { container } from "@/lib/layout";
import { blurInUp, staggerContainer } from "@/lib/motion";

const values = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    description: "We believe in honesty, transparency, and building trust in everything we do.",
    bgClass: "bg-[#F3E8FF]",
    iconClass: "text-[#9333EA]",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We embrace creativity and technology to deliver solutions that make a difference.",
    bgClass: "bg-[#E0F2FE]",
    iconClass: "text-[#0284C7]",
  },
  {
    icon: Target,
    title: "Excellence",
    description: "We are committed to delivering high-quality work that exceeds expectations.",
    bgClass: "bg-[#FCE7F3]",
    iconClass: "text-[#DB2777]",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We work closely with our clients as partners, not just service providers.",
    bgClass: "bg-[#CCFBF1]",
    iconClass: "text-[#0D9488]",
  },
  {
    icon: TrendingUp,
    title: "Growth",
    description: "We are obsessed with growth – for our clients, our team, and our company.",
    bgClass: "bg-[#E0E7FF]",
    iconClass: "text-[#4F46E5]",
  },
];

export function AboutValues() {
  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      {/* Soft ambient light */}
      <div className="pointer-events-none absolute right-[8%] top-[10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(91,95,255,0.04),transparent_62%)]" aria-hidden />

      <div className={`${container} relative`}>
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-[12px] font-bold uppercase tracking-[0.2em] text-[#9333EA]"
        >
          Our Core Values
        </motion.p>

        {/* Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
        >
          {values.map(({ icon: Icon, title, description, bgClass, iconClass }) => (
            <motion.div
              key={title}
              variants={blurInUp}
              className="group relative flex flex-col rounded-[24px] border border-[#E2E8F0] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#CBD5E1] hover:shadow-md"
            >
              {/* Soft pastel squircle icon box */}
              <div
                className={`mb-8 flex h-[60px] w-[60px] items-center justify-center rounded-[20px] ${bgClass} transition-transform duration-300 group-hover:scale-105`}
              >
                <Icon className={`h-7 w-7 ${iconClass}`} strokeWidth={1.5} />
              </div>

              <h3 className="text-[16px] font-bold tracking-tight text-[#0F172A]">{title}</h3>
              <p className="mt-3 text-[13px] leading-[1.8] text-[#475569]">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
