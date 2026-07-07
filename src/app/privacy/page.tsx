"use client";

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "80px 24px" }} className="fade-in">
      <div style={{ marginBottom: "52px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 600, color: "#F8FAFC", marginBottom: "8px", letterSpacing: "-0.02em" }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: "15px", color: "#94A3B8" }}>
          Last updated: July 2026
        </p>
      </div>

      <div className="card" style={{ padding: "32px", marginBottom: "24px" }}>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7 }}>
          SOPMaster Limited ({'\u201C'}SOPMaster{'\u201D'}, {'\u201C'}we{'\u201D'}, {'\u201C'}us{'\u201D'}, {'\u201C'}our{'\u201D'}) is committed to protecting your privacy. This policy explains how we collect, use, store and protect your personal information when you use our platform at sopmaster.tech and associated services.
        </p>
      </div>

      <div className="card" style={{ padding: "32px", marginBottom: "24px" }}>
        <div className="card-header" style={{ fontSize: "13px", marginBottom: "20px" }}>1. Information We Collect</div>
        <div style={{ display: "grid", gap: "16px" }}>
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#F1F5F9", marginBottom: "4px" }}>Account Information</h3>
            <p style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.6 }}>
              When you register for an account, we collect your full name, company name, email address and account PIN (stored as a secure hash). This information is necessary to create and maintain your account.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#F1F5F9", marginBottom: "4px" }}>Company Information</h3>
            <p style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.6 }}>
              We collect information about your company including company size, industry sector, jurisdiction and documentation focus preferences. This data is used to configure your platform experience and determine applicable pricing.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#F1F5F9", marginBottom: "4px" }}>Usage Data</h3>
            <p style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.6 }}>
              We collect information about how you interact with our platform, including documents created, features accessed and engagement patterns. This data helps us improve the platform and understand usage trends.
            </p>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: "32px", marginBottom: "24px" }}>
        <div className="card-header" style={{ fontSize: "13px", marginBottom: "20px" }}>2. Payment Processing</div>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          We use Stripe, a third-party payment processor, to handle all subscription and credit purchases. Your payment card details are processed and stored by Stripe in accordance with their privacy and security policies. We do not store, process or have access to your full payment card numbers.
        </p>
        <p style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.6 }}>
          Stripe{'\u2019'}s privacy policy is available at <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#3B82F6", textDecoration: "none" }}>stripe.com/privacy</a>.
        </p>
      </div>

      <div className="card" style={{ padding: "32px", marginBottom: "24px" }}>
        <div className="card-header" style={{ fontSize: "13px", marginBottom: "20px" }}>3. Cookies</div>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          Our platform uses essential cookies required for authentication and session management. These cookies are necessary for the platform to function and do not track your activity across other websites.
        </p>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          We do not use marketing cookies, tracking cookies or third-party analytics cookies on our platform.
        </p>
        <p style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.6 }}>
          You can control cookie settings through your browser preferences. Disabling essential cookies may prevent the platform from functioning correctly.
        </p>
      </div>

      <div className="card" style={{ padding: "32px", marginBottom: "24px" }}>
        <div className="card-header" style={{ fontSize: "13px", marginBottom: "20px" }}>4. Data Security</div>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure or destruction. These measures include encryption in transit (TLS), secure credential hashing, access controls and regular security reviews.
        </p>
        <p style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.6 }}>
          While we take every reasonable precaution, no electronic storage or transmission method is completely secure. We encourage users to use strong, unique credentials and maintain the confidentiality of their account PIN.
        </p>
      </div>

      <div className="card" style={{ padding: "32px", marginBottom: "24px" }}>
        <div className="card-header" style={{ fontSize: "13px", marginBottom: "20px" }}>5. Data Retention</div>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          We retain your personal information for as long as your account remains active and for a reasonable period thereafter to comply with legal obligations, resolve disputes and enforce our agreements.
        </p>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          If you close your account, we will delete or anonymise your personal information within 90 days, except where we are required to retain certain information for legal or regulatory purposes.
        </p>
        <p style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.6 }}>
          Document content you create on the platform remains accessible to you while your account is active. We recommend downloading copies of important documents before account closure.
        </p>
      </div>

      <div className="card" style={{ padding: "32px", marginBottom: "24px" }}>
        <div className="card-header" style={{ fontSize: "13px", marginBottom: "20px" }}>6. Your Rights</div>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          Under UK data protection law, you have the following rights regarding your personal information:
        </p>
        <div style={{ display: "grid", gap: "8px", marginBottom: "16px" }}>
          <div style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.5 }}>
            <span style={{ color: "#F1F5F9", fontWeight: 500 }}>Right to access</span> — Request a copy of the personal data we hold about you.
          </div>
          <div style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.5 }}>
            <span style={{ color: "#F1F5F9", fontWeight: 500 }}>Right to rectification</span> — Request correction of inaccurate or incomplete data.
          </div>
          <div style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.5 }}>
            <span style={{ color: "#F1F5F9", fontWeight: 500 }}>Right to erasure</span> — Request deletion of your personal data where applicable.
          </div>
          <div style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.5 }}>
            <span style={{ color: "#F1F5F9", fontWeight: 500 }}>Right to restriction</span> — Request restriction of processing under certain circumstances.
          </div>
          <div style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.5 }}>
            <span style={{ color: "#F1F5F9", fontWeight: 500 }}>Right to portability</span> — Request transfer of your data to another service provider.
          </div>
          <div style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.5 }}>
            <span style={{ color: "#F1F5F9", fontWeight: 500 }}>Right to object</span> — Object to the processing of your personal data for legitimate interests.
          </div>
        </div>
        <p style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.6 }}>
          To exercise any of these rights, contact us at <a href="mailto:Support@sopmaster.tech" style={{ color: "#3B82F6", textDecoration: "none" }}>Support@sopmaster.tech</a>. We will respond to your request within 30 days.
        </p>
      </div>

      <div className="card" style={{ padding: "32px", marginBottom: "24px" }}>
        <div className="card-header" style={{ fontSize: "13px", marginBottom: "20px" }}>7. Contact Information</div>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          If you have any questions about this privacy policy or how we handle your data, please contact us:
        </p>
        <p style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.6 }}>
          Email: <a href="mailto:Support@sopmaster.tech" style={{ color: "#3B82F6", textDecoration: "none" }}>Support@sopmaster.tech</a>
        </p>
      </div>

      <div className="card" style={{ padding: "32px" }}>
        <div className="card-header" style={{ fontSize: "13px", marginBottom: "20px" }}>8. Updates to This Policy</div>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          We may update this privacy policy from time to time to reflect changes in our practices, legal requirements or operational needs. Material changes will be notified to you via the email address associated with your account or through a notice on the platform.
        </p>
        <p style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.6 }}>
          We encourage you to review this policy periodically. Continued use of the platform after changes take effect constitutes acceptance of the updated policy.
        </p>
      </div>
    </div>
  );
}
