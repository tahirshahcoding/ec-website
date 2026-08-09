"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Clock, Settings, Target } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";

interface CTAProps {
  eyebrow?: string;
  title?: React.ReactNode;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

const DEFAULT_TITLE = (
  <>
    Let&apos;s Create Something<br />
    <span className="text-[#8B5CF6]">Extraordinary</span> Together.
  </>
);

const features = [
  {
    icon: Clock,
    title: "Quick Response",
    description: "We reply within 24 hours",
  },
  {
    icon: Settings,
    title: "Tailored Solutions",
    description: "Solutions built specifically for your business",
  },
  {
    icon: Target,
    title: "Results Focused",
    description: "We focus on measurable growth and impact",
  },
];

export function CTA({
  eyebrow = "Ready to get started?",
  title = DEFAULT_TITLE,
  description = "Have a project in mind? Let's turn your ideas into powerful digital experiences.",
  primaryLabel = "Let's talk about your project",
  primaryHref = "/contact",
  secondaryLabel,
  secondaryHref = "/portfolio",
}: CTAProps) {
  return (
    <section className="bg-[#F5F6FF] py-16 sm:py-24 lg:py-32">
      <div className="mx-auto w-full max-w-[1800px] px-6 sm:px-8 lg:px-12 xl:px-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative overflow-hidden rounded-[32px] bg-white border border-[#D6DAE6] shadow-[0_8px_30px_rgba(15,23,42,0.04)]"
        >
          {/* Background decoration */}
          <div className="absolute right-0 bottom-0 pointer-events-none opacity-50">
             <svg width="400" height="200" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M400 200V0C400 0 350 100 200 100C50 100 0 200 0 200H400Z" fill="url(#paint0_linear)" />
                <defs>
                  <linearGradient id="paint0_linear" x1="200" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#8B5CF6" stopOpacity="0.05" />
                    <stop offset="1" stopColor="#5B5FFF" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
             </svg>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row gap-10 sm:gap-16 p-6 sm:p-10 lg:p-16 xl:p-20">
            {/* Left side: Text & CTA */}
            <div className="flex-1 max-w-xl">
              <motion.p
                variants={fadeInUp}
                className="mb-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#8B5CF6]"
              >
                {eyebrow}
              </motion.p>

              <motion.h2
                variants={fadeInUp}
                className="font-extrabold leading-[1.1] tracking-[-0.04em] text-[#0F172A]"
                style={{ fontSize: "clamp(28px, 5vw, 44px)" }}
              >
                {title}
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                className="mt-6 mb-10 text-[15px] leading-[1.7] text-[#475569] max-w-[420px]"
              >
                {description}
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4">
                <Link
                  href={primaryHref}
                  className="group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-[#111827] px-6 sm:px-8 py-3.5 sm:py-4 text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-white shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#5B5FFF]"
                >
                  {primaryLabel}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                {secondaryLabel && (
                  <Link
                    href={secondaryHref}
                    className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-[#D6DAE6] bg-white px-8 py-4 text-[13px] font-bold uppercase tracking-wider text-[#5B5FFF] transition-all duration-300 hover:border-[#5B5FFF]"
                  >
                    {secondaryLabel}
                  </Link>
                )}
              </motion.div>
            </div>

            {/* Right side: Features */}
            <div className="flex-1 flex flex-col justify-center gap-8 lg:pl-12 lg:border-l lg:border-[#E3E8F5]">
              {features.map((feature, idx) => (
                <motion.div key={idx} variants={fadeInUp} className="flex gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-50 text-[#8B5CF6] border border-purple-100">
                    <feature.icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-[#0F172A] mb-1">{feature.title}</h3>
                    <p className="text-[13px] text-[#475569] leading-[1.6]">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
