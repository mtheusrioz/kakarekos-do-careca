const WHATSAPP_NUMBERS = {
  primary: "558588692112",
  secondary: "558591493869",
};

const DEFAULT_WA_MSG = "Olá! Vim pelo site e quero falar sobre os produtos.";

function waLink(msg, number = WHATSAPP_NUMBERS.primary) {
  return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
}

document.querySelectorAll("[data-wa]").forEach((el) => {
  const msg = el.getAttribute("data-wa") || DEFAULT_WA_MSG;
  const number = el.getAttribute("data-wa-number") || WHATSAPP_NUMBERS.primary;
  el.href = waLink(msg, number);
});

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
