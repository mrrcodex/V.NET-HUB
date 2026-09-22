export function Button({ variant = 'blue', className = '', ...props }) {
  const styles = {
    blue: 'bg-blue-600 text-white hover:bg-blue-700',
    white: 'bg-white text-blue-700 hover:bg-blue-50',
    outline: 'bg-white border border-slate-200 text-slate-800 hover:border-blue-600 hover:text-blue-600',
    wa: 'bg-green-500 text-white hover:bg-green-600',
    danger: 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 hover:border-red-400',
    ghostLight: 'bg-white/20 text-white border border-white/40 hover:bg-white/30',
  };
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${styles[variant] ?? styles.blue} ${className}`}
      {...props}
    />
  );
}

export function Badge({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-xs font-bold text-emerald-700 shadow ${className}`}>
      {children}
    </span>
  );
}

export function StatusPill({ status }) {
  const map = {
    Menunggu: 'bg-amber-100 text-amber-800',
    Diproses: 'bg-blue-100 text-blue-700',
    Selesai: 'bg-green-100 text-green-800',
    Dibatalkan: 'bg-red-100 text-red-800',
  };
  return (
    <span className={`inline-block w-max rounded-full px-2.5 py-1 text-[11px] font-extrabold ${map[status] ?? 'bg-slate-100 text-slate-600'}`}>
      {status}
    </span>
  );
}

export function Tag({ className = '', children }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-extrabold ${className}`}>
      {children}
    </span>
  );
}

export const JOB_TAG_STYLES = {
  't-mag': 'bg-green-100 text-green-800',
  't-free': 'bg-blue-100 text-blue-700',
  't-proj': 'bg-purple-100 text-purple-800',
  't-case': 'bg-amber-100 text-amber-800',
};

export function Field({ label, children }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-[13px] font-bold">{label}</span>
      {children}
    </label>
  );
}

export const inputCls =
  'w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100';

export function Panel({ title, sub, children, action }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-1 flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-bold">{title}</h3>
        {action}
      </div>
      {sub && <p className="mb-3.5 text-sm text-slate-500">{sub}</p>}
      {children}
    </section>
  );
}

export function Modal({ open, onClose, title, subtitle, headerClass = 'bg-gradient-to-br from-blue-700 to-blue-500', children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/55 p-4" onClick={(e) => e.target === e.currentTarget && onClose?.()}>
      <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white">
        <div className={`flex items-start justify-between gap-3 p-5 text-white ${headerClass}`}>
          <div>
            <h2 className="font-display text-xl font-bold">{title}</h2>
            {subtitle && <p className="text-sm opacity-90">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-lg text-white hover:bg-white/30"
            aria-label="Tutup"
          >
            ✕
          </button>
        </div>
        <div className="grid gap-3.5 p-5 sm:p-6">{children}</div>
      </div>
    </div>
  );
}
