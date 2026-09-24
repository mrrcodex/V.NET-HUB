import { useCallback, useEffect, useState } from 'react';
import { Topbar, Footer, Toast } from './components/layout/chrome.tsx';
import { CatalogScreen } from './components/catalog/CatalogScreen.tsx';
import { DashboardScreen } from './components/dashboard/DashboardScreen.tsx';
import { JobsBoard } from './components/jobs/JobsBoard.tsx';
import { RfqModal } from './components/rfq/RfqModal.tsx';
import { LandingScreen } from './components/landing/LandingScreen.tsx';
import { ShowcaseLanding, type ShowcaseNext } from './components/showcase/ShowcaseLanding.tsx';
import { AuthModal } from './components/auth/AuthModal.tsx';
import { AdminScreen } from './components/admin/AdminScreen.tsx';
import { MyOrdersScreen, VendorDetailModal } from './components/vendor/VendorPanels.tsx';
import { INITIAL_JOBS, INITIAL_PRODUCTS } from './data/catalog.ts';
import { useB2B } from './hooks/useB2B.ts';
import { useToast } from './hooks/useToast.ts';
import { useAuth } from './hooks/useAuth.ts';
import type {
  AlumniPath,
  AuthPayload,
  Bundle,
  CancelTarget,
  Job,
  JobDraft,
  Product,
  RfqDraft,
  Screen,
  Vendor,
} from './types.ts';

const ALUMNI_PATHS: AlumniPath[] = ['dashboard', 'katalog', 'pesanan', 'magang', 'profil'];

const ENTER_KEY = 'vnet-hub-entered-v1';

function loadEntered(): boolean {
  try {
    return sessionStorage.getItem(ENTER_KEY) === '1';
  } catch {
    return false;
  }
}

function routeFromHash(): { screen: Screen; path: AlumniPath } | null {
  const h = window.location.hash;
  if (h.startsWith('#/alumni/')) {
    const p = h.replace('#/alumni/', '');
    if ((ALUMNI_PATHS as string[]).includes(p)) return { screen: 'dashboard', path: p as AlumniPath };
  }
  // Tab Portofolio dihapus — redirect ke Showcase Gate.
  if (h.startsWith('#/portofolio')) return { screen: 'showcase', path: 'dashboard' };
  if (h.startsWith('#/katalog')) return { screen: 'catalog', path: 'dashboard' };
  if (h.startsWith('#/admin')) return { screen: 'admin', path: 'dashboard' };
  return null;
}

type RfqVendor = Pick<Vendor, 'name' | 'cat' | 'emoji'>;

export default function App() {
  const [screen, setScreen] = useState<Screen>('showcase');
  const [hasEntered, setHasEntered] = useState<boolean>(loadEntered);
  const [alumniPath, setAlumniPath] = useState<AlumniPath>('dashboard');
  const [query, setQuery] = useState('');
  const [rfqVendor, setRfqVendor] = useState<RfqVendor | null>(null);
  const [bundleContext, setBundleContext] = useState<Bundle | null>(null);
  const [detailVendor, setDetailVendor] = useState<Vendor | null>(null);
  const [portfolioId, setPortfolioId] = useState<string | null>(null);
  const [cancelTarget, setCancelTarget] = useState<CancelTarget | null>(null);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);

  const b2b = useB2B();
  const toast = useToast();
  const auth = useAuth(toast.show);

  // deep-link — hormati gate: deep-link dalam aplikasi ditahan di showcase bila belum masuk
  useEffect(() => {
    const apply = () => {
      const r = routeFromHash();
      if (r) {
        if (!loadEntered() && r.screen !== 'showcase' && r.screen !== 'landing') {
          setScreen('showcase');
          setAlumniPath(r.path);
          history.replaceState(null, '', '#/');
          return;
        }
        setScreen(r.screen);
        setAlumniPath(r.path);
      }
    };
    apply();
    window.addEventListener('hashchange', apply);
    return () => window.removeEventListener('hashchange', apply);
  }, []);

  const go = useCallback((id: Screen) => {
    const target: Screen = id === 'portfolio' ? 'showcase' : id;
    setScreen(target);
    if (target === 'dashboard' && !window.location.hash.startsWith('#/alumni')) {
      history.replaceState(null, '', '#/alumni/dashboard');
    } else if (target === 'catalog') {
      history.replaceState(null, '', '#/katalog');
    } else if (target === 'admin') {
      history.replaceState(null, '', '#/admin');
    } else if (target === 'showcase' || target === 'landing' || target === 'jobs' || target === 'myorders') {
      history.replaceState(null, '', '#/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goGuarded = useCallback(
    (id: Screen) => {
      // Gate wajib: belum masuk aplikasi → tahan di showcase.
      if (!sessionStorage.getItem(ENTER_KEY) && id !== 'showcase' && id !== 'landing') {
        setScreen('showcase');
        history.replaceState(null, '', '#/');
        toast.show('👋 Klik Masuk ke Aplikasi dulu untuk menjelajah dashboard');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (id === 'dashboard') {
        auth.requireAuth(() => go(id), 'Alumni');
        return;
      }
      if (id === 'admin') {
        auth.requireAuth(() => go(id), 'Admin Kampus');
        return;
      }
      go(id);
    },
    [auth, go, toast],
  );

  const enterApp = useCallback(
    (next: ShowcaseNext) => {
      setHasEntered(true);
      try {
        sessionStorage.setItem(ENTER_KEY, '1');
      } catch {
        /* abaikan */
      }
      if (next === 'dashboard') {
        auth.requireAuth(() => go(next), 'Alumni');
        return;
      }
      if (next === 'admin') {
        auth.requireAuth(() => go(next), 'Admin Kampus');
        return;
      }
      go(next);
    },
    [auth, go],
  );

  const exitToGate = useCallback(() => {
    setHasEntered(false);
    try {
      sessionStorage.removeItem(ENTER_KEY);
    } catch {
      /* abaikan */
    }
    setScreen('showcase');
    history.replaceState(null, '', '#/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const subGo = useCallback((path: AlumniPath) => {
    setAlumniPath(path);
    setScreen('dashboard');
    history.replaceState(null, '', `#/alumni/${path}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const askQuote = useCallback(
    (vendor: Vendor) => {
      auth.requireAuth(() => {
        setBundleContext(null);
        setRfqVendor(vendor);
      });
    },
    [auth],
  );

  const askBundle = useCallback(
    (bundle: Bundle) => {
      auth.requireAuth(() => {
        setBundleContext(bundle);
        // RFQ bundling dikirim ke vendor pertama sebagai koordinator, detail mencantumkan semua vendor
        setRfqVendor({ name: `${bundle.vendors[0]} (+${bundle.vendors.length - 1} mitra)`, cat: bundle.name, emoji: bundle.emoji });
      });
    },
    [auth],
  );

  const submitRfq = useCallback(
    (draft: RfqDraft | null) => {
      if (!draft) {
        toast.show('⚠️ Lengkapi Nama Acara, Tanggal & Detail Pesanan');
        return;
      }
      const prefix = bundleContext ? `[${bundleContext.name}] ` : '';
      b2b.pushOrder({
        t: `${prefix}${draft.event}`,
        s: `Dari: ${rfqVendor?.name ?? 'Katalog'} • ${draft.date}${draft.budget ? ' • ' + draft.budget : ''}`,
        vendor: rfqVendor?.name ?? '-',
        detail: bundleContext
          ? `${draft.detail} | Paket: ${bundleContext.items.join('; ')} | Mitra: ${bundleContext.vendors.join(', ')}`
          : draft.detail,
      });
      const target = rfqVendor?.name ?? 'vendor';
      setRfqVendor(null);
      setBundleContext(null);
      toast.show(`✅ RFQ terkirim ke ${target}! Pantau di Pesanan Saya.`);
      setTimeout(() => go('myorders'), 500);
    },
    [b2b, rfqVendor, bundleContext, toast, go],
  );

  const postJob = useCallback(
    (draft: JobDraft) => {
      auth.requireAuth(() => {
        const tag = draft.type === 'Magang' ? 't-mag' : draft.type === 'Freelance' ? 't-proj' : 't-case';
        setJobs((prev) => [
          {
            type: draft.type,
            title: draft.title,
            by: `${auth.user?.name ?? 'Dapur Alumni Bu Rina'} • ✔ Verified`,
            loc: 'Hybrid • Malang',
            desc: draft.desc,
            detail: [draft.desc, 'Diposting gratis (verified merchant)'],
            tag,
            mine: true,
          },
          ...prev,
        ]);
      }, 'Alumni');
    },
    [auth],
  );

  const submitAuth = useCallback(
    (payload: AuthPayload | null) => {
      if (!payload) {
        toast.show('⚠️ Isi Nama & NIM dulu');
        return;
      }
      auth.login(payload);
    },
    [auth, toast],
  );

  return (
    <div className="min-h-screen">
      <Topbar
        screen={screen}
        onNav={goGuarded}
        onBrand={exitToGate}
        query={query}
        onQuery={setQuery}
        showSearch={hasEntered && screen === 'catalog'}
        minimal={!hasEntered}
        user={auth.user}
        onLogin={() => {
          auth.setAuthMode('login');
          auth.setAuthOpen(true);
        }}
        onRegister={() => {
          auth.setAuthMode('register');
          auth.setAuthOpen(true);
        }}
        onLogout={auth.logout}
      />

      <main className={screen === 'showcase' || screen === 'landing' ? 'pb-20' : 'mx-auto max-w-6xl px-5 pb-20 pt-6'}>
        {screen === 'showcase' && (
          <div className="pt-0">
            <ShowcaseLanding
              initialId={portfolioId}
              onEnter={enterApp}
              onQuote={() => enterApp('catalog')}
              onClearCase={() => setPortfolioId(null)}
            />
          </div>
        )}

        {screen === 'landing' && (
          <LandingScreen
            onCatalog={() => goGuarded('catalog')}
            onPortfolio={(id) => {
              setPortfolioId(id);
              go('showcase');
              requestAnimationFrame(() => document.getElementById('cerita')?.scrollIntoView({ behavior: 'smooth' }));
            }}
            onJobs={() => goGuarded('jobs')}
            onLogin={() => {
              auth.setAuthMode('login');
              auth.setAuthOpen(true);
            }}
            onRegister={() => {
              auth.setAuthMode('register');
              auth.setAuthOpen(true);
            }}
            onBundle={askBundle}
          />
        )}

        {screen === 'catalog' && (
          <CatalogScreen
            query={query}
            onQuote={askQuote}
            onDetail={setDetailVendor}
            onJobs={() => go('jobs')}
          />
        )}

        {/* Rute lama #/portofolio dialihkan ke Showcase Gate agar tidak 404 */}
        {screen === 'portfolio' && (
          <ShowcaseLanding
            initialId={portfolioId}
            onEnter={enterApp}
            onQuote={() => enterApp('catalog')}
            onClearCase={() => setPortfolioId(null)}
          />
        )}

        {screen === 'myorders' && <MyOrdersScreen b2b={b2b} onCatalog={() => go('catalog')} />}

        {screen === 'admin' && <AdminScreen b2b={b2b} toast={toast.show} userName={auth.user?.name ?? 'Admin'} />}

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
              auth.requireAuth(() => {
                toast.show(fileName ? `🚀 Lamaran + ${fileName} terkirim ke alumni!` : '⚠️ Pilih file proposal/portofolio dulu (demo)');
              })
            }
          />
        )}
      </main>

      <RfqModal open={!!rfqVendor} vendor={rfqVendor} onClose={() => { setRfqVendor(null); setBundleContext(null); }} onSubmit={submitRfq} />
      <VendorDetailModal vendor={detailVendor} onClose={() => setDetailVendor(null)} onQuote={(v) => { setDetailVendor(null); askQuote(v); }} />
      <AuthModal open={auth.authOpen} mode={auth.authMode} onMode={auth.setAuthMode} onClose={() => auth.setAuthOpen(false)} onSubmit={submitAuth} />

      <Toast message={toast.message} visible={toast.visible} />
      <Footer />
    </div>
  );
}
