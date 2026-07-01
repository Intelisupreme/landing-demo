"use client";

import { motion, useReducedMotion } from "motion/react";

const STEPS = [
  {
    no: "01",
    title: "Discover",
    body: "We map your workflows, data, and constraints — then write a short scope doc before any code.",
  },
  {
    no: "02",
    title: "Build",
    body: "Engineering sprints in TypeScript, modern infra, and AI integrations — shipped to staging weekly.",
  },
  {
    no: "03",
    title: "Deploy",
    body: "We go live with monitoring and runbooks. Then we keep iterating with you as the product grows.",
  },
];

export default function HowItWorks() {
  const reduce = useReducedMotion();

  return (
    <section
      className="bg-surface/40 py-20 md:py-28"
      aria-labelledby="how-heading"
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <h2
          id="how-heading"
          className="max-w-2xl font-display text-3xl font-semibold tracking-tight md:text-[3rem] md:leading-[1.15]"
        >
          How we work — three honest steps
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.no}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative flex flex-col gap-4 border-t-2 border-border pt-6"
            >
              <span className="font-display text-5xl font-bold text-brand-gradient">
                {s.no}
              </span>
              <h3 className="font-display text-xl font-semibold">{s.title}</h3>
              <p className="text-base leading-relaxed text-text-secondary">
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}