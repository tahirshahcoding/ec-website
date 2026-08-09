export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const leadUrl = process.env.EAGLEAI_LEAD_URL;
  if (!leadUrl) {
    return new Response(JSON.stringify({ ok: false, error: "EAGLEAI_LEAD_URL is not configured" }), {
      status: 501,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const email = (body as { email?: unknown })?.email;
  if (typeof email !== "string" || !email.includes("@")) {
    return new Response(JSON.stringify({ ok: false, error: "email is required" }), {
      status: 422,
      headers: { "Content-Type": "application/json" },
    });
  }

  const upstream = await fetch(leadUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const text = await upstream.text().catch(() => "");
  return new Response(text || JSON.stringify({ ok: upstream.ok }), {
    status: upstream.status,
    headers: { "Content-Type": "application/json" },
  });
}
