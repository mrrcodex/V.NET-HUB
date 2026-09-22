export const VENDOR_WA = {
  'Dapur Alumni Bu Rina': { phone: '0812-3456-7890', wa: '6281234567890' },
  'Kopi Alumni Space': { phone: '0821-2345-6789', wa: '6282123456789' },
};

const DEFAULT_WA = { phone: '0812-3456-7890', wa: '6281234567890' };

export function getWA(vendor) {
  return VENDOR_WA[vendor] ?? DEFAULT_WA;
}

export function waOrderLink(vendor, title) {
  const c = getWA(vendor);
  const msg = encodeURIComponent(`Halo ${vendor}, saya ingin konfirmasi pesanan B2B: ${title} via V.NET-HUB.`);
  return `https://wa.me/${c.wa}?text=${msg}`;
}

export function waCancelLink(vendor, title, reason, note) {
  const c = getWA(vendor);
  const msg = encodeURIComponent(
    `Halo ${vendor}, pesanan B2B "${title}" kami BATALKAN. Alasan: ${reason}${note ? ' — ' + note : ''}. Terima kasih. - V.NET-HUB`,
  );
  return `https://wa.me/${c.wa}?text=${msg}`;
}
