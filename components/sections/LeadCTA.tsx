import LeadForm from "@/components/LeadForm";

export default function LeadCTA() {
  return (
    <section
      id="demo"
      className="bg-bg py-20 md:py-28"
      aria-labelledby="demo-heading"
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col gap-5 md:sticky md:top-28">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-brand-blue">
              Book a demo
            </span>
            <h2
              id="demo-heading"
              className="font-display text-3xl font-semibold tracking-tight md:text-[3rem] md:leading-[1.15]"
            >
              Let&apos;s map your build together
            </h2>
            <p className="max-w-[45ch] text-lg leading-relaxed text-text-secondary">
              One call. No pitch deck. We sketch what your product could turn
              into and where AI fits. You leave with a clearer next step.
            </p>
            <ul className="flex flex-col gap-2 text-text-secondary">
              {[
                "30-minute discovery call",
                "Written scope summary within 5 days",
                "No obligation, no sales loop",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-base">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:pt-2">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}