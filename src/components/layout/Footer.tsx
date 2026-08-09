import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail } from "lucide-react";

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

const serviceLinks = [
  { label: "Artificial Intelligence", href: "/services" },
  { label: "Software Development", href: "/services" },
  { label: "Web Development", href: "/services" },
  { label: "Mobile Applications", href: "/services" },
  { label: "Branding & Design", href: "/services" },
  { label: "Digital Marketing", href: "/services" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Eagle AI", href: "/eagleai" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  { label: "LinkedIn", href: "#", icon: LinkedinIcon },
  { label: "X / Twitter", href: "#", icon: XIcon },
  { label: "GitHub", href: "#", icon: GithubIcon },
] as const;

function ColumnLink({ label, href }: { label: string; href: string }) {
  return (
    <li>
      <Link
        href={href}
        className="group inline-flex items-center gap-1 text-xs text-[#475569] transition-colors hover:text-[#0F172A]"
      >
        {label}
        <ArrowUpRight
          className="h-3 w-3 -translate-x-0.5 translate-y-0.5 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
          strokeWidth={2}
        />
      </Link>
    </li>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#E3E8F5] bg-[#FCFCFD]">
      <div className="mx-auto w-full px-5 py-12 sm:px-6 lg:px-16 xl:px-24">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="EagleNest Creations"
                width={26}
                height={26}
                className="h-6 w-6 object-contain"
              />
              <span className="text-[15px] font-bold tracking-tight text-[#0F172A]">
                <span className="bg-[linear-gradient(135deg,#5B5FFF,#8B5CF6)] bg-clip-text text-transparent">Eagle</span>
                <span>Nest</span>
                <span className="font-normal text-[#475569]"> Creations</span>
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-[#475569]">
              A premium digital studio building AI, software, and brand experiences.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E3E8F5] bg-white text-[#475569] transition-colors hover:border-[#5B5FFF]/40 hover:text-[#5B5FFF]"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <h4 className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#0F172A]">
              Services
            </h4>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <ColumnLink key={link.label} {...link} />
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <h4 className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#0F172A]">
              Company
            </h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <ColumnLink key={link.label} {...link} />
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-3">
            <h4 className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#0F172A]">
              Contact
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:team.eaglenestcreations@gmail.com"
                  className="inline-flex items-center gap-2 text-xs text-[#475569] transition-colors hover:text-[#0F172A]"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0 text-[#8B5CF6]" strokeWidth={1.8} />
                  team.eaglenestcreations@gmail.com
                </a>
              </li>
            </ul>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-1 rounded-full border border-[#5B5FFF]/30 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#5B5FFF] transition-colors hover:bg-[#5B5FFF]/[0.06] hover:border-[#5B5FFF]/60"
            >
              Let&apos;s talk
              <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[#E3E8F5] pt-5 sm:flex-row">
          <p className="text-[11px] text-[#475569]">
            © {year} EagleNest Creations. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-[11px] text-[#475569]">
            <Link href="/privacy" className="transition-colors hover:text-[#0F172A]">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-[#0F172A]">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
