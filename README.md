# Hero Spline – Personal Artist (Advanced)

Portfolio hero 3D interaktif berbasis **iframe Spline**, lengkap dengan parallax (mouse & touch), HUD overlay, modal fullscreen, dan toggle tema **dark → senja → light**. Sudah **responsif untuk Android** dan punya **Lite Mode** otomatis untuk perangkat/jaringan yang lebih lemah.

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
└─ main.js
```

> Simpan tiga file ini di folder yang sama.

---

## Cara Pakai

1. **Salin** tiga file: `index.html`, `styles.css`, `main.js` ke proyek kamu.
2. (Opsional) **Ganti link Spline** di dua `<iframe>`:

   ```html
   <iframe src="https://my.spline.design/ID-PROYEK-KAMU/" ...></iframe>
   ```
3. **Buka** `index.html` langsung di browser, atau jalankan server lokal (mis. VSCode **Live Server**).
4. Coba **toggle tema** (tombol 🌙/🌆/🌞), **Reduce Motion**, dan **Fullscreen**.

> **Catatan:** di Android, HUD disembunyikan otomatis agar ringan; Mode Lite aktif otomatis bila koneksi lambat atau memori ≤ 4 GB.

---

## Pengaturan & Kustomisasi

### 1) Tema Default

* Saat pertama kali, tema mengikuti preferensi OS. Setelah user klik toggle, pilihan disimpan di `localStorage`.
* Paksa tema awal via atribut di `<html>`:

  ```html
  <html lang="id" data-theme="senja">
  ```

### 2) Aktifkan **Lite Mode** Manual (untuk testing)

* Tambahkan atribut ke `<html>`:

  ```html
  <html data-lite="1">
  ```
* Efek: HUD & orbs disembunyikan, parallax & anim kecil dimatikan.

### 3) Palet “Senja” Alternatif

* **Senja Lembut (default):** `--accent: #FF7A59`, `--accent-2: #FF3D81`
* **Senja Gold:** `--accent: #FFB86B`, `--accent-2: #FF7A59`
* **Senja Ungu:** `--accent: #B66DFF`, `--accent-2: #FF6EA9`

Ubah langsung pada blok `[data-theme="senja"]` di `styles.css`.

### 4) Tampilkan HUD di Mobile (kalau perlu)

Di `styles.css` ada aturan yang menyembunyikan HUD pada `max-width: 720px)`. Hapus/ubah bagian ini bila ingin tetap tampil.

---

## Aksesibilitas

* Elemen interaktif punya **label ARIA** & fokus jelas via `:focus-visible`.
* **Reduce Motion** menghormati `prefers-reduced-motion` dan tombol manual.
* **Escape** menutup `<dialog>`; tombol modal memiliki label yang sesuai.

---

## Performa

* Spline berjalan di WebGL. Pada perangkat menengah ke bawah, parallax + blur/backdrop-filter bisa menurunkan FPS & boros baterai. Solusi:

  * HUD disembunyikan di mobile
  * **Lite Mode** otomatis/manual
  * Kurangi blur (`.orb { filter: blur(...) }`) atau sembunyikan orbs
  * Ganti scene Spline dengan yang lebih ringan

---

## Dukungan Browser

* Chrome, Edge, Firefox, Safari modern. `<dialog>` didukung luas; fallback sederhana sudah disiapkan (tanpa JS, konten tetap terlihat di halaman utama).

---

## Troubleshooting

* **Iframe Spline tidak tampil / lambat:** cek koneksi; kadang blokir jaringan kantor/ISP. Coba VPN atau jaringan lain.
* **Parallax tidak bergerak:** kemungkinan `Reduce Motion` aktif (OS atau tombol). Matikan sementara untuk uji.
* **Modal tidak bisa dibuka:** pastikan tidak ada error JS di konsol; beberapa ekstensi browser bisa mengganggu `<dialog>`.

---

## Catatan Versi

* **v1.0.0** – Rilis awal: parallax mouse/touch, modal fullscreen, tema dark/senja/light, responsif Android, Lite Mode otomatis.

---

## Lisensi & Atribusi

* Gunakan bebas untuk kebutuhan **pribadi/pendidikan**. Untuk pemakaian komersial, pastikan lisensi **asset Spline** (model/tekstur) yang kamu pakai mengizinkan.

---

## Kredit

* 3D oleh **Spline**. Terima kasih untuk komunitas web yang menginspirasi implementasi aksesibilitas & performa di proyek ini.
