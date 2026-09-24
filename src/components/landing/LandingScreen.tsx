import { Button, Badge } from '../ui/controls.tsx';
import { UpnHero } from '../hero/UpnHero.tsx';
import { MorphDivider } from '../hero/MorphDivider.tsx';
import { useReveal } from '../../hooks/useReveal.ts';
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
  const revealRef = useReveal<HTMLDivElement>();
  return (
    <div>
      <UpnHero>
        <Button variant="white" onClick={onCatalog}>
          Cari Vendor →
        </Button>
        <Button variant="ghostLight" onClick={onRegister}>
          Jadi Mitra Alumni
        </Button>
        <Button variant="ghostLight" onClick={onJobs}>
          Cari Magang
        </Button>
      </UpnHero>
      <div className="bg-[#081c3f]">
        <MorphDivider from="#081c3f" to="#f8fafc" />
      </div>

      <div ref={revealRef} className="mx-auto grid max-w-6xl gap-10 px-5 py-10">

      {/* TRUST BAR */}
      <div className="reveal rounded-2xl border border-slate-200 bg-white p-4">
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
      <div className="reveal">
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
      <div className="reveal">
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
      <div className="reveal overflow-hidden rounded-3xl bg-slate-900 text-white">
        <div className="p-8 pb-0">
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
        <MorphDivider from="#0f172a" to="#f8fafc" />
      </div>

      {/* BUNDLING */}
      <div className="reveal">
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
      <div className="reveal">
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
      <div className="reveal" id="harga">
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
      <div className="reveal mx-auto w-full max-w-3xl">
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
    </div>
  );
}
