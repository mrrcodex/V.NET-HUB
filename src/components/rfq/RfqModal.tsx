import { useState } from 'react';
import { Button, Field, Modal, inputCls } from '../ui/controls.tsx';
import type { RfqDraft, Vendor } from '../../types.ts';

interface RfqModalProps {
  open: boolean;
  vendor: Pick<Vendor, 'name' | 'cat' | 'emoji'> | null;
  onClose: () => void;
  onSubmit: (draft: RfqDraft | null) => void;
}

export function RfqModal({ open, vendor, onClose, onSubmit }: RfqModalProps) {
  const [event, setEvent] = useState('');
  const [date, setDate] = useState('');
  const [budget, setBudget] = useState('');
  const [detail, setDetail] = useState('');

  if (!open) return null;

  const submit = () => {
    if (!event || !date || !detail) {
      onSubmit(null);
      return;
    }
    onSubmit({ event, date, budget, detail });
    setEvent('');
    setDate('');
    setBudget('');
    setDetail('');
  };

  return (
    <Modal open={open} onClose={onClose} title="Request for Quotation (RFQ)" subtitle="Kirim kebutuhan acara langsung ke vendor alumni">
      <div className="flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-2.5 px-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl">{vendor?.emoji}</div>
        <div>
          <b>{vendor?.name}</b>
          <br />
          <small className="text-slate-500">{vendor?.cat} • ✔ Alumni Verified</small>
        </div>
      </div>
      <Field label="Nama Acara / Kepanitiaan">
        <input value={event} onChange={(e) => setEvent(e.target.value)} placeholder="cth: Dies Natalis FEB 2026 — Divisi Konsumsi" className={inputCls} />
      </Field>
      <div className="grid gap-3.5 sm:grid-cols-2">
        <Field label="Tanggal Acara">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
        </Field>
        <Field label="Estimasi Budget / Kuantitas">
          <input value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="cth: 500 box • Rp 15rb/box" className={inputCls} />
        </Field>
      </div>
      <Field label="Detail Pesanan / Spesifikasi">
        <textarea
          rows={4}
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          placeholder="cth: Snack box isi 3 + air mineral, antar ke GOR kampus jam 07.00, butuh nota & surat kerjasama…"
          className={inputCls}
        />
      </Field>
      <Button onClick={submit} className="!py-3.5 !text-[15px]">
        📨 Kirim Permintaan Penawaran
      </Button>
      <small className="text-center text-slate-500">Vendor biasanya merespons &lt; 1×24 jam • Tanpa biaya untuk mahasiswa</small>
    </Modal>
  );
}
