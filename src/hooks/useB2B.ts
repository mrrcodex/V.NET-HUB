import { useCallback, useEffect, useState } from 'react';
import { INITIAL_KANBAN } from '../data/catalog.ts';
import type { B2BOrder, CancelledOrder, CancelMeta, Kanban, KanbanColumn } from '../types.ts';

const B2B_KEY = 'vnet-hub-b2b-v1';

interface B2BStored {
  kanban: Kanban;
  cancelled: CancelledOrder[];
}

function isB2BOrder(o: unknown): o is B2BOrder {
  if (typeof o !== 'object' || o === null) return false;
  const r = o as Record<string, unknown>;
  return typeof r['t'] === 'string' && typeof r['s'] === 'string';
}

function isKanban(k: unknown): k is Kanban {
  if (typeof k !== 'object' || k === null) return false;
  const r = k as Record<string, unknown>;
  return (
    Array.isArray(r['Menunggu']) &&
    (r['Menunggu'] as unknown[]).every(isB2BOrder) &&
    Array.isArray(r['Diproses']) &&
    (r['Diproses'] as unknown[]).every(isB2BOrder) &&
    Array.isArray(r['Selesai']) &&
    (r['Selesai'] as unknown[]).every(isB2BOrder)
  );
}

function loadInitial(): B2BStored {
  try {
    const raw = localStorage.getItem(B2B_KEY);
    if (!raw) return { kanban: INITIAL_KANBAN, cancelled: [] };
    const d: unknown = JSON.parse(raw);
    if (typeof d !== 'object' || d === null) return { kanban: INITIAL_KANBAN, cancelled: [] };
    const r = d as Record<string, unknown>;
    const kanban = isKanban(r['kanbanData']) ? r['kanbanData'] : INITIAL_KANBAN;
    const cancelled = Array.isArray(r['cancelledOrders'])
      ? (r['cancelledOrders'] as unknown[]).filter(isB2BOrder).map((o) => {
          const rec = o as Partial<CancelledOrder>;
          return {
            t: o.t,
            s: o.s,
            vendor: o.vendor,
            detail: o.detail,
            from: typeof rec.from === 'string' ? rec.from : '-',
            reason: typeof rec.reason === 'string' ? rec.reason : '-',
            note: typeof rec.note === 'string' ? rec.note : '',
            at: typeof rec.at === 'string' ? rec.at : '-',
          } satisfies CancelledOrder;
        })
      : [];
    return { kanban, cancelled };
  } catch {
    return { kanban: INITIAL_KANBAN, cancelled: [] };
  }
}

export function useB2B() {
  const [initial] = useState<B2BStored>(loadInitial);
  const [kanban, setKanban] = useState<Kanban>(initial.kanban);
  const [cancelled, setCancelled] = useState<CancelledOrder[]>(initial.cancelled);

  useEffect(() => {
    try {
      localStorage.setItem(B2B_KEY, JSON.stringify({ kanbanData: kanban, cancelledOrders: cancelled }));
    } catch {
      /* abaikan */
    }
  }, [kanban, cancelled]);

  const pushOrder = useCallback((order: B2BOrder) => {
    setKanban((prev) => ({ ...prev, Menunggu: [...prev.Menunggu, order] }));
  }, []);

  const moveOrder = useCallback((from: KanbanColumn, index: number): KanbanColumn => {
    setKanban((prev) => {
      const item = prev[from]?.[index];
      if (!item) return prev;
      const next: KanbanColumn = from === 'Menunggu' ? 'Diproses' : 'Selesai';
      return {
        ...prev,
        [from]: prev[from].filter((_, i) => i !== index),
        [next]: [...prev[next], item],
      };
    });
    return from === 'Menunggu' ? 'Diproses' : 'Selesai';
  }, []);

  /** Hapus item dari kolom + catat ke daftar dibatalkan. `item` dikirim dari komponen. */
  const cancelOrder = useCallback((from: KanbanColumn, index: number, item: B2BOrder, { reason, note }: CancelMeta) => {
    setKanban((prev) => ({ ...prev, [from]: prev[from].filter((_, i) => i !== index) }));
    setCancelled((prev) => [
      {
        t: item.t,
        s: item.s,
        vendor: item.vendor ?? '-',
        detail: item.detail ?? '-',
        from,
        reason,
        note,
        at: new Date().toLocaleString('id-ID'),
      },
      ...prev,
    ]);
  }, []);

  const restoreCancelled = useCallback((index: number) => {
    setCancelled((prev) => {
      const rec = prev[index];
      if (!rec) return prev;
      setKanban((k) => ({
        ...k,
        Menunggu: [...k.Menunggu, { t: rec.t, s: rec.s, vendor: rec.vendor, detail: rec.detail }],
      }));
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  const deleteCancelled = useCallback((index: number) => {
    setCancelled((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const b2bCount = kanban.Menunggu.length + kanban.Diproses.length;

  return { kanban, cancelled, b2bCount, pushOrder, moveOrder, cancelOrder, restoreCancelled, deleteCancelled };
}

export type UseB2B = ReturnType<typeof useB2B>;
