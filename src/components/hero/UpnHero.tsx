import { useState, type ReactNode } from 'react';
import { UPN_IDENTITY } from '../../data/upn.ts';

interface UpnHeroProps {
  children: ReactNode;
  cardAction?: ReactNode;
}

/**
 * Hero full-bleed statis untuk landing/showcase.
 * Latar: gradient navy + slot foto /hero-upn.jpg (opsional, fallback gradient) +
 * siluet menara twin tower UPN + blob morph CSS.
 */
export function UpnHero({ children, cardAction }: UpnHeroProps) {
  const [photoOk, setPhotoOk] = useState(true);

  return (
    <section className="relative w-full overflow-hidden bg-[#081c3f] text-white">
      {/* base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#081c3f] via-[#0b2a5b] to-[#1450a0]" aria-hidden="true" />

      {/* slot foto menara — taruh file di public/hero-upn.jpg untuk mengganti placeholder */}
      {photoOk && (
        <img
          src="/hero-upn.jpg"
          alt=""
          aria-hidden="true"
          onError={() => setPhotoOk(false)}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
      )}

      {/* pola grid samar (placeholder bila foto belum ada) */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        aria-hidden="true"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.25) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          maskImage: 'linear-gradient(to top, black 30%, transparent 85%)',
          WebkitMaskImage: 'linear-gradient(to top, black 30%, transparent 85%)',
        }}
      />

      {/* siluet twin tower UPN */}
      <svg viewBox="0 0 800 300" preserveAspectRatio="xMaxYMax meet" aria-hidden="true" className="absolute -bottom-1 right-0 h-[62%] w-full max-w-[900px] opacity-25 md:w-[62%]">
        <g fill="#ffffff">
          <rect x="470" y="60" width="90" height="240" rx="4" />
          <rect x="600" y="60" width="90" height="240" rx="4" />
          <rect x="470" y="130" width="220" height="18" rx="4" />
          <rect x="492" y="36" width="46" height="26" rx="3" />
          <rect x="622" y="36" width="46" height="26" rx="3" />
          {[90, 112, 160, 182, 210, 232].map((y) => (
            <g key={y} opacity="0.55">
              <rect x="482" y={y} width="66" height="10" rx="2" fill="#081c3f" />
              <rect x="612" y={y} width="66" height="10" rx="2" fill="#081c3f" />
            </g>
          ))}
          <rect x="300" y="180" width="130" height="120" rx="4" opacity="0.7" />
          <rect x="180" y="220" width="100" height="80" rx="4" opacity="0.5" />
        </g>
      </svg>

      {/* overlay keterbacaan */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#081c3f]/85 via-[#081c3f]/45 to-transparent" aria-hidden="true" />

      {/* morph blobs */}
      <div className="hero-blob left-[-90px] top-[-90px] h-72 w-72 bg-white/10" aria-hidden="true" />
      <div className="hero-blob hero-blob-slow right-[8%] top-[22%] h-44 w-44 bg-emerald-300/25" aria-hidden="true" />

      {/* konten */}
      <div className="relative z-[1] mx-auto grid w-full max-w-6xl gap-8 px-5 py-14 md:grid-cols-[1.15fr_.85fr] md:py-20">
        <div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-[13px] font-semibold backdrop-blur-sm">
              🎖️ {UPN_IDENTITY.tagline} • {UPN_IDENTITY.sesanti}
            </span>
            <span className="inline-flex rounded-full border border-white/30 bg-emerald-400/25 px-3 py-1.5 text-[13px] font-semibold backdrop-blur-sm">
              🤝 Resmi kolaborasi {UPN_IDENTITY.short}
            </span>
          </div>
          <h1 className="font-display my-4 text-4xl font-bold leading-[1.08] md:text-5xl">
            Circular Economy
            <br />
            Kampus × Alumni UPNVJT
          </h1>
          <p className="mb-6 max-w-xl text-[15px] leading-relaxed text-white/90">
            <b>V.NET-HUB</b> adalah platform circular economy kampus: panitia acara dari 8 fakultas memesan konsumsi,
            konveksi, cetak, dokumentasi &amp; dekor langsung ke UMKM alumni terverifikasi. Uang acara kembali ke
            ekosistem kampus — plus magang &amp; proyek untuk mahasiswa.
          </p>
          <div className="flex flex-wrap gap-2.5">{children}</div>
          <div className="mt-4 flex flex-wrap gap-2 text-[13px] text-white/85">
            <span>✔ Tanpa biaya untuk panitia</span>•<span>✔ Nota resmi untuk LPJ</span>•<span>✔ Respons &lt; 1×24 jam</span>
          </div>
          <div className="mt-5 grid max-w-xl grid-cols-4 gap-2">
            {UPN_IDENTITY.stats.map((s) => (
              <div key={s.l} className="rounded-xl border border-white/20 bg-white/10 p-2.5 text-center backdrop-blur-sm">
                <b className="block text-lg">{s.n}</b>
                <span className="text-xs text-white/75">{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="self-center rounded-2xl bg-white p-5 text-slate-900 shadow-2xl" style={{ animation: 'hero-float 7s ease-in-out infinite' }}>
          <b>📊 Dampak Ekosistem (live demo)</b>
          <p className="text-[13px] text-slate-500">Dihitung dari transaksi + kanban B2B aktif</p>
          <div className="mt-3 grid grid-cols-3 gap-2.5">
            {[['120+', 'UMKM Alumni'], ['350+', 'Acara Dilayani'], ['85', 'Magang Aktif']].map(([n, l]) => (
              <div key={l} className="rounded-xl bg-blue-50 p-2.5 text-center">
                <b className="block text-lg text-blue-800">{n}</b>
                <span className="text-xs text-slate-500">{l}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-xl bg-emerald-50 p-3 text-[13px] text-emerald-800">
            💰 <b>Rp 480 jt+</b> perputaran kembali ke alumni tahun ini
          </div>
          {cardAction && <div className="mt-3">{cardAction}</div>}
        </div>
      </div>
    </section>
  );
}
