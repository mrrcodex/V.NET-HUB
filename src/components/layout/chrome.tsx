import type { AuthUser, Screen } from '../../types.ts';

interface TopbarProps {
  screen: Screen;
  onNav: (id: Screen) => void;
  query: string;
  onQuery: (q: string) => void;
  user: AuthUser | null;
  onLogin: () => void;
  onRegister: () => void;
  onLogout: () => void;
  showSearch: boolean;
  minimal?: boolean;
  onBrand?: () => void;
}

export function Topbar({ screen, onNav, query, onQuery, user, onLogin, onRegister, onLogout, showSearch, minimal, onBrand }: TopbarProps) {
  // Tab Portofolio dihapus — diganti Showcase Gate (#/) sebagai pintu masuk wajib.
  const tabs: { id: Screen; label: string }[] = [
    { id: 'showcase', label: 'Beranda' },
    { id: 'catalog', label: 'Katalog' },
    { id: 'jobs', label: 'Magang & Proyek' },
    { id: 'myorders', label: 'Pesanan Saya' },
    { id: 'dashboard', label: 'Dashboard Alumni' },
    { id: 'admin', label: 'Admin Kampus' },
  ];
  // Tab Beranda disembunyikan setelah masuk aplikasi —
  // jalan kembali ke gate tetap via klik logo (reset).
  const visibleTabs = minimal ? tabs : tabs.filter((t) => t.id !== 'showcase');
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-5 py-3">
        <button
          type="button"
          onClick={onBrand ?? (() => onNav('showcase'))}
          title="Keluar ke Beranda"
          aria-label="V.NET-HUB — keluar ke beranda"
          className="flex cursor-pointer items-center gap-2.5 rounded-xl text-xl font-extrabold transition hover:opacity-80 focus-visible:outline-2 focus-visible:outline-blue-600"
        >
          <img
            src="/logo.jpeg"
            alt="V.NET-HUB Logo"
            className="block h-[38px] w-[38px] rounded-[10px] border border-slate-200 bg-white object-contain"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          <span>
            V.NET-<b className="text-blue-600">HUB</b>
          </span>
        </button>
        {!minimal && (
          <nav className="ml-2 flex flex-wrap gap-1.5">
            {visibleTabs.map((t) => (
              <button
                key={t.id}
                onClick={() => onNav(t.id)}
                className={`rounded-full px-3.5 py-2 text-sm font-semibold transition ${
                  screen === t.id ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-blue-50 hover:text-blue-700'
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
        )}
        <div className="whitespace-nowrap rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
          🎖️ UPNVJT × Alumni
        </div>
        {!minimal && showSearch && (
          <div className="flex min-w-[180px] flex-1 items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3.5 py-2">
            <span>🔍</span>
            <input
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              placeholder="Cari UMKM alumni, produk, jasa…"
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
        )}
        {!user ? (
          <div className="ml-auto flex items-center gap-2">
            <button onClick={onLogin} className="rounded-xl px-3.5 py-2 text-sm font-bold text-slate-600 hover:text-blue-700">
              Masuk
            </button>
            <button onClick={onRegister} className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">
              Daftar Gratis
            </button>
          </div>
        ) : (
          <div className="ml-auto flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-900 to-blue-500 font-bold text-white" title={user.nim}>
              {(user.name?.[0] || 'U').toUpperCase()}
            </div>
            <div className="hidden leading-tight sm:block">
              <b className="block max-w-[140px] truncate text-[13px]">{user.name}</b>
              <span className="text-xs text-slate-500">{user.role} • {user.faculty}</span>
            </div>
            <button onClick={onLogout} className="rounded-xl border border-slate-200 px-3 py-2 text-[13px] font-bold text-slate-500 hover:text-red-600">
              Keluar
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-5 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-8 text-[13px] text-slate-500 md:grid-cols-4">
        <div>
          <b className="text-blue-700">V.NET-HUB</b>
          <p className="mt-1">Circular economy kampus × alumni. Panitia hemat, alumni laris, kampus berdampak.</p>
          <p className="mt-2">🎖️ Kolaborasi UPN "Veteran" Jawa Timur • Widya Mwat Yasa</p>
        </div>
        <div>
          <b className="text-slate-800">Platform</b>
          <p className="mt-1">Katalog Vendor • Cerita Sukses • Paket Bundling • Papan Magang • Lacak Pesanan</p>
        </div>
        <div>
          <b className="text-slate-800">Fakultas Mitra</b>
          <p className="mt-1">FEB • FAPERTA • FTS • FH • FK • FIK • FISIP • FAD</p>
        </div>
        <div>
          <b className="text-slate-800">Bantuan LPJ</b>
          <p className="mt-1">Nota resmi • Surat kerjasama • QRIS/transfer • Respons &lt; 1×24 jam</p>
        </div>
      </div>
      <div className="border-t border-slate-100 py-4 text-center text-xs text-slate-400">
        V.NET-HUB × UPNVJT Surabaya • Demo tanpa backend — data tersimpan di browser
      </div>
    </footer>
  );
}

export function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div
      className={`fixed bottom-6 left-1/2 z-[200] -translate-x-1/2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-all ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-5 opacity-0'
      }`}
    >
      {message}
    </div>
  );
}
