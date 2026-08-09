"use client";

import { Brain, Code2, Megaphone, PenTool, BarChart3, ArrowRight } from "lucide-react";

const SERVICES = [
  {
    icon: Brain,
    title: "AI Development",
    description: "Intelligent AI solutions that automate and accelerate your business processes.",
    iconBg: "bg-[#5B5FFF]/[0.09] text-[#5B5FFF]",
  },
  {
    icon: Code2,
    title: "Software Development",
    description: "Custom software solutions built with clean code and modern technologies.",
    iconBg: "bg-[#8B5CF6]/[0.09] text-[#8B5CF6]",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description: "Data-driven marketing strategies that generate leads and grow brands.",
    iconBg: "bg-[#5B5FFF]/[0.09] text-[#5B5FFF]",
  },
  {
    icon: PenTool,
    title: "Branding & Design",
    description: "Creative branding and design that makes your business stand out.",
    iconBg: "bg-[#8B5CF6]/[0.09] text-[#8B5CF6]",
  },
  {
    icon: BarChart3,
    title: "SEO & Growth",
    description: "Rank higher, get more traffic and convert visitors into loyal customers.",
    iconBg: "bg-[#5B5FFF]/[0.09] text-[#5B5FFF]",
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="bg-[#F5F6FF] py-14 sm:py-20 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 border-t border-[#E3E8F5]"
    >
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-stretch">

          {/* Left Heading Column */}
          <div className="lg:col-span-1 flex flex-col justify-center pr-2 py-4">
            <p className="text-[10px] font-semibold tracking-[0.25em] text-[#8B5CF6] uppercase mb-4">
              What We Do
            </p>
            <h2
              className="font-extrabold text-[#0F172A] leading-[1.1] tracking-tight"
              style={{ fontSize: "clamp(22px, 2vw, 28px)" }}
            >
              Complete Digital Solutions For Your Business{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(100deg, #5B5FFF 0%, #8B5CF6 100%)" }}
              >
                Growth.
              </span>
            </h2>
          </div>

          {/* 5 Service Cards */}
          {SERVICES.map(({ icon: Icon, title, description, iconBg }, i) => (
            <div
              key={i}
              className="group bg-white rounded-[24px] border border-[#E3E8F5] p-6 flex flex-col justify-between shadow-[0_10px_40px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-[#5B5FFF]/25 hover:shadow-[0_20px_60px_rgba(91,95,255,0.08)] cursor-pointer"
            >
              <div>
                {/* Circular Icon Badge */}
                <div className={`w-12 h-12 rounded-full ${iconBg} flex items-center justify-center mb-5 transition-transform group-hover:scale-105`}>
                  <Icon size={21} strokeWidth={1.7} />
                </div>

                {/* Card Title */}
                <h3 className="text-[14.5px] font-semibold text-[#0F172A] mb-2 leading-snug">
                  {title}
                </h3>

                {/* Description */}
                <p className="text-[13px] text-[#475569] leading-[1.65]">
                  {description}
                </p>
              </div>

              {/* Bottom Right Arrow Circle */}
              <div className="flex justify-end mt-6">
                <span className="w-7 h-7 rounded-full border border-[#E3E8F5] flex items-center justify-center text-[#64748B] transition-all duration-300 group-hover:border-[#5B5FFF]/40 group-hover:text-[#5B5FFF] group-hover:bg-[#5B5FFF]/5">
                  <ArrowRight size={12} strokeWidth={2} />
                </span>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
