"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { container } from "@/lib/layout";
import { blurInUp, staggerContainer } from "@/lib/motion";

export function ContactCTA() {
  return (
    <section className="relative overflow-hidden border-t border-[#E3E8F5] bg-[#F5F6FF] py-24 lg:py-36">
      {/* Ambient lighting */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(91,95,255,0.09),transparent_62%)]" />
        <div className="absolute bottom-[6%] left-[12%] h-[240px] w-[240px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.07),transparent_62%)]" />
        <div className="absolute right-[10%] top-[14%] h-[220px] w-[220px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.06),transparent_62%)]" />
      </div>

      <div className={container}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto flex max-w-[760px] flex-col items-center text-center"
        >
          <motion.p
            variants={blurInUp}
            className="mb-8 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#6B7280]"
          >
            <span className="inline-block h-px w-8 bg-[#5B5FFF]" aria-hidden />
            One conversation away
            <span className="inline-block h-px w-8 bg-[#5B5FFF]" aria-hidden />
          </motion.p>

          <motion.h2
            variants={blurInUp}
            className="font-extrabold text-[#0F172A] leading-[1.02] tracking-[-0.03em]"
            style={{ fontSize: "clamp(32px, 5.5vw, 62px)" }}
          >
            Ready to Build Your Next
            <br />
            <span className="bg-[linear-gradient(100deg,#5B5FFF,#8B5CF6)] bg-clip-text text-transparent">
              Digital Product?
            </span>
          </motion.h2>

          <motion.p variants={blurInUp} className="mt-6 max-w-[520px] text-[16px] leading-[1.7] text-[#475569] sm:text-[17.5px]">
            Let&apos;s transform your ideas into intelligent digital experiences.
          </motion.p>

          <motion.div variants={blurInUp} className="mt-10 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
            <Link
              href="#inquiry"
              className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-[linear-gradient(100deg,#5B5FFF,#8B5CF6)] px-9 py-4 text-[15px] font-semibold text-white shadow-[0_14px_40px_rgba(91,95,255,0.32)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_55px_rgba(91,95,255,0.42)] sm:w-auto"
            >
              Schedule a Free Consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.2} />
            </Link>
            <Link
              href="/portfolio"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-[#D6DAE6] bg-white px-9 py-4 text-[15px] font-semibold text-[#0F172A] transition-colors duration-300 hover:border-[#0F172A] sm:w-auto"
            >
              Explore Our Portfolio
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
