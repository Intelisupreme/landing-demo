"use client";

import { motion, useReducedMotion } from "motion/react";
import { Quotes } from "@phosphor-icons/react";

const TESTIMONIALS = [
  {
    quote:
      "Intelisupreme shipped our internal scheduling tool in six weeks — what our last contractor charged double for and never finished.",
    name: "Rui Marques",
    role: "COO",
    company: "Northwind Logistics",
  },
  {
    quote:
      "Their AI document flow now handles 80% of inbound supplier invoices. Our finance team got two days a week back.",
    name: "Inês Carvalho",
    role: "Head of Finance",
    company: "Mérida Retail",
  },
  {
    quote:
      "Clean code, clear weekly demos, no surprises. The kind of engineering partner you actually want on the call.",
    name: "Hugo Almeida",
    role: "CTO",
    company: "Volt Studio",
  },
];

export default function Testimonials() {
  const reduce = useReducedMotion();

  return (
    <section
      className="bg-surface/40 py-20 md:py-28"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <h2
          id="testimonials-heading"
          className="max-w-2xl font-display text-3xl font-semibold tracking-tight md:text-[3rem] md:leading-[1.15]"
        >
          What teams say after a month
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col gap-5 rounded-[var(--radius-lg)] border border-border bg-bg p-7"
            >
              <Quotes size={28} weight="duotone" className="text-brand-blue" />
              <blockquote className="text-lg leading-relaxed text-text-primary">
                {t.quote}
              </blockquote>
              <figcaption className="mt-auto flex flex-col gap-0.5 border-t border-border pt-4 text-sm">
                <span className="font-semibold text-text-primary">
                  {t.name}
                </span>
                <span className="text-text-secondary">
                  {t.role} · {t.company}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}