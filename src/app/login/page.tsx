"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { DIRECTOR_EMAIL } from "@/lib/config";

function LoginForm() {
  const login = useStore((s) => s.login);
  const loginAsDirector = useStore((s) => s.loginAsDirector);
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCompany = searchParams.get("company") || "";

  const [mode, setMode] = useState<"standard" | "director">("standard");
  const [companyName, setCompanyName] = useState(initialCompany);
  const [pin, setPin] = useState("");
  const [dirEmail, setDirEmail] = useState("");
  const [dirPin, setDirPin] = useState("");
  const [memberName, setMemberName] = useState("");
  const [memberRole, setMemberRole] = useState("");
  const [isMember, setIsMember] = useState(false);
  const [error, setError] = useState("");

  const handleDirLogin = async () => {
    setError("");
    if (!dirEmail.trim()) {
      setError("Email is required.");
      return;
    }
    if (dirEmail.trim().toLowerCase() !== DIRECTOR_EMAIL) {
      setError("Invalid credentials.");
      return;
    }
    const success = await loginAsDirector();
    if (success) {
      router.push("/");
    } else {
      setError("Director account not found. Register first.");
    }
  };

  const handleLogin = async () => {
    setError("");
    if (!companyName.trim() || !pin.trim()) {
      setError("Company name and PIN are required.");
      return;
    }
    const success = await (isMember
      ? login(companyName.trim(), pin.trim(), memberName.trim() || undefined, memberRole.trim() || undefined)
      : login(companyName.trim(), pin.trim()));
    if (success) {
      router.push("/");
    } else {
      setError("Invalid credentials. Check your company name and PIN.");
    }
  };

  return (
    <div className="splash-screen" style={{ padding: "24px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(201,160,90,0.025) 0%, transparent 60%)",
        top: "-15%", right: "-10%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: "400px", height: "400px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(59,130,246,0.02) 0%, transparent 60%)",
        bottom: "-10%", left: "-8%", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="glass" style={{ width: "100%", maxWidth: "420px", padding: "36px 32px 28px" }}>
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <div style={{
              width: "44px", height: "44px", borderRadius: "12px", margin: "0 auto 18px",
              background: "linear-gradient(135deg, var(--accent), #8B7335)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "18px", fontWeight: 700, color: "var(--navy-950)",
            }}>S</div>
            <h1 style={{ fontSize: "20px", fontWeight: 600, color: "var(--white)", marginBottom: "6px", letterSpacing: "-0.01em" }}>
              Access Platform
            </h1>
            <p style={{ fontSize: "13px", color: "var(--text-tertiary)", lineHeight: 1.6 }}>
              Sign in to your Operational Governance workspace.
            </p>
          </div>

          <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
            {[
              { key: "standard", label: "Firm Login" },
              { key: "director", label: "Director Login" },
            ].map((m) => (
              <button key={m.key} onClick={() => { setMode(m.key as "standard" | "director"); setError(""); }}
                style={{
                  flex: 1, padding: "9px 8px", fontSize: "12px", fontWeight: 500, borderRadius: "8px", cursor: "pointer", fontFamily: "inherit",
                  background: mode === m.key ? "var(--accent-subtle)" : "transparent",
                  border: mode === m.key ? "1px solid var(--accent-border)" : "1px solid var(--border)",
                  color: mode === m.key ? "var(--accent)" : "var(--text-tertiary)", transition: "all 0.2s",
                }}>
                {m.label}
              </button>
            ))}
          </div>

          {mode === "director" ? (
            <div>
              <div style={{ marginBottom: "14px" }}>
                <label>Email</label>
                <input type="email" value={dirEmail} onChange={(e) => setDirEmail(e.target.value)}
                  placeholder="Director email" onKeyDown={(e) => { if (e.key === "Enter") handleDirLogin(); }} />
              </div>
              {error && <p style={{ fontSize: "13px", color: "var(--danger)", marginBottom: "12px" }}>{error}</p>}
              <button onClick={handleDirLogin} className="btn btn-primary" style={{ width: "100%", padding: "12px 28px", fontSize: "14px" }}>
                Sign In
              </button>
            </div>
          ) : (
            <div>
              <div style={{ marginBottom: "14px" }}>
                <label>Company Name</label>
                <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Your firm name" />
              </div>
              <div style={{ marginBottom: "14px" }}>
                <label>PIN</label>
                <input type="password" value={pin} onChange={(e) => setPin(e.target.value)} placeholder="Firm PIN" onKeyDown={(e) => { if (e.key === "Enter") handleLogin(); }} />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <button onClick={() => setIsMember(!isMember)}
                  style={{ fontSize: "12px", color: "var(--accent)", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit" }}>
                  {isMember ? "Sign in as director instead" : "Sign in as team member"}
                </button>
              </div>

              {isMember && (
                <div style={{ marginBottom: "14px" }} className="fade-in">
                  <div style={{ marginBottom: "10px" }}>
                    <label>Your Name</label>
                    <input type="text" value={memberName} onChange={(e) => setMemberName(e.target.value)} placeholder="Full name" />
                  </div>
                  <div>
                    <label>Your Role</label>
                    <input type="text" value={memberRole} onChange={(e) => setMemberRole(e.target.value)} placeholder="e.g., Operations Lead" />
                  </div>
                </div>
              )}

              {error && <p style={{ fontSize: "13px", color: "var(--danger)", marginBottom: "12px" }}>{error}</p>}

              <button onClick={handleLogin} className="btn btn-primary" style={{ width: "100%", padding: "12px 28px", fontSize: "14px" }}>
                Sign In
              </button>
            </div>
          )}

          <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid var(--border)", textAlign: "center" }}>
            <p style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>
              Don&apos;t have an account? <button onClick={() => router.push("/register")} style={{ fontSize: "12px", color: "var(--accent)", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit" }}>Register</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main id="main-content">
    <Suspense fallback={
      <div className="splash-screen">
        <div className="splash-card">
          <div className="splash-logo">S</div>
          <div className="splash-spinner"></div>
          <p className="splash-text">Loading...</p>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
    </main>
  );
}
