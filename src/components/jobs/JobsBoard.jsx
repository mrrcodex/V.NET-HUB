import { useState } from 'react';
import { Button, JOB_TAG_STYLES, Tag } from '../ui/controls.jsx';
import { JOB_FILTERS } from '../../data/catalog.js';

export function JobsBoard({ jobs, onApply }) {
  const [filter, setFilter] = useState('Semua');
  const [active, setActive] = useState(0);

  const filtered = jobs
    .map((j, i) => ({ ...j, i }))
    .filter((j) => filter === 'Semua' || j.type === filter);

  const current = jobs[active] ?? jobs[0];

  return (
    <div>
      <div className="mb-3.5 flex items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-[22px] font-bold">Papan Kolaborasi — Bounty &amp; Internship Board</h2>
          <p className="text-sm text-slate-500">Proyek lepas, studi kasus bisnis, dan magang dari UMKM alumni</p>
        </div>
      </div>
      <div className="mb-3.5 rounded-2xl border border-dashed border-emerald-300 bg-gradient-to-br from-emerald-50 to-blue-50 p-3.5 text-sm">
        🎉 <b>GRATIS posting</b> untuk merchant terverifikasi! Alumni dapat merekrut talenta mahasiswa dengan cepat.
      </div>
      <div className="grid items-start gap-4 lg:grid-cols-[380px_1fr]">
        <div>
          <div className="mb-3.5 flex flex-wrap gap-2.5">
            {JOB_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => { setFilter(f); setActive(0); }}
                className={`rounded-full border px-[18px] py-2 text-sm font-semibold transition ${
                  filter === f
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-200 bg-white text-slate-500 hover:border-blue-600 hover:text-blue-600'
                }`}
              >
                {f === 'Freelance' ? 'Proyek Lepas' : f}
              </button>
            ))}
          </div>
          <div className="grid gap-3">
            {filtered.map((j) => (
              <button
                key={j.i}
                onClick={() => setActive(j.i)}
                className={`w-full cursor-pointer rounded-2xl border bg-white p-4 text-left transition ${
                  j.i === active ? 'border-blue-600 ring-4 ring-blue-100' : 'border-slate-200 hover:border-blue-300'
                }`}
              >
                <Tag className={JOB_TAG_STYLES[j.tag] ?? 'bg-slate-100 text-slate-600'}>{j.type}</Tag>{' '}
                <Tag className={JOB_TAG_STYLES['t-free']}>FREE POST</Tag>
                <h4 className="mb-1 mt-2 text-[15px] font-bold">{j.title}</h4>
                <p className="text-[13px] text-slate-500">{j.by}<br />{j.loc}</p>
              </button>
            ))}
          </div>
        </div>
        {current && <JobDetail job={current} onApply={onApply} />}
      </div>
    </div>
  );
}

function JobDetail({ job, onApply }) {
  const [fileName, setFileName] = useState('');

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 lg:sticky lg:top-[78px]">
      <Tag className={JOB_TAG_STYLES[job.tag] ?? 'bg-slate-100 text-slate-600'}>{job.type}</Tag>{' '}
      <Tag className={JOB_TAG_STYLES['t-free']}>✔ Gratis diposting merchant terverifikasi</Tag>
      <h2 className="font-display mb-1 mt-2.5 text-[22px] font-bold">{job.title}</h2>
      <p className="text-sm text-slate-500">{job.by} • {job.loc}</p>
      <p className="mt-2.5 text-sm">{job.desc}</p>
      <ul className="my-2.5 ml-[18px] list-disc text-sm text-slate-700">
        {job.detail.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
      <div className="mt-3 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-4 text-center">
        📤 <b>Upload Proposal / Portofolio</b>
        <br />
        <small className="text-slate-500">PDF maks 5MB • langsung terkirim ke alumni</small>
        <br />
        <br />
        <input
          type="file"
          accept=".pdf,.doc,.docx,.zip"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? '')}
          className="text-[13px]"
        />
        <br />
        <br />
        <Button className="w-full" onClick={() => onApply(fileName)}>Lamar Sekarang</Button>
      </div>
    </div>
  );
}
