"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { generateHash, generateVerificationHash, formatDate, buildSopHtml, JURISDICTION_REGULATORY } from "@/lib/utils";
import type { SOP, Industry, Jurisdiction } from "@/types";
import { useRouter } from "next/navigation";

const CHECKLIST_TYPES = [
  { value: "Employee Onboarding", label: "Employee Onboarding" },
  { value: "Daily Opening", label: "Daily Opening Procedure" },
  { value: "Daily Closing", label: "Daily Closing Procedure" },
  { value: "Equipment Inspection", label: "Equipment Inspection" },
  { value: "Compliance Review", label: "Compliance Review" },
  { value: "Health & Safety", label: "Health & Safety Check" },
  { value: "Client Onboarding", label: "Client Onboarding" },
  { value: "Document Review", label: "Document Review" },
];

function generateChecklistContent(type: string, industry: string, jurisdiction: string, company: string) {
  const items: Record<string, string[]> = {
    "Employee Onboarding": ["Verify employment eligibility documentation", "Collect signed employment contract and offer letter", "Register employee on payroll and pension system", "Set up IT accounts, email, and system access", "Assign company equipment", "Schedule induction and compliance training", "Assign line manager and onboarding buddy", "Confirm emergency contact details", "Review employee handbook and company policies", "Complete probationary period documentation", "Register for benefits", "Provide organisational chart and role-specific documentation"],
    "Daily Opening": ["Verify premises security — alarms disarmed, doors unlocked", "Check all safety systems are operational", "Inspect equipment — ensure all systems are powered on", "Verify stock levels and inventory against closing report", "Check cash handling — verify starting float", "Review previous day's incident reports", "Confirm staff attendance and assign daily roles", "Test communication systems", "Review daily schedule and priorities with team", "Check environmental controls", "Log opening confirmation"],
    "Daily Closing": ["Reconcile all transactions and cash positions", "Verify stock levels and record discrepancies", "Secure all equipment and power down non-essential systems", "Arm security systems and verify alarm", "Lock all access points and verify seal integrity", "Complete end-of-day incident report", "Confirm all staff have signed out", "Back up critical data and system logs", "Record closing meter readings", "Submit daily summary to management", "Secure all confidential documents", "Log closing confirmation"],
    "Equipment Inspection": ["Verify equipment is clean and free from damage", "Check all safety guards and protective devices", "Inspect power cables and connections for damage", "Verify calibration status and service date", "Run diagnostic checks and record error codes", "Test emergency stop mechanisms", "Check fluid levels, filters, and consumables", "Verify all warning labels are legible", "Record equipment serial number and location", "Document any defects for follow-up", "Confirm spare parts inventory", "Sign off inspection certificate"],
    "Compliance Review": ["Verify all regulatory licences and permits are current", "Review recent regulatory updates", "Confirm data protection measures are compliant", "Check record-keeping systems for completeness", "Verify employee training records are up to date", "Review incident logs for patterns", "Confirm all required policies are documented", "Verify third-party vendor compliance", "Review insurance certificates", "Check complaint handling records", "Conduct spot audit of operational procedures", "Prepare compliance summary report"],
    "Health & Safety": ["Verify fire extinguishers and safety equipment are in date", "Check emergency exits are unobstructed", "Inspect first aid kits and replenish as needed", "Verify COSHH registers are current", "Check all electrical equipment is PAT tested", "Review accident and near-miss reports", "Confirm mandatory safety signage is in place", "Inspect workstations for ergonomic compliance", "Verify ventilation, lighting, and temperature standards", "Check welfare facilities are clean and stocked", "Review risk assessments for current activities", "Document findings in health and safety log"],
    "Client Onboarding": ["Verify client identity and conduct due diligence", "Collect and verify all required documentation", "Complete risk assessment and vulnerability evaluation", "Confirm client meets eligibility criteria", "Prepare and sign engagement letter", "Set up client record in CRM and all systems", "Assign client relationship manager and team", "Conduct initial consultation and document requirements", "Establish communication protocols and reporting schedule", "Configure billing and payment arrangements", "Provide welcome pack with key contacts", "Log onboarding completion and hand over to delivery team"],
    "Document Review": ["Verify document title, version, and effective date", "Confirm document classification and handling instructions", "Review content for accuracy against current procedures", "Check compliance with applicable regulations", "Verify references and cross-references are current", "Confirm review and approval signatures are documented", "Check formatting consistency and presentation", "Verify document is accessible to authorised personnel", "Update version history and change log", "Archive previous version per retention policy", "Notify all relevant parties of update", "Record review completion in management system"],
  };
  const checklistItems = items[type] || items["Compliance Review"];
  return [
    { heading: "Governance & Scope", content: [`This operational checklist is issued by ${company} and applies to all relevant ${industry} operations under ${jurisdiction} regulatory jurisdiction.`, `Checklist Type: ${type}`, "All items must be verified and signed off by the responsible party before close-out.", "Non-compliant items must be escalated and recorded."] },
    { heading: "Checklist Items", content: checklistItems.map((item, i) => `☐ ${i + 1}. ${item}`) },
    { heading: "Sign-Off & Verification", content: ["☐ All checklist items completed and verified", "☐ Non-compliant items documented and escalated", "☐ Responsible party signature recorded", "☐ Manager review completed", "☐ Checklist filed in document management system", "Date: _______________   Signature: _______________", "This checklist is a controlled operational document."] },
  ];
}

export default function ChecklistPage() {
  const router = useRouter();
  const session = useStore((s) => s.session);
  const getCompany = useStore((s) => s.getCompany);
  const addSOP = useStore((s) => s.addSOP);
  const deductCredit = useStore((s) => s.deductCredit);
  const setCompanyJurisdiction = useStore((s) => s.setJurisdiction);
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

  useEffect(() => { if (company) { setCompName(company.name); setJurisdiction(company.jurisdiction); } if (companyProfile?.industry) setIndustry(companyProfile.industry as Industry); }, [company, companyProfile]);
  useEffect(() => { router.prefetch("/armory"); }, [router]);
  useEffect(() => { if (company && company.subscriptionActive !== "yes" && (!company.focus || company.focus !== "checklists")) router.push("/"); }, [company, router]);
  useEffect(() => { setTitle(`${checklistType} — ${compName || "Your Organisation"}`); }, [checklistType, compName]);

  const startGeneration = async () => {
    setError("");
    if (!compName.trim()) { setError("Company name is required."); return; }
    const canDeduct = await deductCredit();
    if (!canDeduct && !session?.isDirector) { setError("Insufficient credits. Purchase more in Administration."); return; }
    setStep("loading"); setProgress(0); setLogs([]); setLogs((l) => [...l, "Generating checklist..."]);
    await new Promise((r) => setTimeout(r, 15000));
    const hash = generateHash(); const vHash = generateVerificationHash(); const now = new Date();
    const sections = generateChecklistContent(checklistType, industry, jurisdiction, compName);
    setDocument({ sections }); setProgress(100); setLogs((l) => [...l, "Complete"]);
    const sop: SOP = { id: `CHK-${hash}`, title, company: compName, systems: "", headcount: "", jurisdiction: jurisdiction as Jurisdiction, complexity: "1-10", hash, verificationHash: vHash, dateCreated: formatDate(now), dateCategorized: formatDate(now), lastModified: formatDate(now), version: 1, status: "active", companyId: session?.companyId || "", createdBy: session?.name || "", industry, sopType: `Checklist — ${checklistType}` };
    addSOP(sop); setSavedSop(sop); setStep("preview");
  };

  const downloadHtml = () => {
    if (!document || !savedSop) return;
    const html = buildSopHtml(title, compName, jurisdiction, savedSop.id, savedSop.verificationHash, industry, "1-10", `Checklist — ${checklistType}`, savedSop.dateCreated, savedSop.createdBy, savedSop.version, document.sections);
    const blob = new Blob([html], { type: "text/html" }); const url = URL.createObjectURL(blob);
    const a = window.document.createElement("a"); a.href = url; a.download = `${title.replace(/[^a-zA-Z0-9]/g, "_")}.html`; a.click(); URL.revokeObjectURL(url);
  };

  if (!session || !company) return <div className="splash-screen"><div className="splash-card"><div className="splash-logo">S</div><div className="splash-spinner"></div><p className="splash-text">Loading workspace...</p></div></div>;

  return (
    <div style={{ marginLeft: "var(--sidebar-width)", padding: "80px 32px 40px", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <div style={{ marginBottom: "32px" }}>
          <div className="ogi-badge">Checklist Studio</div>
          <h1 style={{ fontSize: "28px", fontWeight: 600, color: "var(--white)", marginBottom: "8px", letterSpacing: "-0.02em" }}>Structured Workflow Designer</h1>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)", maxWidth: "560px", lineHeight: 1.6 }}>Build operational checklists for recurring processes. Each checklist costs 1 credit.</p>
        </div>

        {step === "input" && company.credits <= 0 && !session?.isDirector && (
          <div className="glass" style={{ marginBottom: "24px", padding: "16px 20px", border: "1px solid rgba(239,68,68,0.3)" }}>
            <p style={{ fontSize: "14px", color: "var(--danger)", fontWeight: 500 }}>No credits remaining.</p>
            <p style={{ fontSize: "13px", color: "var(--text-tertiary)", marginTop: "4px" }}>Purchase credits in Administration to continue generating checklists.</p>
          </div>
        )}

        {step === "input" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div className="glass" style={{ padding: "24px" }}>
              <div className="card-header" style={{ marginBottom: "16px" }}>Organisation</div>
              <div style={{ marginBottom: "14px" }}><label>Company</label><input type="text" value={compName} onChange={(e) => setCompName(e.target.value)} placeholder="Company name" /></div>
              <div style={{ marginBottom: "14px" }}><label>Industry</label><select value={industry} onChange={(e) => setIndustry(e.target.value as Industry)}>{["ProfessionalServices","Finance","Healthcare","SaaS","Construction","Accountancy","E-Commerce","Manufacturing","Logistics","Education","Hospitality","RealEstate"].map(i => <option key={i} value={i}>{i.replace(/([A-Z])/g, " $1").trim()}</option>)}</select></div>
              <div><label>Jurisdiction</label><select value={jurisdiction} onChange={(e) => { setJurisdiction(e.target.value); setCompanyJurisdiction(e.target.value); }}>{Object.entries(JURISDICTION_REGULATORY).map(([key, val]) => <option key={key} value={key}>{val.name}</option>)}</select></div>
            </div>
            <div className="glass" style={{ padding: "24px" }}>
              <div className="card-header" style={{ marginBottom: "16px" }}>Checklist Type</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                {CHECKLIST_TYPES.map((ct) => (
                  <button key={ct.value} onClick={() => setChecklistType(ct.value)} style={{ padding: "10px 12px", fontSize: "12px", textAlign: "left", borderRadius: "6px", cursor: "pointer", fontFamily: "inherit", background: checklistType === ct.value ? "var(--accent-subtle)" : "transparent", border: checklistType === ct.value ? "1px solid var(--accent-border)" : "1px solid var(--glass-border)", color: checklistType === ct.value ? "var(--text-primary)" : "var(--text-secondary)", transition: "all 0.1s" }}>
                    {ct.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="glass" style={{ padding: "24px", gridColumn: "1 / -1" }}>
              <div className="card-header" style={{ marginBottom: "16px" }}>Document</div>
              <div style={{ marginBottom: "14px" }}><label>Title</label><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Checklist title" /></div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>{session?.isDirector ? "Director override — unlimited" : `${company.credits} credits available · 1 required`}</span>
                {error && <p style={{ fontSize: "12px", color: "var(--danger)" }}>{error}</p>}
                <button onClick={startGeneration} className="btn btn-primary" style={{ padding: "10px 24px", fontSize: "14px" }}>Generate Checklist</button>
              </div>
            </div>
          </div>
        )}

        {step === "loading" && (
          <div className="glass" style={{ maxWidth: "480px", margin: "0 auto", textAlign: "center", padding: "48px 32px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "4px" }}>Generating Checklist</h2>
            <p style={{ fontSize: "13px", color: "var(--text-tertiary)", marginBottom: "20px" }}>Estimated time: ~12 seconds</p>
            <div className="progress-bar" style={{ marginBottom: "8px" }}><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
            <p style={{ fontSize: "12px", color: "var(--accent)", fontWeight: 500, marginBottom: "16px" }}>{Math.round(progress)}%</p>
            <div style={{ textAlign: "left", padding: "12px 16px", background: "rgba(0,0,0,0.2)", borderRadius: "var(--radius)", maxHeight: "160px", overflowY: "auto" }}>
              {logs.map((log, i) => (<p key={i} style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px", fontFamily: "monospace" }}>{log}</p>))}
            </div>
          </div>
        )}

        {(step === "preview" || step === "done") && document && savedSop && (
          <div className="fade-in">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <span style={{ fontSize: "13px", color: "var(--success)" }}>Checklist generated successfully</span>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={downloadHtml} className="btn btn-secondary" style={{ fontSize: "12px" }}>Download HTML</button>
                <button onClick={() => router.push("/armory")} className="btn btn-secondary" style={{ fontSize: "12px" }}>View in Vault</button>
                <button onClick={() => setStep("done")} className="btn btn-primary" style={{ fontSize: "12px" }}>Confirm & Close</button>
              </div>
            </div>
            <div className="glass" style={{ padding: "32px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "12px", marginBottom: "24px", padding: "16px", background: "rgba(0,0,0,0.15)", borderRadius: "var(--radius)" }}>
                <div><div className="stat-label">Document ID</div><div style={{ fontSize: "13px", color: "var(--text-primary)", fontFamily: "monospace", marginTop: "2px", wordBreak: "break-all" }}>{savedSop.id}</div></div>
                <div><div className="stat-label">Version</div><div style={{ fontSize: "13px", color: "var(--text-primary)", marginTop: "2px" }}>1.0</div></div>
                <div><div className="stat-label">Created</div><div style={{ fontSize: "13px", color: "var(--text-primary)", marginTop: "2px" }}>{savedSop.dateCreated}</div></div>
                <div><div className="stat-label">Owner</div><div style={{ fontSize: "13px", color: "var(--text-primary)", marginTop: "2px" }}>{savedSop.createdBy}</div></div>
                <div><div className="stat-label">Jurisdiction</div><div style={{ fontSize: "13px", color: "var(--accent)", marginTop: "2px" }}>{savedSop.jurisdiction}</div></div>
              </div>
              {document.sections.map((section, i) => (
                <div key={i} style={{ marginBottom: "20px" }}>
                  <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "8px", paddingBottom: "4px", borderBottom: "1px solid var(--glass-border)" }}>{section.heading}</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>{section.content.map((line, j) => (<p key={j} style={{ fontSize: "13px", lineHeight: "1.6", color: "var(--slate-300)", margin: 0 }}>{line}</p>))}</div>
                </div>
              ))}
            </div>
            {step === "done" && (
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <button onClick={() => { setStep("input"); setChecklistType("Compliance Review"); setDocument(null); setSavedSop(null); }} className="btn btn-primary">Generate Another Checklist</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
