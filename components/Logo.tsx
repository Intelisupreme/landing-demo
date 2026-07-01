import Link from "next/link";

type Props = {
  /** Show full wordmark next to monogram. Defaults to true. */
  withWordmark?: boolean;
  className?: string;
};

/**
 * Intelisupreme logo — soft rounded monogram "IS" inside a rounded-square
 * gradient tile, following DESIGN.md (no sharp angles, brand gradient).
 */
export default function Logo({ withWordmark = true, className = "" }: Props) {
  return (
    <Link
      href="/"
      aria-label="Intelisupreme home"
      className={`inline-flex items-center gap-2.5 ${className}`}
    >
      <span
        aria-hidden="true"
        className="bg-brand-gradient inline-flex h-9 w-9 items-center justify-center text-white shadow-[0_4px_12px_-2px_rgba(41,158,189,0.4)]"
        style={{ borderRadius: "var(--radius-md)" }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* "I" stroke */}
          <path
            d="M6 7v10"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          {/* "S" curve — soft, no sharp corners */}
          <path
            d="M11 9.5c0-1.2 1-2 2.4-2 1.5 0 2.4.8 2.4 1.9 0 1-.7 1.5-1.9 1.8l-.9.2c-1.6.4-2.4 1.1-2.4 2.3 0 1.2 1 2 2.5 2 1.4 0 2.5-.7 2.5-1.9"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </span>
      {withWordmark && (
        <span className="font-display text-[1.05rem] font-semibold tracking-tight text-text-primary">
          inteli
          <span className="text-brand-blue">supreme</span>
        </span>
      )}
    </Link>
  );
}