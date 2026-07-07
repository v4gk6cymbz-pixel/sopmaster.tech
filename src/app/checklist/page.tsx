"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { generateHash, generateVerificationHash, formatDate, buildSopHtml } from "@/lib/utils";
import type { SOP, Industry, Jurisdiction } from "@/types";
import { useRouter } from "next/navigation";

const CHECKLIST_TYPES = [
  { value: "Employee Onboarding", label: "Employee Onboarding", icon: "01" },
  { value: "Daily Opening", label: "Daily Opening Procedure", icon: "02" },
  { value: "Daily Closing", label: "Daily Closing Procedure", icon: "03" },
  { value: "Equipment Inspection", label: "Equipment Inspection", icon: "04" },
  { value: "Compliance Review", label: "Compliance Review", icon: "05" },
  { value: "Health & Safety", label: "Health & Safety Check", icon: "06" },
  { value: "Client Onboarding", label: "Client Onboarding", icon: "07" },
  { value: "Document Review", label: "Document Review", icon: "08" },
];

function generateChecklistContent(type: string, industry: string, jurisdiction: string, company: string): { heading: string; content: string[] }[] {
  const sections: { heading: string; content: string[] }[] = [];

  sections.push({
    heading: "Governance & Scope",
    content: [
      `This operational checklist is issued by ${company} and applies to all relevant ${industry} operations under ${jurisdiction} regulatory jurisdiction.`,
      `Checklist Type: ${type}`,
      "All items must be verified and signed off by the responsible party before close-out.",
      "Non-compliant items must be escalated and recorded.",
    ],
  });

  const checklistItems: Record<string, string[]> = {
    "Employee Onboarding": [
      "Verify employment eligibility documentation (right to work, visas)",
      "Collect signed employment contract and offer letter",
      "Register employee on payroll and pension system",
      "Set up IT accounts, email, and system access",
      "Assign company equipment (laptop, phone, access cards)",
      "Schedule induction and compliance training",
      "Assign line manager and onboarding buddy",
      "Confirm emergency contact details and personal information",
      "Review employee handbook and company policies",
      "Complete probationary period documentation",
      "Register for benefits (health insurance, pension scheme)",
      "Provide organisational chart and role-specific documentation",
    ],
    "Daily Opening": [
      "Verify premises security — alarms disarmed, doors unlocked, no signs of breach",
      "Check all safety systems are operational (fire alarms, emergency exits)",
      "Inspect equipment — ensure all systems are powered on and functional",
      "Verify stock levels and inventory against closing report",
      "Check cash handling — verify starting float and secure storage",
      "Review previous day's incident reports and follow up on outstanding items",
      "Confirm staff attendance and assign daily roles",
      "Test communication systems (phones, radios, intercom)",
      "Review daily schedule and priorities with team",
      "Ensure compliance documentation is accessible and up to date",
      "Check environmental controls (temperature, lighting, hygiene)",
      "Log opening confirmation in daily record",
    ],
    "Daily Closing": [
      "Reconcile all transactions and cash positions against system records",
      "Verify stock levels and record discrepancies",
      "Secure all equipment and power down non-essential systems",
      "Arm security systems and verify alarm is functional",
      "Lock all access points and verify seal integrity",
      "Complete end-of-day incident report",
      "Confirm all staff have signed out and premises is clear",
      "Back up critical data and system logs",
      "Record closing meter readings and environmental checks",
      "Submit daily summary to management",
      "Secure all confidential documents and sensitive materials",
      "Log closing confirmation with timestamp",
    ],
    "Equipment Inspection": [
      "Verify equipment is clean and free from damage or wear",
      "Check all safety guards and protective devices are in place and functional",
      "Inspect power cables and connections for damage or fraying",
      "Verify calibration status and service date is current",
      "Run diagnostic checks and record all error codes",
      "Test emergency stop mechanisms and safety cut-outs",
      "Check fluid levels, filters, and consumables where applicable",
      "Verify all warning labels and signage are legible and in place",
      "Record equipment serial number, model, and location",
      "Document any defects or abnormalities for follow-up",
      "Confirm spare parts inventory and reorder if needed",
      "Sign off inspection certificate and log in maintenance system",
    ],
    "Compliance Review": [
      "Verify all regulatory licences and permits are current and displayed",
      "Review recent regulatory updates applicable to industry and jurisdiction",
      "Confirm data protection measures are in compliance with applicable regulations",
      "Check record-keeping systems for completeness and retention compliance",
      "Verify employee training records are up to date and documented",
      "Review incident logs for patterns and recurring issues",
      "Confirm all required policies are documented and accessible",
      "Verify third-party vendor compliance documentation is current",
      "Review insurance certificates and coverage adequacy",
      "Check complaint handling records and resolution timeliness",
      "Conduct spot audit of operational procedures against documented SOPs",
      "Prepare compliance summary report for management review",
    ],
    "Health & Safety": [
      "Verify fire extinguishers and safety equipment are in date and accessible",
      "Check emergency exits are unobstructed and clearly marked",
      "Inspect first aid kits and replenish as needed",
      "Verify COSHH registers and safety data sheets are current",
      "Check all electrical equipment is PAT tested and labelled",
      "Review accident and near-miss reports for the reporting period",
      "Confirm mandatory safety signage is in place and legible",
      "Inspect workstations for ergonomic compliance and safe setup",
      "Verify ventilation, lighting, and temperature meet workplace standards",
      "Check welfare facilities are clean and adequately stocked",
      "Review risk assessments for current activities and update as needed",
      "Document findings and action items in health and safety log",
    ],
    "Client Onboarding": [
      "Verify client identity and conduct due diligence checks",
      "Collect and verify all required documentation (company registration, IDs)",
      "Complete risk assessment and vulnerability evaluation",
      "Confirm client meets eligibility criteria and fits service scope",
      "Prepare and sign engagement letter or service agreement",
      "Set up client record in CRM and all operational systems",
      "Assign client relationship manager and service team",
      "Conduct initial consultation and document client requirements",
      "Establish communication protocols and reporting schedule",
      "Configure billing and payment arrangements",
      "Provide welcome pack with key contacts and service overview",
      "Log onboarding completion and hand over to service delivery team",
    ],
    "Document Review": [
      "Verify document title, version number, and effective date are correct",
      "Confirm document classification and handling instructions are stated",
      "Review content for accuracy against current operational procedures",
      "Check compliance with applicable regulations and jurisdiction requirements",
      "Verify references, cross-references, and linked documents are current",
      "Confirm review and approval signatures are documented",
      "Check formatting, consistency, and professional presentation",
      "Verify document is accessible to authorised personnel only",
      "Update version history and change log",
      "Archive previous version in accordance with retention policy",
      "Notify all relevant parties of document update and changes",
      "Record review completion in document management system",
    ],
  };

  const items = checklistItems[type] || checklistItems["Compliance Review"];
  sections.push({
    heading: "Checklist Items",
    content: items.map((item, i) => `☐ ${i + 1}. ${item}`),
  });

  sections.push({
    heading: "Sign-Off & Verification",
    content: [
      "☐ All checklist items completed and verified",
      "☐ Non-compliant items documented and escalated",
      "☐ Responsible party signature recorded",
      "☐ Manager review completed",
      "☐ Checklist filed in document management system",
      `Date: _______________   Signature: _______________`,
      "This checklist is a controlled operational document. Unauthorised modification invalidates its verification status.",
    ],
  });

  return sections;
}

export default function ChecklistPage() {
  const router = useRouter();
  const session = useStore((s) => s.session);
  const getCompany = useStore((s) => s.getCompany);
  const addSOP = useStore((s) => s.addSOP);
  const deductCredit = useStore((s) => s.deductCredit);
  const companyProfile = useStore((s) => s.companyProfile);
  const company = getCompany();

  const [step, setStep] = useState<"input" | "loading" | "preview" | "done">("input");
  const [checklistType, setChecklistType] = useState("Compliance Review");
  const [compName, setCompName] = useState("");
  const [industry, setIndustry] = useState<Industry>((companyProfile?.industry as Industry) || "ProfessionalServices");
  const [jurisdiction, setJurisdiction] = useState<string>(company?.jurisdiction || "UK");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [document, setDocument] = useState<{ sections: { heading: string; content: string[] }[] } | null>(null);
  const [savedSop, setSavedSop] = useState<SOP | null>(null);

  useEffect(() => {
    if (company) { setCompName(company.name); setJurisdiction(company.jurisdiction); }
    if (companyProfile?.industry) setIndustry(companyProfile.industry as Industry);
  }, [company, companyProfile]);

  useEffect(() => {
    router.prefetch("/armory");
  }, [router]);

  useEffect(() => {
    if (company && (!company.focus || company.focus !== "checklists")) router.push("/");
  }, [company, router]);

  useEffect(() => {
    setTitle(`${checklistType} — ${compName || "Your Organisation"}`);
  }, [checklistType, compName]);

  const startGeneration = async () => {
    setError("");
    if (!compName.trim()) {
      setError("Company name is required.");
      return;
    }
    const canDeduct = await deductCredit();
    if (!canDeduct && !session?.isDirector) {
      setError("Insufficient credits. Purchase more in Administration.");
      return;
    }

    setStep("loading"); setProgress(0); setLogs([]);
    setLogs((l) => [...l, "Generating checklist..."]);

    const hash = generateHash();
    const vHash = generateVerificationHash();
    const now = new Date();

    const sections = generateChecklistContent(checklistType, industry, jurisdiction, compName);
    setDocument({ sections });
    setProgress(100); setLogs((l) => [...l, "Complete"]);

    const sop: SOP = {
      id: `CHK-${hash}`, title, company: compName, systems: "", headcount: "",
      jurisdiction: jurisdiction as Jurisdiction, complexity: "1-10", hash, verificationHash: vHash,
      dateCreated: formatDate(now), dateCategorized: formatDate(now), lastModified: formatDate(now),
      version: 1, status: "active", companyId: session?.companyId || "", createdBy: session?.name || "",
      industry, sopType: `Checklist — ${checklistType}`,
    };
    addSOP(sop); setSavedSop(sop); setStep("preview");
  };

  const downloadHtml = () => {
    if (!document || !savedSop) return;
    const html = buildSopHtml(
      title, compName, jurisdiction, savedSop.id, savedSop.verificationHash,
      industry, "1-10", `Checklist — ${checklistType}`, savedSop.dateCreated, savedSop.createdBy, savedSop.version,
      document.sections
    );
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement("a");
    a.href = url; a.download = `${title.replace(/[^a-zA-Z0-9]/g, "_")}.html`; a.click();
    URL.revokeObjectURL(url);
  };

  if (!session || !company) return (
    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "32px 24px", textAlign: "center" }}>
      <p style={{ color: "#64748B", fontSize: "14px" }}>Loading...</p>
    </div>
  );

  return (
    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "48px 24px" }} className="fade-in">
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 600, color: "#F8FAFC", marginBottom: "6px", letterSpacing: "-0.02em" }}>
          Checklist Builder
        </h1>
        <p style={{ fontSize: "15px", color: "#94A3B8" }}>
          Generate operational checklists for recurring processes. Each checklist costs 1 credit.
        </p>
      </div>

      {step === "input" && company.credits <= 0 && !session?.isDirector && (
        <div className="card" style={{ marginBottom: "20px", padding: "16px 20px", borderColor: "#EF4444" }}>
          <p style={{ fontSize: "13px", color: "#EF4444", fontWeight: 500 }}>No credits remaining.</p>
          <p style={{ fontSize: "12px", color: "#94A3B8", marginTop: "4px" }}>Purchase credits in Administration to continue generating checklists.</p>
        </div>
      )}

      {step === "input" && (
        <div style={{ position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div className="card">
              <div className="card-header">Organisation</div>
              <div style={{ marginBottom: "16px" }}>
                <label>Company</label>
                <input type="text" value={compName} onChange={(e) => setCompName(e.target.value)} placeholder="Company name" />
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label>Industry</label>
                <select value={industry} onChange={(e) => setIndustry(e.target.value as Industry)}>
                  <option value="ProfessionalServices">Professional Services</option>
                  <option value="Finance">Finance & Banking</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="SaaS">SaaS / Technology</option>
                  <option value="Construction">Construction</option>
                  <option value="Accountancy">Accountancy</option>
                  <option value="E-Commerce">E-Commerce</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Logistics">Logistics</option>
                  <option value="Education">Education</option>
                  <option value="Hospitality">Hospitality</option>
                  <option value="RealEstate">Real Estate</option>
                </select>
              </div>
              <div>
                <label>Jurisdiction</label>
                <select value={jurisdiction} onChange={(e) => setJurisdiction(e.target.value)}>
                  <option value="UK">United Kingdom</option>
                  <option value="Scotland">Scotland</option>
                  <option value="Wales">Wales</option>
                  <option value="England">England</option>
                  <option value="US-Federal">United States (Federal)</option>
                  <option value="US-NewYork">New York</option>
                  <option value="US-California">California</option>
                  <option value="EU-GDPR">European Union (GDPR)</option>
                  <option value="EU-PayTransparency">EU Pay Transparency</option>
                  <option value="Canada">Canada</option>
                  <option value="Canada-Ontario">Canada (Ontario)</option>
                  <option value="Australia">Australia</option>
                  <option value="Dubai-Global">Dubai Global</option>
                </select>
              </div>
            </div>

            <div className="card">
              <div className="card-header">Checklist Type</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                {CHECKLIST_TYPES.map((ct) => (
                  <button
                    key={ct.value}
                    onClick={() => setChecklistType(ct.value)}
                    style={{
                      padding: "12px 14px",
                      fontSize: "13px",
                      textAlign: "left",
                      borderRadius: "8px",
                      cursor: "pointer",
                      background: checklistType === ct.value ? "rgba(59,130,246,0.1)" : "rgba(255,255,255,0.02)",
                      border: checklistType === ct.value ? "1px solid rgba(59,130,246,0.3)" : "1px solid rgba(255,255,255,0.06)",
                      color: checklistType === ct.value ? "#F8FAFC" : "#94A3B8",
                      fontFamily: "inherit",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <span style={{ fontSize: "11px", color: "#3B82F6", fontFamily: "monospace", opacity: 0.5, marginRight: "8px" }}>{ct.icon}</span>
                    {ct.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="card" style={{ gridColumn: "1 / -1" }}>
              <div className="card-header">Document</div>
              <div style={{ marginBottom: "16px" }}>
                <label>Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Checklist title" />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "12px", color: "#64748B" }}>
                  {session?.isDirector ? "Director override — unlimited" : `${company.credits} credits available · 1 required`}
                </span>
                {error && <p style={{ fontSize: "12px", color: "#EF4444" }}>{error}</p>}
                <button onClick={startGeneration} className="btn btn-primary" style={{ padding: "10px 24px", fontSize: "14px" }}>
                  Generate Checklist
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === "loading" && (
        <div className="card" style={{ maxWidth: "480px", margin: "0 auto", textAlign: "center", padding: "48px 36px" }}>
          <h2 style={{ fontSize: "17px", fontWeight: 600, color: "#F8FAFC", marginBottom: "4px" }}>Generating Checklist</h2>
          <p style={{ fontSize: "14px", color: "#94A3B8", marginBottom: "24px" }}>Processing documentation</p>
          <div className="progress-bar" style={{ marginBottom: "8px", height: "6px" }}>
            <div className="progress-fill" style={{ width: `${progress}%`, height: "6px" }} />
          </div>
          <p style={{ fontSize: "12px", color: "#3B82F6", fontWeight: 500, marginBottom: "16px" }}>{Math.round(progress)}%</p>
          <div style={{ textAlign: "left", padding: "14px 18px", background: "rgba(0,0,0,0.25)", borderRadius: "8px", maxHeight: "160px", overflowY: "auto" }}>
            {logs.map((log, i) => (
              <p key={i} style={{ fontSize: "12px", color: "#94A3B8", marginBottom: "4px", fontFamily: "monospace" }}>
                {log}
              </p>
            ))}
          </div>
        </div>
      )}

      {(step === "preview" || step === "done") && document && savedSop && (
        <div className="fade-in">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <span style={{ fontSize: "13px", color: "#22C55E" }}>Checklist generated successfully</span>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={downloadHtml} className="btn btn-secondary" style={{ fontSize: "12px" }}>
                Download HTML
              </button>
              <button onClick={() => router.push("/armory")} className="btn btn-secondary" style={{ fontSize: "12px" }}>
                View in Vault
              </button>
              <button onClick={() => setStep("done")} className="btn btn-primary" style={{ fontSize: "12px" }}>
                Confirm & Close
              </button>
            </div>
          </div>

          <div className="card" style={{ padding: "32px" }}>
            <div className="meta-grid" style={{ marginBottom: "24px", padding: "20px", background: "rgba(255,255,255,0.03)", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.04)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "12px" }}>
              <div><div className="stat-label">Document ID</div><div style={{ fontSize: "13px", color: "#F8FAFC", fontFamily: "monospace", marginTop: "2px", wordBreak: "break-all" }}>{savedSop.id}</div></div>
              <div><div className="stat-label">Version</div><div style={{ fontSize: "13px", color: "#F8FAFC", marginTop: "2px" }}>1.0</div></div>
              <div><div className="stat-label">Effective Date</div><div style={{ fontSize: "13px", color: "#F8FAFC", marginTop: "2px" }}>{savedSop.dateCreated}</div></div>
              <div><div className="stat-label">Owner</div><div style={{ fontSize: "13px", color: "#F8FAFC", marginTop: "2px" }}>{savedSop.createdBy}</div></div>
              <div><div className="stat-label">Jurisdiction</div><div style={{ fontSize: "13px", color: "#3B82F6", marginTop: "2px" }}>{savedSop.jurisdiction}</div></div>
            </div>

            {document.sections.map((section, i) => (
              <div key={i} style={{ marginBottom: "20px" }}>
                <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#F1F5F9", marginBottom: "8px", paddingBottom: "4px", borderBottom: "1px solid #334155" }}>
                  {section.heading}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {section.content.map((line, j) => (
                    <p key={j} style={{ fontSize: "13px", lineHeight: "1.6", color: "#CBD5E1", margin: 0 }}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {step === "done" && (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <button onClick={() => { setStep("input"); setChecklistType("Compliance Review"); setDocument(null); setSavedSop(null); }} className="btn btn-primary">
                Generate Another Checklist
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
