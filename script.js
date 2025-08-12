const doc = document.documentElement;
const themeBtn = document.getElementById("themeBtn");

const wrap = document.getElementById("splineWrap");
const parallaxItems = [...document.querySelectorAll("[data-depth]")];
const btnReduce = document.getElementById("pauseMotion");

const frame = document.getElementById("splineFrame");
const playBtn = document.getElementById("play3d");

const modal = document.getElementById("demoModal");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const modalFrame = document.getElementById("splineModalFrame");

let reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isCoarse = window.matchMedia("(pointer: coarse)").matches;
const net =
  navigator.connection || navigator.mozConnection || navigator.webkitConnection;
const saveData = !!net?.saveData;
const slowNet = /^(slow-2g|2g|3g)$/.test(net?.effectiveType || "");

function loadIframe(el) {
  if (!el) return;
  const ds = el.getAttribute("data-src");
  if (ds && el.src !== ds) el.src = ds;
}
function unloadIframe(el) {
  if (!el) return;
  el.removeAttribute("src");
}

function applyReduceState() {
  doc.toggleAttribute("data-reduce", reduce);

  if (reduce && wrap) {
    wrap.style.transform = "";
    parallaxItems.forEach((el) => (el.style.transform = ""));
  }

  const alreadyLoaded = !!frame?.getAttribute("src");
  if (reduce) {
    if (!alreadyLoaded) {
      if (playBtn) playBtn.style.display = "";
    }
  } else {
    if (!alreadyLoaded) loadIframe(frame);
    if (playBtn) playBtn.style.display = "none";
  }

  if (btnReduce) {
    btnReduce.textContent = reduce ? "Enable Motion" : "Reduce Motion";
    btnReduce.setAttribute("aria-pressed", String(reduce));
  }
}

(function initReduce() {
  const lowMem = navigator.deviceMemory && navigator.deviceMemory <= 4; 
  const lite = saveData || slowNet || lowMem;
  if (lite) {
    doc.setAttribute("data-lite", "1");
    reduce = true;
  }
  applyReduceState();

  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener?.("change", (e) => {
    reduce = e.matches || reduce; 
    applyReduceState();
  });
})();

const THEME_ORDER = ["dark", "senja", "light"];
const THEME_ICON = { dark: "🌙", senja: "🌆", light: "🌞" };

function setTheme(name) {
  doc.setAttribute("data-theme", name);
  localStorage.setItem("theme", name);
  if (themeBtn) {
    themeBtn.textContent = THEME_ICON[name] || "🌗";
    themeBtn.setAttribute("aria-label", `Ganti tema (saat ini: ${name})`);
    themeBtn.setAttribute("aria-pressed", String(name !== "dark"));
  }
}

(function initTheme() {
  const saved = localStorage.getItem("theme");
  if (saved && THEME_ORDER.includes(saved)) {
    setTheme(saved);
  } else {
    const prefersLight = window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches;
    setTheme(prefersLight ? "light" : "dark");
  }
})();

themeBtn?.addEventListener("click", () => {
  const current = doc.getAttribute("data-theme") || "dark";
  const idx = THEME_ORDER.indexOf(current);
  const next = THEME_ORDER[(idx + 1) % THEME_ORDER.length];
  setTheme(next);
});

playBtn?.addEventListener("click", () => {
  loadIframe(frame);
  if (playBtn) playBtn.style.display = "none";
});

(function setup3DOnLoad() {
  if (reduce) {
    if (playBtn) playBtn.style.display = ""; 
    return;
  }
  const io3d = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          loadIframe(frame);
          if (playBtn) playBtn.style.display = "none";
          obs.disconnect();
        }
      });
    },
    { threshold: 0.6 }
  );
  frame && io3d.observe(frame);
})();

openModal?.addEventListener("click", () => {
  if (modalFrame && !modalFrame.src && modalFrame.dataset.src) {
    modalFrame.src = modalFrame.dataset.src;
  }
  modal?.showModal();
});
closeModal?.addEventListener("click", () => {
  modal?.close();
  unloadIframe(modalFrame);
});
modal?.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.close();
    unloadIframe(modalFrame);
  }
});

modal?.addEventListener("click", (e) => {
  const rect = modal.getBoundingClientRect();
  const inside =
    e.clientX >= rect.left &&
    e.clientX <= rect.right &&
    e.clientY >= rect.top &&
    e.clientY <= rect.bottom;
  if (!inside) {
    modal.close();
    unloadIframe(modalFrame);
  }
});

let ticking = false,
  last = { x: 0, y: 0 };

function applyParallax(x, y) {
  if (!wrap || reduce) return;
  wrap.style.transform = `perspective(1000px) rotateX(${y * -3}deg) rotateY(${
    x * 4
  }deg)`;
  parallaxItems.forEach((el) => {
    const d = parseFloat(el.dataset.depth || "0");
    el.style.transform = `translate3d(${x * 100 * d}px, ${y * 80 * d}px, 0)`;
  });
}

function schedule(x, y) {
  last.x = x;
  last.y = y;
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(() => {
      applyParallax(last.x, last.y);
      ticking = false;
    });
  }
}

wrap?.addEventListener("mousemove", (e) => {
  if (reduce) return;
  const r = wrap.getBoundingClientRect();
  const x = (e.clientX - (r.left + r.width / 2)) / r.width;
  const y = (e.clientY - (r.top + r.height / 2)) / r.height;
  schedule(x, y);
});

wrap?.addEventListener("mouseleave", () => {
  wrap.style.transform = "";
  parallaxItems.forEach((el) => (el.style.transform = ""));
});

if (wrap && isCoarse) {
  const touchIntensity = 0.55;
  wrap.addEventListener(
    "touchmove",
    (e) => {
      if (reduce) return;
      const t = e.touches && e.touches[0];
      if (!t) return;
      const r = wrap.getBoundingClientRect();
      const x = (t.clientX - (r.left + r.width / 2)) / r.width;
      const y = (t.clientY - (r.top + r.height / 2)) / r.height;
      schedule(x * touchIntensity, y * touchIntensity);
    },
    { passive: true }
  );

  wrap.addEventListener(
    "touchend",
    () => {
      wrap.style.transform = "";
      parallaxItems.forEach((el) => (el.style.transform = ""));
    },
    { passive: true }
  );
}

btnReduce?.addEventListener("click", () => {
  reduce = !reduce;
  applyReduceState();
});

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("in");
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

function scrollToDemo() {
  document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
}
window.scrollToDemo = scrollToDemo;
