const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector("[data-nav-links]");
const header = document.querySelector("[data-site-header]");
const form = document.querySelector(".contact-form");
const formStatus = document.querySelector("[data-form-status]");
const contactInterest = document.querySelector("[data-contact-interest]");
const formContext = document.querySelector("[data-form-context]");
const formContextValue = document.querySelector("[data-form-context-value]");
const mobileNavigation = window.matchMedia("(max-width: 980px)");

const setMenuOpen = (isOpen) => {
  links?.classList.toggle("is-open", isOpen);
  toggle?.setAttribute("aria-expanded", String(isOpen));
  toggle?.setAttribute("aria-label", isOpen ? "Menü bezárása" : "Menü megnyitása");
  document.body.classList.toggle("nav-open", isOpen && mobileNavigation.matches);
};

toggle?.addEventListener("click", () => {
  setMenuOpen(toggle.getAttribute("aria-expanded") !== "true");
});

links?.addEventListener("click", (event) => {
  if (event.target instanceof Element && event.target.closest("a")) {
    setMenuOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && toggle?.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    toggle.focus();
  }
});

mobileNavigation.addEventListener("change", () => setMenuOpen(false));

document.addEventListener("pointerdown", (event) => {
  if (toggle?.getAttribute("aria-expanded") !== "true") return;
  if (!(event.target instanceof Node)) return;
  if (toggle.contains(event.target) || links?.contains(event.target)) return;
  setMenuOpen(false);
});

const updateHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 18);
};

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

const revealTargets = document.querySelectorAll("[data-reveal]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (revealTargets.length && "IntersectionObserver" in window && !reducedMotion.matches) {
  document.documentElement.classList.add("reveal-enabled");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8%" }
  );
  revealTargets.forEach((target) => revealObserver.observe(target));
}

const validationMessageFor = (field) => {
  if (field.name === "name" && field.validity.valueMissing) return "Kérlek, add meg a neved.";
  if (field.name === "email" && field.validity.valueMissing) return "Kérlek, add meg az e-mail-címed.";
  if (field.name === "email" && field.validity.typeMismatch) return "Kérlek, érvényes e-mail-címet adj meg.";
  return "Kérlek, ellenőrizd ezt a mezőt.";
};

const updateFieldError = (field, showError) => {
  const error = form?.querySelector(`[data-field-error="${field.name}"]`);
  if (!(error instanceof HTMLElement)) return;
  error.hidden = !showError;
  error.textContent = showError ? validationMessageFor(field) : "";
  if (showError) field.setAttribute("aria-invalid", "true");
  else field.removeAttribute("aria-invalid");
};

form?.addEventListener("invalid", (event) => {
  const field = event.target;
  if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement)) return;
  updateFieldError(field, true);
  if (formStatus) {
    formStatus.hidden = false;
    formStatus.dataset.state = "error";
    formStatus.textContent = "Kérlek, javítsd a jelzett mezőket.";
  }
}, true);

form?.addEventListener("input", (event) => {
  const field = event.target;
  if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement)) return;
  if (field.validity.valid) updateFieldError(field, false);
  else if (field.hasAttribute("aria-invalid")) updateFieldError(field, true);
  if (formStatus?.dataset.state === "error" && !form.querySelector('[aria-invalid="true"]')) {
    formStatus.hidden = true;
    delete formStatus.dataset.state;
    formStatus.textContent = "";
  }
});

document.querySelectorAll("[data-contact-context]").forEach((link) => {
  link.addEventListener("click", () => {
    const context = link.getAttribute("data-contact-context")?.trim();
    if (!context) return;
    if (contactInterest instanceof HTMLInputElement) contactInterest.value = context;
    if (formContextValue) formContextValue.textContent = context;
    if (formContext instanceof HTMLElement) formContext.hidden = false;
  });
});

document.querySelectorAll('a[href="#kapcsolat"]:not([data-contact-context])').forEach((link) => {
  link.addEventListener("click", () => {
    if (contactInterest instanceof HTMLInputElement) contactInterest.value = "";
    if (formContextValue) formContextValue.textContent = "";
    if (formContext instanceof HTMLElement) formContext.hidden = true;
  });
});

let formIsProcessing = false;
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (formIsProcessing) return;
  const button = form.querySelector("button");
  if (!button) return;

  formIsProcessing = true;
  const originalContent = button.innerHTML;
  button.textContent = "Ellenőrzés folyamatban…";
  button.setAttribute("aria-disabled", "true");
  if (formStatus) {
    formStatus.hidden = false;
    formStatus.dataset.state = "info";
    formStatus.textContent = "Az űrlap technikai bekötése még folyamatban van, ezért az üzenet most nem került elküldésre. A kitöltött adatok megmaradtak.";
  }
  window.setTimeout(() => {
    button.innerHTML = originalContent;
    button.removeAttribute("aria-disabled");
    formIsProcessing = false;
  }, 2600);
});

document.querySelectorAll(".faq-list details").forEach((details) => {
  const summary = details.querySelector("summary");
  if (!summary) return;
  const syncExpandedState = () => summary.setAttribute("aria-expanded", String(details.open));
  syncExpandedState();
  details.addEventListener("toggle", syncExpandedState);
});

const mobileCta = document.querySelector(".mobile-cta");
const contactSection = document.querySelector("#kapcsolat");
const footerSection = document.querySelector(".site-footer");
if (mobileCta && contactSection && "IntersectionObserver" in window) {
  const visibleFinalSections = new Set();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visibleFinalSections.add(entry.target);
        else visibleFinalSections.delete(entry.target);
      });
      mobileCta.classList.toggle("is-hidden", visibleFinalSections.size > 0);
    },
    { threshold: 0.12 }
  );
  [contactSection, footerSection].filter(Boolean).forEach((section) => observer.observe(section));
}
