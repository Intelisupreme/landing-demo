import { CaretDown } from "@phosphor-icons/react/ssr";

const FAQS = [
  {
    q: "Are you a product company or a services company?",
    a: "Both. We build custom SaaS products for clients and deploy the AI automation those products need. We do not resell a single platform — every engagement is engineered around your workflow.",
  },
  {
    q: "How long does a typical engagement take?",
    a: "An MVP runs six to eight weeks. Growth retainers run monthly with weekly delivery cadence. Levels here are starting points; the discovery call sets the real timeline.",
  },
  {
    q: "Do you work with European data residency?",
    a: "Yes. We default to EU-hosted infrastructure (AWS eu-west or equivalent) and follow GDPR. Your data stays in the region unless you ask otherwise.",
  },
  {
    q: "Can you integrate with our existing stack?",
    a: "If your systems have an API, we can talk to them. Common integrations include HubSpot, Stripe, Notion, Slack, Postgres, Snowflake, and internal REST or gRPC services.",
  },
  {
    q: "What happens after we launch?",
    a: "Every build ships with monitoring and a runbook. You get a support window in the first month. After that, we move into an ongoing retainer or hand off cleanly — your choice.",
  },
  {
    q: "How does the lead form process work?",
    a: "You submit the demo request form, we reply within one business day to schedule a 30-minute discovery call, and you get a written scope summary within five days of that call.",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      className="bg-bg py-20 md:py-28"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-[760px] px-5 md:px-8">
        <h2
          id="faq-heading"
          className="mb-12 font-display text-3xl font-semibold tracking-tight md:text-[3rem] md:leading-[1.15]"
        >
          Questions we get before signing
        </h2>

        <div className="flex flex-col divide-y divide-border border-y border-border">
          {FAQS.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex items-center justify-between gap-4 py-5 text-left">
                <span className="font-display text-lg font-medium text-text-primary">
                  {f.q}
                </span>
                <CaretDown
                  size={18}
                  weight="duotone"
                  className="shrink-0 text-text-secondary transition-transform group-open:rotate-180"
                />
              </summary>
              <div className="pb-6 pr-8 text-base leading-relaxed text-text-secondary">
                {f.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}