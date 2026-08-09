"use client";

import { motion } from "motion/react";
import { stats } from "@/data/team";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { container } from "@/lib/layout";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export function Stats() {
  return (
    <section className="border-y border-[#E3E8F5] bg-white py-12 sm:py-20 lg:py-24">
      <div className={container}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-[#E3E8F5]"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className="px-4 py-8 text-center md:px-10 md:text-left"
            >
              <p
                className="bg-[linear-gradient(100deg,#5B5FFF,#8B5CF6)] bg-clip-text font-extrabold tracking-[-0.03em] text-transparent"
                style={{ fontSize: "clamp(40px, 4vw, 56px)" }}
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-3 text-[13px] font-medium text-[#475569]">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
