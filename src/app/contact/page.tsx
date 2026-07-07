"use client";

export default function ContactPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "64px 24px" }} className="fade-in">
      <div style={{ marginBottom: "48px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
          Contact Us
        </h1>
        <p style={{ fontSize: "15px", color: "var(--text-secondary)" }}>
          Get in touch with the SOPMaster team. Our team is here to help with any questions about our platform, account, or services — contact us today.
        </p>
      </div>

      <div className="card" style={{ padding: "32px", marginBottom: "24px" }}>
        <div className="card-header" style={{ fontSize: "13px", marginBottom: "20px" }}>Email Support</div>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "4px" }}>
          <a href="mailto:Support@sopmaster.tech" style={{ color: "#3B82F6", textDecoration: "none", fontWeight: 500 }}>
            Support@sopmaster.tech
          </a>
        </p>
        <p style={{ fontSize: "13px", color: "#64748B", marginBottom: "20px" }}>
          Our support team monitors this inbox during business hours and aims to respond within 24 hours.
        </p>
      </div>

      <div className="card" style={{ padding: "32px", marginBottom: "24px" }}>
        <div className="card-header" style={{ fontSize: "13px", marginBottom: "20px" }}>What We Can Help With</div>
        <div style={{ display: "grid", gap: "16px" }}>
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#F1F5F9", marginBottom: "4px" }}>Account Assistance</h3>
            <p style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.5 }}>
              Login issues, account setup, profile updates and team member management.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#F1F5F9", marginBottom: "4px" }}>Billing & Subscriptions</h3>
            <p style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.5 }}>
              Subscription plans, credit purchases, payment enquiries and invoice requests.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#F1F5F9", marginBottom: "4px" }}>Platform Issues</h3>
            <p style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.5 }}>
              Technical issues, feature requests, bug reports and platform feedback.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#F1F5F9", marginBottom: "4px" }}>General Enquiries</h3>
            <p style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.5 }}>
              Partnership opportunities, press enquiries and anything else.
            </p>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: "32px" }}>
        <div className="card-header" style={{ fontSize: "13px", marginBottom: "20px" }}>Response Times</div>
        <div style={{ display: "grid", gap: "12px" }}>
          <div className="data-row" style={{ marginBottom: "0" }}>
            <span className="data-label">Email support</span>
            <span className="data-value">Within 24 hours</span>
          </div>
          <div className="data-row" style={{ marginBottom: "0" }}>
            <span className="data-label">Billing enquiries</span>
            <span className="data-value">Within 48 hours</span>
          </div>
          <div className="data-row" style={{ marginBottom: "0" }}>
            <span className="data-label">Urgent platform issues</span>
            <span className="data-value" style={{ color: "#22C55E" }}>Same business day</span>
          </div>
        </div>
      </div>
    </div>
  );
}
