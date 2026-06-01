const WHATSAPP_CONTACTS = {

  everton: { name: "Everton", number: "558588692112" },

  rodrigo: { name: "Rodrigo", number: "558591493869" },

};



const DEFAULT_WA_MSG = "Olá! Vim pelo site e quero falar sobre os produtos.";



function waLink(msg, number) {

  return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;

}



const waModal = document.getElementById("wa-modal");

let waModalMessage = DEFAULT_WA_MSG;



function openWaModal(message) {

  if (!waModal) return;

  waModalMessage = message || DEFAULT_WA_MSG;

  waModal.hidden = false;

  waModal.setAttribute("aria-hidden", "false");

  document.body.classList.add("wa-modal-open");

  const firstOption = waModal.querySelector(".wa-modal-option");

  if (firstOption) firstOption.focus();

}



function closeWaModal() {

  if (!waModal) return;

  waModal.hidden = true;

  waModal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("wa-modal-open");

}



document.querySelectorAll("[data-wa]").forEach((el) => {

  el.addEventListener("click", (e) => {

    e.preventDefault();

    const msg = el.getAttribute("data-wa") || DEFAULT_WA_MSG;

    openWaModal(msg);

  });

});



if (waModal) {

  waModal.querySelectorAll("[data-wa-close]").forEach((el) => {

    el.addEventListener("click", closeWaModal);

  });



  waModal.querySelectorAll(".wa-modal-option").forEach((option) => {

    option.addEventListener("click", (e) => {

      e.preventDefault();

      const number = option.getAttribute("data-wa-number");

      if (!number) return;

      window.open(waLink(waModalMessage, number), "_blank", "noopener,noreferrer");

      closeWaModal();

    });

  });



  document.addEventListener("keydown", (e) => {

    if (e.key === "Escape" && !waModal.hidden) closeWaModal();

  });

}



const yearEl = document.getElementById("footer-year");

if (yearEl) yearEl.textContent = String(new Date().getFullYear());



const faqRoot = document.getElementById("faq-list");

if (faqRoot) {

  const items = faqRoot.querySelectorAll(".faq-item");

  items.forEach((item, index) => {

    const btn = item.querySelector(".faq-trigger");

    if (!btn) return;

    btn.addEventListener("click", () => {

      const isOpen = item.classList.contains("is-open");

      items.forEach((i) => i.classList.remove("is-open"));

      if (!isOpen) item.classList.add("is-open");

    });

    if (index === 0) item.classList.add("is-open");

  });

}



const waFloat = document.getElementById("wa-float");

if (waFloat) {

  setTimeout(() => waFloat.classList.add("is-visible"), 800);

}



const menuToggle = document.getElementById("menu-toggle");

const navMobile = document.getElementById("nav-mobile");

const navBackdrop = document.getElementById("nav-backdrop");



function setMenuOpen(open) {

  if (!menuToggle || !navMobile) return;



  navMobile.classList.toggle("is-open", open);

  menuToggle.classList.toggle("is-open", open);

  menuToggle.setAttribute("aria-expanded", open ? "true" : "false");

  menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");

  navMobile.setAttribute("aria-hidden", open ? "false" : "true");

  document.body.classList.toggle("menu-open", open);



  if (navBackdrop) {

    navBackdrop.classList.toggle("is-visible", open);

    navBackdrop.hidden = !open;

    navBackdrop.tabIndex = open ? 0 : -1;

  }

}



if (menuToggle && navMobile) {

  menuToggle.addEventListener("click", () => {

    setMenuOpen(!navMobile.classList.contains("is-open"));

  });



  navMobile.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => setMenuOpen(false));

  });



  if (navBackdrop) {

    navBackdrop.addEventListener("click", () => setMenuOpen(false));

  }



  document.addEventListener("keydown", (e) => {

    if (e.key === "Escape" && navMobile.classList.contains("is-open")) {

      setMenuOpen(false);

    }

  });

}



const kitsRoot = document.getElementById("kits");

if (kitsRoot) {

  const kitTabs = kitsRoot.querySelectorAll("[data-kit-tab]");

  const kitPanels = kitsRoot.querySelectorAll("[data-kit-panel]");



  kitTabs.forEach((tab) => {

    tab.addEventListener("click", () => {

      const target = tab.getAttribute("data-kit-tab");

      if (!target) return;



      kitTabs.forEach((t) => {

        const active = t === tab;

        t.classList.toggle("is-active", active);

        t.setAttribute("aria-selected", active ? "true" : "false");

        t.tabIndex = active ? 0 : -1;

      });



      kitPanels.forEach((panel) => {

        const active = panel.getAttribute("data-kit-panel") === target;

        panel.classList.toggle("is-active", active);

        panel.hidden = !active;

      });

    });

  });

}

const partnersMarquee = document.getElementById("partners-marquee");

if (partnersMarquee) {
  const viewport = partnersMarquee.querySelector(".partners-marquee-viewport");
  const logos = partnersMarquee.querySelectorAll(".partners-logo");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function updatePartnerSpotlight() {
    if (!viewport || !logos.length) return;

    const vp = viewport.getBoundingClientRect();
    const centerX = vp.left + vp.width / 2;
    const falloff = vp.width * 0.36;

    logos.forEach((logo) => {
      const rect = logo.getBoundingClientRect();
      const logoX = rect.left + rect.width / 2;
      const dist = Math.abs(logoX - centerX);
      const t = Math.min(dist / falloff, 1);
      const ease = t * t;

      const opacity = 0.5 + (1 - ease) * 0.5;
      const grayscale = ease * 100;
      const brightness = 0.8 + (1 - ease) * 0.35;
      const saturate = 0.45 + (1 - ease) * 0.95;

      logo.style.opacity = String(opacity);
      logo.style.filter = `grayscale(${grayscale}%) brightness(${brightness}) saturate(${saturate})`;
    });
  }

  if (prefersReducedMotion) {
    updatePartnerSpotlight();
    window.addEventListener("resize", updatePartnerSpotlight);
  } else {
    const loop = () => {
      updatePartnerSpotlight();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
}

