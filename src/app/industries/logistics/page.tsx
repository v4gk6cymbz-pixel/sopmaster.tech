import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SOP Software for Logistics Consultants",
  description:
    "SOPMaster helps logistics consultants create SOPs for warehouse operations, fleet management, supply chain documentation and inventory control. Compliant with ISO 9001, ISO 14001 and ISO 28000.",
  keywords: [
    "logistics SOP software",
    "SOP for logistics consultants",
    "warehouse operations procedures",
    "fleet management SOP",
    "supply chain documentation",
    "ISO 28000 supply chain security",
  ],
  openGraph: {
    title: "SOP Software for Logistics Consultants | SOPMaster",
    description:
      "Deliver structured warehouse operations SOPs, fleet management procedures and supply chain documentation for logistics clients using SOPMaster.",
  },
};

export default function LogisticsPage() {
  return (
    <main id="main-content" className="app-content" style={{ maxWidth: "800px", margin: "0 auto", padding: "64px 24px" }}>
      <div className="fade-in">
        <div className="hero-section" style={{ padding: "40px 0 48px", textAlign: "left" }}>
          <div className="ogi-badge">Logistics</div>
          <h1 style={{ fontSize: "34px", fontWeight: 600, color: "var(--white)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
            SOP Software for Logistics Consultants
          </h1>
          <p style={{ fontSize: "15px", color: "var(--text-secondary)", maxWidth: "560px", lineHeight: 1.7 }}>
            SOPMaster provides logistics consultants with the infrastructure to document warehouse operations, fleet management, supply chain procedures and inventory control processes in a structured, compliance-ready format.
          </p>
        </div>

        <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2 className="card-header">Why Logistics Consultants Choose SOPMaster</h2>
          <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7, marginBottom: "16px" }}>
            Logistics operations depend on consistent, repeatable processes to maintain efficiency and safety across warehouses, transport fleets and supply chain networks. SOPMaster enables consultants to document these processes in a standardised, scalable format.
          </p>
          <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7, marginBottom: "16px" }}>
            The platform supports the full documentation lifecycle — from process mapping and procedure authoring through to compliance cross-referencing and vault storage. Each document includes a cover page, table of contents and verification hash for complete traceability.
          </p>
          <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7 }}>
            Whether you are documenting a single warehouse operation or a global supply chain network, SOPMaster gives you the tools to create consistent, professional documentation that logistics clients can rely on.
          </p>
        </div>

        <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2 className="card-header">Key Use Cases</h2>
          <div style={{ display: "grid", gap: "20px" }}>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Warehouse Operations</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Document goods receiving, put-away, picking, packing, despatch and returns processing procedures. Standardise workflows across multiple warehouses to ensure consistent service levels.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Fleet Management</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Create vehicle inspection checklists, driver induction procedures, route planning protocols, fuel management processes and maintenance scheduling documents that keep fleets operating safely and efficiently.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Supply Chain Documentation</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Develop supplier onboarding procedures, purchase order workflows, freight forwarding protocols and customs compliance documentation that support end-to-end supply chain visibility.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Inventory Control</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Produce cycle counting procedures, stock take protocols, inventory reconciliation processes and slow-moving stock review workflows that maintain accurate stock records.
              </p>
            </div>
          </div>
        </div>

        <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2 className="card-header">Compliance Standards</h2>
          <div style={{ display: "grid", gap: "12px" }}>
            <div className="data-row" style={{ marginBottom: 0 }}>
              <span className="data-label">ISO 9001</span>
              <span className="data-value">Quality management — warehousing, distribution and process control</span>
            </div>
            <div className="data-row" style={{ marginBottom: 0 }}>
              <span className="data-label">ISO 14001</span>
              <span className="data-value">Environmental management — waste handling, spill response and emissions</span>
            </div>
            <div className="data-row" style={{ marginBottom: 0 }}>
              <span className="data-label">ISO 28000</span>
              <span className="data-value">Supply chain security — risk assessment, security management and continuity</span>
            </div>
          </div>
        </div>

        <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2 className="card-header">Example Documents You Can Create</h2>
          <div style={{ display: "grid", gap: "20px" }}>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Order Fulfilment SOP</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                A complete procedure covering order receipt, allocation, picking, packing, labelling and despatch with quality checks at each stage to ensure accuracy and timeliness.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Warehouse Safety Checklist</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                A daily safety inspection checklist covering racking integrity, aisle clearance, fire extinguisher checks, spill kit availability, pedestrian walkways and equipment safety systems.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Fleet Maintenance SOP</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                A structured maintenance procedure covering scheduled servicing, daily walk-around checks, defect reporting, breakdown response and MOT/compliance documentation for each vehicle in the fleet.
              </p>
            </div>
          </div>
        </div>

        <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
          <h2 className="card-header">Frequently Asked Questions</h2>
          <div style={{ display: "grid", gap: "20px" }}>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Can SOPMaster handle multi-warehouse documentation?</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Yes. SOPMaster&apos;s batch documentation feature allows you to create standardised procedure libraries that can be deployed across multiple warehouse locations while accommodating site-specific variations where needed.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Does SOPMaster support supply chain security compliance?</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Yes. The platform supports ISO 28000 supply chain security management documentation, including risk assessment frameworks, security incident reporting and business continuity procedures.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Can I create checklists for warehouse operatives?</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Yes. SOPMaster includes a dedicated checklist feature for creating reusable operational checklists such as daily safety inspections, picking accuracy checks and equipment handover procedures.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>How do I manage document versions across a logistics consultancy?</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Every document in SOPMaster includes version tracking and a unique verification hash. You can review revision history, manage approvals and ensure clients always receive the current approved version.
              </p>
            </div>
          </div>
        </div>

        <div className="glass" style={{ padding: "32px", textAlign: "center" }}>
          <h2 className="card-header" style={{ textAlign: "center" }}>Start Building Logistics SOPs</h2>
          <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7, marginBottom: "20px", maxWidth: "480px", marginLeft: "auto", marginRight: "auto" }}>
            Create professional, compliant SOP libraries for your logistics clients. Get started with SOPMaster today.
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
          { "@type": "ListItem", "position": 3, "name": "Logistics", "item": "https://sopmaster.tech/industries/logistics" }
        ]
      })}</script>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Can SOPMaster handle multi-warehouse documentation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. SOPMaster's batch documentation feature allows you to create standardised procedure libraries that can be deployed across multiple warehouse locations while accommodating site-specific variations where needed."
            }
          },
          {
            "@type": "Question",
            "name": "Does SOPMaster support supply chain security compliance?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. The platform supports ISO 28000 supply chain security management documentation, including risk assessment frameworks, security incident reporting and business continuity procedures."
            }
          },
          {
            "@type": "Question",
            "name": "Can I create checklists for warehouse operatives?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. SOPMaster includes a dedicated checklist feature for creating reusable operational checklists such as daily safety inspections, picking accuracy checks and equipment handover procedures."
            }
          },
          {
            "@type": "Question",
            "name": "How do I manage document versions across a logistics consultancy?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Every document in SOPMaster includes version tracking and a unique verification hash. You can review revision history, manage approvals and ensure clients always receive the current approved version."
            }
          }
        ]
      })}</script>
    </main>
  );
}
