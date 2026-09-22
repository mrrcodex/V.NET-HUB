# V.NET-HUB — Circular Economy Kampus × Alumni

Platform yang menghubungkan **panitia/acara kampus (mahasiswa)** dengan **UMKM milik alumni terverifikasi** — untuk konsumsi, konveksi, percetakan, dokumentasi, dekorasi, plus papan magang/proyek kolaborasi.

> Live demo: **https://v-net-hub.vercel.app**

Dibangun dengan **React + Vite + Tailwind CSS v4**, komponen modular di `src/components`.

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
| `#/alumni/katalog` | CRUD katalog produk |
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

- React 18 + Vite 6
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- Font: Inter + Poppins (Google Fonts)
- Penyimpanan: `localStorage` (demo, tanpa backend)
- Hosting: Vercel

## Struktur Proyek

```
V.NET-HUB/
├── index.html                        # Entry Vite
├── public/logo.jpeg                  # Aset statis
├── src/
│   ├── main.jsx                      # Bootstrap React
│   ├── App.jsx                       # Routing layar + state global
│   ├── index.css                     # Tailwind v4 (@import "tailwindcss")
│   ├── data/catalog.js               # Vendors, produk, kanban awal, jobs
│   ├── utils/wa.js                   # Helper link WhatsApp
│   ├── hooks/
│   │   ├── useB2B.js                 # State kanban + localStorage
│   │   └── useToast.js               # State notifikasi toast
│   └── components/
│       ├── ui/controls.jsx           # Button, Badge, Modal, Panel, Field, …
│       ├── layout/chrome.jsx         # Topbar, Footer, Toast
│       ├── catalog/
│       │   ├── catalog.jsx           # Hero, CategoryPills, VendorCard
│       │   └── CatalogScreen.jsx     # Layar katalog + pencarian
│       ├── rfq/RfqModal.jsx          # Modal permintaan penawaran
│       ├── dashboard/
│       │   ├── alumni.jsx            # Sidebar, KPI, Kanban, Produk, Magang, Profil
│       │   └── DashboardScreen.jsx   # Layar dashboard + sub-path
│       └── jobs/JobsBoard.jsx        # Papan kolaborasi + detail lowongan
├── vercel.json
└── README.md
```

## Cara Menjalankan Lokal

Butuh Node.js 20+.

```bash
npm install
npm run dev
# buka http://localhost:5173
```

Build produksi:

```bash
npm run build
npm run preview
```

## Deploy ke Vercel

Repo terhubung ke Vercel sebagai proyek Vite (framework preset otomatis).
`vercel.json` hanya berisi `cleanUrls` — tidak ada rewrite ke `/index.html`
agar aset `dist/assets/*` tidak ikut ter-rewrite.

## Navigasi & Route

Navigasi utama via tab header:

- `Katalog Vendor` → layar katalog
- `Dashboard Alumni` → `#/alumni/dashboard`
- `Papan Kolaborasi` → layar jobs

Sub-route alumni (`dashboard | katalog | pesanan | magang | profil`) dikendalikan
state `alumniPath` di `App.jsx` dan disinkronkan dengan `location.hash`
sehingga deep-link `#/alumni/pesanan` langsung membuka tab yang benar.

## Kontak WA Demo

Nomor WA vendor bersifat demo dan di-hardcode di `src/utils/wa.js`:

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
