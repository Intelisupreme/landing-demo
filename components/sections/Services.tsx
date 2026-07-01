"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  Code,
  Robot,
  ArrowsClockwise,
  ChatCircleText,
  ChartLine,
  CheckCircle,
} from "@phosphor-icons/react";

const SERVICES = [
  {
    id: "saas",
    icon: Code,
    title: "SaaS Development",
    body: "Custom multi-tenant SaaS platforms — from MVP to scale. Built on modern TypeScript stacks with clean, production-ready infrastructure.",
    visual: "saas" as const,
    bullets: [
      "Multi-tenant architecture",
      "Role-based access control",
      "Zero-downtime deploys",
    ],
  },
  {
    id: "ai",
    icon: Robot,
    title: "AI Business Automation",
    body: "Replace repetitive work with reliable AI workflows — document processing, customer routing, internal copilots, and autonomous agents that fit your stack.",
    visual: "ai" as const,
    bullets: [
      "LLM-powered document flows",
      "Customer support triage",
      "Agentic back-office automation",
    ],
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="bg-bg py-20 md:py-28"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <SectionHead
          eyebrow="What we do"
          title="Two disciplines. One engineering team."
          id="services-heading"
        />

        <div className="mt-14 flex flex-col gap-20 md:gap-28">
          {SERVICES.map((s, i) => (
            <ServiceRow key={s.id} service={s} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceRow({
  service,
  flip,
}: {
  service: (typeof SERVICES)[number];
  flip: boolean;
}) {
  const reduce = useReducedMotion();
  const Icon = service.icon;

  return (
    <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`flex flex-col gap-5 ${flip ? "md:order-2" : ""}`}
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] border border-border bg-surface text-brand-blue">
          <Icon size={24} weight="duotone" />
        </span>
        <h3 className="font-display text-3xl font-semibold tracking-tight md:text-[2rem]">
          {service.title}
        </h3>
        <p className="max-w-[55ch] text-lg leading-relaxed text-text-secondary">
          {service.body}
        </p>
        <ul className="flex flex-col gap-2">
          {service.bullets.map((b) => (
            <li
              key={b}
              className="flex items-center gap-2.5 text-text-primary"
            >
              <CheckCircle
                size={18}
                weight="duotone"
                className="text-brand-green"
              />
              <span className="text-base">{b}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={flip ? "md:order-1" : ""}
      >
        <ServiceVisual variant={service.visual} />
      </motion.div>
    </div>
  );
}

function ServiceVisual({ variant }: { variant: "saas" | "ai" }) {
  if (variant === "saas") {
    return (
      <div
        className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface p-8 shadow-sm"
        aria-hidden="true"
      >
        <svg viewBox="0 0 400 300" className="h-full w-full" fill="none">
          {/* Bento tiles — SaaS dashboard abstract */}
          <rect x="20" y="20" width="170" height="120" rx="14" stroke="var(--border)" strokeWidth="1.5" />
          <rect x="210" y="20" width="170" height="55" rx="14" stroke="var(--border)" strokeWidth="1.5" />
          <rect x="210" y="85" width="170" height="55" rx="14" stroke="var(--border)" strokeWidth="1.5" />
          <rect x="20" y="155" width="360" height="125" rx="14" stroke="var(--border)" strokeWidth="1.5" />
          <motion.path
            d="M40 250 C 110 220, 150 200, 200 210 S 320 240, 360 180"
            stroke="url(#saasGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          {[120, 180, 240].map((y) => (
            <circle key={y} cx="60" cy={y} r="3" fill="var(--color-brand-blue)" />
          ))}
          <defs>
            <linearGradient id="saasGrad" x1="0" y1="0" x2="400" y2="0">
              <stop offset="0%" stopColor="#299EBD" />
              <stop offset="100%" stopColor="#38A98E" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  // AI visual
  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface p-8 shadow-sm"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-brand-gradient opacity-[0.06]" />
      <svg viewBox="0 0 400 300" className="relative h-full w-full" fill="none">
        {/* Node graph — agentic workflow */}
        <g stroke="var(--border)" strokeWidth="1.5">
          <line x1="80" y1="150" x2="200" y2="80" />
          <line x1="80" y1="150" x2="200" y2="150" />
          <line x1="80" y1="150" x2="200" y2="220" />
          <line x1="200" y1="80" x2="320" y2="150" />
          <line x1="200" y1="150" x2="320" y2="150" />
          <line x1="200" y1="220" x2="320" y2="150" />
        </g>
        {[
          { x: 80, y: 150, c: "var(--color-brand-blue)" },
          { x: 200, y: 80, c: "var(--color-brand-green)" },
          { x: 200, y: 150, c: "var(--color-brand-green)" },
          { x: 200, y: 220, c: "var(--color-brand-green)" },
          { x: 320, y: 150, c: "var(--color-brand-blue)" },
        ].map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={i === 0 || i === 4 ? 14 : 10}
            fill={n.c}
          />
        ))}
      </svg>
      <div className="absolute left-6 top-6 flex gap-1.5">
        <ArrowsClockwise size={18} weight="duotone" className="text-brand-blue" />
        <ChatCircleText size={18} weight="duotone" className="text-brand-green" />
        <ChartLine size={18} weight="duotone" className="text-brand-blue" />
      </div>
    </div>
  );
}

function SectionHead({
  eyebrow,
  title,
  id,
}: {
  eyebrow: string;
  title: string;
  id: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs font-medium uppercase tracking-[0.18em] text-brand-blue">
        {eyebrow}
      </span>
      <h2
        id={id}
        className="font-display text-3xl font-semibold tracking-tight md:text-[3rem] md:leading-[1.15]"
      >
        {title}
      </h2>
    </div>
  );
}