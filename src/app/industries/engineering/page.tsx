import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SOP Software for Engineering Consultants",
  description:
    "SOPMaster helps engineering consultants create SOPs for design review, project lifecycle documentation, quality assurance and technical standards. Compliant with ISO 9001, ISO 14001 and ISO 27001.",
  keywords: [
    "engineering SOP software",
    "SOP for engineering consultants",
    "design review procedures",
    "project lifecycle documentation",
    "engineering quality assurance",
    "technical standards documentation",
  ],
  openGraph: {
    title: "SOP Software for Engineering Consultants | SOPMaster",
    description:
      "Deliver structured design review procedures, project lifecycle documentation and quality assurance frameworks for engineering clients using SOPMaster.",
  },
};

export default function EngineeringPage() {
  return (
    <main id="main-content" className="app-content" style={{ maxWidth: "800px", margin: "0 auto", padding: "64px 24px" }}>
      <div className="fade-in">
        <div className="hero-section" style={{ padding: "40px 0 48px", textAlign: "left" }}>
          <div className="ogi-badge">Engineering</div>
          <h1 style={{ fontSize: "34px", fontWeight: 600, color: "var(--white)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
            SOP Software for Engineering Consultants
          </h1>
          <p style={{ fontSize: "15px", color: "var(--text-secondary)", maxWidth: "560px", lineHeight: 1.7 }}>
            SOPMaster provides engineering consultants with the infrastructure to document design review procedures, project lifecycle processes, quality assurance frameworks and technical standards in a structured, auditable format.
          </p>
        </div>

        <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2 className="card-header">Why Engineering Consultants Choose SOPMaster</h2>
          <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7, marginBottom: "16px" }}>
            Engineering projects demand precision, consistency and thorough documentation at every stage — from conceptual design through to handover. SOPMaster enables consultants to create and maintain professional documentation that meets industry standards and client expectations.
          </p>
          <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7, marginBottom: "16px" }}>
            The platform supports the full documentation lifecycle — from process mapping and procedure authoring through to compliance cross-referencing and vault storage. Each document includes a cover page, table of contents and verification hash for complete traceability.
          </p>
          <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7 }}>
            Whether you are documenting a single engineering discipline or a multi-disciplinary programme, SOPMaster provides the structure and rigour that engineering documentation demands.
          </p>
        </div>

        <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2 className="card-header">Key Use Cases</h2>
          <div style={{ display: "grid", gap: "20px" }}>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Design Review Procedures</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Document design review gates, technical peer review workflows, drawing approval processes and design verification procedures that ensure engineering outputs meet specifications and standards.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Project Lifecycle Documentation</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Create stage-gate procedures, project initiation documentation, progress reporting frameworks and close-out processes that standardise project delivery across the organisation.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Quality Assurance</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Develop quality control plans, inspection and test plans, non-conformance reporting procedures and corrective action workflows aligned with ISO 9001 quality management principles.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Technical Standards</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Produce technical standards registers, design codes and standards compliance matrices, material specification procedures and document control protocols that maintain technical rigour.
              </p>
            </div>
          </div>
        </div>

        <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2 className="card-header">Compliance Standards</h2>
          <div style={{ display: "grid", gap: "12px" }}>
            <div className="data-row" style={{ marginBottom: 0 }}>
              <span className="data-label">ISO 9001</span>
              <span className="data-value">Quality management — design, development and process control</span>
            </div>
            <div className="data-row" style={{ marginBottom: 0 }}>
              <span className="data-label">ISO 14001</span>
              <span className="data-value">Environmental management — project environmental controls and impact assessment</span>
            </div>
            <div className="data-row" style={{ marginBottom: 0 }}>
              <span className="data-label">ISO 27001</span>
              <span className="data-value">Information security — design data protection and intellectual property controls</span>
            </div>
          </div>
        </div>

        <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2 className="card-header">Example Documents You Can Create</h2>
          <div style={{ display: "grid", gap: "20px" }}>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Design Review SOP</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                A structured procedure for conducting design reviews at each project stage, covering review team composition, preparation requirements, evaluation criteria, action tracking and approval gates.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Engineering Change Request Checklist</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                A step-by-step checklist for submitting, reviewing and approving engineering change requests, including impact assessment, stakeholder consultation, budget review and implementation tracking.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Project Handover SOP</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                A comprehensive handover procedure covering as-built documentation, testing certificates, operation and maintenance manuals, training records and final project close-out requirements.
              </p>
            </div>
          </div>
        </div>

        <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2 className="card-header">Frequently Asked Questions</h2>
          <div style={{ display: "grid", gap: "20px" }}>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Can SOPMaster handle multi-discipline engineering documentation?</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Yes. SOPMaster supports department-level documentation packages, allowing you to create separate procedure libraries for civil, mechanical, electrical, structural and process engineering disciplines within the same project or organisation.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Can I link SOPs to specific design standards and codes?</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Yes. Each SOP can reference applicable standards, design codes and regulations. You can create compliance matrices that map procedures to specific clauses within standards such as Eurocodes, British Standards or ISO norms.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>How are design changes tracked through the documentation?</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                SOPMaster includes version tracking and document history. When design procedures are updated, the revision history records what changed, who approved it and when — providing a clear audit trail for clients and regulators.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Can I create templates for repeatable engineering projects?</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Yes. SOPMaster allows you to create structured templates that can be reused across similar projects, ensuring consistent documentation quality while saving time on each new engagement.
              </p>
            </div>
          </div>
        </div>

        <div className="glass" style={{ padding: "32px", textAlign: "center" }}>
          <h2 className="card-header" style={{ textAlign: "center" }}>Start Building Engineering SOPs</h2>
          <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7, marginBottom: "20px", maxWidth: "480px", marginLeft: "auto", marginRight: "auto" }}>
            Create professional, compliant SOP libraries for your engineering clients. Get started with SOPMaster today.
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
          { "@type": "ListItem", "position": 3, "name": "Engineering", "item": "https://sopmaster.tech/industries/engineering" }
        ]
      })}</script>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Can SOPMaster handle multi-discipline engineering documentation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. SOPMaster supports department-level documentation packages, allowing you to create separate procedure libraries for civil, mechanical, electrical, structural and process engineering disciplines within the same project or organisation."
            }
          },
          {
            "@type": "Question",
            "name": "Can I link SOPs to specific design standards and codes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Each SOP can reference applicable standards, design codes and regulations. You can create compliance matrices that map procedures to specific clauses within standards such as Eurocodes, British Standards or ISO norms."
            }
          },
          {
            "@type": "Question",
            "name": "How are design changes tracked through the documentation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "SOPMaster includes version tracking and document history. When design procedures are updated, the revision history records what changed, who approved it and when — providing a clear audit trail for clients and regulators."
            }
          },
          {
            "@type": "Question",
            "name": "Can I create templates for repeatable engineering projects?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. SOPMaster allows you to create structured templates that can be reused across similar projects, ensuring consistent documentation quality while saving time on each new engagement."
            }
          }
        ]
      })}</script>
    </main>
  );
}
