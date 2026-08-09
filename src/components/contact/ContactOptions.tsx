"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { container } from "@/lib/layout";
import { blurInUp, staggerContainer } from "@/lib/motion";

const OPTIONS = [
  {
    icon: Mail,
    tint: "bg-[#5B5FFF]/[0.1] text-[#5B5FFF]",
    title: "Email",
    description: "Business inquiries and project discussions.",
    detail: "team.eaglenestcreations@gmail.com",
    cta: "Send an email",
    href: "mailto:team.eaglenestcreations@gmail.com",
  },
  {
    icon: Phone,
    tint: "bg-[#8B5CF6]/[0.1] text-[#8B5CF6]",
    title: "Phone",
    description: "Quick consultations and direct communication.",
    detail: "+92 XXX XXXXXXX",
    cta: "Call us",
    href: "tel:+03464451505",
  },
  {
    icon: MessageCircle,
    tint: "bg-[#10B981]/[0.1] text-[#10B981]",
    title: "WhatsApp",
    description: "Fast responses for local and international clients.",
    detail: "+92 XXX XXXXXXX",
    cta: "Chat on WhatsApp",
    href: "https://wa.me/03464451505",
  },
  {
    icon: MapPin,
    tint: "bg-[#3B82F6]/[0.1] text-[#3B82F6]",
    title: "Office",
    description: "Business location and meeting information.",
    detail: "Swat, Khyber Pakhtunkhwa, Pakistan",
    cta: "View location",
    href: "#office",
  },
] as const;

export function ContactOptions() {
  return (
    <section className="border-t border-[#E3E8F5] bg-[#F5F6FF] py-24 lg:py-32">
      <div className={container}>
        <SectionHeading
          align="center"
          eyebrow="Ways to reach us"
          title={
            <>
              Choose the channel
              <br />
              that suits you.
            </>
          }
          description="No matter how you reach out, a real person from the studio will get back to you — not a bot."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {OPTIONS.map(({ icon: Icon, tint, title, description, detail, cta, href }) => (
            <motion.a
              key={title}
              href={href}
              variants={blurInUp}
              className="group relative flex flex-col rounded-[24px] border border-[#D2D8F0] bg-white p-8 shadow-[0_1px_3px_rgba(15,23,42,0.03),0_10px_40px_rgba(15,23,42,0.03)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#5B5FFF]/25 hover:shadow-[0_24px_60px_rgba(91,95,255,0.14)]"
            >
              <div className="flex h-full flex-col">
                <div className="mb-8 flex items-center justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-[14px] ${tint}`}>
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </div>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E3E8F5] bg-[#FCFCFD] text-[#5B5FFF] transition-all duration-300 group-hover:border-[#5B5FFF]/30 group-hover:bg-[#5B5FFF]/[0.06] group-hover:-rotate-45">
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                  </span>
                </div>

                <h3 className="text-[18px] font-bold tracking-[-0.01em] text-[#0F172A]">{title}</h3>
                <p className="mt-2 flex-1 text-[13.5px] leading-[1.6] text-[#475569]">{description}</p>

                <p className="mt-6 text-[13px] font-semibold text-[#0F172A]">{detail}</p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[#5B5FFF]">
                  {cta}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
