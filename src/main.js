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
          <p>Hamarosan felvesszük Önnel a kapcsolatot.</p>
          <small>MG Web Solutions</small>
        </div>
      </div>`
    },
    {
      duration: 4200,
      html: `<div class="chat-scene qa-scene">
        <div class="chat-bubble-ai compact">Közben a chatbot azonnal válaszol a gyakori kérdésekre is.</div>
        <div class="chat-bubble-user">Mennyi idő alatt készül el?</div>
        <div class="chat-bubble-ai reply">Akár 3–5 munkanap alatt.</div>
        <div class="chat-bubble-user second">Van automatizáció is?</div>
        <div class="chat-bubble-ai reply second">Igen — űrlap, e-mail és AI chatbot egyben.</div>
      </div>`
    },
    {
      duration: 3600,
      html: `<div class="chat-scene cta-scene">
        <span class="result-pill">Landing oldal + automatizáció + AI</span>
        <div class="chat-bubble-ai">Szeretnél egy ilyen rendszert a vállalkozásodnak?</div>
        <div class="chat-demo-actions"><a href="#kapcsolat">Ajánlatot kérek</a><a href="#demok">Megnézem a demókat</a></div>
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
