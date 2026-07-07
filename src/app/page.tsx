"use client";

import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { getStripeRedirectResult, clearStripeRedirectParams, getTierLimits } from "@/lib/utils";
import type { FirmTier } from "@/types";

function getCompanySopCount(companyId: string): number {
  const companies = useStore.getState().companies;
  const c = companies.find(c => c.id === companyId);
  return c?.sopCount ?? 0;
}

const LANDING_SECTIONS = [
  { id: "what-it-does", label: "Capabilities" },
  { id: "who-its-for", label: "Audience" },
  { id: "industry-intelligence", label: "Industries" },
  { id: "pricing", label: "Pricing" },
  { id: "faqs", label: "FAQs" },
];

export default function HomePage() {
  const session = useStore((s) => s.session);
  const getCompany = useStore((s) => s.getCompany);
  const dismissNotification = useStore((s) => s.dismissNotification);
  const clearNotifications = useStore((s) => s.clearNotifications);
  const addCredits = useStore((s) => s.addCredits);
  const activateSubscription = useStore((s) => s.activateSubscription);
  const addNotification = useStore((s) => s.addNotification);
  const notifications = useStore((s) => s.notifications);
  const vault = useStore((s) => s.vault);
  const allCompanies = useStore((s) => s.companies);
  const deleteCompany = useStore((s) => s.deleteCompany);
  const adminSetSubscription = useStore((s) => s.adminSetSubscription);
  const adminSetCredits = useStore((s) => s.adminSetCredits);
  const adminSetTier = useStore((s) => s.adminSetTier);
  const setShowTour = useStore((s) => s.setShowTour);
  const router = useRouter();
  const company = getCompany();
  const [greeting, setGreeting] = useState("");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [editCreditsId, setEditCreditsId] = useState<string | null>(null);
  const [creditsAmount, setCreditsAmount] = useState("100");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [stripeSuccess, setStripeSuccess] = useState<string | null>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = new Date().getHours();
    if (h < 12) setGreeting("Good morning");
    else if (h < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    const result = getStripeRedirectResult();
    if (result) {
      clearStripeRedirectParams();
      if (result.type === "credits" && result.amount) {
        addCredits(result.amount);
        addNotification({ type: "credits_added", title: "Credits Added", message: `${result.amount} credits have been added to your account.` });
        setStripeSuccess(`${result.amount} credits added`);
      } else if (result.type === "subscription" && result.tier) {
        activateSubscription(result.tier as FirmTier);
        if (session) adminSetTier(session.companyId, result.tier as FirmTier);
        addNotification({ type: "subscription_renewed", title: "Subscription Active", message: `Your ${result.tier} subscription is now live.` });
        setStripeSuccess(`${result.tier} subscription activated`);
        setShowTour(true);
      }
    }

    router.prefetch("/register");
    router.prefetch("/login");
    router.prefetch("/forge");
    router.prefetch("/checklist");
    router.prefetch("/armory");
    router.prefetch("/settings");
    router.prefetch("/choose-focus");
    router.prefetch("/about");
    router.prefetch("/contact");
    router.prefetch("/privacy");
    router.prefetch("/terms");
    router.prefetch("/batch");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!session || !company) {
    return (
      <div className="fade-in">
        {/* Hero */}
        <section style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 32px",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 50% 0%, rgba(201,160,90,0.04) 0%, transparent 50%)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 80% 80%, rgba(59,130,246,0.025) 0%, transparent 50%)",
            pointerEvents: "none",
          }} />
          <div style={{ position: "absolute", top: "18%", right: "15%", width: "120px", height: "120px", border: "1px solid rgba(201,160,90,0.08)", borderRadius: "20px", transform: "rotate(35deg)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "22%", left: "12%", width: "80px", height: "80px", border: "1px solid rgba(59,130,246,0.06)", borderRadius: "50%", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "35%", left: "10%", width: "48px", height: "48px", border: "1px solid rgba(201,160,90,0.06)", borderRadius: "12px", transform: "rotate(25deg)", pointerEvents: "none" }} />

          <div style={{ maxWidth: "820px", textAlign: "center", position: "relative", zIndex: 1 }}>
            <div className="ogi-badge">Introducing Operational Governance Infrastructure</div>
            <h1 style={{
              fontSize: "54px",
              fontWeight: 700,
              lineHeight: 1.06,
              color: "var(--white)",
              marginBottom: "20px",
              letterSpacing: "-0.03em",
            }}>
              The World&apos;s First<br />
              <span style={{ color: "var(--accent)" }}>Operational Governance</span><br />
              Infrastructure Platform
            </h1>
            <p style={{
              fontSize: "17px",
              lineHeight: 1.8,
              color: "var(--text-secondary)",
              maxWidth: "580px",
              margin: "0 auto 44px",
            }}>
              SOPMaster transforms how enterprises document, govern, and scale operational procedures. 
              Built for organisations that treat operational discipline as a strategic asset.
            </p>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => router.push("/register")} className="btn btn-primary" style={{ padding: "14px 38px", fontSize: "14px" }}>
                Deploy OGI
              </button>
              <button onClick={() => router.push("/login")} className="btn btn-secondary" style={{ padding: "14px 38px", fontSize: "14px" }}>
                Access Platform
              </button>
              <button onClick={() => featuresRef.current?.scrollIntoView({ behavior: "smooth" })} className="btn btn-ghost" style={{ padding: "14px 38px", fontSize: "14px" }}>
                Explore
              </button>
            </div>
            <p style={{ fontSize: "12px", color: "var(--text-tertiary)", marginTop: "36px", letterSpacing: "0.04em" }}>
              Trusted by solo practitioners, consultancies, and enterprise organisations
            </p>
          </div>

          <div style={{ position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)" }}>
            <button onClick={() => featuresRef.current?.scrollIntoView({ behavior: "smooth" })}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-tertiary)", fontSize: "18px", opacity: 0.3 }}>
              ↓
            </button>
          </div>
        </section>

        {/* What It Does */}
        <section id="what-it-does" ref={featuresRef} className="section-container">
          <div style={{ maxWidth: "960px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "52px" }}>
              <div className="ogi-badge">Core Capabilities</div>
              <h2 style={{ fontSize: "34px", fontWeight: 600, color: "var(--white)", marginBottom: "14px", letterSpacing: "-0.02em" }}>Infrastructure for Operational Governance</h2>
              <p style={{ fontSize: "16px", color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto", lineHeight: 1.7 }}>
                SOPMaster provides the foundational layer for creating, managing, and governing operational procedures across your entire organisation.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
              {[
                { title: "Structured SOP Generation", desc: "Turn workflows into auditable, jurisdiction-aware standard operating procedures with full governance controls and cryptographic verification." },
                { title: "Multi-Jurisdiction Compliance", desc: "28+ jurisdictional frameworks with automatic regulatory triggers, retention schedules, and sector-specific legislation references." },
                { title: "Operational Command Centre", desc: "Real-time visibility across all documents, team collaboration, batch operations, and enterprise-grade document lifecycle management." },
              ].map((f, i) => (
                <div key={i} className="workspace-card" style={{ padding: "32px 28px", textAlign: "center", cursor: "default" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "var(--accent-subtle)", border: "1px solid var(--accent-border)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", fontSize: "16px", color: "var(--accent)" }}>
                    {["01", "02", "03"][i]}
                  </div>
                  <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--white)", marginBottom: "10px" }}>{f.title}</h3>
                  <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.7 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who It's For */}
        <section id="who-its-for" className="section-container" style={{ paddingTop: "40px" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <div className="ogi-badge">Designed For</div>
              <h2 style={{ fontSize: "34px", fontWeight: 600, color: "var(--white)", marginBottom: "12px", letterSpacing: "-0.02em" }}>Who We Serve</h2>
            </div>
            <div className="glass" style={{ padding: "32px" }}>
              {[
                { type: "Solo Practitioners", desc: "Standardise client delivery. Operate like a system, not a freelancer." },
                { type: "Small Consultancies", desc: "Align your team around repeatable delivery frameworks." },
                { type: "Mid-Market Firms", desc: "Scale output without losing process control." },
                { type: "Enterprise Organisations", desc: "Deploy operational governance across departments, regions, and business units." },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", gap: "18px", padding: "20px 0",
                  borderBottom: i < 3 ? "1px solid var(--border)" : "none",
                }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: "var(--accent-subtle)", border: "1px solid var(--accent-border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "12px", color: "var(--accent)", fontWeight: 600 }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "15px", fontWeight: 600, color: "var(--white)", marginBottom: "4px" }}>{item.type}</h3>
                    <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.7 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Intelligence */}
        <section id="industry-intelligence" className="section-container">
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <div className="ogi-badge">Sector Coverage</div>
              <h2 style={{ fontSize: "34px", fontWeight: 600, color: "var(--white)", marginBottom: "12px", letterSpacing: "-0.02em" }}>Industry Intelligence</h2>
              <p style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                Sector-specific regulatory context embedded into every document generated.
              </p>
            </div>
            <div className="glass" style={{ padding: "28px" }}>
              {[
                { industry: "Financial Services", focus: "FCA compliance, AML/KYC frameworks, transaction reporting" },
                { industry: "Healthcare", focus: "CQC compliance, clinical governance, information governance" },
                { industry: "Professional Services", focus: "Client onboarding, engagement management, conflict checking" },
                { industry: "Technology / SaaS", focus: "Data governance, incident response, SLA management" },
                { industry: "Manufacturing", focus: "ISO standards, quality management, supply chain controls" },
                { industry: "Construction", focus: "CDM regulations, health & safety, site governance" },
              ].map((item, i) => (
                <div key={i} className="data-row" style={{ borderBottom: i < 5 ? "1px solid var(--border)" : "none", padding: "14px 0", gap: "12px" }}>
                  <span className="data-label" style={{ fontWeight: 500, minWidth: "180px", fontSize: "14px" }}>{item.industry}</span>
                  <span className="data-value" style={{ fontWeight: 400, color: "var(--text-secondary)", fontSize: "13px" }}>{item.focus}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Professional Documentation */}
        <section className="section-container" style={{ paddingTop: "20px" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div className="workspace-card" style={{ cursor: "default" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px" }}>
                {[
                  { label: "Format", value: "Word-Compatible HTML" },
                  { label: "Classification", value: "Controlled Document" },
                  { label: "Structure", value: "Governance / Procedure / Controls / Audit" },
                  { label: "Verification", value: "Cryptographic Hash" },
                  { label: "Compliance", value: "Jurisdiction-Aware" },
                  { label: "Retention", value: "Configurable Schedules" },
                ].map((d, i) => (
                  <div key={i}>
                    <p style={{ fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-tertiary)", marginBottom: "4px" }}>{d.label}</p>
                    <p style={{ fontSize: "14px", color: "var(--white)", fontWeight: 500 }}>{d.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section id="faqs" ref={faqRef} className="section-container">
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <div className="ogi-badge">Answers</div>
              <h2 style={{ fontSize: "34px", fontWeight: 600, color: "var(--white)", marginBottom: "12px", letterSpacing: "-0.02em" }}>Frequently Asked Questions</h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)" }}>
                Have a different question? <Link href="/contact" style={{ color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent-border)" }}>Contact our team</Link>.
              </p>
            </div>
            <div className="glass" style={{ padding: "24px 28px" }}>
              {[
                { q: "What is Operational Governance Infrastructure?", a: "OGI is the foundational layer that enterprises use to create, manage, and govern operational procedures. Unlike traditional SOP tools, OGI provides jurisdiction-aware compliance, cryptographic verification, and enterprise lifecycle management." },
                { q: "How does SOP generation work?", a: "Configure your operational context — jurisdiction, industry, and delivery workflows. SOPMaster generates structured, governance-grade documents with full compliance references, audit trails, and document controls." },
                { q: "What formats are supported?", a: "All documents generate as Word-compatible HTML files. They open directly in Microsoft Word, Google Docs, or any browser with full formatting, governance structure, and document controls preserved." },
                { q: "How does jurisdiction compliance work?", a: "OGI includes 28+ built-in jurisdictional frameworks (UK, US Federal & State, EU, Canada, Australia, UAE, Singapore, and more). Each document automatically references the correct legislation, retention schedules, and regulatory triggers for the selected jurisdiction." },
                { q: "What industries do you support?", a: "SOPMaster supports Financial Services, Healthcare, Construction, Professional Services, Technology, Manufacturing, Logistics, and more. Each document is tailored to the selected industry and jurisdictional context." },
                { q: "Can I collaborate with my team?", a: "Yes. SOPMaster includes team management, shared document vaults, batch operations, and role-based access controls. Director accounts can manage team members, credits, and subscription settings." },
              ].map((faq, i) => (
                <div key={i} style={{
                  borderBottom: i < 5 ? "1px solid var(--border)" : "none",
                  padding: "18px 0",
                  cursor: "pointer",
                }} onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
                    <h3 style={{ fontSize: "14px", fontWeight: 500, color: "var(--white)", margin: 0 }}>{faq.q}</h3>
                    <span style={{ fontSize: "16px", color: "var(--text-tertiary)", transition: "transform 0.3s ease", transform: activeFaq === i ? "rotate(180deg)" : "none", flexShrink: 0 }}>
                      {activeFaq === i ? "−" : "+"}
                    </span>
                  </div>
                  {activeFaq === i && (
                    <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.7, marginTop: "12px" }}>{faq.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" ref={pricingRef} className="section-container">
          <div style={{ maxWidth: "960px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <div className="ogi-badge">Plans</div>
              <h2 style={{ fontSize: "34px", fontWeight: 600, color: "var(--white)", marginBottom: "12px", letterSpacing: "-0.02em" }}>Pricing</h2>
              <p style={{ fontSize: "15px", color: "var(--text-secondary)" }}>
                Choose the plan that fits your organisation.
              </p>
            </div>
            <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
              {[
                { tier: "solo", name: "Solo Professional", price: "£400", credits: "300/mo" },
                { tier: "small", name: "Small Consultancy", price: "£2,500", credits: "2,500/mo", tag: "Popular" },
                { tier: "medium", name: "Medium Consultancy", price: "£5,100", credits: "6,000/mo" },
                { tier: "large", name: "Large Consultancy", price: "£9,000", credits: "12,000/mo" },
              ].map((p, i) => (
                <div key={i} className="workspace-card" style={{ cursor: "default", display: "flex", flexDirection: "column", position: "relative" }}>
                  {p.tag && (
                    <div style={{
                      position: "absolute", top: "-1px", left: "50%", transform: "translateX(-50%)",
                      fontSize: "9px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em",
                      color: "var(--accent)", background: "var(--navy-800)", padding: "3px 16px",
                      border: "1px solid var(--accent-border)", borderTop: "none", borderRadius: "0 0 8px 8px",
                    }}>
                      {p.tag}
                    </div>
                  )}
                  <h3 style={{ fontSize: "13px", fontWeight: 600, color: "var(--white)", marginBottom: "8px", letterSpacing: "0.02em" }}>{p.name}</h3>
                  <p style={{ fontSize: "34px", fontWeight: 700, color: "var(--white)", marginBottom: "2px", letterSpacing: "-0.02em" }}>{p.price}<span style={{ fontSize: "14px", fontWeight: 400, color: "var(--text-tertiary)" }}>/mo</span></p>
                  <p style={{ fontSize: "13px", color: "var(--text-tertiary)", marginBottom: "22px" }}>{p.credits}</p>
                  <button onClick={() => router.push("/register")} className="btn btn-primary" style={{ width: "100%", marginTop: "auto" }}>
                    Deploy OGI
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ padding: "56px 32px 28px", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "40px", marginBottom: "36px" }}>
              <div>
                <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--white)", marginBottom: "10px", letterSpacing: "-0.01em" }}>
                  <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}>OGI</span>
                  <span style={{ color: "var(--text-muted)", margin: "0 6px" }}>/</span>
                  SOPMaster
                </p>
                <p style={{ fontSize: "13px", color: "var(--text-tertiary)", lineHeight: 1.7 }}>
                  The world&apos;s first Operational Governance Infrastructure platform. 
                  Transform how your organisation documents, governs, and scales operational procedures.
                </p>
              </div>
              <div>
                <p style={{ fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-tertiary)", marginBottom: "14px" }}>Platform</p>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "8px" }}><Link href="/forge" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>SOP Builder</Link></p>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "8px" }}><Link href="/checklist" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Checklist Builder</Link></p>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "8px" }}><Link href="/batch" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Batch Builder</Link></p>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "8px" }}><Link href="/armory" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Document Vault</Link></p>
              </div>
              <div>
                <p style={{ fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-tertiary)", marginBottom: "14px" }}>Company</p>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "8px" }}><Link href="/about" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>About</Link></p>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "8px" }}><Link href="/contact" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Contact</Link></p>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "8px" }}><Link href="/privacy" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Privacy</Link></p>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "8px" }}><Link href="/terms" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Terms</Link></p>
              </div>
              <div>
                <p style={{ fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-tertiary)", marginBottom: "14px" }}>Connect</p>
                <a href="https://www.linkedin.com/in/sopmaster" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-secondary)", fontSize: "13px", textDecoration: "none" }}>
                  LinkedIn
                </a>
                <p style={{ fontSize: "12px", color: "var(--text-tertiary)", marginTop: "16px" }}>Dubai Global Tax Code</p>
                <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>txcd_20030000 · 0% VAT</p>
              </div>
            </div>
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "20px", textAlign: "center" }}>
              <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>© {new Date().getFullYear()} SOPMaster. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  const activeCount = vault.filter((s) => s.status === "active").length;
  const unreadNotifs = notifications.filter((n) => !n.read);

  if (session.isDirector) {
    const totalSops = allCompanies.reduce((sum, c) => sum + getCompanySopCount(c.id), 0);
    const subscribedCount = allCompanies.filter(c => c.subscriptionActive === "yes").length;

    return (
      <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "40px 32px" }} className="fade-in">
        <div style={{ marginBottom: "32px" }}>
          <div className="ogi-badge">Administration</div>
          <h1 style={{ fontSize: "28px", fontWeight: 600, color: "var(--white)", marginBottom: "6px", letterSpacing: "-0.02em" }}>
            Platform Overview
          </h1>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
            {allCompanies.length} registered firms · {totalSops} total documents
          </p>
        </div>

        <div className="command-bar" style={{ marginBottom: "28px" }}>
          <div style={{ textAlign: "center" }}><div className="stat-label">Registered Firms</div><div className="stat-value" style={{ fontSize: "26px" }}>{allCompanies.length}</div></div>
          <div style={{ textAlign: "center" }}><div className="stat-label">Total SOPs</div><div className="stat-value" style={{ fontSize: "26px" }}>{totalSops}</div></div>
          <div style={{ textAlign: "center" }}><div className="stat-label">Subscribed</div><div className="stat-value" style={{ fontSize: "26px", color: "var(--success)" }}>{subscribedCount}</div></div>
          <div style={{ textAlign: "center" }}><div className="stat-label">Unsubscribed</div><div className="stat-value" style={{ fontSize: "26px", color: "var(--text-tertiary)" }}>{allCompanies.length - subscribedCount}</div></div>
        </div>

        <div className="card" style={{ padding: "28px" }}>
          <div className="card-header">All Firms</div>
          <div className="table-wrap">
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <th style={{ textAlign: "left", padding: "10px 8px", color: "var(--text-tertiary)", fontWeight: 500, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Firm</th>
                  <th style={{ textAlign: "left", padding: "10px 8px", color: "var(--text-tertiary)", fontWeight: 500, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>SOPs</th>
                  <th style={{ textAlign: "left", padding: "10px 8px", color: "var(--text-tertiary)", fontWeight: 500, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Plan</th>
                  <th style={{ textAlign: "left", padding: "10px 8px", color: "var(--text-tertiary)", fontWeight: 500, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Credits</th>
                  <th style={{ textAlign: "left", padding: "10px 8px", color: "var(--text-tertiary)", fontWeight: 500, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Subscription</th>
                  <th style={{ textAlign: "left", padding: "10px 8px", color: "var(--text-tertiary)", fontWeight: 500, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Registered</th>
                  <th style={{ textAlign: "right", padding: "10px 8px", color: "var(--text-tertiary)", fontWeight: 500, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allCompanies.map((c) => {
                  const isDirectorCompany = c.email === session.email;
                  const sopCount = getCompanySopCount(c.id);
                  return (
                    <tr key={c.id} style={{ borderBottom: "1px solid var(--border)" }}>
                      <td style={{ padding: "10px 8px", color: "var(--white)", fontWeight: 500 }}>
                        {c.name}
                        {isDirectorCompany && <span className="tag" style={{ marginLeft: "8px", fontSize: "9px" }}>Admin</span>}
                      </td>
                      <td style={{ padding: "10px 8px", color: "var(--text-secondary)" }}>{sopCount}</td>
                      <td style={{ padding: "10px 8px" }}>
                        {isDirectorCompany ? (
                          <span style={{ color: "var(--text-secondary)" }}>{getTierLimits(c.tier).label}</span>
                        ) : (
                          <select value={c.tier} onChange={(e) => adminSetTier(c.id, e.target.value as FirmTier)}
                            style={{ background: "transparent", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-secondary)", fontSize: "12px", padding: "2px 4px" }}>
                            <option value="solo">Solo Professional</option>
                            <option value="small">Small Firm Protocol</option>
                            <option value="medium">Medium Firm Protocol</option>
                            <option value="large">Large Firm Protocol</option>
                          </select>
                        )}
                      </td>
                      <td style={{ padding: "10px 8px", color: "var(--text-secondary)" }}>
                        {isDirectorCompany ? (
                          <span>{c.credits}</span>
                        ) : editCreditsId === c.id ? (
                          <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                            <input type="number" value={creditsAmount} onChange={(e) => setCreditsAmount(e.target.value)}
                              style={{ width: "60px", background: "var(--navy-700)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--white)", padding: "2px 4px", fontSize: "12px" }} />
                            <button onClick={() => { adminSetCredits(c.id, parseInt(creditsAmount) || 0); setEditCreditsId(null); }} className="btn btn-primary" style={{ fontSize: "9px", padding: "2px 6px" }}>Set</button>
                            <button onClick={() => setEditCreditsId(null)} className="btn-ghost" style={{ fontSize: "9px", padding: "2px 6px" }}>x</button>
                          </div>
                        ) : (
                          <span onClick={() => { setEditCreditsId(c.id); setCreditsAmount(String(c.credits)); }} style={{ cursor: "pointer", borderBottom: "1px dashed var(--border)" }}>{c.credits}</span>
                        )}
                      </td>
                      <td style={{ padding: "10px 8px" }}>
                        {isDirectorCompany ? (
                          <span style={{ color: "var(--success)", fontSize: "11px" }}>Active</span>
                        ) : (
                          <button onClick={() => adminSetSubscription(c.id, c.subscriptionActive !== "yes")}
                            className={`btn ${c.subscriptionActive === "yes" ? "btn-secondary" : "btn-primary"}`}
                            style={{ fontSize: "9px", padding: "2px 8px" }}>
                            {c.subscriptionActive === "yes" ? "Deactivate" : "Activate"}
                          </button>
                        )}
                      </td>
                      <td style={{ padding: "10px 8px", color: "var(--text-tertiary)", fontSize: "12px" }}>{c.createdAt}</td>
                      <td style={{ padding: "10px 8px", textAlign: "right" }}>
                        {isDirectorCompany ? (
                          <span style={{ color: "var(--text-muted)", fontSize: "11px" }}>Protected</span>
                        ) : deleteConfirmId === c.id ? (
                          <div style={{ display: "flex", gap: "4px", justifyContent: "flex-end" }}>
                            <button onClick={() => { deleteCompany(c.id); setDeleteConfirmId(null); }} className="btn btn-primary" style={{ fontSize: "9px", padding: "2px 6px", background: "var(--danger)", borderColor: "var(--danger)" }}>Confirm</button>
                            <button onClick={() => setDeleteConfirmId(null)} className="btn-ghost" style={{ fontSize: "9px", padding: "2px 6px" }}>Cancel</button>
                          </div>
                        ) : (
                          <button onClick={() => setDeleteConfirmId(c.id)} className="btn-ghost" style={{ fontSize: "11px", color: "var(--danger)", padding: "2px 6px" }}>Delete</button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "40px 32px" }} className="fade-in">
      {/* Header */}
      <div style={{ marginBottom: "36px" }}>
        <div className="ogi-badge">Command Centre</div>
        <h1 style={{ fontSize: "28px", fontWeight: 600, color: "var(--white)", marginBottom: "4px", letterSpacing: "-0.02em" }}>
          {greeting}, {session.name}
        </h1>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
          {company.name} · {getTierLimits(company.tier).label} · {company.jurisdiction} jurisdiction
        </p>
      </div>

      {stripeSuccess && (
        <div className="glass" style={{ marginBottom: "24px", padding: "16px 20px", border: "1px solid rgba(16,185,129,0.3)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--success)", marginBottom: "2px" }}>Payment successful</p>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{stripeSuccess}</p>
            </div>
            <button onClick={() => setStripeSuccess(null)} className="btn btn-secondary" style={{ fontSize: "11px" }}>Dismiss</button>
          </div>
        </div>
      )}

      {unreadNotifs.length > 0 && (
        <div className="glass" style={{ marginBottom: "24px", padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <span style={{ fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-tertiary)" }}>
              Notifications ({unreadNotifs.length})
            </span>
            <button onClick={clearNotifications} className="btn-ghost" style={{ fontSize: "11px", padding: "2px 8px" }}>Clear all</button>
          </div>
          {unreadNotifs.slice(0, 3).map((n) => (
            <div key={n.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
              <div>
                <p style={{ fontSize: "14px", fontWeight: 500, color: "var(--white)" }}>{n.title}</p>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{n.message}</p>
              </div>
              <button onClick={() => dismissNotification(n.id)} className="btn-ghost" style={{ fontSize: "11px", padding: "2px 8px" }}>Dismiss</button>
            </div>
          ))}
        </div>
      )}

      {/* Command Centre Stats */}
      <div className="command-bar" style={{ marginBottom: "28px" }}>
        <div style={{ textAlign: "center" }}>
          <div className="stat-label">Credits Available</div>
          <div className="stat-value" style={{ fontSize: "28px" }}>{company.credits}</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div className="stat-label">Active Documents</div>
          <div className="stat-value" style={{ fontSize: "28px" }}>{activeCount}</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div className="stat-label">Team Members</div>
          <div className="stat-value" style={{ fontSize: "28px" }}>{company.team.length}</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div className="stat-label">Subscription</div>
          <div className="stat-value" style={{ fontSize: "20px", color: company.subscriptionActive === "yes" ? "var(--success)" : "var(--text-tertiary)", marginTop: "6px" }}>
            {company.subscriptionActive === "yes" ? "Active" : "Trial"}
          </div>
        </div>
      </div>

      {/* Workspace Cards */}
      <div className="dash-grid" style={{ marginBottom: "28px" }}>
        {!company.focus ? (
          <div className="workspace-card" style={{ gridColumn: "1 / -1", textAlign: "center", padding: "48px 32px" }}>
            <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "18px" }}>
              Choose your focus to unlock the tools you need.
            </p>
            <button onClick={() => router.push("/choose-focus")} className="btn btn-primary" style={{ padding: "12px 32px", fontSize: "14px" }}>
              Choose Focus
            </button>
          </div>
        ) : (
          <>
            <div className="workspace-card" onClick={() => company.focus === "sops" && router.push("/forge")} style={company.focus !== "sops" ? { opacity: 0.5, cursor: "not-allowed" } : {}}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "var(--accent-subtle)", border: "1px solid var(--accent-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", color: "var(--accent)" }}>S</div>
                <span className="tag tag-gold" style={{ fontSize: "9px" }}>{company.focus === "sops" ? "Active" : "Locked"}</span>
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>SOP Builder</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "16px" }}>
                Generate structured operational procedures with full governance controls.
              </p>
              <div style={{ display: "flex", gap: "8px" }}>
                <span className="tag">10 credits</span>
                <span className="tag">{getTierLimits(company.tier).label}</span>
              </div>
            </div>

            <div className="workspace-card" onClick={() => company.focus === "checklists" && router.push("/checklist")} style={company.focus !== "checklists" ? { opacity: 0.5, cursor: "not-allowed" } : {}}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "var(--success-subtle)", border: "1px solid rgba(16,185,129,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", color: "var(--success)" }}>C</div>
                <span className="tag tag-green" style={{ fontSize: "9px" }}>{company.focus === "checklists" ? "Active" : "Locked"}</span>
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Checklist Builder</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "16px" }}>
                Create operational checklists for recurring processes and compliance checks.
              </p>
              <div style={{ display: "flex", gap: "8px" }}>
                <span className="tag">1 credit</span>
                <span className="tag">{getTierLimits(company.tier).label}</span>
              </div>
            </div>

            <div className="workspace-card" onClick={() => router.push("/batch")} style={company.subscriptionActive !== "yes" ? { opacity: 0.5, cursor: "not-allowed" } : {}}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "var(--blue-subtle)", border: "1px solid rgba(59,130,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", color: "var(--blue-accent)" }}>B</div>
                <span className="tag tag-blue" style={{ fontSize: "9px" }}>{company.subscriptionActive === "yes" ? "Available" : "Premium"}</span>
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Batch Builder</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "16px" }}>
                Generate entire SOP packages across departments in a single operation.
              </p>
              <div style={{ display: "flex", gap: "8px" }}>
                <span className="tag">Bulk operation</span>
                <span className="tag tag-gold">Subscription</span>
              </div>
            </div>

            <div className="workspace-card" onClick={() => router.push("/armory")}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "var(--bg-elevated)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", color: "var(--text-secondary)" }}>V</div>
                <span className="tag" style={{ fontSize: "9px" }}>{vault.length} docs</span>
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Document Vault</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "16px" }}>
                Access, download, and manage your complete document inventory.
              </p>
              <div style={{ display: "flex", gap: "8px" }}>
                <span className="tag">{activeCount} active</span>
                <span className="tag">{vault.filter(s => s.favorite).length} starred</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Quick actions */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "32px" }}>
        <button onClick={() => router.push("/settings")} className="btn btn-secondary" style={{ padding: "10px 20px", fontSize: "12px" }}>
          Administration
        </button>
        {vault.length > 0 && (
          <button onClick={() => router.push("/armory")} className="btn btn-secondary" style={{ padding: "10px 20px", fontSize: "12px" }}>
            View All Documents
          </button>
        )}
      </div>

      {/* Latest Documents */}
      {vault.length > 0 && (
        <div className="glass">
          <div style={{ padding: "20px 24px 12px", borderBottom: "1px solid var(--border)" }}>
            <span style={{ fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--accent)" }}>Recent Documents</span>
          </div>
          {vault.slice(-5).reverse().map((sop) => (
            <div key={sop.id} className="doc-row" style={{ padding: "12px 24px" }}>
              <span className="status-dot" style={{ background: sop.status === "active" ? "var(--success)" : "var(--text-tertiary)" }}></span>
              <span style={{ flex: 1, color: "var(--white)", fontWeight: 500, fontSize: "14px" }}>{sop.title}</span>
              <span style={{ fontSize: "12px", color: "var(--text-tertiary)", width: "100px" }} className="hide-mobile">{sop.dateCreated}</span>
              <span className="tag" style={{ width: "auto", fontSize: "10px" }}>{sop.jurisdiction}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
