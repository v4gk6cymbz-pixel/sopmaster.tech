"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import type { Jurisdiction, FirmTier } from "@/types";
import { JURISDICTION_REGULATORY, getTierLimits, redirectToStripe } from "@/lib/utils";

const ALL_TIERS: { value: FirmTier; label: string; price: string; credits: string }[] = [
  { value: "solo", label: "Solo Professional", price: "£400/mo", credits: "300 Credits" },
  { value: "small", label: "Small Consultancy Plan", price: "£2,500/mo", credits: "2,500 Credits" },
  { value: "medium", label: "Medium Consultancy Plan", price: "£5,100/mo", credits: "6,000 Credits" },
  { value: "large", label: "Large Consultancy Plan", price: "£9,000/mo", credits: "12,000 Credits" },
];

export default function SettingsPage() {
  const router = useRouter();
  const session = useStore((s) => s.session);
  const getCompany = useStore((s) => s.getCompany);
  const setJurisdiction = useStore((s) => s.setJurisdiction);
  const updatePin = useStore((s) => s.updatePin);
  const cancelSubscription = useStore((s) => s.cancelSubscription);
  const logout = useStore((s) => s.logout);
  const company = getCompany();

  const [newPin, setNewPin] = useState("");
  const [confirmNewPin, setConfirmNewPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [pinSuccess, setPinSuccess] = useState(false);
  const [inviteCopied, setInviteCopied] = useState(false);

  if (!session || !company) return (
    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "32px 24px", textAlign: "center" }}>
      <p style={{ color: "#64748B", fontSize: "14px" }}>Loading...</p>
    </div>
  );
  const isDirector = session.isDirector;
  const limits = getTierLimits(company.tier);
  const inviteLink = typeof window !== "undefined" ? `${window.location.origin}/login?company=${encodeURIComponent(company.name)}` : "";

  const handlePinUpdate = () => {
    setPinError(""); setPinSuccess(false);
    if (newPin.length < 4) { setPinError("PIN must be at least 4 characters."); return; }
    if (newPin !== confirmNewPin) { setPinError("PINs do not match."); return; }
    updatePin(newPin);
    setPinSuccess(true); setNewPin(""); setConfirmNewPin("");
  };

  const handleCopyInvite = () => {
    navigator.clipboard.writeText(inviteLink);
    setInviteCopied(true);
    setTimeout(() => setInviteCopied(false), 2000);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 24px" }} className="fade-in">
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "20px", fontWeight: 600, color: "#F1F5F9", marginBottom: "4px" }}>
          Settings
        </h1>
        <p style={{ fontSize: "13px", color: "#64748B" }}>
          Manage your company, billing, and account.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

        {/* Company Profile */}
        <div className="card">
          <div className="card-header">Company Profile</div>
          <div className="data-row"><span className="data-label">Company</span><span className="data-value">{company.name}</span></div>
          <div className="data-row"><span className="data-label">Email</span><span className="data-value">{session?.isDirector ? "Director Account" : company.email}</span></div>
          <div className="data-row"><span className="data-label">Plan</span><span className="data-value">{limits.label}</span></div>
          <div className="data-row"><span className="data-label">Created</span><span className="data-value">{company.createdAt}</span></div>
          <div className="data-row"><span className="data-label">Team Members</span><span className="data-value">{company.team.length}</span></div>
          <div className="data-row"><span className="data-label">Credits</span><span className="data-value">{company.credits} ({company.lifetimeCredits} lifetime)</span></div>
        </div>

        {/* Jurisdiction */}
        <div className="card">
          <div className="card-header">Jurisdiction</div>
          <p style={{ fontSize: "12px", color: "#64748B", marginBottom: "12px" }}>
            Your jurisdiction determines the regulatory context applied to your documents.
          </p>
          <select value={company.jurisdiction} onChange={(e) => setJurisdiction(e.target.value as Jurisdiction)}>
            {Object.entries(JURISDICTION_REGULATORY).map(([key, val]) => (
              <option key={key} value={key}>{val.name}</option>
            ))}
          </select>
          <div style={{ marginTop: "8px", padding: "8px 12px", background: "rgba(59,130,246,0.04)", borderRadius: "6px", border: "1px solid rgba(59,130,246,0.1)", fontSize: "12px", color: "#94A3B8" }}>
            {JURISDICTION_REGULATORY[company.jurisdiction]?.trigger || "Select a jurisdiction"}
          </div>
        </div>

        {/* Security PIN */}
        {isDirector && (
          <div className="card">
            <div className="card-header">Security PIN</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
              <div>
                <label>New PIN</label>
                <input type="password" value={newPin} onChange={(e) => setNewPin(e.target.value)} placeholder="Minimum 4 characters" />
              </div>
              <div>
                <label>Confirm New PIN</label>
                <input type="password" value={confirmNewPin} onChange={(e) => setConfirmNewPin(e.target.value)} placeholder="Re-enter PIN" />
              </div>
            </div>
            {pinError && <p style={{ fontSize: "12px", color: "#EF4444", marginBottom: "8px" }}>{pinError}</p>}
            {pinSuccess && <p style={{ fontSize: "12px", color: "#22C55E", marginBottom: "8px" }}>PIN updated.</p>}
            <button onClick={handlePinUpdate} className="btn btn-primary">Update PIN</button>
          </div>
        )}

        {/* Share Link */}
        {isDirector && (
          <div className="card">
            <div className="card-header">Share Link</div>
            <p style={{ fontSize: "12px", color: "#64748B", marginBottom: "12px" }}>
              Share this link with team members to grant access to your company.
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              <input readOnly value={inviteLink} style={{ flex: 1 }} />
              <button onClick={handleCopyInvite} className="btn btn-secondary" style={{ whiteSpace: "nowrap" }}>
                {inviteCopied ? "Copied" : "Copy Link"}
              </button>
            </div>
          </div>
        )}

        {/* Billing & Credits */}
        <div className="card">
          <div className="card-header">Billing & Credits</div>
          {company.subscriptionActive ? (
            <div>
              <div className="data-row"><span className="data-label">Plan</span><span className="data-value">{limits.label}</span></div>
              <div className="data-row"><span className="data-label">Rate</span><span className="data-value">£{limits.price.toLocaleString()}/mo</span></div>
              <div className="data-row"><span className="data-label">Status</span><span className="data-value"><span className="status-dot active" style={{ marginRight: "4px" }}></span>Active</span></div>
              <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                <a href={process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_LINK || "#"} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  Manage in Stripe
                </a>
                <button onClick={cancelSubscription} className="btn btn-danger">
                  Cancel Subscription
                </button>
              </div>
              {session.isDirector && <p style={{ fontSize: "12px", color: "#F59E0B", marginTop: "8px" }}>Director override: unlimited credits.</p>}
            </div>
          ) : (
            <div>
              <p style={{ fontSize: "12px", color: "#64748B", marginBottom: "12px" }}>
                Current balance: {company.credits} credits. Activate a subscription for monthly credits.
              </p>
              <p style={{ fontSize: "12px", color: "#94A3B8", marginBottom: "16px" }}>
                Selected plan at signup: {getTierLimits(company.tier).label}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                {ALL_TIERS.map(t => (
                  <div key={t.value} style={{ padding: "12px 16px", border: "1px solid #334155", borderRadius: "6px", background: "rgba(255,255,255,0.02)" }}>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "#F1F5F9" }}>{t.label}</p>
                    <p style={{ fontSize: "12px", color: "#64748B" }}>{t.credits} &middot; {t.price}</p>
                    <button onClick={() => redirectToStripe("subscription", { tier: t.value })}
                      className="btn btn-primary" style={{ marginTop: "8px", width: "100%", fontSize: "12px" }}>
                      Subscribe
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Top Up Credits */}
        {isDirector && (
          <div className="card">
            <div className="card-header">Top Up Credits</div>
            <p style={{ fontSize: "12px", color: "#64748B", marginBottom: "12px" }}>Purchase additional credits. Credits never expire.</p>
            <div className="meta-grid-4" style={{ gap: "8px" }}>
              {[{ c: 100, p: 85 }, { c: 300, p: 142.99 }, { c: 500, p: 220 }, { c: 1000, p: 300 }].map((pack) => (
                <button key={pack.c} onClick={() => redirectToStripe("credits", { amount: pack.c })}
                  style={{ padding: "12px", border: "1px solid #334155", borderRadius: "6px", textAlign: "center", cursor: "pointer", background: "transparent", transition: "border-color 0.1s" }}>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "#F1F5F9" }}>{pack.c}</p>
                  <p style={{ fontSize: "12px", color: "#3B82F6" }}>£{pack.p}</p>
                </button>
              ))}
            </div>
            <div style={{ marginTop: "16px", padding: "8px 12px", background: "rgba(59,130,246,0.04)", borderRadius: "6px", border: "1px solid rgba(59,130,246,0.1)", fontSize: "11px", color: "#94A3B8" }}>
              Purchases are processed via Stripe. You will be redirected to complete payment, then returned automatically.
            </div>
          </div>
        )}

        {/* Delete Account */}
        {isDirector && (
          <div className="card" style={{ borderColor: "rgba(239,68,68,0.2)" }}>
            <div className="card-header" style={{ color: "#EF4444" }}>Delete Account</div>
            <p style={{ fontSize: "12px", color: "#94A3B8", marginBottom: "12px" }}>
              Permanently delete all data for this organisation. This cannot be undone.
            </p>
            <button onClick={async () => {
              if (confirm("This will log you out and clear all local data. Continue?")) {
                await logout();
                window.location.href = "/";
              }
            }} className="btn btn-danger">
              Delete Account
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
