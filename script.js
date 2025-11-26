// Theme toggle (persist in localStorage)
const themeBtn = document.getElementById("themeBtn");
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
} else {
  document.documentElement.setAttribute("data-theme", "dark");
}
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme");
    const next = cur === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
}

// Mobile menu toggle (class-based + accessibility)
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
if (menuBtn && mobileMenu) {
  // initialize attributes
  const initialOpen = mobileMenu.classList.contains("open");
  mobileMenu.setAttribute("aria-hidden", initialOpen ? "false" : "true");
  menuBtn.setAttribute("aria-expanded", initialOpen ? "true" : "false");

  menuBtn.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    mobileMenu.setAttribute("aria-hidden", isOpen ? "false" : "true");
    menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close mobile menu when a link is clicked (better UX on small screens)
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      mobileMenu.setAttribute("aria-hidden", "true");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

// Dynamic year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Animate skill bars on scroll
const bars = document.querySelectorAll(".bar > span");
const onScroll = () => {
  bars.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.style.width = getComputedStyle(el).getPropertyValue("--w");
    }
  });
};
window.addEventListener("scroll", onScroll);
window.addEventListener("load", onScroll);

// Projects filter
const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll(".project");
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const tag = btn.getAttribute("data-filter");
    projectCards.forEach((card) => {
      const tags = card.getAttribute("data-tags");
      const show = tag === "all" || (tags && tags.includes(tag));
      card.style.display = show ? "block" : "none";
    });
  });
});

// Modal openers
document.querySelectorAll("[data-modal]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.getAttribute("data-modal");
    const dlg = document.getElementById(id);
    if (dlg && typeof dlg.showModal === "function") dlg.showModal();
  });
});

// Close modal with ESC for accessibility
["project1", "project2", "project3"].forEach((id) => {
  const dlg = document.getElementById(id);
  if (!dlg) return;
  dlg.addEventListener("keydown", (e) => {
    if (e.key === "Escape") dlg.close();
  });
});

// Simple contact form handler (no backend)
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    console.log("Form submit", data);
    if (statusEl)
      statusEl.textContent = "Thanks! I will get back to you shortly.";
    form.reset();
  });
}
