import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SOP Software for Accounting Consultants",
  description:
    "SOPMaster helps accounting consultants create SOPs for financial close, audit preparation, client onboarding and regulatory compliance. Compliant with ISO 27001, GDPR, AML regulations and UK GAAP/IFRS.",
  keywords: [
    "accounting SOP software",
    "SOP for accounting consultants",
    "financial close procedures",
    "audit preparation checklist",
    "AML compliance documentation",
    "client onboarding SOP accounting",
  ],
  openGraph: {
    title: "SOP Software for Accounting Consultants | SOPMaster",
    description:
      "Deliver structured financial close procedures, audit preparation checklists and compliance documentation for accounting clients using SOPMaster.",
  },
};

export default function AccountingPage() {
  return (
    <main id="main-content" className="app-content" style={{ maxWidth: "800px", margin: "0 auto", padding: "64px 24px" }}>
      <div className="fade-in">
        <div className="hero-section" style={{ padding: "40px 0 48px", textAlign: "left" }}>
          <div className="ogi-badge">Accounting</div>
          <h1 style={{ fontSize: "34px", fontWeight: 600, color: "var(--white)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
            SOP Software for Accounting Consultants
          </h1>
          <p style={{ fontSize: "15px", color: "var(--text-secondary)", maxWidth: "560px", lineHeight: 1.7 }}>
            SOPMaster equips accounting consultants with the tools to document financial close procedures, audit preparation workflows, client onboarding processes and regulatory compliance frameworks in a structured, professional format.
          </p>
        </div>

        <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2 className="card-header">Why Accounting Consultants Choose SOPMaster</h2>
          <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7, marginBottom: "16px" }}>
            Accounting firms handle sensitive financial data and operate under strict regulatory requirements. SOPMaster provides the infrastructure to document procedures that ensure consistency, reduce risk and demonstrate compliance to regulators and auditors.
          </p>
          <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7, marginBottom: "16px" }}>
            The platform supports the full documentation lifecycle — from process mapping and procedure authoring through to compliance cross-referencing and secure vault storage. Each document includes a cover page, table of contents and verification hash for complete auditability.
          </p>
          <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7 }}>
            Whether you are documenting a single accounting practice or a multi-partner firm, SOPMaster provides the structure and rigour that accounting documentation demands.
          </p>
        </div>

        <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2 className="card-header">Key Use Cases</h2>
          <div style={{ display: "grid", gap: "20px" }}>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Financial Close Procedures</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Document month-end, quarter-end and year-end close processes including journal entry approvals, reconciliations, consolidation procedures and financial statement preparation workflows.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Audit Preparation</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Create audit evidence checklists, sampling methodologies, confirmation procedures and working paper standards that ensure every engagement meets professional auditing standards.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Client Onboarding</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Develop Know Your Client (KYC) procedures, engagement letter workflows, anti-money laundering checks and client acceptance processes that comply with regulatory requirements.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Regulatory Compliance</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Produce AML risk assessment frameworks, data protection impact assessments, professional indemnity procedures and ethical guidelines that demonstrate regulatory compliance.
              </p>
            </div>
          </div>
        </div>

        <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2 className="card-header">Compliance Standards</h2>
          <div style={{ display: "grid", gap: "12px" }}>
            <div className="data-row" style={{ marginBottom: 0 }}>
              <span className="data-label">ISO 27001</span>
              <span className="data-value">Information security — client data protection and access controls</span>
            </div>
            <div className="data-row" style={{ marginBottom: 0 }}>
              <span className="data-label">GDPR</span>
              <span className="data-value">Data protection — personal data handling and breach response</span>
            </div>
            <div className="data-row" style={{ marginBottom: 0 }}>
              <span className="data-label">AML Regulations</span>
              <span className="data-value">Anti-money laundering — client due diligence and transaction monitoring</span>
            </div>
            <div className="data-row" style={{ marginBottom: 0 }}>
              <span className="data-label">UK GAAP / IFRS</span>
              <span className="data-value">Accounting standards — financial reporting and disclosure requirements</span>
            </div>
          </div>
        </div>

        <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2 className="card-header">Example Documents You Can Create</h2>
          <div style={{ display: "grid", gap: "20px" }}>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Month-End Close SOP</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                A step-by-step checklist covering bank reconciliations, accruals, prepayments, fixed asset depreciation, intercompany reconciliations and management reporting with approval checkpoints.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Audit Evidence Checklist</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                A comprehensive checklist mapping audit assertions to evidence requirements, including sample sizes, testing procedures and documentation standards for each financial statement line item.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Client KYC SOP</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                A structured procedure for client identification, verification, risk assessment and ongoing monitoring that meets AML regulatory requirements and professional body standards.
              </p>
            </div>
          </div>
        </div>

        <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2 className="card-header">Frequently Asked Questions</h2>
          <div style={{ display: "grid", gap: "20px" }}>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Can SOPMaster help with audit trail documentation?</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Yes. Every document in SOPMaster includes a unique verification hash and version history, creating a clear audit trail. This supports external audit reviews and regulatory inspections by demonstrating document integrity.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Does SOPMaster support AML compliance documentation?</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Yes. You can create AML risk assessment frameworks, client due diligence procedures, suspicious activity reporting workflows and training records — all organised within a structured documentation library.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Can I create SOPs for different service lines within my firm?</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Yes. SOPMaster allows you to organise documentation by department or service line — audit, tax, advisory, bookkeeping — so each team maintains its own library of relevant procedures while firm-wide policies remain centrally governed.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>How are document updates managed across the firm?</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                SOPMaster provides version tracking and document history. When procedures are updated, previous versions are retained and the current version is clearly identified, ensuring all team members work from the latest approved procedures.
              </p>
            </div>
          </div>
        </div>

        <div className="glass" style={{ padding: "32px", textAlign: "center" }}>
          <h2 className="card-header" style={{ textAlign: "center" }}>Start Building Accounting SOPs</h2>
          <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7, marginBottom: "20px", maxWidth: "480px", marginLeft: "auto", marginRight: "auto" }}>
            Create professional, compliant SOP libraries for your accounting clients. Get started with SOPMaster today.
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
          { "@type": "ListItem", "position": 3, "name": "Accounting", "item": "https://sopmaster.tech/industries/accounting" }
        ]
      })}</script>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Can SOPMaster help with audit trail documentation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Every document in SOPMaster includes a unique verification hash and version history, creating a clear audit trail. This supports external audit reviews and regulatory inspections by demonstrating document integrity."
            }
          },
          {
            "@type": "Question",
            "name": "Does SOPMaster support AML compliance documentation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. You can create AML risk assessment frameworks, client due diligence procedures, suspicious activity reporting workflows and training records — all organised within a structured documentation library."
            }
          },
          {
            "@type": "Question",
            "name": "Can I create SOPs for different service lines within my firm?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. SOPMaster allows you to organise documentation by department or service line — audit, tax, advisory, bookkeeping — so each team maintains its own library of relevant procedures while firm-wide policies remain centrally governed."
            }
          },
          {
            "@type": "Question",
            "name": "How are document updates managed across the firm?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "SOPMaster provides version tracking and document history. When procedures are updated, previous versions are retained and the current version is clearly identified, ensuring all team members work from the latest approved procedures."
            }
          }
        ]
      })}</script>
    </main>
  );
}
