import type { Variants } from "motion/react";

// ─── Spring Configs ───────────────────────────────────────────────────────────

export const spring = {
  default: { type: "spring", stiffness: 400, damping: 30 },
  slow: { type: "spring", stiffness: 200, damping: 25 },
  snappy: { type: "spring", stiffness: 600, damping: 35 },
  gentle: { type: "spring", stiffness: 150, damping: 20 },
} as const;

// ─── Fade In ──────────────────────────────────────────────────────────────────

export const fadeIn: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: spring.default,
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: spring.slow,
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: spring.slow,
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: spring.slow,
  },
};

// ─── Blur In Up (opacity → blur reduction → translate Y → scale) ────────────

export const blurInUp: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)", y: 28, scale: 0.98 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    scale: 1,
    transition: spring.slow,
  },
};

// ─── Stagger Container ────────────────────────────────────────────────────────

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

// ─── Scale ───────────────────────────────────────────────────────────────────

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: spring.default,
  },
};

// ─── Slide In (for nav, drawers) ──────────────────────────────────────────────

export const slideInDown: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: spring.snappy,
  },
};

// ─── Card Hover ───────────────────────────────────────────────────────────────

export const cardHover = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -4,
    scale: 1.01,
    transition: spring.snappy,
  },
};

// ─── Button Hover ─────────────────────────────────────────────────────────────

export const buttonHover = {
  rest: { scale: 1 },
  hover: { scale: 1.03, transition: spring.snappy },
  tap: { scale: 0.97, transition: spring.snappy },
};

// ─── Page Transition ─────────────────────────────────────────────────────────

export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...spring.slow, duration: 0.4 },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2 },
  },
};
