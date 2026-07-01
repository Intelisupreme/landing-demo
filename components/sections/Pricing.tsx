import Link from "next/link";
import { Check } from "@phosphor-icons/react/ssr";

const TIERS = [
  {
    name: "Starter",
    price: "€2.5k",
    cadence: "per project",
    blurb: "Validate an idea with a focused MVP.",
    features: [
      "Discovery + scope workshop",
      "Single-module MVP",
      "8-week delivery window",
      "Email support",
    ],
    highlight: false,
  },
  {
    name: "Growth",
    price: "€6k",
    cadence: "per month",
    blurb: "Product engineering embedded in your team.",
    features: [
      "Dedicated engineering pod",
      "Weekly delivery cadence",
      "AI automation included",
      "Slack + call support",
    ],
    highlight: true,
  },
  {
    name: "Scale",
    price: "Custom",
    cadence: "per engagement",
    blurb: "Long-term partnership with the platform team.",
    features: [
      "Multiple pods on call",
      "SRE + on-call runbooks",
      "Roadmap co-planning",
      "Quarterly architecture reviews",
    ],
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="bg-bg py-20 md:py-28"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <div className="mb-12 flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-brand-blue">
            Pricing
          </span>
          <h2
            id="pricing-heading"
            className="max-w-2xl font-display text-3xl font-semibold tracking-tight md:text-[3rem] md:leading-[1.15]"
          >
            Plans for every stage of the build
          </h2>
          <p className="max-w-xl text-base text-text-secondary">
            Indicative starting points. Every engagement starts with a free
            discovery call.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-stretch">
          {TIERS.map((t) => (
            <PricingCard key={t.name} {...t} />
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-text-secondary">
          Looking for something specific?{" "}
          <Link
            href="/#demo"
            className="font-medium text-brand-blue hover:underline"
          >
            Book a demo
          </Link>{" "}
          and we&apos;ll shape it around your scope.
        </p>
      </div>
    </section>
  );
}

function PricingCard({
  name,
  price,
  cadence,
  blurb,
  features,
  highlight,
}: {
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  features: string[];
  highlight: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-6 rounded-[var(--radius-lg)] border p-7 ${
        highlight
          ? "border-brand-blue/40 bg-surface shadow-[0_24px_48px_-12px_rgba(41,158,189,0.35)] md:-translate-y-2"
          : "border-border bg-surface"
      }`}
    >
      {highlight && (
        <span className="bg-brand-gradient w-fit rounded-full px-3 py-1 text-xs font-medium text-white">
          Most popular
        </span>
      )}
      <div className="flex flex-col gap-2">
        <h3 className="font-display text-xl font-semibold">{name}</h3>
        <p className="text-sm text-text-secondary">{blurb}</p>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="font-display text-4xl font-bold">{price}</span>
        <span className="text-sm text-text-secondary">{cadence}</span>
      </div>
      <ul className="flex flex-col gap-3 border-t border-border pt-5">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm">
            <Check
              size={18}
              weight="duotone"
              className="mt-0.5 shrink-0 text-brand-green"
            />
            <span className="text-text-primary">{f}</span>
          </li>
        ))}
      </ul>
      <Link
        href="/#demo"
        className={`mt-auto inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-all hover:-translate-y-px ${
          highlight
            ? "bg-brand-gradient text-white hover:shadow-[0_12px_28px_-6px_rgba(41,158,189,0.5)]"
            : "border-2 border-brand-blue text-brand-blue hover:bg-brand-blue/5"
        }`}
      >
        Book a demo
      </Link>
    </div>
  );
}