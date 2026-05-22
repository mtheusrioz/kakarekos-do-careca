const WHATSAPP_NUMBER = "5511999999999";

function waLink(msg) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

document.querySelectorAll("[data-wa]").forEach((el) => {
  const msg = el.getAttribute("data-wa");
  if (msg) el.href = waLink(msg);
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
