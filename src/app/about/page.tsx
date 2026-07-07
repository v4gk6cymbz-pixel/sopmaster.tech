"use client";

export default function AboutPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "64px 24px" }} className="fade-in">
      <div className="hero-section" style={{ padding: "40px 0 48px", textAlign: "left" }}>
        <div className="ogi-badge">About</div>
        <h1 style={{ fontSize: "34px", fontWeight: 600, color: "var(--white)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
          SOPMaster
        </h1>
        <p style={{ fontSize: "15px", color: "var(--text-secondary)", maxWidth: "560px", lineHeight: 1.7 }}>
          The world&apos;s first Operational Governance Infrastructure platform. Built to transform how enterprises document, govern, and scale operational procedures.
        </p>
      </div>

      <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
        <p className="card-header" style={{ marginBottom: "16px" }}>Our Purpose</p>
        <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7, marginBottom: "16px" }}>
          SOPMaster is a professional Operational Governance Infrastructure platform purpose-built for consultants, consultancy firms and documentation professionals. We provide the infrastructure to create, manage and maintain structured Standard Operating Procedures, operational checklists and department-level documentation that improves consistency, efficiency and client delivery.
        </p>
        <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7 }}>
          Our platform replaces ad-hoc document creation with a systematic approach to operational governance, enabling firms to standardise their delivery methodology and scale their practice without sacrificing quality or control.
        </p>
      </div>

      <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
        <p className="card-header" style={{ marginBottom: "16px" }}>Built for Consultants, by Consultants</p>
        <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7, marginBottom: "16px" }}>
          Consultancy firms face a persistent challenge: delivering consistent, high-quality operational documentation across every client engagement. SOPMaster solves this by providing a structured documentation framework that captures processes, policies and procedures in a repeatable, auditable format.
        </p>
        <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7, marginBottom: "16px" }}>
          Our platform supports the full documentation lifecycle — from initial process mapping through to final document generation and vault management — ensuring every engagement produces professional, consistent deliverables.
        </p>
        <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7 }}>
          Whether you are a solo consultant building client systems or a large consultancy managing multi-department documentation programmes, SOPMaster provides the tools and structure to deliver at scale.
        </p>
      </div>

      <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
        <p className="card-header" style={{ marginBottom: "16px" }}>What We Offer</p>
        <div style={{ display: "grid", gap: "20px" }}>
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Standard Operating Procedures</h3>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Structured SOP documents with process mapping, step-by-step workflows, decision points and regulatory compliance references. Each document includes a full cover page, table of contents and verification hash for auditability.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Operational Checklists</h3>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Reusable checklists for recurring processes, compliance reviews, onboarding procedures and operational governance. Designed to ensure consistency across teams and engagements.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Batch Documentation Packages</h3>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Department-level documentation packages that generate complete SOP libraries across an entire organisation. Suitable for restructuring programmes, system migrations and operational transformation projects.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "6px" }}>Document Vault</h3>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Centralised document repository with search, version tracking and download capabilities. Every document is stamped with a unique verification hash for authenticity verification.
            </p>
          </div>
        </div>
      </div>

      <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
        <p className="card-header" style={{ marginBottom: "16px" }}>Why Operational Governance Infrastructure Matters</p>
        <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7, marginBottom: "16px" }}>
          Well-structured operational documentation is the foundation of scalable consultancy delivery. It ensures every engagement follows a consistent methodology, reduces the risk of oversight or omission, and provides clients with lasting value that extends beyond the engagement period.
        </p>
        <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7, marginBottom: "16px" }}>
          For internal operations, documented procedures enable faster onboarding, clearer role definition and measurable process improvement. For client engagements, professional documentation demonstrates rigour, builds trust and creates a permanent record of the work delivered.
        </p>
        <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7 }}>
          SOPMaster is designed to make exceptional operational documentation the standard, not the exception.
        </p>
      </div>

      <div className="glass" style={{ padding: "32px" }}>
        <p className="card-header" style={{ marginBottom: "16px" }}>Our Commitment</p>
        <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7, marginBottom: "16px" }}>
          We are committed to providing a reliable, professional platform that consultancy firms can depend on for their day-to-day documentation needs. Our focus is on quality, consistency and the practical realities of delivering professional services.
        </p>
        <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7, marginBottom: "16px" }}>
          SOPMaster is developed and maintained by a team with direct experience in consultancy operations, process design and professional services delivery. We understand the demands of client work because we have lived them.
        </p>
        <p style={{ fontSize: "13px", color: "var(--text-tertiary)", lineHeight: 1.7 }}>
          For support or enquiries, contact us at <a href="mailto:Support@sopmaster.tech" style={{ color: "var(--accent)", textDecoration: "none", borderBottom: "1px solid var(--accent-border)" }}>Support@sopmaster.tech</a>.
        </p>
      </div>
    </div>
  );
}
