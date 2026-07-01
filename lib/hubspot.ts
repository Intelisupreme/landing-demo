/**
 * HubSpot Free CRM — Forms public API integration.
 * Docs: https://legacydevelopers.hubspot.com/docs/methods/forms/submit_form
 *
 * The public submission endpoint is CORS-enabled, so we can POST directly
 * from a statically exported site (no server required).
 */

const PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
const FORM_ID = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID;

export type LeadField = {
  name: string;
  value: string;
};

export type LeadPayload = {
  fields: LeadField[];
  context?: {
    pageUri?: string;
    pageName?: string;
    hutk?: string;
  };
};

export function isHubSpotConfigured(): boolean {
  return Boolean(
    PORTAL_ID &&
      FORM_ID &&
      PORTAL_ID !== "replace-me" &&
      FORM_ID !== "replace-me",
  );
}

export function getHubSpotEndpoint(): string {
  return `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`;
}

export async function submitLead(
  payload: LeadPayload,
): Promise<{ ok: true; body?: unknown } | { ok: false; error: string }> {
  if (!isHubSpotConfigured()) {
    return {
      ok: false,
      error:
        "Lead capture is not configured. Set NEXT_PUBLIC_HUBSPOT_PORTAL_ID and NEXT_PUBLIC_HUBSPOT_FORM_ID.",
    };
  }

  try {
    const res = await fetch(getHubSpotEndpoint(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: payload.fields,
        context: {
          pageUri: payload.context?.pageUri ?? typeof window !== "undefined"
            ? window.location.href
            : undefined,
          pageName: payload.context?.pageName ?? "Intelisupreme Landing",
        },
      }),
    });

    if (!res.ok) {
      let detail = "";
      try {
        const err = await res.json();
        detail = err?.message ?? err?.errors?.[0]?.message ?? "";
      } catch {
        // non-JSON body
      }
      return {
        ok: false,
        error:
          detail || `HubSpot rejected the submission (HTTP ${res.status}).`,
      };
    }

    const body = await res.json().catch(() => undefined);
    return { ok: true, body };
  } catch (e) {
    return {
      ok: false,
      error:
        e instanceof Error ? e.message : "Network error while submitting.",
    };
  }
}