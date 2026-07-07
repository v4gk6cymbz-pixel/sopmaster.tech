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
        <section className="landing-hero gradient-bg" style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 24px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Ambient light */}
          <div style={{
            position: "absolute",
            width: "600px", height: "600px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 60%)",
            top: "-10%", right: "-10%", pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute",
            width: "500px", height: "500px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,149,58,0.03) 0%, transparent 60%)",
            bottom: "-10%", left: "-5%", pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute",
            width: "300px", height: "300px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,99,235,0.04) 0%, transparent 70%)",
            top: "40%", left: "20%", pointerEvents: "none",
          }} />

          {/* Floating glass cards */}
          <div className="glass float" style={{ position: "absolute", top: "18%", right: "8%", padding: "16px 20px", pointerEvents: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "linear-gradient(135deg, #2563EB, #3B82F6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", color: "#fff", fontWeight: 700 }}>S</div>
              <div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "#F1F5F9" }}>SOP Builder</div>
                <div style={{ fontSize: "11px", color: "#64748B" }}>4 SOPs generated today</div>
              </div>
            </div>
          </div>

          <div className="glass float-delayed" style={{ position: "absolute", bottom: "22%", left: "6%", padding: "16px 20px", pointerEvents: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(201,149,58,0.1)", border: "1px solid rgba(201,149,58,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", color: "#C9953A", fontWeight: 700 }}>C</div>
              <div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "#F1F5F9" }}>Checklist Builder</div>
                <div style={{ fontSize: "11px", color: "#64748B" }}>Compliance ready</div>
              </div>
            </div>
          </div>

          <div className="glass" style={{ position: "absolute", top: "35%", right: "4%", padding: "10px 14px", pointerEvents: "none", opacity: 0.7 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", color: "#94A3B8" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10B981", boxShadow: "0 0 8px rgba(16,185,129,0.3)" }}></span>
              Document verification active
            </div>
          </div>

          <div style={{ maxWidth: "720px", textAlign: "center", position: "relative", zIndex: 1 }}>
            <div className="glass" style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "32px", padding: "8px 18px", borderRadius: "var(--radius)" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10B981", boxShadow: "0 0 8px rgba(16,185,129,0.3)" }}></span>
              <span style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.06em", color: "#94A3B8" }}>
                Operational Governance Platform
              </span>
            </div>
            <h1 style={{
              fontSize: "48px",
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#F1F5F9",
              marginBottom: "20px",
              letterSpacing: "-0.03em",
            }}>
              <span style={{ display: "block" }}>SOP<span style={{ color: "#2563EB" }}>Master</span></span>
              <span style={{ display: "block", fontSize: "22px", fontWeight: 400, color: "#94A3B8", marginTop: "8px", letterSpacing: "-0.01em" }}>Operational Documentation Platform for Consultants</span>
            </h1>
            <p style={{
              fontSize: "17px",
              lineHeight: 1.7,
              color: "#94A3B8",
              marginBottom: "40px",
              maxWidth: "560px",
              margin: "0 auto 40px",
            }}>
              The operating system for consultants who run structured delivery. Turn consulting work into repeatable systems, client delivery frameworks, and operational governance that scales across your entire practice.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => router.push("/register")} className="btn btn-primary" style={{ padding: "12px 32px", fontSize: "15px" }}>
                Get Started
              </button>
              <button onClick={() => router.push("/login")} className="btn btn-secondary" style={{ padding: "12px 32px", fontSize: "15px" }}>
                Sign In
              </button>
              <button onClick={() => featuresRef.current?.scrollIntoView({ behavior: "smooth" })} className="btn btn-ghost" style={{ padding: "12px 32px", fontSize: "15px" }}>
                Learn More
              </button>
            </div>
            <p style={{
              fontSize: "13px",
              lineHeight: 1.5,
              color: "#475569",
              marginTop: "36px",
            }}>
              Trusted by solo consultants, firms, and enterprise organisations
            </p>
          </div>

          <div style={{ position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)" }}>
            <button onClick={() => featuresRef.current?.scrollIntoView({ behavior: "smooth" })}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#475569", fontSize: "20px", opacity: 0.5 }}>
              ↓
            </button>
          </div>
        </section>

        <section className="section-container" style={{ textAlign: "center" }}>
          <div className="glass" style={{ maxWidth: "640px", margin: "0 auto", padding: "40px 48px" }}>
            <p style={{ fontSize: "22px", fontWeight: 500, color: "#F1F5F9", lineHeight: 1.4, marginBottom: "12px", letterSpacing: "-0.01em" }}>
              Operational Documentation Platform for Consultants.
            </p>
            <p style={{ fontSize: "15px", color: "#94A3B8", lineHeight: 1.7 }}>
              Everything you do becomes a system. Every client becomes structured. Every process becomes repeatable.
            </p>
          </div>
        </section>

        <section id="what-it-does" ref={featuresRef} className="section-container">
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#F1F5F9", marginBottom: "12px", letterSpacing: "-0.02em" }}>What It Does</h2>
              <p style={{ fontSize: "15px", color: "#94A3B8", maxWidth: "600px", margin: "0 auto", lineHeight: 1.7 }}>
                SOPMaster turns real consulting work into operational systems you can reuse across clients. Instead of writing documents from scratch for each engagement, you build once and deploy across your entire practice.
              </p>
            </div>
            <div className="gradient-border">
              <div className="card" style={{ padding: "36px" }}>
                <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                  {[
                    "SOPs built from real workflows",
                    "Client delivery frameworks",
                    "Repeatable consulting processes",
                    "Standardised internal operations",
                    "Instant system capture",
                    "Reusable consulting assets instead of one-off work",
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#2563EB", flexShrink: 0, boxShadow: "0 0 10px rgba(37,99,235,0.3)" }}></div>
                      <span style={{ fontSize: "15px", color: "#F1F5F9" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p style={{ fontSize: "14px", color: "#94A3B8", lineHeight: 1.6, textAlign: "center", marginTop: "28px" }}>
              Generate your first <Link href="/forge" style={{ color: "#2563EB", textDecoration: "underline" }}>SOP document</Link> or build a <Link href="/checklist" style={{ color: "#2563EB", textDecoration: "underline" }}>compliance checklist</Link> directly from your workflows.
            </p>
          </div>
        </section>

        <section id="who-its-for" className="section-container">
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#F1F5F9", marginBottom: "12px", letterSpacing: "-0.02em" }}>Who It&apos;s For</h2>
              <p style={{ fontSize: "15px", color: "#94A3B8", lineHeight: 1.7 }}>
                Built for consultants who don&apos;t run messy operations.
              </p>
            </div>
            <div className="card" style={{ padding: "28px" }}>
              {[
                { type: "Solo Consultants", desc: "You stop operating like a freelancer and start working like a system." },
                { type: "Freelancers", desc: "Your delivery becomes consistent, structured, and client-ready." },
                { type: "Small Consulting Firms", desc: "Your team stops working differently on every client. You standardise delivery." },
                { type: "Medium Consulting Firms", desc: "You scale output without losing process control." },
                { type: "Large Consulting Firms", desc: "You operate with structured delivery systems across teams, clients, and workflows." },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", gap: "16px", padding: "18px 0",
                  borderBottom: i < 4 ? "1px solid var(--border)" : "none",
                }}>
                  <div style={{
                    width: "30px", height: "30px", borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "13px", fontWeight: 600, color: "#2563EB",
                    border: "1px solid rgba(37,99,235,0.3)", flexShrink: 0,
                    background: "rgba(37,99,235,0.06)",
                  }}>
                    {i + 1}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#F1F5F9", marginBottom: "4px" }}>{item.type}</h3>
                    <p style={{ fontSize: "14px", color: "#94A3B8", lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="what-makes-it-different" className="section-container">
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#F1F5F9", marginBottom: "12px", letterSpacing: "-0.02em" }}>What Makes It Different</h2>
              <p style={{ fontSize: "15px", color: "#94A3B8", maxWidth: "600px", margin: "0 auto", lineHeight: 1.7 }}>
                Most tools store information. SOPMaster structures how work is delivered, governed, and scaled across clients and teams.
              </p>
            </div>
            <div className="gradient-border">
              <div className="card" style={{ padding: "36px", textAlign: "center" }}>
                <p style={{ fontSize: "16px", color: "#F1F5F9", lineHeight: 1.7, marginBottom: "20px" }}>
                  We don&apos;t store information. We turn it into systems that can be reused, sold, and scaled.
                </p>
                <p style={{ fontSize: "15px", color: "#94A3B8", lineHeight: 1.7, marginBottom: "0" }}>
                  Unlike generic document tools or template libraries, SOPMaster builds jurisdiction-aware compliance documents with governance controls, team collaboration, and document verification baked in. Every document includes industry-specific regulatory triggers, cryptographic verification hashes, and configurable retention policies.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="positioning" className="section-container">
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#F1F5F9", marginBottom: "12px", letterSpacing: "-0.02em" }}>Positioning</h2>
              <p style={{ fontSize: "15px", color: "#94A3B8", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
                For consultants who think in systems, not tasks. SOPMaster replaces ad-hoc document creation with structured, repeatable frameworks that scale across your entire practice.
              </p>
            </div>
            <div className="card" style={{ padding: "36px", textAlign: "center" }}>
              <p style={{ fontSize: "16px", color: "#F1F5F9", lineHeight: 1.7, marginBottom: "20px" }}>
                SOPMaster is purpose-built for consultants, not generic document platforms repurposed for compliance work.
              </p>
              <p style={{ fontSize: "15px", color: "#94A3B8", lineHeight: 1.7, marginBottom: "0" }}>
                Whether you are a <Link href="/about" style={{ color: "#2563EB", textDecoration: "underline" }}>solo practitioner</Link> standardising client delivery or a multi-team firm scaling operational governance across departments, SOPMaster adapts to your practice size and industry requirements. Learn more <Link href="/about" style={{ color: "#2563EB", textDecoration: "underline" }}>about how SOPMaster works</Link> for different firm types.
              </p>
            </div>
          </div>
        </section>

        <section id="industry-intelligence" className="section-container">
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#F1F5F9", marginBottom: "12px", letterSpacing: "-0.02em" }}>Industry Intelligence</h2>
              <p style={{ fontSize: "15px", color: "#94A3B8", lineHeight: 1.7 }}>
                Sector-specific regulatory context for every document generated.
              </p>
            </div>
            <div className="card who-grid" style={{ padding: "24px" }}>
              {[
                { industry: "Financial Services", focus: "FCA compliance, AML/KYC frameworks, transaction reporting, reconciliation controls" },
                { industry: "Healthcare", focus: "CQC compliance, PHI protection, clinical governance, information governance" },
                { industry: "Construction", focus: "CDM regulations, health & safety, site governance, supply chain compliance" },
                { industry: "Professional Services", focus: "Client onboarding, engagement management, conflict checking, data protection" },
                { industry: "Manufacturing", focus: "ISO standards, quality management, supply chain controls, operational safety" },
                { industry: "Technology", focus: "Data governance, SaaS compliance, incident response, SLA management" },
              ].map((item, i) => (
                <div key={i} className="data-row" style={{ borderBottom: i < 5 ? "1px solid var(--border)" : "none", padding: "12px 0" }}>
                  <span className="data-label" style={{ fontWeight: 500, minWidth: "180px", fontSize: "14px" }}>{item.industry}</span>
                  <span className="data-value" style={{ fontWeight: 400, color: "#94A3B8", fontSize: "13px" }}>{item.focus}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="professional-documentation" className="section-container">
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#F1F5F9", marginBottom: "12px", letterSpacing: "-0.02em" }}>Professional Documentation</h2>
              <p style={{ fontSize: "15px", color: "#94A3B8", lineHeight: 1.7 }}>
                Word-compatible HTML documents with full governance structure.
              </p>
            </div>
            <div className="card" style={{ padding: "28px" }}>
              <div className="doc-grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
                {[
                  { label: "Format", value: "Word-compatible HTML" },
                  { label: "Classification", value: "Controlled Document" },
                  { label: "Structure", value: "Governance → Procedure → Controls → Audit" },
                  { label: "Verification", value: "Cryptographic hash per document" },
                  { label: "Compliance", value: "Jurisdiction-specific regulatory triggers" },
                  { label: "Retention", value: "Configurable retention schedules" },
                ].map((d, i) => (
                  <div key={i}>
                    <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#64748B", marginBottom: "4px" }}>{d.label}</p>
                    <p style={{ fontSize: "15px", color: "#F1F5F9", fontWeight: 500 }}>{d.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="faqs" ref={faqRef} className="section-container">
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#F1F5F9", marginBottom: "12px", letterSpacing: "-0.02em" }}>Frequently Asked Questions</h2>
              <p style={{ fontSize: "15px", color: "#94A3B8", marginTop: "8px" }}>
                Have a different question? <Link href="/contact" style={{ color: "#2563EB", textDecoration: "underline" }}>Contact our team</Link>.
              </p>
            </div>
            <div className="card" style={{ padding: "24px 28px" }}>
              {[
                { q: "What is SOPMaster?", a: "SOPMaster is a consultant operating system for turning consulting work into repeatable systems, client delivery frameworks, and operational structure. Built for consultants who take delivery seriously." },
                { q: "How does SOP generation work?", a: "Set your consulting context — jurisdiction, industry, and delivery workflows. SOPMaster generates structured, consultant-grade documents that you can reuse across clients and engagements." },
                { q: "What formats are supported?", a: "All documents are generated as Word-compatible HTML files. They open directly in Microsoft Word, Google Docs, or any browser with full formatting preserved." },
                { q: "How do credits work?", a: "Each SOP or Checklist generation consumes one credit. New accounts receive 300 complimentary credits. Additional credits can be purchased through your Administration panel." },
                { q: "Which jurisdictions are supported?", a: "UK, Scotland, Wales, England, US Federal & state-level (New York, California, Texas, Florida, Delaware), EU (GDPR, Pay Transparency), Canada (Federal, Ontario), Australia, and Dubai Global." },
                { q: "Can I generate documents for any industry?", a: "Yes. SOPMaster supports Financial Services, Healthcare, Construction, Professional Services, Technology, Manufacturing, Logistics and more. Each document is tailored to the selected context." },
              ].map((faq, i) => (
                <div key={i} style={{
                  borderBottom: i < 5 ? "1px solid var(--border)" : "none",
                  padding: "18px 0",
                  cursor: "pointer",
                }} onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 style={{ fontSize: "14px", fontWeight: 500, color: "#F1F5F9", margin: 0 }}>{faq.q}</h3>
                    <span style={{ fontSize: "16px", color: "#64748B", transition: "transform 0.3s ease", transform: activeFaq === i ? "rotate(180deg)" : "none" }}>
                      {activeFaq === i ? "−" : "+"}
                    </span>
                  </div>
                  {activeFaq === i && (
                    <p style={{ fontSize: "14px", color: "#94A3B8", lineHeight: 1.7, marginTop: "12px" }}>{faq.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" ref={pricingRef} className="section-container">
          <div style={{ maxWidth: "960px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#F1F5F9", marginBottom: "12px", letterSpacing: "-0.02em" }}>Pricing</h2>
              <p style={{ fontSize: "15px", color: "#94A3B8" }}>
                Choose the plan that fits your organisation.
              </p>
            </div>
            <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
              {[
                { tier: "solo", name: "Solo Professional", price: "£400", credits: "300/mo", tag: "" },
                { tier: "small", name: "Small Consultancy", price: "£2,500", credits: "2,500/mo", tag: "Popular" },
                { tier: "medium", name: "Medium Consultancy", price: "£5,100", credits: "6,000/mo", tag: "" },
                { tier: "large", name: "Large Consultancy", price: "£9,000", credits: "12,000/mo", tag: "" },
              ].map((p, i) => (
                <div key={i} className="card gradient-border" style={{
                  display: "flex", flexDirection: "column",
                  position: "relative",
                }}>
                  {p.tag && (
                    <div style={{
                      position: "absolute", top: "-1px", left: "50%", transform: "translateX(-50%)",
                      fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em",
                      color: "#2563EB", background: "var(--bg-primary)", padding: "2px 14px",
                      border: "1px solid var(--accent)", borderTop: "none", borderRadius: "0 0 8px 8px",
                    }}>
                      {p.tag}
                    </div>
                  )}
                  <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#F1F5F9", marginBottom: "8px" }}>{p.name}</h3>
                  <p style={{ fontSize: "32px", fontWeight: 700, color: "#F1F5F9", marginBottom: "4px", letterSpacing: "-0.02em" }}>{p.price}<span style={{ fontSize: "14px", fontWeight: 400, color: "#64748B" }}>/month</span></p>
                  <p style={{ fontSize: "13px", color: "#64748B", marginBottom: "20px" }}>{p.credits}</p>
                  <button onClick={() => router.push("/register")} className="btn btn-primary" style={{ width: "100%", marginTop: "auto" }}>
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-container" style={{ textAlign: "center" }}>
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <p style={{ fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#64748B", marginBottom: "16px" }}>Connect</p>
            <a href="https://www.linkedin.com/in/sopmaster" target="_blank" rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ padding: "12px 28px", fontSize: "14px" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              Follow on LinkedIn
            </a>
          </div>
        </section>

        <footer style={{
          padding: "48px 24px 24px",
          borderTop: "1px solid var(--border)",
          background: "var(--bg-deep)",
        }}>
          <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "40px", marginBottom: "32px" }}>
              <div>
                <p style={{ fontSize: "16px", fontWeight: 600, color: "#F1F5F9", marginBottom: "12px", letterSpacing: "-0.01em" }}>SOPMaster</p>
                <p style={{ fontSize: "13px", color: "#64748B", lineHeight: 1.7 }}>
                  The operational governance platform for consultants. Turn consulting work into repeatable systems, client delivery frameworks, and operational structure that scales.
                </p>
              </div>
              <div>
                <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#64748B", marginBottom: "14px" }}>Platform</p>
                <p style={{ fontSize: "13px", color: "#94A3B8", marginBottom: "8px" }}><Link href="/forge" style={{ color: "#94A3B8", textDecoration: "none" }}>SOP Builder</Link></p>
                <p style={{ fontSize: "13px", color: "#94A3B8", marginBottom: "8px" }}><Link href="/checklist" style={{ color: "#94A3B8", textDecoration: "none" }}>Checklist Builder</Link></p>
                <p style={{ fontSize: "13px", color: "#94A3B8", marginBottom: "8px" }}><Link href="/batch" style={{ color: "#94A3B8", textDecoration: "none" }}>Batch Generation</Link></p>
                <p style={{ fontSize: "13px", color: "#94A3B8", marginBottom: "8px" }}><Link href="/armory" style={{ color: "#94A3B8", textDecoration: "none" }}>Document Vault</Link></p>
              </div>
              <div>
                <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#64748B", marginBottom: "14px" }}>Company</p>
                <p style={{ fontSize: "13px", color: "#94A3B8", marginBottom: "8px" }}><Link href="/about" style={{ color: "#94A3B8", textDecoration: "none" }}>About</Link></p>
                <p style={{ fontSize: "13px", color: "#94A3B8", marginBottom: "8px" }}><Link href="/contact" style={{ color: "#94A3B8", textDecoration: "none" }}>Contact</Link></p>
                <p style={{ fontSize: "13px", color: "#94A3B8", marginBottom: "8px" }}><Link href="/privacy" style={{ color: "#94A3B8", textDecoration: "none" }}>Privacy</Link></p>
                <p style={{ fontSize: "13px", color: "#94A3B8", marginBottom: "8px" }}><Link href="/terms" style={{ color: "#94A3B8", textDecoration: "none" }}>Terms</Link></p>
              </div>
              <div>
                <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#64748B", marginBottom: "14px" }}>Legal</p>
                <p style={{ fontSize: "12px", color: "#64748B", marginBottom: "4px" }}>Dubai Global Tax Code</p>
                <p style={{ fontSize: "12px", color: "#94A3B8" }}>txcd_20030000 &middot; 0% VAT</p>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: "24px", paddingBottom: "14px" }}>
              <a href="https://www.linkedin.com/in/sopmaster" target="_blank" rel="noopener noreferrer" style={{ color: "#475569", fontSize: "13px", textDecoration: "none" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#2563EB"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#475569"}>
                LinkedIn
              </a>
            </div>
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "16px", textAlign: "center" }}>
              <p style={{ fontSize: "12px", color: "#475569" }}>© {new Date().getFullYear()} SOPMaster. All rights reserved.</p>
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
        <div style={{ marginBottom: "36px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: 600, color: "#F1F5F9", marginBottom: "6px", letterSpacing: "-0.02em" }}>
            Admin Dashboard
          </h1>
          <p style={{ fontSize: "14px", color: "#64748B" }}>
            Platform overview &middot; {allCompanies.length} registered firms
          </p>
        </div>

        <div className="admin-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "28px" }}>
          <div className="card" style={{ textAlign: "center", padding: "28px 20px" }}>
            <div className="stat-label">Registered Firms</div>
            <div className="stat-value">{allCompanies.length}</div>
          </div>
          <div className="card" style={{ textAlign: "center", padding: "28px 20px" }}>
            <div className="stat-label">Total SOPs</div>
            <div className="stat-value">{totalSops}</div>
          </div>
          <div className="card" style={{ textAlign: "center", padding: "28px 20px" }}>
            <div className="stat-label">Subscribed</div>
            <div className="stat-value">{subscribedCount}</div>
          </div>
          <div className="card" style={{ textAlign: "center", padding: "28px 20px" }}>
            <div className="stat-label">Unsubscribed</div>
            <div className="stat-value">{allCompanies.length - subscribedCount}</div>
          </div>
        </div>

        <div className="card" style={{ padding: "28px" }}>
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
                          <button onClick={() => adminSetSubscription(c.id, c.subscriptionActive !== "yes")}
                            className={`btn ${c.subscriptionActive === "yes" ? "btn-secondary" : "btn-primary"}`}
                            style={{ fontSize: "10px", padding: "2px 8px" }}>
                            {c.subscriptionActive === "yes" ? "Deactivate" : "Activate"}
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
        <h1 style={{ fontSize: "28px", fontWeight: 600, color: "#F1F5F9", marginBottom: "8px", letterSpacing: "-0.02em" }}>
          {greeting}, {session.name}
        </h1>
        <p style={{ fontSize: "15px", color: "#64748B" }}>
          {company.name} &middot; {getTierLimits(company.tier).label}
        </p>
      </div>

      {stripeSuccess && (
        <div className="card" style={{ marginBottom: "24px", padding: "16px 20px", borderColor: "#10B981" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#10B981", marginBottom: "4px" }}>Payment successful</p>
              <p style={{ fontSize: "13px", color: "#94A3B8" }}>{stripeSuccess}</p>
            </div>
            <button onClick={() => setStripeSuccess(null)} className="btn btn-secondary" style={{ fontSize: "12px" }}>Dismiss</button>
          </div>
        </div>
      )}

      {unreadNotifs.length > 0 && (
        <div className="card" style={{ marginBottom: "24px", padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#64748B" }}>
              Notifications ({unreadNotifs.length})
            </span>
            <button onClick={clearNotifications} className="btn-ghost" style={{ fontSize: "11px", padding: "2px 8px" }}>Clear all</button>
          </div>
          {unreadNotifs.slice(0, 3).map((n) => (
            <div key={n.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
              <div>
                <p style={{ fontSize: "14px", fontWeight: 500, color: "#F1F5F9" }}>{n.title}</p>
                <p style={{ fontSize: "13px", color: "#94A3B8" }}>{n.message}</p>
              </div>
              <button onClick={() => dismissNotification(n.id)} className="btn-ghost" style={{ fontSize: "11px", padding: "2px 8px" }}>Dismiss</button>
            </div>
          ))}
        </div>
      )}

      <div className="dash-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px", marginBottom: "32px" }}>
        <div className="card" style={{ padding: "28px" }}>
          <div className="card-header" style={{ marginBottom: "20px" }}>Company Overview</div>
          <div className="data-row" style={{ marginBottom: "14px" }}><span className="data-label">Company</span><span className="data-value">{company.name}</span></div>
          <div className="data-row" style={{ marginBottom: "14px" }}><span className="data-label">Plan</span><span className="data-value">{getTierLimits(company.tier).label}</span></div>
          <div className="data-row"><span className="data-label">Jurisdiction</span><span className="data-value accent">{company.jurisdiction}</span></div>
        </div>

        <div className="card" style={{ padding: "28px" }}>
          <div className="card-header" style={{ marginBottom: "20px" }}>Credits &amp; Activity</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <div>
              <div className="stat-label">Credits Available</div>
              <div className="stat-value" style={{ fontSize: "32px", color: "#2563EB" }}>{company.credits}</div>
            </div>
            <div>
              <div className="stat-label">Documents Created</div>
              <div className="stat-value">{vault.length}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: "28px", marginBottom: "32px" }}>
        <div className="card-header" style={{ marginBottom: "20px" }}>Quick Actions</div>
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
              <button disabled className="btn btn-secondary" style={{ padding: "14px 28px", fontSize: "14px", flex: 1, minWidth: "180px" }}>
                Generate SOP
              </button>
            )}
            {company.focus === "checklists" ? (
              <button onClick={() => router.push("/checklist")} className="btn btn-primary" style={{ padding: "14px 28px", fontSize: "15px", flex: 1, minWidth: "180px" }}>
                Create Checklist
              </button>
            ) : (
              <button disabled className="btn btn-secondary" style={{ padding: "14px 28px", fontSize: "15px", flex: 1, minWidth: "180px" }}>
                Create Checklist
              </button>
            )}
            <button onClick={() => router.push("/armory")} className="btn btn-secondary" style={{ padding: "14px 28px", fontSize: "15px", flex: 1, minWidth: "180px" }}>
              Document Vault
            </button>
            <button onClick={() => router.push("/settings")} className="btn btn-secondary" style={{ padding: "14px 28px", fontSize: "15px", flex: 1, minWidth: "180px" }}>
              Administration
            </button>
          </div>
        )}
      </div>

      {vault.length > 0 && (
        <div className="card" style={{ padding: "28px" }}>
          <div className="card-header" style={{ marginBottom: "20px" }}>Latest Documents</div>
          {vault.slice(-5).reverse().map((sop) => (
            <div key={sop.id} className="doc-row" style={{ padding: "12px 0" }}>
              <span className="status-dot" style={{ background: sop.status === "active" ? "#10B981" : "#64748B" }}></span>
              <span style={{ flex: 1, color: "#F1F5F9", fontWeight: 500, fontSize: "14px" }}>{sop.title}</span>
              <span style={{ fontSize: "13px", color: "#64748B", width: "100px" }}>{sop.dateCreated}</span>
              <span className="tag" style={{ width: "auto" }}>{sop.jurisdiction}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
