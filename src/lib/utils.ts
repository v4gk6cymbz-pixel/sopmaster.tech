export function generateId(): string {
  return `sop_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export function generateHash(): string {
  const chars = "ABCDEF0123456789";
  let hash = "";
  for (let i = 0; i < 8; i++) hash += chars.charAt(Math.floor(Math.random() * chars.length));
  return hash;
}

export function generateVerificationHash(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let hash = "";
  for (let i = 0; i < 12; i++) hash += chars.charAt(Math.floor(Math.random() * chars.length));
  return hash;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function getTierLimits(tier: string): { credits: number; documentLimit: number; label: string; price: number } {
  switch (tier) {
    case "solo": return { credits: 300, documentLimit: 300, label: "Solo Professional", price: 400 };
    case "small": return { credits: 2500, documentLimit: 2500, label: "Small Consultancy Plan", price: 2500 };
    case "medium": return { credits: 6000, documentLimit: 6000, label: "Medium Consultancy Plan", price: 5100 };
    case "large": return { credits: 12000, documentLimit: 12000, label: "Large Consultancy Plan", price: 9000 };
    default: return { credits: 10, documentLimit: 10, label: "Starter", price: 0 };
  }
}

export async function redirectToStripe(type: "credits" | "subscription", data: { amount?: number; tier?: string }) {
  try {
    const body: any = { type };
    if (data.tier) body.tier = data.tier;
    if (data.amount) body.amount = data.amount;
    const token = typeof window !== "undefined" ? localStorage.getItem("sopmaster_token") : null;
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch("/api/stripe/create-checkout", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    const json = await res.json();
    if (json.url) {
      window.location.href = json.url;
    }
  } catch (e) {
    console.error("Stripe redirect failed", e);
  }
}

export function getStripeRedirectResult(): { type: "credits" | "subscription"; amount?: number; tier?: string } | null {
  const params = new URLSearchParams(window.location.search);
  const type = params.get("stripe_success") as "credits" | "subscription" | null;
  if (!type) return null;
  const result: any = { type };
  if (params.get("amount")) result.amount = Number(params.get("amount"));
  if (params.get("tier")) result.tier = params.get("tier");
  return result;
}

export function clearStripeRedirectParams() {
  const url = new URL(window.location.href);
  url.searchParams.delete("stripe_success");
  url.searchParams.delete("amount");
  url.searchParams.delete("tier");
  url.searchParams.delete("redirect_status");
  url.searchParams.delete("payment_intent");
  url.searchParams.delete("payment_intent_client_secret");
  window.history.replaceState({}, "", url.toString());
}

export function clearAllData() {
  const keys = ["sop_companies", "sop_session", "sop_vault", "sop_tour", "sop_notifications", "sop_company_profile", "sop_pending_purchase"];
  keys.forEach(key => localStorage.removeItem(key));
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("sop_vault_")) {
      localStorage.removeItem(key);
    }
  }
}

export function buildSopHtml(title: string, company: string, jurisdiction: string, id: string, verificationHash: string, industry: string, complexity: string, sopType: string, dateCreated: string, createdBy: string, version: number, sections: { heading: string; content: string[] }[]): string {
  function escapeHtml(s: string): string {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  const sectionsHtml = sections.map((sec) => {
    const contentHtml = sec.content.map((line) => {
      const t = line.trim();
      if (t.startsWith("---") || t.startsWith("___")) return `<hr />`;
      return `<div class="body-card"><p class="body-text">${escapeHtml(t)}</p></div>`;
    }).join("\n");

    return `<div class="section">
      <h2 class="section-heading">${escapeHtml(sec.heading)}</h2>
      <div class="section-body">${contentHtml}</div>
    </div>`;
  }).join("\n");

  return `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset="utf-8">
<title>${escapeHtml(title)}</title>
<style>
  @page { margin: 0.8in 0.7in; }
  body {
    font-family: 'Calibri', 'Arial', sans-serif;
    color: #1e293b;
    line-height: 1.6;
    font-size: 10.5pt;
    max-width: 7.5in;
    margin: 0 auto;
    padding: 0;
  }

  .doc-header {
    text-align: center;
    margin-bottom: 22pt;
    padding-bottom: 14pt;
    border-bottom: 3px solid #0f172a;
  }
  .doc-header .classification {
    display: inline-block;
    font-size: 7.5pt;
    font-weight: 700;
    color: #fff;
    background: #0f172a;
    padding: 3pt 14pt;
    margin-bottom: 10pt;
    text-transform: uppercase;
    letter-spacing: 2.5pt;
  }
  .doc-header h1 {
    font-size: 20pt;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 6pt 0;
    text-transform: uppercase;
    letter-spacing: 1pt;
  }
  .doc-header .subtitle {
    font-size: 10pt;
    color: #64748b;
    margin: 2pt 0;
  }

  .meta-table {
    width: 100%;
    border-collapse: collapse;
    margin: 10pt 0 20pt 0;
    border: 1px solid #e2e8f0;
  }
  .meta-table td {
    padding: 5pt 10pt;
    font-size: 9pt;
    border: 1px solid #e2e8f0;
    vertical-align: top;
  }
  .meta-table td.label-cell {
    font-weight: 600;
    color: #0f172a;
    width: 18%;
    background: #f8fafc;
    text-transform: uppercase;
    letter-spacing: 0.5pt;
    font-size: 8pt;
  }
  .meta-table td.value-cell { color: #334155; }
  .meta-table .hash-cell {
    font-family: 'Courier New', monospace;
    font-size: 8pt;
    letter-spacing: 0.5pt;
    color: #64748b;
  }

  .section {
    margin-bottom: 18pt;
    page-break-inside: avoid;
  }
  .section-heading {
    font-size: 12pt;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 10pt 0;
    padding: 7pt 12pt;
    background: #0f172a;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 1pt;
  }
  .section-body { margin-top: 4pt; }
  .body-card {
    border: 1px solid #e2e8f0;
    border-left: 4px solid #0f172a;
    border-radius: 4pt;
    padding: 8pt 12pt;
    margin: 0 0 8pt 0;
    background: #ffffff;
    page-break-inside: avoid;
  }
  .body-text {
    font-size: 10.5pt;
    line-height: 1.6;
    margin: 0;
    color: #334155;
  }

  .footer {
    font-size: 8pt;
    color: #94a3b8;
    margin-top: 24pt;
    padding-top: 8pt;
    border-top: 1px solid #e2e8f0;
    text-align: center;
  }
  .footer p { margin: 1pt 0; }

  hr {
    border: none;
    border-top: 1px solid #e2e8f0;
    margin: 12pt 0;
  }

  @media print {
    .section { break-inside: avoid; }
  }
</style>
</head>
<body>

<div class="doc-header">
  <div class="classification">Controlled Document</div>
  <h1>${escapeHtml(title)}</h1>
  <p class="subtitle">${escapeHtml(company)} &middot; ${escapeHtml(industry)} &middot; ${escapeHtml(jurisdiction)}</p>
</div>

<table class="meta-table">
  <tr>
    <td class="label-cell">Document ID</td>
    <td class="value-cell">${escapeHtml(id)}</td>
    <td class="label-cell">Version</td>
    <td class="value-cell">${version}.0</td>
  </tr>
  <tr>
    <td class="label-cell">Classification</td>
    <td class="value-cell">${escapeHtml(sopType || "Operational")}</td>
    <td class="label-cell">Status</td>
    <td class="value-cell">Active</td>
  </tr>
  <tr>
    <td class="label-cell">Effective Date</td>
    <td class="value-cell">${escapeHtml(dateCreated)}</td>
    <td class="label-cell">Owner</td>
    <td class="value-cell">${escapeHtml(createdBy)}</td>
  </tr>
  <tr>
    <td class="label-cell">Jurisdiction</td>
    <td class="value-cell">${escapeHtml(jurisdiction)}</td>
    <td class="label-cell">Complexity</td>
    <td class="value-cell">${escapeHtml(complexity)}</td>
  </tr>
  <tr>
    <td class="label-cell">Verification Hash</td>
    <td class="hash-cell" colspan="3">${escapeHtml(verificationHash)}</td>
  </tr>
</table>

${sectionsHtml}

<div class="footer">
  <p><strong>${escapeHtml(company)}</strong> &mdash; Standard Operating Procedure</p>
  <p>Generated by SOPMaster &mdash; ${new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</p>
  <p>This document is a controlled operational procedure. Unauthorised modification invalidates its verification hash.</p>
  <p>Confidential &mdash; Not for external distribution without authorisation.</p>
</div>

</body>
</html>`;
}

export const JURISDICTION_REGULATORY: Record<string, { name: string; trigger: string }> = {
  "UK": { name: "United Kingdom", trigger: "FWA 2026 Update — Day-1 Right. No waiting period. Mandatory 6-year retention of all annual leave and holiday pay records. Protective awards increased to 180 days. Whistleblowing: Explicit protection for sexual harassment disclosures. Redundancy: Protective awards increased to 180 days (Double the 2025 rate)." },
  "Scotland": { name: "Scotland", trigger: "FWA 2026 Update — Day-1 Right. No waiting period. Mandatory 6-year retention of all annual leave and holiday pay records. Protective awards increased to 180 days. Whistleblowing: Explicit protection for sexual harassment disclosures." },
  "Wales": { name: "Wales", trigger: "FWA 2026 Update — Day-1 Right. No waiting period. Mandatory 6-year retention of all annual leave and holiday pay records." },
  "England": { name: "England", trigger: "FWA 2026 Update — Day-1 Right. No waiting period. Mandatory 6-year retention of all annual leave and holiday pay records." },
  "US-Federal": { name: "United States (Federal)", trigger: "AML Whistleblower Improvement Act (FinCEN) retaliation protections now live. Federal contractors must certify non-discriminatory DEI practices in all agency contracts." },
  "US-NewYork": { name: "New York", trigger: "New York State regulatory framework. Pay transparency and workplace compliance requirements active." },
  "US-California": { name: "California", trigger: "California regulatory framework. CCPA/CPRA compliance requirements active." },
  "US-Texas": { name: "Texas", trigger: "Texas Regulatory Standards. Liability protection framework active. Employment at-will jurisdiction." },
  "US-Florida": { name: "Florida", trigger: "Florida regulatory framework. State-specific employment and business compliance requirements." },
  "US-Delaware": { name: "Delaware", trigger: "Delaware corporate law framework. Business entity compliance and governance standards." },
  "EU-GDPR": { name: "European Union (GDPR)", trigger: "GDPR enforcement active. Data protection, privacy, and cross-border transfer requirements apply." },
  "EU-PayTransparency": { name: "EU Pay Transparency", trigger: "Reverse Burden of Proof — Employers must prove pay equity. Job postings must include pay ranges. Employees have a right to see pay averages of peers. Deadline: June 7, 2026 — Immediate Remediation Required." },
  "Canada": { name: "Canada", trigger: "PPL: 26 weeks total (increased from 24). Standard 4 weeks reserved for each parent. Superannuation: Payday Super effective July 1, 2026 — Super must be paid on same day as wages. Employers with 500+ staff must publish gender equality targets." },
  "Canada-Ontario": { name: "Canada (Ontario)", trigger: "Mandatory pay range disclosure on all job postings. Prohibition on Canadian Experience requirements. Disclosure of AI use in screening. 3-year retention for all public job postings and interview notes." },
  "Australia": { name: "Australia", trigger: "PPL: 26 weeks total (increased from 24). Standard 4 weeks reserved for each parent. Superannuation: Payday Super effective July 1, 2026 — Super must be paid on same day as wages. Employers with 500+ staff must publish and work toward specific gender equality targets." },
  "Dubai-Global": { name: "Dubai Global", trigger: "Dubai Global Tax Code: txcd_20030000. 0% VAT Reverse Charge. International business hub compliance framework." },
};
