"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { serviceIcons } from "@/components/services/serviceIcons";
import { blurInUp, fadeInUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

function indexLabel(i: number) {
  return String(i + 1).padStart(2, "0");
}

const filters = ["All Services", "Development", "Marketing", "Design", "AI Solutions"];

const categoryByServiceId: Record<string, string> = {
  ai: "AI Solutions",
  software: "Development",
  web: "Development",
  mobile: "Development",
  cloud: "Development",
  uiux: "Design",
  branding: "Design",
  marketing: "Marketing",
  seo: "Marketing",
  content: "Marketing",
};

const cardColors = [
  { text: "text-[#5B5FFF]", bg: "bg-[#5B5FFF]/10", ring: "ring-[#5B5FFF]/20" }, // 01 Software (Purple/Blue)
  { text: "text-pink-500", bg: "bg-pink-50", ring: "ring-pink-100" }, // 02 AI (Pink)
  { text: "text-teal-500", bg: "bg-teal-50", ring: "ring-teal-100" }, // 03 Marketing (Teal)
  { text: "text-rose-500", bg: "bg-rose-50", ring: "ring-rose-100" }, // 04 SEO (Rose)
  { text: "text-blue-500", bg: "bg-blue-50", ring: "ring-blue-100" }, // 05 Branding (Blue)
  { text: "text-teal-500", bg: "bg-teal-50", ring: "ring-teal-100" }, // 06 Video (Teal)
  { text: "text-orange-500", bg: "bg-orange-50", ring: "ring-orange-100" }, // 07 Social (Orange)
  { text: "text-blue-500", bg: "bg-blue-50", ring: "ring-blue-100" }, // 08 Strategy (Blue)
];

interface ServiceCardProps {
  service: (typeof services)[number];
  index: number;
  isFlipped: boolean;
  onToggle: () => void;
}

function ServiceCard({ service, index, isFlipped, onToggle }: ServiceCardProps) {
  const Icon = serviceIcons[service.icon];
  const color = cardColors[index % cardColors.length];

  return (
    <div className="group relative h-full w-full [perspective:1200px]">
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front */}
        <div
          className={cn(
            "flex h-full flex-col overflow-hidden rounded-[22px] border border-[#D6DAE6] bg-white p-7 shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#5B5FFF]/30 hover:shadow-[0_24px_64px_rgba(15,23,42,0.1)] [backface-visibility:hidden]",
            isFlipped ? "pointer-events-none" : ""
          )}
        >
          {/* Decorative glow */}
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[linear-gradient(135deg,#5B5FFF,#8B5CF6)] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-[0.12]"
            aria-hidden
          />

          {/* Header */}
          <div className="relative mb-6 flex items-start justify-between">
            <div
              className={cn(
                "flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] ring-1 transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110",
                color.bg,
                color.text,
                color.ring
              )}
            >
              <Icon className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <span
              className="text-[13px] font-semibold tracking-wider text-[#64748B] transition-colors duration-300 group-hover:text-[#5B5FFF]"
              aria-hidden
            >
              {indexLabel(index)}
            </span>
          </div>

          <h3 className="relative text-[18px] font-bold tracking-[-0.01em] text-[#0F172A]">{service.title}</h3>
          <p className="relative mt-3 flex-grow text-[14px] leading-[1.65] text-[#475569]">{service.description}</p>

          <button
            onClick={onToggle}
            className="group/link relative mt-7 inline-flex items-center gap-2 self-start text-[12px] font-bold tracking-wider uppercase text-[#8B5CF6] transition-colors duration-300 hover:text-[#5B5FFF]"
          >
            Learn More
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
          </button>
        </div>

        {/* Back */}
        <div
          className={cn(
            "absolute inset-0 flex h-full flex-col rounded-[22px] border border-[#D6DAE6] bg-white p-7 text-left shadow-[0_8px_30px_rgba(15,23,42,0.05)] [backface-visibility:hidden] [transform:rotateY(180deg)]",
            !isFlipped ? "pointer-events-none" : ""
          )}
        >
          <div className="flex items-center justify-between mb-5 border-b border-[#E3E8F5] pb-4">
             <h3 className="text-[15px] font-bold text-[#0F172A]">Capabilities</h3>
             <button
               onClick={onToggle}
               className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5F6FF] text-[#475569] hover:bg-[#E3E8F5] hover:text-[#0F172A] transition-colors"
             >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
             </button>
          </div>
          
          <ul className="flex-grow space-y-3 overflow-y-auto pr-1">
            {service.subServices.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[linear-gradient(135deg,#5B5FFF,#8B5CF6)]" />
                <span className="text-[13px] leading-[1.5] text-[#3F3F46]">{item}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/contact"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#5B5FFF,#8B5CF6)] px-4 py-3 text-[12px] font-bold uppercase tracking-wider text-white transition-all hover:opacity-90"
          >
            Discuss Project
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */

export function ServicesGrid() {
  const [activeFilter, setActiveFilter] = useState("All Services");
  const [flippedId, setFlippedId] = useState<string | null>(null);

  const filteredServices =
    activeFilter === "All Services"
      ? services
      : services.filter((service) => categoryByServiceId[service.id] === activeFilter);

  // Reset flipped card when changing filter
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setFlippedId(null);
  };

  return (
    <section id="services" className="relative overflow-hidden bg-[#F5F6FF] py-24 lg:py-32">
      <div className="relative mx-auto w-full max-w-[1800px] px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Header Section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <motion.div variants={fadeInUp}>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#5B5FFF]">
              Our Services
              <span className="inline-block h-px w-8 bg-[#5B5FFF]/30" aria-hidden />
            </p>
            <h2 className="max-w-[640px] text-[32px] font-extrabold leading-[1.1] tracking-[-0.04em] text-[#0F172A] md:text-[42px] lg:text-[48px]">
              Everything You Need.<br />
              All in <span className="text-[#8B5CF6]">One</span> Place.
            </h2>
          </motion.div>

          {/* Filters */}
          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={cn(
                  "whitespace-nowrap rounded-full border px-5 py-2.5 text-[13px] font-semibold transition-all duration-300",
                  activeFilter === filter
                    ? "border-[#8B5CF6] bg-white text-[#8B5CF6] shadow-sm"
                    : "border-transparent text-[#475569] hover:border-[#D6DAE6] hover:bg-white hover:text-[#0F172A] hover:shadow-sm"
                )}
              >
                {filter}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Cards */}
        <motion.div
          layout
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, i) => (
              <motion.div
                key={service.id}
                layout
                variants={blurInUp}
                exit={{
                  opacity: 0,
                  scale: 0.92,
                  y: 16,
                  filter: "blur(6px)",
                  transition: { duration: 0.22, ease: "easeInOut" },
                }}
                className="h-full w-full"
              >
                <ServiceCard 
                  service={service} 
                  index={i} 
                  isFlipped={flippedId === service.id}
                  onToggle={() => setFlippedId(flippedId === service.id ? null : service.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
