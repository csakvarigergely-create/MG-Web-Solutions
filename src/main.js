const polishStyles = document.createElement("link");
polishStyles.rel = "stylesheet";
polishStyles.href = "src/mobile-polish.css";
document.head.append(polishStyles);

import("./main-original.js")
  .then(() => {
    const solutionSection = document.querySelector(".solution-section");
    if (solutionSection) solutionSection.id = "szolgaltatas";

    const serviceLink = document.querySelector('.nav-links a[href="#szolgaltatas"]');
    if (serviceLink) serviceLink.setAttribute("aria-label", "Ugrás a szolgáltatás bemutatásához");

    const navCta = document.querySelector(".nav-links .button-small");
    if (navCta) navCta.textContent = "Ingyenes konzultáció";

    const mobileCta = document.querySelector(".mobile-cta span:first-child");
    if (mobileCta) mobileCta.textContent = "Ingyenes konzultáció";

    // Honest launch offer while the first client references are being built.
    const pricingSection = document.querySelector(".pricing-section");
    if (pricingSection && !document.querySelector(".launch-offer")) {
      const launchOffer = document.createElement("div");
      launchOffer.className = "container launch-offer";
      launchOffer.innerHTML = `
        <div class="launch-offer-copy">
          <p class="eyebrow">Induló partnerprogram</p>
          <h3>Az első 3 együttműködés kedvezményes bevezető feltételekkel indul.</h3>
          <p>Ugyanazt a teljes kivitelezési folyamatot kapod: egyeztetés, egyedi felépítés, mobilos ellenőrzés, módosítási körök és átadás előtti tesztelés. Cserébe az elkészült projektet — előzetes jóváhagyásoddal — referenciaként bemutathatom.</p>
        </div>
        <a class="button button-secondary" href="#kapcsolat">Érdekel a partnerprogram</a>`;
      pricingSection.querySelector(".container")?.append(launchOffer);
    }

    // Shared commercial terms, without inventing project-specific promises.
    const pricingGrid = document.querySelector(".pricing-grid");
    if (pricingGrid && !document.querySelector(".package-terms")) {
      const terms = document.createElement("div");
      terms.className = "package-terms";
      terms.innerHTML = `
        <div><strong>Projektidő</strong><span>A legtöbb landing oldal 7–10 munkanap alatt készül el a szükséges anyagok beérkezésétől számítva. Összetettebb funkcióknál külön ütemezés készül.</span></div>
        <div><strong>Szöveg és tartalom</strong><span>A meglévő anyagaidból közösen pontosítjuk a fő üzeneteket. Teljes szövegírás vagy nagyobb tartalomkészítés külön tétel lehet.</span></div>
        <div><strong>Domain és tárhely</strong><span>A domain és a tárhely díja nem része az egyszeri projektárnak. A technikai beállításban és az élesítésben segítséget kapsz.</span></div>
        <div><strong>Fizetés és többletmunka</strong><span>A fizetési ütemezést, a pontos feladatokat és az esetleges extra igények díját a munka kezdete előtt írásban rögzítjük.</span></div>`;
      pricingGrid.insertAdjacentElement("afterend", terms);
    }

    // FAQ closes the most common objections before the contact section.
    const contactSection = document.querySelector(".contact-section");
    if (contactSection && !document.querySelector(".faq-section")) {
      const faq = document.createElement("section");
      faq.className = "section faq-section";
      faq.id = "gyik";
      faq.innerHTML = `
        <div class="container faq-shell">
          <div class="section-heading compact">
            <p class="eyebrow">Gyakori kérdések</p>
            <h2>A legfontosabb részletek az indulás előtt</h2>
            <p>Az egyedi igényeket az első egyeztetésen pontosítjuk, de ezekre a kérdésekre már előre érdemes választ kapnod.</p>
          </div>
          <div class="faq-list">
            <details open><summary>Mennyi idő alatt készül el az oldal?</summary><p>Egy átlagos landing oldal általában 7–10 munkanap alatt készül el attól kezdve, hogy minden szükséges információ és anyag rendelkezésre áll. Összetettebb automatizáció vagy chatbot esetén külön ütemezést kapsz.</p></details>
            <details><summary>Mi kell az induláshoz?</summary><p>A szolgáltatásod rövid leírása, a célközönséged, az ajánlatod, a kapcsolati folyamat és minden meglévő arculati vagy tartalmi anyag. Ami még nincs kész, azt az egyeztetésen közösen rendszerezzük.</p></details>
            <details><summary>Ki írja az oldal szövegét?</summary><p>A meglévő szövegeidet átdolgozom és landing oldalhoz igazítom. Teljes körű szövegírás, hosszabb szakmai tartalom vagy rendszeres tartalomgyártás külön feladatként árazható.</p></details>
            <details><summary>A domain és a tárhely benne van az árban?</summary><p>A domain és a tárhely folyamatos szolgáltatói díja nem része az egyszeri kivitelezési árnak. A megfelelő megoldás kiválasztásában, beállításában és az oldal élesítésében segítek.</p></details>
            <details><summary>Hány módosítási kör jár?</summary><p>A Landing Start csomag egy, a magasabb csomagok két egyeztetett módosítási kört tartalmaznak. Új funkciók vagy az elfogadott irány jelentős átalakítása külön egyeztetést igényel.</p></details>
            <details><summary>Mi történik az átadás után?</summary><p>Az oldal működését bemutatom, és az átadás előtt ellenőrzöm a fő nézeteket és funkciókat. Folyamatos karbantartás vagy későbbi fejlesztés külön megállapodással kérhető.</p></details>
          </div>
        </div>`;
      contactSection.before(faq);
    }

    // Keep language and claims consistent across surviving static content.
    document.querySelectorAll(".automation-visual .email-preview small").forEach((node) => {
      node.textContent = "Hamarosan jelentkezem.";
    });

    const footer = document.querySelector(".site-footer");
    if (footer && !footer.querySelector(".legal-status-note")) {
      const note = document.createElement("p");
      note.className = "legal-status-note";
      note.textContent = "Az Impresszum és az Adatkezelési tájékoztató a végleges vállalkozói és kapcsolati adatokkal kerül feltöltésre az élesítés előtt.";
      footer.querySelector(".container")?.append(note);
    }

    document.querySelectorAll('.footer-links a[href="#"]').forEach((link) => {
      link.setAttribute("aria-disabled", "true");
      link.setAttribute("tabindex", "-1");
      link.addEventListener("click", (event) => event.preventDefault());
    });

    if (!document.querySelector("#pre-automation-content-styles")) {
      const style = document.createElement("style");
      style.id = "pre-automation-content-styles";
      style.textContent = `
        .launch-offer { display:flex; align-items:center; justify-content:space-between; gap:32px; margin-top:34px; border:1px solid rgba(109,93,246,.22); border-radius:20px; padding:28px; background:linear-gradient(135deg,rgba(239,237,255,.9),rgba(255,255,255,.9)); box-shadow:0 18px 44px rgba(24,35,63,.08); }
        .launch-offer-copy { max-width:760px; }
        .launch-offer h3 { margin-bottom:10px; font-size:clamp(1.3rem,2.4vw,1.85rem); }
        .launch-offer p:last-child { margin:0; color:var(--muted); }
        .launch-offer .button { flex:0 0 auto; text-align:center; }
        .package-terms { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:14px; margin-top:26px; }
        .package-terms > div { display:grid; gap:7px; border:1px solid var(--line); border-radius:16px; padding:19px; background:rgba(255,255,255,.76); }
        .package-terms strong { color:var(--heading); font-size:.92rem; }
        .package-terms span { color:var(--muted); font-size:.8rem; line-height:1.55; }
        .faq-section { background:var(--bg-cool); }
        .faq-shell { display:grid; grid-template-columns:minmax(0,.78fr) minmax(0,1.22fr); gap:54px; align-items:start; }
        .faq-list { display:grid; gap:10px; }
        .faq-list details { border:1px solid var(--line); border-radius:14px; padding:0 18px; background:var(--surface); box-shadow:0 10px 28px rgba(24,35,63,.045); }
        .faq-list summary { position:relative; padding:18px 32px 18px 0; color:var(--heading); font-weight:800; cursor:pointer; list-style:none; }
        .faq-list summary::-webkit-details-marker { display:none; }
        .faq-list summary::after { position:absolute; top:50%; right:0; content:"+"; transform:translateY(-50%); color:var(--violet); font-size:1.35rem; }
        .faq-list details[open] summary::after { content:"–"; }
        .faq-list details p { margin:0; padding:0 0 18px; color:var(--muted); font-size:.9rem; line-height:1.65; }
        .legal-status-note { max-width:760px; margin:18px 0 0; color:rgba(255,255,255,.52); font-size:.72rem; line-height:1.5; }
        @media (max-width:900px) { .launch-offer { align-items:flex-start; flex-direction:column; } .faq-shell { grid-template-columns:1fr; gap:30px; } }
        @media (max-width:680px) { .launch-offer { padding:22px 18px; } .launch-offer .button { width:100%; } .package-terms { grid-template-columns:1fr; } .faq-list details { padding-inline:15px; } .faq-list summary { font-size:.92rem; } }
      `;
      document.head.append(style);
    }
  })
  .catch((error) => {
    console.error("Az oldal interaktív elemei nem töltődtek be:", error);
    document.documentElement.classList.add("script-load-error");
  });
