import Logo from "@/components/Logo";
import Link from "next/link";

const NAV = [
  { href: "/#services", label: "Services" },
  { href: "/#platform", label: "Platform" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#demo", label: "Book a demo" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="max-w-[40ch] text-sm leading-relaxed text-text-secondary">
              SaaS development and AI business automation. Engineering partner
              for European companies that ship.
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer" className="flex flex-col gap-3">
            <span className="text-xs font-medium uppercase tracking-wider text-text-secondary">
              Site
            </span>
            {NAV.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-text-primary hover:text-brand-blue"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-medium uppercase tracking-wider text-text-secondary">
              Get in touch
            </span>
            <a
              href="mailto:hello@intelisupreme.com"
              className="text-sm text-text-primary hover:text-brand-blue"
            >
              hello@intelisupreme.com
            </a>
            <span className="text-sm text-text-secondary">
              Lisbon, Portugal
            </span>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-text-secondary md:flex-row">
          <span>
            © {new Date().getFullYear()} Intelisupreme. All rights reserved.
          </span>
          <span>Built in Lisbon</span>
        </div>
      </div>
    </footer>
  );
}