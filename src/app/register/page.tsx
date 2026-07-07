"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { DIRECTOR_EMAIL } from "@/lib/config";

const SIZE_OPTIONS = [
  { value: "solo", label: "Solo / Owner", desc: "Just me — £400/mo" },
  { value: "1-20", label: "1–20 employees", desc: "Small team — £2,500/mo" },
  { value: "21-200", label: "21–200 employees", desc: "Growing firm — £5,100/mo" },
  { value: "201+", label: "201+ employees", desc: "Established firm — £9,000/mo" },
];

export default function RegisterPage() {
  const register = useStore((s) => s.register);
  const router = useRouter();
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");
    if (!company.trim() || !email.trim()) { setError("Firm name and email are required."); return; }
    if (!companySize) { setError("Please select your company size."); return; }
    if (email !== DIRECTOR_EMAIL && pin.length < 4) { setError("PIN must be at least 4 characters."); return; }
    if (email !== DIRECTOR_EMAIL && pin !== confirmPin) { setError("PINs do not match."); return; }
    try {
      await register(company, email, pin, companySize);
      router.push("/choose-focus");
    } catch (e: any) {
      setError(e?.message || "Registration failed.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", background: "#060D1A" }}>
      <div className="card" style={{ width: "100%", maxWidth: "480px", padding: "36px" }}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#F8FAFC", marginBottom: "6px", letterSpacing: "-0.02em" }}>
            Register
          </h1>
          <p style={{ fontSize: "14px", color: "#94A3B8" }}>
            Create your consultancy account.
          </p>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label>Firm Name</label>
          <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g., Mercer Consulting Ltd" />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <label>Director Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="director@yourfirm.com" />
        </div>

        {email === DIRECTOR_EMAIL ? (
          <div className="card" style={{ marginBottom: "20px", padding: "12px 16px", borderColor: "rgba(59,130,246,0.2)" }}>
            <p style={{ fontSize: "13px", color: "#3B82F6", fontWeight: 500 }}>Director account — no PIN required</p>
            <p style={{ fontSize: "12px", color: "#94A3B8", marginTop: "2px" }}>Unlimited credits, all features unlocked.</p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: "16px" }}>
              <label>Create Firm PIN</label>
              <input type="password" value={pin} onChange={(e) => setPin(e.target.value)} placeholder="Minimum 4 characters" />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label>Confirm PIN</label>
              <input type="password" value={confirmPin} onChange={(e) => setConfirmPin(e.target.value)} placeholder="Re-enter PIN" />
            </div>
          </>
        )}

        <div style={{ marginBottom: "20px" }}>
          <label>Company Size</label>
          <p style={{ fontSize: "11px", color: "#64748B", marginBottom: "8px" }}>This determines your plan pricing.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {SIZE_OPTIONS.map((opt) => (
              <button key={opt.value} onClick={() => setCompanySize(opt.value)}
                style={{
                  textAlign: "left", padding: "14px 18px", borderRadius: "8px", cursor: "pointer",
                  border: companySize === opt.value ? "1px solid rgba(59,130,246,0.4)" : "1px solid rgba(255,255,255,0.06)",
                  background: companySize === opt.value ? "rgba(59,130,246,0.08)" : "rgba(255,255,255,0.02)",
                  transition: "all 0.2s ease",
                }}>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "#F8FAFC" }}>{opt.label}</p>
                  <p style={{ fontSize: "13px", color: "#94A3B8" }}>{opt.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {error && <p style={{ fontSize: "12px", color: "#EF4444", marginBottom: "12px" }}>{error}</p>}
        <button onClick={handleRegister} className="btn btn-primary" style={{ width: "100%" }}>
          Register
        </button>

        <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid #334155", textAlign: "center" }}>
          <p style={{ fontSize: "12px", color: "#64748B" }}>
            Already registered? <button onClick={() => router.push("/login")} className="btn-ghost" style={{ fontSize: "12px", color: "#3B82F6", padding: 0, textDecoration: "underline" }}>Sign in</button>
          </p>
        </div>
      </div>
    </div>
  );
}
