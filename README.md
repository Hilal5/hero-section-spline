# Hero Spline – Personal Artist (Advanced)

Portfolio hero 3D interaktif berbasis **iframe Spline**, lengkap dengan parallax (mouse & touch), HUD overlay, modal fullscreen, dan toggle tema **dark → senja → light**. Sudah **responsif untuk Android** dan punya **Lite Mode** otomatis untuk perangkat/jaringan yang lebih lemah.

---

**Live web ->** https://hilal5.github.io/hero-section-spline/

---

## Ringkas

* **Teknologi:** HTML, CSS, JS (tanpa framework)
* **3D:** Spline (via `<iframe>`)
* **Fokus:** performa mobile, aksesibilitas, kustomisasi tema

---

## Fitur Utama

* 🎛️ **Theme toggle 3-arah:** dark → **senja** → light (persist di `localStorage`)
* 🎨 **Tema Senja:** aksen oranye–magenta, glow & orbs ikut berubah via CSS variables
* 🌀 **Parallax**: mouse & sentuh (coarse pointer) + tombol **Reduce Motion**
* 🧊 **HUD overlay**: badge like/live/stats (otomatis disembunyikan di layar kecil)
* 🪟 **Modal fullscreen** untuk Spline (`<dialog>`)
* 📱 **Responsif Android**: `svh`, safe-area, gesture-bar friendly
* ⚡ **Lite Mode otomatis** saat `Save-Data` aktif, jaringan lambat, atau RAM ≤ 4 GB
* ♿ **Aksesibel**: ARIA labels, `:focus-visible`, `prefers-reduced-motion`, **ESC** menutup modal
* 🪄 **Reveal on scroll** (IntersectionObserver)

---

## Struktur Folder

```
/ (root)
├─ index.html
├─ styles.css
└─ script.js
```

> Simpan tiga file ini di folder yang sama.

---
