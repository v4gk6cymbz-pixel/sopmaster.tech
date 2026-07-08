import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SOP Software for Hospitality Consultants",
  description:
    "SOPMaster helps hospitality consultants create SOPs for front-of-house, housekeeping, health & safety and food safety. Compliant with ISO 9001, ISO 22000 and HACCP.",
  keywords: [
    "hospitality SOP software",
    "SOP for hospitality consultants",
    "front of house procedures",
    "housekeeping standards",
    "food safety HACCP",
    "hotel SOP documentation",
  ],
  openGraph: {
    title: "SOP Software for Hospitality Consultants | SOPMaster",
    description:
      "Deliver structured front-of-house procedures, housekeeping standards and food safety documentation for hospitality clients using SOPMaster.",
  },
};

export default function HospitalityPage() {
  return (
    <main id="main-content" className="app-content" style={{ maxWidth: "800px", margin: "0 auto", padding: "64px 24px" }}>
      <div className="fade-in">
        <div className="hero-section" style={{ padding: "40px 0 48px", textAlign: "left" }}>
          <div className="ogi-badge">Hospitality</div>
          <h1 style={{ fontSize: "34px", fontWeight: 600, color: "var(--white)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
            SOP Software for Hospitality Consultants
          </h1>
          <p style={{ fontSize: "15px", color: "var(--text-secondary)", maxWidth: "560px", lineHeight: 1.7 }}>
            SOPMaster equips hospitality consultants with the tools to document front-of-house procedures, housekeeping standards, health & safety protocols and food safety management systems in a structured, compliance-ready format.
          </p>
        </div>

        <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2 className="card-header">Why Hospitality Consultants Choose SOPMaster</h2>
          <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7, marginBottom: "16px" }}>
            Hospitality businesses depend on consistent service delivery across multiple locations, shifts and teams. SOPMaster enables consultants to document every aspect of hotel, restaurant and venue operations in a standardised, repeatable format.
          </p>
          <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7, marginBottom: "16px" }}>
            The platform supports the full documentation lifecycle — from process mapping and procedure authoring through to compliance cross-referencing and vault storage. Each document includes a cover page, table of contents and verification hash for complete traceability.
          </p>
          <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7 }}>
            Whether you are documenting a single boutique hotel or an international restaurant group, SOPMaster provides the structure and consistency that hospitality operations demand.
          </p>
        </div>

        <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2 className="card-header">Key Use Cases</h2>
          <div style={{ display: "grid", gap: "20px" }}>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Front-of-House Procedures</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Document guest check-in and check-out workflows, reservation management, concierge services, complaint handling procedures and loyalty programme processes that define the guest experience.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Housekeeping Standards</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Create room cleaning checklists, public area maintenance schedules, linen management procedures, lost property protocols and deep cleaning programmes that maintain consistent standards.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Health & Safety</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Develop fire safety procedures, COSHH risk assessments, manual handling protocols, lone working policies and first aid arrangements that protect guests and staff alike.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Food Safety</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Produce HACCP plans, temperature monitoring procedures, allergen management protocols, cleaning schedules and traceability procedures that satisfy ISO 22000 and local food safety regulations.
              </p>
            </div>
          </div>
        </div>

        <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2 className="card-header">Compliance Standards</h2>
          <div style={{ display: "grid", gap: "12px" }}>
            <div className="data-row" style={{ marginBottom: 0 }}>
              <span className="data-label">ISO 9001</span>
              <span className="data-value">Quality management — service consistency and customer satisfaction</span>
            </div>
            <div className="data-row" style={{ marginBottom: 0 }}>
              <span className="data-label">ISO 22000</span>
              <span className="data-value">Food safety management — HACCP, traceability and food handling</span>
            </div>
            <div className="data-row" style={{ marginBottom: 0 }}>
              <span className="data-label">HACCP</span>
              <span className="data-value">Hazard analysis — critical control points, monitoring and corrective actions</span>
            </div>
          </div>
        </div>

        <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2 className="card-header">Example Documents You Can Create</h2>
          <div style={{ display: "grid", gap: "20px" }}>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Guest Check-In SOP</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                A complete check-in procedure covering pre-arrival preparation, guest greeting, identification verification, room assignment, payment processing and check-in documentation.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Room Cleaning Checklist</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                A detailed room cleaning and preparation checklist covering bedroom, bathroom and public areas with quality standards, product specifications and inspection sign-off at each stage.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Food Safety Inspection SOP</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                A scheduled inspection procedure covering food storage temperatures, date checks, cross-contamination prevention, cleaning standards, pest control and staff hygiene compliance.
              </p>
            </div>
          </div>
        </div>

        <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2 className="card-header">Frequently Asked Questions</h2>
          <div style={{ display: "grid", gap: "20px" }}>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Can SOPMaster handle multi-property hospitality documentation?</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Yes. SOPMaster&apos;s batch documentation feature allows you to create standardised procedure libraries that can be deployed across multiple properties, brands or regions while accommodating property-specific variations.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Does SOPMaster support HACCP documentation?</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Yes. You can create complete HACCP plans including hazard analysis, critical control point identification, monitoring procedures, corrective actions and verification records — all organised within a structured documentation framework.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Can I create SOPs for different departments within a hotel?</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Yes. SOPMaster allows you to organise documentation by department — front desk, housekeeping, food and beverage, maintenance, events — so each team maintains its own library of relevant procedures.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>How are SOPs kept consistent across different properties?</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                SOPMaster provides a centralised documentation platform where brand standards can be defined at the group level while individual properties maintain location-specific variations. All documents benefit from version control and audit trails.
              </p>
            </div>
          </div>
        </div>

        <div className="glass" style={{ padding: "32px", textAlign: "center" }}>
          <h2 className="card-header" style={{ textAlign: "center" }}>Start Building Hospitality SOPs</h2>
          <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7, marginBottom: "20px", maxWidth: "480px", marginLeft: "auto", marginRight: "auto" }}>
            Create professional, compliant SOP libraries for your hospitality clients. Get started with SOPMaster today.
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
          { "@type": "ListItem", "position": 3, "name": "Hospitality", "item": "https://sopmaster.tech/industries/hospitality" }
        ]
      })}</script>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Can SOPMaster handle multi-property hospitality documentation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. SOPMaster's batch documentation feature allows you to create standardised procedure libraries that can be deployed across multiple properties, brands or regions while accommodating property-specific variations."
            }
          },
          {
            "@type": "Question",
            "name": "Does SOPMaster support HACCP documentation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. You can create complete HACCP plans including hazard analysis, critical control point identification, monitoring procedures, corrective actions and verification records — all organised within a structured documentation framework."
            }
          },
          {
            "@type": "Question",
            "name": "Can I create SOPs for different departments within a hotel?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. SOPMaster allows you to organise documentation by department — front desk, housekeeping, food and beverage, maintenance, events — so each team maintains its own library of relevant procedures."
            }
          },
          {
            "@type": "Question",
            "name": "How are SOPs kept consistent across different properties?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "SOPMaster provides a centralised documentation platform where brand standards can be defined at the group level while individual properties maintain location-specific variations. All documents benefit from version control and audit trails."
            }
          }
        ]
      })}</script>
    </main>
  );
}
