"use client";

import { useStore } from "@/lib/store";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const NAV_ITEMS = [
  { href: "/", label: "Command Centre", icon: "\u25A3" },
  { href: "/forge", label: "SOP Forge", focus: "sops" as const, icon: "\u2699" },
  { href: "/checklist", label: "Checklist Studio", focus: "checklists" as const, icon: "\u2611" },
  { href: "/batch", label: "Batch Deploy", focus: "batch" as const, icon: "\u25B6" },
  { href: "/armory", label: "Document Vault", icon: "\u25C8" },
  { href: "/settings", label: "Administration", icon: "\u2692" },
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
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const isAuthPage = pathname === "/login" || pathname === "/register" || pathname === "/choose-focus";
  const isPublicPage = pathname === "/about" || pathname === "/contact" || pathname === "/privacy" || pathname === "/terms";
  const isLanding = !session && pathname === "/";

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true); }
      if (e.key === "Escape") { setSearchOpen(false); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (isAuthPage || isLanding || !session) return null;

  const creditsDisplay = session.isDirector ? "Unlimited" : `${company?.credits ?? 0}`;
  const pageTitle = NAV_ITEMS.find(i => i.href === pathname)?.label ?? "SOPMaster";

  const navContent = (
    <nav style={{ display: "flex", flexDirection: "column", gap: "2px", flex: 1, padding: "0 10px" }}>
      {NAV_ITEMS.map((item) => {
        const locked = isLocked(item, company ?? null, !!session.isDirector);
        const active = pathname === item.href;
        return locked ? (
          <span key={item.href} title="Subscribe to unlock" aria-label={`${item.label} — subscribe to unlock`}
            style={{
              display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px",
              borderRadius: "10px", fontSize: "13px", fontWeight: 500,
              color: "var(--text-tertiary)", cursor: "not-allowed", opacity: 0.3,
              letterSpacing: "-0.01em",
            }}>
            <span style={{ width: "20px", textAlign: "center", fontSize: "14px", opacity: 0.4 }}>{item.icon}</span>
            {item.label}
          </span>
        ) : (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            style={{
              display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px",
              borderRadius: "10px", fontSize: "13px", fontWeight: active ? 600 : 500,
              color: active ? "var(--white)" : "var(--text-secondary)",
              background: active ? "var(--glass-bg)" : "transparent",
              textDecoration: "none", transition: "all 0.15s",
              letterSpacing: "-0.01em",
              position: "relative",
            }}
            onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
            onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
          >
            {active && <span style={{ position: "absolute", left: "-10px", top: "50%", transform: "translateY(-50%)", width: "3px", height: "20px", borderRadius: "2px", background: "var(--accent)" }} />}
            <span style={{ width: "20px", textAlign: "center", fontSize: active ? "15px" : "14px", opacity: active ? 1 : 0.5 }}>{item.icon}</span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* SIDE NAV */}
      <aside className={mobileOpen ? "mobile-open" : ""} style={{
        position: "fixed", top: 0, left: 0, width: "var(--sidebar-width)", height: "100vh",
        background: "var(--navy-950)",
        borderRight: "1px solid var(--glass-border)",
        display: "flex", flexDirection: "column", zIndex: 60,
        overflow: "hidden",
        transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
      }}>
        {/* Logo */}
        <div style={{
          padding: "20px 20px 16px",
          borderBottom: "1px solid var(--glass-border)",
          display: "flex", alignItems: "center", gap: "10px",
        }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "10px",
            background: "linear-gradient(135deg, var(--accent), #8B7335)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "14px", fontWeight: 700, color: "#fff", flexShrink: 0,
          }}>S</div>
          <div>
            <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--white)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>SOPMaster</div>
            <div style={{ fontSize: "8px", fontWeight: 600, color: "var(--accent)", letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.7 }}>Operational Governance Infrastructure</div>
          </div>
        </div>

        {/* Nav items */}
        <div style={{ flex: 1, overflow: "auto", paddingTop: "16px" }}>
          {navContent}
        </div>

        {/* Bottom section */}
        <div style={{
          borderTop: "1px solid var(--glass-border)", padding: "14px 16px",
          display: "flex", alignItems: "center", gap: "10px",
        }}>
          <div style={{
            width: "28px", height: "28px", borderRadius: "8px",
            background: "linear-gradient(135deg, var(--navy-600), var(--navy-700))",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "11px", fontWeight: 600, color: "var(--text-secondary)", flexShrink: 0,
          }}>{company?.name?.charAt(0)?.toUpperCase() || "?"}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{company?.name || "Workspace"}</div>
            <div style={{ fontSize: "10px", color: session.isDirector ? "var(--accent)" : "var(--text-tertiary)" }}>
              {creditsDisplay} credits
            </div>
          </div>
          <button onClick={logout} title="Sign out" aria-label="Sign out" style={{
            width: "28px", height: "28px", borderRadius: "8px",
            background: "none", border: "1px solid var(--glass-border)",
            color: "var(--text-tertiary)", cursor: "pointer", fontFamily: "inherit",
            fontSize: "13px", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.15s", flexShrink: 0,
          }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--glass-bg)"; e.currentTarget.style.color = "var(--text-primary)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "var(--text-tertiary)"; }}>
            &#x21AA;
          </button>
        </div>
      </aside>

      {/* TOP BAR */}
      <header style={{
        position: "fixed", top: 0, left: "var(--sidebar-width)", right: 0,
        height: "var(--topbar-height)", zIndex: 50,
        background: "var(--glass-bg)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--glass-border)",
        display: "flex", alignItems: "center", padding: "0 24px", gap: "12px",
      }}>
        {/* Mobile hamburger */}
        <button onClick={() => setMobileOpen(!mobileOpen)}
          className="mobile-hamburger"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          style={{ background: "none", border: "none", color: "var(--text-primary)", fontSize: "18px", cursor: "pointer", padding: "4px", marginRight: "4px" }}>
          {mobileOpen ? "\u2715" : "\u2630"}
        </button>

        <span style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-secondary)", letterSpacing: "-0.01em" }}>
          {NAV_ITEMS.find(i => i.href === pathname)?.label || (pathname.startsWith("/about") ? "About" : pathname.startsWith("/contact") ? "Contact" : pathname.startsWith("/privacy") ? "Privacy" : pathname.startsWith("/terms") ? "Terms" : "")}
        </span>

        <div style={{ flex: 1 }} />

        <button onClick={() => setSearchOpen(true)} aria-label="Search documents"
          style={{
            display: "flex", alignItems: "center", gap: "8px", padding: "7px 14px",
            borderRadius: "8px", fontSize: "12px", color: "var(--text-tertiary)",
            background: "var(--glass-bg)", border: "1px solid var(--glass-border)",
            cursor: "pointer", fontFamily: "inherit", minWidth: "160px",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--glass-border-hover)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--glass-border)"; }}>
          <span style={{ opacity: 0.4, fontSize: "14px" }}>&#8981;</span>
          <span style={{ fontSize: "12px" }}>Search documents...</span>
          <span style={{ marginLeft: "auto", fontSize: "9px", padding: "2px 6px", borderRadius: "4px", background: "var(--glass-bg)", color: "var(--text-tertiary)", border: "1px solid var(--glass-border)" }}>&#8984;K</span>
        </button>

        <div style={{
          display: "flex", alignItems: "center", gap: "8px", padding: "6px 14px",
          borderRadius: "8px",
          background: session.isDirector ? "var(--accent-subtle)" : "var(--glass-bg)",
          border: session.isDirector ? "1px solid var(--accent-border)" : "1px solid var(--glass-border)",
        }}>
          <span style={{ fontSize: "11px", fontWeight: 600, color: session.isDirector ? "var(--accent)" : "var(--text-primary)" }}>
            {creditsDisplay}
          </span>
          <span style={{ fontSize: "9px", color: "var(--text-tertiary)" }}>credits</span>
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 65, background: "rgba(5, 8, 15, 0.85)",
          backdropFilter: "blur(8px)",
        }}>
          <div style={{
            width: "80%", maxWidth: "280px", height: "100vh", background: "var(--navy-950)",
            borderRight: "1px solid var(--glass-border)", display: "flex", flexDirection: "column",
          }}>
            <div style={{ padding: "20px", borderBottom: "1px solid var(--glass-border)", display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "linear-gradient(135deg, var(--accent), #8B7335)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "#fff" }}>S</div>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)" }}>SOPMaster</span>
            </div>
            {navContent}
          </div>
        </div>
      )}

      {/* SEARCH OVERLAY */}
      {searchOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "flex-start",
          justifyContent: "center", paddingTop: "100px",
        }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(5, 8, 15, 0.8)", backdropFilter: "blur(4px)" }} onClick={() => setSearchOpen(false)}></div>
          <div className="glass" style={{
            position: "relative", width: "100%", maxWidth: "520px", padding: "24px",
            border: "1px solid var(--glass-border-hover)", boxShadow: "var(--shadow-xl)",
            borderRadius: "var(--radius-xl)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <span style={{ color: "var(--text-tertiary)", fontSize: "18px" }}>&#8981;</span>
              <input ref={searchRef} type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documents, templates, procedures..."
                style={{ flex: 1, border: "none", background: "none", fontSize: "15px", color: "var(--text-primary)", outline: "none" }}
                onKeyDown={(e) => { if (e.key === "Enter") { setSearchOpen(false); } }}
              />
              <button onClick={() => setSearchOpen(false)} aria-label="Close search" style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)", borderRadius: "6px", color: "var(--text-tertiary)", cursor: "pointer", fontSize: "10px", padding: "4px 8px", fontFamily: "inherit" }}>
                Esc
              </button>
            </div>
            {searchQuery && (
              <div style={{ fontSize: "13px", color: "var(--text-tertiary)", padding: "8px 0", borderTop: "1px solid var(--glass-border)" }}>
                Press Enter to search for &ldquo;{searchQuery}&rdquo;
              </div>
            )}
            {!searchQuery && (
              <div style={{ fontSize: "12px", color: "var(--text-muted)", padding: "4px 0", borderTop: "1px solid var(--glass-border)" }}>
                <div style={{ display: "flex", gap: "16px", paddingTop: "12px" }}>
                  <span style={{ color: "var(--text-tertiary)" }}>&#8981; Search</span>
                  <span style={{ color: "var(--text-tertiary)" }}>&#8593;&#8595; Navigate</span>
                  <span style={{ color: "var(--text-tertiary)" }}>&#8999; Open</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile styles */}
      <style>{`
        @media (max-width: 768px) {
          aside { transform: translateX(-100%); }
          aside.mobile-open { transform: translateX(0); }
          header { left: 0 !important; }
          .mobile-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
