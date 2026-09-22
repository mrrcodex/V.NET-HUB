import { Button, Panel, StatusPill, inputCls, Field, Modal } from '../ui/controls.jsx';
import { getWA, waOrderLink, waCancelLink } from '../../utils/wa.js';
import { CANCEL_REASONS } from '../../data/catalog.js';
import { useState } from 'react';

const PATHS = [
  { id: 'dashboard', label: '📊 Dashboard' },
  { id: 'katalog', label: '🧾 Katalog Produk' },
  { id: 'pesanan', label: '📦 Pesanan (B2B)' },
  { id: 'magang', label: '💼 Lowongan Magang' },
  { id: 'profil', label: '🏪 Profil UMKM' },
];

export function AlumniSidebar({ path, onNav, b2bCount }) {
  return (
    <aside className="rounded-2xl bg-slate-900 p-4 text-slate-300 lg:sticky lg:top-[78px]">
      <div className="px-2.5 pb-4 font-extrabold text-white">🍔 Dapur Alumni Bu Rina</div>
      {PATHS.map((p) => (
        <button
          key={p.id}
          onClick={() => onNav(p.id)}
          className={`mb-1 flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${
            path === p.id ? 'bg-blue-600 text-white' : 'hover:bg-blue-600 hover:text-white'
          }`}
        >
          {p.label}
          {p.id === 'pesanan' && (
            <span className="ml-auto rounded-full bg-red-500 px-2 py-0.5 text-[11px] text-white">{b2bCount}</span>
          )}
        </button>
      ))}
      <div className="mt-3 rounded-xl bg-white/10 p-2.5 text-xs">
        💡 RFQ baru dari katalog mahasiswa otomatis masuk ke{' '}
        <button className="font-bold text-blue-300 hover:underline" onClick={() => onNav('pesanan')}>
          #/alumni/pesanan
        </button>
      </div>
    </aside>
  );
}

export function KpiCards({ masuk, diproses }) {
  const kpis = [
    { label: 'RFQ Masuk bulan ini', value: String(12 + masuk + diproses), hint: '▲ 22% vs bulan lalu', hot: true },
    { label: 'Pesanan Diproses', value: String(diproses), hint: 'Estimasi Rp 24,5 jt' },
    { label: 'Pesanan Selesai', value: '32', hint: 'Rating 4.9 / 5.0' },
    { label: 'Profil Dilihat', value: '1.240', hint: 'oleh panitia kampus' },
  ];
  return (
    <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((k) => (
        <div key={k.label} className="rounded-2xl border border-slate-200 bg-white p-4">
          <span className="text-[13px] text-slate-500">{k.label}</span>
          <b className="block text-[22px]">{k.value}</b>
          <span className={`text-[13px] ${k.hot ? 'text-green-600' : 'text-slate-500'}`}>{k.hint}</span>
        </div>
      ))}
    </div>
  );
}

export function RecentOrders({ orders, onManage }) {
  return (
    <Panel
      title="Ringkasan Pesanan B2B Terbaru"
      sub={
        <>
          Symlink langsung ke path pesanan — klik untuk kelola.{' '}
          <button className="font-bold text-blue-600 hover:underline" onClick={onManage}>
            Buka #/alumni/pesanan →
          </button>
        </>
      }
    >
      <div className="grid gap-2.5">
        {orders.slice(0, 3).map((r, i) => (
          <div
            key={i}
            className="flex flex-wrap items-center justify-between gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5"
          >
            <span>
              <b>{r.t}</b>
              <br />
              <small className="text-slate-500">{r.s}</small>
            </span>
            <Button variant="outline" className="!px-3 !py-2 !text-xs" onClick={onManage}>
              Kelola →
            </Button>
          </div>
        ))}
      </div>
    </Panel>
  );
}

export function ProductTable({ products, onAdd, onDelete }) {
  const [name, setName] = useState('');
  const [cat, setCat] = useState('Konsumsi');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  const save = () => {
    if (!name) {
      onAdd(null);
      return;
    }
    onAdd({ n: name, c: cat, p: price || '-', s: stock || '-' });
    setName('');
    setPrice('');
    setStock('');
  };

  return (
    <Panel title="Katalog Produk — #/alumni/katalog" sub="Produk ini tampil di Direktori Bisnis mahasiswa (Screen 1). Stok & harga terhubung ke RFQ.">
      <div className="overflow-x-auto">
        <table className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
              {['Produk', 'Kategori', 'Harga', 'Stok', 'Aksi'].map((h) => (
                <th key={h} className="px-3 py-2.5">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((x, i) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="border-t border-slate-200 px-3 py-2.5"><b>{x.n}</b></td>
                <td className="border-t border-slate-200 px-3 py-2.5">{x.c}</td>
                <td className="border-t border-slate-200 px-3 py-2.5">{x.p}</td>
                <td className="border-t border-slate-200 px-3 py-2.5">{x.s}</td>
                <td className="border-t border-slate-200 px-3 py-2.5">
                  <button className="font-bold text-blue-600 hover:underline" onClick={() => onDelete(i)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3.5 grid gap-3.5 sm:grid-cols-2">
        <Field label="Nama Produk">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="cth: Snack Box Premium" className={inputCls} />
        </Field>
        <Field label="Kategori">
          <select value={cat} onChange={(e) => setCat(e.target.value)} className={inputCls}>
            {['Konsumsi', 'Konveksi', 'Percetakan', 'Dokumentasi', 'Dekorasi'].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>
      </div>
      <div className="mt-3 grid gap-3.5 sm:grid-cols-2">
        <Field label="Harga">
          <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="cth: Rp 15.000 / pax" className={inputCls} />
        </Field>
        <Field label="Stok / Kapasitas">
          <input value={stock} onChange={(e) => setStock(e.target.value)} placeholder="cth: 2000 pax" className={inputCls} />
        </Field>
      </div>
      <div className="mt-3">
        <Button onClick={save}>+ Simpan ke Katalog</Button>
      </div>
    </Panel>
  );
}

function OrderCard({ order, status, onMove, onCancel, onCatalog }) {
  const wa = getWA(order.vendor ?? '-');
  const waUrl = waOrderLink(order.vendor ?? '-', order.t);
  return (
    <div className="grid gap-1.5 rounded-2xl border border-slate-200 bg-white p-3">
      <StatusPill status={status} />
      <b className="text-sm">{order.t}</b>
      <small className="text-xs text-slate-500">{order.s}</small>
      <small className="text-xs">
        🏪 Symlink:{' '}
        <button className="font-bold text-blue-600 hover:underline" onClick={onCatalog}>{order.vendor ?? '-'}</button>{' '}
        •{' '}
        <a className="font-bold text-blue-600 hover:underline" href={waUrl} target="_blank" rel="noreferrer">💬 Chat WA</a>
      </small>
      <div className="grid gap-1.5 rounded-lg border border-green-200 bg-green-50 p-2 text-xs">
        <small className="text-green-800">📞 Kontak WA: <b>{wa.phone}</b></small>
        <a className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-3 py-2 text-xs font-bold text-white hover:bg-green-600" href={waUrl} target="_blank" rel="noreferrer">
          💬 Hubungi via WhatsApp
        </a>
      </div>
      {order.detail && (
        <small className="rounded-lg border border-slate-200 bg-slate-50 p-1.5 text-xs">📝 {order.detail}</small>
      )}
      {status !== 'Selesai' ? (
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="flex-1 !px-2 !py-1.5 !text-xs" onClick={onMove}>
            Pindah → {status === 'Menunggu' ? 'Diproses' : 'Selesai'}
          </Button>
          <Button variant="danger" className="flex-1 !px-2 !py-1.5 !text-xs" onClick={onCancel}>❌ Batalkan</Button>
        </div>
      ) : (
        <small className="text-xs">★ Rating 5.0 dari panitia</small>
      )}
    </div>
  );
}

export function KanbanBoard({ kanban, cancelled, onMove, onCancel, onRestore, onDeleteCancelled, onCatalog }) {
  const cols = ['Menunggu', 'Diproses', 'Selesai'];
  return (
    <Panel
      title="Pesanan B2B — #/alumni/pesanan"
      sub="Kanban RFQ dari mahasiswa (Menunggu → Diproses → Selesai + Dibatalkan). Setiap kartu ter-symlink ke katalog, chat WA & detail acara. Klik untuk pindah status."
      action={<span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-extrabold text-blue-800">Dibatalkan: {cancelled.length}</span>}
    >
      <div className="grid gap-3.5 xl:grid-cols-4 md:grid-cols-2">
        {cols.map((st) => (
          <div key={st} className="flex min-h-[200px] flex-col gap-2.5 rounded-2xl border border-slate-200 bg-slate-100 p-3">
            <h4 className="flex items-center justify-between text-[13px] font-bold uppercase tracking-wider">
              {st}
              <span className="rounded-full border border-slate-200 bg-white px-2.5 py-px text-xs">{kanban[st].length}</span>
            </h4>
            {kanban[st].map((r, i) => (
              <OrderCard key={i} order={r} status={st} onMove={() => onMove(st, i)} onCancel={() => onCancel(st, i, r)} onCatalog={onCatalog} />
            ))}
          </div>
        ))}
        <div className="flex min-h-[200px] flex-col gap-2.5 rounded-2xl border border-red-200 bg-red-50 p-3">
          <h4 className="flex items-center justify-between text-[13px] font-bold uppercase tracking-wider">
            🗑 Dibatalkan
            <span className="rounded-full border border-slate-200 bg-white px-2.5 py-px text-xs">{cancelled.length}</span>
          </h4>
          {!cancelled.length && (
            <div className="rounded-2xl border border-red-200 bg-white p-3">
              <small className="text-slate-500">Belum ada pesanan dibatalkan.</small>
            </div>
          )}
          {cancelled.map((c, idx) => (
            <div key={idx} className="grid gap-1.5 rounded-2xl border border-red-200 bg-white p-3">
              <StatusPill status="Dibatalkan" />
              <b className="text-sm">{c.t}</b>
              <small className="text-xs text-slate-500">
                {c.s} • dari {c.from} • {c.at}
                <br />📝 <b>{c.reason}</b>{c.note ? ` — ${c.note}` : ''} • 🏪 {c.vendor}
              </small>
              <a
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-green-600"
                href={waCancelLink(c.vendor, c.t, c.reason, c.note)}
                target="_blank"
                rel="noreferrer"
              >
                💬 Info via WA
              </a>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" className="flex-1 !px-2 !py-1.5 !text-xs" onClick={() => onRestore(idx)}>↩ Pulihkan</Button>
                <Button variant="danger" className="flex-1 !px-2 !py-1.5 !text-xs" onClick={() => onDeleteCancelled(idx)}>Hapus</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

export function CancelModal({ open, info, onClose, onConfirm }) {
  const [reason, setReason] = useState(CANCEL_REASONS[0]);
  const [note, setNote] = useState('');
  const [notify, setNotify] = useState(true);

  if (!open) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="❌ Batalkan Pesanan B2B"
      subtitle={info}
      headerClass="bg-gradient-to-br from-red-800 to-red-500"
    >
      <Field label="Alasan Pembatalan">
        <select value={reason} onChange={(e) => setReason(e.target.value)} className={inputCls}>
          {CANCEL_REASONS.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </Field>
      <Field label="Catatan (opsional)">
        <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} placeholder="cth: Dapur penuh tanggal 20 Sep, tawarkan reschedule…" className={inputCls} />
      </Field>
      <label className="flex items-center gap-2 text-[13px]">
        <input type="checkbox" checked={notify} onChange={(e) => setNotify(e.target.checked)} className="h-4 w-4" />
        Kirim info pembatalan via WhatsApp setelah konfirmasi
      </label>
      <div className="flex flex-wrap gap-2.5">
        <Button variant="outline" className="flex-1" onClick={onClose}>Kembali</Button>
        <Button
          variant="danger"
          className="flex-[2] !py-3.5"
          onClick={() => {
            onConfirm({ reason, note: note.trim(), notify });
            setNote('');
            setReason(CANCEL_REASONS[0]);
            setNotify(true);
          }}
        >
          ❌ Konfirmasi Batalkan
        </Button>
      </div>
    </Modal>
  );
}

export function MagangPanel({ myJobs, onPost, onViewBoard }) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Magang');
  const [desc, setDesc] = useState('');

  const post = () => {
    if (!title) {
      onPost(null);
      return;
    }
    onPost({ title, type, desc: desc || 'Benefit menyusul' });
    setTitle('');
    setDesc('');
  };

  return (
    <Panel title="Lowongan Magang — #/alumni/magang" sub="GRATIS untuk merchant terverifikasi. Postingan otomatis tampil di Papan Kolaborasi mahasiswa.">
      <div className="mb-3.5 grid gap-2.5">
        {!myJobs.length && <small className="text-slate-500">Belum ada lowongan. Posting pertama gratis.</small>}
        {myJobs.map((j, i) => (
          <div key={i} className="flex flex-wrap items-center justify-between gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
            <span>
              <b>{j.title}</b>
              <br />
              <small className="text-slate-500">{j.desc}</small>
            </span>
            <button className="font-bold text-blue-600 hover:underline" onClick={onViewBoard}>Lihat di Papan →</button>
          </div>
        ))}
      </div>
      <div className="grid gap-3.5 sm:grid-cols-2">
        <Field label="Judul Lowongan">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="cth: Staff Dapur (Magang)" className={inputCls} />
        </Field>
        <Field label="Tipe">
          <select value={type} onChange={(e) => setType(e.target.value)} className={inputCls}>
            <option>Magang</option>
            <option>Freelance</option>
            <option>Studi Kasus</option>
          </select>
        </Field>
      </div>
      <div className="mt-3">
        <Field label="Deskripsi & Benefit">
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={3} placeholder="cth: Uang saku 1,5jt, 3 bulan, hybrid…" className={inputCls} />
        </Field>
      </div>
      <div className="mt-3 flex flex-wrap gap-2.5">
        <Button onClick={post}>🚀 Posting (Gratis)</Button>
        <Button variant="outline" onClick={onViewBoard}>Lihat di Papan Kolaborasi →</Button>
      </div>
    </Panel>
  );
}

export function ProfilePanel({ onSave, onPreview }) {
  return (
    <Panel title="Profil UMKM — #/alumni/profil" sub="Update deskripsi bisnis, kontak, alamat operasional, dan foto produk.">
      <div className="grid gap-3.5 sm:grid-cols-2">
        <Field label="Deskripsi Bisnis">
          <textarea rows={4} defaultValue="Catering & snack box kampus sejak 2019 oleh Alumni FEB'15. Bisa 100–2000 pax, halal & tepat waktu." className={inputCls} />
        </Field>
        <div className="grid content-start gap-3.5">
          <Field label="No. WhatsApp">
            <input defaultValue="0812-3456-7890" className={inputCls} />
          </Field>
          <Field label="Instagram / Sosial">
            <input defaultValue="@dapuralumni.rina" className={inputCls} />
          </Field>
        </div>
      </div>
      <div className="mt-3.5 grid gap-3.5 sm:grid-cols-2">
        <Field label="Alamat Operasional">
          <input defaultValue="Jl. Veteran No. 8, Malang (Dapur & Outlet)" className={inputCls} />
        </Field>
        <Field label="Foto Produk (URL / upload)">
          <input type="file" accept="image/*" className={inputCls} />
          <small className="-mt-1 text-slate-500">Pratinjau tersimpan lokal (demo).</small>
        </Field>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2.5">
        <Button onClick={onSave}>💾 Simpan Perubahan</Button>
        <Button variant="outline" onClick={onPreview}>👁 Lihat Etalase Publik</Button>
      </div>
    </Panel>
  );
}
