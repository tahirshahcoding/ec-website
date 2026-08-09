// ─── Service Types ────────────────────────────────────────────────────────────

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  subServices: string[];
  highlight?: boolean;
}

// ─── Portfolio Types ──────────────────────────────────────────────────────────

export interface PortfolioProject {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: ServiceCategory;
  tags: string[];
  coverImage: string;
  images: string[];
  challenge: string;
  solution: string;
  results: string[];
  link?: string;
  featured?: boolean;
}

// ─── Team Types ───────────────────────────────────────────────────────────────

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  skills: string[];
  socials?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

// ─── General ─────────────────────────────────────────────────────────────────

export type ServiceCategory =
  | "ai"
  | "software"
  | "marketing"
  | "branding"
  | "seo"
  | "automation";

export interface NavLink {
  label: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
  suffix?: string;
}
