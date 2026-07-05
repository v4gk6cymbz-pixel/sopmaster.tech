"use client";

import { useState, useEffect, useRef } from "react";
import { useStore } from "@/lib/store";
import { generateSOPDocument } from "@/lib/sop-generator";
import { generateHash, generateVerificationHash, formatDate, JURISDICTION_REGULATORY, buildSopHtml } from "@/lib/utils";
import type { CompanySize, Jurisdiction, SOP, Industry } from "@/types";
import { useRouter } from "next/navigation";

const SOP_FUNCTION_URL = "/api/generate/sop";

const SYSTEMS_PRESETS = ["Slack", "HubSpot", "Stripe", "Salesforce", "Notion", "Asana", "ClickUp", "Zendesk", "QuickBooks", "Xero", "Microsoft Teams", "Shopify"];

export default function ForgePage() {
  const router = useRouter();
  const session = useStore((s) => s.session);
  const getCompany = useStore((s) => s.getCompany);
  const addSOP = useStore((s) => s.addSOP);
  const deductCredit = useStore((s) => s.deductCredit);
  const companyProfile = useStore((s) => s.companyProfile);
  const company = getCompany();

  const [step, setStep] = useState<"input" | "loading" | "preview" | "done">("input");
  const [title, setTitle] = useState("");
  const [compName, setCompName] = useState("");
  const [systems, setSystems] = useState<string[]>([]);
  const [systemInput, setSystemInput] = useState("");
  const [headcount, setHeadcount] = useState("");
  const [size, setSize] = useState<CompanySize>("1-10");
  const [industry, setIndustry] = useState<Industry>((companyProfile?.industry as Industry) || "ProfessionalServices");
  const [jurisdiction, setJurisdiction] = useState<string>(company?.jurisdiction || "UK");
  const [sopType, setSopType] = useState<string>("Operational");
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

  const removeSystem = (s: string) => setSystems(systems.filter(x => x !== s));
  const addSystem = (s: string) => { if (s.trim() && !systems.includes(s.trim())) setSystems([...systems, s.trim()]); };

  const startGeneration = async () => {
    setError("");
    if (!title.trim() || !compName.trim() || systems.length === 0 || !headcount.trim()) {
      setError("Complete all fields: company, title, employee count, and at least one system.");
      return;
    }
    if (!session?.isDirector) {
      const c = getCompany();
      if (!c || c.credits < 10) {
        setError("Insufficient credits. Purchase more in Administration.");
        return;
      }
    }

    setStep("loading"); setProgress(0); setLogs([]);

    const msgs = ["Preparing company profile...", "Loading industry framework...", "Building documentation...", "Quality review...", "Formatting output...", "Saving to vault..."];
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
    const logInterval = setInterval(tick, 5000);

    try {
      const res = await fetch(SOP_FUNCTION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title, company: compName, systems: systems.join(", "), headcount,
          jurisdiction, complexity: size, industry, sopType, format: "json",
        }),
        signal: abortRef.current.signal,
      });
      if (res.ok) {
        const data = await res.json();
        sopDoc = data.document;
      } else {
        throw new Error("remote fail");
      }
    } catch {
      if (abortRef.current?.signal.aborted) { clearInterval(logInterval); return; }
      sopDoc = generateSOPDocument(title, compName, systems.join(", "), headcount, jurisdiction as Jurisdiction, size, industry, sopType);
    }

    const remaining = 30000 - (Date.now() - startedAt);
    if (remaining > 0) {
      await new Promise((r) => setTimeout(r, remaining));
    }

    clearInterval(logInterval);
    setProgress(100); setLogs((l) => [...l, "Complete"]);

    await deductCredit(10);
    const hash = generateHash();
    const vHash = generateVerificationHash();
    const now = new Date();
    const sop: SOP = {
      id: `SOP-${hash}`, title, company: compName, systems: systems.join(", "), headcount,
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
    a.href = url; a.download = `${doc.title.replace(/[^a-zA-Z0-9]/g, "_")}.html`; a.click();
    URL.revokeObjectURL(url);
  };

  if (!session || !company) return null;

  const jurisdictionInfo = JURISDICTION_REGULATORY[jurisdiction];

  return (
    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "32px 24px" }} className="fade-in">
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "20px", fontWeight: 600, color: "#F1F5F9", marginBottom: "4px" }}>
          Operational Documents
        </h1>
        <p style={{ fontSize: "13px", color: "#64748B" }}>
          Generate standard operating procedures for your organisation. Each document costs 1 credit.
        </p>
      </div>

      {step === "input" && company.credits < 10 && !session?.isDirector && (
        <div className="card" style={{ marginBottom: "20px", padding: "16px 20px", borderColor: "#EF4444" }}>
          <p style={{ fontSize: "13px", color: "#EF4444", fontWeight: 500 }}>{company.credits <= 0 ? "No credits remaining." : "Low credits."}</p>
          <p style={{ fontSize: "12px", color: "#94A3B8", marginTop: "4px" }}>SOPs cost 10 credits. Purchase more in Administration to continue generating.</p>
        </div>
      )}

      {jurisdictionInfo && (
        <div className="card" style={{ marginBottom: "20px", padding: "12px 16px", borderColor: "rgba(59,130,246,0.15)" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", color: "#64748B", marginBottom: "2px" }}>
            Active Jurisdiction — {jurisdictionInfo.name}
          </p>
          <p style={{ fontSize: "12px", color: "#94A3B8", lineHeight: 1.5 }}>{jurisdictionInfo.trigger}</p>
        </div>
      )}

      {step === "input" && (
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
                {Object.entries(JURISDICTION_REGULATORY).map(([key, val]) => (
                  <option key={key} value={key}>{val.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="card">
            <div className="card-header">Operations</div>
            <div style={{ marginBottom: "16px" }}>
              <label>Employees</label>
              <input type="number" value={headcount} onChange={(e) => setHeadcount(e.target.value)} placeholder="Number of employees" />
            </div>
            <div>
              <label>Systems in Use</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "8px" }}>
                {systems.map((s) => (
                  <span key={s} className="tag tag-blue" style={{ cursor: "pointer" }} onClick={() => removeSystem(s)}>
                    {s} &times;
                  </span>
                ))}
              </div>
              <input type="text" value={systemInput} onChange={(e) => setSystemInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { addSystem(systemInput); setSystemInput(""); } }} placeholder="Type and press Enter" />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "8px" }}>
                {SYSTEMS_PRESETS.filter(s => !systems.includes(s)).map((s) => (
                  <button key={s} onClick={() => addSystem(s)} className="tag" style={{ cursor: "pointer", background: "transparent" }}>+ {s}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">Document</div>
            <div style={{ marginBottom: "16px" }}>
              <label>Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Client Onboarding Workflow" />
            </div>
            <div style={{ marginBottom: "16px" }}>
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
                <option value="1-10">1-10 employees (13 steps)</option>
                <option value="10-50">10-50 employees (16 steps)</option>
                <option value="50+">50+ employees (18 steps)</option>
              </select>
            </div>
          </div>

          <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <div style={{ marginBottom: "12px" }}>
              <span style={{ fontSize: "12px", color: "#64748B" }}>
                {session?.isDirector ? "Director override — unlimited" : `${company.credits} credits available · 10 required`}
              </span>
            </div>
            {error && <p style={{ fontSize: "12px", color: "#EF4444", marginBottom: "8px" }}>{error}</p>}
            <button onClick={startGeneration} className="btn btn-primary" style={{ width: "100%", padding: "10px 20px", fontSize: "14px" }}>
              Generate Documentation
            </button>
          </div>
        </div>
      )}

      {step === "loading" && (
        <div className="card" style={{ maxWidth: "480px", margin: "0 auto", textAlign: "center", padding: "48px 32px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#F1F5F9", marginBottom: "4px" }}>Generating Document</h2>
          <p style={{ fontSize: "13px", color: "#64748B", marginBottom: "20px" }}>Estimated time: ~30 seconds</p>
          <div className="progress-bar" style={{ marginBottom: "8px" }}>
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <p style={{ fontSize: "12px", color: "#64748B", marginBottom: "16px" }}>{Math.round(progress)}%</p>
          <div style={{ textAlign: "left", padding: "12px 16px", background: "rgba(0,0,0,0.2)", borderRadius: "6px", maxHeight: "160px", overflowY: "auto" }}>
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
            <span style={{ fontSize: "13px", color: "#22C55E" }}>Document generated successfully</span>
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
            <div className="meta-grid-5" style={{ marginBottom: "24px", padding: "16px", background: "rgba(0,0,0,0.15)", borderRadius: "6px" }}>
              <div><div className="stat-label">SOP ID</div><div style={{ fontSize: "13px", color: "#F1F5F9", fontFamily: "monospace", marginTop: "2px", wordBreak: "break-all" }}>{savedSop.id}</div></div>
              <div><div className="stat-label">Version</div><div style={{ fontSize: "13px", color: "#F1F5F9", marginTop: "2px" }}>1.0</div></div>
              <div><div className="stat-label">Effective Date</div><div style={{ fontSize: "13px", color: "#F1F5F9", marginTop: "2px" }}>{savedSop.dateCreated}</div></div>
              <div><div className="stat-label">Owner</div><div style={{ fontSize: "13px", color: "#F1F5F9", marginTop: "2px" }}>{savedSop.createdBy}</div></div>
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
              <button onClick={() => { setStep("input"); setTitle(""); setSystems([]); setHeadcount(""); setDocument(null); setSavedSop(null); }} className="btn btn-primary">
                Generate Another Document
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
