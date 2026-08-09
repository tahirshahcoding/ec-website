"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { portfolioProjects, type CaseStudy } from "@/data/portfolio";
import { container } from "@/lib/layout";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export function CaseStudyNext({ project }: { project: CaseStudy }) {
  const index = portfolioProjects.findIndex((p) => p.slug === project.slug);
  const prev = portfolioProjects[(index - 1 + portfolioProjects.length) % portfolioProjects.length];
  const next = portfolioProjects[(index + 1) % portfolioProjects.length];

  return (
    <section className="border-t border-[#E3E8F5] bg-white py-16 lg:py-20">
      <div className={container}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 md:grid-cols-2"
        >
          {[
            { label: "Previous project", item: prev, icon: <ArrowLeft className="h-4 w-4" />, dir: "prev" },
            { label: "Next project", item: next, icon: <ArrowRight className="h-4 w-4" />, dir: "next" },
          ].map(({ label, item, icon, dir }) => (
            <motion.div key={dir} variants={fadeInUp}>
              <Link
                href={`/portfolio/${item.slug}`}
                className="group flex flex-col overflow-hidden rounded-3xl border border-[#D6DAE6] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.03)] transition-all hover:-translate-y-1 hover:shadow-[0_16px_50px_rgba(91,95,255,0.1)]"
              >
                <div className="relative h-44 overflow-hidden bg-[#F5F6FF]">
                  <img
                    src={item.heroImage}
                    alt={item.title}
                    className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-6">
                    <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/90">{label}</span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0F172A] opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
                      {icon}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">{item.category}</p>
                  <h3 className="mt-1.5 text-[19px] font-bold tracking-[-0.01em] text-[#0F172A] group-hover:text-[#5B5FFF]">
                    {item.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
