const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector("[data-nav-links]");
const header = document.querySelector("[data-site-header]");
const form = document.querySelector(".contact-form");
const formStatus = document.querySelector("[data-form-status]");
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

form?.addEventListener("invalid", (event) => {
  const field = event.target;
  if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement)) return;
  field.setAttribute("aria-invalid", "true");
  if (formStatus) {
    formStatus.hidden = false;
    formStatus.dataset.state = "error";
    formStatus.textContent = "Kérlek, ellenőrizd a csillaggal jelölt mezőket.";
  }
}, true);

form?.addEventListener("input", (event) => {
  const field = event.target;
  if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement)) return;
  if (field.validity.valid) field.removeAttribute("aria-invalid");
  if (formStatus?.dataset.state === "error" && !form.querySelector('[aria-invalid="true"]')) {
    formStatus.hidden = true;
    delete formStatus.dataset.state;
    formStatus.textContent = "";
  }
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const button = form.querySelector("button");
  if (!button) return;

  const originalContent = button.innerHTML;
  button.textContent = "Ellenőrzés folyamatban…";
  button.disabled = true;
  if (formStatus) {
    formStatus.hidden = false;
    formStatus.dataset.state = "info";
    formStatus.textContent = "Az űrlap technikai bekötése még folyamatban van, ezért az üzenet most nem került elküldésre. A kitöltött adatok megmaradtak.";
  }
  window.setTimeout(() => {
    button.innerHTML = originalContent;
    button.disabled = false;
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
const closingSection = document.querySelector(".closing-statement");
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
  [contactSection, closingSection, footerSection].filter(Boolean).forEach((section) => observer.observe(section));
}
