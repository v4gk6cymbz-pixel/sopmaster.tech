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
    <div className="splash-screen" style={{ padding: "24px" }}>
      <div className="card" style={{ width: "100%", maxWidth: "420px", padding: "40px", border: "1px solid var(--border)" }}>
        <div className="gradient-border" style={{ padding: 0, margin: "-40px -40px 28px -40px", borderRadius: "12px 12px 0 0" }}>
          <div style={{ height: "80px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="splash-logo" style={{ width: "44px", height: "44px", fontSize: "18px" }}>S</div>
          </div>
        </div>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <h1 style={{ fontSize: "22px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "6px" }}>
            Sign In
          </h1>
          <p style={{ fontSize: "14px", color: "var(--text-tertiary)" }}>
            Access your organisation workspace. Sign in with your company credentials.
          </p>
        </div>

        <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
          <button onClick={() => { setMode("standard"); setError(""); }}
            style={{
              flex: 1, padding: "10px 8px", fontSize: "13px", fontWeight: 500, borderRadius: "8px", cursor: "pointer", fontFamily: "inherit",
              background: mode === "standard" ? "var(--accent-subtle)" : "transparent",
              border: mode === "standard" ? "1px solid rgba(37, 99, 235, 0.3)" : "1px solid var(--border)",
              color: mode === "standard" ? "var(--text-primary)" : "var(--text-tertiary)", transition: "all 0.2s",
            }}>
            Firm Login
          </button>
          <button onClick={() => { setMode("director"); setError(""); }}
            style={{
              flex: 1, padding: "10px 8px", fontSize: "13px", fontWeight: 500, borderRadius: "8px", cursor: "pointer", fontFamily: "inherit",
              background: mode === "director" ? "var(--accent-subtle)" : "transparent",
              border: mode === "director" ? "1px solid rgba(37, 99, 235, 0.3)" : "1px solid var(--border)",
              color: mode === "director" ? "var(--text-primary)" : "var(--text-tertiary)", transition: "all 0.2s",
            }}>
            Director Login
          </button>
        </div>

        {mode === "director" ? (
          <div>
            <div style={{ marginBottom: "16px" }}>
              <label>Email</label>
              <input type="email" value={dirEmail} onChange={(e) => setDirEmail(e.target.value)}
                placeholder="Director email" onKeyDown={(e) => { if (e.key === "Enter") handleDirLogin(); }} />
            </div>
            <div style={{ marginBottom: "24px" }}>
              <label>PIN (optional)</label>
              <input type="password" value={dirPin} onChange={(e) => setDirPin(e.target.value)}
                placeholder="Not required" onKeyDown={(e) => { if (e.key === "Enter") handleDirLogin(); }} />
            </div>
            {error && <p style={{ fontSize: "13px", color: "var(--danger)", marginBottom: "12px" }}>{error}</p>}
            <button onClick={handleDirLogin} className="btn btn-primary" style={{ width: "100%", padding: "14px 28px", fontSize: "15px" }}>
              Sign In
            </button>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: "16px" }}>
              <label>Company Name</label>
              <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Your firm name" />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label>PIN</label>
              <input type="password" value={pin} onChange={(e) => setPin(e.target.value)} placeholder="Firm PIN" onKeyDown={(e) => { if (e.key === "Enter") handleLogin(); }} />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <button onClick={() => setIsMember(!isMember)}
                style={{ fontSize: "13px", color: "var(--accent)", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit" }}>
                {isMember ? "Sign in as director instead" : "Sign in as team member"}
              </button>
            </div>

            {isMember && (
              <div style={{ marginBottom: "16px" }} className="fade-in">
                <div style={{ marginBottom: "12px" }}>
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

            <button onClick={handleLogin} className="btn btn-primary" style={{ width: "100%", padding: "14px 28px", fontSize: "15px" }}>
              Sign In
            </button>
          </div>
        )}

        <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid var(--border)", textAlign: "center" }}>
          <p style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>
            Don&apos;t have an account? <button onClick={() => router.push("/register")} style={{ fontSize: "13px", color: "var(--accent)", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit" }}>Register</button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
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
  );
}
