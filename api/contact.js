const limits = {
  name: 120,
  email: 254,
  phone: 50,
  businessType: 150,
  message: 3000,
  interest: 150
};

const json = (status, message) => Response.json({ message }, {
  status,
  headers: { "Cache-Control": "no-store" }
});

export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return new Response(JSON.stringify({ message: "Method Not Allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json", Allow: "POST", "Cache-Control": "no-store" }
      });
    }

    if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
      return json(400, "Hibás kérés.");
    }

    let body;
    try {
      if (Number(request.headers.get("content-length")) > 16_384) return json(400, "Hibás kérés.");
      const raw = await request.text();
      if (raw.length > 16_384) return json(400, "Hibás kérés.");
      body = JSON.parse(raw);
    } catch {
      return json(400, "Hibás kérés.");
    }

    if (!body || typeof body !== "object" || Array.isArray(body)) return json(400, "Hibás kérés.");
    if (body.website !== undefined && typeof body.website !== "string") return json(400, "Hibás kérés.");
    if (body.website?.trim()) return json(200, "Rendben.");

    const payload = {};
    for (const [key, limit] of Object.entries(limits)) {
      const value = body[key] === undefined && key !== "name" && key !== "email" ? "" : body[key];
      if (typeof value !== "string") return json(400, "Hibás kérés.");
      payload[key] = value.trim();
      if (payload[key].length > limit) return json(400, "Hibás kérés.");
    }

    if (!payload.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      return json(400, "Hibás kérés.");
    }

    const webhookUrl = process.env.MAKE_CONTACT_WEBHOOK_URL;
    if (!webhookUrl) return json(503, "A küldés jelenleg nem érhető el.");

    try {
      const upstream = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, source: "mgwebsolutions.hu" }),
        signal: AbortSignal.timeout(8_000)
      });
      if (!upstream.ok) return json(502, "A küldés jelenleg nem érhető el.");
      return json(200, "Rendben.");
    } catch {
      return json(502, "A küldés jelenleg nem érhető el.");
    }
  }
};
