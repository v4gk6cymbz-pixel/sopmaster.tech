"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import type { Jurisdiction, FirmTier } from "@/types";
import { JURISDICTION_REGULATORY, getTierLimits, redirectToStripe } from "@/lib/utils";

const ALL_TIERS: { value: FirmTier; label: string; price: string; credits: string; sizeKey: string }[] = [
  { value: "solo", label: "Solo Professional", price: "£400/mo", credits: "300 Credits", sizeKey: "solo" },
  { value: "small", label: "Small Consultancy Plan", price: "£2,500/mo", credits: "2,500 Credits", sizeKey: "1-20" },
  { value: "medium", label: "Medium Consultancy Plan", price: "£5,100/mo", credits: "6,000 Credits", sizeKey: "21-200" },
  { value: "large", label: "Large Consultancy Plan", price: "£9,000/mo", credits: "12,000 Credits", sizeKey: "201+" },
];

export default function SettingsPage() {
  const router = useRouter();
  const session = useStore((s) => s.session);
  const getCompany = useStore((s) => s.getCompany);
  const companyProfile = useStore((s) => s.companyProfile);
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
    <div className="splash-screen">
      <div className="splash-card">
        <div className="splash-logo">S</div>
        <div className="splash-spinner"></div>
        <p className="splash-text">Loading workspace...</p>
      </div>
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
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 32px" }} className="fade-in">
      <div style={{ marginBottom: "36px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
          Administration
        </h1>
        <p style={{ fontSize: "15px", color: "var(--text-secondary)" }}>
          Manage your company, billing, and account settings.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

        {/* Company Profile */}
        <div className="card" style={{ padding: "28px" }}>
          <div className="card-header" style={{ marginBottom: "20px" }}>Company Profile</div>
          <div className="data-row"><span className="data-label">Company</span><span className="data-value">{company.name}</span></div>
          <div className="data-row"><span className="data-label">Email</span><span className="data-value">{session?.isDirector ? "Director Account" : company.email}</span></div>
          <div className="data-row"><span className="data-label">Plan</span><span className="data-value">{limits.label}</span></div>
          <div className="data-row"><span className="data-label">Created</span><span className="data-value">{company.createdAt}</span></div>
          <div className="data-row"><span className="data-label">Team Members</span><span className="data-value">{company.team.length}</span></div>
          <div className="data-row"><span className="data-label">Credits</span><span className="data-value">{company.credits} ({company.lifetimeCredits} lifetime)</span></div>
        </div>

        {/* Jurisdiction */}
        <div className="card" style={{ padding: "28px" }}>
          <div className="card-header" style={{ marginBottom: "20px" }}>Jurisdiction</div>
          <p style={{ fontSize: "14px", color: "var(--text-tertiary)", marginBottom: "14px" }}>
            Your jurisdiction determines the regulatory context applied to your documents.
          </p>
          <select value={company.jurisdiction} onChange={(e) => setJurisdiction(e.target.value as Jurisdiction)}>
            {Object.entries(JURISDICTION_REGULATORY).map(([key, val]) => (
              <option key={key} value={key}>{val.name}</option>
            ))}
          </select>
          <div style={{ marginTop: "10px", padding: "10px 14px", background: "var(--accent-subtle)", borderRadius: "8px", border: "1px solid rgba(37, 99, 235, 0.12)", fontSize: "13px", color: "var(--text-secondary)" }}>
            {JURISDICTION_REGULATORY[company.jurisdiction]?.trigger || "Select a jurisdiction"}
          </div>
        </div>

        {/* Security PIN */}
        {isDirector && (
          <div className="card" style={{ padding: "28px" }}>
            <div className="card-header" style={{ marginBottom: "20px" }}>Security PIN</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
              <div>
                <label>New PIN</label>
                <input type="password" value={newPin} onChange={(e) => setNewPin(e.target.value)} placeholder="Minimum 4 characters" />
              </div>
              <div>
                <label>Confirm New PIN</label>
                <input type="password" value={confirmNewPin} onChange={(e) => setConfirmNewPin(e.target.value)} placeholder="Re-enter PIN" />
              </div>
            </div>
            {pinError && <p style={{ fontSize: "13px", color: "var(--danger)", marginBottom: "10px" }}>{pinError}</p>}
            {pinSuccess && <p style={{ fontSize: "13px", color: "var(--success)", marginBottom: "10px" }}>PIN updated.</p>}
            <button onClick={handlePinUpdate} className="btn btn-primary" style={{ padding: "12px 28px", fontSize: "14px" }}>Update PIN</button>
          </div>
        )}

        {/* Share Link */}
        {isDirector && (
          <div className="card" style={{ padding: "28px" }}>
            <div className="card-header" style={{ marginBottom: "20px" }}>Share Link</div>
            <p style={{ fontSize: "14px", color: "var(--text-tertiary)", marginBottom: "14px" }}>
              Share this link with team members to grant access to your company.
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <input readOnly value={inviteLink} style={{ flex: 1 }} />
              <button onClick={handleCopyInvite} className="btn btn-secondary" style={{ whiteSpace: "nowrap", padding: "12px 20px", fontSize: "14px" }}>
                {inviteCopied ? "Copied" : "Copy Link"}
              </button>
            </div>
          </div>
        )}

        {/* Billing & Credits */}
        <div className="card" style={{ padding: "28px" }}>
          <div className="card-header" style={{ marginBottom: "20px" }}>Billing & Credits</div>
          {company.subscriptionActive ? (
            <div>
              <div className="data-row"><span className="data-label">Plan</span><span className="data-value">{limits.label}</span></div>
              <div className="data-row"><span className="data-label">Rate</span><span className="data-value">£{limits.price.toLocaleString()}/mo</span></div>
              <div className="data-row"><span className="data-label">Status</span><span className="data-value"><span className="status-dot active" style={{ marginRight: "4px" }}></span>Active</span></div>
              <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                {process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_LINK && (
                  <a href={process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: "12px 20px", fontSize: "14px" }}>
                    Manage in Stripe
                  </a>
                )}
              </div>
              {session.isDirector && <p style={{ fontSize: "13px", color: "var(--warning)", marginTop: "12px" }}>Director override: unlimited credits.</p>}
            </div>
          ) : (
            <div>
              <p style={{ fontSize: "14px", color: "var(--text-tertiary)", marginBottom: "14px" }}>
                Current balance: {company.credits} credits. Activate a subscription for monthly credits.
              </p>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "20px" }}>
                Your plan: {getTierLimits(company.tier).label} &middot; {getTierLimits(company.tier).credits} credits/mo
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {(() => {
                  const sizeToTier: Record<string, string> = { solo: "solo", "1-20": "small", "21-200": "medium", "201+": "large" };
                  const matchedTier = sizeToTier[companyProfile?.companySize || ""] || company.tier;
                  const plan = ALL_TIERS.find(t => t.value === matchedTier);
                  const priceLabel = plan ? `£${getTierLimits(matchedTier).price.toLocaleString()}/mo` : "—";
                  return (
                    <div key={matchedTier} style={{ padding: "20px 24px", border: "1px solid var(--border-light)", borderRadius: "12px", background: "var(--bg-card)" }}>
                      <p style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)" }}>{plan?.label || "Select Plan"}</p>
                      <p style={{ fontSize: "14px", color: "var(--accent)", marginTop: "4px" }}>{plan?.credits} &middot; {priceLabel}</p>
                      <p style={{ fontSize: "12px", color: "var(--text-tertiary)", marginTop: "8px", lineHeight: 1.5 }}>
                        {plan?.value === "solo" ? "Best for independent consultants and freelancers." :
                         plan?.value === "small" ? "Best for small consultancy teams." :
                         plan?.value === "medium" ? "Best for growing firms and practices." :
                         "Best for established firms with multiple teams."}
                      </p>
                      <button onClick={() => redirectToStripe("subscription", { tier: matchedTier })}
                        className="btn btn-primary" style={{ marginTop: "14px", width: "100%", padding: "12px", fontSize: "14px" }}>
                        Subscribe — {priceLabel}
                      </button>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}
        </div>

        {/* Top Up Credits */}
        {isDirector && (
          <div className="card" style={{ padding: "28px" }}>
            <div className="card-header" style={{ marginBottom: "20px" }}>Top Up Credits</div>
            <p style={{ fontSize: "14px", color: "var(--text-tertiary)", marginBottom: "16px" }}>Purchase additional credits. Credits never expire.</p>
            <div className="meta-grid-4" style={{ gap: "12px" }}>
              {[{ c: 100, p: 85 }, { c: 300, p: 142.99 }, { c: 500, p: 220 }, { c: 1000, p: 300 }].map((pack) => (
                <button key={pack.c} onClick={() => redirectToStripe("credits", { amount: pack.c })}
                  style={{ padding: "16px", border: "1px solid var(--border)", borderRadius: "10px", textAlign: "center", cursor: "pointer", background: "var(--bg-card)", fontFamily: "inherit", transition: "all 0.2s" }}>
                  <p style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)" }}>{pack.c}</p>
                  <p style={{ fontSize: "13px", color: "var(--accent)" }}>£{pack.p}</p>
                </button>
              ))}
            </div>
            <div style={{ marginTop: "16px", padding: "10px 14px", background: "var(--accent-subtle)", borderRadius: "8px", border: "1px solid rgba(37, 99, 235, 0.12)", fontSize: "12px", color: "var(--text-tertiary)" }}>
              Purchases are processed via Stripe. You will be redirected to complete payment, then returned automatically.
            </div>
          </div>
        )}

        {/* Delete Account */}
        {isDirector && (
          <div className="card" style={{ padding: "28px", borderColor: "rgba(239,68,68,0.2)" }}>
            <div className="card-header" style={{ marginBottom: "20px", color: "var(--danger)" }}>Delete Account</div>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "16px" }}>
              Permanently delete all data for this organisation. This cannot be undone.
            </p>
            <button onClick={async () => {
              if (confirm("This will log you out and clear all local data. Continue?")) {
                await logout();
                window.location.href = "/";
              }
            }} className="btn btn-danger" style={{ padding: "12px 28px", fontSize: "14px" }}>
              Delete Account
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
