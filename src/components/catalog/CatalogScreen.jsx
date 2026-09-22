import { useMemo, useState } from 'react';
import { Hero, CategoryPills, VendorCard } from '../catalog/catalog.jsx';
import { VENDORS } from '../../data/catalog.js';

export function CatalogScreen({ query, onQuote, onDetail, onJobs }) {
  const [cat, setCat] = useState('Semua');

  const list = useMemo(() => {
    const q = query.toLowerCase();
    return VENDORS.filter(
      (v) =>
        (cat === 'Semua' || v.cat === cat) &&
        (v.name.toLowerCase().includes(q) || v.desc.toLowerCase().includes(q) || v.cat.toLowerCase().includes(q)),
    );
  }, [cat, query]);

  const scrollToKatalog = () => document.getElementById('katalog')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div>
      <Hero onExplore={scrollToKatalog} onJobs={onJobs} />
      <div className="mb-3.5 mt-7 flex flex-wrap items-end justify-between gap-3" id="katalog">
        <div>
          <h2 className="font-display text-[22px] font-bold">Direktori Bisnis Alumni</h2>
          <p className="text-sm text-slate-500">Modul Direktori &amp; Informasi Bisnis — semua vendor ber-badge Alumni Verified</p>
        </div>
        <span className="text-[13px] text-slate-500">{list.length} vendor ditemukan</span>
      </div>
      <CategoryPills active={cat} onChange={setCat} />
      <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
        {list.map((v) => (
          <VendorCard key={v.name} vendor={v} onQuote={onQuote} onDetail={onDetail} />
        ))}
      </div>
      {!list.length && <p className="text-slate-500">Tidak ada vendor cocok. Coba kata kunci / kategori lain.</p>}
    </div>
  );
}
