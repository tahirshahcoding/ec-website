"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Mail, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SERVICE_OPTIONS, submitLead, type LeadInfo } from "@/lib/eagleai";

const BUDGETS = ["Under $5,000", "$5,000 – $15,000", "$15,000 – $40,000", "$40,000 – $100,000", "$100,000+"];
const TIMELINES = ["As soon as possible", "1 – 3 months", "3 – 6 months", "6+ months", "Just exploring"];

const inputClass =
  "w-full rounded-lg border border-[#E3E8F5] bg-white px-4 py-3 text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#5B5FFF]/50 focus:ring-2 focus:ring-[#5B5FFF]/10 transition-all";
const labelClass = "block text-[11px] font-bold tracking-[0.12em] text-[#64748B] uppercase mb-2";

interface LeadCaptureProps {
  onClose: () => void;
  initialService?: string;
  summary?: string;
}

export function LeadCapture({ onClose, initialService, summary }: LeadCaptureProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState<LeadInfo>({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: initialService ?? "",
    budget: "",
    timeline: "",
    summary: summary ?? "",
  });

  const setField =
    (key: keyof LeadInfo) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const step1Valid = form.name.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    const result = await submitLead(form);
    setSubmitting(false);
    if (result.fallback && result.mailto) window.location.href = result.mailto;
    setDone(true);
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        className="relative w-full max-w-[520px] rounded-3xl bg-white shadow-2xl overflow-hidden"
      >
        <header className="px-6 pt-6 pb-4 border-b border-[#E3E8F5] flex items-start justify-between">
          <div>
            <div className="text-[10px] font-bold tracking-[0.15em] text-[#5B5FFF] uppercase mb-1">
              EAGLENEST
            </div>
            <h2 className="text-[20px] font-bold text-[#0F172A]">
              {done ? "Request received" : "Start a consultation"}
            </h2>
          </div>
          {!done && (
            <button
              onClick={onClose}
              className="p-1 text-[#64748B] hover:text-[#0F172A]"
              aria-label="Close consultation form"
            >
              <X size={18} />
            </button>
          )}
        </header>

        {done ? (
          <div className="p-8 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#10B981]/10 flex items-center justify-center mb-5">
              <Check size={22} className="text-[#10B981]" />
            </div>
            <h3 className="text-[17px] font-bold text-[#0F172A] mb-2">
              Thanks{form.name ? `, ${form.name.split(" ")[0]}` : ""}!
            </h3>
            <p className="text-[14px] text-[#475569] leading-relaxed mb-6">
              Your consultation request has been noted. Our team will reach out within one
              business day to scope your project.
            </p>
            <button
              onClick={onClose}
              className="rounded-full bg-[#0F172A] px-6 py-2.5 text-[12px] font-semibold text-white hover:bg-[#1E293B] transition-colors"
            >
              Back to chat
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (step === 1) {
                if (step1Valid) setStep(2);
              } else {
                handleSubmit();
              }
            }}
          >
            <div className="flex items-center gap-2 px-6 pt-5">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <span
                    className={cn(
                      "w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center transition-colors",
                      step >= s ? "bg-[#5B5FFF] text-white" : "bg-[#F1F5F9] text-[#94A3B8]"
                    )}
                  >
                    {s}
                  </span>
                  {s === 1 && (
                    <div className={cn("w-8 h-px", step > 1 ? "bg-[#5B5FFF]" : "bg-[#E3E8F5]")} />
                  )}
                </div>
              ))}
              <span className="ml-2 text-[11px] font-semibold text-[#64748B]">
                {step === 1 ? "Your details" : "Project details"}
              </span>
            </div>

            <div className="p-6 space-y-4 min-h-[300px]">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className={labelClass}>Name *</label>
                      <input
                        className={inputClass}
                        placeholder="Your name"
                        value={form.name}
                        onChange={setField("name")}
                        autoFocus
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Work email *</label>
                      <input
                        className={inputClass}
                        type="email"
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={setField("email")}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Phone</label>
                        <input
                          className={inputClass}
                          placeholder="+1 555 000 0000"
                          value={form.phone}
                          onChange={setField("phone")}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Company</label>
                        <input
                          className={inputClass}
                          placeholder="Company name"
                          value={form.company}
                          onChange={setField("company")}
                        />
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className={labelClass}>Service needed</label>
                      <select className={inputClass} value={form.service} onChange={setField("service")}>
                        <option value="">Select a service…</option>
                        {SERVICE_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Budget</label>
                        <select className={inputClass} value={form.budget} onChange={setField("budget")}>
                          <option value="">Select…</option>
                          {BUDGETS.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Timeline</label>
                        <select className={inputClass} value={form.timeline} onChange={setField("timeline")}>
                          <option value="">Select…</option>
                          {TIMELINES.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Project summary</label>
                      <textarea
                        className={cn(inputClass, "resize-none")}
                        rows={4}
                        placeholder="Tell us a bit about what you want to build…"
                        value={form.summary}
                        onChange={setField("summary")}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <footer className="px-6 pb-6 flex items-center justify-between gap-3">
              {step === 2 ? (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#64748B] hover:text-[#0F172A] transition-colors"
                >
                  <ArrowLeft size={14} /> Back
                </button>
              ) : (
                <span />
              )}

              {step === 1 ? (
                <button
                  type="submit"
                  disabled={!step1Valid}
                  className="inline-flex items-center gap-2 rounded-full bg-[#5B5FFF] px-6 py-2.5 text-[12px] font-semibold text-white disabled:opacity-40 hover:bg-[#4a4eff] transition-all"
                >
                  Continue <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-full bg-[#0F172A] px-6 py-2.5 text-[12px] font-semibold text-white hover:bg-[#1E293B] disabled:opacity-60 transition-all"
                >
                  {submitting ? "Sending…" : "Send consultation request"} <Mail size={14} />
                </button>
              )}
            </footer>
          </form>
        )}
      </motion.div>
    </div>
  );
}
