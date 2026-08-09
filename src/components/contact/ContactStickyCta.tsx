"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function ContactStickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
          className="fixed inset-x-0 bottom-0 z-40 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] lg:hidden"
        >
          <a
            href="#inquiry"
            className="group flex items-center justify-center gap-2.5 rounded-full bg-[#0F172A] px-6 py-4 text-[13px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_16px_50px_rgba(15,23,42,0.3)] transition-colors hover:bg-[#1E293B]"
          >
            Contact Us
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.2} />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
