"use client";

import { motion } from "motion/react";
import { CheckCircle2, Target } from "lucide-react";
import type { CaseStudy, ChartBlock } from "@/data/portfolio";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { container } from "@/lib/layout";
import { BarChart, DonutChart, LineChart } from "@/components/portfolio/charts";

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div variants={fadeInUp}>
      {eyebrow && (
        <p className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#5B5FFF]">
          {eyebrow}
          <span className="inline-block h-px w-8 bg-[#5B5FFF]" aria-hidden />
        </p>
      )}
      <h2 className="text-[28px] font-extrabold leading-[1.1] tracking-[-0.03em] text-[#0F172A] sm:text-[36px]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-[15px] leading-[1.7] text-[#475569]">{description}</p>
      )}
    </motion.div>
  );
}

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`py-14 lg:py-20 ${className}`}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className={container}
      >
        {children}
      </motion.div>
    </section>
  );
}

// ─── Metrics band ────────────────────────────────────────────────────────────

export function CaseStudyMetrics({ project }: { project: CaseStudy }) {
  return (
    <div className={container}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-[#D6DAE6] bg-[#D6DAE6] shadow-[0_8px_30px_rgba(15,23,42,0.03)] lg:grid-cols-4"
      >
        {project.metrics.map((metric) => (
          <motion.div
            key={metric.label}
            variants={fadeInUp}
            className="bg-white p-7 sm:p-9"
          >
            <div className="text-[28px] font-black tracking-[-0.03em] text-[#0F172A] sm:text-[34px]">
              {metric.value}
            </div>
            <div className="mt-2 text-[12px] font-semibold uppercase tracking-wider text-[#64748B]">
              {metric.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Overview + outcome ──────────────────────────────────────────────────────

export function CaseStudyOverview({ project }: { project: CaseStudy }) {
  return (
    <Section className="border-t border-[#E3E8F5]">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeading eyebrow="Overview" title="The challenge, in context." />
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            {project.overview.map((paragraph, i) => (
              <motion.p key={i} variants={fadeInUp} className="mb-5 text-[15.5px] leading-[1.8] text-[#475569] last:mb-0">
                {paragraph}
              </motion.p>
            ))}
          </motion.div>
        </div>

        <div className="lg:col-span-5">
          <motion.div variants={fadeInUp} className="rounded-3xl border border-[#D6DAE6] bg-[#F5F6FF] p-8 sm:p-10">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5B5FFF]/10">
              <Target className="h-6 w-6 text-[#5B5FFF]" strokeWidth={1.75} />
            </div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#5B5FFF]">Outcome</p>
            <p className="text-[15.5px] leading-[1.8] text-[#0F172A]">{project.outcome}</p>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

// ─── Results / charts ────────────────────────────────────────────────────────

function ChartCard({ chart, expand }: { chart: ChartBlock; expand?: boolean }) {
  return (
    <motion.div
      variants={fadeInUp}
      className={cn(
        "flex flex-col rounded-3xl border border-[#D6DAE6] bg-white p-7 shadow-[0_8px_30px_rgba(15,23,42,0.03)] sm:p-9",
        expand && "lg:col-span-2"
      )}
    >
      <h3 className="text-[19px] font-bold tracking-[-0.01em] text-[#0F172A]">{chart.title}</h3>
      <p className="mb-8 mt-2 text-[13.5px] leading-[1.7] text-[#64748B]">{chart.note}</p>

      {chart.kind === "line" && chart.line && (
        <LineChart data={chart.line} unit={chart.unit} />
      )}
      {chart.kind === "bars" && chart.bars && (
        <BarChart data={chart.bars} unit={chart.unit} />
      )}
      {chart.kind === "donut" && chart.donut && (
        <DonutChart data={chart.donut} />
      )}

      {chart.highlight && (
        <div className="mt-7 flex items-start gap-2.5 rounded-2xl bg-[#5B5FFF]/5 px-5 py-4">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#5B5FFF]" strokeWidth={2} />
          <p className="text-[13.5px] font-semibold leading-[1.6] text-[#334155]">{chart.highlight}</p>
        </div>
      )}
    </motion.div>
  );
}

export function CaseStudyResults({ project }: { project: CaseStudy }) {
  return (
    <Section className="border-t border-[#E3E8F5] bg-[#F5F6FF]">
      <SectionHeading
        eyebrow="Results & Metrics"
        title={project.resultsTitle}
        description="The numbers and coverage behind the project — measured, reported, and shown here."
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-7 lg:grid-cols-2"
      >
        {project.charts.map((chart, i) => (
          <ChartCard
            key={i}
            chart={chart}
            expand={project.charts.length >= 3 && chart.kind === "line"}
          />
        ))}
      </motion.div>
    </Section>
  );
}

// ─── Features / services ─────────────────────────────────────────────────────

export function CaseStudyFeatures({ project }: { project: CaseStudy }) {
  const isMarketing = project.categoryKey === "marketing";

  return (
    <Section className="border-t border-[#E3E8F5]">
      <SectionHeading
        eyebrow={isMarketing ? "What we delivered" : "What we built"}
        title={project.featuresTitle}
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {project.features.map((feature, i) => (
          <motion.div
            key={i}
            variants={fadeInUp}
            className="rounded-2xl border border-[#D6DAE6] bg-white p-7 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(91,95,255,0.08)]"
          >
            <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-[#5B5FFF]/10">
              <CheckCircle2 className="h-4.5 w-4.5 text-[#5B5FFF]" strokeWidth={2} />
            </div>
            <h3 className="mb-2 text-[15.5px] font-bold text-[#0F172A]">{feature.title}</h3>
            <p className="text-[13.5px] leading-[1.7] text-[#475569]">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {isMarketing && project.strategy && (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16"
        >
          <motion.h3 variants={fadeInUp} className="mb-6 text-[20px] font-bold tracking-[-0.01em] text-[#0F172A]">
            Content strategy & focus areas
          </motion.h3>
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-2.5">
            {project.strategy.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#D6DAE6] bg-white px-4 py-2 text-[13px] font-semibold text-[#475569]"
              >
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>
      )}
    </Section>
  );
}

// ─── Process ─────────────────────────────────────────────────────────────────

export function CaseStudyProcess({ project }: { project: CaseStudy }) {
  return (
    <Section className="border-t border-[#E3E8F5] bg-[#F5F6FF]">
      <SectionHeading eyebrow="How it came together" title="Process" />
      <motion.ol
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4"
      >
        {project.process.map((step, i) => (
          <motion.li key={i} variants={fadeInUp} className="relative rounded-2xl border border-[#D6DAE6] bg-white p-7">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5B5FFF] text-[13px] font-extrabold text-white">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[15.5px] font-bold text-[#0F172A]">{step.phase}</h3>
            </div>
            <p className="text-[13.5px] leading-[1.75] text-[#475569]">{step.detail}</p>
          </motion.li>
        ))}
      </motion.ol>
    </Section>
  );
}

// ─── Technologies ────────────────────────────────────────────────────────────

export function CaseStudyTech({ project }: { project: CaseStudy }) {
  return (
    <Section className="border-t border-[#E3E8F5]">
      <SectionHeading
        eyebrow="Stack"
        title={project.categoryKey === "marketing" ? "Tools & platforms" : "Technology stack"}
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="flex flex-wrap gap-2.5"
      >
        {project.technologies.map((tech) => (
          <motion.span
            key={tech}
            variants={fadeInUp}
            className="rounded-full border border-[#D6DAE6] bg-white px-5 py-2.5 text-[13.5px] font-bold text-[#334155] shadow-[0_2px_10px_rgba(15,23,42,0.03)]"
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>
    </Section>
  );
}

// ─── Gallery ─────────────────────────────────────────────────────────────────

export function CaseStudyGallery({ project }: { project: CaseStudy }) {
  return (
    <Section className="border-t border-[#E3E8F5] bg-[#F5F6FF]">
      <SectionHeading eyebrow="Gallery" title="In context." description="A visual look at the project, the industry, and the work behind it." />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-6 md:grid-cols-3"
      >
        {project.gallery.map((src, i) => (
          <motion.div
            key={i}
            variants={fadeInUp}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#D6DAE6] bg-[#F5F6FF]"
          >
            <img
              src={src}
              alt={`${project.title} — gallery image ${i + 1}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
