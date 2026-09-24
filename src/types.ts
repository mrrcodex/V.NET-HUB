// Kontrak tipe pusat V.NET-HUB — satu-satunya sumber kebenaran bentuk data.

export type KanbanColumn = 'Menunggu' | 'Diproses' | 'Selesai';

export type AlumniPath = 'dashboard' | 'katalog' | 'pesanan' | 'magang' | 'profil';

export type Screen = 'showcase' | 'landing' | 'catalog' | 'portfolio' | 'myorders' | 'dashboard' | 'jobs' | 'admin';

export type Role = 'Mahasiswa' | 'Alumni' | 'Admin Kampus';

export interface Vendor {
  name: string;
  cat: string;
  emoji: string;
  bg: string;
  rating: string;
  price: string;
  desc: string;
  cap?: string;
}

export interface Product {
  n: string;
  c: string;
  p: string;
  s: string;
}

export interface B2BOrder {
  t: string;
  s: string;
  vendor: string;
  detail: string;
}

export type Kanban = Record<KanbanColumn, B2BOrder[]>;

export interface CancelledOrder extends B2BOrder {
  from: string;
  reason: string;
  note: string;
  at: string;
}

export interface CancelTarget {
  st: KanbanColumn;
  i: number;
  item: B2BOrder;
}

export interface CancelMeta {
  reason: string;
  note: string;
}

export interface Job {
  type: string;
  title: string;
  by: string;
  loc: string;
  desc: string;
  detail: string[];
  tag: string;
  mine?: boolean;
}

export interface JobDraft {
  title: string;
  type: string;
  desc: string;
}

export interface RfqDraft {
  event: string;
  date: string;
  budget: string;
  detail: string;
}

export interface AuthUser {
  name: string;
  role: Role;
  faculty: string;
  nim: string;
}

export interface AuthPayload {
  name: string;
  role: Role;
  faculty: string;
  nim: string;
  business: string;
}

export interface Bundle {
  id: string;
  name: string;
  items: string[];
  vendors: string[];
  price: string;
  save: string;
  emoji: string;
}

export interface PortfolioCase {
  id: string;
  event: string;
  theme: string;
  org: string;
  faculty: string;
  vendors: string[];
  budget: string;
  result: string;
  rating: string;
  emoji: string;
  bg: string;
  story: string;
}

export type ToastFn = (msg: string) => void;

export type MerchantStatus = 'verified' | 'pending' | 'rejected';

export interface Merchant {
  name: string;
  cat: string;
  owner: string;
  nim: string;
  faculty: string;
  status: MerchantStatus;
}
