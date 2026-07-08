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

interface ChecklistItem {
  task: string;
  dataFields?: string[];
}

function generateChecklistContent(type: string, industry: string, jurisdiction: string, company: string): { heading: string; content: string[] }[] {
  const indLabel = industry.replace(/([A-Z])/g, " $1").trim();

  const checklists: Record<string, ChecklistItem[]> = {
    "Employee Onboarding": [
      { task: "Verify employment eligibility documentation (passport, visa, right-to-work)", dataFields: ["Document Type: ____________________", "Document Ref: ____________________", "Expiry Date: ____________________"] },
      { task: "Collect signed employment contract, offer letter, and non-disclosure agreement", dataFields: ["Contract Signed: _____ / _____ / _____", "Offer Letter Filed: ☐ Yes  ☐ No", "NDA Ref: ____________________"] },
      { task: "Register employee on payroll, pension, and benefits platforms", dataFields: ["Payroll Ref: ____________________", "Pension Enrolled: ☐ Yes  ☐ No", "Benefits Opt-In: ☐ Yes  ☐ No"] },
      { task: "Set up IT accounts, email, system access, and security credentials", dataFields: ["Email Created: ____________________", "Systems Access Granted: ____________________", "MFA Enrolled: ☐ Yes  ☐ No"] },
      { task: "Assign and issue company equipment (laptop, phone, badge, keys)", dataFields: ["Asset Tag(s): ____________________", "Serial No(s): ____________________", "Signed Acceptance: ☐ Yes  ☐ No"] },
      { task: "Schedule induction, compliance training, and role-specific onboarding", dataFields: ["Induction Date: ____________________", "Training Modules Assigned: ____________________"] },
      { task: "Assign line manager, onboarding buddy, and 30-60-90 day checkpoints", dataFields: ["Line Manager: ____________________", "Buddy: ____________________", "Checkpoint Dates: ____________________"] },
      { task: "Record emergency contact details, medical conditions, and dietary requirements", dataFields: ["Emergency Contact: ____________________", "Phone: ____________________", "Medical Notes: ____________________"] },
      { task: "Issue employee handbook, company policies, and code of conduct", dataFields: ["Handbook Acknowledged: ☐ Yes  ☐ No", "Policies Read: ☐ Yes  ☐ No"] },
      { task: "Complete payroll setup — bank details, tax code, student loan, pension", dataFields: ["Bank Account Verified: ☐ Yes  ☐ No", "Tax Code: ____________________", "Student Loan: ☐ Plan 1  ☐ Plan 2  ☐ None"] },
      { task: "Provide organisational chart, team introduction, and role-specific documentation", dataFields: ["Org Chart Sent: ☐ Yes  ☐ No", "Role Doc: ____________________"] },
      { task: "Register for benefits — health insurance, cycle-to-work, gym, season ticket loan", dataFields: ["Benefit Selections: ____________________", "Enrolment Confirmed: ☐ Yes  ☐ No"] },
      { task: "Confirm completion of probationary period objectives and review schedule", dataFields: ["Probation Length: ______ months", "Review Date 1: ____________________", "Review Date 2: ____________________"] },
      { task: "Log onboarding completion in HR system and notify all stakeholders", dataFields: ["HR System Updated: ☐ Yes  ☐ No", "Stakeholders Notified: ____________________"] },
    ],
    "Daily Opening": [
      { task: "Verify premises security — alarms disarmed, doors unlocked, no signs of breach", dataFields: ["Alarm Code Entered: ☐ Yes  ☐ No", "System Status: ____________________", "Notes: ____________________"] },
      { task: "Inspect all safety systems — fire alarms, emergency lighting, extinguishers", dataFields: ["Fire Alarm Test: ☐ Pass  ☐ Fail", "Emergency Lights: ☐ On  ☐ Off", "Extinguisher Pressure: ____________________"] },
      { task: "Power on and verify all equipment, terminals, and operational systems", dataFields: ["System Uptime: ____________________", "Terminals Online: _____ / _____", "Error Codes: ____________________"] },
      { task: "Verify stock levels, cash float, and consumables against closing report", dataFields: ["Opening Float: £ ____________________", "Stock Variance: ____________________", "Consumables OK: ☐ Yes  ☐ No"] },
      { task: "Check cash handling — verify starting float, secure cash drawers", dataFields: ["Float per Drawer: £ ____________________", "Drawer Assigned To: ____________________"] },
      { task: "Review previous day's incident reports, handover notes, and management actions", dataFields: ["Incidents Outstanding: _____", "Handover Notes Reviewed: ☐ Yes  ☐ No"] },
      { task: "Confirm staff attendance and assign daily roles and responsibilities", dataFields: ["Staff Present: _____ / _____", "Absentees: ____________________", "Role Assignments: ____________________"] },
      { task: "Test communication systems — intercom, phones, radios, public address", dataFields: ["Phones: ☐ OK  ☐ Fault", "Radios: ☐ OK  ☐ Fault", "PA System: ☐ OK  ☐ Fault"] },
      { task: "Review daily schedule, priorities, targets, and special events with team", dataFields: ["Daily Briefing Held: ☐ Yes  ☐ No", "Key Priorities: ____________________"] },
      { task: "Check environmental controls — HVAC, lighting, thermostat settings", dataFields: ["Temperature: ______ °C", "HVAC Status: ☐ Auto  ☐ Manual  ☐ Off"] },
      { task: "Log opening confirmation in the daily operations record", dataFields: ["Opened By: ____________________", "Time: ____________________", "Supervisor Sign-Off: ____________________"] },
      { task: "Verify cleanliness and presentation of all customer-facing areas", dataFields: ["Cleaning Check: ☐ Pass  ☐ Fail", "Notes: ____________________"] },
    ],
    "Daily Closing": [
      { task: "Reconcile all transactions, payments, and cash positions for the day", dataFields: ["Total Sales: £ ____________________", "Cash in Drawer: £ ____________________", "Discrepancy: £ ____________________"] },
      { task: "Verify stock levels, record discrepancies, and flag low-stock items", dataFields: ["Stock Count Variance: ____________________", "Low Stock Items: ____________________"] },
      { task: "Secure all equipment — power down non-essential systems, log off terminals", dataFields: ["Terminals Logged Off: _____ / _____", "Systems Shutdown: ☐ Yes  ☐ No"] },
      { task: "Arm security systems — verify alarm set, motion sensors, CCTV recording", dataFields: ["Alarm Code: ____________________", "CCTV Check: ☐ Recording  ☐ Off", "CCTV Log Ref: ____________________"] },
      { task: "Lock all access points and verify door/window seal integrity", dataFields: ["Doors Locked: _____ / _____", "Windows Locked: _____ / _____", "Seal Check: ☐ Pass  ☐ Fail"] },
      { task: "Complete end-of-day incident report and log any security or safety events", dataFields: ["Incident Ref: ____________________", "Severity: ☐ Low  ☐ Medium  ☐ High", "Report Filed: ☐ Yes  ☐ No"] },
      { task: "Confirm all staff have signed out and departures are logged", dataFields: ["Staff Signed Out: _____ / _____", "Late Departures: ____________________"] },
      { task: "Back up critical data and system logs for the day", dataFields: ["Backup Initiated: ☐ Yes  ☐ No", "Backup Status: ____________________", "Log Ref: ____________________"] },
      { task: "Record closing meter readings, counters, and usage data", dataFields: ["Meter Reading: ____________________", "Usage: ____________________", "Notes: ____________________"] },
      { task: "Submit daily summary report to management", dataFields: ["Summary Sent: ☐ Yes  ☐ No", "Sent To: ____________________"] },
      { task: "Secure all confidential documents, cash, and valuables in safe", dataFields: ["Safe Locked: ☐ Yes  ☐ No", "Valuables Count: ____________________"] },
      { task: "Log closing confirmation in daily operations record", dataFields: ["Closed By: ____________________", "Time: ____________________", "Supervisor Sign-Off: ____________________"] },
    ],
    "Equipment Inspection": [
      { task: "Verify equipment is clean, undamaged, and in operational condition", dataFields: ["Equipment ID: ____________________", "Condition: ☐ Good  ☐ Fair  ☐ Poor", "Cleanliness: ☐ Pass  ☐ Fail"] },
      { task: "Inspect all safety guards, interlocks, and protective devices", dataFields: ["Guards in Place: ☐ Yes  ☐ No  ☐ N/A", "Interlock Test: ☐ Pass  ☐ Fail", "Notes: ____________________"] },
      { task: "Inspect power cables, plugs, and connections for damage or wear", dataFields: ["Cable Condition: ☐ Good  ☐ Worn  ☐ Damaged", "PAT Test Due: ____________________"] },
      { task: "Verify calibration status, service date, and certification validity", dataFields: ["Last Calibrated: ____________________", "Next Calibration: ____________________", "Certificate Ref: ____________________"] },
      { task: "Run diagnostic tests and record all error codes and alerts", dataFields: ["Test Result: ☐ Pass  ☐ Fail  ☐ Warning", "Error Code(s): ____________________", "Diagnostic Log Ref: ____________________"] },
      { task: "Test emergency stop, kill switch, and safety cut-off mechanisms", dataFields: ["E-Stop Test: ☐ Pass  ☐ Fail", "Cut-Off Test: ☐ Pass  ☐ Fail"] },
      { task: "Check fluid levels, lubricants, filters, and consumable parts", dataFields: ["Fluid Level: ____________________", "Filter Status: ☐ Clean  ☐ Replace", "Consumables: ☐ Stocked  ☐ Low  ☐ Empty"] },
      { task: "Verify all warning labels, decals, and signage are legible and in place", dataFields: ["Labels Missing: _____", "Labels Illegible: _____", "Replacements Needed: ____________________"] },
      { task: "Record equipment serial number, model, location, and asset tag", dataFields: ["Serial No: ____________________", "Model: ____________________", "Asset Tag: ____________________", "Location: ____________________"] },
      { task: "Document any defects, faults, or anomalies and assign follow-up actions", dataFields: ["Defects Found: _____", "Action Assigned To: ____________________", "Target Resolution: ____________________"] },
      { task: "Confirm spare parts inventory and reorder any out-of-stock items", dataFields: ["Spares Count: ____________________", "Reorder Required: ☐ Yes  ☐ No", "Order Ref: ____________________"] },
      { task: "Complete and sign off equipment inspection certificate", dataFields: ["Inspected By: ____________________", "Date: ____________________", "Next Inspection Due: ____________________"] },
    ],
    "Compliance Review": [
      { task: "Verify all regulatory licences, permits, and registrations are current", dataFields: ["Licence(s) Reviewed: ____________________", "Expiry Dates: ____________________", "Renewal Required: ☐ Yes  ☐ No"] },
      { task: "Review recent regulatory updates, guidance, and legislative changes", dataFields: ["Regulatory Body: ____________________", "Update Ref: ____________________", "Impact Assessment: ☐ None  ☐ Low  ☐ Medium  ☐ High"] },
      { task: "Confirm data protection measures are compliant with applicable legislation", dataFields: ["Lawful Basis Recorded: ☐ Yes  ☐ No", "DPIA Conducted: ☐ Yes  ☐ No  ☐ N/A", "SARs Log Reviewed: ☐ Yes  ☐ No"] },
      { task: "Check record-keeping systems for completeness, accuracy, and retention compliance", dataFields: ["Records Sampled: _____", "Completeness Rate: _____ %", "Retention Compliance: ☐ Pass  ☐ Fail"] },
      { task: "Verify employee training records are up to date and compliant with mandatory requirements", dataFields: ["Records Checked: _____", "Overdue Training: _____", "Training Gaps: ____________________"] },
      { task: "Review incident, complaint, and near-miss logs for patterns and trends", dataFields: ["Period Reviewed: ____________________", "Total Incidents: _____", "Repeat Issues: ____________________"] },
      { task: "Confirm all required policies, procedures, and documentation are current and approved", dataFields: ["Policies Reviewed: _____", "Next Review Date: ____________________", "Outstanding Updates: ____________________"] },
      { task: "Verify third-party and vendor compliance against contractual and regulatory requirements", dataFields: ["Vendors Reviewed: _____", "Non-Compliant: _____", "Remediation Status: ____________________"] },
      { task: "Review insurance certificates, cover levels, and renewal dates", dataFields: ["Policy Type: ____________________", "Cover Amount: £ ____________________", "Renewal Date: ____________________"] },
      { task: "Check complaint handling records for timeliness, resolution, and escalation", dataFields: ["Complaints Received: _____", "Within SLA: _____ / _____", "Escalated: _____"] },
      { task: "Conduct spot audit of operational procedures against documented standards", dataFields: ["Procedures Audited: ____________________", "Findings: ☐ None  ☐ Minor  ☐ Major  ☐ Critical"] },
      { task: "Prepare compliance summary report with findings, actions, and submission deadlines", dataFields: ["Report Ref: ____________________", "Submitted To: ____________________", "Due Date: ____________________"] },
      { task: "Verify AML checks, KYC records, and due diligence files are complete", dataFields: ["AML Checks Reviewed: _____", "KYC Files Complete: _____ / _____", "CDD Up to Date: ☐ Yes  ☐ No"] },
      { task: "Confirm whistleblowing and speak-up channels are operational and promoted", dataFields: ["Channel Tested: ☐ Yes  ☐ No", "Awareness Materials Displayed: ☐ Yes  ☐ No"] },
    ],
    "Health & Safety": [
      { task: "Verify fire extinguishers, alarms, and emergency safety equipment are in date and accessible", dataFields: ["Extinguisher Locations: _____ / _____", "Last Service: ____________________", "Next Due: ____________________"] },
      { task: "Inspect emergency exits, escape routes, and assembly points", dataFields: ["Exits Unobstructed: ☐ Yes  ☐ No", "Emergency Lighting: ☐ Pass  ☐ Fail", "Assembly Point: ____________________"] },
      { task: "Check first aid kits — contents, expiry dates, and replenishment needs", dataFields: ["Kit Location(s): ____________________", "Missing Items: ____________________", "First Aider: ____________________"] },
      { task: "Verify COSHH register is current and all substances are correctly stored and labelled", dataFields: ["COSHH Items Checked: _____", "Discrepancies: ____________________", "MSDS Available: ☐ Yes  ☐ No"] },
      { task: "Check all portable electrical equipment is PAT tested and within retest date", dataFields: ["Items Tested: _____ / _____", "Failures: _____", "Retest Due: ____________________"] },
      { task: "Review accident, incident, and near-miss reports for investigation status", dataFields: ["Open Incidents: _____", "RIDDOR Reportable: ☐ Yes  ☐ No", "Closed This Period: _____"] },
      { task: "Confirm mandatory safety signage is in place, legible, and compliant", dataFields: ["Signage Check: ☐ Pass  ☐ Fail", "Missing Signs: ____________________"] },
      { task: "Inspect workstations for DSE compliance — screens, chairs, desk setup, lighting", dataFields: ["Workstations Checked: _____", "DSE Actions Outstanding: _____", "Display Screen Assessed: ☐ Yes  ☐ No"] },
      { task: "Verify ventilation, lighting, temperature, and noise levels within acceptable ranges", dataFields: ["Temperature: ______ °C", "Lighting: ☐ Adequate  ☐ Poor", "Noise Level: ______ dB", "Ventilation: ☐ Good  ☐ Fair  ☐ Poor"] },
      { task: "Check welfare facilities — toilets, drinking water, rest areas, changing rooms", dataFields: ["Cleanliness: ☐ Pass  ☐ Fail", "Supplies Stocked: ☐ Yes  ☐ No", "Defects: ____________________"] },
      { task: "Review current risk assessments — confirm they cover all activities and are dated", dataFields: ["RAs Reviewed: _____", "Overdue for Review: _____", "New Activities Identified: ____________________"] },
      { task: "Document findings, corrective actions, and responsible parties in health and safety log", dataFields: ["H&S Log Updated: ☐ Yes  ☐ No", "Actions Assigned: _____", "Review By: ____________________"] },
      { task: "Confirm asbestos register, legionella log, and fire risk assessment are current", dataFields: ["Asbestos Register: ☐ Up to Date  ☐ Overdue", "Legionella Check: ____________________", "Fire RA: ☐ Current  ☐ Overdue"] },
    ],
    "Client Onboarding": [
      { task: "Verify client identity and conduct due diligence checks", dataFields: ["ID Document Type: ____________________", "Document Ref: ____________________", "ID Verified: ☐ Yes  ☐ No"] },
      { task: "Collect and verify all required documentation (incorporation, tax, licences)", dataFields: ["Documents Received: ____________________", "Verified By: ____________________", "Date: ____________________"] },
      { task: "Complete risk assessment, vulnerability evaluation, and KYC classification", dataFields: ["Risk Rating: ☐ Low  ☐ Medium  ☐ High", "Vulnerability Assessed: ☐ Yes  ☐ No", "KYC Level: ____________________"] },
      { task: "Confirm client meets eligibility, suitability, and legal capacity criteria", dataFields: ["Eligibility Check: ☐ Pass  ☐ Fail", "Suitability Confirmed: ☐ Yes  ☐ No", "Notes: ____________________"] },
      { task: "Prepare and execute engagement letter, terms of business, and fee agreement", dataFields: ["Engagement Letter Signed: ☐ Yes  ☐ No", "Fee Structure Agreed: ☐ Yes  ☐ No", "Date Signed: ____________________"] },
      { task: "Set up client record in CRM, accounting, and operational systems", dataFields: ["CRM Ref: ____________________", "System Accounts Created: ____________________", "Client Profile Complete: ☐ Yes  ☐ No"] },
      { task: "Assign client relationship manager, delivery team, and escalation contacts", dataFields: ["Relationship Manager: ____________________", "Team Members: ____________________", "Escalation Contact: ____________________"] },
      { task: "Conduct initial consultation — document scope, requirements, goals, constraints", dataFields: ["Consultation Date: ____________________", "Scope Documented: ☐ Yes  ☐ No", "Key Requirements: ____________________"] },
      { task: "Establish communication protocols, reporting schedule, and review cadence", dataFields: ["Communication Method: ____________________", "Reporting Frequency: ____________________", "Review Cadence: ____________________"] },
      { task: "Configure billing, payment terms, invoicing schedule, and direct debit", dataFields: ["Billing Terms: ____________________", "Payment Method: ____________________", "Invoicing Schedule: ____________________"] },
      { task: "Provide welcome pack with key contacts, service summary, and SLA commitments", dataFields: ["Welcome Pack Sent: ☐ Yes  ☐ No", "SLA Documented: ☐ Yes  ☐ No"] },
      { task: "Log onboarding completion, assign to delivery team, and notify all stakeholders", dataFields: ["Onboarding Completed: ☐ Yes  ☐ No", "Handover Date: ____________________", "Stakeholders Notified: ☐ Yes  ☐ No"] },
      { task: "Flag any cross-border, sanctions, PEP, or adverse media issues for further review", dataFields: ["Sanctions Check: ☐ Clear  ☐ Flagged", "PEP Status: ☐ None  ☐ PEP  ☐ Family", "Adverse Media: ☐ None  ☐ Identified"] },
    ],
    "Document Review": [
      { task: "Verify document title, version number, effective date, and document ID", dataFields: ["Document ID: ____________________", "Version: ____________________", "Effective Date: ____________________"] },
      { task: "Confirm document classification, handling instructions, and access restrictions", dataFields: ["Classification: ☐ Public  ☐ Internal  ☐ Confidential  ☐ Restricted", "Handling Notes: ____________________"] },
      { task: "Review content for accuracy, completeness, and alignment with current procedures", dataFields: ["Accuracy Check: ☐ Pass  ☐ Fail", "Gaps Identified: ____________________"] },
      { task: "Check compliance with applicable regulations, standards, and legal requirements", dataFields: ["Regulatory Ref: ____________________", "Compliance Status: ☐ Compliant  ☐ Non-Compliant", "Notes: ____________________"] },
      { task: "Verify all references, cross-references, and hyperlinks are current and functional", dataFields: ["References Checked: _____", "Broken Links: _____", "Updated: ☐ Yes  ☐ No"] },
      { task: "Confirm review and approval signatures, dates, and authority levels are documented", dataFields: ["Reviewed By: ____________________", "Approved By: ____________________", "Approval Date: ____________________"] },
      { task: "Check formatting consistency — fonts, headings, spacing, numbering, headers/footers", dataFields: ["Formatting Check: ☐ Pass  ☐ Fail", "Issues: ____________________"] },
      { task: "Verify document is accessible to authorised personnel in the document management system", dataFields: ["System Location: ____________________", "Permissions Set: ☐ Yes  ☐ No", "Access Tested: ☐ Yes  ☐ No"] },
      { task: "Update version history, change log, and document control register", dataFields: ["Change Log Entry: ☐ Yes  ☐ No", "Previous Version Archived: ☐ Yes  ☐ No"] },
      { task: "Archive previous version in accordance with retention policy", dataFields: ["Retention Period: ____________________", "Archive Location: ____________________"] },
      { task: "Notify all relevant parties of the update and provide access instructions", dataFields: ["Notified By: ____________________", "Distribution List: ____________________", "Confirmation Received: ☐ Yes  ☐ No"] },
      { task: "Record review completion in document management system and governance log", dataFields: ["Completion Date: ____________________", "Next Review Due: ____________________", "Governance Log Updated: ☐ Yes  ☐ No"] },
    ],
  };

  const items = checklists[type] || checklists["Compliance Review"];

  const lines: string[] = [];
  items.forEach((item, i) => {
    lines.push(`☐  ${i + 1}.  ${item.task}`);
    if (item.dataFields) {
      item.dataFields.forEach(df => lines.push(`         ${df}`));
    }
    lines.push("");
  });

  return [
    {
      heading: "Governance & Scope",
      content: [
        `This operational checklist is issued by ${company} for its ${indLabel} operations under ${jurisdiction} regulatory jurisdiction.`,
        `Checklist Type: ${type}`,
        `Total Items: ${items.length}`,
        "Each item must be verified and completed in sequence before sign-off. Items with data capture fields require the responsible person to record the requested information at the time of verification.",
        "Any item that cannot be completed must be recorded as an exception with the reason and escalated to the responsible authority. Non-compliant items must be documented and assigned for corrective action before close-out.",
        "Completed checklists serve as evidence of operational compliance and must be retained in accordance with the document retention schedule.",
      ],
    },
    {
      heading: "Checklist Items",
      content: lines,
    },
    {
      heading: "Sign-Off & Verification",
      content: [
        "☐  All checklist items have been verified and completed",
        "☐  All data capture fields have been completed accurately",
        "☐  Any exceptions or non-compliant items have been documented and escalated",
        "☐  Supporting evidence has been attached or referenced",
        "",
        "Completed By: ____________________   Date: ____________________",
        "Signature: ____________________   Time: ____________________",
        "",
        "Reviewed By: ____________________   Date: ____________________",
        "Signature: ____________________   Time: ____________________",
        "",
        "Manager Approval: ____________________   Date: ____________________",
        "Signature: ____________________   Time: ____________________",
        "",
        "This checklist is a controlled operational document. Retain per the organisation's document retention schedule.",
        `Generated by ${company} · ${type} · ${indLabel} · ${jurisdiction}`,
      ],
    },
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
  const [companySize, setCompanySize] = useState(companyProfile?.companySize || "");
  const [industry, setIndustry] = useState<Industry>((companyProfile?.industry as Industry) || "ProfessionalServices");
  const [jurisdiction, setJurisdiction] = useState<string>(company?.jurisdiction || "UK");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [document, setDocument] = useState<{ sections: { heading: string; content: string[] }[] } | null>(null);
  const [savedSop, setSavedSop] = useState<SOP | null>(null);

  useEffect(() => { if (company) { setCompName(company.name); setJurisdiction(company.jurisdiction); } if (companyProfile?.industry) setIndustry(companyProfile.industry as Industry); if (companyProfile?.companySize) setCompanySize(companyProfile.companySize); }, [company, companyProfile]);
  useEffect(() => { router.prefetch("/armory"); }, [router]);
  useEffect(() => { if (company && company.subscriptionActive !== "yes" && (!company.focus || company.focus !== "checklists")) router.push("/"); }, [company, router]);
  useEffect(() => { setTitle(`${checklistType} — ${compName || "Your Organisation"}`); }, [checklistType, compName]);

  const startGeneration = async () => {
    setError("");
    if (!compName.trim()) { setError("Company name is required."); return; }
    const canDeduct = await deductCredit();
    if (!canDeduct && !session?.isDirector) { setError("Insufficient credits. Purchase more in Administration."); return; }
    setStep("loading"); setProgress(0); setLogs([]); setLogs((l) => [...l, "Generating checklist..."]);
    await new Promise((r) => setTimeout(r, 3000));
    setProgress(30); setLogs((l) => [...l, "Applying industry-specific content..."]);
    await new Promise((r) => setTimeout(r, 3000));
    setProgress(60); setLogs((l) => [...l, "Building checklist items with data capture fields..."]);
    await new Promise((r) => setTimeout(r, 3000));
    setProgress(85); setLogs((l) => [...l, "Formatting document..."]);
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
    <main id="main-content">
    <div className="app-content" style={{ marginLeft: "var(--sidebar-width)", padding: "80px 32px 40px", position: "relative", zIndex: 1 }}>
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
          <div className="checklist-form-grid">
            <div className="glass" style={{ padding: "24px" }}>
              <div className="card-header" style={{ marginBottom: "16px" }}>Organisation</div>
              <div style={{ marginBottom: "14px" }}><label>Company</label><input type="text" value={compName} onChange={(e) => setCompName(e.target.value)} placeholder="Company name" /></div>
              <div style={{ marginBottom: "14px" }}><label>Company Size</label><input type="number" value={companySize} onChange={(e) => setCompanySize(e.target.value)} placeholder="Number of employees" /></div>
              <div style={{ marginBottom: "14px" }}><label>Industry</label><select value={industry} onChange={(e) => setIndustry(e.target.value as Industry)}>{["ProfessionalServices","Finance","Healthcare","SaaS","Construction","Accountancy","E-Commerce","Manufacturing","Logistics","Education","Hospitality","RealEstate"].map(i => <option key={i} value={i}>{i.replace(/([A-Z])/g, " $1").trim()}</option>)}</select></div>
              <div><label>Jurisdiction</label><select value={jurisdiction} onChange={(e) => { setJurisdiction(e.target.value); setCompanyJurisdiction(e.target.value); }}>{Object.entries(JURISDICTION_REGULATORY).map(([key, val]) => <option key={key} value={key}>{val.name}</option>)}</select></div>
            </div>
            <div className="glass" style={{ padding: "24px" }}>
              <div className="card-header" style={{ marginBottom: "16px" }}>Checklist Type</div>
              <div className="checklist-type-grid">
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
              <div className="checklist-form-footer">
                <span style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>{session?.isDirector ? "Director override — unlimited" : `${company.credits} credits available · 1 required`}</span>
                {error && <p style={{ fontSize: "12px", color: "var(--danger)", margin: 0 }}>{error}</p>}
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
            <div className="checklist-preview-header">
              <span style={{ fontSize: "13px", color: "var(--success)" }}>Checklist generated successfully</span>
              <div className="checklist-preview-actions">
                <button onClick={downloadHtml} className="btn btn-secondary" style={{ fontSize: "12px" }}>Download HTML</button>
                <button onClick={() => router.push("/armory")} className="btn btn-secondary" style={{ fontSize: "12px" }}>View in Vault</button>
                <button onClick={() => setStep("done")} className="btn btn-primary" style={{ fontSize: "12px" }}>Confirm & Close</button>
              </div>
            </div>
            <div className="glass" style={{ padding: "32px", overflow: "hidden" }}>
              <div className="checklist-meta">
                <div><div className="stat-label">Document ID</div><div style={{ fontSize: "13px", color: "var(--text-primary)", fontFamily: "monospace", marginTop: "2px", wordBreak: "break-all" }}>{savedSop.id}</div></div>
                <div><div className="stat-label">Version</div><div style={{ fontSize: "13px", color: "var(--text-primary)", marginTop: "2px" }}>1.0</div></div>
                <div><div className="stat-label">Created</div><div style={{ fontSize: "13px", color: "var(--text-primary)", marginTop: "2px" }}>{savedSop.dateCreated}</div></div>
                <div><div className="stat-label">Owner</div><div style={{ fontSize: "13px", color: "var(--text-primary)", marginTop: "2px" }}>{savedSop.createdBy}</div></div>
                <div><div className="stat-label">Jurisdiction</div><div style={{ fontSize: "13px", color: "var(--accent)", marginTop: "2px" }}>{savedSop.jurisdiction}</div></div>
              </div>
              {document.sections.map((section, i) => (
                <div key={i} style={{ marginBottom: "20px" }}>
                  <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "8px", paddingBottom: "4px", borderBottom: "1px solid var(--glass-border)" }}>{section.heading}</h3>
                  <div className="checklist-section-content">
                    {section.content.map((line, j) => {
                      if (!line.trim()) return <div key={j} style={{ height: "4px" }} />;
                      if (line.includes("☐")) {
                        return <div key={j} className="checklist-item-row">{line}</div>;
                      }
                      if (line.includes("__________")) {
                        return <div key={j} className="checklist-data-row">{line}</div>;
                      }
                      return <p key={j} style={{ fontSize: "13px", lineHeight: "1.6", color: "var(--slate-300)", margin: 0 }}>{line}</p>;
                    })}
                  </div>
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
    </main>
  );
}
