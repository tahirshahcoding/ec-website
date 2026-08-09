"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { portfolioItems, type GridItem } from "@/data/portfolio";
import { containerWide } from "@/lib/layout";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const sectionConfig: {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  description: string;
  items: GridItem[];
  surface: boolean;
}[] = [
  {
    id: "development",
    index: "01",
    eyebrow: "Development",
    title: "Software, AI & digital products.",
    description:
      "Platforms, AI systems, and web products engineered for scale, performance, and real business impact.",
    items: portfolioItems.filter((i) => i.categoryKey !== "marketing"),
    surface: false,
  },
  {
    id: "digital-marketing",
    index: "02",
    eyebrow: "Digital Marketing",
    title: "Brands that grow with content.",
    description:
      "Organic growth, social presence, and content systems that turn attention into a loyal audience.",
    items: portfolioItems.filter((i) => i.categoryKey === "marketing"),
    surface: true,
  },
];

function ProjectCard({ item, index }: { item: GridItem; index: number }) {
  return (
    <motion.div variants={fadeInUp} className="h-full">
      <Link
        href={`/portfolio/${item.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-[#D6DAE6] bg-white shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(91,95,255,0.12)]"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-[#F5F6FF]">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute left-3.5 top-3.5 rounded-full border border-white/25 bg-white/90 px-3 py-1 text-[9.5px] font-bold uppercase tracking-wider text-[#334155] backdrop-blur-sm">
            {item.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
              / {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C7CBD4]">
              {item.categoryKey === "marketing" ? "Organic" : "Build"}
            </span>
          </div>

          <h3 className="mb-2 text-[17px] font-bold tracking-[-0.02em] text-[#0F172A]">
            {item.title}
          </h3>
          <p className="mb-6 flex-1 text-[13.5px] leading-[1.65] text-[#475569] line-clamp-3">
            {item.description}
          </p>

          <div className="flex items-center justify-between border-t border-[#E3E8F5] pt-4">
            <div>
              <div className={cn("text-[18px] font-extrabold leading-none tracking-tight", item.statColor)}>
                {item.statValue}
              </div>
              <div className="mt-1 text-[9px] font-bold uppercase tracking-wider text-[#64748B]">
                {item.statLabel}
              </div>
            </div>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D6DAE6] bg-white text-[#5B5FFF] transition-all duration-300 group-hover:border-[#5B5FFF] group-hover:bg-[#5B5FFF] group-hover:text-white">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  count,
}: {
  index: string;
  eyebrow: string;
  title: string;
  description: string;
  count: number;
}) {
  return (
    <div className="mb-10 flex flex-col gap-6 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        <p className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#5B5FFF]">
          <span className="tabular-nums">{index}</span>
          <span className="inline-block h-px w-8 bg-[#5B5FFF]" aria-hidden />
          {eyebrow}
        </p>
        <h2 className="text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#0F172A] sm:text-[38px]">
          {title}
        </h2>
        <p className="mt-4 text-[15px] leading-[1.7] text-[#475569]">{description}</p>
      </div>
      <p className="shrink-0 rounded-full border border-[#D6DAE6] bg-white px-5 py-2.5 text-[12px] font-bold text-[#475569]">
        {count} {count === 1 ? "project" : "projects"}
      </p>
    </div>
  );
}

export function PortfolioSections() {
  return (
    <div className="bg-white">
      {sectionConfig.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className={cn(
            "py-16 lg:py-24",
            section.surface && "border-y border-[#E3E8F5] bg-[#F5F6FF]"
          )}
        >
          <div className={containerWide}>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.div variants={fadeInUp}>
                <SectionHeader
                  index={section.index}
                  eyebrow={section.eyebrow}
                  title={section.title}
                  description={section.description}
                  count={section.items.length}
                />
              </motion.div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {section.items.map((item, index) => (
                  <ProjectCard key={item.id} item={item} index={index} />
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      ))}
    </div>
  );
}
