const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector("[data-nav-links]");
const form = document.querySelector(".contact-form");

toggle?.addEventListener("click", () => {
  const isOpen = links?.classList.toggle("is-open") || false;
  toggle.setAttribute("aria-expanded", String(isOpen));
});

links?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    links.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
  }
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const button = form.querySelector("button");
  if (!button) return;

  button.textContent = "Köszönjük, az űrlap UI működik";
  button.disabled = true;
  window.setTimeout(() => {
    button.textContent = "Ajánlatot kérek";
    button.disabled = false;
  }, 2600);
});
