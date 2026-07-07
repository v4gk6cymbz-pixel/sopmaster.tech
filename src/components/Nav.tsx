"use client";

import { useStore } from "@/lib/store";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/forge", label: "Operational Documents", focus: "sops" as const },
  { href: "/checklist", label: "Checklists", focus: "checklists" as const },
  { href: "/batch", label: "Batch Generation", focus: "batch" as const },
  { href: "/armory", label: "Document Vault" },
  { href: "/settings", label: "Administration" },
];

export default function Nav() {
  const session = useStore((s) => s.session);
  const company = useStore((s) => s.companies.find(c => c.id === s.session?.companyId));
  const logout = useStore((s) => s.logout);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isAuthPage = pathname === "/login" || pathname === "/register" || pathname === "/choose-focus";

  const isLocked = (item: typeof NAV_ITEMS[number]): boolean => {
    if (!company?.focus || !item.focus) return false;
    if (session?.isDirector) return false;
    if (item.focus === "batch") return true;
    return item.focus !== company.focus;
  };

  if (!session || isAuthPage) return null;

  return (
    <header style={{
      borderBottom: "1px solid #334155",
      background: "#0F172A",
      position: "sticky",
      top: 0,
      zIndex: 50,
    }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", height: "52px", gap: "32px" }}>
          <Link href="/" style={{ fontSize: "15px", fontWeight: 600, color: "#F1F5F9", textDecoration: "none", letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>
            SOPMaster
          </Link>

          <nav style={{ display: "flex", gap: "4px", flex: 1, overflow: "visible", flexWrap: "wrap" }} className="desktop-nav">
            {NAV_ITEMS.map((item) => {
              const locked = isLocked(item);
              return locked ? (
                <span key={item.href} className="nav-link" title="Pay to unlock"
                  style={{ color: "#475569", cursor: "not-allowed", opacity: 0.6 }}>
                  {item.label} 🔒
                </span>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link"
                  style={{
                    color: pathname === item.href ? "#3B82F6" : undefined,
                    fontWeight: pathname === item.href ? 500 : undefined,
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }} className="desktop-nav">
            <span style={{ fontSize: "12px", color: "#64748B" }}>
              {company?.name} &middot; {company?.credits ?? 0} credits
            </span>
            <button onClick={logout} className="btn-ghost" style={{ fontSize: "12px", padding: "4px 12px" }}>
              Sign Out
            </button>
          </div>

          <button
            onClick={() => setOpen(!open)}
            style={{ display: "none", background: "none", border: "none", color: "#F1F5F9", fontSize: "20px", cursor: "pointer", padding: "4px" }}
            className="mobile-menu-btn"
          >
            {open ? "\u2715" : "\u2630"}
          </button>
        </div>

        {open && (
          <div style={{ padding: "8px 0 16px", borderTop: "1px solid #334155" }}>
            {NAV_ITEMS.map((item) => {
              const locked = isLocked(item);
              return locked ? (
                <span key={item.href}
                  style={{ display: "block", padding: "8px 12px", fontSize: "14px", color: "#475569", cursor: "not-allowed", borderRadius: "6px", opacity: 0.6 }}>
                  {item.label} 🔒
                </span>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  style={{
                    display: "block",
                    padding: "8px 12px",
                    fontSize: "14px",
                    color: pathname === item.href ? "#3B82F6" : "#94A3B8",
                    textDecoration: "none",
                    borderRadius: "6px",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
            <div style={{ borderTop: "1px solid #334155", marginTop: "8px", paddingTop: "8px" }}>
              <span style={{ display: "block", padding: "8px 12px", fontSize: "12px", color: "#64748B" }}>
                {company?.name} &middot; {company?.credits ?? 0} credits
              </span>
              <button
                onClick={() => { logout(); setOpen(false); }}
                style={{ display: "block", width: "100%", textAlign: "left", padding: "8px 12px", fontSize: "13px", color: "#EF4444", background: "none", border: "none", cursor: "pointer", borderRadius: "6px" }}
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}
