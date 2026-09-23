import type { Bundle, PortfolioCase } from '../types.ts';

export const UPN_IDENTITY = {
  name: 'UPN "Veteran" Jawa Timur',
  short: 'UPNVJT',
  tagline: 'Kampus Bela Negara',
  sesanti: 'Widya Mwat Yasa',
  location: 'Surabaya • Rungkut Madya',
  accreditation: 'Akreditasi A',
  stats: [
    { n: '8', l: 'Fakultas' },
    { n: '29', l: 'Prodi S1/D4' },
    { n: '8', l: 'Prodi S2' },
    { n: '40rb+', l: 'Mahasiswa' },
  ],
};

export const UPN_FACULTIES = [
  { abbr: 'FEB', name: 'Ekonomi dan Bisnis', prodi: 'Manajemen • Akuntansi • Ekbis • Kewirausahaan' },
  { abbr: 'FAPERTA', name: 'Pertanian', prodi: 'Agribisnis • Agroteknologi' },
  { abbr: 'FTS', name: 'Teknik dan Sains', prodi: 'Teknik Industri • Kimia • Sipil • Pangan • Lingkungan' },
  { abbr: 'FH', name: 'Hukum', prodi: 'Ilmu Hukum' },
  { abbr: 'FK', name: 'Kedokteran', prodi: 'Kedokteran' },
  { abbr: 'FIK', name: 'Ilmu Komputer', prodi: 'Informatika • SI • Sains Data • Bisnis Digital' },
  { abbr: 'FISIP', name: 'Ilmu Sosial & Politik', prodi: 'Komunikasi • Adbis • Adpublik • HI • Pariwisata' },
  { abbr: 'FAD', name: 'Arsitektur dan Desain', prodi: 'Arsitektur • DKV • Desain Interior' },
];

export const PORTFOLIO_CASES: PortfolioCase[] = [
  {
    id: 'dies-67',
    event: 'Dies Natalis ke-67 UPNVJT',
    theme: '“Bangga Mengabdi, Berdampak untuk Negeri”',
    org: 'Panitia Rektorat × BEM',
    faculty: 'Lintas 8 Fakultas',
    vendors: ['Dapur Alumni Bu Rina', 'Lensa Kampus Studio', 'Dekor Kreatif Alumni'],
    budget: 'Rp 18–25 jt',
    result: '1.200 pax konsumsi + dokumentasi drone + panggung utama',
    rating: '4.9/5 dari panitia',
    emoji: '🎓',
    bg: '#EFF6FF',
    story: 'Kebutuhan 1.200 box dalam 2 hari dipenuhi via 1 RFQ bundling ke 3 vendor alumni. Nota & surat kerjasama diterbitkan H+1.',
  },
  {
    id: 'pkkmb',
    event: 'PKKMB & Bela Negara 2026',
    theme: 'Penyambutan 5.000+ maba',
    org: 'Panitia PKKMB',
    faculty: 'Universitas',
    vendors: ['Konveksi Alumni Jaya', 'PrintQ Alumni Media'],
    budget: 'Rp 30–40 jt',
    result: '5.000 kaos + 2.000 booklet + 40 banner fakultas',
    rating: '4.8/5 dari panitia',
    emoji: '🎖️',
    bg: '#F0FDF4',
    story: 'Sablon 5.000 kaos 10 hari + cetak booklet PKKMB. QC per fakultas, retur < 1%.',
  },
  {
    id: 'expo-feb',
    event: 'Expo Kewirausahaan FEB',
    theme: 'Bazar UMKM mahasiswa',
    org: 'HIMA Manajemen × UKM Kewirausahaan',
    faculty: 'FEB',
    vendors: ['Kopi Alumni Space', 'Dapur Alumni Bu Rina'],
    budget: 'Rp 4–6 jt',
    result: '12 stand + 800 cup kopi + 600 snack box',
    rating: '5.0/5 dari peserta',
    emoji: '☕',
    bg: '#FFFBEB',
    story: 'Stand bazar + coffee break 2 hari. Sistem deposit stand via RFQ, omzet peserta naik 35%.',
  },
  {
    id: 'semnas-ti',
    event: 'Seminar Nasional HIMA TI',
    theme: '150 peserta hybrid',
    org: 'HIMA TI (FIK)',
    faculty: 'FIK',
    vendors: ['Kopi Alumni Space', 'Lensa Kampus Studio'],
    budget: 'Rp 3–5 jt',
    result: 'Coffee break 150 pax + rekaman cinematic',
    rating: '4.9/5 dari peserta',
    emoji: '💻',
    bg: '#F5F3FF',
    story: 'Coffee break tepat waktu + aftermovie 3 menit tayang H+2 di IG himpunan.',
  },
];

export const BUNDLES: Bundle[] = [
  {
    id: 'paket-dies',
    name: 'Paket Dies Natalis',
    items: ['Konsumsi 500 box', 'Dekor panggung + backdrop', 'Dokumentasi foto + drone'],
    vendors: ['Dapur Alumni Bu Rina', 'Dekor Kreatif Alumni', 'Lensa Kampus Studio'],
    price: 'Rp 12,5 jt',
    save: 'Hemat 15% vs pesan satuan',
    emoji: '🎓',
  },
  {
    id: 'paket-seminar',
    name: 'Paket Seminar 150 pax',
    items: ['Coffee break 150 pax', ' percetakan banner + sertifikat', 'Dokumentasi'],
    vendors: ['Kopi Alumni Space', 'PrintQ Alumni Media', 'Lensa Kampus Studio'],
    price: 'Rp 4,2 jt',
    save: 'Hemat 12% + gratis desain banner',
    emoji: '🎤',
  },
  {
    id: 'paket-pkkmb',
    name: 'Paket PKKMB / Ospek',
    items: ['Kaos panitia + maba', 'Booklet + ID card', 'Snack box'],
    vendors: ['Konveksi Alumni Jaya', 'PrintQ Alumni Media', 'Dapur Alumni Bu Rina'],
    price: 'Mulai Rp 65rb/pax',
    save: 'Cicilan 2 termin + nota resmi',
    emoji: '🎖️',
  },
];

export const TESTIMONIALS = [
  {
    name: 'Ketua BEM FEB',
    text: 'Pesan 600 snack box H-3 tetap dilayani. Nota resmi langsung jadi, LPJ aman.',
    stars: '★★★★★',
  },
  {
    name: 'HIMA TI (FIK)',
    text: 'Coffee break 150 pax datang 30 menit lebih awal. After movie-nya bagus banget.',
    stars: '★★★★★',
  },
  {
    name: 'UKM Kewirausahaan',
    text: 'Stand bazar + kopi ludes 800 cup dalam 2 hari. Omzet naik, repeat order pasti.',
    stars: '★★★★★',
  },
];

export const PRICING = [
  {
    name: 'Panitia Mahasiswa',
    price: 'Gratis',
    features: ['Kirim RFQ tanpa batas', 'Lacak pesanan real-time', 'Chat WA vendor', 'Rating & ulasan'],
    cta: 'Cari Vendor',
  },
  {
    name: 'Alumni UMKM',
    price: 'Gratis',
    features: ['Etalase verified merchant', 'Kanban B2B + notif WA', 'Posting magang gratis', 'Laporan repeat order'],
    cta: 'Jadi Mitra',
    highlight: true,
  },
  {
    name: 'Fakultas / Rektorat',
    price: 'Custom',
    features: ['Laporan circular per fakultas', 'Verifikasi massal Ormawa', 'Invoice & nota resmi', 'Prioritas Dies Natalis'],
    cta: 'Hubungi Kami',
  },
];

export const FAQS = [
  {
    q: 'Apakah vendor benar alumni UPNVJT?',
    a: 'Ya. Badge ✔ Alumni Verified diberikan setelah verifikasi NIM/angkatan + usaha aktif. Data demo memakai 6 vendor contoh.',
  },
  {
    q: 'Berapa biaya untuk panitia?',
    a: 'Gratis. Panitia hanya membayar ke vendor sesuai kesepakatan. Komisi 0% selama tahap rintisan kampus.',
  },
  {
    q: 'Bagaimana cara bayar & nota?',
    a: 'DP via transfer/QRIS ke vendor, pelunasan H+1 acara. Nota + surat kerjasama tersedia untuk LPJ.',
  },
  {
    q: 'Bisakah pesan ke banyak vendor sekaligus?',
    a: 'Bisa. Pakai Paket Bundling (1 RFQ ke 3 vendor) atau centang beberapa vendor lalu kirim RFQ massal.',
  },
];
