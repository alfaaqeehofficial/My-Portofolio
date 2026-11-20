# 💎 Portofolio Web Profesional — Realistic Glassmorphism & Micro-Interactions

Sebuah website portofolio modern berstandar industri dengan estetika **Realistic Glassmorphism** (pembiasan cahaya dinamis, tekstur kaca nyata, specular highlights), **animasi interaktif 3D & mikro taktil** pada setiap klik, serta **animasi scroll yang sangat halus** (*smooth reveal on scroll*).

---

## ✨ Fitur Unggulan

### 1. 🪟 Realistic Glassmorphism Engine
- **Multi-layered Frosted Blur**: `backdrop-filter: blur(24px) saturate(180%)` dengan kontras dan saturasi warna optimal.
- **Dynamic Specular Glare Tracking**: Permukaan kartu memantulkan kilauan cahaya radial yang bergerak mengikuti posisi kursor mouse (`--mouse-x`, `--mouse-y`).
- **Physical Borders & Refraction Shadows**: Garis tepi kaca halus dengan highlight atas (`inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)`) dan bayangan gravitasi bertingkat.
- **Tangible Film Grain Layer**: Lapisan tekstur noise ultra-halus berbasis SVG filter untuk sensasi material fisik yang nyata, bukan sekadar transparansi digital biasa.
- **Ambient Aurora Scene**: Tiga orb aurora yang melayang lembut ditambah satu orb interaktif yang mengikuti kursor dan terbiaskan di balik panel kaca.

### 2. ⚡ Interaksi Mikro & Animasi Klik Taktil
- **Liquid Water-Ripple Wave**: Setiap klik pada tombol, kartu, atau menu menghasilkan efek gelombang riak air yang membesar dan memudar.
- **Spring Tactile Compression**: Tombol memiliki fisika pantulan pegas (`cubic-bezier(0.34, 1.56, 0.64, 1)`).
- **Sparks Particle Burst**: Efek ledakan partikel percikan cahaya ketika menekan tombol utama (*Call-to-Action*) dan tombol kirim pesan.
- **3D Tilt & Parallax Physics**: Kartu berputar mengikuti sudut kemiringan kursor (maksimal 9 derajat) dengan kedalaman sumbu Z.
- **Magnetic Buttons**: Tombol memiliki daya tarik magnetik halus ke arah kursor mouse saat didekati.
- **Web Audio Tactile Synthesizer**: Suara klik kaca dan instrumen *chime* yang disintesis secara real-time via Web Audio API murni (tanpa perlu aset file audio eksternal). Terdapat tombol toggle Mute/Unmute di navbar.
- **Dynamic Accent Color Theme Switcher**: Mengubah spektrum warna aurora (Default Indigo/Cyan, Emerald, Sunset Rose, atau Violet) secara instan.

### 3. 🌊 Animasi Muncul Halus Saat Scroll (*Scroll Reveal*)
- **Top Dynamic Glowing Progress Bar**: Bar kaca di bagian atas layar menunjukkan persentase progres membaca halaman secara real-time.
- **Intersection Observer Animations**: Elemen muncul secara bertahap (*staggered fade-up, scale-in, slide-in*) begitu memasuki viewport pengguna.
- **Live Animated Counters**: Angka statistik (Tahun Pengalaman, Jumlah Proyek, Tingkat Kepuasan) berhitung otomatis dari 0 hingga target dengan kurva easing yang mulus.
- **Animated Skill Proficiency Bars**: Batang persentase kemampuan terisi otomatis saat pengguna menggulir ke bagian keahlian.
- **Active Navigation Spy**: Menu di navbar kaca secara otomatis menyorot bagian halaman yang sedang aktif dibaca.

### 4. 💼 Struktur Konten Portofolio Lengkap
1. **Floating Glass Island Navigation**: Logo pulsasi, tautan navigasi, tombol suara, tombol ganti tema warna, tombol "Hubungi", dan drawer responsif mobile.
2. **Hero Section**: Status ketersediaan aktif, headline tipografi modern, metrik pencapaian, dan kartu 3D interaktif profil developer.
3. **Bento Grid "Tentang Saya"**: Filosofi kode, widget *Now Playing*, ekosistem teknologi, dan komitmen kehandalan arsitektur.
4. **Karya & Studi Kasus (Projects)**: Filter interaktif (All, Full Stack, UI/UX Design, Web3 & AI, Mobile Apps), kartu 3D tilt, tombol live preview, dan **Modal Lightbox Studi Kasus** yang lengkap.
5. **Keahlian & Stack**: Bar persentase penguasaan terbagi menjadi Front-end, Back-end & Systems, serta UI/UX & Motion.
6. **Timeline Karir**: Garis waktu bercahaya dengan pencapaian dan tag teknologi pada setiap peran profesional.
7. **Kontak & Formulir Interaktif**: Fitur **Salin Email Instan** dengan konfirmasi toast, tautan sosial media, formulir kontak dengan spinner pengiriman, dan notifikasi kaca (*Glass Toast Notification*).
8. **Footer**: Tautan sosial media dan hak cipta.

---

## 🚀 Cara Menjalankan

Website ini dibangun menggunakan **Pure Web Standards (HTML5, Modern CSS3, Vanilla JavaScript)** tanpa memerlukan kompilasi atau dependensi npm/node yang rumit!

### Opsi 1: Langsung Buka di Browser (Paling Cepat)
Cukup klik ganda (double-click) file `index.html` di File Explorer, atau seret file `index.html` ke browser apa pun (Google Chrome, Microsoft Edge, Firefox, Safari).

### Opsi 2: Menggunakan Local Server (Python)
Jika ingin dijalankan melalui HTTP server lokal:
```powershell
# Jalankan perintah ini di direktori d:\porto:
python3.14 -m http.server 3000
```
Buka browser dan akses: `http://localhost:3000`

---

## 🛠️ Cara Kustomisasi

1. **Mengubah Nama & Biodata**:
   Buka file `index.html`, lalu ganti teks `Alex Pratama` dengan nama Anda, serta perbarui deskripsi pada bagian `#beranda` dan `#tentang`.
2. **Mengganti Foto Profil**:
   Cari tag `<img ... class="profile-avatar-img">` di `index.html` dan ganti URL gambar dengan foto atau avatar pilihan Anda.
3. **Menambah / Mengubah Proyek**:
   - Untuk data kartu proyek di halaman, edit elemen di dalam `<div class="projects-grid">` di `index.html`.
   - Untuk data detail saat modal dibuka, sesuaikan objek `projectsData` di dalam file `script.js`.
4. **Mengubah Email & Kontak**:
   - Ganti `alex.pratama.dev@gmail.com` di `index.html` dan pada fungsi `copyEmailBtn` di `script.js`.
   - Perbarui tautan LinkedIn, GitHub, dan Twitter di bagian footer dan formulir kontak.

---

## 🌐 Deploy Gratis ke Internet

Portofolio ini siap di-deploy ke berbagai layanan hosting gratis dalam hitungan detik:
- **GitHub Pages**: Buat repository di GitHub, push seluruh file (`index.html`, `style.css`, `script.js`), lalu aktifkan GitHub Pages di menu Settings > Pages.
- **Vercel**: Tarik folder ini ke dashboard Vercel atau deploy via Vercel CLI.
- **Netlify**: Drag & drop folder `d:\porto` langsung ke dashboard Netlify.
