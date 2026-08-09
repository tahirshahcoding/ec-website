"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/about" },
  { label: "SERVICES", href: "/services" },
  { label: "PORTFOLIO", href: "/portfolio" },
  { label: "EAGLEAI", href: "/eagleai", special: true },
  { label: "CONTACT", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E3E8F5]">
      <div className="flex items-center justify-between h-[80px] px-4 sm:px-6 lg:px-16 xl:px-24">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/logo.png"
            alt="EagleNest Creations Logo"
            width={38}
            height={38}
            className="h-8 w-8 sm:h-9 sm:w-9 object-contain"
            priority
          />
          <div className="leading-none">
            <p className="text-[12px] font-bold tracking-[0.22em] text-[#0F172A]">EAGLENEST</p>
            <p className="text-[9.5px] font-medium tracking-[0.28em] text-[#64748B] mt-[3px]">CREATIONS</p>
          </div>
        </Link>

        {/* Nav — Desktop */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || (link.special && pathname.startsWith('/eagleai'));
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative flex flex-col items-center px-4 py-1 group"
              >
                <span
                  className={cn(
                    "text-[10.5px] font-semibold tracking-[0.1em] transition-colors flex items-center gap-1.5",
                    active
                      ? (link.special ? "text-[#5B5FFF]" : "text-[#0F172A]")
                      : (link.special ? "text-[#5B5FFF]/80 group-hover:text-[#5B5FFF]" : "text-[#64748B] group-hover:text-[#0F172A]")
                  )}
                >
                  {link.label}
                  {link.special && (
                    <>
                      <span className="text-[14px] leading-none mb-[1px]">↗</span>
                      <span className="w-[5px] h-[5px] rounded-full bg-[#5B5FFF] animate-pulse" />
                    </>
                  )}
                </span>
                {active && !link.special && (
                  <span className="mt-1.5 h-[2px] w-4 rounded-full bg-[#5B5FFF]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* LET'S TALK button */}
          <Link
            href="/contact"
            className="hidden lg:inline-flex items-center gap-1.5 rounded-full border border-[#5B5FFF]/30 px-5 py-[9px] text-[10px] font-semibold tracking-[0.18em] text-[#5B5FFF] hover:bg-[#5B5FFF]/[0.06] hover:border-[#5B5FFF]/60 transition-all"
          >
            LET&apos;S TALK
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path
                d="M1.5 9.5L9.5 1.5M9.5 1.5H3.5M9.5 1.5V7.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          {/* Circle Hamburger button */}
          <button
            className="w-10 h-10 lg:w-9 lg:h-9 rounded-full border border-[#E3E8F5] flex items-center justify-center text-[#0F172A] hover:border-[#5B5FFF]/50 hover:text-[#5B5FFF] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={2} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-[#E3E8F5] px-4 sm:px-6 py-4 shadow-[0_20px_60px_rgba(91,95,255,0.06)] max-h-[calc(100dvh-80px)] overflow-y-auto overscroll-contain">
          <nav aria-label="Mobile navigation">
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href || (link.special && pathname.startsWith('/eagleai'));
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-4 py-3 text-[13px] font-semibold tracking-[0.08em] transition-colors",
                        active
                          ? (link.special ? "bg-[#5B5FFF]/[0.08] text-[#5B5FFF]" : "bg-[#5B5FFF]/[0.06] text-[#0F172A]")
                          : (link.special ? "text-[#5B5FFF]/90 hover:text-[#5B5FFF] hover:bg-[#5B5FFF]/[0.06]" : "text-[#475569] hover:text-[#0F172A] hover:bg-[#5B5FFF]/[0.04]")
                      )}
                    >
                      <span className="flex items-center gap-2">
                        {link.label}
                        {link.special && <span className="w-[5px] h-[5px] rounded-full bg-[#5B5FFF] animate-pulse" />}
                      </span>
                      {link.special && <span className="text-[14px]">↗</span>}
                      {active && !link.special && <span className="h-1.5 w-1.5 rounded-full bg-[#5B5FFF]" aria-hidden />}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-3 mt-2 border-t border-[#E3E8F5]">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-[#5B5FFF]/40 px-5 py-3.5 text-[11px] font-semibold tracking-[0.18em] text-[#5B5FFF] active:bg-[#5B5FFF]/[0.06]"
                >
                  LET&apos;S TALK ↗
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
