"use client";

import { useState, useEffect, useRef } from "react";
import { useStore } from "@/lib/store";
import { api } from "@/lib/api/client";
import { generateSOPDocument } from "@/lib/sop-generator";
import { generateHash, generateVerificationHash, formatDate, JURISDICTION_REGULATORY, buildSopHtml } from "@/lib/utils";
import type { CompanySize, Jurisdiction, SOP, Industry } from "@/types";
import { useRouter } from "next/navigation";

const SYSTEMS_PRESETS = ["Slack", "HubSpot", "Stripe", "Salesforce", "Notion", "Asana", "ClickUp", "Zendesk", "QuickBooks", "Xero", "Microsoft Teams", "Shopify"];

const GROWTH_STAGES = ["Startup", "Scaling", "Established", "Enterprise"];
const RISK_LEVELS = ["Low", "Medium", "High", "Critical"];
const BUSINESS_MODELS = ["B2B", "B2C", "B2B2C", "D2C", "Marketplace", "SaaS", "Consulting", "Agency", "E-Commerce", "Manufacturing", "Wholesale", "Retail"];

const PHASES = [
  { id: "company", label: "Company Intelligence" },
  { id: "process", label: "Process Intelligence" },
  { id: "workflow", label: "Workflow Mapping" },
  { id: "generate", label: "Generation" },
];

export default function ForgePage() {
  const router = useRouter();
  const session = useStore((s) => s.session);
  const getCompany = useStore((s) => s.getCompany);
  const addSOP = useStore((s) => s.addSOP);
  const deductCredit = useStore((s) => s.deductCredit);
  const companyProfile = useStore((s) => s.companyProfile);
  const company = getCompany();

  const [phase, setPhase] = useState<"company" | "process" | "workflow" | "generate">("company");
  const [step, setStep] = useState<"input" | "loading" | "preview" | "done">("input");

  const [compName, setCompName] = useState("");
  const [industry, setIndustry] = useState<Industry>((companyProfile?.industry as Industry) || "ProfessionalServices");
  const [jurisdiction, setJurisdiction] = useState<string>(company?.jurisdiction || "UK");
  const [headcount, setHeadcount] = useState("");
  const [growthStage, setGrowthStage] = useState("Scaling");
  const [businessModel, setBusinessModel] = useState("B2B");
  const [riskLevel, setRiskLevel] = useState("Medium");
  const [brandTone, setBrandTone] = useState("Professional");
  const [complianceReqs, setComplianceReqs] = useState("");
  const [softwareStack, setSoftwareStack] = useState<string[]>([]);
  const [softwareInput, setSoftwareInput] = useState("");
  const [departments, setDepartments] = useState("");
  const [services, setServices] = useState("");

  const [processName, setProcessName] = useState("");
  const [processPurpose, setProcessPurpose] = useState("");
  const [processGoal, setProcessGoal] = useState("");
  const [processOwner, setProcessOwner] = useState("");
  const [processDept, setProcessDept] = useState("");
  const [processTrigger, setProcessTrigger] = useState("");
  const [processFrequency, setProcessFrequency] = useState("Daily");
  const [processDuration, setProcessDuration] = useState("");
  const [processRisk, setProcessRisk] = useState("Medium");
  const [processKpis, setProcessKpis] = useState("");

  const [workflowSteps, setWorkflowSteps] = useState<string[]>(["Lead", "Discovery", "Proposal", "Contract", "Invoice", "Payment", "Delivery", "Completion"]);
  const [decisionPoint, setDecisionPoint] = useState("");
  const [decisionYes, setDecisionYes] = useState("");
  const [decisionNo, setDecisionNo] = useState("");

  const [title, setTitle] = useState("");
  const [sopType, setSopType] = useState<string>("Operational");
  const [size, setSize] = useState<CompanySize>("1-10");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [document, setDocument] = useState<{ title: string; company: string; jurisdiction: string; industry: string; complexity: string; sopType: string; sections: { heading: string; content: string[] }[] } | null>(null);
  const [savedSop, setSavedSop] = useState<SOP | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (company) { setCompName(company.name); setJurisdiction(company.jurisdiction); }
    if (companyProfile?.industry) setIndustry(companyProfile.industry as Industry);
    if (companyProfile?.companySize) setHeadcount(companyProfile.companySize);
  }, [company, companyProfile]);

  useEffect(() => {
    return () => { if (abortRef.current) abortRef.current.abort(); };
  }, []);

  useEffect(() => {
    if (company && (!company.focus || company.focus !== "sops")) router.push("/");
  }, [company, router]);

  const addSoftware = (s: string) => { if (s.trim() && !softwareStack.includes(s.trim())) setSoftwareStack([...softwareStack, s.trim()]); };
  const removeSoftware = (s: string) => setSoftwareStack(softwareStack.filter(x => x !== s));
  const addWorkflowStep = () => setWorkflowSteps([...workflowSteps, ""]);
  const updateWorkflowStep = (i: number, v: string) => { const s = [...workflowSteps]; s[i] = v; setWorkflowSteps(s); };
  const removeWorkflowStep = (i: number) => setWorkflowSteps(workflowSteps.filter((_, idx) => idx !== i));

  const nextPhase = () => {
    if (phase === "company") {
      if (!compName.trim() || !headcount.trim()) { setError("Company name and employee count required"); return; }
      setError(""); setPhase("process");
    } else if (phase === "process") {
      if (!processName.trim() || !processOwner.trim()) { setError("Process name and owner required"); return; }
      setError(""); setPhase("workflow");
    } else if (phase === "workflow") {
      if (workflowSteps.length === 0 || workflowSteps.some(s => !s.trim())) { setError("At least one valid workflow step required"); return; }
      if (!title.trim()) setTitle(processName);
      setError(""); setPhase("generate"); startGeneration();
    }
  };

  const prevPhase = () => {
    if (phase === "process") setPhase("company");
    else if (phase === "workflow") setPhase("process");
  };

  const startGeneration = async () => {
    if (!session?.isDirector) {
      const c = getCompany();
      if (!c || c.credits < 10) { setError("Insufficient credits. Purchase more in Administration."); return; }
    }

    setStep("loading"); setProgress(0); setLogs([]);
    const msgs = [
      "Phase 1/8 — Building company intelligence profile...",
      "Phase 2/8 — Analysing process intelligence...",
      "Phase 3/8 — Mapping workflow and decision tree...",
      "Phase 4/8 — Generating SOP document with full structure...",
      "Phase 5/8 — Applying quality controls and risk register...",
      "Phase 6/8 — Building operational assets...",
      "Phase 7/8 — Running quality engine verification...",
      "Phase 8/8 — Formatting presentation layer...",
      "Complete",
    ];
    let msgIdx = 0;
    const startedAt = Date.now();

    abortRef.current = new AbortController();
    let sopDoc: any;

    const tick = () => {
      const elapsed = Date.now() - startedAt;
      const pct = Math.min(95, Math.round((elapsed / 30000) * 95));
      setProgress(pct);
      if (msgIdx < msgs.length) { setLogs((l) => [...l, msgs[msgIdx]]); msgIdx++; }
    };
    tick();
    const logInterval = setInterval(tick, 3500);

    try {
      const data = await api.generate.sop({
        title, company: compName, systems: softwareStack.join(", "), headcount,
        jurisdiction, complexity: size, industry, sopType, format: "json",
        growthStage, businessModel, riskLevel, brandTone, complianceReqs,
        departments, services, processName, processPurpose, processGoal,
        processOwner, processDept, processTrigger, processFrequency,
        processDuration, processRisk, processKpis, workflowSteps, decisionPoint,
        decisionYes, decisionNo, creditCost: 10,
      });
      sopDoc = data.document;
    } catch {
      if (abortRef.current?.signal.aborted) { clearInterval(logInterval); return; }
      sopDoc = generateSOPDocument(title, compName, softwareStack.join(", "), headcount, jurisdiction as Jurisdiction, size, industry, sopType);
      await deductCredit(10);
    }

    const remaining = 30000 - (Date.now() - startedAt);
    if (remaining > 0) await new Promise((r) => setTimeout(r, remaining));

    clearInterval(logInterval);
    setProgress(100); setLogs((l) => [...l, "Complete"]);
    const hash = generateHash();
    const vHash = generateVerificationHash();
    const now = new Date();
    const sop: SOP = {
      id: `SOP-${hash}`, title, company: compName, systems: softwareStack.join(", "), headcount,
      jurisdiction: jurisdiction as Jurisdiction, complexity: size, hash, verificationHash: vHash,
      dateCreated: formatDate(now), dateCategorized: formatDate(now), lastModified: formatDate(now),
      version: 1, status: "active", companyId: session?.companyId || "", createdBy: session?.name || "",
      industry, sopType,
    };
    addSOP(sop); setDocument(sopDoc); setSavedSop(sop); setStep("preview");
  };

  const downloadHtml = (doc: { title: string; company: string; jurisdiction: string; industry: string; complexity: string; sopType: string; sections: { heading: string; content: string[] }[] }) => {
    const html = buildSopHtml(
      doc.title, doc.company, doc.jurisdiction, savedSop?.id || "", savedSop?.verificationHash || "",
      doc.industry, doc.complexity, doc.sopType, savedSop?.dateCreated || "", savedSop?.createdBy || "", savedSop?.version || 1,
      doc.sections
    );
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement("a");
    a.href = url;
    a.download = `${doc.title.replace(/[^a-zA-Z0-9]/g, "_")}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!session || !company) return (
    <div style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px", textAlign: "center" }}>
      <p style={{ color: "#64748B", fontSize: "14px" }}>Loading...</p>
    </div>
  );

  return (
    <div style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 24px" }} className="fade-in">

      {/* Header */}
      <div style={{ marginBottom: step === "input" ? "28px" : "24px" }}>
        <h1 style={{ fontSize: "20px", fontWeight: 600, color: "#F1F5F9", marginBottom: "4px" }}>
          SOLO SOP BUILDER v2.0
        </h1>
        <p style={{ fontSize: "13px", color: "#64748B" }}>
          Generate a complete operational document with governance, quality controls, and operational assets. 10 credits per SOP.
        </p>
      </div>

      {/* Phase Stepper */}
      {step === "input" && (
        <div style={{ display: "flex", gap: "8px", marginBottom: "28px", overflowX: "auto" }}>
          {PHASES.map((p, i) => (
            <div key={p.id} style={{
              display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px",
              borderRadius: "8px", fontSize: "12px", fontWeight: 500, whiteSpace: "nowrap",
              background: phase === p.id ? "rgba(59,130,246,0.12)" : "rgba(0,0,0,0.2)",
              border: phase === p.id ? "1px solid rgba(59,130,246,0.3)" : "1px solid #1E293B",
              color: phase === p.id ? "#3B82F6" : "#64748B",
            }}>
              <span style={{
                width: "22px", height: "22px", borderRadius: "50%", display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 600,
                background: phase === p.id ? "#3B82F6" : "#1E293B",
                color: phase === p.id ? "#fff" : "#475569",
              }}>{i + 1}</span>
              {p.label}
            </div>
          ))}
        </div>
      )}

      {/* Phase 1 — Company Intelligence */}
      {phase === "company" && step === "input" && (
        <div>
          <div className="card" style={{ marginBottom: "20px", borderLeft: "3px solid #3B82F6" }}>
            <div className="card-header" style={{ fontSize: "13px" }}>
              Phase 1 — Company Intelligence
            </div>
            <p style={{ fontSize: "12px", color: "#64748B", marginTop: "-8px", marginBottom: "20px" }}>
              Build a complete profile of your organisation. This data powers every phase of the SOP engine.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label>Company Name</label>
                <input type="text" value={compName} onChange={(e) => setCompName(e.target.value)} placeholder="Your company name" />
              </div>
              <div>
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
                  {Object.entries(JURISDICTION_REGULATORY).map(([key, val]) => (
                    <option key={key} value={key}>{val.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>Employees</label>
                <input type="number" value={headcount} onChange={(e) => setHeadcount(e.target.value)} placeholder="Number of employees" />
              </div>
              <div>
                <label>Growth Stage</label>
                <select value={growthStage} onChange={(e) => setGrowthStage(e.target.value)}>
                  {GROWTH_STAGES.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div>
                <label>Business Model</label>
                <select value={businessModel} onChange={(e) => setBusinessModel(e.target.value)}>
                  {BUSINESS_MODELS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label>Risk Level</label>
                <select value={riskLevel} onChange={(e) => setRiskLevel(e.target.value)}>
                  {RISK_LEVELS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label>Brand Tone</label>
                <input type="text" value={brandTone} onChange={(e) => setBrandTone(e.target.value)} placeholder="e.g., Professional, Technical" />
              </div>
            </div>
            <div style={{ marginTop: "16px" }}>
              <label>Compliance Requirements</label>
              <input type="text" value={complianceReqs} onChange={(e) => setComplianceReqs(e.target.value)} placeholder="e.g., ISO 9001, GDPR, FCA" />
            </div>
            <div style={{ marginTop: "16px" }}>
              <label>Products / Services</label>
              <textarea value={services} onChange={(e) => setServices(e.target.value)} placeholder="List your key products and services" rows={2} />
            </div>
            <div style={{ marginTop: "16px" }}>
              <label>Departments</label>
              <input type="text" value={departments} onChange={(e) => setDepartments(e.target.value)} placeholder="e.g., Sales, Operations, Finance, HR" />
            </div>
            <div style={{ marginTop: "16px" }}>
              <label>Software Stack</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "8px" }}>
                {softwareStack.map((s) => (
                  <span key={s} className="tag tag-blue" style={{ cursor: "pointer" }} onClick={() => removeSoftware(s)}>{s} &times;</span>
                ))}
              </div>
              <input type="text" value={softwareInput} onChange={(e) => setSoftwareInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { addSoftware(softwareInput); setSoftwareInput(""); } }}
                placeholder="Type system name and press Enter" />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "8px" }}>
                {SYSTEMS_PRESETS.filter(s => !softwareStack.includes(s)).map((s) => (
                  <button key={s} onClick={() => addSoftware(s)} className="tag" style={{ cursor: "pointer", background: "transparent" }}>+ {s}</button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {error && <p style={{ fontSize: "12px", color: "#EF4444", marginRight: "16px", alignSelf: "center" }}>{error}</p>}
            <button onClick={nextPhase} className="btn btn-primary" style={{ padding: "10px 32px", fontSize: "14px" }}>
              Next — Process Intelligence →
            </button>
          </div>
        </div>
      )}

      {/* Phase 2 — Process Intelligence */}
      {phase === "process" && step === "input" && (
        <div>
          <div className="card" style={{ marginBottom: "20px", borderLeft: "3px solid #22C55E" }}>
            <div className="card-header" style={{ fontSize: "13px" }}>
              Phase 2 — Process Intelligence
            </div>
            <p style={{ fontSize: "12px", color: "#64748B", marginTop: "-8px", marginBottom: "20px" }}>
              Define the process you are documenting. The SOP engine uses this to build accurate, context-aware procedures.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label>Process Name *</label>
                <input type="text" value={processName} onChange={(e) => setProcessName(e.target.value)} placeholder="e.g., Client Onboarding" />
              </div>
              <div>
                <label>Process Owner *</label>
                <input type="text" value={processOwner} onChange={(e) => setProcessOwner(e.target.value)} placeholder="e.g., Operations Manager" />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label>Purpose</label>
                <textarea value={processPurpose} onChange={(e) => setProcessPurpose(e.target.value)} placeholder="Why does this process exist?" rows={2} />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label>Business Goal</label>
                <textarea value={processGoal} onChange={(e) => setProcessGoal(e.target.value)} placeholder="What business outcome does this process drive?" rows={2} />
              </div>
              <div>
                <label>Department</label>
                <input type="text" value={processDept} onChange={(e) => setProcessDept(e.target.value)} placeholder="e.g., Sales" />
              </div>
              <div>
                <label>Trigger</label>
                <input type="text" value={processTrigger} onChange={(e) => setProcessTrigger(e.target.value)} placeholder="What starts this process?" />
              </div>
              <div>
                <label>Frequency</label>
                <select value={processFrequency} onChange={(e) => setProcessFrequency(e.target.value)}>
                  <option value="Hourly">Hourly</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Annually">Annually</option>
                  <option value="Ad-hoc">Ad-hoc</option>
                </select>
              </div>
              <div>
                <label>Estimated Duration</label>
                <input type="text" value={processDuration} onChange={(e) => setProcessDuration(e.target.value)} placeholder="e.g., 30 minutes" />
              </div>
              <div>
                <label>Process Risk</label>
                <select value={processRisk} onChange={(e) => setProcessRisk(e.target.value)}>
                  {RISK_LEVELS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label>KPIs / Success Metrics</label>
                <input type="text" value={processKpis} onChange={(e) => setProcessKpis(e.target.value)} placeholder="e.g., Time to complete, Error rate" />
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {error && <p style={{ fontSize: "12px", color: "#EF4444", alignSelf: "center" }}>{error}</p>}
            <div style={{ display: "flex", gap: "12px", marginLeft: "auto" }}>
              <button onClick={prevPhase} className="btn btn-secondary" style={{ padding: "10px 24px", fontSize: "14px" }}>← Back</button>
              <button onClick={nextPhase} className="btn btn-primary" style={{ padding: "10px 32px", fontSize: "14px" }}>
                Next — Workflow Mapping →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Phase 3 — Workflow Mapping */}
      {phase === "workflow" && step === "input" && (
        <div>
          <div className="card" style={{ marginBottom: "20px", borderLeft: "3px solid #F59E0B" }}>
            <div className="card-header" style={{ fontSize: "13px" }}>
              Phase 3 — Workflow Mapping
            </div>
            <p style={{ fontSize: "12px", color: "#64748B", marginTop: "-8px", marginBottom: "20px" }}>
              Map the process flow step by step. Define the decision points that branch the workflow.
            </p>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px" }}>Process Flow Steps</label>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {workflowSteps.map((step, i) => (
                  <div key={i} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <span style={{ fontSize: "11px", color: "#64748B", minWidth: "24px" }}>{i + 1}.</span>
                    <input type="text" value={step} onChange={(e) => updateWorkflowStep(i, e.target.value)}
                      placeholder={`Step ${i + 1}`} style={{ flex: 1 }} />
                    <button onClick={() => removeWorkflowStep(i)} className="btn-ghost" style={{ fontSize: "14px", padding: "2px 8px", color: "#EF4444" }}>&times;</button>
                  </div>
                ))}
              </div>
              <button onClick={addWorkflowStep} className="btn-ghost" style={{ fontSize: "12px", marginTop: "8px", padding: "4px 12px" }}>
                + Add Step
              </button>
            </div>

            {/* Visual Flow Preview */}
            {workflowSteps.filter(s => s.trim()).length > 1 && (
              <div style={{
                padding: "16px", background: "rgba(0,0,0,0.2)", borderRadius: "8px",
                marginBottom: "20px", fontFamily: "monospace", fontSize: "13px",
              }}>
                <p style={{ color: "#64748B", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "12px" }}>
                  Visual Process Flow Preview
                </p>
                {workflowSteps.filter(s => s.trim()).map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
                    <span style={{
                      width: "28px", height: "28px", borderRadius: "6px", background: "rgba(59,130,246,0.15)",
                      color: "#3B82F6", display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "11px", fontWeight: 600, flexShrink: 0,
                    }}>{i + 1}</span>
                    <span style={{ color: "#94A3B8" }}>{s}</span>
                    {i < workflowSteps.filter(x => x.trim()).length - 1 && (
                      <span style={{ color: "#475569" }}>↓</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Decision Tree */}
            <div style={{ borderTop: "1px solid #1E293B", paddingTop: "16px" }}>
              <label style={{ display: "block", marginBottom: "4px", fontSize: "12px", color: "#94A3B8" }}>
                Decision Point (optional)
              </label>
              <p style={{ fontSize: "11px", color: "#64748B", marginBottom: "12px" }}>
                Define a key decision that branches the workflow.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "11px" }}>Question</label>
                  <input type="text" value={decisionPoint} onChange={(e) => setDecisionPoint(e.target.value)} placeholder="e.g., Payment received?" />
                </div>
                <div>
                  <label style={{ fontSize: "11px", color: "#22C55E" }}>If YES</label>
                  <input type="text" value={decisionYes} onChange={(e) => setDecisionYes(e.target.value)} placeholder="e.g., Create Project" />
                </div>
                <div>
                  <label style={{ fontSize: "11px", color: "#EF4444" }}>If NO</label>
                  <input type="text" value={decisionNo} onChange={(e) => setDecisionNo(e.target.value)} placeholder="e.g., Send Reminder" />
                </div>
              </div>
              {decisionPoint && (
                <div style={{
                  marginTop: "12px", padding: "12px 16px", background: "rgba(0,0,0,0.2)", borderRadius: "8px",
                  fontFamily: "monospace", fontSize: "13px",
                }}>
                  <span style={{ color: "#F1F5F9" }}>{decisionPoint}</span>
                  <div style={{ marginLeft: "24px", marginTop: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <span style={{ color: "#22C55E", fontWeight: 600 }}>YES</span>
                      <span style={{ color: "#94A3B8" }}>→</span>
                      <span style={{ color: "#94A3B8" }}>{decisionYes || "(continue)"}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ color: "#EF4444", fontWeight: 600 }}>NO</span>
                      <span style={{ color: "#94A3B8" }}>→</span>
                      <span style={{ color: "#94A3B8" }}>{decisionNo || "(alternative path)"}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Document Settings Card */}
          <div className="card" style={{ marginBottom: "20px" }}>
            <div className="card-header" style={{ fontSize: "13px" }}>
              Document Settings
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
              <div>
                <label>SOP Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                  placeholder={processName || "SOP Title"} />
              </div>
              <div>
                <label>Type</label>
                <select value={sopType} onChange={(e) => setSopType(e.target.value)}>
                  <option value="Operational">Operational</option>
                  <option value="Compliance/Regulatory">Compliance / Regulatory</option>
                  <option value="Risk">Risk</option>
                  <option value="Audit">Audit</option>
                </select>
              </div>
              <div>
                <label>Complexity</label>
                <select value={size} onChange={(e) => setSize(e.target.value as CompanySize)}>
                  <option value="1-10">Standard (10-13 steps)</option>
                  <option value="10-50">Detailed (14-18 steps)</option>
                  <option value="50+">Comprehensive (18+ steps)</option>
                </select>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "12px", color: "#64748B" }}>
              {session?.isDirector ? "Director override — unlimited" : `${company.credits} credits available · 10 required`}
            </span>
            <div style={{ display: "flex", gap: "12px" }}>
              {error && <p style={{ fontSize: "12px", color: "#EF4444", alignSelf: "center" }}>{error}</p>}
              <button onClick={prevPhase} className="btn btn-secondary" style={{ padding: "10px 24px", fontSize: "14px" }}>← Back</button>
              <button onClick={nextPhase} className="btn btn-primary" style={{ padding: "10px 32px", fontSize: "14px" }}>
                Generate Full SOP
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading / Generation Phase */}
      {step === "loading" && (
        <div className="card" style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center", padding: "48px 32px" }}>
          <div style={{ marginBottom: "16px" }}>
            <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#3B82F6" }}>
              SOLO SOP BUILDER v2.0 — Running 8-Phase Engine
            </span>
          </div>
          <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#F1F5F9", marginBottom: "4px" }}>Generating Operational Infrastructure</h2>
          <p style={{ fontSize: "13px", color: "#64748B", marginBottom: "24px" }}>Phases 1-8 &middot; Estimated ~30 seconds</p>
          <div className="progress-bar" style={{ marginBottom: "12px", height: "8px" }}>
            <div className="progress-fill" style={{ width: `${progress}%`, height: "8px" }} />
          </div>
          <p style={{ fontSize: "12px", color: "#3B82F6", fontWeight: 500, marginBottom: "20px" }}>{Math.round(progress)}%</p>
          <div style={{
            textAlign: "left", padding: "12px 16px", background: "rgba(0,0,0,0.3)", borderRadius: "8px",
            maxHeight: "200px", overflowY: "auto", fontFamily: "monospace", fontSize: "12px",
          }}>
            {logs.map((log, i) => (
              <p key={i} style={{
                color: log === "Complete" ? "#22C55E" : "#94A3B8",
                marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px",
              }}>
                <span style={{ color: "#475569" }}>{String(i + 1).padStart(2, "0")}</span>
                {log}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Preview / Done Phase */}
      {(step === "preview" || step === "done") && document && savedSop && (
        <div className="fade-in">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "8px" }}>
            <div>
              <span style={{ fontSize: "13px", color: "#22C55E", fontWeight: 500 }}>✓ Document generated successfully</span>
              <span style={{ fontSize: "11px", color: "#64748B", marginLeft: "12px" }}>
                All 8 phases complete — Quality Engine verified
              </span>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => downloadHtml(document)} className="btn btn-secondary" style={{ fontSize: "12px" }}>
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
            {/* Preview Meta */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px",
              marginBottom: "24px", padding: "16px", background: "rgba(0,0,0,0.15)", borderRadius: "8px",
            }}>
              <div><div className="stat-label">SOP ID</div><div style={{ fontSize: "13px", color: "#F1F5F9", fontFamily: "monospace", marginTop: "2px" }}>{savedSop.id}</div></div>
              <div><div className="stat-label">Version</div><div style={{ fontSize: "13px", color: "#F1F5F9", marginTop: "2px" }}>1.0</div></div>
              <div><div className="stat-label">Effective Date</div><div style={{ fontSize: "13px", color: "#F1F5F9", marginTop: "2px" }}>{savedSop.dateCreated}</div></div>
              <div><div className="stat-label">Owner</div><div style={{ fontSize: "13px", color: "#F1F5F9", marginTop: "2px" }}>{savedSop.createdBy}</div></div>
              <div><div className="stat-label">Jurisdiction</div><div style={{ fontSize: "13px", color: "#3B82F6", marginTop: "2px" }}>{savedSop.jurisdiction}</div></div>
              <div><div className="stat-label">Hash</div><div style={{ fontSize: "12px", color: "#64748B", fontFamily: "monospace", marginTop: "2px" }}>{savedSop.verificationHash}</div></div>
            </div>

            {/* Sections */}
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
            <div style={{ textAlign: "center", marginTop: "24px" }}>
              <button onClick={() => {
                setPhase("company"); setStep("input"); setTitle(""); setProcessName("");
                setSoftwareStack([]); setHeadcount(""); setDocument(null); setSavedSop(null);
                setWorkflowSteps(["Lead", "Discovery", "Proposal", "Contract", "Invoice", "Payment", "Delivery", "Completion"]);
                setDecisionPoint(""); setDecisionYes(""); setDecisionNo("");
                setLogs([]);
              }} className="btn btn-primary" style={{ padding: "12px 32px", fontSize: "14px" }}>
                Generate New SOP
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
