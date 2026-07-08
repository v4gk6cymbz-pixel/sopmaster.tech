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
const PHASES = [{ id: "company", label: "Company Intelligence" }, { id: "process", label: "Process Intelligence" }, { id: "workflow", label: "Workflow Mapping" }, { id: "generate", label: "Generation" }];

export default function ForgePage() {
  const router = useRouter();
  const session = useStore((s) => s.session);
  const getCompany = useStore((s) => s.getCompany);
  const addSOP = useStore((s) => s.addSOP);
  const deductCredit = useStore((s) => s.deductCredit);
  const setCompanyJurisdiction = useStore((s) => s.setJurisdiction);
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
  const [showAdvancedCompany, setShowAdvancedCompany] = useState(false);
  const [showAdvancedProcess, setShowAdvancedProcess] = useState(false);
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
  const initializedRef = useRef(false);
  const [size, setSize] = useState<CompanySize>("1-10");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [document, setDocument] = useState<{ title: string; company: string; jurisdiction: string; industry: string; complexity: string; sopType: string; sections: { heading: string; content: string[] }[] } | null>(null);
  const [savedSop, setSavedSop] = useState<SOP | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (initializedRef.current) return;
    if (company) { setCompName(company.name); setJurisdiction(company.jurisdiction); }
    if (companyProfile?.industry) setIndustry(companyProfile.industry as Industry);
    if (companyProfile?.companySize) setHeadcount(companyProfile.companySize);
    initializedRef.current = true;
  }, [company, companyProfile]);
  useEffect(() => { return () => { if (abortRef.current) abortRef.current.abort(); }; }, []);
  useEffect(() => { router.prefetch("/armory"); }, [router]);
  useEffect(() => { if (company && company.subscriptionActive !== "yes" && (!company.focus || company.focus !== "sops")) router.push("/"); }, [company, router]);

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
  const prevPhase = () => { if (phase === "process") setPhase("company"); else if (phase === "workflow") setPhase("process"); };

  const startGeneration = async () => {
    if (!session?.isDirector) { const c = getCompany(); if (!c || c.credits < 10) { setError("Insufficient credits. Purchase more in Administration."); return; } }
    setStep("loading"); setProgress(0); setLogs([]);
    setLogs((l) => [...l, "Building company intelligence profile..."]);
    setLogs((l) => [...l, "Running governance engine diagnostics..."]);
    abortRef.current = new AbortController();
    const totalSteps = 60;
    let step = 0;
    await new Promise<void>((resolve) => {
      const timer = setInterval(() => {
        step++;
        setProgress(Math.min((step / totalSteps) * 95, 95));
        if (step >= totalSteps) { clearInterval(timer); resolve(); }
      }, 500);
    });
    setLogs((l) => [...l, "Generating SOP document with full structure..."]);
    const sopDoc = generateSOPDocument(title, compName, softwareStack.join(", "), headcount, jurisdiction as Jurisdiction, size, industry, sopType);
    if (!session?.isDirector) deductCredit(10);
    setProgress(100); setLogs((l) => [...l, "Complete"]);
    const hash = generateHash(); const vHash = generateVerificationHash(); const now = new Date();
    const sop: SOP = { id: `SOP-${hash}`, title, company: compName, systems: softwareStack.join(", "), headcount, jurisdiction: jurisdiction as Jurisdiction, complexity: size, hash, verificationHash: vHash, dateCreated: formatDate(now), dateCategorized: formatDate(now), lastModified: formatDate(now), version: 1, status: "active", companyId: session?.companyId || "", createdBy: session?.name || "", industry, sopType };
    addSOP(sop); setDocument(sopDoc); setSavedSop(sop); setStep("preview");
  };

  const downloadHtml = (doc: any) => {
    const html = buildSopHtml(doc.title, doc.company, doc.jurisdiction, savedSop?.id || "", savedSop?.verificationHash || "", doc.industry, doc.complexity, doc.sopType, savedSop?.dateCreated || "", savedSop?.createdBy || "", savedSop?.version || 1, doc.sections);
    const blob = new Blob([html], { type: "text/html" }); const url = URL.createObjectURL(blob);
    const a = window.document.createElement("a"); a.href = url; a.download = `${doc.title.replace(/[^a-zA-Z0-9]/g, "_")}.html`; a.click(); URL.revokeObjectURL(url);
  };

  if (!session || !company) return <div className="splash-screen"><div className="splash-card"><div className="splash-logo">S</div><div className="splash-spinner"></div><p className="splash-text">Loading workspace...</p></div></div>;

  return (
    <main id="main-content">
    <div className="app-content" style={{ marginLeft: "var(--sidebar-width)", padding: "80px 32px 40px", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: step === "input" ? "32px" : "28px" }}>
          <div className="ogi-badge">SOP Forge</div>
          <h1 style={{ fontSize: "28px", fontWeight: 600, color: "var(--white)", marginBottom: "8px", letterSpacing: "-0.02em" }}>Document Engineering Studio</h1>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)", maxWidth: "560px", lineHeight: 1.6 }}>Design structured Standard Operating Procedures with governance frameworks and compliance intelligence. 10 credits per SOP.</p>
        </div>

        {step === "input" && (
          <div style={{ display: "flex", gap: "10px", marginBottom: "32px", overflowX: "auto", padding: "4px 0" }}>
            {PHASES.map((p, i) => (
              <div key={p.id} style={{
                display: "flex", alignItems: "center", gap: "10px", padding: "10px 18px", borderRadius: "10px", fontSize: "13px", fontWeight: 500, whiteSpace: "nowrap",
                background: phase === p.id ? "var(--accent-subtle)" : "var(--glass-bg)",
                border: phase === p.id ? "1px solid var(--accent-border)" : "1px solid var(--glass-border)",
                color: phase === p.id ? "var(--accent)" : "var(--text-tertiary)", transition: "all 0.2s",
              }}>
                <span style={{ width: "24px", height: "24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 600, background: phase === p.id ? "var(--accent)" : "var(--glass-bg)", color: phase === p.id ? "#fff" : "var(--text-tertiary)" }}>{i + 1}</span>
                {p.label}
              </div>
            ))}
          </div>
        )}

        {phase === "company" && step === "input" && (
          <div>
            <div className="glass" style={{ padding: "28px", marginBottom: "24px" }}>
              <div className="card-header" style={{ marginBottom: "16px" }}>Company Intelligence</div>
              <p style={{ fontSize: "13px", color: "var(--text-tertiary)", marginTop: "-8px", marginBottom: "20px" }}>Tell us about your company. Just the essentials to get started.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div><label>Company Name *</label><input type="text" value={compName} onChange={(e) => setCompName(e.target.value)} placeholder="Your company name" /></div>
                <div><label>Industry</label><select value={industry} onChange={(e) => setIndustry(e.target.value as Industry)}>{["ProfessionalServices","Finance","Healthcare","SaaS","Construction","Accountancy","E-Commerce","Manufacturing","Logistics","Education","Hospitality","RealEstate"].map(i => <option key={i} value={i}>{i.replace(/([A-Z])/g, " $1").trim()}</option>)}</select></div>
                <div><label>Jurisdiction</label><select value={jurisdiction} onChange={(e) => { setJurisdiction(e.target.value); setCompanyJurisdiction(e.target.value); }}>{Object.entries(JURISDICTION_REGULATORY).map(([key, val]) => <option key={key} value={key}>{val.name}</option>)}</select></div>
                <div><label>Company Size *</label><input type="number" value={headcount} onChange={(e) => setHeadcount(e.target.value)} placeholder="Number of employees" /></div>
              </div>
              <button onClick={() => setShowAdvancedCompany(!showAdvancedCompany)} className="btn-ghost" style={{ fontSize: "12px", marginTop: "16px", padding: "6px 12px", color: "var(--text-tertiary)", cursor: "pointer", background: "none", border: "1px solid var(--glass-border)", borderRadius: "6px", fontFamily: "inherit" }}>
                {showAdvancedCompany ? "− Hide advanced fields" : "+ Add company details (optional)"}
              </button>
              {showAdvancedCompany && (
                <div className="fade-in" style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid var(--glass-border)" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                    <div><label>Growth Stage</label><select value={growthStage} onChange={(e) => setGrowthStage(e.target.value)}>{GROWTH_STAGES.map(g => <option key={g} value={g}>{g}</option>)}</select></div>
                    <div><label>Business Model</label><select value={businessModel} onChange={(e) => setBusinessModel(e.target.value)}>{BUSINESS_MODELS.map(m => <option key={m} value={m}>{m}</option>)}</select></div>
                    <div><label>Risk Level</label><select value={riskLevel} onChange={(e) => setRiskLevel(e.target.value)}>{RISK_LEVELS.map(r => <option key={r} value={r}>{r}</option>)}</select></div>
                    <div><label>Brand Tone</label><input type="text" value={brandTone} onChange={(e) => setBrandTone(e.target.value)} placeholder="e.g., Professional, Technical" /></div>
                  </div>
                  <div style={{ marginTop: "14px" }}><label>Compliance Requirements</label><input type="text" value={complianceReqs} onChange={(e) => setComplianceReqs(e.target.value)} placeholder="e.g., ISO 9001, GDPR, FCA" /></div>
                  <div style={{ marginTop: "14px" }}><label>Products / Services</label><textarea value={services} onChange={(e) => setServices(e.target.value)} placeholder="List your key products and services" rows={2} /></div>
                  <div style={{ marginTop: "14px" }}><label>Departments</label><input type="text" value={departments} onChange={(e) => setDepartments(e.target.value)} placeholder="e.g., Sales, Operations, Finance, HR" /></div>
                  <div style={{ marginTop: "14px" }}>
                    <label>Software Stack</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "8px" }}>{softwareStack.map((s) => (<span key={s} className="tag tag-blue" style={{ cursor: "pointer" }} onClick={() => removeSoftware(s)}>{s} &times;</span>))}</div>
                    <input type="text" value={softwareInput} onChange={(e) => setSoftwareInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { addSoftware(softwareInput); setSoftwareInput(""); } }} placeholder="Type system name and press Enter" />
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "8px" }}>{SYSTEMS_PRESETS.filter(s => !softwareStack.includes(s)).map((s) => (<button key={s} onClick={() => addSoftware(s)} className="tag" style={{ cursor: "pointer", background: "transparent" }}>+ {s}</button>))}</div>
                  </div>
                </div>
              )}
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              {error && <p style={{ fontSize: "12px", color: "var(--danger)", marginRight: "16px", alignSelf: "center" }}>{error}</p>}
              <button onClick={nextPhase} className="btn btn-primary" style={{ padding: "10px 32px", fontSize: "14px" }}>Next — Process Intelligence →</button>
            </div>
          </div>
        )}

        {phase === "process" && step === "input" && (
          <div>
            <div className="glass" style={{ padding: "28px", marginBottom: "24px" }}>
              <div className="card-header" style={{ marginBottom: "16px" }}>Process Intelligence</div>
              <p style={{ fontSize: "13px", color: "var(--text-tertiary)", marginTop: "-8px", marginBottom: "20px" }}>Name the process and who owns it. We&apos;ll handle the rest.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div><label>Process Name *</label><input type="text" value={processName} onChange={(e) => setProcessName(e.target.value)} placeholder="e.g., Client Onboarding" /></div>
                <div><label>Process Owner *</label><input type="text" value={processOwner} onChange={(e) => setProcessOwner(e.target.value)} placeholder="e.g., Operations Manager" /></div>
                <div style={{ gridColumn: "1 / -1" }}><label>Purpose (optional)</label><textarea value={processPurpose} onChange={(e) => setProcessPurpose(e.target.value)} placeholder="Why does this process exist?" rows={2} /></div>
              </div>
              <button onClick={() => setShowAdvancedProcess(!showAdvancedProcess)} className="btn-ghost" style={{ fontSize: "12px", marginTop: "16px", padding: "6px 12px", color: "var(--text-tertiary)", cursor: "pointer", background: "none", border: "1px solid var(--glass-border)", borderRadius: "6px", fontFamily: "inherit" }}>
                {showAdvancedProcess ? "− Hide advanced fields" : "+ Add process details (optional)"}
              </button>
              {showAdvancedProcess && (
                <div className="fade-in" style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid var(--glass-border)" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                    <div style={{ gridColumn: "1 / -1" }}><label>Business Goal</label><textarea value={processGoal} onChange={(e) => setProcessGoal(e.target.value)} placeholder="What business outcome does this process drive?" rows={2} /></div>
                    <div><label>Department</label><input type="text" value={processDept} onChange={(e) => setProcessDept(e.target.value)} placeholder="e.g., Sales" /></div>
                    <div><label>Trigger</label><input type="text" value={processTrigger} onChange={(e) => setProcessTrigger(e.target.value)} placeholder="What starts this process?" /></div>
                    <div><label>Frequency</label><select value={processFrequency} onChange={(e) => setProcessFrequency(e.target.value)}>{["Hourly","Daily","Weekly","Monthly","Quarterly","Annually","Ad-hoc"].map(f => <option key={f} value={f}>{f}</option>)}</select></div>
                    <div><label>Estimated Duration</label><input type="text" value={processDuration} onChange={(e) => setProcessDuration(e.target.value)} placeholder="e.g., 30 minutes" /></div>
                    <div><label>Process Risk</label><select value={processRisk} onChange={(e) => setProcessRisk(e.target.value)}>{RISK_LEVELS.map(r => <option key={r} value={r}>{r}</option>)}</select></div>
                    <div><label>KPIs / Success Metrics</label><input type="text" value={processKpis} onChange={(e) => setProcessKpis(e.target.value)} placeholder="e.g., Time to complete, Error rate" /></div>
                  </div>
                </div>
              )}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: "12px", marginLeft: "auto" }}>
                {error && <p style={{ fontSize: "12px", color: "var(--danger)", alignSelf: "center" }}>{error}</p>}
                <button onClick={prevPhase} className="btn btn-secondary" style={{ padding: "10px 24px", fontSize: "14px" }}>← Back</button>
                <button onClick={nextPhase} className="btn btn-primary" style={{ padding: "10px 32px", fontSize: "14px" }}>Next — Workflow Mapping →</button>
              </div>
            </div>
          </div>
        )}

        {phase === "workflow" && step === "input" && (
          <div>
            <div className="glass" style={{ padding: "28px", marginBottom: "24px" }}>
              <div className="card-header" style={{ marginBottom: "16px" }}>Workflow Mapping</div>
              <p style={{ fontSize: "13px", color: "var(--text-tertiary)", marginTop: "-8px", marginBottom: "20px" }}>Map the process flow step by step. Define decision points that branch the workflow.</p>
              <div style={{ marginBottom: "20px" }}>
                <label>Process Flow Steps</label>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {workflowSteps.map((step, i) => (
                    <div key={i} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <span style={{ fontSize: "11px", color: "var(--text-tertiary)", minWidth: "24px" }}>{i + 1}.</span>
                      <input type="text" value={step} onChange={(e) => updateWorkflowStep(i, e.target.value)} placeholder={`Step ${i + 1}`} style={{ flex: 1 }} />
                      <button onClick={() => removeWorkflowStep(i)} className="btn-ghost" style={{ fontSize: "14px", padding: "2px 8px", color: "var(--danger)" }}>&times;</button>
                    </div>
                  ))}
                </div>
                <button onClick={addWorkflowStep} className="btn-ghost" style={{ fontSize: "12px", marginTop: "8px", padding: "4px 12px" }}>+ Add Step</button>
              </div>
              {workflowSteps.filter(s => s.trim()).length > 1 && (
                <div style={{ padding: "16px", background: "rgba(0,0,0,0.15)", borderRadius: "var(--radius)", marginBottom: "20px", fontSize: "13px" }}>
                  <p style={{ color: "var(--text-tertiary)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "12px" }}>Flow Preview</p>
                  {workflowSteps.filter(s => s.trim()).map((s, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
                      <span style={{ width: "28px", height: "28px", borderRadius: "6px", background: "var(--accent-subtle)", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 600, flexShrink: 0 }}>{i + 1}</span>
                      <span style={{ color: "var(--text-secondary)" }}>{s}</span>
                      {i < workflowSteps.filter(x => x.trim()).length - 1 && <span style={{ color: "var(--text-muted)" }}>↓</span>}
                    </div>
                  ))}
                </div>
              )}
              <div style={{ borderTop: "1px solid var(--glass-border)", paddingTop: "16px" }}>
                <label>Decision Point (optional)</label>
                <p style={{ fontSize: "11px", color: "var(--text-tertiary)", marginBottom: "12px" }}>Define a key decision that branches the workflow.</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                  <div><label style={{ fontSize: "11px" }}>Question</label><input type="text" value={decisionPoint} onChange={(e) => setDecisionPoint(e.target.value)} placeholder="e.g., Payment received?" /></div>
                  <div><label style={{ fontSize: "11px", color: "var(--success)" }}>If YES</label><input type="text" value={decisionYes} onChange={(e) => setDecisionYes(e.target.value)} placeholder="e.g., Create Project" /></div>
                  <div><label style={{ fontSize: "11px", color: "var(--danger)" }}>If NO</label><input type="text" value={decisionNo} onChange={(e) => setDecisionNo(e.target.value)} placeholder="e.g., Send Reminder" /></div>
                </div>
                {decisionPoint && (
                  <div style={{ marginTop: "12px", padding: "12px 16px", background: "rgba(0,0,0,0.15)", borderRadius: "var(--radius)", fontSize: "13px" }}>
                    <span style={{ color: "var(--text-primary)" }}>{decisionPoint}</span>
                    <div style={{ marginLeft: "24px", marginTop: "8px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}><span style={{ color: "var(--success)", fontWeight: 600 }}>YES</span><span style={{ color: "var(--text-secondary)" }}>→</span><span style={{ color: "var(--text-secondary)" }}>{decisionYes || "(continue)"}</span></div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><span style={{ color: "var(--danger)", fontWeight: 600 }}>NO</span><span style={{ color: "var(--text-secondary)" }}>→</span><span style={{ color: "var(--text-secondary)" }}>{decisionNo || "(alternative path)"}</span></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="glass" style={{ padding: "24px", marginBottom: "20px" }}>
              <div className="card-header" style={{ marginBottom: "16px" }}>Document Settings</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px" }}>
                <div><label>SOP Title</label><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={processName || "SOP Title"} /></div>
                <div><label>Type</label><select value={sopType} onChange={(e) => setSopType(e.target.value)}><option value="Operational">Operational</option><option value="Compliance/Regulatory">Compliance / Regulatory</option><option value="Risk">Risk</option><option value="Audit">Audit</option></select></div>
                <div><label>Complexity</label><select value={size} onChange={(e) => setSize(e.target.value as CompanySize)}><option value="1-10">Standard (10-13 steps)</option><option value="10-50">Detailed (14-18 steps)</option><option value="50+">Comprehensive (18+ steps)</option></select></div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>{session?.isDirector ? "Director override — unlimited" : `${company.credits} credits available · 10 required`}</span>
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                {error && <p style={{ fontSize: "12px", color: "var(--danger)" }}>{error}</p>}
                <button onClick={prevPhase} className="btn btn-secondary" style={{ padding: "10px 24px", fontSize: "14px" }}>← Back</button>
                <button onClick={nextPhase} className="btn btn-primary" style={{ padding: "10px 32px", fontSize: "14px" }}>Generate Full SOP</button>
              </div>
            </div>
          </div>
        )}

        {step === "loading" && (
          <div className="glass" style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center", padding: "48px 32px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "4px" }}>Generating Operational Infrastructure</h2>
            <p style={{ fontSize: "13px", color: "var(--text-tertiary)", marginBottom: "24px" }}>Engineering SOP with full governance structure — ~30 seconds</p>
            <div className="progress-bar" style={{ marginBottom: "12px", height: "6px" }}><div className="progress-fill" style={{ width: `${progress}%`, height: "6px" }} /></div>
            <p style={{ fontSize: "12px", color: "var(--accent)", fontWeight: 500, marginBottom: "20px" }}>{Math.round(progress)}%</p>
            <div style={{ textAlign: "left", padding: "12px 16px", background: "rgba(0,0,0,0.2)", borderRadius: "var(--radius)", maxHeight: "200px", overflowY: "auto", fontSize: "12px", fontFamily: "monospace" }}>
              {logs.map((log, i) => (<p key={i} style={{ color: log === "Complete" ? "var(--success)" : "var(--text-secondary)", marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px" }}><span style={{ color: "var(--text-muted)" }}>{String(i + 1).padStart(2, "0")}</span>{log}</p>))}
            </div>
          </div>
        )}

        {(step === "preview" || step === "done") && document && savedSop && (
          <div className="fade-in">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "8px" }}>
              <div>
                <span style={{ fontSize: "13px", color: "var(--success)", fontWeight: 500 }}>✓ Document generated successfully</span>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => downloadHtml(document)} className="btn btn-secondary" style={{ fontSize: "12px" }}>Download HTML</button>
                <button onClick={() => router.push("/armory")} className="btn btn-secondary" style={{ fontSize: "12px" }}>View in Vault</button>
                <button onClick={() => setStep("done")} className="btn btn-primary" style={{ fontSize: "12px" }}>Confirm & Close</button>
              </div>
            </div>
            <div className="glass" style={{ padding: "32px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px", marginBottom: "24px", padding: "16px", background: "rgba(0,0,0,0.15)", borderRadius: "var(--radius)" }}>
                <div><div className="stat-label">SOP ID</div><div style={{ fontSize: "13px", color: "var(--text-primary)", fontFamily: "monospace", marginTop: "2px" }}>{savedSop.id}</div></div>
                <div><div className="stat-label">Version</div><div style={{ fontSize: "13px", color: "var(--text-primary)", marginTop: "2px" }}>1.0</div></div>
                <div><div className="stat-label">Effective Date</div><div style={{ fontSize: "13px", color: "var(--text-primary)", marginTop: "2px" }}>{savedSop.dateCreated}</div></div>
                <div><div className="stat-label">Owner</div><div style={{ fontSize: "13px", color: "var(--text-primary)", marginTop: "2px" }}>{savedSop.createdBy}</div></div>
                <div><div className="stat-label">Jurisdiction</div><div style={{ fontSize: "13px", color: "var(--accent)", marginTop: "2px" }}>{savedSop.jurisdiction}</div></div>
                <div><div className="stat-label">Verification Hash</div><div style={{ fontSize: "12px", color: "var(--text-tertiary)", fontFamily: "monospace", marginTop: "2px" }}>{savedSop.verificationHash}</div></div>
              </div>
              {document.sections.map((section, i) => (
                <div key={i} style={{ marginBottom: "20px" }}>
                  <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "8px", paddingBottom: "4px", borderBottom: "1px solid var(--glass-border)" }}>{section.heading}</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>{section.content.map((line, j) => (<p key={j} style={{ fontSize: "13px", lineHeight: "1.6", color: "var(--slate-300)", margin: 0 }}>{line}</p>))}</div>
                </div>
              ))}
            </div>
            {step === "done" && (
              <div style={{ textAlign: "center", marginTop: "24px" }}>
                <button onClick={() => { setPhase("company"); setStep("input"); setTitle(""); setProcessName(""); setSoftwareStack([]); setHeadcount(""); setDocument(null); setSavedSop(null); setWorkflowSteps(["Lead", "Discovery", "Proposal", "Contract", "Invoice", "Payment", "Delivery", "Completion"]); setDecisionPoint(""); setDecisionYes(""); setDecisionNo(""); setLogs([]); }} className="btn btn-primary" style={{ padding: "12px 32px", fontSize: "14px" }}>Generate New SOP</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    </main>
  );
}
