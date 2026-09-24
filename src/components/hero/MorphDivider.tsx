/** Gelombang morph pemisah antar section — murni SVG statis. */
export function MorphDivider({ flip = false, from = '#0b2a5b', to = '#f8fafc' }: { flip?: boolean; from?: string; to?: string }) {
  return (
    <div className={`w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="block h-[54px] w-full md:h-[72px]">
        <path
          d="M0,48 C240,90 480,0 720,36 C960,72 1200,90 1440,42 L1440,90 L0,90 Z"
          fill={to}
        />
        <path
          d="M0,62 C260,96 520,22 760,52 C1000,82 1220,96 1440,58 L1440,90 L0,90 Z"
          fill={from}
          opacity="0.25"
        />
      </svg>
    </div>
  );
}
