import type { Job, Kanban, Product, Vendor } from '../types.ts';

export const VENDORS: Vendor[] = [
  { name: 'Dapur Alumni Bu Rina', cat: 'Konsumsi', emoji: '🍱', bg: '#FFF7ED', rating: '4.9 (210)', price: 'Mulai Rp 12rb/pax', desc: 'Catering & snack box — 100 s.d. 2000 pax' },
  { name: 'Konveksi Alumni Jaya', cat: 'Konveksi', emoji: '👕', bg: '#EFF6FF', rating: '4.8 (180)', price: 'Mulai Rp 65rb/pcs', desc: 'Kaos panitia, PDH, hoodie sablon & bordir' },
  { name: 'PrintQ Alumni Media', cat: 'Percetakan', emoji: '🖨️', bg: '#F5F3FF', rating: '4.9 (320)', price: 'Mulai Rp 5rb/lbr', desc: 'Banner, poster, booklet, tiket & merch cetak' },
  { name: 'Lensa Kampus Studio', cat: 'Dokumentasi', emoji: '📸', bg: '#ECFDF5', rating: '5.0 (95)', price: 'Mulai Rp 750rb/event', desc: 'Foto & video cinematic + drone acara' },
  { name: 'Dekor Kreatif Alumni', cat: 'Dekorasi', emoji: '🎈', bg: '#FEF2F2', rating: '4.7 (110)', price: 'Mulai Rp 1,5jt/paket', desc: 'Panggung, backdrop, booth & lighting' },
  { name: 'Kopi Alumni Space', cat: 'Konsumsi', emoji: '☕', bg: '#FFFBEB', rating: '4.8 (140)', price: 'Mulai Rp 10rb/cup', desc: 'Coffee break, stand bazar & sponsorship' },
];

export const VENDOR_CATEGORIES = ['Semua', 'Konsumsi', 'Konveksi', 'Percetakan', 'Dokumentasi', 'Dekorasi'];

export const INITIAL_PRODUCTS: Product[] = [
  { n: 'Snack Box Reguler', c: 'Konsumsi', p: 'Rp 12.000 / pax', s: '2000 pax' },
  { n: 'Nasi Box Ayam Geprek', c: 'Konsumsi', p: 'Rp 15.000 / pax', s: '1500 pax' },
  { n: 'Paket Coffee Break', c: 'Konsumsi', p: 'Rp 10.000 / cup', s: '1000 cup' },
];

export const INITIAL_KANBAN: Kanban = {
  Menunggu: [
    { t: 'Snack 600 box — Dies Natalis', s: 'BEM FEB • 20 Sep 2026', vendor: 'Dapur Alumni Bu Rina', detail: 'Snack box isi 3' },
    { t: 'Coffee break 150 pax — Seminar', s: 'HIMA TI • 25 Sep 2026', vendor: 'Kopi Alumni Space', detail: 'Coffee + snack' },
  ],
  Diproses: [
    { t: 'Konsumsi pelantikan 300 pax', s: 'DPM • DP Rp 1,5jt', vendor: 'Dapur Alumni Bu Rina', detail: 'Nasi box' },
  ],
  Selesai: [
    { t: 'Bazar 200 cup kopi susu', s: 'UKM Kewirausahaan • Lunas', vendor: 'Kopi Alumni Space', detail: 'Stand bazar' },
  ],
};

export const JOB_FILTERS = ['Semua', 'Magang', 'Freelance', 'Studi Kasus'];

export const INITIAL_JOBS: Job[] = [
  {
    type: 'Magang',
    title: 'Social Media Specialist (Magang)',
    by: 'Kopi Alumni Space • ✔ Verified',
    loc: 'Hybrid • Malang • 3 bulan',
    desc: 'Kelola konten TikTok/IG, 2jt/bulan + sertifikat.',
    detail: ['Uang saku Rp 1,5–2jt/bulan', 'Durasi 3 bulan, hybrid', 'Sertifikat + surat rekomendasi', 'Berpeluang jadi full-time crew'],
    tag: 't-mag',
  },
  {
    type: 'Freelance',
    title: 'Desain Maskot & Merch Dies Natalis',
    by: 'Konveksi Alumni Jaya • ✔ Verified',
    loc: 'Remote • Fee Rp 1,2jt',
    desc: 'Butuh 3 opsi maskot + 2 desain kaos.',
    detail: ['Fee Rp 1,2jt / paket', 'Deadline 7 hari', 'Brief + revisi 2x', 'Portofolio dilampirkan'],
    tag: 't-proj',
  },
  {
    type: 'Studi Kasus',
    title: 'Studi Kasus: Strategi Repeat Order Catering',
    by: 'Dapur Alumni Bu Rina • ✔ Verified',
    loc: 'Hybrid • Hadiah Rp 500rb',
    desc: 'Riset + presentasi strategi CRM & bundling.',
    detail: ['Hadiah Rp 500rb + magang prioritas', 'Tim 2–3 orang', 'Presentasi 10 menit', 'Data disediakan'],
    tag: 't-case',
  },
  {
    type: 'Magang',
    title: 'Videografer Event (Magang Berbayar)',
    by: 'Lensa Kampus Studio • ✔ Verified',
    loc: 'On-site • Per event',
    desc: 'Liput 4 event kampus/bulan, fee per event.',
    detail: ['Fee Rp 400rb/event', 'Pinjam alat studio', 'Portofolio event kampus', 'Mentoring editing'],
    tag: 't-mag',
  },
];

export const CANCEL_REASONS = [
  'Stok / kapasitas habis',
  'Jadwal bentrok',
  'Permintaan panitia',
  'Harga / budget tidak cocok',
  'Lainnya',
];
