export function Topbar({ screen, onNav, query, onQuery, persona }) {
  const tabs = [
    { id: 'catalog', label: 'Katalog Vendor' },
    { id: 'dashboard', label: 'Dashboard Alumni' },
    { id: 'jobs', label: 'Papan Kolaborasi' },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-5 py-3">
        <div className="flex items-center gap-2.5 text-xl font-extrabold">
          <img
            src="/logo.jpeg"
            alt="V.NET-HUB Logo"
            className="block h-[38px] w-[38px] rounded-[10px] border border-slate-200 bg-white object-contain"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          <span>
            V.NET-<b className="text-blue-600">HUB</b>
          </span>
        </div>
        <nav className="ml-2 flex flex-wrap gap-1.5">
          {tabs.map((t) => (
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
        <div className="flex min-w-[180px] flex-1 items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3.5 py-2">
          <span>🔍</span>
          <input
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Cari UMKM alumni, produk, jasa…"
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-lg">
          🔔<span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500" />
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-900 to-blue-500 font-bold text-white">
          R
        </div>
        <div className="whitespace-nowrap rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
          {persona}
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-5 border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3 px-5 py-5 text-[13px] text-slate-500">
        <span>
          <b className="text-blue-700">V.NET-HUB</b> — Circular economy kampus × alumni • Blue Modern Minimalist
        </span>
        <span>Mahasiswa • Alumni UMKM • Kampus</span>
      </div>
    </footer>
  );
}

export function Toast({ message, visible }) {
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
