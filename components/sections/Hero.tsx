"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Sparkle } from "@phosphor-icons/react";

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden"
      aria-label="Intelisupreme — SaaS and AI automation"
    >
      <div className="mx-auto grid min-h-[calc(100dvh-4rem)] max-w-[1200px] grid-cols-1 items-center gap-12 px-5 pb-20 pt-24 md:grid-cols-2 md:px-8 md:pt-28">
        {/* Copy column */}
        <div className="flex flex-col items-start gap-6">
          <motion.span
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text-secondary"
          >
            <Sparkle size={14} weight="duotone" className="text-brand-blue" />
            SaaS built for European businesses
          </motion.span>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="font-display text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl lg:text-6xl"
          >
            Ship SaaS faster.
            <br />
            <span className="text-brand-gradient">Automate with AI.</span>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="max-w-[60ch] text-lg leading-relaxed text-text-secondary"
          >
            We design, build, and automate software products for growing
            businesses — from custom SaaS pipelines to AI workflows that do the
            heavy lifting.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.18,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link
              href="/#demo"
              className="bg-brand-gradient inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-medium text-white transition-all hover:-translate-y-px hover:shadow-[0_12px_28px_-6px_rgba(41,158,189,0.5)] active:translate-y-0"
            >
              Book a demo
              <ArrowRight size={18} weight="duotone" />
            </Link>
            <Link
              href="/#platform"
              className="inline-flex items-center justify-center rounded-full border-2 border-brand-blue px-6 py-3.5 font-medium text-brand-blue transition-colors hover:bg-brand-blue/5"
            >
              See the platform
            </Link>
          </motion.div>
        </div>

        {/* Visual column */}
        <HeroVisual reduce={reduce} />
      </div>
    </section>
  );
}

function HeroVisual({ reduce }: { reduce: boolean | null }) {
  return (
    <div
      className="relative aspect-square w-full max-w-[520px] justify-self-center md:aspect-[4/5]"
      aria-hidden="true"
    >
      {/* Soft gradient halo */}
      <div className="absolute inset-0 rounded-[var(--radius-lg)] bg-brand-gradient opacity-[0.12] blur-[80px]" />

      {/* Compositional panel — no fake screenshot, abstract AI mesh */}
      <div className="relative h-full w-full overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface shadow-md">
        <svg
          viewBox="0 0 400 500"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Grid lines */}
          <g stroke="var(--border)" strokeWidth="1">
            {[80, 160, 240, 320].map((y) => (
              <line key={y} x1="0" y1={y} x2="400" y2={y} />
            ))}
            {[80, 160, 240, 320].map((x) => (
              <line key={x} x1={x} y1="0" x2={x} y2="500" />
            ))}
          </g>

          {/* Brand gradient strokes — soft curves (DESIGN.md: no sharp angles) */}
          <motion.path
            d="M40 420 C 120 380, 160 200, 240 180 S 360 200, 380 80"
            stroke="url(#heroGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
          />
          <motion.path
            d="M30 320 C 110 360, 200 240, 280 220 S 370 160, 390 80"
            stroke="url(#heroGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.5"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: "easeOut", delay: 0.5 }}
          />

          {/* Animated nodes */}
          {[
            { cx: 40, cy: 420, delay: 0.7 },
            { cx: 240, cy: 180, delay: 1.0 },
            { cx: 380, cy: 80, delay: 1.3 },
            { cx: 160, cy: 280, delay: 1.6 },
          ].map((n, i) => (
            <motion.circle
              key={i}
              cx={n.cx}
              cy={n.cy}
              r="8"
              fill="var(--color-brand-blue)"
              initial={reduce ? false : { scale: 0 }}
              animate={{ scale: [0, 1.25, 1], opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: n.delay,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          ))}

          <defs>
            <linearGradient id="heroGrad" x1="0" y1="500" x2="400" y2="0">
              <stop offset="0%" stopColor="#299EBD" />
              <stop offset="100%" stopColor="#38A98E" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating accent dots */}
        <motion.span
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="absolute right-6 top-8 inline-flex items-center gap-2 rounded-full border border-border bg-bg/70 px-3 py-1.5 text-xs font-medium text-text-secondary backdrop-blur"
        >
          <span className="h-2 w-2 rounded-full bg-brand-green" />
          AI workflow online
        </motion.span>
      </div>
    </div>
  );
}