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
    <div className="splash-screen" style={{ padding: "24px" }}>
      <div className="card" style={{ width: "100%", maxWidth: "480px", padding: "40px", border: "1px solid var(--border)" }}>
        <div className="gradient-border" style={{ padding: 0, margin: "-40px -40px 28px -40px", borderRadius: "12px 12px 0 0" }}>
          <div style={{ height: "80px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="splash-logo" style={{ width: "44px", height: "44px", fontSize: "18px" }}>S</div>
          </div>
        </div>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <h1 style={{ fontSize: "22px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "6px" }}>
            Register
          </h1>
          <p style={{ fontSize: "14px", color: "var(--text-tertiary)" }}>
            Create your consultancy account to get started. Register your firm and set up your workspace.
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
          <div className="glass" style={{ marginBottom: "20px", padding: "12px 16px" }}>
            <p style={{ fontSize: "13px", color: "var(--accent)", fontWeight: 500 }}>Director account — no PIN required</p>
            <p style={{ fontSize: "12px", color: "var(--text-tertiary)", marginTop: "2px" }}>Unlimited credits, all features unlocked.</p>
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

        <div style={{ marginBottom: "24px" }}>
          <label>Company Size</label>
          <p style={{ fontSize: "12px", color: "var(--text-tertiary)", marginBottom: "8px" }}>This determines your plan pricing.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {SIZE_OPTIONS.map((opt) => (
              <button key={opt.value} onClick={() => setCompanySize(opt.value)}
                style={{
                  textAlign: "left", padding: "14px 18px", borderRadius: "10px", cursor: "pointer",
                  border: companySize === opt.value ? "1px solid rgba(37, 99, 235, 0.3)" : "1px solid var(--border)",
                  background: companySize === opt.value ? "var(--accent-subtle)" : "var(--bg-card)",
                  display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all 0.2s", fontFamily: "inherit",
                }}>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>{opt.label}</p>
                  <p style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>{opt.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {error && <p style={{ fontSize: "13px", color: "var(--danger)", marginBottom: "12px" }}>{error}</p>}
        <button onClick={handleRegister} className="btn btn-primary" style={{ width: "100%", padding: "14px 28px", fontSize: "15px" }}>
          Register
        </button>

        <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid var(--border)", textAlign: "center" }}>
          <p style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>
            Already registered? <button onClick={() => router.push("/login")} style={{ fontSize: "13px", color: "var(--accent)", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit" }}>Sign in</button>
          </p>
        </div>
      </div>
    </div>
  );
}
