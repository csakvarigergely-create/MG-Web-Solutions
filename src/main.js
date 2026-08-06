const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector("[data-nav-links]");
const form = document.querySelector(".contact-form");

// Content refinements are applied here so the current visual system stays intact.
const heroLead = document.querySelector(".hero-lead");
if (heroLead) {
  heroLead.textContent = "Mobilbarát landing oldalakat készítek magyar szolgáltatóknak, ajánlatkérő rendszerrel és automatizált érdeklődőkezeléssel — hogy több megkeresést kapj, kevesebb kézi munkával.";
}

const problemSection = document.querySelector(".problem-section");
problemSection?.remove();

const solutionEyebrow = document.querySelector(".solution-section .eyebrow");
const solutionTitle = document.querySelector(".solution-section h2");
const solutionIntro = document.querySelector(".solution-section .section-heading.compact > p:last-child");
if (solutionEyebrow) solutionEyebrow.textContent = "Mit kapsz?";
if (solutionTitle) solutionTitle.textContent = "Egy oldal, amely nemcsak bemutat, hanem megkereséshez vezet.";
if (solutionIntro) {
  solutionIntro.textContent = "A világos ajánlat, az egyszerű kapcsolatfelvétel és a később beköthető automatizáció egyetlen átlátható rendszerként készül el.";
}

const processTitle = document.querySelector(".process-section h2");
if (processTitle) processTitle.textContent = "Így készül el az oldal az első egyeztetéstől az indulásig.";

const processItems = document.querySelectorAll(".process-list li p");
const processTexts = [
  "Megismerem a szolgáltatásodat, a célközönségedet és azt, milyen megkereséseket szeretnél kapni.",
  "Közösen pontosítjuk az ajánlatot, a fő üzeneteket és a szükséges bizalomépítő elemeket.",
  "Elkészítem a gyors, mobilbarát és könnyen átlátható landing oldalt.",
  "A kiválasztott funkciók elkészülnek, az automatizációk pedig a végső technikai fázisban kerülnek bekötésre."
];
processItems.forEach((item, index) => {
  if (processTexts[index]) item.textContent = processTexts[index];
});

// Stronger demo presentation: business goal, key functions and a viewing cue.
const demosHeading = document.querySelector(".demos-section .section-heading");
if (demosHeading) {
  const title = demosHeading.querySelector("h2");
  const text = demosHeading.querySelector("p:last-child");
  if (title) title.textContent = "Két működő minta arra, hogyan lesz egy szolgáltatásból világos online ajánlat.";
  if (text) text.textContent = "Nem sablonképeket mutatok: nyisd meg a teljes oldalakat, próbáld ki mobilon is, és nézd meg az ajánlatkérés útját.";
}

const demoCards = document.querySelectorAll(".demo-card");
const demoContent = [
  {
    label: "Helyi szolgáltató · ajánlatkérés",
    title: "Klímás landing oldal",
    text: "Helyi klímás vállalkozásnak tervezett oldal, amely gyorsan bemutatja az ajánlatot, csökkenti a bizonytalanságot és ajánlatkéréshez vezeti a látogatót.",
    chips: ["Mobilra optimalizált", "Rövid ajánlatkérés", "Automatizációra kész"],
    cue: "Ezt figyeld: mennyire gyorsan eljutsz az ajánlatkérésig."
  },
  {
    label: "Egészségügy · bizalom és időpontkérés",
    title: "Fogászati landing oldal",
    text: "Prémium fogászati oldal bizalomépítő tartalommal, jól elkülönített szolgáltatásokkal és egyértelmű időpontkérési útvonallal.",
    chips: ["Bizalomépítő felépítés", "Időpontkérés", "Chatbotra kész"],
    cue: "Ezt figyeld: hogyan épül fel a bizalom a kapcsolatfelvétel előtt."
  }
];

demoCards.forEach((card, index) => {
  const data = demoContent[index];
  if (!data) return;
  const label = card.querySelector(".demo-label");
  const title = card.querySelector("h3");
  const text = card.querySelector(".demo-copy p");
  const chips = card.querySelector(".demo-chips");
  if (label) label.textContent = data.label;
  if (title) title.textContent = data.title;
  if (text) text.textContent = data.text;
  if (chips) chips.innerHTML = data.chips.map((chip) => `<span>${chip}</span>`).join("");
  if (!card.querySelector(".demo-view-cue")) {
    const cue = document.createElement("p");
    cue.className = "demo-view-cue";
    cue.textContent = data.cue;
    card.querySelector(".demo-copy")?.append(cue);
  }
});

// Pricing clarity and risk reduction.
const pricingHeading = document.querySelector(".pricing-section .section-heading");
if (pricingHeading) {
  const title = pricingHeading.querySelector("h2");
  const text = pricingHeading.querySelector("p:last-child");
  if (title) title.textContent = "Válaszd ki, milyen rendszerre van szükséged — a pontos tartalmat egyeztetés után rögzítjük.";
  if (text) text.textContent = "Az árak irányárak, nem rejtett belépőárak. A projekt kezdete előtt írásban rögzítjük a feladatokat, a projektárat és a következő lépéseket.";
}

const recommendedBadge = document.querySelector(".price-card.recommended .badge");
if (recommendedBadge) recommendedBadge.textContent = "A legtöbb szolgáltatónak ezt ajánlom";

const priceCards = document.querySelectorAll(".price-card");
const packageNotes = [
  ["1 egyeztetett módosítási kör", "Mobilos és asztali ellenőrzés", "Átadás előtti technikai teszt"],
  ["2 egyeztetett módosítási kör", "Űrlapfolyamat és e-mailek tesztelése", "Rövid használati átadás"],
  ["2 egyeztetett módosítási kör", "Chatbot-tartalom közös pontosítása", "Teljes folyamat átadás előtti tesztelése"]
];

priceCards.forEach((card, index) => {
  const button = card.querySelector(".price-cta");
  if (button) button.textContent = "Kérek egy ingyenes konzultációt";
  if (!card.querySelector(".package-assurance")) {
    const assurance = document.createElement("div");
    assurance.className = "package-assurance";
    assurance.innerHTML = `<strong>A kivitelezés része</strong><ul>${packageNotes[index].map((note) => `<li>${note}</li>`).join("")}</ul>`;
    button?.before(assurance);
  }
});

if (pricingHeading && !document.querySelector(".project-safety-strip")) {
  const safetyStrip = document.createElement("div");
  safetyStrip.className = "project-safety-strip";
  safetyStrip.innerHTML = `
    <div><strong>Előre egyeztetett projektár</strong><span>A munka indulása előtt pontosítjuk, mi kerül bele.</span></div>
    <div><strong>Átlátható munkafolyamat</strong><span>Mindig tudod, mi készült el és mi következik.</span></div>
    <div><strong>Átadás előtti tesztelés</strong><span>Mobilon és asztali nézetben is ellenőrzöm az oldalt.</span></div>
    <div><strong>Érthető átadás</strong><span>Megmutatom, hogyan működik az elkészült rendszer.</span></div>`;
  pricingHeading.insertAdjacentElement("afterend", safetyStrip);
}

// Keep calls-to-action consistent. Demo links remain action-specific.
const primaryCtas = [
  document.querySelector(".nav-links .button-small"),
  document.querySelector(".hero-actions .button:not(.button-secondary)"),
  document.querySelector(".founder-cta"),
  document.querySelector(".mobile-cta span:first-child"),
  document.querySelector(".contact-form button")
];
primaryCtas.forEach((cta) => {
  if (cta) cta.textContent = "Kérek egy ingyenes konzultációt";
});

const contactTitle = document.querySelector(".contact-section h2");
const contactLead = document.querySelector(".contact-copy > p:not(.eyebrow)");
if (contactTitle) contactTitle.textContent = "Beszéljük át, milyen oldal segítené a vállalkozásodat";
if (contactLead) contactLead.textContent = "Írd le röviden a szolgáltatásodat és a célodat. A végleges kapcsolatfelvételi rendszer az automatizációs fázisban kerül bekötésre.";

const formFootnote = document.querySelector(".form-footnote");
if (formFootnote) {
  formFootnote.textContent = "Az ajánlatkérő űrlap technikai bekötése az oldal végső élesítése előtt készül el.";
}

const footerEmail = document.querySelector(".site-footer a[href^='mailto:']");
if (footerEmail) {
  footerEmail.removeAttribute("href");
  footerEmail.textContent = "Kapcsolati adatok hamarosan";
}

const founderPortrait = document.querySelector(".founder-portrait");
if (founderPortrait) {
  founderPortrait.setAttribute("aria-label", "Az MG Web Solutions alapítójának portréja a végső frissítésben kerül ide");
}

// Component-level styling for the new conversion content.
if (!document.querySelector("#sales-content-styles")) {
  const style = document.createElement("style");
  style.id = "sales-content-styles";
  style.textContent = `
    .demo-view-cue { margin: 16px 0 0; border-left: 3px solid var(--violet); padding-left: 12px; color: var(--heading); font-size: .86rem; font-weight: 700; line-height: 1.5; }
    .project-safety-strip { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 30px 0 28px; }
    .project-safety-strip > div { display: grid; gap: 6px; border: 1px solid var(--line); border-radius: 16px; padding: 18px; background: rgba(255,255,255,.78); box-shadow: 0 12px 30px rgba(24,35,63,.05); }
    .project-safety-strip strong { color: var(--heading); font-size: .9rem; }
    .project-safety-strip span { color: var(--muted); font-size: .78rem; line-height: 1.5; }
    .package-assurance { margin: 20px 0; border-top: 1px solid var(--line); padding-top: 18px; }
    .package-assurance strong { display: block; margin-bottom: 10px; color: var(--heading); font-size: .82rem; }
    .package-assurance ul { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; }
    .package-assurance li { position: relative; padding-left: 20px; color: var(--muted); font-size: .78rem; line-height: 1.45; }
    .package-assurance li::before { position: absolute; left: 0; color: var(--teal); content: "✓"; font-weight: 900; }
    @media (max-width: 900px) { .project-safety-strip { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 580px) { .project-safety-strip { grid-template-columns: 1fr; } .project-safety-strip > div { padding: 16px; } }
  `;
  document.head.append(style);
}

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

  button.textContent = "Az űrlap bekötése hamarosan készül";
  button.disabled = true;
  window.setTimeout(() => {
    button.textContent = "Kérek egy ingyenes konzultációt";
    button.disabled = false;
  }, 2600);
});

const mobileCta = document.querySelector(".mobile-cta");
const contactSection = document.querySelector("#kapcsolat");

if (mobileCta && contactSection && "IntersectionObserver" in window) {
  const contactObserver = new IntersectionObserver(
    ([entry]) => {
      mobileCta.classList.toggle("is-hidden", entry.isIntersecting);
    },
    { threshold: 0.12 }
  );

  contactObserver.observe(contactSection);
}

const chatDemo = document.querySelector("[data-chat-demo]");
const chatStage = document.querySelector("[data-chat-stage]");
const chatProgress = document.querySelector("[data-chat-progress]");
const chatControl = document.querySelector("[data-chat-control]");

if (chatDemo && chatStage && chatProgress) {
  const scenes = [
    {
      duration: 3200,
      html: `<div class="chat-scene">
        <div class="chat-bubble-ai">Szia! Megmutassam, hogyan hoz érdeklődőket egy modern landing oldal?</div>
        <div class="quick-replies"><span class="is-selected">Igen, mutasd</span><span>Hogyan működik?</span><span>Érdekel</span></div>
      </div>`
    },
    {
      duration: 5000,
      html: `<div class="chat-scene form-scene">
        <div class="chat-bubble-ai compact">Először a látogató kitölti az ajánlatkérő űrlapot.</div>
        <div class="demo-form">
          <div><span>Név</span><strong class="type-value" style="--delay:.12s">Kiss Péter</strong></div>
          <div><span>E-mail</span><strong class="type-value" style="--delay:.34s">peter@ceg.hu</strong></div>
          <div><span>Telefon</span><strong class="type-value" style="--delay:.56s">+36 30 123 4567</strong></div>
          <div><span>Szolgáltatás</span><strong class="type-value" style="--delay:.78s">Klímaszerelés</strong></div>
          <button type="button" tabindex="-1">Küldés <span>→</span></button>
        </div>
      </div>`
    },
    {
      duration: 3600,
      html: `<div class="chat-scene">
        <div class="chat-bubble-ai compact">Az adat azonnal bekerül a rendszerbe.</div>
        <div class="automation-checks">
          <div style="--delay:.1s"><span>✓</span><strong>Űrlap elküldve</strong></div>
          <div style="--delay:.36s"><span>✓</span><strong>Lead mentve</strong></div>
          <div style="--delay:.62s"><span>✓</span><strong>Értesítés elküldve</strong></div>
        </div>
      </div>`
    },
    {
      duration: 3600,
      html: `<div class="chat-scene">
        <div class="chat-bubble-ai compact">Automatikus visszaigazoló e-mail megy az érdeklődőnek.</div>
        <div class="email-demo-card">
          <div><span class="email-icon">✉</span><div><small>Automatikus e-mail</small><strong>Köszönjük az érdeklődést</strong></div><i>Elküldve</i></div>
          <p>Hamarosan felvesszük veled a kapcsolatot.</p>
          <small>MG Web Solutions</small>
        </div>
      </div>`
    },
    {
      duration: 4200,
      html: `<div class="chat-scene qa-scene">
        <div class="chat-bubble-ai compact">Közben a chatbot azonnal válaszol a gyakori kérdésekre is.</div>
        <div class="chat-bubble-user">Mennyi idő alatt készül el?</div>
        <div class="chat-bubble-ai reply">A pontos időtartam a funkcióktól függ, de előre egyeztetett ütemezéssel dolgozom.</div>
        <div class="chat-bubble-user second">Van automatizáció is?</div>
        <div class="chat-bubble-ai reply second">Igen — űrlap, e-mail és AI chatbot egyben.</div>
      </div>`
    },
    {
      duration: 3600,
      html: `<div class="chat-scene cta-scene">
        <span class="result-pill">Landing oldal + automatizáció + AI</span>
        <div class="chat-bubble-ai">Szeretnél egy ilyen rendszert a vállalkozásodnak?</div>
        <div class="chat-demo-actions"><a href="#kapcsolat">Kérek egy ingyenes konzultációt</a><a href="#demok">Megnézem a demókat</a></div>
      </div>`
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

  const showScene = () => {
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
  };

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduceMotion.matches) {
    sceneIndex = scenes.length - 1;
    chatStage.innerHTML = scenes[sceneIndex].html;
    chatStage.classList.add("is-visible");
    chatProgress.style.width = "100%";
  } else {
    showScene();
    chatDemo.addEventListener("mouseenter", pauseDemo);
    chatDemo.addEventListener("mouseleave", resumeDemo);
    if (chatControl) {
      chatControl.addEventListener("click", () => {
        if (isPaused) resumeDemo();
        else pauseDemo();
      });
    }
    document.addEventListener("visibilitychange", () => {
      window.clearTimeout(timer);
      if (!document.hidden && !isPaused) showScene();
    });
  }
}
