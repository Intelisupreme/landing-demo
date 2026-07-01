"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  ArrowsClockwise,
  Brain,
  Database,
  Robot,
  ChartLine,
} from "@phosphor-icons/react";

/**
 * Bento grid for AI capabilities.
 * Layout (md): 6-column grid
 *  Row A: [Large tinted gradient cell spanning 2 col + 2 row] [Workflow text] [LLM text]
 *  Row B: [Data] [Predictive] [+ Agent (highlighted)]
 */
const CAPABILITIES = [
  {
    id: "workflow",
    icon: ArrowsClockwise,
    title: "Workflow Automation",
    body: "Wire systems together and let them run themselves.",
    className: "md:col-span-2 md:row-span-2 md:p-10",
    visual: "gradient" as const,
  },
  {
    id: "llm",
    icon: Brain,
    title: "LLM Integration",
    body: "Connect language models to your real business data securely.",
    className: "md:col-span-2",
  },
  {
    id: "agent",
    icon: Robot,
    title: "Agent Orchestration",
    body: "Multi-step agents that call APIs, validate outputs, and report.",
    className: "md:col-span-2",
  },
  {
    id: "data",
    icon: Database,
    title: "Data Pipelines",
    body: "Clean, structured, and auditable data flows.",
    className: "md:col-span-1",
  },
  {
    id: "predictive",
    icon: ChartLine,
    title: "Predictive Analytics",
    body: "Forecast churn, demand, and load on your own data.",
    className: "md:col-span-2",
  },
];

export default function AICapabilities() {
  return (
    <section
      id="platform"
      className="bg-bg py-20 md:py-28"
      aria-labelledby="platform-heading"
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <div className="mb-12 flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-brand-blue">
            The platform
          </span>
          <h2
            id="platform-heading"
            className="max-w-2xl font-display text-3xl font-semibold tracking-tight md:text-[3rem] md:leading-[1.15]"
          >
            AI capabilities, built on real business data
          </h2>
        </div>

        <div className="grid auto-rows-[minmax(160px,auto)] grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
          {CAPABILITIES.map((c) => (
            <BentoCell key={c.id} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BentoCell({
  icon: Icon,
  title,
  body,
  className = "",
  visual,
}: {
  icon: typeof ArrowsClockwise;
  title: string;
  body: string;
  className?: string;
  visual?: "gradient";
}) {
  const reduce = useReducedMotion();
  const tinted = visual === "gradient";

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col justify-between gap-4 rounded-[var(--radius-lg)] border border-border p-6 ${
        tinted
          ? "relative overflow-hidden border-transparent bg-brand-gradient text-white"
          : "bg-surface"
      } ${className}`}
    >
      {tinted && (
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full opacity-30"
          viewBox="0 0 200 200"
          fill="none"
        >
          <motion.g
            initial={reduce ? false : { rotate: 0 }}
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "center" }}
            stroke="white"
            strokeWidth="1"
            opacity="0.4"
          >
            {[0, 40, 80, 120, 160].map((a) => (
              <circle
                key={a}
                cx="100"
                cy="100"
                r={20 + a / 4}
                strokeDasharray="6 10"
              />
            ))}
          </motion.g>
        </svg>
      )}

      <div className="relative">
        <span
          className={`inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] ${
            tinted
              ? "bg-white/15 text-white"
              : "border border-border bg-bg text-brand-blue"
          }`}
        >
          <Icon size={20} weight="duotone" />
        </span>
      </div>

      <div className="relative">
        <h3 className="font-display text-lg font-semibold md:text-xl">
          {title}
        </h3>
        <p
          className={`mt-1.5 text-sm leading-relaxed ${
            tinted ? "text-white/85" : "text-text-secondary"
          }`}
        >
          {body}
        </p>
      </div>
    </motion.div>
  );
}