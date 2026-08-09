"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, CheckCircle2, Clock3, Loader2, ShieldCheck } from "lucide-react";
import { container } from "@/lib/layout";
import { blurInUp, fadeInUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ─── Options ────────────────────────────────────────────────────────────── */

const SERVICES = [
  "Artificial Intelligence",
  "Custom Software Development",
  "Web Development",
  "Mobile Applications",
  "Digital Marketing",
  "SEO",
  "Brand Identity",
  "UI/UX Design",
  "Automation",
  "Enterprise Solutions",
  "Other",
] as const;

const INDUSTRIES = [
  "Technology",
  "Healthcare",
  "E-commerce",
  "Finance & Banking",
  "Education",
  "Real Estate",
  "Hospitality",
  "Manufacturing",
  "Logistics",
  "Media & Entertainment",
  "Non-profit",
  "Other",
] as const;

const BUDGETS = [
  "Under $1,000",
  "$1,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
  "Let's Discuss",
] as const;

const TIMELINES = ["Immediately", "Within 1 Month", "Within 3 Months", "Flexible"] as const;

const METHODS = ["Email", "Phone", "WhatsApp"] as const;

/* ─── Validation ─────────────────────────────────────────────────────────── */

type FieldName =
  | "fullName"
  | "company"
  | "email"
  | "phone"
  | "country"
  | "industry"
  | "service"
  | "budget"
  | "timeline"
  | "description";

type FormValues = Record<FieldName, string> & { method: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s()\-]{6,}$/;

function validateField(name: FieldName, value: string): string | undefined {
  switch (name) {
    case "fullName":
      if (!value.trim()) return "Please tell us your name.";
      if (value.trim().length < 2) return "Name looks too short.";
      return undefined;
    case "email":
      if (!value.trim()) return "An email is required so we can reply.";
      if (!EMAIL_RE.test(value.trim())) return "That email doesn't look right.";
      return undefined;
    case "phone":
      if (value.trim() && !PHONE_RE.test(value.trim())) return "That phone number looks incomplete.";
      return undefined;
    case "service":
      return value ? undefined : "Pick a service so we can match the right team.";
    case "budget":
      return value ? undefined : "An estimate helps us scope the project.";
    case "timeline":
      return value ? undefined : "Tell us roughly when you'd like to start.";
    case "description":
      if (!value.trim()) return "A short description helps us prepare.";
      if (value.trim().length < 20) return "Add a little more detail (at least 20 characters).";
      return undefined;
    default:
      return undefined;
  }
}

const INITIAL: FormValues = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  country: "",
  industry: "",
  service: "",
  budget: "",
  timeline: "",
  method: "Email",
  description: "",
};

/* ─── Field primitives ───────────────────────────────────────────────────── */

const inputBase =
  "peer w-full rounded-[14px] border bg-[#FCFCFD] px-4 text-[14px] font-medium text-[#0F172A] outline-none transition-all duration-200 placeholder-transparent";

const floatingLabel = (float: boolean, error: boolean) =>
  cn(
    "pointer-events-none absolute transition-all duration-200",
    float
      ? "left-4 top-3 text-[10px] font-bold uppercase tracking-[0.14em]"
      : "left-4 top-1/2 -translate-y-1/2 text-[14px] font-medium",
    float && (error ? "text-[#DC2626]" : "text-[#5B5FFF]"),
    !float && (error ? "text-[#DC2626]" : "text-[#64748B]")
  );

const borderState = (focused: boolean, error: boolean, value: string) =>
  error
    ? "border-[#FCA5A5] focus:border-[#DC2626] focus:ring-4 focus:ring-[#DC2626]/10"
    : focused || value
      ? "border-[#5B5FFF] focus:border-[#5B5FFF] focus:ring-4 focus:ring-[#5B5FFF]/10"
      : "border-[#D2D8F0] focus:border-[#5B5FFF]";

function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
          className="mt-1.5 pl-1 text-[12px] font-medium text-[#DC2626]"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

interface TextFieldProps {
  id: string;
  label: string;
  value: string;
  error?: string;
  valid?: boolean;
  type?: string;
  autoComplete?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

function TextField({ id, label, value, error, valid, type = "text", autoComplete, onChange, onBlur }: TextFieldProps) {
  const [focused, setFocused] = useState(false);
  const float = focused || value.length > 0;

  return (
    <div>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          autoComplete={autoComplete}
          placeholder=" "
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
          onChange={(e) => onChange(e.target.value)}
          className={cn(inputBase, "h-[56px] pt-5", borderState(focused, Boolean(error), value))}
          aria-invalid={Boolean(error)}
        />
        <label htmlFor={id} className={floatingLabel(float, Boolean(error))}>
          {label}
        </label>
        {valid && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#10B981]">
            <Check className="h-4 w-4" strokeWidth={2.5} />
          </span>
        )}
      </div>
      <FieldError message={error} />
    </div>
  );
}

interface TextAreaFieldProps {
  id: string;
  label: string;
  value: string;
  error?: string;
  rows?: number;
  onChange: (value: string) => void;
  onFocus?: () => void;
}

function TextAreaField({ id, label, value, error, rows = 5, onChange, onFocus }: TextAreaFieldProps) {
  const [focused, setFocused] = useState(false);
  const float = focused || value.length > 0;

  return (
    <div>
      <div className="relative">
        <textarea
          id={id}
          name={id}
          value={value}
          placeholder=" "
          rows={rows}
          onFocus={() => {
            setFocused(true);
            onFocus?.();
          }}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            inputBase,
            "resize-none px-4 pt-6",
            borderState(focused, Boolean(error), value)
          )}
          aria-invalid={Boolean(error)}
        />
        <label htmlFor={id} className={floatingLabel(float, Boolean(error))}>
          {label}
        </label>
      </div>
      <FieldError message={error} />
    </div>
  );
}

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  options: readonly string[];
  error?: string;
  valid?: boolean;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

function SelectField({ id, label, value, options, error, valid, onChange, onBlur }: SelectFieldProps) {
  const [focused, setFocused] = useState(false);
  const float = focused || value.length > 0;

  return (
    <div>
      <div className="relative">
        <select
          id={id}
          name={id}
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            inputBase,
            "h-[56px] cursor-pointer appearance-none pt-5 pr-10",
            borderState(focused, Boolean(error), value),
            !value && "text-[#64748B]"
          )}
          aria-invalid={Boolean(error)}
        >
          <option value="" disabled hidden />
          {options.map((option) => (
            <option key={option} value={option} className="text-[#0F172A]">
              {option}
            </option>
          ))}
        </select>
        <label htmlFor={id} className={floatingLabel(float, Boolean(error))}>
          {label}
        </label>
        <svg
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748B]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
        {valid && (
          <span className="absolute right-10 top-1/2 -translate-y-1/2 text-[#10B981]">
            <Check className="h-4 w-4" strokeWidth={2.5} />
          </span>
        )}
      </div>
      <FieldError message={error} />
    </div>
  );
}

/* ─── Reassurance column ─────────────────────────────────────────────────── */

const PROMISES = [
  {
    icon: Clock3,
    title: "Replies within 24 hours",
    description: "Real humans, quick turnaround — on weekdays and often weekends.",
  },
  {
    icon: ShieldCheck,
    title: "No pressure, no lock-in",
    description: "A free consultation. If we're not the right fit, we'll point you elsewhere.",
  },
  {
    icon: CheckCircle2,
    title: "Clear next steps",
    description: "You'll always know what happens next — scope, timeline, and budget.",
  },
];

/* ─── Section ────────────────────────────────────────────────────────────── */

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(INITIAL);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const set = (name: FieldName | "method") => (value: string) =>
    setValues((prev) => ({ ...prev, [name]: value }));

  const errors = {
    fullName: validateField("fullName", values.fullName),
    company: undefined,
    email: validateField("email", values.email),
    phone: validateField("phone", values.phone),
    country: undefined,
    industry: undefined,
    service: validateField("service", values.service),
    budget: validateField("budget", values.budget),
    timeline: validateField("timeline", values.timeline),
    description: validateField("description", values.description),
  } as Record<FieldName, string | undefined>;

  const showError = (name: FieldName) => (touched[name] ? errors[name] : undefined);
  const isValid = (name: FieldName) => !errors[name] && values[name].trim().length > 0;

  const hasVisibleErrors = Object.values(errors).some(Boolean);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      service: true,
      budget: true,
      timeline: true,
      description: true,
    });
    if (hasVisibleErrors) return;

    setStatus("submitting");
    // Simulated submission — replace with your API endpoint when ready.
    setTimeout(() => {
      setStatus("success");
      setValues(INITIAL);
      setTouched({});
    }, 1200);
  }

  return (
    <section id="inquiry" className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute right-[6%] top-[10%] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(91,95,255,0.06),transparent_62%)]" />
      </div>

      <div className={container}>
        <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
          {/* ── Left: context ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-5 lg:sticky lg:top-28"
          >
            <motion.p
              variants={blurInUp}
              className="mb-3 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em]"
            >
              <span className="inline-block h-px w-8 bg-[#5B5FFF]" aria-hidden />
              <span className="bg-[linear-gradient(100deg,#5B5FFF,#8B5CF6)] bg-clip-text text-transparent">
                Project inquiry
              </span>
            </motion.p>

            <motion.h2
              variants={blurInUp}
              className="font-extrabold text-[#0F172A] leading-[1.05] tracking-[-0.03em]"
              style={{ fontSize: "clamp(28px, 4.5vw, 52px)" }}
            >
              Tell us about your project.
            </motion.h2>

            <motion.p variants={blurInUp} className="mt-6 max-w-[440px] text-[15px] leading-[1.7] text-[#475569] sm:text-[17px]">
              This isn&apos;t a generic contact form — it&apos;s the first step of a
              consultation. Share a few details and our team will come prepared.
            </motion.p>

            <div className="mt-10 space-y-6">
              {PROMISES.map(({ icon: Icon, title, description }) => (
                <motion.div key={title} variants={fadeInUp} className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border border-[#E3E8F5] bg-[#FCFCFD] text-[#5B5FFF]">
                    <Icon className="h-4.5 w-4.5" strokeWidth={1.7} />
                  </div>
                  <div>
                    <p className="text-[15px] font-bold text-[#0F172A]">{title}</p>
                    <p className="mt-1 text-[13.5px] leading-[1.6] text-[#475569]">{description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: form card ── */}
          <motion.div
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-7"
          >
            <div className="relative overflow-hidden rounded-[28px] border border-[#D2D8F0] bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.06)] sm:p-10">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                    className="flex min-h-[480px] flex-col items-center justify-center text-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#10B981]/[0.12] text-[#10B981]">
                      <CheckCircle2 className="h-8 w-8" strokeWidth={1.7} />
                    </div>
                    <h3 className="mt-6 text-[24px] font-extrabold tracking-[-0.02em] text-[#0F172A]">
                      Thank you — we&apos;re on it.
                    </h3>
                    <p className="mt-3 max-w-[380px] text-[14.5px] leading-[1.7] text-[#475569]">
                      Your inquiry is with our team. Expect a thoughtful reply within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#D6DAE6] bg-white px-6 py-3 text-[13px] font-semibold text-[#0F172A] transition-colors hover:border-[#5B5FFF] hover:text-[#5B5FFF]"
                    >
                      Send another inquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid gap-5 sm:grid-cols-2"
                  >
                    <TextField
                      id="fullName"
                      label="Full Name"
                      value={values.fullName}
                      error={showError("fullName")}
                      valid={isValid("fullName")}
                      autoComplete="name"
                      onChange={set("fullName")}
                      onBlur={() => setTouched((t) => ({ ...t, fullName: true }))}
                    />
                    <TextField
                      id="company"
                      label="Company Name"
                      value={values.company}
                      autoComplete="organization"
                      onChange={set("company")}
                    />
                    <TextField
                      id="email"
                      label="Email Address"
                      type="email"
                      value={values.email}
                      error={showError("email")}
                      valid={isValid("email")}
                      autoComplete="email"
                      onChange={set("email")}
                      onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                    />
                    <TextField
                      id="phone"
                      label="Phone Number"
                      type="tel"
                      value={values.phone}
                      error={showError("phone")}
                      valid={isValid("phone")}
                      autoComplete="tel"
                      onChange={set("phone")}
                      onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                    />
                    <TextField
                      id="country"
                      label="Country"
                      value={values.country}
                      autoComplete="country-name"
                      onChange={set("country")}
                    />
                    <SelectField
                      id="industry"
                      label="Business Industry"
                      value={values.industry}
                      options={INDUSTRIES}
                      onChange={set("industry")}
                    />
                    <SelectField
                      id="service"
                      label="Service Required"
                      value={values.service}
                      options={SERVICES}
                      error={showError("service")}
                      valid={isValid("service")}
                      onChange={set("service")}
                      onBlur={() => setTouched((t) => ({ ...t, service: true }))}
                    />
                    <SelectField
                      id="budget"
                      label="Estimated Budget"
                      value={values.budget}
                      options={BUDGETS}
                      error={showError("budget")}
                      valid={isValid("budget")}
                      onChange={set("budget")}
                      onBlur={() => setTouched((t) => ({ ...t, budget: true }))}
                    />
                    <SelectField
                      id="timeline"
                      label="Project Timeline"
                      value={values.timeline}
                      options={TIMELINES}
                      error={showError("timeline")}
                      valid={isValid("timeline")}
                      onChange={set("timeline")}
                      onBlur={() => setTouched((t) => ({ ...t, timeline: true }))}
                    />
                    <SelectField
                      id="method"
                      label="Preferred Contact Method"
                      value={values.method}
                      options={METHODS}
                      onChange={set("method")}
                    />

                    <div className="sm:col-span-2">
                      <TextAreaField
                        id="description"
                        label="Project Description"
                        value={values.description}
                        error={showError("description")}
                        onChange={set("description")}
                        onFocus={() => setTouched((t) => ({ ...t, description: true }))}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <motion.button
                        type="submit"
                        whileTap={{ scale: 0.98 }}
                        disabled={status === "submitting"}
                        className="group flex h-[54px] w-full items-center justify-center gap-2.5 rounded-[14px] bg-[linear-gradient(100deg,#5B5FFF,#8B5CF6)] text-[15px] font-semibold text-white shadow-[0_14px_40px_rgba(91,95,255,0.3)] transition-all duration-300 hover:shadow-[0_18px_50px_rgba(91,95,255,0.4)] disabled:cursor-not-allowed disabled:opacity-80"
                      >
                        {status === "submitting" ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.2} />
                            Sending…
                          </>
                        ) : (
                          <>
                            Start Our Conversation
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.2} />
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
