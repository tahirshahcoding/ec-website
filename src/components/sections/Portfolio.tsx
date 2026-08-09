"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { portfolioProjects } from "@/data/portfolio";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { containerWide } from "@/lib/layout";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export function Portfolio() {
  const projects = portfolioProjects.filter((p) => p.featured);

  return (
    <section id="portfolio" className="border-t border-[#E3E8F5] bg-[#F5F6FF] py-24 lg:py-32">
      <div className={containerWide}>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Our work"
            title={
              <>
                Projects that
                <br />
                speak for themselves.
              </>
            }
            description="Selected stories from the studio — each one a real problem, solved with taste and engineering discipline."
          />
          <motion.a
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            href="/portfolio"
            className="mb-16 inline-flex w-fit shrink-0 items-center gap-2 rounded-[18px] border border-[#E3E8F5] bg-white px-6 py-3.5 text-[14px] font-semibold text-[#0F172A] shadow-[0_10px_40px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#5B5FFF]/30 hover:text-[#5B5FFF] lg:mb-20"
          >
            View all work
            <ArrowUpRight className="h-4 w-4" />
          </motion.a>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-7 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.a
              key={project.slug}
              variants={fadeInUp}
              href={`/portfolio/${project.slug}`}
              className="group flex flex-col overflow-hidden rounded-[28px] border border-[#E3E8F5] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_70px_rgba(91,95,255,0.12)]"
            >
              <div className="relative h-60 overflow-hidden bg-[#F5F6FF]">
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/5" />
                <div className="absolute inset-0 flex flex-col justify-between p-7">
                  <span className="w-fit rounded-full border border-white/25 bg-white/15 px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-white backdrop-blur-sm">
                    {project.category}
                  </span>
                  <div className="transition-transform duration-500 group-hover:-translate-y-1">
                    <p className="text-[40px] font-extrabold leading-none tracking-[-0.03em] text-white/95">
                      {project.title.split(" ")[0]}
                    </p>
                    <p className="mt-2 max-w-[260px] text-[13px] font-medium text-white/75">
                      {project.tagline}
                    </p>
                  </div>
                </div>
                <div className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#5B5FFF] opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>

              <div className="flex flex-1 flex-col p-7">
                <h3 className="text-[19px] font-bold tracking-[-0.02em] text-[#0F172A]">
                  {project.title}
                </h3>
                <p className="mt-2.5 flex-1 text-[14px] leading-[1.7] text-[#475569]">
                  {project.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#F5F6FF] px-3 py-1 text-[11px] font-semibold text-[#475569]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
