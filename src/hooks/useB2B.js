import { useCallback, useEffect, useState } from 'react';
import { INITIAL_KANBAN } from '../data/catalog.js';

const B2B_KEY = 'vnet-hub-b2b-v1';

function loadInitial() {
  try {
    const raw = localStorage.getItem(B2B_KEY);
    if (!raw) return { kanban: INITIAL_KANBAN, cancelled: [] };
    const d = JSON.parse(raw);
    const kanban =
      d.kanbanData?.Menunggu && d.kanbanData?.Diproses && d.kanbanData?.Selesai ? d.kanbanData : INITIAL_KANBAN;
    return { kanban, cancelled: Array.isArray(d.cancelledOrders) ? d.cancelledOrders : [] };
  } catch {
    return { kanban: INITIAL_KANBAN, cancelled: [] };
  }
}

export function useB2B() {
  const [initial] = useState(loadInitial);
  const [kanban, setKanban] = useState(initial.kanban);
  const [cancelled, setCancelled] = useState(initial.cancelled);

  useEffect(() => {
    try {
      localStorage.setItem(B2B_KEY, JSON.stringify({ kanbanData: kanban, cancelledOrders: cancelled }));
    } catch {
      /* abaikan */
    }
  }, [kanban, cancelled]);

  const pushOrder = useCallback((order) => {
    setKanban((prev) => ({ ...prev, Menunggu: [...prev.Menunggu, order] }));
  }, []);

  const moveOrder = useCallback((from, index) => {
    let moved = null;
    setKanban((prev) => {
      const item = prev[from]?.[index];
      if (!item) return prev;
      moved = item;
      const next = from === 'Menunggu' ? 'Diproses' : 'Selesai';
      return {
        ...prev,
        [from]: prev[from].filter((_, i) => i !== index),
        [next]: [...prev[next], item],
      };
    });
    return from === 'Menunggu' ? 'Diproses' : 'Selesai';
  }, []);

  /** Hapus item dari kolom + catat ke daftar dibatalkan. `item` dikirim dari komponen. */
  const cancelOrder = useCallback((from, index, item, { reason, note }) => {
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

  const restoreCancelled = useCallback((index) => {
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

  const deleteCancelled = useCallback((index) => {
    setCancelled((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const b2bCount = kanban.Menunggu.length + kanban.Diproses.length;

  return { kanban, cancelled, b2bCount, pushOrder, moveOrder, cancelOrder, restoreCancelled, deleteCancelled };
}
