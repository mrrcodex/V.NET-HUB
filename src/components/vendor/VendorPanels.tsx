import { Button, Modal, StatusPill } from '../ui/controls.tsx';
import { getWA, waOrderLink } from '../../utils/wa.ts';
import type { UseB2B } from '../../hooks/useB2B.ts';
import type { Vendor } from '../../types.ts';

const REVIEWS = [
  { by: 'BEM FEB', text: '600 box datang tepat waktu, rasa konsisten.', stars: '★★★★★' },
  { by: 'HIMA TI', text: 'Respons cepat, bisa revisi H-1.', stars: '★★★★★' },
  { by: 'UKM Kewirausahaan', text: 'Nota rapi, cocok untuk LPJ.', stars: '★★★★☆' },
];

export function VendorDetailModal({ vendor, onClose, onQuote }: { vendor: Vendor | null; onClose: () => void; onQuote: (v: Vendor) => void }) {
  if (!vendor) return null;
  const wa = getWA(vendor.name);

  return (
    <Modal open={!!vendor} onClose={onClose} title={vendor.name} subtitle={`${vendor.cat} • ✔ Alumni UPNVJT Verified • ★ ${vendor.rating}`}>
      <div className="flex h-32 items-center justify-center rounded-2xl text-6xl" style={{ background: vendor.bg }}>
        {vendor.emoji}
      </div>
      <p className="text-sm text-slate-600">{vendor.desc}</p>
      <div className="rounded-2xl bg-blue-50 p-3 text-sm">
        <b className="text-blue-800">{vendor.price}</b>
        <p className="text-slate-500">Kapasitas: {vendor.cap ?? 'hingga 2000 pax • bisa custom'} • SLA respons &lt; 1×24 jam</p>
      </div>
      <div>
        <b className="text-sm">Ulasan terverifikasi</b>
        <div className="mt-2 grid gap-2">
          {REVIEWS.map((r) => (
            <div key={r.by} className="rounded-xl border border-slate-200 p-3 text-sm">
              <span className="text-amber-500">{r.stars}</span> <b>{r.by}</b>
              <p className="text-slate-600">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button className="flex-1" onClick={() => onQuote(vendor)}>
          📨 Minta Penawaran
        </Button>
        <Button variant="wa" className="flex-1" onClick={() => window.open(waOrderLink(vendor.name, 'konsultasi awal'), '_blank')}>
          💬 WA {wa.phone}
        </Button>
      </div>
    </Modal>
  );
}

export function MyOrdersScreen({ b2b, onCatalog }: { b2b: UseB2B; onCatalog: () => void }) {
  const groups: [string, UseB2B['kanban']['Menunggu']][] = [
    ['Menunggu', b2b.kanban.Menunggu],
    ['Diproses', b2b.kanban.Diproses],
    ['Selesai', b2b.kanban.Selesai],
  ];
  const total = groups.reduce((a, [, l]) => a + l.length, 0);

  return (
    <div>
      <h2 className="font-display text-[22px] font-bold">Pesanan Saya — Lacak RFQ</h2>
      <p className="mb-4 text-sm text-slate-500">
        Timeline pesananmu sebagai panitia. Data sama dengan kanban alumni (state `useB2B` bersama) • {total} pesanan •{' '}
        {b2b.cancelled.length} dibatalkan
      </p>
      {!total && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <div className="text-5xl">📦</div>
          <b>Belum ada RFQ</b>
          <p className="mb-4 text-sm text-slate-500">Kirim penawaran pertama ke vendor alumni UPNVJT.</p>
          <Button onClick={onCatalog}>Cari Vendor →</Button>
        </div>
      )}
      <div className="grid items-start gap-4 lg:grid-cols-3">
        {groups.map(([st, list]) => (
          <div key={st} className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <StatusPill status={st} />
              <span className="text-xs text-slate-400">{list.length}</span>
            </div>
            <div className="grid gap-2.5">
              {list.map((o, i) => (
                <div key={`${o.t}-${i}`} className="rounded-xl bg-slate-50 p-3 text-sm">
                  <b>{o.t}</b>
                  <p className="text-slate-500">{o.s}</p>
                  <p className="text-slate-500">🏪 {o.vendor}</p>
                  {o.detail && <p className="mt-1 text-slate-600">📝 {o.detail}</p>}
                </div>
              ))}
              {!list.length && <p className="text-[13px] text-slate-400">— kosong —</p>}
            </div>
          </div>
        ))}
      </div>
      {!!b2b.cancelled.length && (
        <p className="mt-3 text-[13px] text-slate-500">❌ {b2b.cancelled.length} pesanan dibatalkan (lihat di Dashboard Alumni → Pesanan).</p>
      )}
    </div>
  );
}
