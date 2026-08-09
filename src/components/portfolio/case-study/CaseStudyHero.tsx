"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import type { CaseStudy } from "@/data/portfolio";
import { container } from "@/lib/layout";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/lib/motion";

function Fact({ label, value, link }: { label: string; value: string; link?: boolean }) {
  return (
    <div className="py-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#64748B]">{label}</p>
      <p
        className={cn(
          "mt-1.5 text-[15px] font-bold",
          link ? "text-[#5B5FFF] underline decoration-[#5B5FFF]/30 underline-offset-4" : "text-[#0F172A]"
        )}
      >
        {value}
      </p>
    </div>
  );
}

export function CaseStudyHero({ project }: { project: CaseStudy }) {
  const facts: { label: string; value: string; href?: string }[] = [
    { label: "Status", value: project.status },
    { label: "Industry", value: project.industry },
    ...(project.platform ? [{ label: "Platform", value: project.platform }] : []),
    ...(project.duration ? [{ label: "Duration", value: project.duration }] : []),
    ...(project.location ? [{ label: "Location", value: project.location }] : []),
    ...(project.website
      ? [
          {
            label: "Live link",
            value: project.website.replace(/^https?:\/\//, "").replace(/\/$/, ""),
            href: project.website,
          },
        ]
      : []),
  ];

  return (
    <section className="bg-white pt-28 pb-14 lg:pt-36 lg:pb-16">
      <div className={container}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-10 flex items-center gap-2 text-[12px] font-semibold text-[#64748B]"
        >
          <Link href="/portfolio" className="flex items-center gap-1.5 text-[#475569] transition-colors hover:text-[#5B5FFF]">
            <ArrowLeft className="h-3.5 w-3.5" />
            All work
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span>{project.category}</span>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7"
          >
            <motion.p
              variants={fadeInUp}
              className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#5B5FFF]"
            >
              {project.category}
              <span className="inline-block h-px w-8 bg-[#5B5FFF]" aria-hidden />
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="text-[36px] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#0F172A] md:text-[52px] lg:text-[60px]"
            >
              {project.title}
            </motion.h1>
            <motion.p variants={fadeInUp} className="mt-6 max-w-xl text-[17px] leading-[1.65] text-[#475569]">
              {project.tagline}
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#D6DAE6] bg-[#F5F6FF] px-4 py-1.5 text-[12px] font-semibold text-[#475569]"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5"
          >
            <div className="rounded-3xl border border-[#D6DAE6] bg-[#F5F6FF] p-8 shadow-[0_8px_30px_rgba(15,23,42,0.03)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-12">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    {fact.href ? (
                      <a href={fact.href} target="_blank" rel="noreferrer">
                        <Fact label={fact.label} value={fact.value} link />
                      </a>
                    ) : (
                      <Fact label={fact.label} value={fact.value} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="relative mt-14 overflow-hidden rounded-3xl border border-[#D6DAE6] bg-[#F5F6FF] shadow-[0_16px_50px_rgba(15,23,42,0.06)]"
        >
          <img
            src={project.heroImage}
            alt={`${project.title} — ${project.category}`}
            className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[500px]"
          />
        </motion.div>
      </div>
    </section>
  );
}
