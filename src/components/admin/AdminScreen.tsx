import { useEffect, useState } from 'react';
import { Button, Panel, StatusPill } from '../ui/controls.tsx';
import { VENDORS } from '../../data/catalog.ts';
import { UPN_FACULTIES } from '../../data/upn.ts';
import type { Merchant, MerchantStatus, ToastFn } from '../../types.ts';
import type { UseB2B } from '../../hooks/useB2B.ts';

const ADMIN_KEY = 'vnet-hub-admin-v1';

const SEED: Merchant[] = [
  ...VENDORS.map((v, i) => ({
    name: v.name,
    cat: v.cat,
    owner: `Alumni ${['FEB\u201915', 'FT\u201916', 'FIK\u201917', 'FISIP\u201918', 'FAD\u201919', 'FAPERTA\u201920'][i % 6]}`,
    nim: `230411100${100 + i}`,
    faculty: ['FEB', 'FTS', 'FIK', 'FISIP', 'FAD', 'FAPERTA'][i % 6] ?? '-',
    status: 'verified' as MerchantStatus,
  })),
  { name: 'Sablon Kilat Gubeng', cat: 'Konveksi', owner: 'Alumni FT\u201921', nim: '230411100777', faculty: 'FTS', status: 'pending' as MerchantStatus },
  { name: 'Snack Sehat Rungkut', cat: 'Konsumsi', owner: 'Alumni FAPERTA\u201922', nim: '230411100778', faculty: 'FAPERTA', status: 'pending' as MerchantStatus },
];

function loadMerchants(): Merchant[] {
  try {
    const raw = localStorage.getItem(ADMIN_KEY);
    if (!raw) return SEED;
    const d: unknown = JSON.parse(raw);
    if (!Array.isArray(d)) return SEED;
    return (d as unknown[]).filter((m): m is Merchant => {
      if (typeof m !== 'object' || m === null) return false;
      const r = m as Record<string, unknown>;
      return typeof r['name'] === 'string' && typeof r['status'] === 'string';
    });
  } catch {
    return SEED;
  }
}

// Laporan per fakultas dihitung dari kanban aktif + angka basis demo
const BASE_REPORT: Record<string, { trx: number; nilai: string; magang: number }> = {
  FEB: { trx: 48, nilai: 'Rp 96 jt', magang: 18 },
  FIK: { trx: 32, nilai: 'Rp 41 jt', magang: 22 },
  FTS: { trx: 27, nilai: 'Rp 58 jt', magang: 9 },
  FISIP: { trx: 21, nilai: 'Rp 33 jt', magang: 12 },
  FAD: { trx: 12, nilai: 'Rp 28 jt', magang: 7 },
  FAPERTA: { trx: 9, nilai: 'Rp 14 jt', magang: 5 },
  FH: { trx: 6, nilai: 'Rp 9 jt', magang: 3 },
  FK: { trx: 4, nilai: 'Rp 6 jt', magang: 2 },
};

interface AdminScreenProps {
  b2b: UseB2B;
  toast: ToastFn;
  userName: string;
}

export function AdminScreen({ b2b, toast, userName }: AdminScreenProps) {
  const [merchants, setMerchants] = useState<Merchant[]>(loadMerchants);

  useEffect(() => {
    try {
      localStorage.setItem(ADMIN_KEY, JSON.stringify(merchants));
    } catch {
      /* abaikan */
    }
  }, [merchants]);

  const setStatus = (name: string, status: MerchantStatus) => {
    setMerchants((prev) => prev.map((m) => (m.name === name ? { ...m, status } : m)));
    toast(status === 'verified' ? `✅ ${name} terverifikasi — etalase tayang di katalog` : `🚫 ${name} ditandai ${status}`);
  };

  const pending = merchants.filter((m) => m.status === 'pending');
  const verified = merchants.filter((m) => m.status === 'verified');
  const liveOrders = b2b.kanban.Menunggu.length + b2b.kanban.Diproses.length + b2b.kanban.Selesai.length;

  return (
    <div className="grid gap-[18px]">
      <div>
        <h2 className="font-display text-[22px] font-bold">Admin Kampus — Kemahasiswaan UPNVJT</h2>
        <p className="text-sm text-slate-500">
          Login sebagai <b>{userName}</b> • Verifikasi merchant alumni + pantau dampak circular per fakultas
        </p>
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ['Merchant Terverifikasi', String(verified.length), 'tayang di katalog'],
          ['Menunggu Verifikasi', String(pending.length), 'perlu review'],
          ['Transaksi B2B (sesi ini)', String(liveOrders), 'dari kanban aktif'],
          ['Dibatalkan', String(b2b.cancelled.length), 'butuh mediasi?'],
        ].map(([label, value, hint]) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4">
            <span className="text-[13px] text-slate-500">{label}</span>
            <b className="block text-[22px]">{value}</b>
            <span className="text-[13px] text-slate-500">{hint}</span>
          </div>
        ))}
      </div>

      <Panel
        title="Verifikasi Merchant Alumni"
        sub="Setujui untuk menayangkan etalase ke katalog mahasiswa. Data tersimpan lokal (demo)."
        action={<span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-extrabold text-amber-800">{pending.length} antre</span>}
      >
        <div className="grid gap-2.5">
          {merchants.map((m) => (
            <div key={m.name} className="flex flex-wrap items-center justify-between gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
              <span className="text-sm">
                <b>{m.name}</b> <StatusPill status={m.status === 'verified' ? 'Selesai' : m.status === 'pending' ? 'Menunggu' : 'Dibatalkan'} />
                <br />
                <small className="text-slate-500">{m.cat} • {m.owner} • NIM {m.nim} • {m.faculty}</small>
              </span>
              <span className="flex gap-2">
                {m.status !== 'verified' && (
                  <Button className="!px-3 !py-2 !text-xs" onClick={() => setStatus(m.name, 'verified')}>✔ Verifikasi</Button>
                )}
                {m.status !== 'rejected' && (
                  <Button variant="danger" className="!px-3 !py-2 !text-xs" onClick={() => setStatus(m.name, 'rejected')}>Tolak</Button>
                )}
                {m.status === 'rejected' && (
                  <Button variant="outline" className="!px-3 !py-2 !text-xs" onClick={() => setStatus(m.name, 'pending')}>↩ Tinjau ulang</Button>
                )}
              </span>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Laporan Circular per Fakultas" sub="Basis demo + transaksi kanban sesi ini — bahan laporan rektorat.">
        <div className="overflow-x-auto">
          <table className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white text-sm">
            <thead>
              <tr className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
                {['Fakultas', 'Transaksi', 'Nilai kembali ke alumni', 'Magang tersalurkan'].map((h) => (
                  <th key={h} className="px-3 py-2.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {UPN_FACULTIES.map((f) => {
                const r = BASE_REPORT[f.abbr] ?? { trx: 0, nilai: '-', magang: 0 };
                return (
                  <tr key={f.abbr} className="hover:bg-slate-50">
                    <td className="border-t border-slate-200 px-3 py-2.5"><b>{f.abbr}</b> <small className="text-slate-500">{f.name}</small></td>
                    <td className="border-t border-slate-200 px-3 py-2.5">{r.trx + (f.abbr === 'FEB' ? liveOrders : 0)}</td>
                    <td className="border-t border-slate-200 px-3 py-2.5">{r.nilai}</td>
                    <td className="border-t border-slate-200 px-3 py-2.5">{r.magang}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
