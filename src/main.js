const polishStyles = document.createElement("link");
polishStyles.rel = "stylesheet";
polishStyles.href = "src/mobile-polish.css";
document.head.append(polishStyles);

import("./main-original.js")
  .then(() => {
    // The original service section is removed by the content pass, so point
    // the navigation to the surviving solution section instead.
    const solutionSection = document.querySelector(".solution-section");
    if (solutionSection) solutionSection.id = "szolgaltatas";

    const serviceLink = document.querySelector('.nav-links a[href="#szolgaltatas"]');
    if (serviceLink) serviceLink.setAttribute("aria-label", "Ugrás a szolgáltatás bemutatásához");

    // Compact labels prevent wrapping in the sticky header and mobile bar.
    const navCta = document.querySelector(".nav-links .button-small");
    if (navCta) navCta.textContent = "Ingyenes konzultáció";

    const mobileCta = document.querySelector(".mobile-cta span:first-child");
    if (mobileCta) mobileCta.textContent = "Ingyenes konzultáció";

    // Legal pages are placeholders until the final business details are added.
    document.querySelectorAll('.footer-links a[href="#"]').forEach((link) => {
      link.setAttribute("aria-disabled", "true");
      link.setAttribute("tabindex", "-1");
      link.addEventListener("click", (event) => event.preventDefault());
    });
  })
  .catch((error) => {
    console.error("Az oldal interaktív elemei nem töltődtek be:", error);
    document.documentElement.classList.add("script-load-error");
  });
