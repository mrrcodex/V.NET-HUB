import { useMemo, useState } from 'react';
import { Button, Modal } from '../ui/controls.tsx';
import { PORTFOLIO_CASES, UPN_FACULTIES } from '../../data/upn.ts';
import type { PortfolioCase } from '../../types.ts';

export function PortfolioScreen({ initialId, onQuote }: { initialId: string | null; onQuote: () => void }) {
  const [faculty, setFaculty] = useState('Semua');
  const [activeId, setActiveId] = useState(initialId || null);
  const active = PORTFOLIO_CASES.find((c) => c.id === activeId) || null;

  const list = useMemo(
    () => PORTFOLIO_CASES.filter((c) => faculty === 'Semua' || c.faculty.includes(faculty) || c.faculty.includes('Lintas') || c.faculty.includes('Universitas')),
    [faculty],
  );

  return (
    <div>
      <h2 className="font-display text-[22px] font-bold">Portofolio Kolaborasi UPNVJT</h2>
      <p className="mb-3 text-sm text-slate-500">Event kampus × vendor alumni — klik kartu untuk studi kasus lengkap + tombol RFQ ulang.</p>
      <div className="mb-4 flex flex-wrap gap-2">
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
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl text-3xl" style={{ background: c.bg }}>
                {c.emoji}
              </div>
              <div>
                <b>{c.event}</b>
                <p className="text-[13px] text-blue-700">{c.theme}</p>
              </div>
            </div>
            <p className="mt-2 text-sm">✅ {c.result}</p>
            <p className="text-[13px] text-slate-500">💰 {c.budget} • {c.rating}</p>
          </button>
        ))}
      </div>
      <PortfolioDetailModal item={active} onClose={() => setActiveId(null)} onQuote={onQuote} />
    </div>
  );
}

export function PortfolioDetailModal({ item, onClose, onQuote }: { item: PortfolioCase | null; onClose: () => void; onQuote: () => void }) {
  if (!item) return null;
  return (
    <Modal open={!!item} onClose={onClose} title={item.event} subtitle={`${item.org} • ${item.faculty}`}>
      <p className="rounded-xl bg-blue-50 p-3 text-sm text-blue-800">
        <b>{item.theme}</b>
      </p>
      <p className="text-sm text-slate-600">{item.story}</p>
      <div className="grid gap-2 text-sm">
        <p>🏪 <b>Vendor:</b> {item.vendors.join(' • ')}</p>
        <p>💰 <b>Budget:</b> {item.budget}</p>
        <p>✅ <b>Hasil:</b> {item.result}</p>
        <p>⭐ <b>Rating:</b> {item.rating}</p>
      </div>
      <Button onClick={() => { onClose?.(); onQuote?.(); }}>📨 Pesan Event Serupa (RFQ)</Button>
    </Modal>
  );
}
