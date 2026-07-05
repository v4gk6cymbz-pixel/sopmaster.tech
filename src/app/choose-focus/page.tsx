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

  if (!session) return null;

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", background: "#0F172A" }}>
      <div style={{ width: "100%", maxWidth: "600px", textAlign: "center" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#F1F5F9", marginBottom: "8px" }}>
          What will you be creating?
        </h1>
        <p style={{ fontSize: "14px", color: "#94A3B8", marginBottom: "32px" }}>
          Choose your focus to get started.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <button
            onClick={() => handleChoice("sops")}
            disabled={busy}
            className="card"
            style={{
              padding: "40px 24px", border: "1px solid rgba(59,130,246,0.3)", cursor: busy ? "not-allowed" : "pointer",
              opacity: busy ? 0.5 : 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "12px",
            }}>
            <div style={{ fontSize: "32px", fontWeight: 700, color: "#3B82F6" }}>SOPs</div>
            <p style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.5 }}>
              Generate standard operating procedures with full governance structure.
            </p>
            <div style={{ fontSize: "12px", color: "#64748B", marginTop: "8px" }}>
              100 free credits included
            </div>
          </button>
          <button
            onClick={() => handleChoice("checklists")}
            disabled={busy}
            className="card"
            style={{
              padding: "40px 24px", border: "1px solid #334155", cursor: busy ? "not-allowed" : "pointer",
              opacity: busy ? 0.5 : 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "12px",
            }}>
            <div style={{ fontSize: "32px", fontWeight: 700, color: "#22C55E" }}>Checklists</div>
            <p style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.5 }}>
              Create operational checklists for recurring processes.
            </p>
            <div style={{ fontSize: "12px", color: "#64748B", marginTop: "8px" }}>
              10 free credits included
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
