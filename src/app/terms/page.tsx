"use client";

export default function TermsPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "64px 24px" }} className="fade-in">
      <div style={{ marginBottom: "48px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#F1F5F9", marginBottom: "4px" }}>
          Terms & Conditions
        </h1>
        <p style={{ fontSize: "13px", color: "#64748B" }}>
          Last updated: July 2026
        </p>
      </div>

      <div className="card" style={{ padding: "32px", marginBottom: "24px" }}>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7 }}>
          These Terms & Conditions ({'\u201C'}Terms{'\u201D'}) govern your access to and use of the SOPMaster platform, website and associated services (collectively, the {'\u201C'}Platform{'\u201D'}). By registering for or using the Platform, you agree to be bound by these Terms. If you do not agree, you must not use the Platform.
        </p>
      </div>

      <div className="card" style={{ padding: "32px", marginBottom: "24px" }}>
        <div className="card-header" style={{ fontSize: "13px", marginBottom: "20px" }}>1. Platform Usage</div>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          1.1 SOPMaster provides a professional operational documentation platform for consultants, consultancy firms and documentation professionals to create, manage and store Standard Operating Procedures, operational checklists and related documentation.
        </p>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          1.2 You may use the Platform only in compliance with these Terms and all applicable laws and regulations. You are responsible for ensuring that your use of the Platform does not violate any applicable law or regulation.
        </p>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          1.3 We reserve the right to modify, suspend or discontinue any aspect of the Platform at any time, with reasonable notice where practicable.
        </p>
        <p style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.6 }}>
          1.4 The Platform is intended for professional business use. You must be at least 18 years of age to register for an account.
        </p>
      </div>

      <div className="card" style={{ padding: "32px", marginBottom: "24px" }}>
        <div className="card-header" style={{ fontSize: "13px", marginBottom: "20px" }}>2. Accounts</div>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          2.1 You must register for an account to access the Platform. You are responsible for maintaining the confidentiality of your account credentials, including your PIN, and for all activities that occur under your account.
        </p>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          2.2 You must provide accurate, current and complete information during the registration process and promptly update this information as necessary.
        </p>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          2.3 Each account registration represents a single company entity. Multiple accounts for the same entity require separate registrations and agreements.
        </p>
        <p style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.6 }}>
          2.4 You must notify us immediately of any unauthorised use of your account by contacting <a href="mailto:Support@sopmaster.tech" style={{ color: "#3B82F6", textDecoration: "none" }}>Support@sopmaster.tech</a>.
        </p>
      </div>

      <div className="card" style={{ padding: "32px", marginBottom: "24px" }}>
        <div className="card-header" style={{ fontSize: "13px", marginBottom: "20px" }}>3. Credits</div>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          3.1 Credits are the platform currency used to generate documents. Each document generation consumes a specified number of credits as displayed in the Platform.
        </p>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          3.2 Credits may be obtained through subscription plans or purchased as credit packs. Credits are non-refundable and non-transferable between accounts.
        </p>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          3.3 Credits do not expire while your account remains in good standing. Upon account closure or termination, unused credits are forfeited.
        </p>
        <p style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.6 }}>
          3.4 Document generation consumes credits at the point of generation. Generated documents remain accessible in your vault regardless of subsequent credit balance.
        </p>
      </div>

      <div className="card" style={{ padding: "32px", marginBottom: "24px" }}>
        <div className="card-header" style={{ fontSize: "13px", marginBottom: "20px" }}>4. Subscriptions</div>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          4.1 Subscription plans provide a recurring allocation of credits and access to Platform features based on the selected tier. Subscription fees are billed monthly in advance.
        </p>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          4.2 Subscriptions automatically renew each billing period unless cancelled before the renewal date. You may cancel your subscription at any time through your account settings.
        </p>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          4.3 Upon cancellation, your subscription remains active until the end of the current billing period. No pro-rata refunds are provided for partial billing periods.
        </p>
        <p style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.6 }}>
          4.4 We reserve the right to change subscription pricing with 30 days{'\u2019'} notice. Price changes will not affect your current billing period.
        </p>
      </div>

      <div className="card" style={{ padding: "32px", marginBottom: "24px" }}>
        <div className="card-header" style={{ fontSize: "13px", marginBottom: "20px" }}>5. Payments</div>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          5.1 All payments are processed securely through Stripe, our third-party payment processor. By providing payment information, you authorise Stripe to charge the applicable fees to your designated payment method.
        </p>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          5.2 All prices are listed in British Pounds Sterling (GBP) and are exclusive of applicable VAT or sales tax unless otherwise stated.
        </p>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7 }}>
          5.3 You are responsible for providing accurate and current payment information. Failed payments may result in suspension of Platform access until the outstanding balance is settled.
        </p>
      </div>

      <div className="card" style={{ padding: "32px", marginBottom: "24px" }}>
        <div className="card-header" style={{ fontSize: "13px", marginBottom: "20px" }}>6. Refunds</div>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          6.1 Subscription fees are non-refundable except as required by applicable consumer protection law.
        </p>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          6.2 Credit pack purchases are non-refundable once the credits have been added to your account.
        </p>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          6.3 If you believe you have been charged in error, contact <a href="mailto:Support@sopmaster.tech" style={{ color: "#3B82F6", textDecoration: "none" }}>Support@sopmaster.tech</a> within 14 days of the charge. We will investigate and, where appropriate, issue a refund.
        </p>
        <p style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.6 }}>
          6.4 We reserve the right to refuse refund requests that fall outside these terms or where the Platform has been used in violation of these Terms.
        </p>
      </div>

      <div className="card" style={{ padding: "32px", marginBottom: "24px" }}>
        <div className="card-header" style={{ fontSize: "13px", marginBottom: "20px" }}>7. Acceptable Use</div>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          7.1 You agree to use the Platform only for lawful purposes and in a manner that does not infringe the rights of others or restrict their use and enjoyment of the Platform.
        </p>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          7.2 You must not:
        </p>
        <div style={{ display: "grid", gap: "8px", marginBottom: "16px", paddingLeft: "20px" }}>
          <div style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.5 }}>
            (a) Use the Platform to generate, store or distribute content that is unlawful, defamatory, harassing or fraudulent.
          </div>
          <div style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.5 }}>
            (b) Attempt to circumvent credit systems, access controls or payment mechanisms.
          </div>
          <div style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.5 }}>
            (c) Reverse engineer, decompile or disassemble any part of the Platform.
          </div>
          <div style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.5 }}>
            (d) Use automated scripts, bots or scrapers to interact with the Platform without our express written permission.
          </div>
          <div style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.5 }}>
            (e) Share account credentials or provide Platform access to unauthorised third parties.
          </div>
        </div>
        <p style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.6 }}>
          7.3 Violation of acceptable use terms may result in immediate account suspension without notice.
        </p>
      </div>

      <div className="card" style={{ padding: "32px", marginBottom: "24px" }}>
        <div className="card-header" style={{ fontSize: "13px", marginBottom: "20px" }}>8. Intellectual Property</div>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          8.1 The SOPMaster platform, including its design, code, brand, logo and underlying technology, is the intellectual property of SOPMaster Limited and is protected by applicable copyright, trademark and other intellectual property laws.
        </p>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          8.2 Documents you create using the Platform are your intellectual property. You retain all rights to the content, structure and substance of documents generated through the Platform.
        </p>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          8.3 You grant SOPMaster a limited, non-exclusive license to store, process and display your documents as necessary to provide the Platform service.
        </p>
        <p style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.6 }}>
          8.4 You may not use the SOPMaster brand, logo or trademarks without our prior written consent.
        </p>
      </div>

      <div className="card" style={{ padding: "32px", marginBottom: "24px" }}>
        <div className="card-header" style={{ fontSize: "13px", marginBottom: "20px" }}>9. Platform Availability</div>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          9.1 We strive to maintain high availability of the Platform but do not guarantee uninterrupted or error-free operation. The Platform may be unavailable for scheduled maintenance, emergency repairs or circumstances beyond our control.
        </p>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          9.2 We will make reasonable efforts to schedule maintenance during off-peak hours and provide advance notice where possible.
        </p>
        <p style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.6 }}>
          9.3 We are not liable for any loss or damage arising from Platform unavailability, downtime or access interruptions.
        </p>
      </div>

      <div className="card" style={{ padding: "32px", marginBottom: "24px" }}>
        <div className="card-header" style={{ fontSize: "13px", marginBottom: "20px" }}>10. Limitation of Liability</div>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          10.1 To the maximum extent permitted by applicable law, SOPMaster Limited, its directors, employees and agents shall not be liable for any indirect, incidental, special, consequential or punitive damages arising out of or relating to your use of the Platform.
        </p>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          10.2 Our total liability for any claim arising from these Terms or your use of the Platform shall not exceed the total fees paid by you in the 12 months preceding the claim.
        </p>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          10.3 Nothing in these Terms limits or excludes liability for death or personal injury caused by negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be excluded under applicable law.
        </p>
        <p style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.6 }}>
          10.4 The Platform is provided {'\u201C'}as is{'\u201D'} without any warranty, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose or non-infringement.
        </p>
      </div>

      <div className="card" style={{ padding: "32px", marginBottom: "24px" }}>
        <div className="card-header" style={{ fontSize: "13px", marginBottom: "20px" }}>11. Account Suspension</div>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          11.1 We reserve the right to suspend or terminate your account immediately if:
        </p>
        <div style={{ display: "grid", gap: "8px", marginBottom: "16px", paddingLeft: "20px" }}>
          <div style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.5 }}>
            (a) You breach these Terms or any applicable law or regulation.
          </div>
          <div style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.5 }}>
            (b) Your payment fails and remains outstanding beyond the grace period.
          </div>
          <div style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.5 }}>
            (c) You engage in activity that threatens the security, integrity or availability of the Platform.
          </div>
          <div style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.5 }}>
            (d) We are required to do so by law or regulatory authority.
          </div>
        </div>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          11.2 Where reasonably practicable, we will provide notice before suspension and an opportunity to remedy the breach.
        </p>
        <p style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.6 }}>
          11.3 Upon termination, your right to access the Platform ceases immediately. We may retain your data as required by law or as needed to enforce these Terms.
        </p>
      </div>

      <div className="card" style={{ padding: "32px", marginBottom: "24px" }}>
        <div className="card-header" style={{ fontSize: "13px", marginBottom: "20px" }}>12. Governing Law</div>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          12.1 These Terms are governed by and construed in accordance with the laws of England and Wales.
        </p>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          12.2 Any disputes arising out of or relating to these Terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.
        </p>
        <p style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.6 }}>
          12.3 If any provision of these Terms is found to be unenforceable or invalid, the remaining provisions shall continue in full force and effect.
        </p>
      </div>

      <div className="card" style={{ padding: "32px" }}>
        <div className="card-header" style={{ fontSize: "13px", marginBottom: "20px" }}>13. Contact</div>
        <p style={{ fontSize: "14px", color: "#CBD5E1", lineHeight: 1.7, marginBottom: "12px" }}>
          For questions, complaints or notices relating to these Terms, please contact us:
        </p>
        <p style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.6 }}>
          Email: <a href="mailto:Support@sopmaster.tech" style={{ color: "#3B82F6", textDecoration: "none" }}>Support@sopmaster.tech</a>
        </p>
      </div>
    </div>
  );
}
