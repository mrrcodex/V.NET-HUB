# V.NET-HUB — Circular Economy Kampus × Alumni

Platform yang menghubungkan **panitia/acara kampus (mahasiswa)** dengan **UMKM milik alumni terverifikasi** — untuk konsumsi, konveksi, percetakan, dokumentasi, dekorasi, plus papan magang/proyek kolaborasi.

> Live demo: **https://v-net-hub.vercel.app**

Satu file statis (`index.html`), tanpa build step, tanpa backend — data demo disimpan di `localStorage` browser.

## Fitur Utama

### 1. Katalog Vendor (Mahasiswa)
- Direktori bisnis alumni dengan badge **✔ Alumni Verified**
- Filter kategori: Konsumsi, Konveksi, Percetakan, Dokumentasi, Dekorasi
- Pencarian global (nama / deskripsi / kategori)
- Statistik ekosistem (UMKM, acara dilayani, magang aktif)
- Aksi per vendor: **Minta Penawaran (RFQ)** + Detail

### 2. Request for Quotation (RFQ)
- Modal RFQ: nama acara, tanggal, budget/kuantitas, detail pesanan
- Validasi wajib isi sebelum kirim
- RFQ terkirim otomatis masuk ke kanban **Menunggu** di Dashboard Alumni
- Toast notifikasi + opsi lompat ke `#/alumni/pesanan`

### 3. Alumni Business Dashboard (Vendor)
Path berbasis hash:

| Path | Fungsi |
|------|--------|
| `#/alumni/dashboard` | KPI (RFQ masuk, diproses, selesai, profil dilihat) + ringkasan B2B + aksi cepat |
| `#/alumni/katalog` | CRUD katalog produk (tampil di direktori mahasiswa) |
| `#/alumni/pesanan` | Kanban B2B: Menunggu → Diproses → Selesai + Dibatalkan |
| `#/alumni/magang` | Posting lowongan (gratis, tampil di Papan Kolaborasi) |
| `#/alumni/profil` | Edit deskripsi, WA, sosmed, alamat, foto produk |

Fitur kanban pesanan B2B:
- Pindah status satu klik
- **Batalkan** via modal (alasan + catatan + opsi notifikasi WA)
- Kolom **Dibatalkan** dengan pulihkan / hapus permanen
- Setiap kartu punya symlink ke katalog + tombol **Chat WA** (`wa.me`) dengan pesan prefilled
- Persistensi `localStorage` (`vnet-hub-b2b-v1`)

### 4. Papan Kolaborasi (Bounty & Internship Board)
- Filter: Magang, Proyek Lepas (Freelance), Studi Kasus
- Detail lowongan + upload proposal/portofolio (PDF/DOC/ZIP)
- Posting dari dashboard alumni langsung tampil di papan (gratis untuk merchant terverifikasi)

## Tech Stack

- HTML + CSS + Vanilla JS (single-file, ~720 baris)
- Font: Inter + Poppins (Google Fonts)
- Penyimpanan: `localStorage` (demo, tanpa backend)
- Hosting: Vercel (static)

## Struktur Proyek

```
V.NET-HUB/
├── index.html                  # Seluruh aplikasi (UI + CSS + JS)
├── logo.jpeg                   # Logo header
├── vercel.json                 # Rewrite semua route ke /index.html
├── .vercelignore               # Exclude .idea & PDF prompt dari deploy
├── Prompt_AI_Figma_VNET_HUB.pdf# Dokumen prompt/desain awal (tidak di-deploy)
└── README.md
```

## Cara Menjalankan Lokal

Tidak perlu install apa pun. Pilih salah satu:

```bash
# 1. Langsung buka file
xdg-open index.html

# 2. Atau via server lokal (agar hash routing konsisten)
python3 -m http.server 8000
# buka http://localhost:8000
```

## Deploy ke Vercel

Repo ini sudah terhubung ke Vercel sebagai static site:

```bash
vercel --prod
```

Konfigurasi di `vercel.json`:

```json
{
  "cleanUrls": true,
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Ini memastikan deep-link seperti `/alumni/pesanan` atau `#/alumni/pesanan` tetap membuka aplikasi.

## Navigasi & Route

Navigasi utama via tab header:

- `Katalog Vendor` → `#s1`
- `Dashboard Alumni` → `#/alumni/dashboard` (alias `#s3`)
- `Papan Kolaborasi` → `#s4`

Sub-route alumni dikendalikan fungsi `subGo(path)` + `routeHash()` via `location.hash`.

## Kontak WA Demo

Nomor WA vendor bersifat demo dan di-hardcode di `vendorWA` dalam `index.html`:

- Dapur Alumni Bu Rina: `0812-3456-7890`
- Kopi Alumni Space: `0821-2345-6789`

Ubah mapping tersebut untuk memakai nomor asli.

## Batasan (Demo)

- Tanpa autentikasi / backend — semua data hanya di browser pengunjung
- Upload file hanya simulasi client-side (tidak tersimpan ke server)
- Data reset jika `localStorage` dibersihkan

## Roadmap

- [ ] Auth mahasiswa / alumni + verifikasi merchant
- [ ] Backend + database (RFQ, katalog, lamaran tersimpan permanen)
- [ ] Notifikasi real-time (WA gateway / email)
- [ ] Rating & ulasan terverifikasi per transaksi
- [ ] Pisah `index.html` menjadi modul CSS/JS terpisah
