"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircle, Plus } from "lucide-react";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { container } from "@/lib/layout";
import { blurInUp, spring, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    question: "How long does a project take?",
    answer:
      "It depends on scope. A focused website or brand identity typically ships in 2–4 weeks, while larger software or AI builds run 2–4 months. After a short discovery call, we'll give you a realistic timeline with clear milestones — and we keep you updated at every step.",
  },
  {
    question: "Do you work internationally?",
    answer:
      "Yes. Most of our clients are remote — across the Middle East, Europe, and North America. We hold meetings online, align across time zones, and communicate in English. Distance has never slowed a single project.",
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Always. Every project ships with a support window, and most clients continue with a monthly retainer for maintenance, updates, and improvements. You'll never be left alone after launch — we build for the long term.",
  },
  {
    question: "Can you redesign existing software?",
    answer:
      "Absolutely. We regularly modernize legacy systems, rebuild outdated interfaces, and refactor aging codebases — all without disrupting your day-to-day operations. We start by auditing what exists, then plan a safe migration path.",
  },
  {
    question: "How does EagleAI integration work?",
    answer:
      "EagleAI is our in-house intelligence layer. It can power customer support chatbots, internal document search, workflow automation, or fully custom assistants trained on your business. We scope the integration during discovery, wire it into your stack, and fine-tune it before launch.",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "We've built for technology, healthcare, e-commerce, education, real estate, finance, hospitality, and more. Rather than locking into one vertical, we specialize in patterns — data-driven products, AI-assisted workflows, and high-converting digital experiences — that transfer across industries.",
  },
];

export function ContactFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className={container}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Questions"
              title={
                <>
                  Everything you
                  <br />
                  might be wondering.
                </>
              }
              description="Can't find your answer? Write to us — we reply within 24 hours."
            />
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-7"
          >
            <div className="divide-y divide-[#E3E8F5] rounded-[24px] border border-[#D2D8F0] bg-white">
              {FAQS.map((faq, i) => {
                const isOpen = open === i;
                return (
                  <motion.div key={faq.question} variants={blurInUp}>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left sm:px-8 sm:py-6"
                    >
                      <span
                        className={cn(
                          "text-[15px] font-bold transition-colors duration-200 sm:text-[16.5px]",
                          isOpen ? "text-[#5B5FFF]" : "text-[#0F172A]"
                        )}
                      >
                        {faq.question}
                      </span>
                      <span
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                          isOpen
                            ? "rotate-45 border-[#5B5FFF]/30 bg-[#5B5FFF]/[0.08] text-[#5B5FFF]"
                            : "border-[#D2D8F0] bg-[#FCFCFD] text-[#64748B]"
                        )}
                        aria-hidden
                      >
                        <Plus className="h-4 w-4" strokeWidth={2.2} />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={spring.slow}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pb-6 text-[14px] leading-[1.75] text-[#475569] sm:px-8 sm:pb-8 sm:text-[14.5px]">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              variants={blurInUp}
              className="mt-8 flex flex-col items-start gap-4 rounded-[20px] border border-dashed border-[#5B5FFF]/30 bg-[#F5F6FF] p-6 sm:flex-row sm:items-center sm:justify-between sm:px-8"
            >
              <div className="flex items-start gap-4">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#5B5FFF]/[0.1] text-[#5B5FFF]">
                  <MessageCircle className="h-4.5 w-4.5" strokeWidth={1.7} />
                </div>
                <div>
                  <p className="text-[15px] font-bold text-[#0F172A]">Still curious?</p>
                  <p className="mt-1 text-[13.5px] leading-[1.6] text-[#475569]">
                    Ask Eagle AI anything, or reach out directly — we&apos;re happy to help.
                  </p>
                </div>
              </div>
              <a
                href="/eagleai"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0F172A] px-6 py-3 text-[13px] font-semibold text-white transition-colors duration-300 hover:bg-[#1E293B]"
              >
                Chat with Eagle AI
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
