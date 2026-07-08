"use client";

export default function ContactPage() {
  return (
    <main id="main-content">
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "64px 24px" }} className="fade-in">
      <div className="hero-section" style={{ padding: "40px 0 48px", textAlign: "left" }}>
        <div className="ogi-badge">Contact</div>
        <h1 style={{ fontSize: "34px", fontWeight: 600, color: "var(--white)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
          Get in Touch
        </h1>
        <p style={{ fontSize: "15px", color: "var(--text-secondary)", maxWidth: "560px", lineHeight: 1.7 }}>
          Our team is here to help with any questions about the platform, your account, or our services.
        </p>
      </div>

      <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
        <h2 className="card-header" style={{ marginBottom: "20px" }}>Email Support</h2>
        <p style={{ fontSize: "14px", color: "var(--slate-300)", lineHeight: 1.7, marginBottom: "4px" }}>
          <a href="mailto:Support@sopmaster.tech" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 500 }}>
            Support@sopmaster.tech
          </a>
        </p>
        <p style={{ fontSize: "13px", color: "var(--text-tertiary)", marginBottom: 0 }}>
          Our support team monitors this inbox during business hours and aims to respond within 24 hours.
        </p>
      </div>

      <div className="glass" style={{ padding: "32px", marginBottom: "24px" }}>
        <h2 className="card-header" style={{ marginBottom: "20px" }}>What We Can Help With</h2>
        <div style={{ display: "grid", gap: "16px" }}>
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "4px" }}>Account Assistance</h3>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
              Login issues, account setup, profile updates and team member management.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "4px" }}>Billing &amp; Subscriptions</h3>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
              Subscription plans, credit purchases, payment enquiries and invoice requests.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "4px" }}>Platform Issues</h3>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
              Technical issues, feature requests, bug reports and platform feedback.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", marginBottom: "4px" }}>General Enquiries</h3>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
              Partnership opportunities, press enquiries and anything else.
            </p>
          </div>
        </div>
      </div>

      <div className="glass" style={{ padding: "32px" }}>
        <h2 className="card-header" style={{ marginBottom: "20px" }}>Response Times</h2>
        <div style={{ display: "grid", gap: "12px" }}>
          <div className="data-row" style={{ marginBottom: 0 }}>
            <span className="data-label">Email support</span>
            <span className="data-value">Within 24 hours</span>
          </div>
          <div className="data-row" style={{ marginBottom: 0 }}>
            <span className="data-label">Billing enquiries</span>
            <span className="data-value">Within 48 hours</span>
          </div>
          <div className="data-row" style={{ marginBottom: 0 }}>
            <span className="data-label">Urgent platform issues</span>
            <span className="data-value" style={{ color: "var(--success)" }}>Same business day</span>
          </div>
        </div>
      </div>
    </div>
    </main>
  );
}
