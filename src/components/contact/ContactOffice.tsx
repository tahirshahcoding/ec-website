"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Building2, Clock3, Globe2, MapPin, Timer } from "lucide-react";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { container } from "@/lib/layout";
import { blurInUp, fadeInUp, staggerContainer } from "@/lib/motion";

const OFFICE_CARDS = [
  {
    icon: Building2,
    label: "Business Name",
    value: "EagleNest Creations",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Swat, Khyber Pakhtunkhwa, Pakistan",
  },
  {
    icon: Clock3,
    label: "Working Hours",
    value: "Monday – Saturday · 9:00 AM – 6:00 PM (PKT)",
  },
  {
    icon: Timer,
    label: "Response Time",
    value: "Usually within 24 hours.",
  },
  {
    icon: Globe2,
    label: "Communication",
    value: "Remote meetings available worldwide.",
  },
];

const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Swat%2C+Khyber+Pakhtunkhwa%2C+Pakistan";

/* ─── Stylised location preview (opens Google Maps, no huge embed) ───────── */

function LocationPreview() {
  return (
    <motion.a
      href={MAPS_URL}
      target="_blank"
      rel="noopener noreferrer"
      variants={blurInUp}
      whileHover="hover"
      initial="rest"
      className="group relative block overflow-hidden rounded-[24px] border border-[#D2D8F0] bg-[#FCFCFD] transition-shadow duration-300 hover:shadow-[0_24px_60px_rgba(91,95,255,0.12)]"
      aria-label="Open EagleNest's location in Swat on Google Maps"
    >
      {/* Stylised map grid */}
      <div className="relative h-[260px] w-full overflow-hidden">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(91,95,255,0.18) 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
          aria-hidden
        />
        <svg viewBox="0 0 600 260" fill="none" className="absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            <linearGradient id="roadGrad" x1="0" y1="0" x2="600" y2="260" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8B5CF6" stopOpacity="0.14" />
              <stop offset="1" stopColor="#5B5FFF" stopOpacity="0.14" />
            </linearGradient>
          </defs>
          <path d="M0 190 L180 120 L330 165 L600 60" stroke="#5B5FFF" strokeOpacity="0.28" strokeWidth="5" strokeLinecap="round" />
          <path d="M0 190 L180 120 L330 165 L600 60" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="10 8" />
          <path d="M120 0 L200 260" stroke="#8B5CF6" strokeOpacity="0.2" strokeWidth="4" strokeLinecap="round" />
          <path d="M420 0 L360 260" stroke="#5B5FFF" strokeOpacity="0.18" strokeWidth="4" strokeLinecap="round" />
        </svg>

        {/* Pin */}
        <div className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#5B5FFF,#8B5CF6)] text-white shadow-[0_10px_30px_rgba(91,95,255,0.45)]">
              <MapPin className="h-5 w-5" strokeWidth={2} />
            </span>
            <span className="h-2.5 w-[1.5px] bg-[#5B5FFF]/50" />
          </motion.div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-white/0 transition-all duration-300 group-hover:bg-white/[0.04]" />

        {/* Open in maps badge */}
        <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-[#D2D8F0] bg-white px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#5B5FFF] shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-all duration-300 group-hover:border-[#5B5FFF]/40 group-hover:shadow-[0_12px_32px_rgba(91,95,255,0.18)]">
          Open in Google Maps
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-rotate-45" strokeWidth={2.2} />
        </span>
      </div>

      <div className="flex flex-col gap-3 border-t border-[#E3E8F5] p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#6B7280]">Our Studio</p>
          <p className="mt-1 text-[15px] font-bold text-[#0F172A]">Swat, Khyber Pakhtunkhwa, Pakistan</p>
        </div>
        <p className="text-[13px] font-medium text-[#475569]">
          Prefer remote? We work with clients worldwide.
        </p>
      </div>
    </motion.a>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */

export function ContactOffice() {
  return (
    <section id="office" className="border-t border-[#E3E8F5] bg-[#F5F6FF] py-24 lg:py-32">
      <div className={container}>
        <SectionHeading
          align="center"
          eyebrow="Our office"
          title={
            <>
              Where you&apos;ll
              <br />
              find us.
            </>
          }
          description="A small studio with global reach. Here's everything you need to know about working with us."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {OFFICE_CARDS.map(({ icon: Icon, label, value }) => (
            <motion.div
              key={label}
              variants={fadeInUp}
              className="group flex flex-col gap-5 rounded-[24px] border border-[#D2D8F0] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#5B5FFF]/30 hover:shadow-[0_20px_50px_rgba(91,95,255,0.1)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-[13px] bg-[#5B5FFF]/[0.08] text-[#5B5FFF] transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-5 w-5" strokeWidth={1.7} />
              </div>
              <div>
                <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#6B7280]">
                  {label}
                </p>
                <p className="mt-2 text-[15.5px] font-bold leading-snug tracking-[-0.01em] text-[#0F172A]">
                  {value}
                </p>
              </div>
            </motion.div>
          ))}

          <div className="sm:col-span-2 lg:col-span-1">
            <LocationPreview />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
