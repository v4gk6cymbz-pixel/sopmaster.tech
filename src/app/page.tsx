"use client";

import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef } from "react";

/* ============================================================
   LANDING — Cinematic OGI introduction
   ============================================================ */
function Landing() {
  const router = useRouter();
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (glowRef.current) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        glowRef.current.style.background = `radial-gradient(600px at ${x}% ${y}%, rgba(201, 160, 90, 0.04) 0%, transparent 70%)`;
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const features = [
    { title: "SOP Forge", icon: "\u2699", desc: "Enterprise document engineering studio for creating structured Standard Operating Procedures with full governance and compliance references." },
    { title: "Checklist Studio", icon: "\u2611", desc: "Design operational workflows and recurring checklists with intelligent task structures and approval chains." },
    { title: "Batch Deploy", icon: "\u25B6", desc: "Generate complete documentation libraries across entire departments and organisations in a single operation." },
    { title: "Document Vault", icon: "\u25C8", desc: "Secure operational archive with cryptographic verification, version tracking and enterprise-grade access controls." },
    { title: "Governance Engine", icon: "\u2696", desc: "Jurisdiction-aware compliance framework that maps procedures to regulatory requirements across 28 global jurisdictions." },
    { title: "Command Centre", icon: "\u25A3", desc: "Real-time operational intelligence with governance health metrics, activity monitoring and workspace analytics." },
  ];

  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      {/* Dynamic ambient glow */}
      <div ref={glowRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, transition: "background 0.3s ease" }} />

      {/* Cinematic hero */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", position: "relative", zIndex: 1, padding: "40px 24px" }}>
        <div style={{ position: "absolute", top: "40px", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "linear-gradient(135deg, var(--accent), #8B7335)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "#fff" }}>S</div>
          <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", letterSpacing: "-0.01em" }}>SOPMaster</span>
        </div>

        <div style={{ textAlign: "center", maxWidth: "720px", marginTop: "-80px" }}>
          <div className="ogi-badge" style={{ marginBottom: "24px" }}>Introducing Operational Governance Infrastructure</div>
          <h1 style={{ fontSize: "clamp(42px, 7vw, 72px)", fontWeight: 700, color: "var(--white)", letterSpacing: "-0.035em", lineHeight: 1.05, marginBottom: "20px" }}>
            SOPMaster
          </h1>
          <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "40px", maxWidth: "560px", marginLeft: "auto", marginRight: "auto", letterSpacing: "-0.01em" }}>
            The world&rsquo;s first Operational Governance Infrastructure platform.
            Enterprises use SOPMaster to design, govern, and scale operational procedures with precision.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => router.push("/login")} className="btn btn-primary" style={{ padding: "14px 32px", fontSize: "14px" }}>
              Enter Command Centre
            </button>
            <button onClick={() => router.push("/register")} className="btn btn-secondary" style={{ padding: "14px 32px", fontSize: "14px" }}>
              Create Workspace
            </button>
          </div>
        </div>

        {/* Floating architectural elements */}
        <div style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "8px", opacity: 0.3 }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent)", animation: "pulse 2s ease infinite" }}></span>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent)", animation: "pulse 2s ease 0.4s infinite" }}></span>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent)", animation: "pulse 2s ease 0.8s infinite" }}></span>
        </div>
      </section>

      {/* Decorative divider */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, var(--accent-border), transparent)", maxWidth: "400px", margin: "0 auto", position: "relative", zIndex: 1 }} />

      {/* Capabilities grid */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 24px 100px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 600, color: "var(--white)", letterSpacing: "-0.02em", marginBottom: "10px" }}>The Operational Governance Infrastructure</h2>
          <p style={{ fontSize: "15px", color: "var(--text-secondary)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.6 }}>Six integrated capabilities that form the foundation of enterprise operational governance.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
          {features.map((f, i) => (
            <div key={i} className="glass" style={{ padding: "28px 24px", borderRadius: "var(--radius-xl)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <span style={{ fontSize: "22px", color: "var(--accent)" }}>{f.icon}</span>
                <h3 style={{ fontSize: "15px", fontWeight: 600, color: "var(--white)", letterSpacing: "-0.01em", margin: 0 }}>{f.title}</h3>
              </div>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ position: "relative", zIndex: 1, borderTop: "1px solid var(--glass-border)", padding: "32px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>
            &copy; {new Date().getFullYear()} SOPMaster. All rights reserved.
          </div>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Link href="/about" style={{ fontSize: "12px", color: "var(--text-tertiary)", textDecoration: "none", transition: "color 0.15s" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-primary)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-tertiary)"}>About</Link>
            <Link href="/contact" style={{ fontSize: "12px", color: "var(--text-tertiary)", textDecoration: "none", transition: "color 0.15s" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-primary)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-tertiary)"}>Contact</Link>
            <Link href="/privacy" style={{ fontSize: "12px", color: "var(--text-tertiary)", textDecoration: "none", transition: "color 0.15s" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-primary)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-tertiary)"}>Privacy</Link>
            <Link href="/terms" style={{ fontSize: "12px", color: "var(--text-tertiary)", textDecoration: "none", transition: "color 0.15s" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-primary)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-tertiary)"}>Terms</Link>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
      `}</style>
    </div>
  );
}

/* ============================================================
   DASHBOARD — Operational Governance Command Centre
   ============================================================ */
function Dashboard() {
  const session = useStore((s) => s.session);
  const company = useStore((s) => s.companies.find(c => c.id === s.session?.companyId));
  const vault = useStore((s) => s.vault);
  const router = useRouter();

  const totalDocs = vault.length;
  const recentDocs = vault.slice(-5).reverse();
  const activeDocs = vault.filter(s => s.status === "active").length;
  const healthScore = totalDocs > 0 ? Math.min(100, Math.round(activeDocs / totalDocs * 100)) : 0;

  const workspaceModules = [
    { title: "SOP Forge", icon: "\u2699", desc: "Design structured Standard Operating Procedures with governance frameworks.", href: "/forge", color: "var(--accent)" },
    { title: "Checklist Studio", icon: "\u2611", desc: "Build operational checklists and recurring workflow templates.", href: "/checklist", color: "var(--success)" },
    { title: "Batch Deploy", icon: "\u25B6", desc: "Generate department-wide documentation packages.", href: "/batch", color: "var(--blue-accent)" },
    { title: "Document Vault", icon: "\u25C8", desc: "Access, search and manage your operational archive.", href: "/armory", color: "var(--accent)" },
  ];

  return (
    <div style={{ padding: "80px 32px 40px", marginLeft: "var(--sidebar-width)", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <div className="ogi-badge">Command Centre</div>
          <h1 style={{ fontSize: "30px", fontWeight: 600, color: "var(--white)", letterSpacing: "-0.02em", marginBottom: "6px" }}>
            Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening"},{company?.name ? ` ${company.name}` : ""}
          </h1>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)", maxWidth: "560px", lineHeight: 1.6 }}>
            Your Operational Governance Command Centre. Monitor documentation health, access workspace tools and review recent operational activity.
          </p>
        </div>

        {/* Governance Health + Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "20px", marginBottom: "28px" }}>
          <div className="glass" style={{ padding: "28px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <div style={{ position: "relative", width: "100px", height: "100px", marginBottom: "12px" }}>
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="var(--glass-border)" strokeWidth="6" />
                <circle cx="50" cy="50" r="42" fill="none" stroke={healthScore > 60 ? "var(--success)" : healthScore > 30 ? "var(--accent)" : "var(--danger)"} strokeWidth="6"
                  strokeDasharray={`${(healthScore / 100) * 264} 264`} strokeLinecap="round" transform="rotate(-90, 50, 50)" style={{ transition: "stroke-dasharray 1s ease" }} />
              </svg>
              <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "22px", fontWeight: 700, color: "var(--white)", letterSpacing: "-0.02em" }}>{healthScore}%</span>
            </div>
            <div className="stat-label">Governance Health</div>
            <div style={{ fontSize: "12px", color: "var(--text-tertiary)", marginTop: "4px" }}>
              {totalDocs} document{totalDocs !== 1 ? "s" : ""} in vault
            </div>
          </div>

          <div className="glass" style={{ padding: "28px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div>
              <div className="stat-label">Active Documents</div>
              <div className="stat-value">{vault.filter(s => s.status === "active").length}</div>
            </div>
            <div>
              <div className="stat-label">Total Documents</div>
              <div className="stat-value">{totalDocs}</div>
            </div>
            <div>
              <div className="stat-label">Focus</div>
              <div className="stat-value" style={{ fontSize: "16px", fontWeight: 500, color: "var(--accent)" }}>{company?.focus ? company.focus.charAt(0).toUpperCase() + company.focus.slice(1) : "Unset"}</div>
            </div>
            <div>
              <div className="stat-label">Credits Available</div>
              <div className="stat-value" style={{ fontSize: "20px" }}>{session?.isDirector ? "\u221E" : company?.credits ?? 0}</div>
            </div>
          </div>
        </div>

        {/* Workspace Modules */}
        <div style={{ marginBottom: "28px" }}>
          <h2 style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "16px", letterSpacing: "-0.01em" }}>Workspace Modules</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px" }}>
            {workspaceModules.map((mod, i) => (
              <div key={i} className="workspace-card" style={{ padding: "24px" }} onClick={() => router.push(mod.href)}>
                <span style={{ fontSize: "24px", color: mod.color, marginBottom: "12px", display: "block" }}>{mod.icon}</span>
                <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px", letterSpacing: "-0.01em" }}>{mod.title}</h3>
                <p style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass" style={{ padding: "24px" }}>
          <h2 style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "16px", letterSpacing: "-0.01em" }}>Recent Operational Activity</h2>
          {recentDocs.length === 0 ? (
            <div style={{ fontSize: "13px", color: "var(--text-tertiary)", padding: "20px 0", textAlign: "center" }}>
              No documents yet. Use the workspace modules above to create your first operational procedure.
            </div>
          ) : (
            <div>
              {recentDocs.map((doc, i) => (
                  <div key={i} className="doc-row" style={{ cursor: "pointer" }} onClick={() => router.push("/armory")}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
                    <span style={{ flex: 1, fontWeight: 500, color: "var(--text-primary)" }}>{doc.title}</span>
                    <span className="tag" style={{ fontSize: "10px" }}>SOP</span>
                    <span style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>
                      {new Date(doc.dateCreated).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const session = useStore((s) => s.session);
  if (!session) return <Landing />;
  return <Dashboard />;
}
