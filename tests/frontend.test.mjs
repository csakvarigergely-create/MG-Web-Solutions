import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import vm from "node:vm";

const script = await readFile(new URL("../src/interactions.js", import.meta.url), "utf8");
const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const contactFormHtml = html.match(/<form\b[^>]*class="contact-form"[^>]*>[\s\S]*?<\/form>/)?.[0];
assert.ok(contactFormHtml, "The real contact form must exist in index.html");
const formFieldNames = [...contactFormHtml.matchAll(/<(?:input|textarea)\b[^>]*\bname="([^"]+)"/g)]
  .map((match) => match[1]);

function setup(fetchImpl) {
  class Element {
    constructor() { this.handlers = {}; this.hidden = false; this.textContent = ""; this.dataset = {}; }
    addEventListener(type, handler) { this.handlers[type] = handler; }
    setAttribute() {}
    removeAttribute() {}
  }
  class HTMLInputElement extends Element { constructor(value = "") { super(); this.value = value; } }
  class HTMLTextAreaElement extends Element {}
  const interest = new HTMLInputElement();
  const context = new Element();
  const contextValue = new Element();
  const status = new Element();
  status.hidden = true;
  const button = new Element();
  button.textContent = "Egyeztetést kérek →";
  button.disabled = false;
  const form = new Element();
  form.values = Object.fromEntries(formFieldNames.map((name) => [name, ""]));
  for (const [name, value] of Object.entries({ name: " Teszt Elek ", email: "test@example.com", message: "Szia" })) {
    if (Object.hasOwn(form.values, name)) form.values[name] = value;
  }
  form.querySelector = (selector) => selector === 'button[type="submit"]' ? button : null;
  form.querySelectorAll = () => [];
  form.reset = () => { Object.keys(form.values).forEach((key) => { form.values[key] = ""; }); interest.value = ""; };
  const contextual = [...html.matchAll(/data-contact-context="([^"]+)"/g)].map((match) => {
    const link = new Element();
    link.getAttribute = () => match[1];
    return { name: match[1], link };
  });
  const general = new Element();
  const nodes = new Map([
    [".contact-form", form], ["[data-form-status]", status],
    ["[data-contact-interest]", interest], ["[data-form-context]", context],
    ["[data-form-context-value]", contextValue]
  ]);
  const document = {
    querySelector: (selector) => nodes.get(selector) ?? null,
    querySelectorAll: (selector) => selector === "[data-contact-context]" ? contextual.map(x => x.link)
      : selector === 'a[href="#kapcsolat"]:not([data-contact-context])' ? [general] : [],
    addEventListener() {}, documentElement: { classList: { add() {} } }, body: { classList: { toggle() {} } }
  };
  const sandbox = {
    document, window: { matchMedia: () => ({ matches: true, addEventListener() {} }), scrollY: 0, addEventListener() {} },
    Element, HTMLElement: Element, HTMLInputElement, HTMLTextAreaElement, Node: Element,
    FormData: class { constructor() { this.values = { ...form.values, interest: interest.value }; } get(key) { return this.values[key] ?? null; } },
    fetch: fetchImpl, console
  };
  vm.runInNewContext(script, sandbox);
  const submit = () => form.handlers.submit({ preventDefault() {} });
  return { contextual, general, interest, context, contextValue, status, button, form, submit };
}

test("all package and partner links pass interest, general CTA clears it", () => {
  const ui = setup(async () => ({ ok: true }));
  assert.deepEqual(ui.contextual.map(x => x.name), [
    "Landing Start", "Landing + Automatizáció", "Landing + Automatizáció + AI Chatbot", "Partnerprogram"
  ]);
  for (const { name, link } of ui.contextual) {
    link.handlers.click();
    assert.equal(ui.interest.value, name);
    assert.equal(ui.contextValue.textContent, name);
    assert.equal(ui.context.hidden, false);
  }
  ui.general.handlers.click();
  assert.equal(ui.interest.value, "");
  assert.equal(ui.context.hidden, true);
});

test("real HTML contact fields reach the POST payload with their exact names", async () => {
  for (const name of ["name", "email", "phone", "businessType", "message", "interest"]) {
    assert.ok(formFieldNames.includes(name), `Missing real HTML form field: ${name}`);
  }
  let request;
  const ui = setup(async (url, options) => {
    request = { url, options };
    return { ok: true };
  });
  for (const [name, value] of Object.entries({
    name: " Teszt Elek ", email: "test@example.com", phone: "+4912345678",
    businessType: "Klímaszerelés QA", message: "Teszt megkeresés"
  })) {
    if (Object.hasOwn(ui.form.values, name)) ui.form.values[name] = value;
  }
  ui.contextual[1].link.handlers.click();
  await ui.submit();
  assert.equal(request.url, "/api/contact");
  assert.equal(request.options.method, "POST");
  assert.deepEqual(JSON.parse(request.options.body), {
    name: " Teszt Elek ", email: "test@example.com", phone: "+4912345678",
    businessType: "Klímaszerelés QA", message: "Teszt megkeresés",
    interest: "Landing + Automatizáció", website: ""
  });
});

test("pending submit disables button and blocks double submit; success resets form", async () => {
  let resolve;
  const requests = [];
  const ui = setup((url, options) => {
    requests.push({ url, options });
    return new Promise((done) => { resolve = done; });
  });
  ui.contextual[0].link.handlers.click();
  const first = ui.submit();
  await ui.submit();
  assert.equal(requests.length, 1);
  assert.equal(ui.button.disabled, true);
  assert.equal(ui.status.dataset.state, "info");
  assert.equal(requests[0].url, "/api/contact");
  assert.equal(JSON.parse(requests[0].options.body).interest, "Landing Start");
  resolve({ ok: true });
  await first;
  assert.equal(ui.status.dataset.state, "success");
  assert.match(ui.status.textContent, /megérkezett/);
  assert.equal(ui.form.values.name, "");
  assert.equal(ui.form.values.website, "");
  assert.equal(ui.interest.value, "");
  assert.equal(ui.context.hidden, true);
  assert.equal(ui.button.disabled, false);
});

test("failed response retains fields and interest without false success", async () => {
  const ui = setup(async () => ({ ok: false }));
  ui.contextual[3].link.handlers.click();
  await ui.submit();
  assert.equal(ui.status.dataset.state, "error");
  assert.match(ui.status.textContent, /nem sikerült elküldeni/);
  assert.equal(ui.form.values.name, " Teszt Elek ");
  assert.equal(ui.interest.value, "Partnerprogram");
  assert.equal(ui.button.disabled, false);
});
