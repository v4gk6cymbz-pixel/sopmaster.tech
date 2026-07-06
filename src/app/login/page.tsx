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
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", background: "#0F172A" }}>
      <div className="card" style={{ width: "100%", maxWidth: "400px", padding: "32px" }}>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h1 style={{ fontSize: "20px", fontWeight: 600, color: "#F1F5F9", marginBottom: "4px" }}>
            Sign In
          </h1>
          <p style={{ fontSize: "13px", color: "#64748B" }}>
            Access your organisation workspace.
          </p>
        </div>

        <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
          <button onClick={() => { setMode("standard"); setError(""); }}
            style={{
              flex: 1, padding: "8px", fontSize: "12px", fontWeight: 500, borderRadius: "6px", cursor: "pointer",
              background: mode === "standard" ? "rgba(59,130,246,0.08)" : "transparent",
              border: mode === "standard" ? "1px solid rgba(59,130,246,0.3)" : "1px solid #334155",
              color: mode === "standard" ? "#F1F5F9" : "#64748B", fontFamily: "inherit",
            }}>
            Firm Login
          </button>
          <button onClick={() => { setMode("director"); setError(""); }}
            style={{
              flex: 1, padding: "8px", fontSize: "12px", fontWeight: 500, borderRadius: "6px", cursor: "pointer",
              background: mode === "director" ? "rgba(59,130,246,0.08)" : "transparent",
              border: mode === "director" ? "1px solid rgba(59,130,246,0.3)" : "1px solid #334155",
              color: mode === "director" ? "#F1F5F9" : "#64748B", fontFamily: "inherit",
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
            <div style={{ marginBottom: "20px" }}>
              <label>PIN (optional)</label>
              <input type="password" value={dirPin} onChange={(e) => setDirPin(e.target.value)}
                placeholder="Not required" onKeyDown={(e) => { if (e.key === "Enter") handleDirLogin(); }} />
            </div>
            {error && <p style={{ fontSize: "12px", color: "#EF4444", marginBottom: "12px" }}>{error}</p>}
            <button onClick={handleDirLogin} className="btn btn-primary" style={{ width: "100%" }}>
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
                style={{ fontSize: "12px", color: "#3B82F6", background: "none", border: "none", cursor: "pointer", padding: 0, textDecoration: "underline" }}>
                {isMember ? "Sign in as director instead" : "Sign in as team member"}
              </button>
            </div>

            {isMember && (
              <div style={{ marginBottom: "16px" }}>
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

            {error && <p style={{ fontSize: "12px", color: "#EF4444", marginBottom: "12px" }}>{error}</p>}

            <button onClick={handleLogin} className="btn btn-primary" style={{ width: "100%" }}>
              Sign In
            </button>
          </div>
        )}

        <div style={{ marginTop: "16px", textAlign: "center" }}>
          <p style={{ fontSize: "12px", color: "#64748B" }}>
            Don&apos;t have an account? <button onClick={() => router.push("/register")} className="btn-ghost" style={{ fontSize: "12px", color: "#3B82F6", padding: 0, textDecoration: "underline" }}>Register</button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", background: "#0F172A" }}>
        <div className="card" style={{ width: "100%", maxWidth: "400px", padding: "32px", textAlign: "center" }}>
          <p style={{ fontSize: "14px", color: "#64748B" }}>Loading...</p>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
