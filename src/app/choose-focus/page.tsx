"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";

export default function ChooseFocusPage() {
  const session = useStore((s) => s.session);
  const setFocus = useStore((s) => s.setFocus);
  const setShowTour = useStore((s) => s.setShowTour);
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!session) router.push("/login");
  }, [session, router]);

  const handleChoice = async (focus: "sops" | "checklists") => {
    setBusy(true);
    try {
      await setFocus(focus);
      setShowTour(true);
      router.push("/");
    } catch {
      setBusy(false);
    }
  };

  if (!session) return (
    <div className="splash-screen">
      <div className="splash-card">
        <div className="splash-logo">S</div>
        <div className="splash-spinner"></div>
        <p className="splash-text">Loading...</p>
      </div>
    </div>
  );

  return (
    <main id="main-content">
    <div className="splash-screen" style={{ padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: "620px", textAlign: "center" }}>
        <div className="ogi-badge" style={{ marginBottom: "16px" }}>Getting Started</div>
        <h1 style={{ fontSize: "28px", fontWeight: 600, color: "var(--white)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
          What will you be creating?
        </h1>
        <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "32px" }}>
          Choose your document type to begin. SOPs for structured procedures, checklists for recurring tasks.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <button
            onClick={() => handleChoice("sops")}
            disabled={busy}
            className="workspace-card"
            style={{
              padding: "44px 28px",
              cursor: busy ? "not-allowed" : "pointer",
              opacity: busy ? 0.5 : 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              background: "var(--glass-bg)",
              borderRadius: "12px",
              border: "1px solid var(--glass-border)",
              transition: "all 0.2s ease",
            }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "16px", background: "var(--accent-subtle)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--accent)" }}>S</div>
            </div>
            <div style={{ fontSize: "20px", fontWeight: 600, color: "var(--white)", letterSpacing: "-0.01em" }}>SOPs</div>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
              Generate standard operating procedures with full governance structure.
            </p>
            <div style={{ fontSize: "12px", color: "var(--text-tertiary)", marginTop: "4px", padding: "6px 14px", borderRadius: "20px", background: "var(--bg-card)" }}>
              30 free credits — up to 3 SOPs
            </div>
          </button>
          <button
            onClick={() => handleChoice("checklists")}
            disabled={busy}
            className="workspace-card"
            style={{
              padding: "44px 28px",
              cursor: busy ? "not-allowed" : "pointer",
              opacity: busy ? 0.5 : 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              background: "var(--glass-bg)",
              borderRadius: "12px",
              border: "1px solid var(--glass-border)",
              transition: "all 0.2s ease",
            }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "16px", background: "rgba(16, 185, 129, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--success)" }}>C</div>
            </div>
            <div style={{ fontSize: "20px", fontWeight: 600, color: "var(--white)", letterSpacing: "-0.01em" }}>Checklists</div>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
              Create operational checklists for recurring processes.
            </p>
            <div style={{ fontSize: "12px", color: "var(--text-tertiary)", marginTop: "4px", padding: "6px 14px", borderRadius: "20px", background: "var(--bg-card)" }}>
              10 free credits included
            </div>
          </button>
        </div>
      </div>
    </div>
    </main>
  );
}
