import { constructMetadata } from "@/lib/metadata";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { PortfolioSections } from "@/components/portfolio/PortfolioSections";
import { PortfolioStats } from "@/components/portfolio/PortfolioStats";
import { Testimonials } from "@/components/portfolio/Testimonials";
import { containerWide } from "@/lib/layout";

export const metadata = constructMetadata({
  title: "Portfolio — EagleNest Creations",
  description:
    "Explore EagleNest's portfolio of software platforms, AI systems, and marketing campaigns that deliver measurable results.",
});

export default function PortfolioPage() {
  return (
    <>
      <PortfolioHero />
      <PortfolioSections />
      <PortfolioStats />
      <Testimonials />
      <div className="bg-[#F5F6FF] pb-20">
        <div className={containerWide}>
          <div className="flex flex-col gap-6 rounded-[28px] border border-[#D6DAE6] bg-white p-10 shadow-[0_8px_30px_rgba(15,23,42,0.04)] sm:p-12 md:items-center lg:flex-row lg:justify-between">
            <div>
              <p className="mb-2 text-[12px] font-bold text-[#475569]">Have a project in mind?</p>
              <h2 className="text-[28px] font-extrabold tracking-tight text-[#0F172A] sm:text-[32px]">
                Let&apos;s create something <span className="text-[#5B5FFF]">amazing</span> together.
              </h2>
            </div>
            <a
              href="/contact"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[#111827] px-8 py-4 text-[12px] font-bold uppercase tracking-wider text-white transition-all hover:bg-[#5B5FFF]"
            >
              Let&apos;s talk about your project
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
