export interface EagleAISource {
  name: string;
  url: string;
}

/**
 * Structured block events emitted by the backend over the SSE stream.
 *
 * Contract — the backend streams JSON lines in one of two shapes:
 *   data: {"type":"project_context","data":{...}}
 *   data: {"type":"recommendation|architecture|portfolio|service|lead_action|sources","data":{...}}
 * For "sources" the data may also be a bare array of {name,url} (legacy).
 */
export type EagleAIBlockType =
  | "recommendation"
  | "architecture"
  | "portfolio"
  | "service"
  | "lead_action"
  | "sources";

export interface EagleAIBlock {
  type: EagleAIBlockType | string;
  data: {
    title?: string;
    description?: string;
    reasons?: string[];
    tags?: string[];
    stack?: string[];
    note?: string;
    href?: string;
    items?: EagleAISource[];
    button?: string;
    [key: string]: unknown;
  };
}

export interface EagleAIMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: EagleAISource[];
  blocks?: EagleAIBlock[];
  /** @deprecated Legacy single rich card from older sessions — use `blocks`. */
  richData?: { type: string; data?: { title?: string; reasons?: string[]; href?: string } } | null;
}

export interface ProjectContext {
  title: string;
  industry?: string;
  requirements: string[];
  tech: string[];
  timeline: string;
  progress: number;
  overview?: string;
  features?: string[];
  milestones?: string[];
  estimate?: string;
}

/**
 * Backend `project_context` frames can arrive partially filled (e.g. just a
 * title + progress while the assistant is still gathering requirements).
 * Normalizes any payload into a fully-shaped ProjectContext so the UI can
 * render safely and fill in progressively as richer frames arrive.
 */
export function normalizeProjectContext(
  ctx: Partial<ProjectContext> | null | undefined
): ProjectContext {
  const requirements = Array.isArray(ctx?.requirements) ? ctx.requirements : [];
  const tech = Array.isArray(ctx?.tech) ? ctx.tech : [];
  const features = Array.isArray(ctx?.features) ? ctx.features : undefined;
  const milestones = Array.isArray(ctx?.milestones) ? ctx.milestones : undefined;
  return {
    title: ctx?.title ?? "",
    industry: ctx?.industry,
    requirements,
    tech,
    timeline: ctx?.timeline ?? "",
    progress:
      typeof ctx?.progress === "number"
        ? Math.min(100, Math.max(0, Math.round(ctx.progress)))
        : 0,
    overview: ctx?.overview,
    features,
    milestones,
    estimate: ctx?.estimate,
  };
}

export interface EagleAISession {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: EagleAIMessage[];
}

const STORAGE_KEY = "eagleai_sessions";
const TITLE_MAX = 42;

function safeParse(value: string | null): EagleAISession[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function loadSessions(): EagleAISession[] {
  if (typeof window === "undefined") return [];
  return safeParse(window.localStorage.getItem(STORAGE_KEY));
}

export function saveSessions(sessions: EagleAISession[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch {
    // Storage full or unavailable — fail silently, app keeps working in-memory.
  }
}

export function getSession(id: string): EagleAISession | undefined {
  return loadSessions().find((session) => session.id === id);
}

export function createSession(id: string): EagleAISession {
  const now = Date.now();
  return { id, title: "New chat", createdAt: now, updatedAt: now, messages: [] };
}

export function upsertSession(session: EagleAISession): void {
  const sessions = loadSessions();
  const index = sessions.findIndex((existing) => existing.id === session.id);
  if (index === -1) {
    sessions.unshift(session);
  } else {
    sessions[index] = session;
  }
  saveSessions(sessions);
}

export function deleteSession(id: string): void {
  saveSessions(loadSessions().filter((session) => session.id !== id));
}

export function titleFromMessage(content: string): string {
  const clean = content.replace(/\s+/g, " ").trim();
  return clean.length > TITLE_MAX ? `${clean.slice(0, TITLE_MAX)}…` : clean;
}

export function startOfToday(): number {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
}

export function startOfYesterday(): number {
  return startOfToday() - 24 * 60 * 60 * 1000;
}

export const CONTACT_EMAIL = "team.eaglenestcreations@gmail.com";

export const SERVICE_OPTIONS = [
  "Software Development",
  "AI Development",
  "Digital Marketing",
  "SEO & Growth",
  "Branding & Design",
  "Video Production",
  "Social Media Management",
  "Strategy & Consulting",
];

export interface LeadInfo {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  summary?: string;
}

export interface LeadResult {
  ok: boolean;
  fallback: boolean;
  mailto?: string;
}

/**
 * Sends a consultation lead to the configured endpoint (NEXT_PUBLIC_EAGLEAI_LEAD_URL).
 * If no endpoint is configured or it is unreachable, falls back to a mailto: link
 * pre-filled with the collected details so no lead is ever lost.
 */
export async function submitLead(lead: LeadInfo): Promise<LeadResult> {
  const endpoint = process.env.NEXT_PUBLIC_EAGLEAI_LEAD_URL;
  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (res.ok) return { ok: true, fallback: false };
    } catch {
      // Endpoint unreachable — fall through to mailto fallback.
    }
  }
  const lines = [
    `New consultation request from ${lead.name} <${lead.email}>${lead.company ? ` — ${lead.company}` : ""}`,
    "",
    `Service: ${lead.service || "—"}`,
    `Budget: ${lead.budget || "—"}`,
    `Timeline: ${lead.timeline || "—"}`,
    `Phone: ${lead.phone || "—"}`,
    "",
    "Project summary:",
    lead.summary || "—",
  ];
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Consultation request — ${lead.name}`)}&body=${encodeURIComponent(lines.join("\n"))}`;
  return { ok: false, fallback: true, mailto };
}
