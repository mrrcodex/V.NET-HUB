import { Badge, Button } from '../ui/controls.tsx';
import { VENDOR_CATEGORIES } from '../../data/catalog.ts';
import type { Vendor } from '../../types.ts';

export function Hero({ onExplore, onJobs }: { onExplore: () => void; onJobs: () => void }) {
  return (
    <div className="relative grid gap-5 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-blue-400 p-8 text-white md:grid-cols-[1.2fr_.8fr] md:p-9">
      <div className="pointer-events-none absolute -right-16 -top-16 h-80 w-80 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-24 right-20 h-56 w-56 rounded-full bg-white/10" />
      <div className="relative z-[1]">
        <span className="inline-flex rounded-full border border-white/30 bg-white/20 px-3 py-1.5 text-[13px] font-semibold">
          🔵 Circular Economy • Kampus × Alumni
        </span>
        <h1 className="font-display my-2.5 text-3xl font-bold leading-tight md:text-[32px]">Cari Vendor untuk Acara Kampusmu!</h1>
        <p className="mb-4 opacity-90">
          Terhubung langsung dengan UMKM milik alumni terverifikasi — konsumsi, konveksi, percetakan, dokumentasi &amp;
          lainnya. Harga transparan, kualitas terjamin.
        </p>
        <div className="flex flex-wrap gap-2.5">
          <Button variant="white" onClick={onExplore}>
            Jelajahi Katalog →
          </Button>
          <Button variant="ghostLight" onClick={onJobs}>
            Cari Magang / Proyek
          </Button>
        </div>
      </div>
      <div className="relative z-[1] self-center rounded-2xl bg-white p-4 text-slate-900 shadow-xl">
        <b>🤝 Ekosistem V.NET-HUB</b>
        <p className="text-[13px] text-slate-500">Mahasiswa dapat vendor tepercaya • Alumni dapat pasar B2B captive</p>
        <div className="mt-3 flex gap-3 ">
          {[
            ['120+', 'UMKM Alumni'],
            ['350+', 'Acara Dilayani'],
            ['85', 'Magang Aktif'],
          ].map(([n, l]) => (
            <div key={l} className="flex-1 rounded-xl bg-blue-50 p-2.5 text-center">
              <b className="block text-lg text-blue-800">{n}</b>
              <span className="text-xs text-slate-500">{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CategoryPills({ active, onChange }: { active: string; onChange: (c: string) => void }) {
  return (
    <div className="my-3.5 flex flex-wrap gap-2.5">
      {VENDOR_CATEGORIES.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={`rounded-full border px-[18px] py-2 text-sm font-semibold transition ${
            active === c
              ? 'border-slate-900 bg-slate-900 text-white'
              : 'border-slate-200 bg-white text-slate-500 hover:border-blue-600 hover:text-blue-600'
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

interface VendorCardProps {
  vendor: Vendor;
  onQuote: (v: Vendor) => void;
  onDetail: (v: Vendor) => void;
}

export function VendorCard({ vendor, onQuote, onDetail }: VendorCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_24px_rgba(37,99,235,.08)]">
      <div className="relative flex h-[170px] items-center justify-center text-6xl" style={{ background: vendor.bg }}>
        {vendor.emoji}
        <span className="absolute left-3 top-3">
          <Badge>✔ Alumni Verified</Badge>
        </span>
        <span className="absolute bottom-3 left-3 rounded-full bg-slate-900/85 px-2.5 py-1 text-xs font-semibold text-white">
          {vendor.cat}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-display text-[17px] font-bold">{vendor.name}</h3>
        <div className="flex flex-wrap items-center gap-2 text-[13px] text-slate-500">
          <span className="font-bold text-amber-500">★ {vendor.rating}</span>•<span>{vendor.desc}</span>
        </div>
        <div className="font-extrabold text-blue-800">{vendor.price}</div>
        <div className="mt-auto flex gap-2 pt-2">
          <Button className="flex-1 !py-2.5" onClick={() => onQuote(vendor)}>
            Minta Penawaran
          </Button>
          <Button variant="outline" className="flex-1 !py-2.5" onClick={() => onDetail(vendor)}>
            Detail
          </Button>
        </div>
      </div>
    </article>
  );
}
