"use client";

import { motion, useReducedMotion } from "motion/react";

// Metrics are illustrative. Replace with real brand metrics before production.
const METRICS = [
  { value: "6 wks", label: "Average time to MVP" },
  { value: "40%", label: "Less manual ops work" },
  { value: "99.9%", label: "Uptime SLA target" },
  { value: "Lisbon", label: "Built & supported from" },
];

export default function Benefits() {
  const reduce = useReducedMotion();

  return (
    <section
      className="bg-surface/40 py-20 md:py-28"
      aria-labelledby="benefits-heading"
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <h2
          id="benefits-heading"
          className="max-w-2xl font-display text-3xl font-semibold tracking-tight md:text-[3rem] md:leading-[1.15]"
        >
          Outcomes we ship toward
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col gap-2 border-t-2 border-border pt-5"
            >
              <span className="font-display text-4xl font-bold text-text-primary md:text-5xl">
                {m.value}
              </span>
              <span className="text-sm text-text-secondary">{m.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}