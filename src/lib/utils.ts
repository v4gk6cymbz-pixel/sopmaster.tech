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
  const keys = ["sopmaster_token"];
  keys.forEach(key => localStorage.removeItem(key));
}

export function buildSopHtml(title: string, company: string, jurisdiction: string, id: string, verificationHash: string, industry: string, complexity: string, sopType: string, dateCreated: string, createdBy: string, version: number, sections: { heading: string; content: string[] }[]): string {
  function escapeHtml(s: string): string {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  const isStep = (t: string) => /^Step\s+\d+/i.test(t);
  const isCallout = (t: string) => /^(WARNING|CAUTION|NOTE|TIP|IMPORTANT|REMEMBER|BEST PRACTICE):/i.test(t);
  const getCalloutType = (t: string) => {
    const m = t.match(/^(WARNING|CAUTION|NOTE|TIP|IMPORTANT|REMEMBER|BEST PRACTICE):/i);
    return m ? m[1].toUpperCase() : null;
  };
  const calloutColors: Record<string, { bg: string; border: string; label: string }> = {
    WARNING: { bg: "#fef2f2", border: "#ef4444", label: "#dc2626" },
    CAUTION: { bg: "#fff7ed", border: "#f97316", label: "#ea580c" },
    NOTE: { bg: "#eff6ff", border: "#3b82f6", label: "#2563eb" },
    TIP: { bg: "#f0fdf4", border: "#22c55e", label: "#16a34a" },
    IMPORTANT: { bg: "#faf5ff", border: "#a855f7", label: "#9333ea" },
    REMEMBER: { bg: "#fefce8", border: "#eab308", label: "#ca8a04" },
    "BEST PRACTICE": { bg: "#ecfdf5", border: "#14b8a6", label: "#0d9488" },
  };

  const sectionsHtml = sections.map((sec) => {
    const contentHtml = sec.content.map((line) => {
      const t = line.trim();
      if (t.startsWith("---") || t.startsWith("___")) return `<hr />`;
      if (isStep(t)) {
        const parts = t.split(":");
        const stepNum = parts[0];
        const stepText = parts.slice(1).join(":").trim();
        return `<div class="step-box">
          <div class="step-number">${escapeHtml(stepNum)}</div>
          <div class="step-content">${escapeHtml(stepText)}</div>
        </div>`;
      }
      if (isCallout(t)) {
        const type = getCalloutType(t);
        const colors = calloutColors[type || ""] || calloutColors.NOTE;
        const text = t.replace(/^(WARNING|CAUTION|NOTE|TIP|IMPORTANT|REMEMBER|BEST PRACTICE):\s*/i, "");
        return `<div class="callout" style="background:${colors.bg};border-left-color:${colors.border};">
          <div class="callout-label" style="color:${colors.label};">${escapeHtml(type || "NOTE")}</div>
          <div class="callout-text">${escapeHtml(text)}</div>
        </div>`;
      }
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
    line-height: 1.55;
    font-size: 10.5pt;
    max-width: 7.5in;
    margin: 0 auto;
    padding: 0;
  }

  .cover-page {
    text-align: center;
    padding: 60pt 0 40pt;
    page-break-after: always;
  }
  .cover-page .classification-badge {
    display: inline-block;
    font-size: 8pt;
    font-weight: 700;
    color: #fff;
    background: #0f172a;
    padding: 4pt 18pt;
    margin-bottom: 24pt;
    text-transform: uppercase;
    letter-spacing: 3pt;
  }
  .cover-page h1 {
    font-size: 26pt;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 8pt;
    text-transform: uppercase;
    letter-spacing: 1.5pt;
    line-height: 1.2;
  }
  .cover-page .divider {
    width: 80pt;
    height: 3px;
    background: #0f172a;
    margin: 16pt auto;
  }
  .cover-page .meta {
    font-size: 10pt;
    color: #64748b;
    margin: 4pt 0;
  }
  .cover-page .verification {
    margin-top: 36pt;
    padding: 12pt 20pt;
    display: inline-block;
    border: 1px solid #e2e8f0;
    border-radius: 4pt;
    font-size: 8pt;
    color: #94a3b8;
    font-family: 'Courier New', monospace;
    letter-spacing: 0.5pt;
  }

  .meta-table {
    width: 100%;
    border-collapse: collapse;
    margin: 14pt 0 22pt;
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

  .toc {
    page-break-after: always;
    margin-bottom: 20pt;
  }
  .toc h2 {
    font-size: 14pt;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 16pt;
    text-transform: uppercase;
    letter-spacing: 1pt;
    border-bottom: 2px solid #0f172a;
    padding-bottom: 6pt;
  }
  .toc-item {
    display: flex;
    gap: 8pt;
    padding: 5pt 0;
    border-bottom: 1px dotted #e2e8f0;
    font-size: 10.5pt;
    color: #334155;
  }
  .toc-item .num { color: #64748b; min-width: 24pt; }
  .toc-item .dots { flex: 1; border-bottom: 1px dotted #d0d5dd; margin: 0 4pt; }

  .section {
    margin-bottom: 18pt;
    page-break-inside: avoid;
  }
  .section-heading {
    font-size: 12.5pt;
    font-weight: 700;
    color: #fff;
    margin: 0 0 10pt;
    padding: 7pt 12pt;
    background: #0f172a;
    text-transform: uppercase;
    letter-spacing: 1pt;
    border-radius: 3pt;
  }
  .section-body { margin-top: 4pt; }

  .body-card {
    border: 1px solid #e2e8f0;
    border-left: 4px solid #0f172a;
    border-radius: 4pt;
    padding: 8pt 12pt;
    margin: 0 0 8pt;
    background: #ffffff;
    page-break-inside: avoid;
  }
  .body-text {
    font-size: 10.5pt;
    line-height: 1.6;
    margin: 0;
    color: #334155;
  }

  .step-box {
    display: flex;
    gap: 10pt;
    margin: 6pt 0 8pt;
    padding: 8pt 12pt;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-left: 4px solid #0f172a;
    border-radius: 3pt;
    page-break-inside: avoid;
  }
  .step-number {
    font-weight: 700;
    font-size: 9pt;
    color: #0f172a;
    white-space: nowrap;
    text-transform: uppercase;
    letter-spacing: 0.5pt;
    min-width: 65pt;
  }
  .step-content { flex: 1; font-size: 10.5pt; line-height: 1.5; color: #334155; }

  .callout {
    margin: 6pt 0 8pt 12pt;
    padding: 7pt 12pt;
    border-radius: 3pt;
    border-left: 4px solid;
    page-break-inside: avoid;
  }
  .callout-label { font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 1pt; margin-bottom: 2pt; }
  .callout-text { font-size: 10pt; line-height: 1.5; color: #1e293b; }

  .footer {
    font-size: 8pt;
    color: #94a3b8;
    margin-top: 24pt;
    padding-top: 8pt;
    border-top: 1px solid #e2e8f0;
    text-align: center;
  }
  .footer p { margin: 1pt 0; }
  .footer .hash {
    font-family: 'Courier New', monospace;
    font-size: 7.5pt;
    color: #94a3b8;
    letter-spacing: 0.5pt;
  }

  hr { border: none; border-top: 1px solid #e2e8f0; margin: 12pt 0; }

  @media print {
    .section { break-inside: avoid; }
  }
</style>
</head>
<body>

<!-- COVER PAGE -->
<div class="cover-page">
  <div class="classification-badge">${escapeHtml(sopType || "Controlled Document")}</div>
  <h1>${escapeHtml(title)}</h1>
  <div class="divider"></div>
  <p class="meta"><strong>${escapeHtml(company)}</strong></p>
  <p class="meta">${escapeHtml(industry)} &middot; ${escapeHtml(jurisdiction)}</p>
  <p class="meta">Version ${version}.0 &middot; ${escapeHtml(dateCreated)}</p>
  <p class="meta">Prepared by: ${escapeHtml(createdBy)}</p>
  <div class="verification">VERIFICATION HASH: ${escapeHtml(verificationHash)}</div>
</div>

<!-- META TABLE -->
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

<!-- TABLE OF CONTENTS -->
<div class="toc">
  <h2>Table of Contents</h2>
  ${sections.map((sec, i) => `<div class="toc-item"><span class="num">${i + 1}.</span>${escapeHtml(sec.heading)}<span class="dots"></span></div>`).join("\n")}
</div>

<!-- SECTIONS -->
${sectionsHtml}

<!-- FOOTER -->
<div class="footer">
  <p><strong>${escapeHtml(company)}</strong> &mdash; Standard Operating Procedure</p>
  <p>Generated by SOPMaster &mdash; ${new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</p>
  <p class="hash">Verification Hash: ${escapeHtml(verificationHash)} &middot; Unauthorised modification invalidates document</p>
  <p>Confidential &mdash; Not for external distribution without authorisation.</p>
</div>

</body>
</html>`;
}

export const JURISDICTION_REGULATORY: Record<string, { name: string; trigger: string }> = {
  "UK": { name: "United Kingdom", trigger: "FWA 2026 — Day-1 unfair dismissal, parental leave, and sick pay rights. No qualifying waiting period. Mandatory 6-year retention of all annual leave/holiday pay records. Whistleblowing: explicit protection for sexual harassment disclosures. Redundancy: protective awards increased to 180 days (double 2025 rate). Employment Rights Act 1996 / Equality Act 2010 / UK GDPR framework active." },
  "Scotland": { name: "Scotland", trigger: "FWA 2026 extended to Scotland — same Day-1 rights as England/Wales. Scots law modifications apply to employment tribunals. 5-year prescriptive period for professional negligence claims. OSCR regulates charitable accounting. Well-being of Future Generations principles influence public procurement. Retention: 6 years minimum." },
  "Wales": { name: "Wales", trigger: "FWA 2026 applies fully. Welsh Language (Wales) Measure 2011 — bilingual documentation required for public-facing operations. Well-being of Future Generations (Wales) Act 2015 imposes sustainable development duty on public bodies. HSE/local authority enforcement. 6-year record retention baseline." },
  "England": { name: "England", trigger: "FWA 2026 — Day-1 rights active. Consumer Rights Act 2015 protections. Modern Slavery Act 2015 — annual transparency statement required for organisations with £36M+ turnover. 6-year retention (12 years for contracts under seal). Employment tribunal procedure governed by ET Rules 2024." },
  "US-Federal": { name: "United States (Federal)", trigger: "AML Whistleblower Improvement Act (FinCEN) — retaliation protections now live. Federal contractors must certify non-discriminatory DEI practices. FLSA overtime threshold updated 2026. OSHA record-keeping: 300/300A/301 logs retained 5 years. SOX 302/404 certifications for public companies. E-Verify participation expanding." },
  "US-NewYork": { name: "New York", trigger: "NY SHIELD Act — data security program mandatory for all entities with NY resident data. NY DFS Cybersecurity Regulation (23 NYCRR 500) for financial services. Pay transparency: salary ranges required in all job postings. NY Human Rights Law — sexual harassment prevention training yearly. Retention: 6 years employment, 3 years for SHIELD compliance records." },
  "US-California": { name: "California", trigger: "CCPA/CPRA enforcement active — consumer right to delete, opt-out, and know. Cal/OSHA enforcement: Injury and Illness Prevention Program (IIPP) mandatory for all employers. PAGA exposure: private attorneys general can enforce Labor Code violations. FEHA: 4-year retention for employment records. Paid sick leave: 40 hours annually." },
  "US-Texas": { name: "Texas", trigger: "Texas Data Privacy and Security Act (TDPSA) — effective 2025. At-will employment jurisdiction. Texas Labor Code: workers' compensation, wage claims. Texas Commission on Human Rights Act. OSHA state plan in development — federal OSHA enforcement currently. 4-year retention recommended for employment records." },
  "US-Florida": { name: "Florida", trigger: "Florida Digital Bill of Rights (effective July 2024) — consumer privacy rights. Florida Information Protection Act — data breach notification 30 days. Florida Civil Rights Act 1992. At-will employment. Workers' compensation: 5-year retention for employment records. Minimum wage: $13/hr (2026) with annual CPI adjustment." },
  "US-Delaware": { name: "Delaware", trigger: "Delaware General Corporation Law (DGCL) — governing law for majority of US public companies. Delaware Personal Data Privacy Act (effective 2025). Division of Corporations — annual franchise tax and report filing mandatory. Court of Chancery offers expedited business dispute resolution. Retention: 3-6 years corporate records per DGCL." },
  "US-Illinois": { name: "Illinois", trigger: "Illinois Biometric Information Privacy Act (BIPA) — strict liability for biometric data collection. Illinois Personal Information Protection Act. Equal Pay Act: certified equal pay registration required. One Day Rest in Seven Act. Chicago ordinance paid sick leave. Retention: 5 years employment, 3 years biometric consent." },
  "EU-GDPR": { name: "European Union (GDPR)", trigger: "GDPR enforcement — DPO appointment for public bodies/large-scale monitoring. Cross-border data transfers: adequacy decision or SCCs required. ePrivacy Directive: cookie consent, direct marketing rules. DORA (Digital Operational Resilience Act) for financial entities — effective Jan 2025. CSRD reporting for large companies. Retention: Article 5(1)(e) — data minimisation, erasure after purpose fulfilled." },
  "EU-PayTransparency": { name: "EU Pay Transparency", trigger: "Reverse Burden of Proof — employers must prove pay equity. Job postings must include pay ranges. Employees right to see pay averages by gender/role. Member state transposition by June 2026 — immediate remediation required. Pay data reporting mandatory for 250+ employees (phased: 150+ from 2030). CSRD-compliant pay gap disclosure." },
  "Germany": { name: "Germany", trigger: "Bundesdatenschutzgesetz (BDSG) — GDPR implementation. Betriebsverfassungsgesetz — Works Council co-determination rights. Kündigungsschutzgesetz — strict dismissal protection (5+ employees). Hinweisgeberschutzgesetz — whistleblower protection effective 2023. Mindestlohn: €12.82/hr (2026). Retention: 6-10 years under HGB and AO." },
  "France": { name: "France", trigger: "Loi Informatique et Libertés — GDPR implementation. Code du Travail — 35-hour work week, mandatory annual negotiations (NAO). Index de l'Égalité professionnelle — gender pay index 75+ required. Loyers commerciaux — commercial lease protections. Retention: 5 years general, 30 years for real estate." },
  "Netherlands": { name: "Netherlands", trigger: "UAVG (AVG implementation) — GDPR active. Wet arbeidsmarkt in balans (WAB) — dismissal law reforms. Wet minimumloon — €13.68/hr (2026, age 21+). Wet betaald ouderschapsverlof — 9 weeks paid parental leave. Wet transparante en voorspelbare arbeidsvoorwaarden — predictable working conditions. Retention: 7 years tax/HR, 2 years for CVs." },
  "UAE-Dubai": { name: "UAE (Dubai)", trigger: "UAE Federal Decree-Law 45/2021 — Personal Data Protection. Federal Decree-Law 33/2021 — Employment Relations. DIFC Data Protection Law (DIFC entities). Dubai Tax Code txcd_20030000 — 0% VAT reverse charge. Ministry of Human Resources and Emiratisation (MOHRE) compliance. Retention: 5 years employment, 6 years DIFC, 10 years financial." },
  "UAE-AbuDhabi": { name: "UAE (Abu Dhabi)", trigger: "Abu Dhabi Global Market (ADGM) Data Protection Regulations. Abu Dhabi Department of Economic Development (ADDED) licensing and compliance. Ghadan 21 economic stimulus compliance. Emiratisation quotas enforced by MOHRE. Occupational safety: Abu Dhabi OSHMS system. Retention: same UAE federal baseline plus ADGM-specific periods." },
  "SaudiArabia": { name: "Saudi Arabia", trigger: "Personal Data Protection Law (PDPL) — effective 2023, full enforcement 2025. Saudi Labor Law — Royal Decree M/51. Nitaqat Saudization programme — tiered quotas. Zakat, Tax and Customs Authority (ZATCA) compliance. Qiwa platform — employment record-keeping. Retention: 10 years for records under PDPL, 5 years employment contracts." },
  "Qatar": { name: "Qatar", trigger: "Qatar Data Privacy Law (Law No. 13/2016) — personal data protection. Qatar Labour Law (Law No. 14/2004, amended). Worker Support and Insurance Fund (WIF) compliance. Ministry of Labour administrative penalty regime. National Vision 2030 compliance. Retention: 5 years minimum, 10 years for financial records." },
  "Singapore": { name: "Singapore", trigger: "Personal Data Protection Act (PDPA) — enforcement active. Employment Act (Cap. 91) — statutory protections and minimum standards. Tripartite Guidelines on Fair Employment Practices. Workplace Safety and Health Act (WSHA). CPF contributions mandatory. Retention: 5 years for employment records under PDPA, 7 years under Companies Act." },
  "HongKong": { name: "Hong Kong", trigger: "Personal Data (Privacy) Ordinance (PDPO) — 6 data protection principles. Employment Ordinance (Cap. 57) — statutory protections. Mandatory Provident Fund (MPF) — employer contributions. Competition Ordinance — anti-competitive conduct prohibited. Retention: 7 years under Inland Revenue Ordinance, 6 years for employment records." },
  "Australia": { name: "Australia", trigger: "PPL: 26 weeks at minimum wage. Payday Super effective 1 July 2026 — super must be paid on same day as wages. 500+ staff: annual gender equality targets. Fair Work Act 2009 — National Employment Standards. Modern awards apply per industry. Privacy Act 1988 — APPs binding. Retention: 7 years under Fair Work Act (employee records), 7 years Corporations Act (company records)." },
  "Canada": { name: "Canada", trigger: "PIPEDA — privacy framework (provincial equivalents in QC, AB, BC). Canada Labour Code — federally regulated workplaces. Pay equity: proactive posting for 10+ employees (federal). Employment equity: 100+ employees must file annual report. Retention: 6 years minimum under federal legislation. Provincial variations apply." },
  "Canada-Ontario": { name: "Canada (Ontario)", trigger: "Employment Standards Act ESA — 3-year record retention. Pay transparency: salary range in all public job postings. No Canadian experience requirement — prohibited. AI in screening must be disclosed. AODA compliance mandatory (accessibility standards). Ontario Human Rights Code enforcement. OHSA: Joint Health and Safety Committee required at 20+ employees." },
  "Canada-BritishColumbia": { name: "Canada (British Columbia)", trigger: "BC PIPA — PIPEDA substantially similar (private sector). Employment Standards Act — minimum wage $17.85/hr (2026). Workers Compensation Act administered by WorkSafeBC. Pay transparency: mandatory salary ranges on job postings (effective 2024). Human Rights Code. Retention: 6 years employment records, 4 years payroll under PIPA." },
  "Canada-Quebec": { name: "Canada (Quebec)", trigger: "Law 25 (formerly Bill 64) — Quebec's comprehensive privacy overhaul. Privacy officer appointment mandatory. Data mapping, PIA, and breach reporting active. Act respecting labour standards — CNESST enforcement. Retention: 7 years under Civil Code of Quebec, 6 years employment records. French language requirements under Charter of the French Language (Law 96)." },
  "Switzerland": { name: "Switzerland", trigger: "nFADP (revised Federal Act on Data Protection) — effective Sept 2023. Swiss Code of Obligations — employment, corporate. Swiss Labour Law (ArG) — 50-hour week max, 14-hour rest period. Prevention of Money Laundering Act. Ombudsman for Equal Pay. Retention: 10 years for business records (OR 958f), 5 years for employment records." },
  "Japan": { name: "Japan", trigger: "Act on Protection of Personal Information (APPI) — amendments effective 2023. Labour Standards Act (Law No. 49 of 1947) — working hours, overtime, annual leave. Industrial Safety and Health Act — safety management. Whistleblower Protection Act (amended 2022). Retention: 5 years under Labour Standards Act (wage records), 3 years for safety and health records." },
  "Dubai-Global": { name: "Dubai Global", trigger: "Dubai Global Tax Code: txcd_20030000 — 0% VAT Reverse Charge. International business hub compliance framework. DIFC common law framework for contracting. Free zone business activity compliance. Retention: 6 years DIFC, 5 years UAE federal." },
};
