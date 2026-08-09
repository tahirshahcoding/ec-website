import { portfolioProjects } from "@/data/portfolio";
import { constructMetadata } from "@/lib/metadata";
import { container } from "@/lib/layout";
import { notFound } from "next/navigation";
import { CaseStudyHero } from "@/components/portfolio/case-study/CaseStudyHero";
import {
  CaseStudyMetrics,
  CaseStudyOverview,
  CaseStudyResults,
  CaseStudyFeatures,
  CaseStudyProcess,
  CaseStudyTech,
  CaseStudyGallery,
} from "@/components/portfolio/case-study/CaseStudySections";
import { CaseStudyNext } from "@/components/portfolio/case-study/CaseStudyNext";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = portfolioProjects.find((p) => p.slug === slug);
  if (!project) return {};

  return constructMetadata({
    title: `${project.title} — ${project.category} | EagleNest Creations`,
    description: project.description,
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = portfolioProjects.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <div className="min-h-screen bg-white">
      <CaseStudyHero project={project} />
      <CaseStudyMetrics project={project} />
      <CaseStudyOverview project={project} />
      <CaseStudyResults project={project} />
      <CaseStudyFeatures project={project} />
      <CaseStudyProcess project={project} />
      <CaseStudyTech project={project} />
      <CaseStudyGallery project={project} />
      <CaseStudyNext project={project} />

      <section className="border-t border-[#E3E8F5] bg-white pb-20">
        <div className={container}>
          <div className="flex flex-col gap-6 rounded-[28px] border border-[#D6DAE6] bg-[#F5F6FF] p-10 text-center sm:p-12 md:items-center lg:flex-row lg:justify-between lg:text-left">
            <div>
              <p className="mb-2 text-[12px] font-bold uppercase tracking-wider text-[#475569]">
                Have a project like this in mind?
              </p>
              <h2 className="text-[26px] font-extrabold tracking-tight text-[#0F172A] sm:text-[32px]">
                Let&apos;s build your <span className="text-[#5B5FFF]">case study</span> next.
              </h2>
            </div>
            <a
              href="/contact"
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#111827] px-8 py-4 text-[12px] font-bold uppercase tracking-wider text-white transition-all hover:bg-[#5B5FFF]"
            >
              Start a project
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
