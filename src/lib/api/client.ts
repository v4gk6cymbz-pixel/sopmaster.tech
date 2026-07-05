const TOKEN_KEY = "sopmaster_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export function clearToken() {
  setToken(null);
}

async function request<T = any>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(url, { ...options, headers });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }

  return res.json();
}

export const api = {
  auth: {
    register: (data: any) => request("/api/auth/register", { method: "POST", body: JSON.stringify(data) }),
    login: (data: any) => request("/api/auth/login", { method: "POST", body: JSON.stringify(data) }),
    logout: () => request("/api/auth/logout", { method: "POST" }),
    me: () => request("/api/auth/me"),
    setFocus: (focus: string) => request("/api/auth/set-focus", { method: "POST", body: JSON.stringify({ focus }) }),
  },
  company: {
    get: () => request("/api/company"),
    update: (data: any) => request("/api/company", { method: "PATCH", body: JSON.stringify(data) }),
    updatePin: (pin: string) => request("/api/company/pin", { method: "PUT", body: JSON.stringify({ pin }) }),
    deductCredits: (amount: number) => request("/api/company/deduct-credits", { method: "POST", body: JSON.stringify({ amount }) }),
  },
  vault: {
    list: () => request("/api/vault"),
    create: (data: any) => request("/api/vault", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: any) => request(`/api/vault/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
    delete: (id: string) => request(`/api/vault/${id}`, { method: "DELETE" }),
  },
  team: {
    list: () => request("/api/team"),
    add: (name: string, role: string) => request("/api/team", { method: "POST", body: JSON.stringify({ name, role }) }),
  },
  admin: {
    list: () => request("/api/admin"),
    setSubscription: (companyId: string, active: boolean) =>
      request("/api/admin/subscription", { method: "PUT", body: JSON.stringify({ companyId, active }) }),
    setCredits: (companyId: string, credits: number) =>
      request("/api/admin/credits", { method: "PUT", body: JSON.stringify({ companyId, credits }) }),
    setTier: (companyId: string, tier: string) =>
      request("/api/admin/tier", { method: "PUT", body: JSON.stringify({ companyId, tier }) }),
    deleteCompany: (id: string) => request(`/api/admin/company/${id}`, { method: "DELETE" }),
  },
  generate: {
    sop: (data: any) => request("/api/generate/sop", { method: "POST", body: JSON.stringify(data) }),
    batch: (data: any) => request("/api/generate/batch", { method: "POST", body: JSON.stringify(data) }),
  },
};
