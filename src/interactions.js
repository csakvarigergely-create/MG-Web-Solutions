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

document.querySelectorAll('.footer-links a[aria-disabled="true"]').forEach((link) => {
  link.addEventListener("click", (event) => event.preventDefault());
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

const chatDemo = document.querySelector("[data-chat-demo]");
const chatStage = document.querySelector("[data-chat-stage]");
const chatProgress = document.querySelector("[data-chat-progress]");
const chatControl = document.querySelector("[data-chat-control]");

if (chatDemo && chatStage && chatProgress) {
  const scenes = [
    {
      duration: 3200,
      html: `<div class="chat-scene"><div class="chat-bubble-ai">Szia! Megmutassam, hogyan hoz érdeklődőket egy modern landing oldal?</div><div class="quick-replies"><span class="is-selected">Igen, mutasd</span><span>Hogyan működik?</span><span>Érdekel</span></div></div>`
    },
    {
      duration: 5000,
      html: `<div class="chat-scene form-scene"><div class="chat-bubble-ai compact">Először a látogató kitölti az ajánlatkérő űrlapot.</div><div class="demo-form"><div><span>Név</span><strong class="type-value" style="--delay:.12s">Kiss Péter</strong></div><div><span>E-mail</span><strong class="type-value" style="--delay:.34s">peter@ceg.hu</strong></div><div><span>Telefon</span><strong class="type-value" style="--delay:.56s">+36 30 123 4567</strong></div><div><span>Szolgáltatás</span><strong class="type-value" style="--delay:.78s">Klímaszerelés</strong></div><button type="button" tabindex="-1">Küldés <span>→</span></button></div></div>`
    },
    {
      duration: 3600,
      html: `<div class="chat-scene"><div class="chat-bubble-ai compact">Az adat azonnal bekerül a rendszerbe.</div><div class="automation-checks"><div style="--delay:.1s"><span>✓</span><strong>Űrlap elküldve</strong></div><div style="--delay:.36s"><span>✓</span><strong>Lead mentve</strong></div><div style="--delay:.62s"><span>✓</span><strong>Értesítés elküldve</strong></div></div></div>`
    },
    {
      duration: 3600,
      html: `<div class="chat-scene"><div class="chat-bubble-ai compact">Automatikus visszaigazoló e-mail megy az érdeklődőnek.</div><div class="email-demo-card"><div><span class="email-icon">✉</span><div><small>Automatikus e-mail</small><strong>Köszönöm az érdeklődést</strong></div><i>Elküldve</i></div><p>Hamarosan felveszem veled a kapcsolatot.</p><small>MG Web Solutions</small></div></div>`
    },
    {
      duration: 4200,
      html: `<div class="chat-scene qa-scene"><div class="chat-bubble-ai compact">Közben a chatbot azonnal válaszol a gyakori kérdésekre is.</div><div class="chat-bubble-user">Mennyi idő alatt készül el?</div><div class="chat-bubble-ai reply">A legtöbb landing oldal 7–10 munkanap alatt készül el.</div><div class="chat-bubble-user second">Van automatizáció is?</div><div class="chat-bubble-ai reply second">Igen — űrlap, e-mail és chatbot is kérhető.</div></div>`
    },
    {
      duration: 3600,
      html: `<div class="chat-scene cta-scene"><span class="result-pill">Landing oldal + automatizáció + AI</span><div class="chat-bubble-ai">Szeretnél egy ilyen rendszert a vállalkozásodnak?</div><div class="chat-demo-actions"><a href="#kapcsolat">Ingyenes konzultáció</a><a href="#demok">Megnézem a demókat</a></div></div>`
    }
  ];

  let sceneIndex = 0;
  let timer;
  let sceneStartedAt = 0;
  let remaining = scenes[0].duration;
  let isPaused = false;

  const setControlState = () => {
    if (!chatControl) return;
    chatControl.textContent = isPaused ? "Folytatás" : "Szünet";
    chatControl.setAttribute("aria-label", isPaused ? "Animáció folytatása" : "Animáció megállítása");
  };

  const scheduleNext = (delay) => {
    remaining = delay;
    sceneStartedAt = Date.now();
    timer = window.setTimeout(() => {
      sceneIndex = (sceneIndex + 1) % scenes.length;
      showScene();
    }, delay);
  };

  const pauseDemo = () => {
    if (isPaused) return;
    isPaused = true;
    window.clearTimeout(timer);
    remaining = Math.max(250, remaining - (Date.now() - sceneStartedAt));
    chatProgress.style.animationPlayState = "paused";
    setControlState();
  };

  const resumeDemo = () => {
    if (!isPaused) return;
    isPaused = false;
    chatProgress.style.animationPlayState = "running";
    scheduleNext(remaining);
    setControlState();
  };

  function showScene() {
    const scene = scenes[sceneIndex];
    chatStage.classList.remove("is-visible");
    window.setTimeout(() => {
      chatStage.innerHTML = scene.html;
      chatStage.classList.add("is-visible");
      chatProgress.style.animation = "none";
      void chatProgress.offsetWidth;
      chatProgress.style.animation = `chatProgress ${scene.duration}ms linear forwards`;
      scheduleNext(scene.duration);
    }, 140);
  }

  if (reducedMotion.matches) {
    sceneIndex = scenes.length - 1;
    chatStage.innerHTML = scenes[sceneIndex].html;
    chatStage.classList.add("is-visible");
    chatProgress.style.width = "100%";
  } else {
    showScene();
    chatDemo.addEventListener("mouseenter", pauseDemo);
    chatDemo.addEventListener("mouseleave", resumeDemo);
    chatControl?.addEventListener("click", () => (isPaused ? resumeDemo() : pauseDemo()));
    document.addEventListener("visibilitychange", () => {
      window.clearTimeout(timer);
      if (!document.hidden && !isPaused) showScene();
    });
  }
}
