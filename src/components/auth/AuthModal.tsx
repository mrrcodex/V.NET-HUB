import { useState } from 'react';
import { Button, Field, Modal, inputCls } from '../ui/controls.tsx';
import { ROLES } from '../../hooks/useAuth.ts';
import { UPN_FACULTIES } from '../../data/upn.ts';
import type { AuthMode } from '../../hooks/useAuth.ts';
import type { AuthPayload, Role } from '../../types.ts';

interface AuthModalProps {
  open: boolean;
  mode: AuthMode;
  onMode: (m: AuthMode) => void;
  onClose: () => void;
  onSubmit: (p: AuthPayload | null) => void;
}

export function AuthModal({ open, mode, onMode, onClose, onSubmit }: AuthModalProps) {
  const [name, setName] = useState('');
  const [role, setRole] = useState<Role>('Mahasiswa');
  const [faculty, setFaculty] = useState(UPN_FACULTIES[0].abbr);
  const [nim, setNim] = useState('');
  const [business, setBusiness] = useState('');

  if (!open) return null;

  const submit = () => {
    if (!name || !nim) {
      onSubmit(null);
      return;
    }
    onSubmit({ name, role, faculty, nim, business });
    setName('');
    setNim('');
    setBusiness('');
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={mode === 'login' ? 'Masuk ke V.NET-HUB' : 'Daftar Akun Demo'}
      subtitle="Mock auth — tanpa backend, tersimpan di localStorage"
    >
      <div className="flex gap-2">
        {(['login', 'register'] as AuthMode[]).map((m) => (
          <button
            key={m}
            onClick={() => onMode(m)}
            className={`flex-1 rounded-xl px-3 py-2 text-sm font-bold transition ${
              mode === m ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            {m === 'login' ? 'Masuk' : 'Daftar'}
          </button>
        ))}
      </div>

      <Field label="Peran">
        <div className="flex flex-wrap gap-2">
          {ROLES.map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`rounded-full border px-3 py-1.5 text-[13px] font-bold transition ${
                role === r ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-200 bg-white text-slate-500'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </Field>

      <div className="grid gap-3.5 sm:grid-cols-2">
        <Field label={role === 'Alumni' ? 'Nama / Nama Usaha' : 'Nama Lengkap'}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="cth: Rizky — HIMA TI" className={inputCls} />
        </Field>
        <Field label={role === 'Alumni' ? 'NIM Alumni / Angkatan' : 'NIM'}>
          <input value={nim} onChange={(e) => setNim(e.target.value)} placeholder="cth: 230411100xxx" className={inputCls} />
        </Field>
      </div>

      {role !== 'Admin Kampus' && (
        <Field label="Fakultas">
          <select value={faculty} onChange={(e) => setFaculty(e.target.value)} className={inputCls}>
            {UPN_FACULTIES.map((f) => (
              <option key={f.abbr} value={f.abbr}>
                {f.abbr} — {f.name}
              </option>
            ))}
          </select>
        </Field>
      )}

      {mode === 'register' && role === 'Alumni' && (
        <Field label="Nama Usaha + NIB (opsional demo)">
          <input value={business} onChange={(e) => setBusiness(e.target.value)} placeholder="cth: Kopi Alumni Space • NIB 123…" className={inputCls} />
        </Field>
      )}

      <Button onClick={submit} className="!py-3.5">
        {mode === 'login' ? '🔑 Masuk Sekarang' : '🚀 Buat Akun Demo'}
      </Button>
      <small className="text-center text-slate-500">
        Mahasiswa pakai email @upnjatim.ac.id • Alumni diverifikasi NIM + IKABA (simulasi) • Tanpa password di demo
      </small>
    </Modal>
  );
}
