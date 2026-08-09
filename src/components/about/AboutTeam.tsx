"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Plus, X } from "lucide-react";
import type { TeamMember } from "@/types";
import { AboutSectionHeading } from "@/components/about/AboutSectionHeading";
import { GradientButton } from "@/components/ui/GradientButton";
import { teamMembers } from "@/data/team";
import { container } from "@/lib/layout";
import { blurInUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const layoutSpring = { type: "spring", stiffness: 300, damping: 32 } as const;

/* ─── Brand icons (lucide 1.28 ships no brand icons) ────────────────────── */

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 4l16 16" />
      <path d="M20 4L4 20" />
    </svg>
  );
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function BehanceIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 6h4.5a3.5 3.5 0 0 1 0 7H8z" />
      <path d="M8 13h5a3.5 3.5 0 0 1 0 7H8z" />
      <path d="M8 6v14" />
      <path d="M16.5 16.5h3.5" />
    </svg>
  );
}

const socialIcons = {
  linkedin: LinkedinIcon,
  twitter: XIcon,
  github: GithubIcon,
  behance: BehanceIcon,
} as const;

const tints = [
  "bg-[radial-gradient(circle_at_50%_15%,rgba(91,95,255,0.14),transparent_65%)]",
  "bg-[radial-gradient(circle_at_50%_15%,rgba(59,130,246,0.12),transparent_65%)]",
  "bg-[radial-gradient(circle_at_50%_15%,rgba(139,92,246,0.12),transparent_65%)]",
  "bg-[radial-gradient(circle_at_50%_15%,rgba(236,72,153,0.12),transparent_65%)]",
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

interface MemberPortraitProps {
  member: TeamMember;
  tint: string;
  expanded: boolean;
  onToggle: () => void;
}

function MemberPortrait({ member, tint, expanded, onToggle }: MemberPortraitProps) {
  const [failed, setFailed] = useState(false);

  return (
    <motion.div
      layout
      transition={layoutSpring}
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-[16px] bg-[#F5F6FF]",
        tint,
        expanded ? "mb-0 h-56 md:h-full md:min-h-[320px]" : "mb-5 h-44"
      )}
    >
      {failed ? (
        <span className="select-none bg-[linear-gradient(120deg,#5B5FFF,#8B5CF6)] bg-clip-text font-extrabold tracking-[-0.04em] text-transparent transition-transform duration-500 group-hover:scale-[1.06]">
          {initials(member.name)}
        </span>
      ) : (
        <Image
          src={member.avatar}
          alt={`${member.name} — ${member.role}`}
          width={400}
          height={480}
          unoptimized
          className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-[1.04]"
          onError={(e) => {
            e.preventDefault();
            setFailed(true);
          }}
        />
      )}

      {/* Expand / collapse toggle */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        aria-label={expanded ? `Close ${member.name}'s profile` : `View ${member.name}'s profile details`}
        className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#5B5FFF] shadow-[0_8px_20px_rgba(15,23,42,0.12)] transition-all duration-300 hover:scale-110 hover:bg-[#5B5FFF] hover:text-white"
      >
        {expanded ? (
          <X className="h-4 w-4" strokeWidth={2.2} />
        ) : (
          <Plus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" strokeWidth={2.2} />
        )}
      </button>
    </motion.div>
  );
}

function MemberSocials({ member, className }: { member: TeamMember; className?: string }) {
  if (!member.socials) return null;
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {Object.entries(member.socials).map(([key, href]) => {
        const Icon = socialIcons[key as keyof typeof socialIcons];
        if (!Icon) return null;
        return (
          <a
            key={key}
            href={href}
            aria-label={`${member.name} on ${key}`}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D6DAE6] text-[#4B5563] transition-all duration-300 hover:scale-110 hover:border-transparent hover:bg-[linear-gradient(135deg,#5B5FFF,#8B5CF6)] hover:text-white hover:shadow-[0_8px_20px_rgba(91,95,255,0.28)]"
          >
            <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
          </a>
        );
      })}
    </div>
  );
}

interface TeamCardProps {
  member: TeamMember;
  tint: string;
  expanded: boolean;
  onToggle: () => void;
}

function TeamCard({ member, tint, expanded, onToggle }: TeamCardProps) {
  return (
    <motion.div
      layout
      variants={blurInUp}
      transition={layoutSpring}
      className={cn("h-full", expanded && "col-span-2 lg:col-span-4")}
    >
      <div
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
        className={cn(
          "group relative flex h-full cursor-pointer flex-col rounded-[22px] border border-[#D6DAE6] bg-white p-6 text-left shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition-all duration-300 hover:border-[#5B5FFF]/30 hover:shadow-[0_25px_60px_rgba(15,23,42,0.10)]",
          expanded && "md:grid md:grid-cols-[2fr_3fr] md:gap-8 md:p-8",
          !expanded && "hover:-translate-y-2"
        )}
      >
        <MemberPortrait member={member} tint={tint} expanded={expanded} onToggle={onToggle} />

        <div className="flex flex-col justify-center md:py-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3
                className={cn(
                  "font-semibold tracking-[-0.01em] text-[#111827] transition-all duration-300",
                  expanded ? "text-[22px] lg:text-[26px]" : "text-[20px]"
                )}
              >
                {member.name}
              </h3>
              <p className="mt-0.5 text-[14px] text-[#4B5563]">{member.role}</p>
            </div>

            {/* Mobile-only inline toggle hint */}
            <span
              className={cn(
                "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F5F6FF] text-[#5B5FFF] md:hidden",
                expanded && "rotate-45"
              )}
              aria-hidden
            >
              <Plus className="h-4 w-4" strokeWidth={2.2} />
            </span>
          </div>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="details"
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={layoutSpring}
                className="overflow-hidden"
              >
                <p className="max-w-[560px] text-[15px] leading-[1.75] text-[#4B5563]">{member.bio}</p>

                <div className="mt-6">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
                    Core skills
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-[#D6DAE6] bg-[#F5F6FF] px-3 py-1 text-[12px] font-medium text-[#52525B] transition-colors duration-300 hover:border-[#5B5FFF]/30 hover:text-[#5B5FFF]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div onClick={(e) => e.stopPropagation()}>
            <MemberSocials member={member} className={cn("mt-4", expanded && "mt-6")} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */

export function AboutTeam() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const toggle = (id: string) => setExpandedId((current) => (current === id ? null : id));

  return (
    <section className="relative overflow-hidden border-y border-[#D6DAE6] bg-white py-24 lg:py-32">
      {/* Soft ambient light */}
      <div className="pointer-events-none absolute left-[5%] top-[15%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(91,95,255,0.04),transparent_62%)]" aria-hidden />

      <div className={`${container} relative`}>
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Left — 30% */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-4"
          >
            <AboutSectionHeading
              index="04"
              eyebrow="The team"
              title="The minds behind EagleNest."
              description="A small, senior team covering the full stack — engineering, AI, design, and marketing working as one. Click a profile to see the full picture."
            />

            <motion.div variants={blurInUp}>
              <GradientButton href="/contact">Work with us</GradientButton>
            </motion.div>
          </motion.div>

          {/* Right — 70% */}
          <LayoutGroup>
            <motion.div
              layout
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-2 gap-6 lg:col-span-8 lg:grid-cols-4"
            >
              {teamMembers.map((member, i) => (
                <TeamCard
                  key={member.id}
                  member={member}
                  tint={tints[i % tints.length]}
                  expanded={expandedId === member.id}
                  onToggle={() => toggle(member.id)}
                />
              ))}
            </motion.div>
          </LayoutGroup>
        </div>
      </div>
    </section>
  );
}
