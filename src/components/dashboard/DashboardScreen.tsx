import { Button, Panel, Tag } from '../ui/controls.tsx';
import { waCancelLink } from '../../utils/wa.ts';
import {
  AlumniSidebar,
  CancelModal,
  KanbanBoard,
  KpiCards,
  MagangPanel,
  ProductTable,
  ProfilePanel,
  RecentOrders,
} from './alumni.tsx';
import type { AlumniPath, B2BOrder, CancelTarget, Job, JobDraft, Product, ToastFn } from '../../types.ts';
import type { UseB2B } from '../../hooks/useB2B.ts';

const PATH_LABEL: Record<AlumniPath, string> = {
  dashboard: 'Dashboard',
  katalog: 'Katalog Produk',
  pesanan: 'Pesanan (B2B)',
  magang: 'Lowongan Magang',
  profil: 'Profil UMKM',
};

interface DashboardScreenProps {
  path: AlumniPath;
  onNav: (p: AlumniPath) => void;
  b2b: UseB2B;
  products: Product[];
  onAddProduct: (p: Product) => void;
  onDeleteProduct: (i: number) => void;
  jobs: Job[];
  onPostJob: (draft: JobDraft) => void;
  cancel: { open: boolean; target: CancelTarget | null };
  onCancelModal: (t: CancelTarget | null) => void;
  toast: ToastFn;
  onPreview: () => void;
  onViewBoard: () => void;
}

export function DashboardScreen({
  path,
  onNav,
  b2b,
  products,
  onAddProduct,
  onDeleteProduct,
  jobs,
  onPostJob,
  cancel,
  onCancelModal,
  toast,
  onPreview,
  onViewBoard,
}: DashboardScreenProps) {
  const recent: B2BOrder[] = [...b2b.kanban.Menunggu, ...b2b.kanban.Diproses];
  const myJobs = jobs.filter((j) => j.by.includes('Bu Rina') || j.mine);

  return (
    <div>
      <div className="mb-3.5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-[22px] font-bold">Alumni Business Dashboard</h2>
          <p className="text-sm text-slate-500">Vendor View — Kelola pesanan B2B &amp; etalase usaha</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[13px] text-slate-500">
            V.NET-HUB / Alumni / <b className="text-blue-800">{PATH_LABEL[path]}</b>
            <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-extrabold text-blue-800">#/alumni/{path}</span>
          </div>
        </div>
        <Tag className="bg-blue-100 text-blue-700">✔ Alumni Verified Merchant</Tag>
      </div>

      <div className="grid items-start gap-[18px] lg:grid-cols-[250px_1fr]">
        <AlumniSidebar path={path} onNav={onNav} b2bCount={b2b.b2bCount} />

        <div className="grid gap-[18px]">
          {path === 'dashboard' && (
            <>
              <KpiCards masuk={b2b.kanban.Menunggu.length} diproses={b2b.kanban.Diproses.length} />
              <RecentOrders orders={recent} onManage={() => onNav('pesanan')} />
              <Panel title="Aksi Cepat" sub="Path utama pelaku UMKM">
                <div className="flex flex-wrap gap-2.5">
                  <Button onClick={() => onNav('katalog')}>+ Tambah Produk</Button>
                  <Button variant="outline" onClick={() => onNav('magang')}>+ Posting Magang (Gratis)</Button>
                  <Button variant="outline" onClick={() => onNav('profil')}>Edit Profil UMKM</Button>
                </div>
              </Panel>
            </>
          )}

          {path === 'katalog' && (
            <ProductTable
              products={products}
              onAdd={(p) => {
                if (!p) return toast('⚠️ Isi nama produk dulu');
                onAddProduct(p);
                toast(`✅ Produk "${p.n}" masuk katalog & tampil di direktori mahasiswa`);
              }}
              onDelete={(i) => {
                const name = products[i]?.n;
                onDeleteProduct(i);
                toast(`🗑 "${name}" dihapus dari katalog`);
              }}
            />
          )}

          {path === 'pesanan' && (
            <KanbanBoard
              kanban={b2b.kanban}
              cancelled={b2b.cancelled}
              onMove={(st, i) => {
                const next = b2b.moveOrder(st, i);
                toast(`📦 Pesanan dipindah ke ${next}`);
              }}
              onCancel={(st, i, item) => onCancelModal({ st, i, item })}
              onRestore={(idx) => {
                b2b.restoreCancelled(idx);
                toast('↩ Pesanan dipulihkan ke Menunggu');
              }}
              onDeleteCancelled={(idx) => {
                if (!window.confirm('Hapus permanen riwayat ini?')) return;
                b2b.deleteCancelled(idx);
                toast('🗑 Riwayat pembatalan dihapus permanen');
              }}
              onCatalog={() => onNav('katalog')}
            />
          )}

          {path === 'magang' && (
            <MagangPanel
              myJobs={myJobs}
              onPost={(draft) => {
                if (!draft) return toast('⚠️ Isi judul lowongan dulu');
                onPostJob(draft);
                toast('🎉 Lowongan terposting GRATIS & tampil di Papan Kolaborasi');
              }}
              onViewBoard={onViewBoard}
            />
          )}

          {path === 'profil' && <ProfilePanel onSave={() => toast('💾 Profil UMKM (#/alumni/profil) berhasil disimpan')} onPreview={onPreview} />}
        </div>
      </div>

      <CancelModal
        open={cancel.open}
        info={cancel.target ? `"${cancel.target.item.t}" • dari kolom ${cancel.target.st}` : ''}
        onClose={() => onCancelModal(null)}
        onConfirm={({ reason, note, notify }) => {
          if (!cancel.target) return;
          const { st, i, item } = cancel.target;
          b2b.cancelOrder(st, i, item, { reason, note });
          onCancelModal(null);
          toast(`❌ Pesanan dibatalkan dari ${st}: ${reason}`);
          if (notify) {
            window.open(waCancelLink(item.vendor ?? '-', item.t, reason, note), '_blank');
          }
        }}
      />
    </div>
  );
}
