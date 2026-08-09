"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import {
  BarChart3,
  Brain,
  Code2,
  Globe,
  Megaphone,
  Rocket,
  Search,
  Sparkles,
  Zap,
} from "lucide-react";
import { spring } from "@/lib/motion";

interface Satellite {
  icon: React.ElementType;
  label: string;
  top: string;
  left: string;
  chip: string;
  duration: string;
  delay: string;
  hideOnMobile?: boolean;
  mobileClass?: string;
}

const SATELLITES: Satellite[] = [
  {
    icon: Brain,
    label: "AI",
    top: "4%",
    left: "22%",
    chip: "bg-[#5B5FFF]/[0.14] text-[#5B5FFF] ring-1 ring-[#5B5FFF]/20",
    duration: "7s",
    delay: "0s",
  },
  {
    icon: Rocket,
    label: "Launch",
    top: "8%",
    left: "54%",
    chip: "bg-[#8B5CF6]/[0.14] text-[#8B5CF6] ring-1 ring-[#8B5CF6]/20",
    duration: "7.8s",
    delay: "0.9s",
    hideOnMobile: true,
  },
  {
    icon: Code2,
    label: "Development",
    top: "6%",
    left: "78%",
    chip: "bg-[#8B5CF6]/[0.14] text-[#8B5CF6] ring-1 ring-[#8B5CF6]/20",
    duration: "7.4s",
    delay: "0.4s",
    mobileClass: "sat-mobile-far",
  },
  {
    icon: Megaphone,
    label: "Marketing",
    top: "34%",
    left: "1%",
    chip: "bg-[#5B5FFF]/[0.14] text-[#5B5FFF] ring-1 ring-[#5B5FFF]/20",
    duration: "8.2s",
    delay: "1.2s",
    mobileClass: "sat-mobile-near",
  },
  {
    icon: Zap,
    label: "Automation",
    top: "28%",
    left: "88%",
    chip: "bg-[#EC4899]/[0.12] text-[#EC4899] ring-1 ring-[#EC4899]/20",
    duration: "6.8s",
    delay: "0.6s",
    hideOnMobile: true,
  },
  {
    icon: BarChart3,
    label: "Growth",
    top: "72%",
    left: "14%",
    chip: "bg-[#8B5CF6]/[0.14] text-[#8B5CF6] ring-1 ring-[#8B5CF6]/20",
    duration: "7.6s",
    delay: "0.2s",
  },
  {
    icon: Search,
    label: "SEO",
    top: "78%",
    left: "52%",
    chip: "bg-[#3B82F6]/[0.12] text-[#3B82F6] ring-1 ring-[#3B82F6]/20",
    duration: "7.2s",
    delay: "1.5s",
    hideOnMobile: true,
  },
  {
    icon: Globe,
    label: "Reach",
    top: "70%",
    left: "82%",
    chip: "bg-[#8B5CF6]/[0.14] text-[#8B5CF6] ring-1 ring-[#8B5CF6]/20",
    duration: "8s",
    delay: "0.8s",
    mobileClass: "sat-mobile-far",
  },
];

const satelliteVariants = {
  hidden: { opacity: 0, scale: 0.4, x: "-50%", y: "-50%" },
  visible: {
    opacity: 1,
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: spring.snappy,
  },
};

const visualContainer = {
  hidden: { opacity: 1 },
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

// Cursor-tracking 3D tilt for each satellite card
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 260, damping: 18 });
  const springRotateY = useSpring(rotateY, { stiffness: 260, damping: 18 });

  function handleMove(e: React.PointerEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 18);
    rotateX.set(-py * 18);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ rotateX: springRotateX, rotateY: springRotateY, transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}

export function HeroVisual() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const sceneRotateX = useMotionValue(0);
  const sceneRotateY = useMotionValue(0);
  const sceneSpringX = useSpring(sceneRotateX, { stiffness: 120, damping: 22 });
  const sceneSpringY = useSpring(sceneRotateY, { stiffness: 120, damping: 22 });

  function handleSceneMove(e: React.PointerEvent) {
    const el = sceneRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    sceneRotateY.set(px * 8);
    sceneRotateX.set(-py * 8);
  }

  function handleSceneLeave() {
    sceneRotateX.set(0);
    sceneRotateY.set(0);
  }

  return (
    <div
      ref={sceneRef}
      onPointerMove={handleSceneMove}
      onPointerLeave={handleSceneLeave}
      className="relative w-full h-full select-none [perspective:1100px]"
      role="img"
      aria-label="Eagle AI intelligence core with AI, development, and marketing services orbiting around it"
    >
      {/* Animated radial glow — breathes slowly */}
      {/* Radial glows — cheap compositing, no filter blur */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] sm:w-[540px] sm:h-[540px] rounded-full bg-[radial-gradient(circle,rgba(91,95,255,0.16),transparent_62%)]"
        animate={{ opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.13),transparent_62%)]"
        aria-hidden
      />
      <div
        className="absolute top-[20%] right-[10%] w-[220px] h-[220px] rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.11),transparent_62%)]"
        aria-hidden
      />

      {/* Parallax scene — gently tilts toward the cursor */}
      <motion.div
        style={{ rotateX: sceneSpringX, rotateY: sceneSpringY, transformStyle: "preserve-3d" }}
        className="relative w-full h-full"
      >
        {/* Three concentric circles — Core Intelligence → Operations → Business Growth */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[480px] lg:h-[480px]" aria-hidden>
          <div className="orbit-ring relative w-full h-full rounded-full">
            {/* Ring 3 — Business Growth */}
            <div className="absolute inset-0 rounded-full border border-[#D2D8F0]" />
            {/* Ring 2 — Operations */}
            <div className="absolute inset-[16%] rounded-full border border-dashed border-[#5B5FFF]/[0.28]" />
            <div className="absolute top-[15%] left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-[#5B5FFF] shadow-[0_0_0_5px_rgba(91,95,255,0.16)]" />
            {/* Ring 1 — Core Intelligence */}
            <div className="absolute inset-[32%] rounded-full border border-[#5B5FFF]/[0.22]" />
            <div className="absolute top-[31%] left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-[#EC4899] shadow-[0_0_0_5px_rgba(236,72,153,0.16)]" />
          </div>
        </div>

        <motion.div
          className="relative w-full h-full"
          variants={visualContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Orbiting service cards */}
          {SATELLITES.map(({ icon: Icon, label, top, left, chip, duration, delay, hideOnMobile, mobileClass }, i) => (
            <motion.div
              key={i}
              variants={satelliteVariants}
              className={`absolute z-10 ${hideOnMobile ? "hidden sm:block" : ""} ${mobileClass ?? ""}`}
              style={{ top, left }}
            >
              <div
                className="hero-float group flex flex-col items-center"
                style={{ animation: `heroFloat ${duration} ease-in-out infinite alternate`, animationDelay: delay }}
              >
                <TiltCard>
                  <div
                    className="relative flex flex-col items-center cursor-pointer"
                    style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}
                  >
                    <div className="relative flex w-[72px] h-[72px] sm:w-[80px] sm:h-[80px] items-center justify-center rounded-[24px] border border-[#E3E8F5] bg-white/95 shadow-[0_10px_40px_rgba(0,0,0,0.05)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#5B5FFF]/40 group-hover:shadow-[0_20px_60px_rgba(91,95,255,0.16)]">
                      {/* Expanding ripple ring */}
                      <span
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-9 w-9 rounded-full border border-[#5B5FFF]/50 scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-[2.8] group-hover:opacity-100"
                        aria-hidden
                      />
                      <div
                        className={`relative flex h-11 w-11 items-center justify-center rounded-full ${chip} transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6`}
                      >
                        <Icon size={19} strokeWidth={1.6} />
                      </div>
                    </div>
                    <span className="mt-3 text-center text-[9.5px] font-medium uppercase tracking-[0.18em] text-[#64748B] transition-colors group-hover:text-[#5B5FFF]">
                      {label}
                    </span>
                  </div>
                </TiltCard>
              </div>
            </motion.div>
          ))}

          {/* Central Eagle AI core — company intelligence */}
          <motion.div variants={satelliteVariants} className="absolute left-1/2 top-1/2 z-20">
            <div className="group relative cursor-pointer" style={{ transform: "translateZ(60px)" }}>
              <div className="absolute -inset-4 rounded-[36px] bg-[radial-gradient(circle,rgba(91,95,255,0.28),transparent_70%)]" aria-hidden />
              <div className="relative rounded-[28px] p-[1.5px] bg-gradient-to-br from-[#5B5FFF] via-[#8B5CF6] to-[#EC4899] shadow-[0_24px_70px_rgba(91,95,255,0.3)] transition-shadow duration-300 group-hover:shadow-[0_28px_80px_rgba(91,95,255,0.42)]">
                <div className="flex flex-col items-center gap-2.5 rounded-[27px] bg-white px-8 py-7">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-gradient-to-br from-[#5B5FFF] via-[#8B5CF6] to-[#EC4899] text-white shadow-[0_8px_24px_rgba(91,95,255,0.35)] transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-6">
                    <Sparkles size={24} strokeWidth={1.6} />
                  </div>
                  <p className="text-[11px] font-semibold tracking-[0.22em] text-[#0F172A]">EAGLE AI</p>
                  <p className="text-[8.5px] font-medium tracking-[0.16em] text-[#64748B]">INTELLIGENT BY DESIGN</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <style jsx global>{`
        @keyframes heroFloat {
          from { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(-1deg); }
          to { transform: translateY(4px) rotate(1deg); }
        }
        @keyframes orbitSpin {
          to { transform: rotate(360deg); }
        }
        .orbit-ring {
          animation: orbitSpin 60s linear infinite;
          will-change: transform;
        }
        @media (max-width: 1023px) {
          .orbit-ring {
            animation: none;
          }
        }
        @media (max-width: 639px) {
          .sat-mobile-near {
            left: 8% !important;
          }
          .sat-mobile-far {
            left: 70% !important;
          }
        }
        @media (max-width: 374px) {
          .sat-mobile-far {
            left: 64% !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .orbit-ring,
          .hero-float {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
