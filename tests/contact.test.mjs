import assert from "node:assert/strict";
import { after, test } from "node:test";
import contact from "../api/contact.js";

const originalFetch = globalThis.fetch;
const originalUrl = process.env.MAKE_CONTACT_WEBHOOK_URL;
after(() => {
  globalThis.fetch = originalFetch;
  if (originalUrl === undefined) delete process.env.MAKE_CONTACT_WEBHOOK_URL;
  else process.env.MAKE_CONTACT_WEBHOOK_URL = originalUrl;
});

const valid = {
  name: "  Teszt Elek ", email: " test@example.com ", phone: " 123 ",
  businessType: " KKV ", message: " Szia ", interest: " Landing Start ",
  website: "", source: "untrusted.example"
};
const send = (body, method = "POST") => contact.fetch(new Request("https://example.com/api/contact", {
  method,
  ...(method === "POST" ? { headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) } : {})
}));

test("valid request forwards only expected, trimmed fields with server source", async () => {
  process.env.MAKE_CONTACT_WEBHOOK_URL = "https://test.example/webhook";
  let calls = 0;
  globalThis.fetch = async (url, options) => {
    calls++;
    assert.equal(url, "https://test.example/webhook");
    assert.equal(options.method, "POST");
    assert.equal(options.headers["Content-Type"], "application/json");
    assert.ok(options.signal);
    assert.deepEqual(JSON.parse(options.body), {
      name: "Teszt Elek", email: "test@example.com", phone: "123",
      businessType: "KKV", message: "Szia", interest: "Landing Start",
      source: "mgwebsolutions.hu"
    });
    return new Response("accepted", { status: 200 });
  };
  assert.equal((await send(valid)).status, 200);
  assert.equal(calls, 1);
});

test("invalid inputs return 400 and do not call Make", async () => {
  globalThis.fetch = () => { throw new Error("should not forward"); };
  for (const body of [
    { ...valid, name: " " }, { ...valid, email: "bad" },
    { ...valid, phone: "x".repeat(51) }, { ...valid, businessType: 42 },
    { ...valid, message: "x".repeat(3001) }, { ...valid, interest: null }
  ]) assert.equal((await send(body)).status, 400);
});

test("honeypot is not forwarded or disclosed", async () => {
  globalThis.fetch = () => { throw new Error("should not forward"); };
  const response = await send({ ...valid, website: "https://spam.example" });
  assert.equal(response.status, 200);
  assert.equal((await response.json()).message, "Rendben.");
});

test("other methods return 405", async () => {
  const response = await send(null, "GET");
  assert.equal(response.status, 405);
  assert.equal(response.headers.get("allow"), "POST");
});

test("missing env, upstream error, and timeout return safe 5xx", async () => {
  delete process.env.MAKE_CONTACT_WEBHOOK_URL;
  let response = await send(valid);
  assert.equal(response.status, 503);
  assert.doesNotMatch(JSON.stringify(await response.json()), /webhook|test@example/);

  process.env.MAKE_CONTACT_WEBHOOK_URL = "https://test.example/webhook";
  globalThis.fetch = async () => new Response("private infrastructure detail", { status: 500 });
  response = await send(valid);
  assert.equal(response.status, 502);
  assert.doesNotMatch(JSON.stringify(await response.json()), /private|webhook|test@example/);

  globalThis.fetch = async () => { throw new Error("simulated timeout with secret"); };
  response = await send(valid);
  assert.equal(response.status, 502);
  assert.doesNotMatch(JSON.stringify(await response.json()), /secret|webhook|test@example/);
});
