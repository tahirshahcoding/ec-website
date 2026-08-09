"use client";

import { motion } from "motion/react";
import { Rocket, Globe, Share2, TrendingUp } from "lucide-react";
import { portfolioStats } from "@/data/portfolio";
import { containerWide } from "@/lib/layout";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const iconMap: Record<string, React.ReactNode> = {
  Rocket: <Rocket className="h-6 w-6 text-[#5B5FFF]" strokeWidth={1.75} />,
  Globe: <Globe className="h-6 w-6 text-[#5B5FFF]" strokeWidth={1.75} />,
  Share2: <Share2 className="h-6 w-6 text-[#5B5FFF]" strokeWidth={1.75} />,
  TrendingUp: <TrendingUp className="h-6 w-6 text-[#5B5FFF]" strokeWidth={1.75} />,
};

export function PortfolioStats() {
  return (
    <section className="bg-white pb-24">
      <div className={containerWide}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 gap-6 rounded-3xl border border-[#D6DAE6] bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.03)] sm:p-10 md:grid-cols-4"
        >
          {portfolioStats.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="flex items-center gap-4 border-r border-[#E3E8F5] last:border-0"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#F5F6FF] border border-[#E3E8F5]">
                {iconMap[stat.icon]}
              </div>
              <div>
                <div className="text-[24px] font-black text-[#0F172A]">{stat.value}</div>
                <div className="text-[12px] font-bold text-[#475569]">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
