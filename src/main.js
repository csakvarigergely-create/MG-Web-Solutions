const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector("[data-nav-links]");
const form = document.querySelector(".contact-form");

toggle?.addEventListener("click", () => {
  const isOpen = links?.classList.toggle("is-open") || false;
  toggle.setAttribute("aria-expanded", String(isOpen));
});

links?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    links.classList.remove("is-open