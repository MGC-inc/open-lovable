import { NextResponse } from "next/server";

/**
 * Receives the contact and entry forms.
 *
 * The original site posted to the MW WP Form WordPress plugin. There is no
 * WordPress here, so submissions are forwarded to whatever endpoint is
 * configured in INQUIRY_WEBHOOK_URL (a mail relay, a form service, an internal
 * API — anything that accepts a JSON POST). Without that variable the route
 * reports 503 so a misconfigured deployment fails loudly instead of silently
 * dropping enquiries.
 */
export async function POST(request: Request) {
  const endpoint = process.env.INQUIRY_WEBHOOK_URL;

  let payload: { formId?: string; values?: Record<string, string> };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  if (!payload?.formId || typeof payload.values !== "object" || payload.values === null) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  if (!endpoint) {
    console.error("INQUIRY_WEBHOOK_URL is not set — the submission was not delivered.");
    return NextResponse.json({ error: "form delivery is not configured" }, { status: 503 });
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ form: payload.formId, submittedAt: new Date().toISOString(), fields: payload.values })
  });

  if (!response.ok) {
    console.error(`Inquiry webhook responded ${response.status}`);
    return NextResponse.json({ error: "delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
