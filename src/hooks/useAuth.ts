import { useCallback, useEffect, useState } from 'react';
import type { AuthPayload, AuthUser, Role, ToastFn } from '../types.ts';

const AUTH_KEY = 'vnet-hub-auth-v1';

function loadAuth(): AuthUser | null {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    const d: unknown = JSON.parse(raw);
    if (typeof d !== 'object' || d === null) return null;
    const r = d as Record<string, unknown>;
    if (typeof r['name'] !== 'string' || typeof r['role'] !== 'string') return null;
    return {
      name: r['name'],
      role: r['role'] as Role,
      faculty: typeof r['faculty'] === 'string' ? r['faculty'] : '-',
      nim: typeof r['nim'] === 'string' ? r['nim'] : '-',
    };
  } catch {
    return null;
  }
}

export const ROLES: Role[] = ['Mahasiswa', 'Alumni', 'Admin Kampus'];

export type AuthMode = 'login' | 'register';

export function useAuth(toast?: ToastFn) {
  const [user, setUser] = useState<AuthUser | null>(loadAuth);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  useEffect(() => {
    try {
      if (user) localStorage.setItem(AUTH_KEY, JSON.stringify(user));
      else localStorage.removeItem(AUTH_KEY);
    } catch {
      /* abaikan */
    }
  }, [user]);

  const requireAuth = useCallback(
    (action?: () => void, role?: Role): boolean => {
      if (user) {
        if (role && user.role !== role && user.role !== 'Admin Kampus') {
          toast?.(`🔒 Fitur ini khusus peran ${role}`);
          return false;
        }
        action?.();
        return true;
      }
      setPendingAction(() => action ?? null);
      setAuthMode('login');
      setAuthOpen(true);
      toast?.('🔑 Masuk dulu untuk lanjut (demo — bebas isi)');
      return false;
    },
    [user, toast],
  );

  const login = useCallback(
    (payload: AuthPayload) => {
      const next: AuthUser = { name: payload.name, role: payload.role, faculty: payload.faculty || '-', nim: payload.nim || '-' };
      setUser(next);
      setAuthOpen(false);
      toast?.(`👋 Halo, ${next.name}! Masuk sebagai ${next.role}`);
      if (pendingAction) {
        const fn = pendingAction;
        setPendingAction(null);
        setTimeout(() => fn?.(), 350);
      }
    },
    [pendingAction, toast],
  );

  const logout = useCallback(() => {
    setUser(null);
    toast?.('👋 Kamu sudah keluar (demo)');
  }, [toast]);

  return { user, authOpen, authMode, setAuthOpen, setAuthMode, login, logout, requireAuth };
}

export type UseAuth = ReturnType<typeof useAuth>;
