import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SOP Software for Healthcare Consultants",
  description:
    "SOPMaster helps healthcare consultants create SOPs for clinical protocols, patient safety, infection control and administrative procedures. Compliant with ISO 9001, ISO 27001, CQC standards and GDPR.",
  keywords: [
    "healthcare SOP software",
    "SOP for healthcare consultants",
    "clinical protocol documentation",
    "patient safety checklists",
    "infection control procedures",
    "CQC compliance documentation",
  ],
  openGraph: {
    title: "SOP Software for Healthcare Consultants | SOPMaster",
    description:
      "Deliver structured clinical protocols, patient safety checklists and infection control procedures for healthcare clients using SOPMaster.",
  },
};

export default function HealthcarePage() {
  return (
    <main id="main-content" className="app-content" style={{ maxWidth: "800px", margin: "0 auto", padding: "64px 24px" }}>
      <div className="fade-in">
        <div className="hero-section" style={{ padding: "40px 0 48px", textAlign: "left" }}>
          <div className="ogi-badge">Healthcare</div>
          <h1 style={{ fontSize: "34px", fontWeight: 600, color: "var(--white)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
            SOP Software for Healthcare Consultants
          </h1>
          <p style={{ fontSize: "15px", color: "var(--text-secondary)", maxWidth: "560px", lineHeight: 1.7 }}>
            SOPMaster enables healthcare consultants to document clinical protocols, patient safety procedures, infection control measures and administrative workflows in a structured, regulation-compliant format.
          </p>
        </div>

        <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2 className="card-header">Why Healthcare Consultants Choose SOPMaster</h2>
          <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7, marginBottom: "16px" }}>
            Healthcare organisations operate under strict regulatory oversight where documentation accuracy directly impacts patient safety. SOPMaster gives consultants the infrastructure to create and maintain precise, audit-ready procedural documentation.
          </p>
          <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7, marginBottom: "16px" }}>
            The platform supports the full documentation lifecycle — from clinical pathway mapping through to policy authoring, compliance cross-referencing and secure vault storage. Each document includes a cover page, table of contents and verification hash for complete traceability.
          </p>
          <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7 }}>
            Whether you are documenting a single clinical department or an entire healthcare organisation, SOPMaster provides the structure and rigour that healthcare documentation demands.
          </p>
        </div>

        <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2 className="card-header">Key Use Cases</h2>
          <div style={{ display: "grid", gap: "20px" }}>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Clinical Protocols</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Document clinical decision pathways, treatment protocols, referral procedures and patient assessment frameworks that standardise care delivery across teams and sites.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Patient Safety Checklists</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Create surgical safety checklists, handover protocols, medication reconciliation procedures and incident reporting workflows that reduce risk and improve outcomes.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Infection Control</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Develop cleaning and disinfection schedules, isolation precaution procedures, outbreak management plans and personal protective equipment (PPE) protocols aligned with best practice guidelines.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Administrative Procedures</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Produce records management policies, data protection procedures, complaints handling workflows and staff induction documentation that support efficient healthcare administration.
              </p>
            </div>
          </div>
        </div>

        <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2 className="card-header">Compliance Standards</h2>
          <div style={{ display: "grid", gap: "12px" }}>
            <div className="data-row" style={{ marginBottom: 0 }}>
              <span className="data-label">ISO 9001</span>
              <span className="data-value">Quality management — documented procedures and continuous improvement</span>
            </div>
            <div className="data-row" style={{ marginBottom: 0 }}>
              <span className="data-label">ISO 27001</span>
              <span className="data-value">Information security — data protection, access control and breach response</span>
            </div>
            <div className="data-row" style={{ marginBottom: 0 }}>
              <span className="data-label">CQC Standards</span>
              <span className="data-value">Care Quality Commission — safe, effective, caring, responsive and well-led</span>
            </div>
            <div className="data-row" style={{ marginBottom: 0 }}>
              <span className="data-label">GDPR</span>
              <span className="data-value">Data protection — patient data handling, consent and subject access requests</span>
            </div>
          </div>
        </div>

        <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2 className="card-header">Example Documents You Can Create</h2>
          <div style={{ display: "grid", gap: "20px" }}>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Patient Intake SOP</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                A structured procedure for patient registration, triage assessment, medical history collection and consent documentation that ensures consistent intake across all access points.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Medication Administration Checklist</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                A step-by-step checklist covering the five rights of medication administration — right patient, right drug, right dose, right route and right time — with documentation and escalation prompts.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Data Breach Response SOP</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                A detailed incident response procedure covering breach detection, containment, investigation, notification to the ICO and affected individuals, and post-incident review.
              </p>
            </div>
          </div>
        </div>

        <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2 className="card-header">Frequently Asked Questions</h2>
          <div style={{ display: "grid", gap: "20px" }}>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Can SOPMaster support CQC inspection readiness?</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Yes. SOPMaster helps you organise policies and procedures against CQC&apos;s five key lines of enquiry. You can tag documents by regulation, create evidence libraries and maintain audit trails that demonstrate compliance during inspections.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Is patient data handled securely within the platform?</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                SOPMaster is built with information security in mind. The platform supports ISO 27001-compliant documentation practices and includes version tracking, access controls and audit trails. You control what patient-identifiable information, if any, is included in your documents.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Can I create SOPs for multiple clinical departments?</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Yes. SOPMaster&apos;s department-level documentation packages allow you to create, manage and maintain separate SOP libraries for different clinical specialties, wards or units within the same organisation.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>How often should healthcare SOPs be reviewed?</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                SOPMaster enables you to set review schedules and track document versions, ensuring your clinical protocols and procedures are reviewed within regulatory timeframes and that outdated versions are clearly identified.
              </p>
            </div>
          </div>
        </div>

        <div className="glass" style={{ padding: "32px", textAlign: "center" }}>
          <h2 className="card-header" style={{ textAlign: "center" }}>Start Building Healthcare SOPs</h2>
          <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7, marginBottom: "20px", maxWidth: "480px", marginLeft: "auto", marginRight: "auto" }}>
            Create professional, compliant SOP libraries for your healthcare clients. Get started with SOPMaster today.
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
          { "@type": "ListItem", "position": 3, "name": "Healthcare", "item": "https://sopmaster.tech/industries/healthcare" }
        ]
      })}</script>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Can SOPMaster support CQC inspection readiness?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. SOPMaster helps you organise policies and procedures against CQC's five key lines of enquiry. You can tag documents by regulation, create evidence libraries and maintain audit trails that demonstrate compliance during inspections."
            }
          },
          {
            "@type": "Question",
            "name": "Is patient data handled securely within the platform?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "SOPMaster is built with information security in mind. The platform supports ISO 27001-compliant documentation practices and includes version tracking, access controls and audit trails. You control what patient-identifiable information, if any, is included in your documents."
            }
          },
          {
            "@type": "Question",
            "name": "Can I create SOPs for multiple clinical departments?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. SOPMaster's department-level documentation packages allow you to create, manage and maintain separate SOP libraries for different clinical specialties, wards or units within the same organisation."
            }
          },
          {
            "@type": "Question",
            "name": "How often should healthcare SOPs be reviewed?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "SOPMaster enables you to set review schedules and track document versions, ensuring your clinical protocols and procedures are reviewed within regulatory timeframes and that outdated versions are clearly identified."
            }
          }
        ]
      })}</script>
    </main>
  );
}
