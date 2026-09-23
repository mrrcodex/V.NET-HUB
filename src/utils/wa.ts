interface WaContact {
  phone: string;
  wa: string;
}

export const VENDOR_WA: Record<string, WaContact> = {
  'Dapur Alumni Bu Rina': { phone: '0812-3456-7890', wa: '6281234567890' },
  'Kopi Alumni Space': { phone: '0821-2345-6789', wa: '6282123456789' },
};

const DEFAULT_WA: WaContact = { phone: '0812-3456-7890', wa: '6281234567890' };

export function getWA(vendor: string): WaContact {
  return VENDOR_WA[vendor] ?? DEFAULT_WA;
}

export function waOrderLink(vendor: string, title: string): string {
  const c = getWA(vendor);
  const msg = encodeURIComponent(`Halo ${vendor}, saya ingin konfirmasi pesanan B2B: ${title} via V.NET-HUB.`);
  return `https://wa.me/${c.wa}?text=${msg}`;
}

export function waCancelLink(vendor: string, title: string, reason: string, note: string): string {
  const c = getWA(vendor);
  const msg = encodeURIComponent(
    `Halo ${vendor}, pesanan B2B "${title}" kami BATALKAN. Alasan: ${reason}${note ? ' — ' + note : ''}. Terima kasih. - V.NET-HUB`,
  );
  return `https://wa.me/${c.wa}?text=${msg}`;
}
