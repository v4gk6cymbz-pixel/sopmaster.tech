import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SOP Software for Construction Consultants",
  description:
    "SOPMaster helps construction consultants create SOPs for site safety, quality inspection, subcontractor management and project documentation. Compliant with ISO 9001, ISO 45001 and CDM Regulations.",
  keywords: [
    "construction SOP software",
    "SOP for construction consultants",
    "site safety procedures",
    "CDM regulations documentation",
    "quality inspection construction",
    "subcontractor management SOP",
  ],
  openGraph: {
    title: "SOP Software for Construction Consultants | SOPMaster",
    description:
      "Deliver structured site safety SOPs, quality inspection checklists and subcontractor management procedures for construction clients using SOPMaster.",
  },
};

export default function ConstructionPage() {
  return (
    <main id="main-content" className="app-content" style={{ maxWidth: "800px", margin: "0 auto", padding: "64px 24px" }}>
      <div className="fade-in">
        <div className="hero-section" style={{ padding: "40px 0 48px", textAlign: "left" }}>
          <div className="ogi-badge">Construction</div>
          <h1 style={{ fontSize: "34px", fontWeight: 600, color: "var(--white)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
            SOP Software for Construction Consultants
          </h1>
          <p style={{ fontSize: "15px", color: "var(--text-secondary)", maxWidth: "560px", lineHeight: 1.7 }}>
            SOPMaster equips construction consultants with the tools to document site safety protocols, quality inspection procedures, subcontractor management workflows and project documentation in a structured, compliance-ready format.
          </p>
        </div>

        <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2 className="card-header">Why Construction Consultants Choose SOPMaster</h2>
          <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7, marginBottom: "16px" }}>
            Construction projects involve multiple contractors, complex regulations and significant safety risks. SOPMaster helps consultants bring order to this complexity by providing a structured documentation platform that standardises how procedures are created, managed and maintained.
          </p>
          <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7, marginBottom: "16px" }}>
            The platform supports the full documentation lifecycle — from process mapping and authoring through to compliance cross-referencing and vault storage. Each document includes a cover page, table of contents and verification hash for complete traceability.
          </p>
          <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7 }}>
            Whether you are documenting a single construction phase or an entire project lifecycle, SOPMaster ensures your documentation meets industry standards and client expectations.
          </p>
        </div>

        <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2 className="card-header">Key Use Cases</h2>
          <div style={{ display: "grid", gap: "20px" }}>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Site Safety SOPs</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Develop comprehensive safety procedures covering site induction, working at height, confined space entry, excavation safety and emergency response aligned with ISO 45001 and CDM Regulations.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Quality Inspection Procedures</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Create inspection and test plans, hold-point checklists, material receiving inspection procedures and non-conformance reporting workflows that satisfy ISO 9001 quality management requirements.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Subcontractor Management</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Document subcontractor pre-qualification, onboarding, performance monitoring and review procedures to ensure consistent standards across all trades on site.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Project Documentation</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Produce method statements, construction phase plans, design change control procedures and project handover documentation that keep every project organised and audit-ready.
              </p>
            </div>
          </div>
        </div>

        <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2 className="card-header">Compliance Standards</h2>
          <div style={{ display: "grid", gap: "12px" }}>
            <div className="data-row" style={{ marginBottom: 0 }}>
              <span className="data-label">ISO 9001</span>
              <span className="data-value">Quality management — inspection, testing and process control procedures</span>
            </div>
            <div className="data-row" style={{ marginBottom: 0 }}>
              <span className="data-label">ISO 45001</span>
              <span className="data-value">Health and safety — risk assessment, site safety and emergency procedures</span>
            </div>
            <div className="data-row" style={{ marginBottom: 0 }}>
              <span className="data-label">CDM Regulations</span>
              <span className="data-value">Construction Design and Management — duty holder responsibilities and documentation</span>
            </div>
          </div>
        </div>

        <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2 className="card-header">Example Documents You Can Create</h2>
          <div style={{ display: "grid", gap: "20px" }}>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Site Induction SOP</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                A standardised site induction procedure covering hazard awareness, emergency evacuation, PPE requirements and site rules for all personnel entering the construction site.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Plant Inspection Checklist</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                A reusable daily checklist for inspecting excavators, cranes, dumpers and other plant equipment covering safety systems, fluid levels, tyre condition and documentation checks.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Method Statement Template</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                A structured template for creating safe systems of work that describes the sequence of activities, control measures, equipment required and emergency arrangements for specific construction tasks.
              </p>
            </div>
          </div>
        </div>

        <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2 className="card-header">Frequently Asked Questions</h2>
          <div style={{ display: "grid", gap: "20px" }}>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Can SOPMaster handle CDM documentation requirements?</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Yes. SOPMaster is designed to support construction-related compliance documentation including construction phase plans, risk assessments, method statements and health and safety files. Documents can be cross-referenced against CDM duty holder responsibilities.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Can I create SOPs for different project phases separately?</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Yes. SOPMaster&apos;s batch documentation feature lets you create department-level packages per project phase — enabling you to manage documentation for groundwork, structure, finishing and handover as distinct document sets.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>How do I manage subcontractor documentation?</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                You can build a subcontractor management library containing pre-qualification checklists, induction records, performance review templates and compliance tracking documents — all stored in a centralised, searchable vault.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Is document version control available for construction SOPs?</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Yes. Every document includes version tracking and a unique verification hash. This ensures all stakeholders are working from the correct version and provides a clear audit trail for compliance reviews.
              </p>
            </div>
          </div>
        </div>

        <div className="glass" style={{ padding: "32px", textAlign: "center" }}>
          <h2 className="card-header" style={{ textAlign: "center" }}>Start Building Construction SOPs</h2>
          <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7, marginBottom: "20px", maxWidth: "480px", marginLeft: "auto", marginRight: "auto" }}>
            Create professional, compliant SOP libraries for your construction clients. Get started with SOPMaster today.
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
          { "@type": "ListItem", "position": 3, "name": "Construction", "item": "https://sopmaster.tech/industries/construction" }
        ]
      })}</script>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Can SOPMaster handle CDM documentation requirements?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. SOPMaster is designed to support construction-related compliance documentation including construction phase plans, risk assessments, method statements and health and safety files. Documents can be cross-referenced against CDM duty holder responsibilities."
            }
          },
          {
            "@type": "Question",
            "name": "Can I create SOPs for different project phases separately?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. SOPMaster's batch documentation feature lets you create department-level packages per project phase — enabling you to manage documentation for groundwork, structure, finishing and handover as distinct document sets."
            }
          },
          {
            "@type": "Question",
            "name": "How do I manage subcontractor documentation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can build a subcontractor management library containing pre-qualification checklists, induction records, performance review templates and compliance tracking documents — all stored in a centralised, searchable vault."
            }
          },
          {
            "@type": "Question",
            "name": "Is document version control available for construction SOPs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Every document includes version tracking and a unique verification hash. This ensures all stakeholders are working from the correct version and provides a clear audit trail for compliance reviews."
            }
          }
        ]
      })}</script>
    </main>
  );
}
