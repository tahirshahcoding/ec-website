"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { testimonials } from "@/data/portfolio";
import { containerWide } from "@/lib/layout";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import Link from "next/link";

export function Testimonials() {
  return (
    <section className="bg-[#F5F6FF] py-24">
      <div className={containerWide}>
        <div className="flex flex-col gap-12 lg:flex-row">
          {/* Header Area */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="shrink-0 lg:w-[320px]"
          >
            <motion.p variants={fadeInUp} className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#5B5FFF]">
              What Our Clients Say
            </motion.p>
            <motion.h2 variants={fadeInUp} className="mb-6 text-[32px] font-extrabold leading-[1.1] tracking-[-0.04em] text-[#0F172A] md:text-[40px]">
              Real Results.<br />
              Real <span className="text-[#5B5FFF]">Relationships</span>.
            </motion.h2>
            <motion.p variants={fadeInUp} className="mb-8 text-[14px] leading-[1.65] text-[#475569]">
              We don&apos;t just complete projects, we build partnerships that drive long-term growth — across software and digital marketing.
            </motion.p>

            <motion.div variants={fadeInUp}>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full border border-[#D6DAE6] bg-white px-6 py-3 text-[11px] font-bold tracking-wider uppercase text-[#5B5FFF] transition-all hover:border-[#5B5FFF]"
              >
                Start your project
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Testimonials Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex-grow"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {testimonials.map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="flex flex-col rounded-2xl bg-white p-8 shadow-[0_4px_20px_rgba(15,23,42,0.03)] border border-[#D6DAE6]"
                >
                  <svg className="mb-6 h-8 w-8 text-[#5B5FFF]/20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>

                  <p className="mb-8 flex-grow text-[14px] leading-[1.65] text-[#3F3F46]">
                    {testimonial.quote}
                  </p>

                  <div className="flex items-center gap-4 border-t border-[#E3E8F5] pt-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#5B5FFF]/10 text-[12px] font-extrabold text-[#5B5FFF]">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-[#0F172A]">{testimonial.name}</div>
                      <div className="text-[11px] text-[#475569]">{testimonial.title}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
