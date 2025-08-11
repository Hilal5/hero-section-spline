(function autoLiteMode() {
  const conn =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection;
  const saveData = !!conn?.saveData;
  const slowNet = /^(slow-2g|2g|3g)$/.test(conn?.effectiveType || "");
  const lowMem = navigator.deviceMemory && navigator.deviceMemory <= 4; // <=4GB

  if (saveData || slowNet || lowMem) {
    document.documentElement.setAttribute("data-lite", "1");
    // sekaligus nonaktifkan efek parallax
    if (typeof reduce !== "undefined") reduce = true;
  }
})();

const THEME_ORDER = ['dark', 'senja', 'light'];
const THEME_ICON = { dark: '🌙', senja: '🌆', light: '🌞' };

function setTheme(name){
  const root = document.documentElement;
  root.setAttribute('data-theme', name);
  localStorage.setItem('theme', name);
  if (themeBtn) {
    themeBtn.textContent = THEME_ICON[name] || '🌗';
    themeBtn.setAttribute('aria-label', `Ganti tema (saat ini: ${name})`);
    themeBtn.setAttribute('aria-pressed', String(name !== 'dark'));
  }
}

(function initTheme(){
  const saved = localStorage.getItem('theme');
  if (saved && THEME_ORDER.includes(saved)) {
    setTheme(saved);
  } else {
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    setTheme(prefersLight ? 'light' : 'dark');
  }
})();

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const idx = THEME_ORDER.indexOf(current);
    const next = THEME_ORDER[(idx + 1) % THEME_ORDER.length];
    setTheme(next);
  });
}

const wrap = document.getElementById("splineWrap");
const parallaxItems = [...document.querySelectorAll("[data-depth]")];
let reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function onMove(e) {
  if (reduce || !wrap) return;
  const r = wrap.getBoundingClientRect();
  const x = (e.clientX - (r.left + r.width / 2)) / r.width; // -0.5..0.5
  const y = (e.clientY - (r.top + r.height / 2)) / r.height;
  wrap.style.transform = `perspective(1000px) rotateX(${y * -3}deg) rotateY(${
    x * 4
  }deg)`;
  parallaxItems.forEach((el) => {
    const d = parseFloat(el.dataset.depth || "0");
    el.style.transform = `translate3d(${x * 100 * d}px, ${y * 80 * d}px, 0)`;
  });
}
if (wrap) {
  wrap.addEventListener("mousemove", onMove);
  wrap.addEventListener("mouseleave", () => {
    wrap.style.transform = "";
    parallaxItems.forEach((el) => (el.style.transform = ""));
  });
}

const btnReduce = document.getElementById("pauseMotion");
if (btnReduce) {
  btnReduce.addEventListener("click", () => {
    reduce = !reduce;
    btnReduce.textContent = reduce ? "Enable Motion" : "Reduce Motion";
    if (reduce && wrap) {
      wrap.style.transform = "";
      parallaxItems.forEach((el) => (el.style.transform = ""));
    }
  });
}

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("in");
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

const modal = document.getElementById("demoModal");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");

openModal?.addEventListener("click", () => modal?.showModal());
closeModal?.addEventListener("click", () => modal?.close());

modal?.addEventListener("keydown", (e) => {
  if (e.key === "Escape") modal.close();
});

function scrollToDemo() {
  const el = document.getElementById("work");
  el?.scrollIntoView({ behavior: "smooth" });
}
window.scrollToDemo = scrollToDemo;

const isCoarse = window.matchMedia("(pointer: coarse)").matches;
let touchIntensity = 0.55;

function onTouchMove(e) {
  if (reduce || !wrap) return;
  const t = e.touches && e.touches[0];
  if (!t) return;
  const r = wrap.getBoundingClientRect();
  const x = (t.clientX - (r.left + r.width / 2)) / r.width; // -0.5..0.5
  const y = (t.clientY - (r.top + r.height / 2)) / r.height;

  wrap.style.transform = `perspective(900px) rotateX(${
    y * -3 * touchIntensity
  }deg) rotateY(${x * 4 * touchIntensity}deg)`;
  parallaxItems.forEach((el) => {
    const d = parseFloat(el.dataset.depth || "0");
    el.style.transform = `translate3d(${x * 80 * d * touchIntensity}px, ${
      y * 60 * d * touchIntensity
    }px, 0)`;
  });
}

if (wrap && isCoarse) {
  wrap.addEventListener("touchmove", onTouchMove, { passive: true });
  wrap.addEventListener(
    "touchend",
    () => {
      wrap.style.transform = "";
      parallaxItems.forEach((el) => (el.style.transform = ""));
    },
    { passive: true }
  );
}
