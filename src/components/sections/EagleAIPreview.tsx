"use client";

import { motion } from "motion/react";
import { ArrowRight, CalendarCheck, FileText, MessageSquare, Sparkles, Wand2 } from "lucide-react";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { container } from "@/lib/layout";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const features = [
  {
    icon: MessageSquare,
    title: "Instant answers",
    description: "Ask anything about our services and get a precise, human-sounding reply.",
  },
  {
    icon: Wand2,
    title: "Tailored recommendations",
    description: "Describe your idea and Eagle AI maps it to the right scope and stack.",
  },
  {
    icon: FileText,
    title: "Project summaries",
    description: "Get a clear proposal summary in seconds instead of waiting on emails.",
  },
  {
    icon: CalendarCheck,
    title: "Book a call",
    description: "Move from chat to a strategy session with the studio in one tap.",
  },
];

export function EagleAIPreview() {
  return (
    <section className="border-t border-[#E3E8F5] bg-[#F5F6FF] py-16 sm:py-24 lg:py-32">
      <div className={container}>
        <div className="grid items-center gap-10 sm:gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <SectionHeading
              eyebrow="Eagle AI"
              title={
                <>
                  Meet your new
                  <br />
                  intelligent guide.
                </>
              }
              description="Eagle AI is our conversational assistant — trained on everything we do, it helps you scope ideas, choose services, and get answers around the clock."
            />

            <div className="space-y-4">
              {features.map(({ icon: Icon, title, description }) => (
                <motion.div
                  key={title}
                  variants={fadeInUp}
                  className="group flex items-start gap-4 rounded-[20px] border border-transparent p-2 transition-all duration-300 hover:border-[#E3E8F5] hover:bg-white hover:shadow-[0_10px_40px_rgba(0,0,0,0.05)]"
                >
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[linear-gradient(135deg,#5B5FFF,#8B5CF6)] text-white shadow-[0_8px_24px_rgba(91,95,255,0.3)]">
                    <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-[15px] font-bold text-[#0F172A]">{title}</p>
                    <p className="mt-1 text-[13.5px] leading-[1.6] text-[#475569]">{description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeInUp} className="mt-9">
              <a
                href="/eagleai"
                className="group inline-flex items-center gap-2.5 rounded-[18px] bg-[linear-gradient(100deg,#5B5FFF,#8B5CF6)] px-7 py-4 text-[15px] font-semibold text-white shadow-[0_12px_40px_rgba(91,95,255,0.35)] transition-all duration-300 hover:shadow-[0_16px_50px_rgba(91,95,255,0.45)]"
              >
                <Sparkles className="h-4.5 w-4.5" strokeWidth={1.8} />
                Try Eagle AI
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 8 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -inset-8 rounded-[40px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(91,95,255,0.12),transparent_70%)]" />

            <div className="relative mx-auto max-w-md rounded-[28px] border border-[#E3E8F5] bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.1)]">
              <div className="mb-6 flex items-center gap-3 border-b border-[#E3E8F5] pb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#5B5FFF,#8B5CF6)] text-white">
                  <Sparkles className="h-4.5 w-4.5" strokeWidth={1.8} />
                </div>
                <div className="flex-1">
                  <p className="text-[14px] font-bold text-[#0F172A]">Eagle AI</p>
                  <p className="flex items-center gap-1.5 text-[11.5px] font-medium text-[#475569]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                    Online now
                  </p>
                </div>
                <span className="rounded-full bg-[#F5F6FF] px-3 py-1 text-[11px] font-semibold text-[#8B5CF6]">
                  Beta
                </span>
              </div>

              <div className="space-y-4">
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-[#F5F6FF] px-4 py-3 text-[13.5px] leading-[1.6] text-[#334155]">
                  Hi! I&apos;m Eagle AI. What are you hoping to build today?
                </div>
                <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-tr-sm bg-[linear-gradient(100deg,#5B5FFF,#8B5CF6)] px-4 py-3 text-[13.5px] leading-[1.6] text-white shadow-[0_8px_24px_rgba(91,95,255,0.25)]">
                  We need an AI-powered booking system for our clinic.
                </div>
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-[#F5F6FF] px-4 py-3 text-[13.5px] leading-[1.6] text-[#334155]">
                  Great — that&apos;s exactly our specialty. Want a 5-minute project summary with scope and pricing?
                </div>
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-[#F5F6FF] px-4 py-3 text-[13.5px] leading-[1.6] text-[#334155]">
                  <span className="flex gap-1.5">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#8B5CF6]" style={{ animationDelay: "0ms" }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#8B5CF6]" style={{ animationDelay: "120ms" }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#8B5CF6]" style={{ animationDelay: "240ms" }} />
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3 rounded-[16px] border border-[#E3E8F5] bg-white py-2.5 pl-5 pr-2.5">
                <p className="flex-1 text-[13px] text-[#64748B]">Ask Eagle AI anything…</p>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[linear-gradient(100deg,#5B5FFF,#8B5CF6)] text-white shadow-[0_6px_20px_rgba(91,95,255,0.35)]">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
