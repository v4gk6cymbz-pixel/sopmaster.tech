"use client";

import { useStore } from "@/lib/store";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const NAV_ITEMS = [
  { href: "/", label: "Workspace", icon: "W" },
  { href: "/forge", label: "SOP Builder", focus: "sops" as const, icon: "S" },
  { href: "/checklist", label: "Checklist Builder", focus: "checklists" as const, icon: "C" },
  { href: "/batch", label: "Batch Builder", focus: "batch" as const, icon: "B" },
  { href: "/armory", label: "Document Vault", icon: "V" },
  { href: "/settings", label: "Administration", icon: "A" },
];

function isLocked(item: typeof NAV_ITEMS[number], company: { focus?: string; subscriptionActive?: string } | null, isDirector: boolean): boolean {
  if (isDirector) return false;
  if (!company?.focus && !item.focus) return false;
  if (!item.focus) return false;
  if (item.focus === "batch") return company?.subscriptionActive !== "yes";
  if (company?.subscriptionActive === "yes") return false;
  return item.focus !== company?.focus;
}

export default function Nav() {
  const session = useStore((s) => s.session);
  const company = useStore((s) => s.companies.find(c => c.id === s.session?.companyId));
  const logout = useStore((s) => s.logout);
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const isAuthPage = pathname === "/login" || pathname === "/register" || pathname === "/choose-focus";

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearchOpen(!searchOpen); }
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [searchOpen]);

  if (!session || isAuthPage) return null;

  const creditsDisplay = session.isDirector ? "Unlimited" : `${company?.credits ?? 0}`;

  return (
    <>
      <header style={{
        borderBottom: "1px solid var(--border)",
        background: "var(--bg-primary)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", height: "56px", gap: "24px" }}>
            <Link href="/" style={{
              fontSize: "16px", fontWeight: 700, color: "var(--text-primary)", textDecoration: "none",
              letterSpacing: "-0.02em", whiteSpace: "nowrap",
              display: "flex", alignItems: "center", gap: "10px",
            }}>
              <span style={{
                width: "28px", height: "28px", borderRadius: "8px",
                background: "linear-gradient(135deg, var(--accent), #8B7335)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "13px", fontWeight: 700, color: "#fff",
              }}>S</span>
              SOPMaster
            </Link>

            <nav className="desktop-nav" style={{ display: "flex", gap: "2px", flex: 1 }}>
              {NAV_ITEMS.map((item) => {
                const locked = isLocked(item, company ?? null, !!session.isDirector);
                const active = pathname === item.href;
                return locked ? (
                  <span key={item.href} title="Subscribe to unlock"
                    style={{
                      display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px",
                      borderRadius: "8px", fontSize: "13px", fontWeight: 500,
                      color: "var(--text-tertiary)", cursor: "not-allowed", opacity: 0.45,
                    }}>
                    {item.icon} {item.label}
                  </span>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px",
                      borderRadius: "8px", fontSize: "13px", fontWeight: 500,
                      color: active ? "var(--accent)" : "var(--text-secondary)",
                      background: active ? "var(--accent-subtle)" : "transparent",
                      textDecoration: "none", transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--bg-card)"; }}
                    onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
                  >
                    {item.icon} {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button onClick={() => setSearchOpen(!searchOpen)}
                style={{
                  display: "flex", alignItems: "center", gap: "6px", padding: "7px 14px",
                  borderRadius: "8px", fontSize: "12px", color: "var(--text-tertiary)",
                  background: "var(--bg-card)", border: "1px solid var(--border)",
                  cursor: "pointer", fontFamily: "inherit", minWidth: "160px",
                }}>
                <span style={{ opacity: 0.5 }}>&#8981;</span>
                <span>Search documents...</span>
                <span style={{ marginLeft: "auto", fontSize: "10px", padding: "2px 5px", borderRadius: "4px", background: "var(--bg-secondary)", color: "var(--text-tertiary)" }}>Ctrl+K</span>
              </button>

              <div style={{
                display: "flex", alignItems: "center", gap: "8px", padding: "6px 14px",
                borderRadius: "8px", background: session.isDirector ? "rgba(201, 149, 58, 0.08)" : "var(--bg-card)",
                border: session.isDirector ? "1px solid rgba(201, 149, 58, 0.2)" : "1px solid var(--border)",
              }}>
                <span style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>{company?.name}</span>
                <span style={{ width: "1px", height: "14px", background: "var(--border)" }}></span>
                <span style={{ fontSize: "12px", fontWeight: 600, color: session.isDirector ? "var(--accent)" : "var(--accent)" }}>
                  {creditsDisplay} credits
                </span>
              </div>

              <button onClick={logout} style={{
                padding: "7px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: 500,
                color: "var(--text-tertiary)", background: "none", border: "1px solid var(--border)",
                cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-card)"; e.currentTarget.style.color = "var(--text-primary)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "var(--text-tertiary)"; }}>
                Sign Out
              </button>
            </div>

            <button
              onClick={() => setOpen(!open)}
              className="mobile-menu-btn"
              style={{ display: "none", background: "none", border: "none", color: "var(--text-primary)", fontSize: "22px", cursor: "pointer", padding: "4px", marginLeft: "auto" }}
            >
              {open ? "\u2715" : "\u2630"}
            </button>
          </div>

          {open && (
            <div style={{ padding: "8px 0 16px", borderTop: "1px solid var(--border)" }}>
              {NAV_ITEMS.map((item) => {
                const locked = isLocked(item, company ?? null, !!session.isDirector);
                return locked ? (
                  <span key={item.href}
                    style={{ display: "block", padding: "10px 12px", fontSize: "14px", color: "var(--text-tertiary)", cursor: "not-allowed", borderRadius: "8px", opacity: 0.45 }}>
                    {item.label}
                  </span>
                ) : (
                  <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
                    style={{ display: "block", padding: "10px 12px", fontSize: "14px", fontWeight: 500, color: pathname === item.href ? "var(--accent)" : "var(--text-secondary)", textDecoration: "none", borderRadius: "8px" }}>
                    {item.label}
                  </Link>
                );
              })}
              <div style={{ borderTop: "1px solid var(--border)", marginTop: "8px", paddingTop: "12px" }}>
                <span style={{ display: "block", padding: "8px 12px", fontSize: "13px", color: "var(--text-tertiary)" }}>
                  {company?.name} &middot; {creditsDisplay} credits
                </span>
                <button onClick={() => { logout(); setOpen(false); }}
                  style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 12px", fontSize: "13px", color: "var(--danger)", background: "none", border: "none", cursor: "pointer", borderRadius: "8px", fontFamily: "inherit" }}>
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>

        <style>{`
          @media (max-width: 900px) {
            .desktop-nav { display: none !important; }
            .mobile-menu-btn { display: block !important; }
          }
        `}</style>
      </header>

      {searchOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "flex-start",
          justifyContent: "center", paddingTop: "80px",
        }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)" }} onClick={() => setSearchOpen(false)}></div>
          <div className="card" style={{
            position: "relative", width: "100%", maxWidth: "520px", padding: "20px",
            border: "1px solid var(--border-light)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <span style={{ color: "var(--text-tertiary)", fontSize: "16px" }}>&#8981;</span>
              <input ref={searchRef} type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documents by title, company, or hash..."
                style={{ flex: 1, border: "none", background: "none", fontSize: "15px", color: "var(--text-primary)", outline: "none" }}
                onKeyDown={(e) => { if (e.key === "Enter") { setSearchOpen(false); } }}
              />
              <button onClick={() => setSearchOpen(false)} style={{ background: "none", border: "none", color: "var(--text-tertiary)", cursor: "pointer", fontSize: "14px", fontFamily: "inherit" }}>
                Esc
              </button>
            </div>
            {searchQuery && (
              <div style={{ fontSize: "13px", color: "var(--text-tertiary)", padding: "8px 0" }}>
                Press Enter to search for &ldquo;{searchQuery}&rdquo;
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}