const PARTNERS = [
  { name: "Northwind", shape: "circle" as const },
  { name: "Codex Labs", shape: "hex" as const },
  { name: "Volt Studio", shape: "triangle" as const },
  { name: "Mérida", shape: "arc" as const },
  { name: "Helio", shape: "ring" as const },
  { name: "Atlas", shape: "square" as const },
];

export default function TrustedBy() {
  return (
    <section className="border-y border-border bg-bg" aria-label="Trusted by">
      <div className="mx-auto max-w-[1200px] px-5 py-12 md:px-8">
        <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-text-secondary">
          Teams building with us
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:justify-between">
          {PARTNERS.map((p) => (
            <Monogram key={p.name} name={p.name} shape={p.shape} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Monogram({
  name,
  shape,
}: {
  name: string;
  shape: "circle" | "hex" | "triangle" | "arc" | "ring" | "square";
}) {
  return (
    <div
      className="flex items-center gap-2 grayscale transition-all hover:grayscale-0"
      aria-label={name}
      role="img"
    >
      <Mark shape={shape} />
      <span className="font-display text-xl font-semibold tracking-tight text-text-primary/80">
        {name}
      </span>
    </div>
  );
}

function Mark({
  shape,
}: {
  shape: "circle" | "hex" | "triangle" | "arc" | "ring" | "square";
}) {
  const stroke = "currentColor";
  const cls = "h-6 w-6 text-text-primary/70";
  switch (shape) {
    case "circle":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none">
          <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="1.8" />
          <circle cx="12" cy="12" r="3" fill={stroke} />
        </svg>
      );
    case "hex":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none">
          <path
            d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"
            stroke={stroke}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "triangle":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none">
          <path
            d="M12 4l8 16H4L12 4z"
            stroke={stroke}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "arc":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none">
          <path
            d="M3 17a9 9 0 0118 0"
            stroke={stroke}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <line x1="12" y1="17" x2="18" y2="10" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "ring":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none">
          <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="1.8" />
          <circle cx="12" cy="12" r="4" stroke={stroke} strokeWidth="1.8" />
        </svg>
      );
    case "square":
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none">
          <path
            d="M5 5h14v14H5z"
            stroke={stroke}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M9 12h6" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
  }
}