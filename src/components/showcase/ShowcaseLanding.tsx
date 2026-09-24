import { useMemo, useState } from 'react';
import { Button } from '../ui/controls.tsx';
import { UpnHero } from '../hero/UpnHero.tsx';
import { MorphDivider } from '../hero/MorphDivider.tsx';
import { useReveal } from '../../hooks/useReveal.ts';
import { PORTFOLIO_CASES, TESTIMONIALS, UPN_FACULTIES, UPN_IDENTITY } from '../../data/upn.ts';
import { PortfolioDetailModal } from '../portfolio/PortfolioScreen.tsx';
import type { Screen } from '../../types.ts';

function SectionTitle({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div className="mb-5 text-center">
      <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-extrabold text-blue-700">{kicker}</span>
      <h2 className="font-display mt-2 text-2xl font-bold">{title}</h2>
      {sub && <p className="mx-auto mt-1 max-w-2xl text-sm text-slate-500">{sub}</p>}
    </div>
  );
}

export type ShowcaseNext = Extract<Screen, 'catalog' | 'jobs' | 'dashboard' | 'admin'>;

interface ShowcaseLandingProps {
  initialId: string | null;
  onEnter: (next: ShowcaseNext) => void;
  onQuote: () => void;
  onClearCase: () => void;
}

function scrollToCerita() {
  document.getElementById('cerita')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function ShowcaseLanding({ initialId, onEnter, onQuote, onClearCase }: ShowcaseLandingProps) {
  const [faculty, setFaculty] = useState('Semua');
  const [activeId, setActiveId] = useState<string | null>(initialId);

  const list = useMemo(
    () => PORTFOLIO_CASES.filter((c) => faculty === 'Semua' || c.faculty.includes(faculty) || c.faculty.includes('Lintas') || c.faculty.includes('Universitas')),
    [faculty],
  );
  const active = PORTFOLIO_CASES.find((c) => c.id === (activeId ?? initialId)) || null;

  const closeModal = () => {
    setActiveId(null);
    onClearCase();
  };

  const revealRef = useReveal<HTMLDivElement>();

  return (
    <div>
      <UpnHero
        cardAction={
          <Button className="w-full" onClick={() => onEnter('catalog')}>
            Masuk &amp; Cari Vendor →
          </Button>
        }
      >
        <Button variant="white" onClick={() => onEnter('catalog')}>
          Masuk ke Aplikasi →
        </Button>
        <Button variant="ghostLight" onClick={scrollToCerita}>
          Lihat Cerita Sukses ↓
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

      {/* SHOWCASE INTI */}
      <div id="cerita" className="reveal scroll-mt-24">
        <SectionTitle
          kicker="CERITA SUKSES"
          title="Event Kampus yang Sudah Jalan"
          sub="Studi kasus nyata panitia × vendor alumni — klik kartu untuk detail, lalu masuk aplikasi untuk pesan serupa"
        />
        <div className="mb-4 flex flex-wrap justify-center gap-2">
          {['Semua', ...UPN_FACULTIES.map((f) => f.abbr)].map((f) => (
            <button
              key={f}
              onClick={() => setFaculty(f)}
              className={`rounded-full border px-3.5 py-1.5 text-[13px] font-bold transition ${
                faculty === f ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-500'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {list.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
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
        <div className="mt-5 p-8 pt-0 text-center">
          <Button variant="white" onClick={() => onEnter('catalog')}>
            Masuk untuk Kirim RFQ →
          </Button>
        </div>
        <MorphDivider from="#0f172a" to="#f8fafc" />
        </div>
      </div>

      {/* PILIH PERAN */}
      <div className="reveal">
        <SectionTitle kicker="MASUK APLIKASI" title="Pilih Peranmu" sub="Satu pintu masuk, tiga tujuan berbeda di dalam aplikasi utama" />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5">
            <div className="text-4xl">🎪</div>
            <b className="mt-2">Panitia Mahasiswa</b>
            <p className="mt-1 text-sm text-slate-500">Jelajah katalog, kirim RFQ, lacak pesanan, chat WA vendor.</p>
            <Button className="mt-3 w-full" onClick={() => onEnter('catalog')}>
              Masuk sebagai Panitia →
            </Button>
          </div>
          <div className="flex flex-col rounded-2xl border border-blue-600 bg-blue-50 p-5 shadow-lg">
            <div className="text-4xl">🏪</div>
            <b className="mt-2">Alumni UMKM</b>
            <p className="mt-1 text-sm text-slate-500">Kelola etalase, kanban B2B, posting magang gratis.</p>
            <Button className="mt-3 w-full" onClick={() => onEnter('dashboard')}>
              Masuk Dashboard Alumni →
            </Button>
          </div>
          <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5">
            <div className="text-4xl">🎖️</div>
            <b className="mt-2">Admin Kampus</b>
            <p className="mt-1 text-sm text-slate-500">Verifikasi merchant + pantau dampak circular per fakultas.</p>
            <Button variant="outline" className="mt-3 w-full" onClick={() => onEnter('admin')}>
              Masuk Admin Kampus →
            </Button>
          </div>
        </div>
        <div className="mt-4 text-center">
          <button className="text-sm font-bold text-blue-600 hover:underline" onClick={() => onEnter('jobs')}>
            atau langsung lihat Papan Magang &amp; Proyek →
          </button>
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
        <div className="mt-6 rounded-2xl bg-gradient-to-br from-blue-700 to-blue-500 p-6 text-center text-white">
          <h3 className="font-display text-xl font-bold">Siap bawa acaramu ke vendor alumni?</h3>
          <p className="mb-4 text-sm opacity-90">Dies Natalis • PKKMB • Seminar • Bazar — semua bisa via 1 RFQ di dalam aplikasi.</p>
          <div className="flex flex-wrap justify-center gap-2.5">
            <Button variant="white" onClick={() => onEnter('catalog')}>
              Masuk ke Aplikasi →
            </Button>
            <Button variant="ghostLight" onClick={scrollToCerita}>
              Baca Cerita Lagi
            </Button>
          </div>
        </div>
      </div>

      </div>

      <PortfolioDetailModal
        item={active}
        onClose={closeModal}
        onQuote={() => {
          closeModal();
          onQuote();
        }}
      />
    </div>
  );
}
