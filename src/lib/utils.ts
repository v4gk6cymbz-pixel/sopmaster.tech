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
    const res = await fetch("/api/stripe/create-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
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
      const trimmed = line.trim();
      const isStep = /^Step \d+/.test(trimmed);
      const isWhy = /^WHY:/.test(trimmed);
      const isHow = /^HOW TO VERIFY:/.test(trimmed);
      const isExample = /^(REAL.WORLD EXAMPLE|EXAMPLE):/i.test(trimmed);
      const isBullet = trimmed.startsWith("\u2022") || trimmed.startsWith("\u25CB") || trimmed.startsWith("\u2610") || trimmed.startsWith("* ");
      const isCheckbox = trimmed.startsWith("\u2610");
      const isTableHeader = /^Table \d+/.test(trimmed);

      if (isStep) {
        return `<p class="step-heading">${escapeHtml(trimmed)}</p>`;
      }
      if (isWhy) {
        return `<p class="step-why">${escapeHtml(trimmed)}</p>`;
      }
      if (isHow) {
        return `<p class="step-how">${escapeHtml(trimmed)}</p>`;
      }
      if (isExample) {
        return `<p class="step-example">${escapeHtml(trimmed)}</p>`;
      }
      if (isTableHeader) {
        return `<p class="table-header-label">${escapeHtml(trimmed)}</p>`;
      }
      if (isCheckbox) {
        return `<p class="checklist-item">${escapeHtml(trimmed)}</p>`;
      }
      if (isBullet) {
        return `<p class="bullet-item">${escapeHtml(trimmed)}</p>`;
      }
      if (trimmed.startsWith("---") || trimmed.startsWith("___")) {
        return `<hr />`;
      }
      return `<p class="body-text">${escapeHtml(trimmed)}</p>`;
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
  @page { margin: 1in 0.75in; }
  body {
    font-family: 'Calibri', 'Arial', sans-serif;
    color: #222;
    line-height: 1.45;
    font-size: 11pt;
    max-width: 7.2in;
    margin: 0 auto;
    padding: 0;
  }
  .doc-header {
    text-align: center;
    margin-bottom: 24pt;
    padding-bottom: 12pt;
    border-bottom: 3px solid #1a1a2e;
  }
  .doc-header .classification {
    display: inline-block;
    font-size: 9pt;
    font-weight: 700;
    color: #fff;
    background: #1a1a2e;
    padding: 3pt 12pt;
    margin-bottom: 8pt;
    text-transform: uppercase;
    letter-spacing: 2pt;
  }
  .doc-header h1 {
    font-size: 22pt;
    font-weight: 700;
    color: #1a1a2e;
    margin: 0 0 4pt 0;
    text-transform: uppercase;
    letter-spacing: 1pt;
  }
  .doc-header .subtitle {
    font-size: 11pt;
    color: #555;
    margin: 4pt 0;
  }
  .meta-table {
    width: 100%;
    border-collapse: collapse;
    margin: 12pt 0 18pt 0;
  }
  .meta-table td {
    padding: 5pt 8pt;
    font-size: 10pt;
    border: 1px solid #ccc;
    vertical-align: top;
  }
  .meta-table td.label-cell {
    font-weight: 600;
    color: #1a1a2e;
    width: 22%;
    background: #f5f5f5;
  }
  .meta-table td.value-cell {
    color: #333;
  }
  .meta-table .hash-cell {
    font-family: 'Courier New', monospace;
    font-size: 9pt;
    letter-spacing: 0.5pt;
  }
  .section {
    margin-bottom: 16pt;
  }
  .section-heading {
    font-size: 13pt;
    font-weight: 700;
    color: #1a1a2e;
    margin: 0 0 6pt 0;
    padding-bottom: 4pt;
    border-bottom: 2px solid #1a1a2e;
  }
  .section-body {
    margin-top: 6pt;
  }
  .body-text {
    font-size: 11pt;
    line-height: 1.5;
    margin: 2pt 0 6pt 0;
    color: #333;
  }
  .step-heading {
    font-size: 11pt;
    line-height: 1.5;
    margin: 8pt 0 2pt 0;
    color: #1a1a2e;
    font-weight: 600;
  }
  .step-why {
    font-size: 10pt;
    line-height: 1.4;
    margin: 0 0 1pt 18pt;
    color: #555;
    font-style: italic;
  }
  .step-how {
    font-size: 10pt;
    line-height: 1.4;
    margin: 0 0 4pt 18pt;
    color: #666;
  }
  .step-example {
    font-size: 10pt;
    line-height: 1.4;
    margin: 0 0 8pt 18pt;
    color: #444;
  }
  .bullet-item {
    font-size: 11pt;
    line-height: 1.45;
    margin: 1pt 0;
    color: #333;
  }
  .checklist-item {
    font-size: 11pt;
    line-height: 1.45;
    margin: 1pt 0 1pt 0;
    color: #333;
  }
  .table-header-label {
    font-size: 11pt;
    font-weight: 600;
    color: #1a1a2e;
    margin: 8pt 0 4pt 0;
    padding: 3pt 0;
    border-bottom: 1px solid #999;
  }
  .sop-table {
    width: 100%;
    border-collapse: collapse;
    margin: 10pt 0 14pt 0;
    table-layout: fixed;
  }
  .sop-table th {
    font-size: 10pt;
    font-weight: 700;
    background: #f0f0f0;
    padding: 5pt 6pt;
    border: 1px solid #bbb;
    text-align: left;
  }
  .sop-table td {
    font-size: 10pt;
    line-height: 1.35;
    padding: 5pt 6pt;
    border: 1px solid #ccc;
    vertical-align: top;
    color: #333;
  }
  hr {
    border: none;
    border-top: 1px solid #ccc;
    margin: 14pt 0;
  }
  .footer {
    font-size: 9pt;
    color: #888;
    margin-top: 24pt;
    padding-top: 8pt;
    border-top: 1px solid #ccc;
    text-align: center;
  }
  .footer p {
    margin: 1pt 0;
  }
</style>
</head>
<body>

<div class="doc-header">
  <div class="classification">Controlled Document</div>
  <h1>${escapeHtml(title)}</h1>
  <p class="subtitle">${escapeHtml(company)} &mdash; ${escapeHtml(industry)} &mdash; ${escapeHtml(jurisdiction)}</p>
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
    <td class="label-cell" style="width:22%">Verification Hash</td>
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
