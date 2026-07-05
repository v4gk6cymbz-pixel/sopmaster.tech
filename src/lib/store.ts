"use client";

import { create } from "zustand";
import type { CompanyNode, SOP, UserSession, Notification, CompanyProfile, Jurisdiction, FocusType } from "@/types";
import { generateId } from "./utils";
import { api, setToken, getToken, clearToken } from "./api/client";

interface StoreState {
  companies: CompanyNode[];
  session: UserSession | null;
  vault: SOP[];
  initialized: boolean;
  showTour: boolean;
  heartbeat: number;
  notifications: Notification[];
  companyProfile: CompanyProfile;

  init: () => Promise<void>;
  register: (name: string, email: string, pin: string, companySize: string) => Promise<boolean>;
  setFocus: (focus: FocusType) => Promise<void>;
  login: (companyName: string, pin: string, memberName?: string, memberRole?: string) => Promise<boolean>;
  loginAsDirector: () => Promise<boolean>;
  logout: () => Promise<void>;
  addSOP: (sop: SOP) => Promise<void>;
  updateSOP: (id: string, data: any) => Promise<void>;
  removeSOP: (id: string) => Promise<void>;
  deductCredit: (amount?: number) => boolean;
  addCredits: (amount: number) => void;
  setJurisdiction: (j: string) => Promise<void>;
  updatePin: (newPin: string) => Promise<void>;
  addTeamMember: (name: string, role: string) => Promise<void>;
  activateSubscription: (tier: string) => void;
  cancelSubscription: () => void;
  dismissTour: () => void;
  getCompanyVault: () => SOP[];
  getCompany: () => CompanyNode | null;
  heartbeatTick: () => void;
  addNotification: (n: Omit<Notification, "id" | "read" | "createdAt">) => void;
  dismissNotification: (id: string) => void;
  clearNotifications: () => void;
  updateCompanyProfile: (profile: Partial<CompanyProfile>) => Promise<void>;
  deleteCompany: (id: string) => Promise<void>;
  adminSetSubscription: (companyId: string, active: boolean) => Promise<void>;
  adminSetCredits: (companyId: string, credits: number) => Promise<void>;
  adminSetTier: (companyId: string, tier: string) => Promise<void>;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export const useStore = create<StoreState>((set, get) => ({
  companies: [],
  session: null,
  vault: [],
  initialized: false,
  showTour: true,
  heartbeat: 0,
  notifications: [],
  companyProfile: {} as CompanyProfile,

  init: async () => {
    try {
      const token = getToken();
      if (!token) {
        set({ initialized: true });
        return;
      }
      const data = await api.auth.me();
      let companies = data.company ? [data.company] : [];
      if (data.session?.isDirector) {
        try {
          const allCompanies = await api.admin.list();
          companies = allCompanies;
        } catch {}
      }
      set({
        session: data.session,
        companies,
        vault: data.vault || [],
        companyProfile: data.company?.profile || {},
        initialized: true,
      });
    } catch {
      clearToken();
      set({ initialized: true });
    }
  },

  register: async (name, email, pin, companySize) => {
    try {
      const data = await api.auth.register({ name, email, pin, companySize });
      setToken(data.token);
      set({
        session: data.session,
        companies: [data.company],
        vault: [],
      });
      return true;
    } catch {
      return false;
    }
  },

  setFocus: async (focus) => {
    try {
      const data = await api.auth.setFocus(focus);
      const companies = get().companies.map(c =>
        c.id === get().session?.companyId ? { ...c, ...data.company } : c
      );
      set({ companies });
    } catch (e) {
      throw e;
    }
  },

  login: async (companyName, pin, memberName, memberRole) => {
    try {
      const data = await api.auth.login({ companyName, pin, memberName, memberRole });
      setToken(data.token);
      let companies = data.company ? [data.company] : [];
      if (data.session?.isDirector) {
        try {
          const allCompanies = await api.admin.list();
          companies = allCompanies;
        } catch {}
      }
      set({
        session: data.session,
        companies,
        vault: data.vault || [],
      });
      return true;
    } catch {
      return false;
    }
  },

  loginAsDirector: async () => {
    try {
      const data = await api.auth.login({ companyName: "", pin: "0000", director: true });
      setToken(data.token);
      let companies = data.company ? [data.company] : [];
      try {
        const allCompanies = await api.admin.list();
        companies = allCompanies;
      } catch {}
      set({
        session: data.session,
        companies,
        vault: data.vault || [],
      });
      return true;
    } catch {
      return false;
    }
  },

  logout: async () => {
    try { await api.auth.logout(); } catch {}
    clearToken();
    set({ session: null, vault: [], companies: [] });
  },

  addSOP: async (sop: SOP) => {
    try {
      await api.vault.create(sop);
      const vault = [...get().vault, sop];
      set({ vault });
    } catch {}
  },

  updateSOP: async (id: string, data: any) => {
    try {
      await api.vault.update(id, data);
      const vault = get().vault.map(s => s.id === id ? { ...s, ...data } : s);
      set({ vault });
    } catch {}
  },

  removeSOP: async (id: string) => {
    try {
      await api.vault.delete(id);
      set({ vault: get().vault.filter(s => s.id !== id) });
    } catch {}
  },

  deductCredit: (_amount = 1) => {
    return true;
  },

  addCredits: (_amount: number) => {},

  setJurisdiction: async (j: string) => {
    try {
      await api.company.update({ jurisdiction: j });
      const companies = get().companies.map(c => c.id === get().session?.companyId ? { ...c, jurisdiction: j as Jurisdiction } : c);
      set({ companies });
    } catch {}
  },

  updatePin: async (newPin: string) => {
    try {
      await api.company.updatePin(newPin);
    } catch {}
  },

  addTeamMember: async (name: string, role: string) => {
    try {
      const member = await api.team.add(name, role);
      const companies = get().companies.map(c => ({
        ...c,
        team: c.id === get().session?.companyId ? [...c.team, member] : c.team,
      }));
      set({ companies });
    } catch {}
  },

  activateSubscription: (_tier: string) => {},

  cancelSubscription: () => {},

  dismissTour: () => {
    set({ showTour: false });
  },

  getCompanyVault: () => get().vault,

  getCompany: () => {
    const s = get().session;
    if (!s) return null;
    return get().companies.find(c => c.id === s.companyId) || null;
  },

  heartbeatTick: () => {
    set((s) => ({ heartbeat: s.heartbeat + 1 }));
  },

  addNotification: (n) => {
    const notification: Notification = {
      id: generateId(),
      ...n,
      read: false,
      createdAt: formatDate(new Date()),
    };
    set({ notifications: [notification, ...get().notifications] });
  },

  dismissNotification: (id: string) => {
    set({ notifications: get().notifications.map(n => n.id === id ? { ...n, read: true } : n) });
  },

  clearNotifications: () => {
    set({ notifications: [] });
  },

  updateCompanyProfile: async (profile) => {
    try {
      await api.company.update({ profile });
      const current = get().companyProfile;
      set({ companyProfile: { ...current, ...profile } });
    } catch {}
  },

  deleteCompany: async (id: string) => {
    try {
      await api.admin.deleteCompany(id);
      set({ companies: get().companies.filter(c => c.id !== id) });
    } catch {}
  },

  adminSetSubscription: async (companyId: string, active: boolean) => {
    try {
      await api.admin.setSubscription(companyId, active);
      set({
        companies: get().companies.map(c => c.id === companyId ? { ...c, subscriptionActive: active } : c),
      });
    } catch {}
  },

  adminSetCredits: async (companyId: string, credits: number) => {
    try {
      await api.admin.setCredits(companyId, credits);
      const companies = get().companies.map(c => {
        if (c.id !== companyId) return c;
        const diff = Math.max(0, credits - c.credits);
        return { ...c, credits, lifetimeCredits: c.lifetimeCredits + diff };
      });
      set({ companies });
    } catch {}
  },

  adminSetTier: async (companyId: string, tier: string) => {
    try {
      await api.admin.setTier(companyId, tier);
      set({ companies: get().companies.map(c => c.id === companyId ? { ...c, tier: tier as any } : c) });
    } catch {}
  },
}));
