import { useCallback, useEffect, useState } from 'react';
import { Topbar, Footer, Toast } from './components/layout/chrome.jsx';
import { CatalogScreen } from './components/catalog/CatalogScreen.jsx';
import { DashboardScreen } from './components/dashboard/DashboardScreen.jsx';
import { JobsBoard } from './components/jobs/JobsBoard.jsx';
import { RfqModal } from './components/rfq/RfqModal.jsx';
import { INITIAL_JOBS, INITIAL_PRODUCTS } from './data/catalog.js';
import { useB2B } from './hooks/useB2B.js';
import { useToast } from './hooks/useToast.js';

const ALUMNI_PATHS = ['dashboard', 'katalog', 'pesanan', 'magang', 'profil'];

function routeFromHash() {
  const h = window.location.hash;
  if (h.startsWith('#/alumni/')) {
    const p = h.replace('#/alumni/', '');
    if (ALUMNI_PATHS.includes(p)) return { screen: 'dashboard', path: p };
  }
  return null;
}

export default function App() {
  const [screen, setScreen] = useState('catalog');
  const [alumniPath, setAlumniPath] = useState('dashboard');
  const [query, setQuery] = useState('');
  const [rfqVendor, setRfqVendor] = useState(null);
  const [cancelTarget, setCancelTarget] = useState(null);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [jobs, setJobs] = useState(INITIAL_JOBS);

  const b2b = useB2B();
  const toast = useToast();

  // deep-link: #/alumni/<path>
  useEffect(() => {
    const apply = () => {
      const r = routeFromHash();
      if (r) {
        setScreen(r.screen);
        setAlumniPath(r.path);
      }
    };
    apply();
    window.addEventListener('hashchange', apply);
    return () => window.removeEventListener('hashchange', apply);
  }, []);

  const go = useCallback((id) => {
    setScreen(id);
    if (id === 'dashboard' && !window.location.hash.startsWith('#/alumni')) {
      history.replaceState(null, '', '#/alumni/dashboard');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const subGo = useCallback(
    (path) => {
      setAlumniPath(path);
      setScreen('dashboard');
      history.replaceState(null, '', `#/alumni/${path}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [],
  );

  const submitRfq = useCallback(
    (draft) => {
      if (!draft) {
        toast.show('⚠️ Lengkapi Nama Acara, Tanggal & Detail Pesanan');
        return;
      }
      b2b.pushOrder({
        t: draft.event,
        s: `Dari: ${rfqVendor?.name ?? 'Katalog'} • ${draft.date}${draft.budget ? ' • ' + draft.budget : ''}`,
        vendor: rfqVendor?.name ?? '-',
        detail: draft.detail,
      });
      setRfqVendor(null);
      toast.show(`✅ RFQ terkirim ke ${rfqVendor?.name ?? 'vendor'}! Klik Pesanan (B2B) untuk pantau.`);
      setTimeout(() => {
        if (window.confirm('RFQ terkirim! Buka #/alumni/pesanan untuk melihat symlink pesanan?')) subGo('pesanan');
      }, 400);
    },
    [b2b, rfqVendor, subGo, toast],
  );

  const postJob = useCallback((draft) => {
    const tag = draft.type === 'Magang' ? 't-mag' : draft.type === 'Freelance' ? 't-proj' : 't-case';
    setJobs((prev) => [
      {
        type: draft.type,
        title: draft.title,
        by: 'Dapur Alumni Bu Rina • ✔ Verified',
        loc: 'Hybrid • Malang',
        desc: draft.desc,
        detail: [draft.desc, 'Diposting gratis (verified merchant)'],
        tag,
        mine: true,
      },
      ...prev,
    ]);
  }, []);

  return (
    <div className="min-h-screen">
      <Topbar
        screen={screen}
        onNav={go}
        query={query}
        onQuery={setQuery}
        persona={screen === 'dashboard' ? 'Alumni (Vendor)' : 'Mahasiswa'}
      />

      <main className="mx-auto max-w-6xl px-5 pb-20 pt-6">
        {screen === 'catalog' && (
          <CatalogScreen
            query={query}
            onQuote={setRfqVendor}
            onDetail={(v) => toast.show(`Membuka profil ${v.name} (demo)`)}
            onJobs={() => go('jobs')}
          />
        )}

        {screen === 'dashboard' && (
          <DashboardScreen
            path={alumniPath}
            onNav={subGo}
            b2b={b2b}
            products={products}
            onAddProduct={(p) => setProducts((prev) => [...prev, p])}
            onDeleteProduct={(i) => setProducts((prev) => prev.filter((_, x) => x !== i))}
            jobs={jobs}
            onPostJob={postJob}
            cancel={{ open: !!cancelTarget, target: cancelTarget }}
            onCancelModal={setCancelTarget}
            toast={toast.show}
            onPreview={() => go('catalog')}
            onViewBoard={() => go('jobs')}
          />
        )}

        {screen === 'jobs' && (
          <JobsBoard
            jobs={jobs}
            onApply={(fileName) =>
              toast.show(fileName ? `🚀 Lamaran + ${fileName} terkirim ke alumni!` : '⚠️ Pilih file proposal/portofolio dulu (demo)')
            }
          />
        )}
      </main>

      <RfqModal open={!!rfqVendor} vendor={rfqVendor} onClose={() => setRfqVendor(null)} onSubmit={submitRfq} />

      <Toast message={toast.message} visible={toast.visible} />
      <Footer />
    </div>
  );
}
