"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import { List, X } from "@phosphor-icons/react";

const LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/#platform", label: "Platform" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        scrolled
          ? "border-b border-border bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent bg-bg/0"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 md:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/#demo"
            className="bg-brand-gradient hidden rounded-full px-5 py-2.5 text-sm font-medium text-white transition-all hover:-translate-y-px hover:shadow-[0_8px_18px_-6px_rgba(41,158,189,0.5)] md:inline-flex"
          >
            Book a demo
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-primary md:hidden"
          >
            {open ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-bg px-5 py-4 md:hidden">
          <nav
            className="flex flex-col gap-1"
            aria-label="Mobile"
            onClick={() => setOpen(false)}
          >
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-[var(--radius-md)] px-3 py-2.5 text-sm font-medium text-text-primary hover:bg-surface"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/#demo"
              className="bg-brand-gradient mt-2 rounded-full px-5 py-3 text-center text-sm font-medium text-white"
            >
              Book a demo
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}