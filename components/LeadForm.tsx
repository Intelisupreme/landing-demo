"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle, Warning, Spinner } from "@phosphor-icons/react";
import { submitLead, isHubSpotConfigured, type LeadField } from "@/lib/hubspot";

type Status = "idle" | "submitting" | "success" | "error";

type FormState = {
  firstname: string;
  email: string;
  company: string;
  service_of_interest: string;
  message: string;
  fax: string; // honeypot
};

const EMPTY: FormState = {
  firstname: "",
  email: "",
  company: "",
  service_of_interest: "SaaS Development",
  message: "",
  fax: "",
};

const SERVICES = [
  "SaaS Development",
  "AI Automation",
  "Both",
] as const;

export default function LeadForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const update =
    (key: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot: silently ignore bots that fill it.
    if (form.fax.trim() !== "") {
      setStatus("success");
      return;
    }

    if (!form.firstname.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setStatus("error");
      setErrorMsg("Please enter your name and a valid work email.");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    const fields: LeadField[] = [
      { name: "firstname", value: form.firstname.trim() },
      { name: "email", value: form.email.trim() },
      ...(form.company.trim()
        ? [{ name: "company", value: form.company.trim() }]
        : []),
      { name: "service_of_interest", value: form.service_of_interest },
      ...(form.message.trim()
        ? [{ name: "message", value: form.message.trim() }]
        : []),
    ];

    const result = await submitLead({ fields });

    if (result.ok) {
      setStatus("success");
      setForm(EMPTY);
    } else {
      setStatus("error");
      setErrorMsg(result.error);
    }
  };

  if (status === "success") {
    return (
      <div
        className="flex flex-col items-center justify-center gap-3 rounded-[var(--radius-lg)] border border-border bg-surface px-6 py-12 text-center"
        role="status"
      >
        <CheckCircle size={48} weight="duotone" className="text-brand-green" />
        <h3 className="font-display text-2xl font-semibold">
          Thank you — request received
        </h3>
        <p className="max-w-xs text-sm text-text-secondary">
          We&apos;ll reach out within one business day to schedule a discovery
          call.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-medium text-brand-blue hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  const configured = isHubSpotConfigured();

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5 rounded-[var(--radius-lg)] border border-border bg-surface p-6 shadow-md md:p-8"
      aria-label="Request a demo"
    >
      {!configured && (
        <p
          className="rounded-[var(--radius-md)] bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:bg-amber-950/40 dark:text-amber-200"
          role="note"
        >
          HubSpot integration is not configured. Submissions will not be sent
          until environment variables are set. See README.
        </p>
      )}

      {/* Name */}
      <Field label="Full name" htmlFor="firstname" required>
        <input
          id="firstname"
          name="firstname"
          type="text"
          autoComplete="name"
          required
          value={form.firstname}
          onChange={update("firstname")}
          placeholder="Ana Silva"
          className={inputClass}
        />
      </Field>

      {/* Email */}
      <Field label="Work email" htmlFor="email" required>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={form.email}
          onChange={update("email")}
          placeholder="ana@company.com"
          className={inputClass}
        />
      </Field>

      {/* Company */}
      <Field label="Company" htmlFor="company" optional>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          value={form.company}
          onChange={update("company")}
          placeholder="Company Ltd."
          className={inputClass}
        />
      </Field>

      {/* Service */}
      <Field label="Interested in" htmlFor="service_of_interest" required>
        <select
          id="service_of_interest"
          name="service_of_interest"
          required
          value={form.service_of_interest}
          onChange={update("service_of_interest")}
          className={inputClass}
        >
          {SERVICES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </Field>

      {/* Message */}
      <Field label="Message" htmlFor="message" optional>
        <textarea
          id="message"
          name="message"
          rows={3}
          value={form.message}
          onChange={update("message")}
          placeholder="Tell us about the workflow you want to automate…"
          className={`${inputClass} resize-none`}
        />
      </Field>

      {/* Honeypot — visually hidden, bots will fill it */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-px overflow-hidden">
        <label htmlFor="fax">Fax</label>
        <input
          id="fax"
          name="fax"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.fax}
          onChange={update("fax")}
        />
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="flex items-center gap-2 rounded-[var(--radius-md)] bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:bg-rose-950/40 dark:text-rose-300"
        >
          <Warning size={18} weight="duotone" />
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-brand-gradient inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-medium text-white transition-all hover:-translate-y-px hover:shadow-[0_10px_24px_-6px_rgba(41,158,189,0.45)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <Spinner size={18} className="animate-spin" />
            Sending…
          </>
        ) : (
          "Book a demo"
        )}
      </button>

      <p className="text-center text-xs text-text-secondary">
        We reply within one business day. No spam, ever.
      </p>
    </form>
  );
}

const inputClass =
  "w-full rounded-[var(--radius-md)] border border-border bg-bg px-4 py-3 text-text-primary placeholder:text-text-secondary/70 transition-colors focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30";

function Field({
  label,
  htmlFor,
  required,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-sm font-medium text-text-primary">
        {label}
        {required && <span className="text-brand-blue"> *</span>}
        {optional && (
          <span className="text-text-secondary"> (optional)</span>
        )}
      </label>
      {children}
    </div>
  );
}