import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SOP Software for Financial Services Consultants",
  description:
    "SOPMaster helps financial services consultants create SOPs for compliance, risk management, client onboarding and regulatory reporting. Compliant with ISO 27001, GDPR, FCA regulations and AML/KYC requirements.",
  keywords: [
    "financial services SOP software",
    "SOP for financial consultants",
    "compliance procedures financial services",
    "risk management SOP",
    "FCA compliance documentation",
    "AML KYC procedures",
  ],
  openGraph: {
    title: "SOP Software for Financial Services Consultants | SOPMaster",
    description:
      "Deliver structured compliance procedures, risk management frameworks and regulatory reporting documentation for financial services clients using SOPMaster.",
  },
};

export default function FinancialServicesPage() {
  return (
    <main id="main-content" className="app-content" style={{ maxWidth: "800px", margin: "0 auto", padding: "64px 24px" }}>
      <div className="fade-in">
        <div className="hero-section" style={{ padding: "40px 0 48px", textAlign: "left" }}>
          <div className="ogi-badge">Financial Services</div>
          <h1 style={{ fontSize: "34px", fontWeight: 600, color: "var(--white)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
            SOP Software for Financial Services Consultants
          </h1>
          <p style={{ fontSize: "15px", color: "var(--text-secondary)", maxWidth: "560px", lineHeight: 1.7 }}>
            SOPMaster provides financial services consultants with the infrastructure to document compliance procedures, risk management frameworks, client onboarding workflows and regulatory reporting processes in a structured, audit-ready format.
          </p>
        </div>

        <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2 className="card-header">Why Financial Services Consultants Choose SOPMaster</h2>
          <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7, marginBottom: "16px" }}>
            Financial services is one of the most heavily regulated sectors, with firms facing rigorous oversight from the FCA, PRA and other regulators. SOPMaster helps consultants build the documentation infrastructure their clients need to demonstrate compliance and manage risk effectively.
          </p>
          <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7, marginBottom: "16px" }}>
            The platform supports the full documentation lifecycle — from process mapping and procedure authoring through to compliance cross-referencing and secure vault storage. Each document includes a cover page, table of contents and verification hash for complete auditability.
          </p>
          <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7 }}>
            Whether you are documenting a single advisory firm or a large financial institution, SOPMaster provides the structure and rigour that financial services documentation demands.
          </p>
        </div>

        <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2 className="card-header">Key Use Cases</h2>
          <div style={{ display: "grid", gap: "20px" }}>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Compliance Procedures</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Document compliance monitoring programmes, regulatory reporting workflows, conduct risk procedures, training and competence frameworks and FCA handbook compliance processes.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Risk Management</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Create risk assessment frameworks, operational risk registers, business continuity plans, stress testing procedures and incident management workflows that meet regulatory expectations.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Client Onboarding</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Develop client due diligence procedures, enhanced due diligence for high-risk clients, source of wealth verification, ongoing monitoring processes and exit protocols.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Regulatory Reporting</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Produce transaction reporting procedures, suspicious activity report (SAR) workflows, regulatory filing calendars, breach reporting processes and management information templates.
              </p>
            </div>
          </div>
        </div>

        <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2 className="card-header">Compliance Standards</h2>
          <div style={{ display: "grid", gap: "12px" }}>
            <div className="data-row" style={{ marginBottom: 0 }}>
              <span className="data-label">ISO 27001</span>
              <span className="data-value">Information security — client data protection and information asset management</span>
            </div>
            <div className="data-row" style={{ marginBottom: 0 }}>
              <span className="data-label">GDPR</span>
              <span className="data-value">Data protection — personal data processing and subject rights</span>
            </div>
            <div className="data-row" style={{ marginBottom: 0 }}>
              <span className="data-label">FCA Regulations</span>
              <span className="data-value">Financial Conduct Authority — handbook compliance and conduct rules</span>
            </div>
            <div className="data-row" style={{ marginBottom: 0 }}>
              <span className="data-label">AML / KYC</span>
              <span className="data-value">Anti-money laundering — client due diligence, screening and monitoring</span>
            </div>
          </div>
        </div>

        <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2 className="card-header">Example Documents You Can Create</h2>
          <div style={{ display: "grid", gap: "20px" }}>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Risk Assessment SOP</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                A structured procedure for identifying, assessing and mitigating operational, conduct and financial risks, including risk appetite calibration, control evaluation and reporting triggers.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Compliance Monitoring Checklist</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                A scheduled checklist covering key compliance areas — client money rules, disclosure requirements, transaction reporting, conflicts of interest and record-keeping — with evidence and sign-off.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Client Due Diligence SOP</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                A complete CDD procedure covering identity verification, beneficial ownership identification, source of funds, risk categorisation, enhanced due diligence triggers and ongoing review schedules.
              </p>
            </div>
          </div>
        </div>

        <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2 className="card-header">Frequently Asked Questions</h2>
          <div style={{ display: "grid", gap: "20px" }}>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Can SOPMaster support FCA handbook mapping?</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Yes. You can cross-reference every procedure against FCA handbook provisions, creating clear audit trails that demonstrate how each regulatory requirement is addressed in your client&apos;s operational framework.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Does SOPMaster help with AML compliance documentation?</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Yes. The platform supports the full range of AML documentation, including firm-wide risk assessments, CDD procedures, enhanced due diligence protocols, PEP screening workflows and SAR reporting processes.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Can I create separate SOP libraries for different regulated entities?</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Yes. SOPMaster&apos;s department-level documentation packages allow you to maintain separate procedure libraries for different legal entities, business units or regulated activities within a group structure.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>How do I ensure documentation stays current with regulatory changes?</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                SOPMaster includes version tracking and review scheduling. You can set review dates aligned with regulatory change cycles and maintain a clear revision history that demonstrates proactive compliance management.
              </p>
            </div>
          </div>
        </div>

        <div className="glass" style={{ padding: "32px", textAlign: "center" }}>
          <h2 className="card-header" style={{ textAlign: "center" }}>Start Building Financial Services SOPs</h2>
          <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7, marginBottom: "20px", maxWidth: "480px", marginLeft: "auto", marginRight: "auto" }}>
            Create professional, compliant SOP libraries for your financial services clients. Get started with SOPMaster today.
          </p>
          <a href="/register" className="btn btn-primary">Create Your Account</a>
        </div>
      </div>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://sopmaster.tech/" },
          { "@type": "ListItem", "position": 2, "name": "Industries", "item": "https://sopmaster.tech/industries" },
          { "@type": "ListItem", "position": 3, "name": "Financial Services", "item": "https://sopmaster.tech/industries/financial-services" }
        ]
      })}</script>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Can SOPMaster support FCA handbook mapping?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. You can cross-reference every procedure against FCA handbook provisions, creating clear audit trails that demonstrate how each regulatory requirement is addressed in your client's operational framework."
            }
          },
          {
            "@type": "Question",
            "name": "Does SOPMaster help with AML compliance documentation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. The platform supports the full range of AML documentation, including firm-wide risk assessments, CDD procedures, enhanced due diligence protocols, PEP screening workflows and SAR reporting processes."
            }
          },
          {
            "@type": "Question",
            "name": "Can I create separate SOP libraries for different regulated entities?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. SOPMaster's department-level documentation packages allow you to maintain separate procedure libraries for different legal entities, business units or regulated activities within a group structure."
            }
          },
          {
            "@type": "Question",
            "name": "How do I ensure documentation stays current with regulatory changes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "SOPMaster includes version tracking and review scheduling. You can set review dates aligned with regulatory change cycles and maintain a clear revision history that demonstrates proactive compliance management."
            }
          }
        ]
      })}</script>
    </main>
  );
}
