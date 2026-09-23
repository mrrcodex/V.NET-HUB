import { Button, Badge } from '../ui/controls.tsx';
import { VENDORS } from '../../data/catalog.ts';
import { BUNDLES, FAQS, PORTFOLIO_CASES, PRICING, TESTIMONIALS, UPN_FACULTIES, UPN_IDENTITY } from '../../data/upn.ts';
import type { Bundle } from '../../types.ts';

function SectionTitle({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div className="mb-5 text-center">
      <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-extrabold text-blue-700">{kicker}</span>
      <h2 className="font-display mt-2 text-2xl font-bold">{title}</h2>
      {sub && <p className="mx-auto mt-1 max-w-2xl text-sm text-slate-500">{sub}</p>}
    </div>
  );
}

interface LandingProps {
  onCatalog: () => void;
  onPortfolio: (id: string) => void;
  onJobs: () => void;
  onLogin: () => void;
  onRegister: () => void;
  onBundle: (b: Bundle) => void;
}

export function LandingScreen({ onCatalog, onPortfolio, onJobs, onLogin, onRegister, onBundle }: LandingProps) {
  return (
    <div className="grid gap-10">
      {/* HERO */}
      <div className="relative grid gap-5 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-800 via-blue-700 to-blue-500 p-8 text-white md:grid-cols-[1.2fr_.8fr] md:p-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-80 w-80 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-24 right-24 h-56 w-56 rounded-full bg-emerald-300/20" />
        <div className="relative z-[1]">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex rounded-full border border-white/30 bg-white/20 px-3 py-1.5 text-[13px] font-semibold">
              🎖️ {UPN_IDENTITY.tagline} • {UPN_IDENTITY.sesanti}
            </span>
            <span className="inline-flex rounded-full border border-white/30 bg-emerald-400/30 px-3 py-1.5 text-[13px] font-semibold">
              🤝 Resmi kolaborasi {UPN_IDENTITY.short}
            </span>
          </div>
          <h1 className="font-display my-3 text-3xl font-bold leading-tight md:text-4xl">
            Circular Economy
            <br />
            Kampus × Alumni UPNVJT
          </h1>
          <p className="mb-5 max-w-xl opacity-90">
            Panitia acara dari 8 fakultas pesan konsumsi, konveksi, cetak, dokumentasi & dekor langsung ke UMKM alumni
            terverifikasi. Uang acara kembali ke ekosistem kampus — plus magang & proyek untuk mahasiswa.
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Button variant="white" onClick={onCatalog}>
              Cari Vendor →
            </Button>
            <Button variant="ghostLight" onClick={onRegister}>
              Jadi Mitra Alumni
            </Button>
            <Button variant="ghostLight" onClick={onJobs}>
              Cari Magang
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-[13px] opacity-90">
            <span>✔ Tanpa biaya untuk panitia</span>•<span>✔ Nota resmi untuk LPJ</span>•<span>✔ Respons &lt; 1×24 jam</span>
          </div>
        </div>
        <div className="relative z-[1] self-center rounded-2xl bg-white p-5 text-slate-900 shadow-xl">
          <b>📊 Dampak Ekosistem (live demo)</b>
          <p className="text-[13px] text-slate-500">Dihitung dari transaksi + kanban B2B aktif</p>
          <div className="mt-3 grid grid-cols-3 gap-2.5">
            {[['120+', 'UMKM Alumni'], ['350+', 'Acara Dilayani'], ['85', 'Magang Aktif']].map(([n, l]) => (
              <div key={l} className="rounded-xl bg-blue-50 p-2.5 text-center">
                <b className="block text-lg text-blue-800">{n}</b>
                <span className="text-xs text-slate-500">{l}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-xl bg-emerald-50 p-3 text-[13px] text-emerald-800">
            💰 <b>Rp 480 jt+</b> perputaran kembali ke alumni tahun ini
          </div>
        </div>
      </div>

      {/* TRUST BAR */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <p className="mb-2 text-center text-xs font-bold text-slate-400">
          DIPAKAI 8 FAKULTAS {UPN_IDENTITY.short} • {UPN_IDENTITY.location}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {UPN_FACULTIES.map((f) => (
            <span key={f.abbr} title={`${f.name} — ${f.prodi}`} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
              {f.abbr}
            </span>
          ))}
        </div>
      </div>

      {/* KATALOG TEASER */}
      <div>
        <SectionTitle kicker="KATALOG VENDOR" title="UMKM Alumni Terverifikasi" sub="Contoh 3 vendor unggulan — buka katalog untuk 6+ vendor dan 5 kategori" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VENDORS.slice(0, 3).map((v) => (
            <article key={v.name} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="relative flex h-28 items-center justify-center text-5xl" style={{ background: v.bg }}>
                {v.emoji}
                <span className="absolute left-3 top-3">
                  <Badge>✔ Alumni UPNVJT</Badge>
                </span>
              </div>
              <div className="p-4">
                <b>{v.name}</b>
                <p className="text-[13px] text-slate-500">
                  ★ {v.rating} • {v.desc}
                </p>
                <p className="mt-1 font-extrabold text-blue-800">{v.price}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Button onClick={onCatalog}>Buka Katalog Lengkap →</Button>
        </div>
      </div>

      {/* PORTOFOLIO */}
      <div>
        <SectionTitle
          kicker="PORTOFOLIO KOLABORASI"
          title="Event Kampus yang Sudah Jalan"
          sub="Studi kasus nyata panitia × vendor alumni — klik untuk detail"
        />
        <div className="grid gap-4 md:grid-cols-2">
          {PORTFOLIO_CASES.map((c) => (
            <button
              key={c.id}
              onClick={() => onPortfolio(c.id)}
              className="rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-blue-400 hover:shadow-lg"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl text-3xl" style={{ background: c.bg }}>
                  {c.emoji}
                </div>
                <div>
                  <b>{c.event}</b>
                  <p className="text-[13px] text-blue-700">{c.theme}</p>
                  <p className="text-[13px] text-slate-500">
                    {c.org} • {c.faculty}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm">✅ {c.result}</p>
              <p className="text-[13px] text-slate-500">
                💰 {c.budget} • {c.rating}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* CARA KERJA */}
      <div className="rounded-3xl bg-slate-900 p-8 text-white">
        <SectionTitle kicker="CARA KERJA" title="Dari RFQ sampai LPJ beres" sub="" />
        <div className="grid gap-3 md:grid-cols-3">
          {[
            ['1️⃣', 'Panitia kirim RFQ', 'Isi nama acara, tanggal, budget & detail. Bisa ke 1 atau 3 vendor sekaligus.'],
            ['2️⃣', 'Alumni proses di Kanban', 'Status Menunggu → Diproses → Selesai. Chat WA + revisi tercatat.'],
            ['3️⃣', 'Acara jalan + LPJ aman', 'Nota resmi, rating terverifikasi, peluang magang terbuka.'],
          ].map(([e, t, d]) => (
            <div key={t} className="rounded-2xl bg-white/10 p-5">
              <div className="text-3xl">{e}</div>
              <b className="mt-2 block">{t}</b>
              <p className="text-sm opacity-80">{d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* BUNDLING */}
      <div>
        <SectionTitle kicker="PAKET HEMAT" title="Paket Bundling Acara" sub="1 RFQ untuk 3 vendor — lebih murah, 1 nota" />
        <div className="grid gap-4 md:grid-cols-3">
          {BUNDLES.map((b) => (
            <div key={b.id} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5">
              <div className="text-4xl">{b.emoji}</div>
              <b className="font-display mt-2 text-lg">{b.name}</b>
              <ul className="my-2 ml-4 list-disc text-sm text-slate-600">
                {b.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <p className="font-extrabold text-blue-800">{b.price}</p>
              <p className="text-[13px] text-emerald-700">💚 {b.save}</p>
              <Button className="mt-3 w-full" onClick={() => onBundle(b)}>
                Pesan Paket Ini
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* TESTIMONI */}
      <div>
        <SectionTitle kicker="TESTIMONI" title="Kata Panitia & UKM" sub="" />
        <div className="grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="text-amber-500">{t.stars}</div>
              <blockquote className="mt-2 text-sm">“{t.text}”</blockquote>
              <figcaption className="mt-2 text-[13px] font-bold text-slate-500">— {t.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* PRICING */}
      <div id="harga">
        <SectionTitle kicker="HARGA" title="Gratis untuk Kampus" sub="Komisi 0% tahap rintisan — fokus ke adopsi 8 fakultas dulu" />
        <div className="grid gap-4 md:grid-cols-3">
          {PRICING.map((p) => (
            <div
              key={p.name}
              className={`flex flex-col rounded-2xl border p-5 ${
                p.highlight ? 'border-blue-600 bg-blue-50 shadow-lg' : 'border-slate-200 bg-white'
              }`}
            >
              <b>{p.name}</b>
              <div className="font-display my-1 text-2xl font-bold">{p.price}</div>
              <ul className="my-2 grid gap-1.5 text-sm text-slate-600">
                {p.features.map((f) => (
                  <li key={f}>✅ {f}</li>
                ))}
              </ul>
              <Button
                variant={p.highlight ? 'blue' : 'outline'}
                className="mt-auto w-full"
                onClick={p.name.includes('Panitia') ? onCatalog : p.name.includes('Alumni') ? onRegister : onLogin}
              >
                {p.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="mx-auto w-full max-w-3xl">
        <SectionTitle kicker="FAQ" title="Sering Ditanyakan" sub="" />
        <div className="grid gap-2.5">
          {FAQS.map((f) => (
            <details key={f.q} className="rounded-2xl border border-slate-200 bg-white p-4">
              <summary className="cursor-pointer font-bold">{f.q}</summary>
              <p className="mt-2 text-sm text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-6 rounded-2xl bg-gradient-to-br from-blue-700 to-blue-500 p-6 text-center text-white">
          <h3 className="font-display text-xl font-bold">Siap bawa acaramu ke vendor alumni?</h3>
          <p className="mb-4 text-sm opacity-90">Dies Natalis • PKKMB • Seminar • Bazar — semua bisa via 1 RFQ.</p>
          <div className="flex flex-wrap justify-center gap-2.5">
            <Button variant="white" onClick={onCatalog}>
              Mulai Sekarang →
            </Button>
            <Button variant="ghostLight" onClick={onRegister}>
              Daftar Gratis
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
