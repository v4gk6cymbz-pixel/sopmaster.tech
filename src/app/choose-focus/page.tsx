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
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#060D1A" }}>
      <p style={{ color: "#94A3B8", fontSize: "14px" }}>Loading...</p>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", background: "#060D1A" }}>
      <div style={{ width: "100%", maxWidth: "600px", textAlign: "center" }}>
        <h1 style={{ fontSize: "26px", fontWeight: 600, color: "#F8FAFC", marginBottom: "8px", letterSpacing: "-0.02em" }}>
          What will you be creating?
        </h1>
        <p style={{ fontSize: "15px", color: "#94A3B8", marginBottom: "36px" }}>
          Choose your focus to get started.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <button
            onClick={() => handleChoice("sops")}
            disabled={busy}
            className="card"
            style={{
              padding: "44px 28px", border: "1px solid rgba(59,130,246,0.2)", cursor: busy ? "not-allowed" : "pointer",
              opacity: busy ? 0.5 : 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "16px",
              transition: "all 0.3s ease",
            }}>
            <div style={{ fontSize: "34px", fontWeight: 700, color: "#3B82F6", letterSpacing: "-0.02em" }}>SOPs</div>
            <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.6 }}>
              Generate standard operating procedures with full governance structure.
            </p>
            <div style={{ fontSize: "13px", color: "#64748B", marginTop: "4px" }}>
              100 free credits included
            </div>
          </button>
          <button
            onClick={() => handleChoice("checklists")}
            disabled={busy}
            className="card"
            style={{
              padding: "44px 28px", border: "1px solid rgba(255,255,255,0.06)", cursor: busy ? "not-allowed" : "pointer",
              opacity: busy ? 0.5 : 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "16px",
              transition: "all 0.3s ease",
            }}>
            <div style={{ fontSize: "34px", fontWeight: 700, color: "#22C55E", letterSpacing: "-0.02em" }}>Checklists</div>
            <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.6 }}>
              Create operational checklists for recurring processes.
            </p>
            <div style={{ fontSize: "13px", color: "#64748B", marginTop: "4px" }}>
              10 free credits included
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
