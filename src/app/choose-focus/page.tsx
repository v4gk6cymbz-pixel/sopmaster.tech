"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";

export default function ChooseFocusPage() {
  const session = useStore((s) => s.session);
  const setFocus = useStore((s) => s.setFocus);
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!session) router.push("/login");
  }, [session, router]);

  const handleChoice = async (focus: "sops" | "checklists") => {
    setBusy(true);
    try {
      await setFocus(focus);
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
    <div className="splash-screen" style={{ padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: "620px", textAlign: "center" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "8px" }}>
          What will you be creating?
        </h1>
        <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "32px" }}>
          Choose what you will be creating to get started. SOPs or checklists — we support both.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <button
            onClick={() => handleChoice("sops")}
            disabled={busy}
            className="card"
            style={{
              padding: "44px 28px", border: "1px solid rgba(37, 99, 235, 0.3)", cursor: busy ? "not-allowed" : "pointer",
              opacity: busy ? 0.5 : 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "16px",
            }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "16px", background: "var(--accent-subtle)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--accent)" }}>S</div>
            </div>
            <div style={{ fontSize: "20px", fontWeight: 700, color: "var(--text-primary)" }}>SOPs</div>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Generate standard operating procedures with full governance structure.
            </p>
            <div style={{ fontSize: "13px", color: "var(--text-tertiary)", marginTop: "4px", padding: "6px 14px", borderRadius: "20px", background: "var(--bg-card)" }}>
              100 free credits included
            </div>
          </button>
          <button
            onClick={() => handleChoice("checklists")}
            disabled={busy}
            className="card"
            style={{
              padding: "44px 28px", border: "1px solid var(--border)", cursor: busy ? "not-allowed" : "pointer",
              opacity: busy ? 0.5 : 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "16px",
            }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "16px", background: "rgba(16, 185, 129, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--success)" }}>C</div>
            </div>
            <div style={{ fontSize: "20px", fontWeight: 700, color: "var(--text-primary)" }}>Checklists</div>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Create operational checklists for recurring processes.
            </p>
            <div style={{ fontSize: "13px", color: "var(--text-tertiary)", marginTop: "4px", padding: "6px 14px", borderRadius: "20px", background: "var(--bg-card)" }}>
              10 free credits included
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
