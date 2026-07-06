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
        <section className="landing-hero" style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 24px",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 80% 50% at 50% 40%, rgba(59,130,246,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(1px 1px at 20% 30%, rgba(148,163,184,0.15) 0%, transparent 50%), radial-gradient(1px 1px at 40% 70%, rgba(148,163,184,0.1) 0%, transparent 50%), radial-gradient(1px 1px at 60% 20%, rgba(148,163,184,0.12) 0%, transparent 50%), radial-gradient(1px 1px at 80% 60%, rgba(148,163,184,0.08) 0%, transparent 50%)",
            backgroundSize: "200px 200px",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.03) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute",
            bottom: "15%",
            right: "15%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.02) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <div style={{ maxWidth: "640px", textAlign: "center", position: "relative", zIndex: 1 }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "24px",
              padding: "8px 20px",
              border: "1px solid rgba(59,130,246,0.2)",
              borderRadius: "8px",
              background: "rgba(59,130,246,0.04)",
            }}>
              <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#3B82F6" }}>
                Consultant Systems Platform
              </span>
            </div>
            <h1 style={{
              fontSize: "36px",
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#F1F5F9",
              marginBottom: "16px",
              letterSpacing: "-0.02em",
            }}>
              <span style={{ display: "block" }}>SOP<span style={{ color: "#3B82F6" }}>Master</span></span>
              <span style={{ display: "block", fontSize: "18px", fontWeight: 400, color: "#94A3B8", marginTop: "4px" }}>Operational Documentation Platform for Consultants</span>
            </h1>
            <p style={{
              fontSize: "16px",
              lineHeight: 1.6,
              color: "#94A3B8",
              marginBottom: "36px",
              maxWidth: "480px",
              margin: "0 auto 36px",
            }}>
              The operating system for consultants who run structured delivery. We don&apos;t help you &quot;write SOPs.&quot; We help you turn consulting work into repeatable systems, client delivery frameworks, and operational structure that scales.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => router.push("/register")} className="btn btn-primary" style={{ padding: "10px 28px", fontSize: "14px" }}>
                Get Started
              </button>
              <button onClick={() => router.push("/login")} className="btn btn-secondary" style={{ padding: "10px 28px", fontSize: "14px" }}>
                Sign In
              </button>
              <button onClick={() => featuresRef.current?.scrollIntoView({ behavior: "smooth" })} className="btn btn-ghost" style={{ padding: "10px 28px", fontSize: "14px" }}>
                Learn More
              </button>
            </div>
            <p style={{
              fontSize: "13px",
              lineHeight: 1.5,
              color: "#64748B",
              marginTop: "32px",
              fontStyle: "italic",
            }}>
              Used by solo consultants, freelancers, and consulting firms that take delivery seriously.
            </p>
          </div>

          <div style={{ position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)" }}>
            <button onClick={() => featuresRef.current?.scrollIntoView({ behavior: "smooth" })}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#64748B", fontSize: "20px", opacity: 0.6 }}>
              ↓
            </button>
          </div>
        </section>

        <section style={{ padding: "60px 24px", borderTop: "1px solid #1E293B" }}>
          <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontSize: "20px", fontWeight: 500, color: "#F1F5F9", lineHeight: 1.5, marginBottom: "8px" }}>
              Operational Documentation Platform for Consultants.
            </p>
            <p style={{ fontSize: "16px", color: "#94A3B8", lineHeight: 1.6 }}>
              Everything you do becomes a system. Every client becomes structured. Every process becomes repeatable.
            </p>
          </div>
        </section>

        <section id="what-it-does" ref={featuresRef} style={{ padding: "80px 24px", borderTop: "1px solid #1E293B" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#F1F5F9", marginBottom: "8px" }}>What It Does</h2>
              <p style={{ fontSize: "14px", color: "#64748B", maxWidth: "560px", margin: "0 auto" }}>
                SOPMaster turns real consulting work into operational systems you can reuse across clients. Instead of writing documents from scratch for each engagement, you build once and deploy across your entire practice.
              </p>
            </div>
            <div className="card" style={{ padding: "32px" }}>
              <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                {[
                  "SOPs built from real workflows",
                  "Client delivery frameworks",
                  "Repeatable consulting processes",
                  "Standardised internal operations",
                  "Instant system capture",
                  "Reusable consulting assets instead of one-off work",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#3B82F6", flexShrink: 0 }}></div>
                    <span style={{ fontSize: "14px", color: "#F1F5F9" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <p style={{ fontSize: "14px", color: "#94A3B8", lineHeight: 1.6, textAlign: "center", marginTop: "24px" }}>
              Generate your first <Link href="/forge" style={{ color: "#3B82F6", textDecoration: "underline" }}>SOP document</Link> or build a <Link href="/checklist" style={{ color: "#3B82F6", textDecoration: "underline" }}>compliance checklist</Link> directly from your workflows.
            </p>
          </div>
        </section>

        <section id="who-its-for" style={{ padding: "80px 24px", borderTop: "1px solid #1E293B" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#F1F5F9", marginBottom: "8px" }}>Who It&apos;s For</h2>
              <p style={{ fontSize: "14px", color: "#64748B" }}>
                Built for consultants who don&apos;t run messy operations.
              </p>
            </div>
            <div className="card">
              {[
                { type: "Solo Consultants", desc: "You stop operating like a freelancer and start working like a system." },
                { type: "Freelancers", desc: "Your delivery becomes consistent, structured, and client-ready." },
                { type: "Small Consulting Firms", desc: "Your team stops working differently on every client. You standardise delivery." },
                { type: "Medium Consulting Firms", desc: "You scale output without losing process control." },
                { type: "Large Consulting Firms", desc: "You operate with structured delivery systems across teams, clients, and workflows." },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", gap: "16px", padding: "16px 0",
                  borderBottom: i < 4 ? "1px solid #334155" : "none",
                }}>
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "12px", fontWeight: 600, color: "#3B82F6",
                    border: "1px solid rgba(59,130,246,0.3)", flexShrink: 0,
                  }}>
                    {i + 1}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#F1F5F9", marginBottom: "4px" }}>{item.type}</h3>
                    <p style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="what-makes-it-different" style={{ padding: "80px 24px", borderTop: "1px solid #1E293B" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#F1F5F9", marginBottom: "8px" }}>What Makes It Different</h2>
              <p style={{ fontSize: "14px", color: "#64748B", maxWidth: "560px", margin: "0 auto" }}>
                Most tools store information. SOPMaster structures how work is delivered, governed, and scaled across clients and teams.
              </p>
            </div>
            <div className="card" style={{ padding: "32px", textAlign: "center" }}>
              <p style={{ fontSize: "15px", color: "#F1F5F9", lineHeight: 1.6, marginBottom: "16px" }}>
                We don&apos;t store information. We turn it into systems that can be reused, sold, and scaled.
              </p>
              <p style={{ fontSize: "14px", color: "#94A3B8", lineHeight: 1.6, marginBottom: "0" }}>
                Unlike generic document tools or template libraries, SOPMaster builds jurisdiction-aware compliance documents with governance controls, team collaboration, and document verification baked in. Every document includes industry-specific regulatory triggers, cryptographic verification hashes, and configurable retention policies.
              </p>
            </div>
          </div>
        </section>

        <section id="positioning" style={{ padding: "80px 24px", borderTop: "1px solid #1E293B" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#F1F5F9", marginBottom: "8px" }}>Positioning</h2>
              <p style={{ fontSize: "14px", color: "#64748B", maxWidth: "520px", margin: "0 auto" }}>
                For consultants who think in systems, not tasks. SOPMaster replaces ad-hoc document creation with structured, repeatable frameworks that scale across your entire practice.
              </p>
            </div>
            <div className="card" style={{ padding: "32px", textAlign: "center" }}>
              <p style={{ fontSize: "15px", color: "#F1F5F9", lineHeight: 1.6, marginBottom: "16px" }}>
                SOPMaster is purpose-built for consultants, not generic document platforms repurposed for compliance work.
              </p>
              <p style={{ fontSize: "14px", color: "#94A3B8", lineHeight: 1.6, marginBottom: "0" }}>
                Whether you are a <Link href="/about" style={{ color: "#3B82F6", textDecoration: "underline" }}>solo practitioner</Link> standardising client delivery or a multi-team firm scaling operational governance across departments, SOPMaster adapts to your practice size and industry requirements. Learn more <Link href="/about" style={{ color: "#3B82F6", textDecoration: "underline" }}>about how SOPMaster works</Link> for different firm types.
              </p>
            </div>
          </div>
        </section>

        <section id="industry-intelligence" style={{ padding: "80px 24px", borderTop: "1px solid #1E293B" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#F1F5F9", marginBottom: "8px" }}>Industry Intelligence</h2>
              <p style={{ fontSize: "14px", color: "#64748B" }}>
                Sector-specific regulatory context for every document generated.
              </p>
            </div>
            <div className="card who-grid">
              {[
                { industry: "Financial Services", focus: "FCA compliance, AML/KYC frameworks, transaction reporting, reconciliation controls" },
                { industry: "Healthcare", focus: "CQC compliance, PHI protection, clinical governance, information governance" },
                { industry: "Construction", focus: "CDM regulations, health & safety, site governance, supply chain compliance" },
                { industry: "Professional Services", focus: "Client onboarding, engagement management, conflict checking, data protection" },
                { industry: "Manufacturing", focus: "ISO standards, quality management, supply chain controls, operational safety" },
                { industry: "Technology", focus: "Data governance, SaaS compliance, incident response, SLA management" },
              ].map((item, i) => (
                <div key={i} className="data-row" style={{ borderBottom: i < 5 ? "1px solid #334155" : "none" }}>
                  <span className="data-label" style={{ fontWeight: 500, minWidth: "180px" }}>{item.industry}</span>
                  <span className="data-value" style={{ fontWeight: 400, color: "#94A3B8", fontSize: "12px" }}>{item.focus}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="professional-documentation" style={{ padding: "80px 24px", borderTop: "1px solid #1E293B" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#F1F5F9", marginBottom: "8px" }}>Professional Documentation</h2>
              <p style={{ fontSize: "14px", color: "#64748B" }}>
                Word-compatible HTML documents with full governance structure.
              </p>
            </div>
            <div className="card">
              <div className="doc-grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
                {[
                  { label: "Format", value: "Word-compatible HTML" },
                  { label: "Classification", value: "Controlled Document" },
                  { label: "Structure", value: "Governance → Procedure → Controls → Audit" },
                  { label: "Verification", value: "Cryptographic hash per document" },
                  { label: "Compliance", value: "Jurisdiction-specific regulatory triggers" },
                  { label: "Retention", value: "Configurable retention schedules" },
                ].map((d, i) => (
                  <div key={i}>
                    <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.04em", color: "#64748B", marginBottom: "2px" }}>{d.label}</p>
                    <p style={{ fontSize: "14px", color: "#F1F5F9", fontWeight: 500 }}>{d.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="faqs" ref={faqRef} style={{ padding: "80px 24px", borderTop: "1px solid #1E293B" }}>
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#F1F5F9", marginBottom: "8px" }}>Frequently Asked Questions</h2>
              <p style={{ fontSize: "14px", color: "#64748B", marginTop: "8px" }}>
                Have a different question? <Link href="/contact" style={{ color: "#3B82F6", textDecoration: "underline" }}>Contact our team</Link>.
              </p>
            </div>
            {[
              { q: "What is SOPMaster?", a: "SOPMaster is a consultant operating system for turning consulting work into repeatable systems, client delivery frameworks, and operational structure. Built for consultants who take delivery seriously." },
              { q: "How does SOP generation work?", a: "Set your consulting context — jurisdiction, industry, and delivery workflows. SOPMaster generates structured, consultant-grade documents that you can reuse across clients and engagements." },
              { q: "What formats are supported?", a: "All documents are generated as Word-compatible HTML files. They open directly in Microsoft Word, Google Docs, or any browser with full formatting preserved." },
              { q: "How do credits work?", a: "Each SOP or Checklist generation consumes one credit. New accounts receive 300 complimentary credits. Additional credits can be purchased through your Administration panel." },
              { q: "Which jurisdictions are supported?", a: "UK, Scotland, Wales, England, US Federal & state-level (New York, California, Texas, Florida, Delaware), EU (GDPR, Pay Transparency), Canada (Federal, Ontario), Australia, and Dubai Global." },
              { q: "Can I generate documents for any industry?", a: "Yes. SOPMaster supports Financial Services, Healthcare, Construction, Professional Services, Technology, Manufacturing, Logistics and more. Each document is tailored to the selected context." },
            ].map((faq, i) => (
              <div key={i} style={{
                borderBottom: "1px solid #334155",
                padding: "16px 0",
                cursor: "pointer",
              }} onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ fontSize: "14px", fontWeight: 500, color: "#F1F5F9", margin: 0 }}>{faq.q}</h3>
                  <span style={{ fontSize: "14px", color: "#64748B", transition: "transform 0.2s", transform: activeFaq === i ? "rotate(180deg)" : "none" }}>
                    {activeFaq === i ? "−" : "+"}
                  </span>
                </div>
                {activeFaq === i && (
                  <p style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.6, marginTop: "12px" }}>{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" ref={pricingRef} style={{ padding: "80px 24px", borderTop: "1px solid #1E293B" }}>
          <div style={{ maxWidth: "960px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#F1F5F9", marginBottom: "8px" }}>Pricing</h2>
              <p style={{ fontSize: "14px", color: "#64748B" }}>
                Choose the plan that fits your organisation.
              </p>
            </div>
            <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
              {[
                { tier: "solo", name: "Solo Professional", price: "£400", credits: "300/mo", tag: "" },
                { tier: "small", name: "Small Consultancy", price: "£2,500", credits: "2,500/mo", tag: "Popular" },
                { tier: "medium", name: "Medium Consultancy", price: "£5,100", credits: "6,000/mo", tag: "" },
                { tier: "large", name: "Large Consultancy", price: "£9,000", credits: "12,000/mo", tag: "" },
              ].map((p, i) => (
                <div key={i} className="card" style={{
                  display: "flex", flexDirection: "column",
                  borderColor: p.tag ? "#3B82F6" : "#334155",
                  position: "relative",
                }}>
                  {p.tag && (
                    <div style={{
                      position: "absolute", top: "-1px", left: "50%", transform: "translateX(-50%)",
                      fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em",
                      color: "#3B82F6", background: "#0F172A", padding: "2px 12px",
                      border: "1px solid #3B82F6", borderTop: "none", borderRadius: "0 0 6px 6px",
                    }}>
                      {p.tag}
                    </div>
                  )}
                  <h3 style={{ fontSize: "13px", fontWeight: 600, color: "#F1F5F9", marginBottom: "8px" }}>{p.name}</h3>
                  <p style={{ fontSize: "28px", fontWeight: 700, color: "#F1F5F9", marginBottom: "4px" }}>{p.price}<span style={{ fontSize: "13px", fontWeight: 400, color: "#64748B" }}>/month</span></p>
                  <p style={{ fontSize: "12px", color: "#64748B", marginBottom: "16px" }}>{p.credits}</p>
                  <button onClick={() => router.push("/register")} className="btn btn-primary" style={{ width: "100%", marginTop: "auto" }}>
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: "60px 24px", borderTop: "1px solid #1E293B", textAlign: "center" }}>
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <p style={{ fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#64748B", marginBottom: "12px" }}>Connect</p>
            <a href="https://www.linkedin.com/in/sopmaster" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#94A3B8", fontSize: "14px", textDecoration: "none", padding: "10px 20px", border: "1px solid #334155", borderRadius: "8px", transition: "color 0.2s, border-color 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#3B82F6"; e.currentTarget.style.borderColor = "#3B82F6"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#94A3B8"; e.currentTarget.style.borderColor = "#334155"; }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              Follow on LinkedIn
            </a>
          </div>
        </section>

        <footer style={{
          padding: "40px 24px 24px",
          borderTop: "1px solid #1E293B",
          background: "#0A0F1C",
        }}>
          <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "32px", marginBottom: "32px" }}>
              <div>
                <p style={{ fontSize: "15px", fontWeight: 600, color: "#F1F5F9", marginBottom: "8px" }}>SOPMaster</p>
                <p style={{ fontSize: "12px", color: "#64748B", lineHeight: 1.6 }}>
                  The consultant operating system for structured delivery. Turn consulting work into repeatable systems, client delivery frameworks, and operational structure that scales.
                </p>
              </div>
              <div>
                <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", color: "#64748B", marginBottom: "12px" }}>Platform</p>
                <p style={{ fontSize: "12px", color: "#94A3B8", marginBottom: "6px" }}><Link href="/forge" style={{ color: "#94A3B8", textDecoration: "none" }}>SOP Builder</Link></p>
                <p style={{ fontSize: "12px", color: "#94A3B8", marginBottom: "6px" }}><Link href="/checklist" style={{ color: "#94A3B8", textDecoration: "none" }}>Checklist Builder</Link></p>
                <p style={{ fontSize: "12px", color: "#94A3B8", marginBottom: "6px" }}><Link href="/batch" style={{ color: "#94A3B8", textDecoration: "none" }}>Batch Generation</Link></p>
                <p style={{ fontSize: "12px", color: "#94A3B8", marginBottom: "6px" }}><Link href="/armory" style={{ color: "#94A3B8", textDecoration: "none" }}>Document Vault</Link></p>
              </div>
              <div>
                <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", color: "#64748B", marginBottom: "12px" }}>Company</p>
                <p style={{ fontSize: "12px", color: "#94A3B8", marginBottom: "6px" }}><Link href="/about" style={{ color: "#94A3B8", textDecoration: "none" }}>About</Link></p>
                <p style={{ fontSize: "12px", color: "#94A3B8", marginBottom: "6px" }}><Link href="/contact" style={{ color: "#94A3B8", textDecoration: "none" }}>Contact</Link></p>
                <p style={{ fontSize: "12px", color: "#94A3B8", marginBottom: "6px" }}><Link href="/privacy" style={{ color: "#94A3B8", textDecoration: "none" }}>Privacy</Link></p>
                <p style={{ fontSize: "12px", color: "#94A3B8", marginBottom: "6px" }}><Link href="/terms" style={{ color: "#94A3B8", textDecoration: "none" }}>Terms</Link></p>
              </div>
              <div>
                <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", color: "#64748B", marginBottom: "12px" }}>Legal</p>
                <p style={{ fontSize: "11px", color: "#64748B", marginBottom: "4px" }}>Dubai Global Tax Code</p>
                <p style={{ fontSize: "11px", color: "#94A3B8" }}>txcd_20030000 &middot; 0% VAT</p>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: "24px", paddingBottom: "12px" }}>
              <a href="https://www.linkedin.com/in/sopmaster" target="_blank" rel="noopener noreferrer" style={{ color: "#475569", fontSize: "12px", textDecoration: "none" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#3B82F6"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#475569"}>
                LinkedIn
              </a>
            </div>
            <div style={{ borderTop: "1px solid #1E293B", paddingTop: "16px", textAlign: "center" }}>
              <p style={{ fontSize: "11px", color: "#475569" }}>© {new Date().getFullYear()} SOPMaster. All rights reserved.</p>
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
    const subscribedCount = allCompanies.filter(c => c.subscriptionActive).length;

    return (
      <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "32px 24px" }} className="fade-in">
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#F1F5F9", marginBottom: "4px" }}>
            Admin Dashboard
          </h1>
          <p style={{ fontSize: "13px", color: "#64748B" }}>
            Platform overview &middot; {allCompanies.length} registered firms
          </p>
        </div>

        <div className="admin-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
          <div className="card" style={{ textAlign: "center" }}>
            <div className="stat-label">Registered Firms</div>
            <div className="stat-value">{allCompanies.length}</div>
          </div>
          <div className="card" style={{ textAlign: "center" }}>
            <div className="stat-label">Total SOPs</div>
            <div className="stat-value">{totalSops}</div>
          </div>
          <div className="card" style={{ textAlign: "center" }}>
            <div className="stat-label">Subscribed</div>
            <div className="stat-value">{subscribedCount}</div>
          </div>
          <div className="card" style={{ textAlign: "center" }}>
            <div className="stat-label">Unsubscribed</div>
            <div className="stat-value">{allCompanies.length - subscribedCount}</div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">All Firms</div>
          <div className="table-wrap">
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #334155" }}>
                  <th style={{ textAlign: "left", padding: "10px 8px", color: "#64748B", fontWeight: 500, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.04em" }}>Firm</th>
                  <th style={{ textAlign: "left", padding: "10px 8px", color: "#64748B", fontWeight: 500, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.04em" }}>SOPs</th>
                  <th style={{ textAlign: "left", padding: "10px 8px", color: "#64748B", fontWeight: 500, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.04em" }}>Plan</th>
                  <th style={{ textAlign: "left", padding: "10px 8px", color: "#64748B", fontWeight: 500, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.04em" }}>Credits</th>
                  <th style={{ textAlign: "left", padding: "10px 8px", color: "#64748B", fontWeight: 500, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.04em" }}>Subscription</th>
                  <th style={{ textAlign: "left", padding: "10px 8px", color: "#64748B", fontWeight: 500, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.04em" }}>Registered</th>
                  <th style={{ textAlign: "right", padding: "10px 8px", color: "#64748B", fontWeight: 500, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.04em" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allCompanies.map((c) => {
                  const isDirectorCompany = c.email === session.email;
                  const sopCount = getCompanySopCount(c.id);
                  return (
                    <tr key={c.id} style={{ borderBottom: "1px solid #1E293B" }}>
                      <td style={{ padding: "10px 8px", color: "#F1F5F9", fontWeight: 500 }}>
                        {c.name}
                        {isDirectorCompany && <span className="tag" style={{ marginLeft: "8px", fontSize: "10px" }}>Admin</span>}
                      </td>
                      <td style={{ padding: "10px 8px", color: "#94A3B8" }}>{sopCount}</td>
                      <td style={{ padding: "10px 8px" }}>
                        {isDirectorCompany ? (
                          <span style={{ color: "#94A3B8" }}>{getTierLimits(c.tier).label}</span>
                        ) : (
                          <select value={c.tier} onChange={(e) => adminSetTier(c.id, e.target.value as FirmTier)}
                            style={{ background: "transparent", border: "1px solid #334155", borderRadius: "4px", color: "#94A3B8", fontSize: "12px", padding: "2px 4px" }}>
                            <option value="solo">Solo Professional</option>
                            <option value="small">Small Firm Protocol</option>
                            <option value="medium">Medium Firm Protocol</option>
                            <option value="large">Large Firm Protocol</option>
                          </select>
                        )}
                      </td>
                      <td style={{ padding: "10px 8px", color: "#94A3B8" }}>
                        {isDirectorCompany ? (
                          <span>{c.credits}</span>
                        ) : editCreditsId === c.id ? (
                          <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                            <input type="number" value={creditsAmount} onChange={(e) => setCreditsAmount(e.target.value)}
                              style={{ width: "60px", background: "#1E293B", border: "1px solid #334155", borderRadius: "4px", color: "#F1F5F9", padding: "2px 4px", fontSize: "12px" }} />
                            <button onClick={() => { adminSetCredits(c.id, parseInt(creditsAmount) || 0); setEditCreditsId(null); }} className="btn btn-primary" style={{ fontSize: "10px", padding: "2px 6px" }}>Set</button>
                            <button onClick={() => setEditCreditsId(null)} className="btn-ghost" style={{ fontSize: "10px", padding: "2px 6px" }}>x</button>
                          </div>
                        ) : (
                          <span onClick={() => { setEditCreditsId(c.id); setCreditsAmount(String(c.credits)); }} style={{ cursor: "pointer", borderBottom: "1px dashed #475569" }}>{c.credits}</span>
                        )}
                      </td>
                      <td style={{ padding: "10px 8px" }}>
                        {isDirectorCompany ? (
                          <span style={{ color: "#22C55E", fontSize: "11px" }}>Active</span>
                        ) : (
                          <button onClick={() => adminSetSubscription(c.id, !c.subscriptionActive)}
                            className={`btn ${c.subscriptionActive ? "btn-secondary" : "btn-primary"}`}
                            style={{ fontSize: "10px", padding: "2px 8px" }}>
                            {c.subscriptionActive ? "Deactivate" : "Activate"}
                          </button>
                        )}
                      </td>
                      <td style={{ padding: "10px 8px", color: "#64748B", fontSize: "12px" }}>{c.createdAt}</td>
                      <td style={{ padding: "10px 8px", textAlign: "right" }}>
                        {isDirectorCompany ? (
                          <span style={{ color: "#475569", fontSize: "11px" }}>Protected</span>
                        ) : deleteConfirmId === c.id ? (
                          <div style={{ display: "flex", gap: "4px", justifyContent: "flex-end" }}>
                            <button onClick={() => { deleteCompany(c.id); setDeleteConfirmId(null); }} className="btn btn-primary" style={{ fontSize: "10px", padding: "2px 6px", background: "#DC2626", borderColor: "#DC2626" }}>Confirm</button>
                            <button onClick={() => setDeleteConfirmId(null)} className="btn-ghost" style={{ fontSize: "10px", padding: "2px 6px" }}>Cancel</button>
                          </div>
                        ) : (
                          <button onClick={() => setDeleteConfirmId(c.id)} className="btn-ghost" style={{ fontSize: "11px", color: "#DC2626", padding: "2px 6px" }}>Delete</button>
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
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: 600, color: "#F1F5F9", marginBottom: "6px" }}>
          {greeting}, {session.name}
        </h1>
        <p style={{ fontSize: "14px", color: "#64748B" }}>
          {company.name} &middot; {getTierLimits(company.tier).label}
        </p>
      </div>

      {stripeSuccess && (
        <div className="card" style={{ marginBottom: "24px", padding: "16px 20px", borderColor: "#22C55E" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#22C55E", marginBottom: "4px" }}>
                Payment successful
              </p>
              <p style={{ fontSize: "13px", color: "#94A3B8" }}>{stripeSuccess}</p>
            </div>
            <button onClick={() => setStripeSuccess(null)} className="btn btn-secondary" style={{ fontSize: "12px" }}>
              Dismiss
            </button>
          </div>
        </div>
      )}

      {unreadNotifs.length > 0 && (
        <div className="card" style={{ marginBottom: "24px", padding: "16px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", color: "#64748B" }}>
              Notifications ({unreadNotifs.length})
            </span>
            <button onClick={clearNotifications} className="btn-ghost" style={{ fontSize: "11px", padding: "2px 8px" }}>
              Clear all
            </button>
          </div>
          {unreadNotifs.slice(0, 3).map((n) => (
            <div key={n.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #334155" }}>
              <div>
                <p style={{ fontSize: "13px", fontWeight: 500, color: "#F1F5F9" }}>{n.title}</p>
                <p style={{ fontSize: "12px", color: "#94A3B8" }}>{n.message}</p>
              </div>
              <button onClick={() => dismissNotification(n.id)} className="btn-ghost" style={{ fontSize: "11px", padding: "2px 8px" }}>
                Dismiss
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="dash-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px", marginBottom: "32px" }}>
        <div className="card" style={{ padding: "24px" }}>
          <div className="card-header" style={{ fontSize: "13px", marginBottom: "16px" }}>Company Overview</div>
          <div className="data-row" style={{ marginBottom: "12px" }}><span className="data-label">Company</span><span className="data-value">{company.name}</span></div>
          <div className="data-row" style={{ marginBottom: "12px" }}><span className="data-label">Plan</span><span className="data-value">{getTierLimits(company.tier).label}</span></div>
          <div className="data-row"><span className="data-label">Jurisdiction</span><span className="data-value accent">{company.jurisdiction}</span></div>
        </div>

        <div className="card" style={{ padding: "24px" }}>
          <div className="card-header" style={{ fontSize: "13px", marginBottom: "16px" }}>Credits &amp; Activity</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div>
              <div className="stat-label">Credits Available</div>
              <div className="stat-value" style={{ fontSize: "28px", color: "#3B82F6" }}>{company.credits}</div>
            </div>
            <div>
              <div className="stat-label">Documents Created</div>
              <div className="stat-value">{vault.length}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: "24px", marginBottom: "32px" }}>
        <div className="card-header" style={{ fontSize: "13px", marginBottom: "16px" }}>Quick Actions</div>
        {!company.focus ? (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <p style={{ fontSize: "14px", color: "#94A3B8", marginBottom: "16px" }}>
              Choose what you want to create to unlock tools.
            </p>
            <button onClick={() => router.push("/choose-focus")} className="btn btn-primary" style={{ padding: "12px 32px", fontSize: "14px" }}>
              Choose Focus
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {company.focus === "sops" ? (
              <button onClick={() => router.push("/forge")} className="btn btn-primary" style={{ padding: "14px 28px", fontSize: "14px", flex: 1, minWidth: "180px" }}>
                Generate SOP
              </button>
            ) : (
              <button disabled className="btn btn-secondary" style={{ padding: "14px 28px", fontSize: "14px", flex: 1, minWidth: "180px", opacity: 0.5, cursor: "not-allowed" }}>
                Generate SOP
              </button>
            )}
            {company.focus === "checklists" ? (
              <button onClick={() => router.push("/checklist")} className="btn btn-primary" style={{ padding: "14px 28px", fontSize: "14px", flex: 1, minWidth: "180px" }}>
                Create Checklist
              </button>
            ) : (
              <button disabled className="btn btn-secondary" style={{ padding: "14px 28px", fontSize: "14px", flex: 1, minWidth: "180px", opacity: 0.5, cursor: "not-allowed" }}>
                Create Checklist
              </button>
            )}
            <button onClick={() => router.push("/armory")} className="btn btn-secondary" style={{ padding: "14px 28px", fontSize: "14px", flex: 1, minWidth: "180px" }}>
              Document Vault
            </button>
            <button onClick={() => router.push("/settings")} className="btn btn-secondary" style={{ padding: "14px 28px", fontSize: "14px", flex: 1, minWidth: "180px" }}>
              Administration
            </button>
          </div>
        )}
      </div>

      {vault.length > 0 && (
        <div className="card" style={{ padding: "24px" }}>
          <div className="card-header" style={{ fontSize: "13px", marginBottom: "16px" }}>Latest Documents</div>
          {vault.slice(-5).reverse().map((sop) => (
            <div key={sop.id} className="doc-row" style={{ padding: "10px 0" }}>
              <span className="status-dot" style={{ background: sop.status === "active" ? "#22C55E" : "#64748B", flexShrink: 0 }}></span>
              <span style={{ flex: 1, color: "#F1F5F9", fontWeight: 500 }}>{sop.title}</span>
              <span style={{ fontSize: "12px", color: "#64748B", width: "100px" }}>{sop.dateCreated}</span>
              <span className="tag" style={{ width: "auto" }}>{sop.jurisdiction}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
