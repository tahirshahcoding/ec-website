"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { containerWide } from "@/lib/layout";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export function PortfolioHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-28 pb-14 lg:pt-36 lg:pb-20">
      <div className={containerWide}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.div variants={fadeInUp}>
            <p className="mb-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#5B5FFF]">
              Our Work
              <span className="inline-block h-px w-8 bg-[#5B5FFF]" aria-hidden />
            </p>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-[38px] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#0F172A] md:text-[54px] lg:text-[64px]"
          >
            Work that
            <br />
            <span className="text-[#5B5FFF]">performs</span> for you.
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mt-7 max-w-xl text-[16px] leading-[1.7] text-[#475569]"
          >
            From enterprise software and AI systems to marketing campaigns — every
            project here is a complete story of strategy, build, and measurable results.
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-10">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-[#111827] px-8 py-4 text-[12px] font-bold tracking-wider uppercase text-white transition-all hover:bg-[#5B5FFF]"
            >
              Start a Project
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
