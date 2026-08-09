"use client";

import {
  Code2,
  TrendingUp,
  Terminal,
  Megaphone,
  Cpu,
  Target,
  Database,
  Rocket,
  Braces,
  BarChart3,
  Sparkles,
  Globe,
  PieChart,
  GitBranch,
  Search,
  Zap,
  Layers,
  ShieldCheck,
  DollarSign,
  FileCode,
} from "lucide-react";

interface FloatingIconItem {
  icon: React.ElementType;
  top: string;
  left: string;
  size: string; // e.g. "w-12 h-12"
  iconSize: number;
  duration: string;
  delay: string;
  gradient: string;
  shadow: string;
}

const ICONS: FloatingIconItem[] = [
  {
    icon: Code2,
    top: "8%",
    left: "18%",
    size: "w-14 h-14",
    iconSize: 24,
    duration: "6s",
    delay: "0s",
    gradient: "from-[#5B5CFF] to-[#9B5CF6]",
    shadow: "shadow-[0_10px_25px_rgba(91,92,255,0.3)]",
  },
  {
    icon: TrendingUp,
    top: "5%",
    left: "62%",
    size: "w-16 h-16",
    iconSize: 28,
    duration: "7.5s",
    delay: "1.2s",
    gradient: "from-[#EC4899] to-[#8B5CF6]",
    shadow: "shadow-[0_10px_25px_rgba(236,72,153,0.3)]",
  },
  {
    icon: Cpu,
    top: "22%",
    left: "40%",
    size: "w-16 h-16",
    iconSize: 28,
    duration: "5.5s",
    delay: "0.5s",
    gradient: "from-[#3B82F6] to-[#5B5CFF]",
    shadow: "shadow-[0_12px_28px_rgba(59,130,246,0.35)]",
  },
  {
    icon: Megaphone,
    top: "15%",
    left: "82%",
    size: "w-12 h-12",
    iconSize: 20,
    duration: "6.8s",
    delay: "2.1s",
    gradient: "from-[#F59E0B] to-[#EC4899]",
    shadow: "shadow-[0_8px_20px_rgba(245,158,11,0.3)]",
  },
  {
    icon: Terminal,
    top: "30%",
    left: "10%",
    size: "w-12 h-12",
    iconSize: 20,
    duration: "8s",
    delay: "1.8s",
    gradient: "from-[#10B981] to-[#3B82F6]",
    shadow: "shadow-[0_8px_20px_rgba(16,185,129,0.3)]",
  },
  {
    icon: Target,
    top: "35%",
    left: "65%",
    size: "w-14 h-14",
    iconSize: 24,
    duration: "6.2s",
    delay: "0.8s",
    gradient: "from-[#8B5CF6] to-[#EC4899]",
    shadow: "shadow-[0_10px_25px_rgba(139,92,246,0.3)]",
  },
  {
    icon: Database,
    top: "45%",
    left: "28%",
    size: "w-13 h-13",
    iconSize: 22,
    duration: "7.2s",
    delay: "2.5s",
    gradient: "from-[#3B82F6] to-[#10B981]",
    shadow: "shadow-[0_9px_22px_rgba(59,130,246,0.3)]",
  },
  {
    icon: Rocket,
    top: "40%",
    left: "85%",
    size: "w-16 h-16",
    iconSize: 28,
    duration: "5.8s",
    delay: "1.0s",
    gradient: "from-[#EC4899] to-[#F59E0B]",
    shadow: "shadow-[0_12px_28px_rgba(236,72,153,0.35)]",
  },
  {
    icon: Sparkles,
    top: "58%",
    left: "12%",
    size: "w-15 h-15",
    iconSize: 26,
    duration: "6.5s",
    delay: "0.3s",
    gradient: "from-[#5B5CFF] to-[#3B82F6]",
    shadow: "shadow-[0_10px_25px_rgba(91,92,255,0.35)]",
  },
  {
    icon: BarChart3,
    top: "55%",
    left: "50%",
    size: "w-13 h-13",
    iconSize: 22,
    duration: "7s",
    delay: "1.5s",
    gradient: "from-[#8B5CF6] to-[#3B82F6]",
    shadow: "shadow-[0_9px_22px_rgba(139,92,246,0.3)]",
  },
  {
    icon: Braces,
    top: "68%",
    left: "32%",
    size: "w-14 h-14",
    iconSize: 24,
    duration: "6.7s",
    delay: "2.2s",
    gradient: "from-[#06B6D4] to-[#3B82F6]",
    shadow: "shadow-[0_10px_25px_rgba(6,182,212,0.3)]",
  },
  {
    icon: Search,
    top: "64%",
    left: "75%",
    size: "w-12 h-12",
    iconSize: 20,
    duration: "8.2s",
    delay: "0.7s",
    gradient: "from-[#10B981] to-[#8B5CF6]",
    shadow: "shadow-[0_8px_20px_rgba(16,185,129,0.3)]",
  },
  {
    icon: Globe,
    top: "78%",
    left: "18%",
    size: "w-13 h-13",
    iconSize: 22,
    duration: "6.4s",
    delay: "1.9s",
    gradient: "from-[#3B82F6] to-[#5B5CFF]",
    shadow: "shadow-[0_9px_22px_rgba(59,130,246,0.3)]",
  },
  {
    icon: PieChart,
    top: "75%",
    left: "58%",
    size: "w-15 h-15",
    iconSize: 26,
    duration: "7.8s",
    delay: "0.2s",
    gradient: "from-[#F59E0B] to-[#8B5CF6]",
    shadow: "shadow-[0_11px_26px_rgba(245,158,11,0.35)]",
  },
  {
    icon: Zap,
    top: "86%",
    left: "40%",
    size: "w-14 h-14",
    iconSize: 24,
    duration: "5.6s",
    delay: "1.7s",
    gradient: "from-[#EC4899] to-[#5B5CFF]",
    shadow: "shadow-[0_10px_25px_rgba(236,72,153,0.35)]",
  },
  {
    icon: Layers,
    top: "85%",
    left: "78%",
    size: "w-13 h-13",
    iconSize: 22,
    duration: "7.4s",
    delay: "2.7s",
    gradient: "from-[#8B5CF6] to-[#06B6D4]",
    shadow: "shadow-[0_9px_22px_rgba(139,92,246,0.3)]",
  },
  {
    icon: GitBranch,
    top: "24%",
    left: "25%",
    size: "w-11 h-11",
    iconSize: 18,
    duration: "6.9s",
    delay: "1.4s",
    gradient: "from-[#10B981] to-[#5B5CFF]",
    shadow: "shadow-[0_7px_18px_rgba(16,185,129,0.3)]",
  },
  {
    icon: ShieldCheck,
    top: "48%",
    left: "90%",
    size: "w-12 h-12",
    iconSize: 20,
    duration: "7.6s",
    delay: "0.6s",
    gradient: "from-[#3B82F6] to-[#EC4899]",
    shadow: "shadow-[0_8px_20px_rgba(59,130,246,0.3)]",
  },
  {
    icon: DollarSign,
    top: "10%",
    left: "42%",
    size: "w-11 h-11",
    iconSize: 18,
    duration: "8.5s",
    delay: "2.3s",
    gradient: "from-[#10B981] to-[#F59E0B]",
    shadow: "shadow-[0_7px_18px_rgba(16,185,129,0.3)]",
  },
  {
    icon: FileCode,
    top: "70%",
    left: "4%",
    size: "w-12 h-12",
    iconSize: 20,
    duration: "6.3s",
    delay: "1.1s",
    gradient: "from-[#3B82F6] to-[#8B5CF6]",
    shadow: "shadow-[0_8px_20px_rgba(59,130,246,0.3)]",
  },
];

export function FloatingIcons() {
  return (
    <div className="relative w-full h-full min-h-[440px] sm:min-h-[580px] overflow-hidden select-none pointer-events-none">

      {/* Subtle Glowing Background Orbs */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-[#5B5CFF]/15 blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#EC4899]/15 blur-[100px]" />

      {/* 20 Pure Floating 3D Icons */}
      <div className="relative w-full h-full">
        {ICONS.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div
              key={index}
              className="absolute pointer-events-auto transition-transform duration-500 hover:scale-130 hover:z-50 cursor-pointer group"
              style={{
                top: item.top,
                left: item.left,
                animation: `seamlessFloat ${item.duration} ease-in-out infinite alternate`,
                animationDelay: item.delay,
              }}
            >
              {/* Floating 3D Icon Badge */}
              <div
                className={`${item.size} rounded-2xl bg-gradient-to-br ${item.gradient} ${item.shadow} flex items-center justify-center text-white border border-white/30 backdrop-blur-md group-hover:rotate-12 transition-all duration-300`}
              >
                <IconComponent size={item.iconSize} strokeWidth={2} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Seamless Floating CSS Keyframes */}
      <style jsx global>{`
        @keyframes seamlessFloat {
          0% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          50% {
            transform: translateY(-18px) rotate(4deg) scale(1.05);
          }
          100% {
            transform: translateY(12px) rotate(-4deg) scale(0.96);
          }
        }
      `}</style>
    </div>
  );
}
