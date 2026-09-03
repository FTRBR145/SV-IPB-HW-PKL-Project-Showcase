---
name: Showcase Projek TRK SV IPB
description: Sistem showcase teknologi yang profesional, presisi, dan berpusat pada karya mahasiswa.
colors:
  professional-charcoal: "#1f2937"
  institutional-graphite: "#374151"
  technical-gray: "#4b5563"
  soft-gray: "#d1d5db"
  canvas: "#f9fafb"
  surface: "#ffffff"
  text-muted: "#6b7280"
  border-soft: "#e5e7eb"
  focus-blue: "#0284c7"
  status-success: "#10b981"
  status-pending: "#f59e0b"
  status-danger: "#ef4444"
typography:
  display:
    fontFamily: "Outfit, Open Sans, sans-serif"
    fontSize: "3rem"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Outfit, Open Sans, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Outfit, Open Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: 1.5
  body:
    fontFamily: "Open Sans, Inter, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Open Sans, Inter, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.333
    letterSpacing: "0.04em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  modal: "24px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  2xl: "24px"
  3xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.professional-charcoal}"
    textColor: "{colors.surface}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "10px 16px"
  button-primary-hover:
    backgroundColor: "{colors.institutional-graphite}"
    textColor: "{colors.surface}"
  button-accent:
    backgroundColor: "{colors.focus-blue}"
    textColor: "{colors.surface}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "10px 16px"
  input-default:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.professional-charcoal}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "10px 12px"
    height: "40px"
  card-project:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.professional-charcoal}"
    rounded: "{rounded.lg}"
    padding: "16px"
---

# Design System: Showcase Projek TRK SV IPB

## Overview

**Creative North Star: "Studio Teknologi Profesional"**

Sistem visual diposisikan sebagai studio teknologi profesional: terstruktur, presisi, kredibel, dan berpusat pada kualitas karya mahasiswa. Abu dan graphite membangun ketenangan institusional, charcoal memberi otoritas, sedangkan putih menjaga informasi tetap lapang dan mudah dipindai.

Referensi warna seragam TRK tetap hadir secara halus sebagai sumber kedekatan identitas, tetapi bukan tema atau konsep utama. Karakter profesional dibangun melalui hierarki tipografi yang tegas, grid yang disiplin, foto dan karya nyata, serta komponen yang presisi namun tetap ramah. Biru dipakai secara hemat untuk fokus, status aktif, tautan penting, dan hubungan institusional dengan IPB.

**Key Characteristics:**

- Neutral graphite dan charcoal membangun kesan profesional pada permukaan utama.
- Karya mahasiswa dan foto asli menjadi sumber energi visual.
- Struktur rapi, label ringkas, dan kepadatan informasi tetap nyaman dipindai.
- Biru berfungsi sebagai aksen navigasi dan fokus, bukan latar dekoratif utama.
- Struktur landing page yang sudah ada dipertahankan sebagai komitmen produk.

## Colors

Palet terasa profesional dan teknis: netral, kokoh, presisi, dengan aksen biru yang jarang namun jelas.

### Primary

- **Professional Charcoal** (#1f2937): warna penegas utama untuk tombol primer, navigasi aktif, heading pada bidang gelap, dan elemen yang membutuhkan otoritas tertinggi.
- **Institutional Graphite** (#374151): lapisan kedua untuk hover, bidang gelap pendukung, dan transisi dari charcoal ke abu menengah.
- **Technical Gray** (#4b5563): warna abu inti yang menghubungkan identitas teknologi dengan teks sekunder dan permukaan netral berkarakter.

### Secondary

- **Focus Blue** (#0284c7): aksen terbatas untuk fokus keyboard, ikon aktif, tautan penting, dan tindakan yang perlu dibedakan dari aksi charcoal.

### Tertiary

- **Verified Green** (#10b981): status berhasil, terverifikasi, atau disetujui.
- **Moderation Amber** (#f59e0b): status menunggu moderasi atau membutuhkan perhatian.
- **Action Red** (#ef4444): status gagal, ditolak, atau aksi destruktif.

### Neutral

- **Soft Gray** (#d1d5db): abu terang untuk divider kuat, kontrol pasif, dan bidang pendukung.
- **Canvas** (#f9fafb): latar halaman utama yang mengurangi silau dan membedakan permukaan putih.
- **Surface** (#ffffff): bidang konten, kartu, panel, menu, dan modal.
- **Text Muted** (#6b7280): metadata, bantuan, dan informasi sekunder.
- **Border Soft** (#e5e7eb): pemisah struktural yang tenang antara panel, field, dan tabel.

**The Professional Neutral Rule.** Graphite dan charcoal harus membawa sebagian besar komposisi; biru hanya menandai fokus, status aktif, atau hubungan institusional.

**The Status Has Meaning Rule.** Hijau, amber, dan merah hanya muncul ketika data memiliki status yang sesuai.

## Typography

**Display Font:** Outfit (with Open Sans, sans-serif)  
**Body Font:** Open Sans (with Inter, sans-serif)

**Character:** Outfit memberi bentuk geometris yang tegas untuk judul, sementara Open Sans menjaga informasi akademik, tabel, dan formulir tetap mudah dibaca. Perbedaan keluarga huruf menjadi hierarki utama; variasi dekoratif tidak diperlukan.

### Hierarchy

- **Display** (800, 3rem, 1.25): judul hero landing pada desktop; turun responsif pada perangkat kecil.
- **Headline** (800, 1.5rem, 1.25): judul halaman portal, judul section utama, dan heading dashboard.
- **Title** (700, 1rem, 1.5): judul kartu, subbagian, serta judul dialog.
- **Body** (400, 0.875rem, 1.5): deskripsi, penjelasan, dan informasi isi; pertahankan ukuran baris sekitar 65–75 karakter ketika memungkinkan.
- **Label** (700, 0.75rem, 0.04em): tombol, filter, metadata penting, dan heading tabel pendek.

**The Two-Voice Rule.** Outfit hanya memimpin judul; Open Sans memikul semua informasi operasional dan isi panjang.

**The Quiet Metadata Rule.** Metadata mengecil dan melembut, tetapi tidak boleh kehilangan keterbacaan atau bergantung pada huruf kapital saja.

## Layout

Landing page mempertahankan urutan dan struktur section yang sudah ada. Komposisinya memakai container terpusat, hero fotografis, lalu kelompok konten berbasis grid. Portal mahasiswa dan dashboard admin menggunakan app shell: navbar atas, sidebar desktop, area utama yang dapat menggulir sendiri, dan navigasi bawah pada perangkat kecil.

Ritme ruang menggunakan langkah 4, 8, 12, 16, 20, 24, dan 32 piksel. Kontrol rapat memakai 8–12 piksel; isi kartu memakai 16–20 piksel; pemisahan section memakai 24–32 piksel. Grid projek bergerak dari satu kolom di perangkat kecil menjadi dua, tiga, atau empat kolom sesuai ruang yang tersedia.

Breakpoint mengikuti sistem Tailwind proyek: kecil (640px), medium (768px), besar (1024px), ekstra besar (1280px), dan dua-ekstra-besar (1536px). Sidebar berpindah menjadi bottom navigation pada breakpoint medium ke bawah.

**The Preserve the Landing Rule.** Refinement boleh memperbaiki warna, tipografi, jarak, dan state, tetapi tidak boleh mengubah struktur dasar landing page tanpa persetujuan eksplisit.

## Elevation & Depth

Sistem memakai kedalaman berlapis dan ringan. Border tipis serta perbedaan tonal menjadi struktur utama; shadow muncul ketika elemen perlu terangkat karena state atau konteks, seperti hover kartu, dropdown, navbar sticky, bottom navigation, dan modal.

### Shadow Vocabulary

- **Navigation Lift** (`0 1px 3px rgba(0,0,0,0.10), 0 1px 2px -1px rgba(0,0,0,0.10)`): shadow pendek dan lembut untuk navbar sticky agar terpisah dari konten bergerak.
- **Interactive Lift** (`0 10px 15px -3px rgba(15,23,42,0.10), 0 4px 6px -4px rgba(15,23,42,0.10)`): shadow sedang dengan sedikit pergeseran vertikal pada kartu atau tombol yang sedang di-hover.
- **Modal Lift** (`0 25px 50px -12px rgba(15,23,42,0.25)`): shadow paling dalam untuk dialog dan sheet yang benar-benar berada di atas halaman.
- **Bottom Dock** (`0 -8px 24px rgba(15,23,42,0.10)`): shadow ke arah atas untuk memisahkan bottom navigation dari konten mobile.

**The Flat-at-Rest Rule.** Kartu dan panel biasa tetap datar dengan border; shadow besar hanya hadir sebagai respons interaksi atau lapisan overlay.

**The One Depth Signal Rule.** Hindari border kuat dan shadow kuat pada elemen yang sama; pilih satu sinyal kedalaman dominan.

## Shapes

Bentuk utama menggunakan sudut melengkung yang presisi: 8px untuk badge dan elemen kecil, 12px untuk tombol dan field, 16px untuk kartu dan panel, serta 24px untuk modal utama. Bentuk pill penuh hanya digunakan untuk badge kecil, penghitung, atau kontrol yang memang ringkas.

Thumbnail projek memakai rasio video dan terpotong rapi di dalam kartu. Lingkaran digunakan terbatas untuk avatar, indikator kecil, dan tombol play—bukan sebagai wadah generik untuk setiap ikon.

**The Structured Curve Rule.** Sudut lembut membuat sistem ramah, tetapi radius tetap mengikuti skala dan tidak berubah-ubah antar-komponen sejenis.

## Components

### Buttons

- **Shape:** tombol utama memakai sudut 12px dengan tinggi sentuh minimal sekitar 40–44px.
- **Primary:** charcoal dengan teks putih untuk aksi utama dan navigasi aktif.
- **Accent:** focus blue untuk aksi yang memang membutuhkan penanda institusional atau alur khusus seperti unggah.
- **Hover / Focus:** hover bergeser satu tingkat tonal; fokus menggunakan ring biru yang terlihat. Pergerakan vertikal kecil hanya untuk tombol promosi atau kartu interaktif.
- **Secondary / Ghost:** permukaan putih atau abu terang, teks graphite, dan border lembut.

### Chips

- **Style:** sudut 8–12px, teks label tebal, dan padding rapat.
- **State:** selected memakai charcoal atau tint biru; unselected memakai canvas atau surface dengan border lembut.
- **Status:** badge status memakai warna semantik dan tidak boleh menggantikan filter biasa.

### Cards / Containers

- **Corner Style:** sudut 16px untuk kartu projek dan panel data.
- **Background:** surface putih di atas canvas abu sangat terang.
- **Shadow Strategy:** datar saat diam; interactive lift muncul pada hover kartu yang dapat dibuka.
- **Border:** garis abu lembut sebagai pemisah default.
- **Internal Padding:** umumnya 16–20px, dengan thumbnail video menempel pada tepi kartu.

### Inputs / Fields

- **Style:** background canvas, border lembut, sudut 12px, tinggi sekitar 40px.
- **Focus:** background menjadi putih, border bergeser ke focus blue, dan ring biru tipis muncul.
- **Error / Disabled:** error memakai status danger dengan pesan pemulihan yang jelas; disabled menurunkan kontras dan meniadakan affordance hover.

### Navigation

Navbar menggunakan permukaan putih hampir opak, border bawah, dan shadow pendek. Sidebar desktop memakai lebar tetap, navigasi aktif charcoal, serta ikon biru sebagai aksen. Pada perangkat kecil, navigasi utama pindah ke bottom navigation empat-item dengan state aktif berupa teks biru dan bidang tint lembut.

### Project Preview

Kartu projek memprioritaskan thumbnail video, judul, pemilik, mata kuliah, dan tanggal. Overlay play hanya muncul saat hover atau fokus. Detail projek dibuka pada modal di konteks halaman yang sama, bukan memindahkan pengguna ke landing page.

### Data Tables

Tabel admin memakai header abu sangat terang, label kecil tebal, row divider halus, pencarian bawaan DataTables yang disesuaikan, dan pagination charcoal untuk halaman aktif. Pada perangkat kecil tabel boleh menggulir horizontal tanpa mengecilkan isi hingga sulit dibaca.

## Do's and Don'ts

### Do:

- **Do** jadikan graphite, abu teknis, dan charcoal sebagai massa warna profesional yang dominan.
- **Do** gunakan foto mahasiswa dan karya nyata sebagai sumber daya tarik visual utama.
- **Do** pertahankan struktur section landing page yang sudah ada ketika melakukan refinement.
- **Do** gunakan biru secara hemat untuk fokus, navigasi aktif, dan hubungan institusional.
- **Do** jaga kontrol tetap dapat digunakan dengan keyboard dan memiliki focus ring yang jelas.
- **Do** pertahankan app shell desktop dan bottom navigation pada perangkat kecil.

### Don't:

- **Don't** mengubah landing page menjadi struktur baru, urutan narasi baru, atau visual world baru tanpa persetujuan eksplisit.
- **Don't** menjadikan biru, warna status, gradient, atau efek transparan sebagai dekorasi dominan.
- **Don't** menumpuk border kuat, shadow besar, blur, dan transform pada satu komponen.
- **Don't** memakai emoji atau glyph Unicode sebagai pengganti ikon Lucide yang konsisten.
- **Don't** membuat setiap bagian menjadi kartu; gunakan ruang, divider, dan hierarki sebelum menambah container.
- **Don't** memakai klaim, statistik, atau status institusional yang belum terverifikasi sebagai fakta produksi.
