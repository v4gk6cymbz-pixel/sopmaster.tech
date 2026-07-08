import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SOP Software for Manufacturing Consultants",
  description:
    "SOPMaster helps manufacturing consultants create, manage and govern SOPs for production lines, quality control, equipment maintenance and health & safety. Compliant with ISO 9001, ISO 14001 and ISO 45001.",
  keywords: [
    "manufacturing SOP software",
    "SOP for manufacturing consultants",
    "ISO 9001 manufacturing",
    "production line SOP",
    "quality control procedures",
    "operational governance manufacturing",
  ],
  openGraph: {
    title: "SOP Software for Manufacturing Consultants | SOPMaster",
    description:
      "Create production-ready SOPs for manufacturing clients with structured templates, compliance frameworks and audit-ready documentation.",
  },
};

export default function ManufacturingPage() {
  return (
    <main id="main-content" className="app-content" style={{ maxWidth: "800px", margin: "0 auto", padding: "64px 24px" }}>
      <div className="fade-in">
        <div className="hero-section" style={{ padding: "40px 0 48px", textAlign: "left" }}>
          <div className="ogi-badge">Manufacturing</div>
          <h1 style={{ fontSize: "34px", fontWeight: 600, color: "var(--white)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
            SOP Software for Manufacturing Consultants
          </h1>
          <p style={{ fontSize: "15px", color: "var(--text-secondary)", maxWidth: "560px", lineHeight: 1.7 }}>
            SOPMaster provides manufacturing consultants with the infrastructure to document production processes, quality control procedures, equipment maintenance routines and health & safety protocols in a structured, auditable format.
          </p>
        </div>

        <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2 className="card-header">Why Manufacturing Consultants Choose SOPMaster</h2>
          <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7, marginBottom: "16px" }}>
            Manufacturing clients demand precision, consistency and compliance. SOPMaster enables consultants to deliver professional SOP libraries that cover every aspect of a production operation — from raw material handling through to finished goods inspection.
          </p>
          <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7, marginBottom: "16px" }}>
            The platform supports the full documentation lifecycle: process mapping, procedure authoring, compliance cross-referencing, version control and vault storage. Each SOP includes a cover page, table of contents and verification hash for complete auditability.
          </p>
          <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7 }}>
            Whether you are documenting a single production line or an entire plant, SOPMaster gives you the tools to create consistent, professional documentation that manufacturing clients can depend on.
          </p>
        </div>

        <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2 className="card-header">Key Use Cases</h2>
          <div style={{ display: "grid", gap: "20px" }}>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Production Line SOPs</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Document step-by-step machine operation procedures, changeover processes, material handling workflows and production scheduling. Ensure every operator follows the same proven method.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Quality Control Procedures</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Create inspection checklists, sampling protocols, non-conformance reporting procedures and corrective action workflows aligned with ISO 9001 quality management standards.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Equipment Maintenance</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Develop preventive maintenance schedules, lubrication checklists, calibration procedures and breakdown response protocols to minimise downtime and extend asset life.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Health & Safety Documentation</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Produce risk assessments, safe systems of work, PPE matrices and emergency response procedures that meet ISO 45001 occupational health and safety requirements.
              </p>
            </div>
          </div>
        </div>

        <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2 className="card-header">Compliance Standards</h2>
          <div style={{ display: "grid", gap: "12px" }}>
            <div className="data-row" style={{ marginBottom: 0 }}>
              <span className="data-label">ISO 9001</span>
              <span className="data-value">Quality management systems — documented procedures and process controls</span>
            </div>
            <div className="data-row" style={{ marginBottom: 0 }}>
              <span className="data-label">ISO 14001</span>
              <span className="data-value">Environmental management — waste handling, spill response and emissions monitoring</span>
            </div>
            <div className="data-row" style={{ marginBottom: 0 }}>
              <span className="data-label">ISO 45001</span>
              <span className="data-value">Occupational health and safety — risk assessment and hazard control procedures</span>
            </div>
          </div>
        </div>

        <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2 className="card-header">Example Documents You Can Create</h2>
          <div style={{ display: "grid", gap: "20px" }}>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Machine Operation SOP</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                A complete procedure for starting, operating and shutting down production machinery, including safety checks, parameter settings and fault reporting steps.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Batch Record SOP</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                A structured batch manufacturing record that captures raw material traceability, in-process checks, equipment usage and final product release criteria.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Preventive Maintenance Checklist</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                A reusable checklist covering daily, weekly and monthly maintenance tasks across all production equipment with sign-off and escalation triggers.
              </p>
            </div>
          </div>
        </div>

        <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2 className="card-header">Frequently Asked Questions</h2>
          <div style={{ display: "grid", gap: "20px" }}>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Can I map existing paper-based SOPs into SOPMaster?</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Yes. SOPMaster supports importing existing documentation into structured formats. You can rebuild paper or PDF-based SOPs using the platform&apos;s structured templates and enrich them with compliance cross-references and version control.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Does SOPMaster support multi-site manufacturing operations?</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Yes. You can create department-level documentation packages that standardise procedures across multiple facilities while allowing site-specific variations where needed.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Can I include diagrams and process maps in my SOPs?</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                SOPMaster generates clean, structured document outputs that include step-by-step workflows, decision points and process mapping sections. Documents can reference external diagrams and visual aids as part of the procedure.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>How are SOPs kept up to date across a manufacturing consultancy?</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                SOPMaster includes version tracking and review scheduling. Every document is stamped with a unique verification hash, making it easy to track revisions and ensure clients are working from the current approved version.
              </p>
            </div>
          </div>
        </div>

        <div className="glass" style={{ padding: "32px", textAlign: "center" }}>
          <h2 className="card-header" style={{ textAlign: "center" }}>Start Building Manufacturing SOPs</h2>
          <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7, marginBottom: "20px", maxWidth: "480px", marginLeft: "auto", marginRight: "auto" }}>
            Create professional, compliant SOP libraries for your manufacturing clients. Get started with SOPMaster today.
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
          { "@type": "ListItem", "position": 3, "name": "Manufacturing", "item": "https://sopmaster.tech/industries/manufacturing" }
        ]
      })}</script>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Can I map existing paper-based SOPs into SOPMaster?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. SOPMaster supports importing existing documentation into structured formats. You can rebuild paper or PDF-based SOPs using the platform's structured templates and enrich them with compliance cross-references and version control."
            }
          },
          {
            "@type": "Question",
            "name": "Does SOPMaster support multi-site manufacturing operations?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. You can create department-level documentation packages that standardise procedures across multiple facilities while allowing site-specific variations where needed."
            }
          },
          {
            "@type": "Question",
            "name": "Can I include diagrams and process maps in my SOPs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "SOPMaster generates clean, structured document outputs that include step-by-step workflows, decision points and process mapping sections. Documents can reference external diagrams and visual aids as part of the procedure."
            }
          },
          {
            "@type": "Question",
            "name": "How are SOPs kept up to date across a manufacturing consultancy?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "SOPMaster includes version tracking and review scheduling. Every document is stamped with a unique verification hash, making it easy to track revisions and ensure clients are working from the current approved version."
            }
          }
        ]
      })}</script>
    </main>
  );
}
