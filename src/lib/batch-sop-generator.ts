import type { Industry, BusinessModel, Department, BatchSOP, BatchSOPSection, BatchInput } from "@/types";
import { generateHash } from "./utils";
import { getLegislation } from "./sop-generator";

type CompanySizeBand = "1-10" | "10-50" | "50+";

function getTierLabel(size: CompanySizeBand): string {
  const map: Record<CompanySizeBand, string> = { "1-10": "Core Execution Tier", "10-50": "Operational Control Tier", "50+": "Enterprise Governance Tier" };
  return map[size];
}

function headcountToBand(headcount: string): CompanySizeBand {
  const n = parseInt(headcount) || 5;
  if (n <= 20) return "1-10";
  if (n <= 200) return "10-50";
  return "50+";
}

function getStepCount(size: CompanySizeBand): number {
  const counts: Record<CompanySizeBand, number> = { "1-10": 13, "10-50": 16, "50+": 18 };
  return counts[size];
}

function now(): string {
  return new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
}

function docRef(title: string): string {
  return `SOP-BATCH-${title.substring(0, 3).toUpperCase()}-${new Date().getFullYear()}-${generateHash().substring(0, 6)}`;
}

function buildSection(heading: string, lines: string[]): BatchSOPSection {
  return { heading, content: lines };
}

function getIndustryContext(industry: Industry): { workflows: string; risks: string; examples: string; terminology: string } {
  const map: Record<string, { workflows: string; risks: string; examples: string; terminology: string }> = {
    SaaS: { workflows: "user onboarding, product activation, subscription management", risks: "churn risk, data breach, service downtime", examples: "A new user signs up via Stripe and is activated in HubSpot within 5 minutes of payment confirmation", terminology: "user, tenant, subscription, activation rate" },
    Construction: { workflows: "site induction, contractor management, equipment inspections", risks: "site safety breach, contractor non-compliance, equipment failure", examples: "The site supervisor verifies RAMS documentation before authorising a contractor to begin groundwork", terminology: "site, contractor, RAMS, safety briefing" },
    Accountancy: { workflows: "AML checks, client engagement, HMRC submissions", risks: "AML compliance failure, missed filing deadline, data breach", examples: "An engagement letter is issued via the Practice Management system immediately after AML clearance is confirmed", terminology: "client, engagement, AML, filing" },
    "E-Commerce": { workflows: "order processing, inventory management, returns handling", risks: "stock discrepancy, payment failure, return fraud", examples: "An order placed via Shopify automatically triggers inventory deduction and fulfilment ticket creation", terminology: "order, SKU, fulfilment, return rate" },
    Healthcare: { workflows: "patient intake, clinical records, treatment planning", risks: "patient data breach, clinical error, regulatory non-compliance", examples: "A patient is registered in CarePlanner with NHS number verified before the appointment is scheduled", terminology: "patient, clinician, record, CQC" },
    ProfessionalServices: { workflows: "client onboarding, project delivery, service agreements", risks: "scope creep, missed deliverable, client dissatisfaction", examples: "An onboarding checklist is completed in Asana before the kickoff meeting is scheduled", terminology: "client, engagement, deliverable, SOW" },
    Manufacturing: { workflows: "production scheduling, quality control, inventory management", risks: "production delay, quality defect, supply chain disruption", examples: "A batch is recorded in the ERP with QA hold status before release to warehouse", terminology: "batch, QA, BOM, lead time" },
    Logistics: { workflows: "shipment tracking, delivery confirmation, returns processing", risks: "delivery delay, lost shipment, carrier dispute", examples: "A parcel is scanned at the depot and tracking is updated in real-time via the carrier API", terminology: "shipment, carrier, waybill, ETA" },
    Finance: { workflows: "transaction processing, reconciliation, regulatory reporting", risks: "fraud, reconciliation failure, regulatory penalty", examples: "A trade is confirmed in Bloomberg and settled via counterparty within the T+2 window", terminology: "trade, settlement, reconciliation, FCA" },
    Education: { workflows: "student enrolment, course delivery, assessment grading", risks: "data protection breach, academic misconduct, attendance shortfall", examples: "A student is enrolled via the MIS and the timetable is generated before the term start date", terminology: "student, course, assessment, OFSTED" },
    Hospitality: { workflows: "booking management, guest check-in, housekeeping coordination", risks: "overbooking, health and safety breach, guest complaint", examples: "A booking is confirmed in the PMS and a room is assigned before the guest arrives", terminology: "guest, booking, PMS, occupancy" },
    RealEstate: { workflows: "property listing, viewing scheduling, offer management", risks: "compliance breach, offer withdrawal, chain collapse", examples: "A property is listed on Rightmove via the CRM and a viewing is booked within 24 hours", terminology: "property, listing, viewings, completion" },
  };
  return map[industry] || map.ProfessionalServices;
}

function getDepartmentSOPs(department: Department): { title: string; sopType: string; description: string }[] {
  const map: Record<string, { title: string; sopType: string; description: string }[]> = {
    "Executive Management": [
      { title: "Strategic Planning Procedure", sopType: "Strategic Governance", description: "Defines the annual strategic planning cycle, objective setting, and resource allocation framework for executive leadership." },
      { title: "KPI Reporting Procedure", sopType: "Performance Governance", description: "Standardised key performance indicator reporting process ensuring leadership receives accurate, timely operational data." },
      { title: "Management Meeting Procedure", sopType: "Governance", description: "Standard operating procedure for management meetings, including agenda setting, minute taking, and action tracking." },
      { title: "Business Performance Review Procedure", sopType: "Performance Governance", description: "Quarterly business performance review process evaluating operational effectiveness against strategic objectives." },
      { title: "Decision Management Procedure", sopType: "Governance", description: "Decision management framework categorising decisions by impact level and assigning appropriate authority." },
    ],
    Operations: [
      { title: "Client Onboarding Procedure", sopType: "Operational", description: "Standardised client onboarding process ensuring consistent, compliant engagement setup." },
      { title: "Service Delivery Procedure", sopType: "Operational", description: "Defines how services are delivered to clients, including work allocation, quality checks, and feedback collection." },
      { title: "Internal Task Management Procedure", sopType: "Operational", description: "Task management standards ensuring operational tasks are tracked, prioritised, and completed on time." },
      { title: "Quality Assurance Procedure", sopType: "Quality Management", description: "Quality assurance framework ensuring service outputs meet defined standards before client delivery." },
      { title: "Document Management Procedure", sopType: "Document Control", description: "Document control procedure covering creation, review, approval, and retention of operational documents." },
    ],
    Sales: [
      { title: "Lead Management Procedure", sopType: "Sales Operations", description: "Lead management process capturing, qualifying, and distributing sales leads." },
      { title: "Sales Pipeline Management Procedure", sopType: "Sales Operations", description: "Pipeline management standards tracking deals from qualification to close." },
      { title: "Proposal Management Procedure", sopType: "Sales Operations", description: "Proposal creation and delivery process ensuring consistent, professional proposals." },
      { title: "Client Handover Procedure", sopType: "Sales Operations", description: "Client handover process ensuring smooth transition from sales to delivery team." },
      { title: "Sales Follow-Up Procedure", sopType: "Sales Operations", description: "Post-sales follow-up procedure maintaining client relationships and identifying expansion opportunities." },
    ],
    Marketing: [
      { title: "Campaign Management Procedure", sopType: "Marketing Operations", description: "End-to-end marketing campaign management process from brief to performance analysis." },
      { title: "Content Approval Procedure", sopType: "Marketing Operations", description: "Content approval workflow ensuring all marketing content meets brand and compliance standards." },
      { title: "Marketing Reporting Procedure", sopType: "Marketing Operations", description: "Monthly marketing reporting process tracking campaign performance and ROI." },
      { title: "Lead Generation Procedure", sopType: "Marketing Operations", description: "Lead generation standards driving qualified leads through industry-specific channels." },
      { title: "Brand Governance Procedure", sopType: "Marketing Operations", description: "Brand governance framework ensuring consistent brand representation across all touchpoints." },
    ],
    "Customer Support": [
      { title: "Ticket Management Procedure", sopType: "Customer Operations", description: "Standardised ticket management process for handling customer inquiries." },
      { title: "Complaint Handling Procedure", sopType: "Customer Operations", description: "Formal complaint handling process ensuring investigation and resolution in compliance with regulations." },
      { title: "Customer Escalation Procedure", sopType: "Customer Operations", description: "Escalation management framework for issues that cannot be resolved at first line." },
      { title: "Customer Feedback Procedure", sopType: "Customer Operations", description: "Customer feedback collection and analysis process driving continuous improvement." },
      { title: "Service Recovery Procedure", sopType: "Customer Operations", description: "Service recovery framework for restoring customer trust after service failure." },
    ],
    Finance: [
      { title: "Invoicing Procedure", sopType: "Financial Operations", description: "Invoicing procedure ensuring timely, accurate billing for services rendered." },
      { title: "Expense Management Procedure", sopType: "Financial Operations", description: "Expense management process controlling employee spending and ensuring compliant reimbursement." },
      { title: "Accounts Receivable Procedure", sopType: "Financial Operations", description: "Accounts receivable management tracking incoming payments and managing collections." },
      { title: "Accounts Payable Procedure", sopType: "Financial Operations", description: "Accounts payable procedure managing supplier payments and maintaining vendor relationships." },
      { title: "Financial Reporting Procedure", sopType: "Financial Operations", description: "Monthly financial reporting process providing accurate, timely financial statements." },
    ],
    "Human Resources": [
      { title: "Employee Onboarding Procedure", sopType: "HR Operations", description: "Standardised employee onboarding process integrating new hires into operations." },
      { title: "Leave Management Procedure", sopType: "HR Operations", description: "Leave management process for compliant handling of all absence types." },
      { title: "Performance Review Procedure", sopType: "HR Operations", description: "Biannual performance review process aligned to role expectations." },
      { title: "Employee Offboarding Procedure", sopType: "HR Operations", description: "Employee offboarding process ensuring compliant, secure exit processing." },
      { title: "Training Management Procedure", sopType: "HR Operations", description: "Training management process ensuring employees maintain required skills." },
    ],
    "Information Technology": [
      { title: "User Access Management Procedure", sopType: "IT Operations", description: "User access management controlling provisioning, changes, and revocation of system access." },
      { title: "Incident Response Procedure", sopType: "IT Operations", description: "IT incident response process for security and operational incidents." },
      { title: "Password Management Procedure", sopType: "IT Operations", description: "Password management standards ensuring secure authentication across all systems." },
      { title: "Backup Management Procedure", sopType: "IT Operations", description: "Backup management process ensuring data recoverability." },
      { title: "System Change Management Procedure", sopType: "IT Operations", description: "System change management controlling changes to production systems." },
    ],
    Procurement: [
      { title: "Supplier Selection Procedure", sopType: "Procurement Operations", description: "Supplier selection process ensuring vendors are vetted and selected based on requirements." },
      { title: "Purchase Order Procedure", sopType: "Procurement Operations", description: "Purchase order processing controlling procurement spend and approval." },
      { title: "Vendor Performance Review Procedure", sopType: "Procurement Operations", description: "Quarterly vendor performance review process for key suppliers." },
    ],
    Compliance: [
      { title: "Compliance Monitoring Procedure", sopType: "Compliance Operations", description: "Compliance monitoring process ensuring ongoing adherence to regulatory requirements." },
      { title: "Internal Audit Procedure", sopType: "Compliance Operations", description: "Internal audit process for independent assessment of controls and processes." },
      { title: "Corrective Action Procedure", sopType: "Compliance Operations", description: "Corrective action management process addressing non-conformances." },
      { title: "Document Control Procedure", sopType: "Compliance Operations", description: "Document control process ensuring all documents are controlled, approved, and current." },
      { title: "Regulatory Review Procedure", sopType: "Compliance Operations", description: "Regulatory review process monitoring changes in regulations and assessing impact." },
    ],
    Logistics: [
      { title: "Shipment Management Procedure", sopType: "Logistics Operations", description: "End-to-end shipment management process for outbound goods." },
      { title: "Returns Processing Procedure", sopType: "Logistics Operations", description: "Standard returns processing procedure for customer returns." },
      { title: "Inventory Coordination Procedure", sopType: "Logistics Operations", description: "Inventory coordination process managing stock levels and movements." },
    ],
    Administration: [
      { title: "Document Management Procedure", sopType: "Administrative Operations", description: "Administrative document management covering filing, retrieval, and archiving." },
      { title: "Meeting Administration Procedure", sopType: "Administrative Operations", description: "Meeting administration covering scheduling, room booking, and minute management." },
      { title: "Record Retention Procedure", sopType: "Administrative Operations", description: "Record retention process for compliant storage and disposal of records." },
    ],
    "Training & Development": [
      { title: "Training Delivery Procedure", sopType: "Training Operations", description: "Standard approach to internal and external training delivery." },
      { title: "Competency Review Procedure", sopType: "Training Operations", description: "Competency management process ensuring staff maintain required skills." },
    ],
    "E-Commerce": [
      { title: "Order Fulfilment Procedure", sopType: "E-Commerce Operations", description: "End-to-end order fulfilment process for e-commerce orders." },
      { title: "Returns and Refunds Procedure", sopType: "E-Commerce Operations", description: "Customer-facing returns and refunds process." },
      { title: "Product Listing Management Procedure", sopType: "E-Commerce Operations", description: "Product listing management ensuring accurate, optimised product information." },
    ],
    "Management / Governance": [
      { title: "Risk Management Procedure", sopType: "Governance", description: "Risk management framework identifying, assessing, and mitigating operational risks." },
      { title: "Business Continuity Procedure", sopType: "Governance", description: "Business continuity process ensuring critical functions continue during disruption." },
      { title: "KPI Monitoring Procedure", sopType: "Governance", description: "KPI monitoring process tracking performance against strategic objectives." },
    ],
  };
  return map[department] || [];
}

const BATCH_STEP_FIELDS = ["Step Number", "Step Name", "Objective", "Responsible Role", "Required Inputs", "Required Systems", "Required Documents", "Detailed Actions", "Decision Points", "Compliance Requirements", "Quality Check", "Expected Output", "Evidence to Retain", "Common Errors", "Escalation Trigger"];

function getStepContext(industry: Industry, department: string): { trigger: string; inputs: string; actions: string; errors: string; compliance: string; quality: string } {
  const map: Record<string, { trigger: string; inputs: string; actions: string; errors: string; compliance: string; quality: string }> = {
    Finance: { trigger: "Receive client instruction, transaction request, or regulatory filing deadline", inputs: "Client instructions, supporting documentation, regulatory forms, prior correspondence", actions: "Verify client identity, check AML clearance, process transaction, update ledgers, file regulatory return", errors: "Incorrect client details, AML not cleared, wrong transaction code, missed filing deadline", compliance: "FCA conduct rules, AML Regulations 2017, SM&CR, data protection", quality: "Client details verified, AML check complete, transaction coded correctly, within SLA" },
    Healthcare: { trigger: "Receive patient referral, appointment request, or clinical result", inputs: "Patient demographics, referral letter, clinical notes, consent forms", actions: "Register patient, verify NHS number, schedule appointment, update clinical record, process results", errors: "Wrong patient record, incorrect NHS number, missed allergy flag, lost result", compliance: "CQC Fundamental Standards, NHS data security, information governance, UK GDPR", quality: "Patient identity confirmed, NHS number verified, consent recorded, record updated" },
    SaaS: { trigger: "Receive user sign-up, subscription request, or support ticket", inputs: "User email, company details, billing information, product selection", actions: "Create tenant account, verify email, configure permissions, activate subscription, send welcome", errors: "Duplicate account, wrong pricing tier, activation failure, permission misconfiguration", compliance: "UK GDPR, data minimisation, PECR consent, NIS Regulations, ISO 27001 controls", quality: "Email verified, pricing correct, permissions applied, welcome sent within SLA" },
    Construction: { trigger: "Receive site instruction, material delivery, or contractor arrival", inputs: "Site instructions, RAMS documentation, delivery notes, contractor credentials", actions: "Verify RAMS, induct contractor, inspect materials, log delivery, update site records", errors: "Outdated RAMS, missing PPE, wrong materials delivered, unqualified contractor", compliance: "CDM 2015, HSE regulations, Building Regulations, waste management", quality: "RAMS current, contractor qualified, materials match order, delivery logged" },
    Accountancy: { trigger: "Receive client instruction, year-end file, or HMRC deadline notification", inputs: "Client records, prior accounts, tax computations, HMRC correspondence", actions: "Complete AML checks, prepare accounts, compute tax, file returns, send to client for approval", errors: "AML not completed, wrong tax code, missed relief, late filing", compliance: "ICAEW Code of Ethics, AML Regs 2017, HMRC standards, money laundering reporting", quality: "AML cleared, accounts agree to TB, tax computed correctly, filed before deadline" },
    "E-Commerce": { trigger: "Receive customer order, return request, or inventory alert", inputs: "Customer details, order items, payment confirmation, shipping address", actions: "Verify stock, process payment, pick items, pack order, arrange shipping, update inventory", errors: "Out of stock, wrong item picked, address error, payment declined", compliance: "Consumer Contracts Regulations, distance selling, data protection, delivery SLAs", quality: "Stock confirmed, payment captured, address verified, tracking generated" },
    ProfessionalServices: { trigger: "Receive client inquiry, signed engagement, or project brief", inputs: "Client contact details, signed agreement, project scope, reference materials", actions: "Set up client in CRM, assign team, schedule kick-off, prepare onboarding pack, send welcome", errors: "Wrong contact details, missing agreement, incorrect scope, delayed kick-off", compliance: "Engagement letter in place, AML checks complete, data protection, conflicts check", quality: "Agreement signed, AML cleared, team assigned, kick-off scheduled" },
    Manufacturing: { trigger: "Receive production order, material delivery, or quality alert", inputs: "Production schedule, bill of materials, work instructions, batch records", actions: "Confirm materials, set up equipment, run production, inspect first-off, monitor output", errors: "Wrong material, incorrect setup, out-of-spec output, machine downtime", compliance: "ISO 9001, health and safety, environmental permits, product safety", quality: "Materials checked, first-off approved, process within spec, output recorded" },
    Logistics: { trigger: "Receive shipment, delivery instructions, or return request", inputs: "Shipment manifest, delivery schedule, carrier details, customer contact", actions: "Log shipment, assign carrier, generate label, dispatch with tracking, confirm delivery", errors: "Wrong address, missed collection, lost parcel, incorrect tracking", compliance: "Carrier terms, insurance requirements, dangerous goods regs, delivery SLAs", quality: "Address confirmed, carrier assigned, tracking generated, delivery confirmed" },
    Education: { trigger: "Receive enrolment application, course request, or assessment result", inputs: "Student details, application form, prior qualifications, course selection", actions: "Register student, verify qualifications, enrol in course, schedule classes, issue materials", errors: "Duplicate record, wrong course, missing prerequisites, timetable clash", compliance: "UK GDPR, safeguarding, exam board rules, data retention", quality: "Qualifications verified, course confirmed, timetable issued, records updated" },
    Hospitality: { trigger: "Receive booking, guest check-in, or service request", inputs: "Guest details, booking reference, payment card, preferences", actions: "Confirm booking, assign room, check guest in, process payment, coordinate housekeeping", errors: "Overbooking, wrong room type, payment failure, lost booking", compliance: "Health and safety, fire safety, food hygiene, data protection, licensing", quality: "Booking confirmed, room ready, payment taken, preferences noted" },
    RealEstate: { trigger: "Receive property instruction, viewing request, or offer", inputs: "Property details, seller instructions, buyer information, mortgage details", actions: "List property, arrange viewings, receive offers, progress sale, update CRM", errors: "Wrong price, missed viewing, lost offer, chain breakdown", compliance: "Consumer Protection Regs, money laundering, estate agency rules, data protection", quality: "Property listed correctly, offers recorded, AML checks done, chain managed" },
  };
  return map[industry] || { trigger: "Receive work request, instruction, or trigger event", inputs: "Work request details, customer information, reference materials, supporting documentation", actions: "Log request, verify details, process work, record output, confirm completion", errors: "Missing information, incorrect details, processing error, incomplete records", compliance: "Applicable legislation and regulatory requirements for the jurisdiction and sector", quality: "Details verified, processing complete, records accurate, output confirmed" };
}

function generateProcedureSteps(
  title: string, company: string, systems: string[], department: string,
  industry: Industry, size: CompanySizeBand, sopType: string
): string[][] {
  const primarySys = systems[0] || "the designated system";
  const ctx = getStepContext(industry, department);

  function s(num: string, name: string, obj: string, role: string, inputs: string, reqSys: string, docs: string, actions: string, decisions: string, compliance: string, quality: string, output: string, evidence: string, errors: string, escalation: string): string[] {
    return [num, name, obj, role, inputs, reqSys, docs, actions, decisions, compliance, quality, output, evidence, errors, escalation];
  }

  const steps: string[][] = [];

  steps.push(s("1",
    `Receive and Register ${title} Request`,
    `To capture the incoming work request for ${title}, confirm it is legitimate and complete, and register it in ${primarySys} with a unique tracking reference.`,
    size === "1-10" ? `${department} Operator` : size === "10-50" ? `${department} Duty Officer` : `${department} Processing Operator`,
    `${ctx.inputs}. Contact name, contact method, date received.`,
    `${primarySys}${systems.length > 1 ? `, ${systems[1]}` : ""}`,
    `${title} Request Form, Customer Record (if existing), Service Agreement or Contract Reference`,
    `1. Open ${primarySys} and navigate to the work intake module.\n2. Identify the new request — email, phone, portal submission, or internal trigger.\n3. Enter the customer or requestor name, contact details, and company name.\n4. Record the date received, required completion date, and priority level.\n5. Attach any supporting documents received with the request.\n6. Generate a unique reference number and confirm it is visible in the system.\n7. Assign the request to the appropriate team or person based on workflow rules.\n8. Send an acknowledgement to the requestor confirming receipt and reference number.`,
    `IF the request is outside agreed scope THEN notify supervisor before proceeding. IF the requestor is a new customer THEN create a preliminary record and flag for AML checks.`,
    `Record lawful basis for processing any personal data. ${size === "10-50" || size === "50+" ? "Conflicts check must be completed before acceptance." : ""}`,
    "Mandatory fields complete. Supporting documents attached. Reference generated. Requestor acknowledged within SLA.",
    `Registered request with unique reference in ${primarySys}. Acknowledgement sent.`,
    `System record in ${primarySys}. Request acknowledgement sent to requestor. Supporting documents stored against reference.`,
    "Incorrect customer details. Missing supporting documents. Wrong priority. Duplicate reference. Delayed acknowledgement.",
    "System unavailable — notify IT and use manual log. Request outside scope — escalate to supervisor. Time-sensitive — flag for immediate processing."));

  steps.push(s("2",
    `Validate Information and Input Completeness`,
    `To verify that all required information has been received, is accurate, and is sufficient to process the ${title} request without delays caused by missing data.`,
    size === "1-10" ? `${department} Operator` : size === "10-50" ? `${department} Processing Officer` : `${department} Vetting Officer`,
    "Registered request details, supporting documents, customer records, any prior correspondence or reference files.",
    `${primarySys}${systems.length > 1 ? `, ${systems[1]}` : ""}`,
    "Validation Checklist, Data Completeness Criteria, Mandatory Fields Register",
    `1. Open the registered request in ${primarySys}.\n2. Review each mandatory field against the completeness criteria.\n3. Check all supporting documents are present, legible, and correctly formatted.\n4. Verify customer details against existing records where available.\n5. Flag any missing, incomplete, or inconsistent information.\n6. Contact the requestor to obtain missing items — record the request and response deadline.\n7. Update the request record with validation status: Complete, Incomplete, or Awaiting Information.\n8. If complete, mark the request as validated and ready for processing.`,
    `IF information is incomplete THEN notify requestor with specific list of missing items and set status to Awaiting Information. IF information is inconsistent with existing records THEN flag for review before proceeding.`,
    `${ctx.compliance}. Ensure no personal data is processed beyond what is necessary for validation.`,
    "All mandatory fields present and accurate. Supporting documents complete and legible. No data inconsistencies found.",
    "Validated request record with completeness status. Requestor notified of any missing items.",
    `Validation record in ${primarySys}. Communication log with requestor (if follow-up required).`,
    "Missing fields not identified. Inconsistent data not flagged. Supporting documents not checked. Incorrect validation status assigned.",
    "Requestor unresponsive within 48 hours — escalate to supervisor. Critical information missing — do not proceed without escalation approval."));

  steps.push(s("3",
    `Prepare Processing Environment and Resources`,
    `To set up all systems, templates, reference materials, and resources needed to process the ${title} request before commencing the operational work.`,
    size === "1-10" ? `${department} Operator` : size === "10-50" ? `${department} Processing Officer` : `${department} Resource Coordinator`,
    "Validated request record, procedure specification, approved templates, system access credentials.",
    `${primarySys}${systems.slice(1).map(s => `, ${s}`).join("")}`,
    `${title} Procedure Specification, Approved Templates, Resource Checklist, ${size === "50+" ? "Work Package Authorisation" : ""}`,
    `1. Open the validated request record in ${primarySys}.\n2. Access the ${title} procedure specification and identify all required templates and tools.\n3. Open required templates in ${primarySys} or relevant business applications.\n4. Confirm all data fields in the templates match the information received.\n5. Gather any reference materials, pricing guides, regulatory tables, or knowledge base articles needed.\n6. ${size === "10-50" || size === "50+" ? "Check resource availability — confirm personnel, equipment, and third-party services are available." : "Confirm all materials are accessible and ready."}\n7. Prepare a work folder or digital workspace for the processing activities.\n8. Confirm the setup is complete and ready for processing to begin.`,
    `IF a required template or reference is outdated THEN retrieve the current version from the document management system. IF a required system is unavailable THEN follow the manual fallback procedure.`,
    `${ctx.compliance}. Use only approved templates. Unauthorised modifications to templates are not permitted.`,
    "Correct templates selected. Reference materials current. All systems accessible. Workspace configured.",
    "Ready-to-process work package with all templates, reference materials, and resources assembled and verified.",
    `Resource checklist completed. Template version numbers recorded. Workspace reference in ${primarySys}.`,
    "Wrong template selected. Outdated reference materials used. Missing resources not identified. System access not confirmed.",
    "Required template not available — contact document control. System unavailable — implement manual fallback. Resource shortfall — notify supervisor for reallocation."));

  steps.push(s("4",
    `Execute Primary Processing Actions`,
    `To perform the core operational work for ${title}, following the defined sequence of actions and capturing results at each stage.`,
    size === "1-10" ? `${department} Operator` : size === "10-50" ? `${department} Processing Officer` : `${department} Processing Specialist`,
    "Validated request, prepared templates, reference materials, customer data, processing instructions.",
    `${primarySys}${systems.length > 1 ? `, ${systems.slice(1).join(", ")}` : ""}`,
    `${title} Procedure Steps, Processing Work Instructions, ${size === "50+" ? "Segregation of Duties Matrix" : ""}`,
    `1. Open the work package in ${primarySys}.\n2. Follow the ${title} processing instructions in sequence — do not skip or reorder steps.\n3. Enter or process the first data set — customer details, financial information, case details, or product specifications.\n4. Apply any calculations, validations, or transformations required by the procedure.\n5. ${size === "10-50" || size === "50+" ? "Where dual entry is required, confirm both entries match before proceeding." : "Verify each entry against source documents."}\n6. Complete all primary processing fields and confirm the system accepts the data without errors.\n7. Save the work in progress — do not close the record until all primary processing is complete.\n8. Record the time taken and any observations about the processing activity.`,
    `IF the system rejects an entry THEN review the error message and correct the data. IF a required approval is needed before proceeding THEN pause and submit for approval. IF the requestor has special instructions THEN note them and follow accordingly.`,
    `${ctx.compliance}. Record all processing steps in the system audit log. Never bypass mandatory fields or validation rules.`,
    "All primary processing completed. Data entered matches source documents. No system validation errors. Processing time within target.",
    `Completed primary processing record with all data entered, validated, and saved in ${primarySys}.`,
    `Processing log in ${primarySys}. Source documents retained against the reference. Audit trail of all data entries.`,
    "Data entry errors. Skipped mandatory fields. Processing steps out of sequence. Calculations incorrect. Validation overrides used without authorisation.",
    "System error during processing — save work and contact IT. Data discrepancy found — stop and investigate. Processing time exceeds SLA — notify supervisor."));

  steps.push(s("5",
    `Verify Processing Accuracy and Completeness`,
    `To check that all primary processing actions were completed correctly, no errors were introduced, and the output is ready for the next stage.`,
    size === "1-10" ? `${department} Operator (self-check)` : size === "10-50" ? `${department} Quality Checker` : `${department} Quality Assurance Officer`,
    "Completed processing record, source documents, reference materials, quality criteria checklist.",
    `${primarySys}`,
    "Quality Verification Checklist, Processing Specification, Source Documents",
    `1. Open the completed processing record in ${primarySys}.\n2. Compare each data entry against the source documents — check for transcription errors.\n3. ${size === "10-50" || size === "50+" ? "Re-calculate any totals, percentages, or derived values independently." : "Spot-check calculations and data transformations."}\n4. Confirm all mandatory fields are populated and formatted correctly.\n5. Check that any attachments or supporting documents are correctly linked.\n6. ${size === "50+" ? "Verify segregation of duties — the processing operator and checker must be different individuals." : "If errors are found, correct them and note the correction."}\n7. Record the verification outcome as Pass or Fail in the system.\n8. If Pass, mark the record as verified and ready for the next step. If Fail, log the errors and return for correction.`,
    `IF verification fails THEN return the record to the processing operator with clear error descriptions. IF the same error appears on multiple records THEN flag a systemic issue to the supervisor.`,
    `${ctx.compliance}. Quality checks must be completed before any output is released. ${size === "50+" ? "Independent verification is mandatory — processing operator cannot verify own work." : ""}`,
    "All data verified against source. No transcription errors. Mandatory fields complete. Attachments correct.",
    `Verified processing record with Pass/Fail determination recorded in ${primarySys}. Quality checklist completed.`,
    "Quality verification record with checker identity and timestamp. Error log (if corrections were needed).",
    "Verification skipped or rushed. Errors not caught. Self-verification where independent check was required. Corrections not re-verified.",
    "Failed verification twice on same item — escalate to supervisor. Systemic error pattern — notify quality manager. Dispute on verification outcome — refer to supervisor."));

  steps.push(s("6",
    `Handle Exceptions, Corrections, and Edge Cases`,
    `To identify, document, and resolve any exceptions, errors, or non-standard situations that arose during processing, ensuring they are properly recorded and resolved before the work proceeds.`,
    size === "1-10" ? `${department} Operator` : size === "10-50" ? `${department} Processing Officer` : `${department} Exception Handler`,
    "Failed verification record, error descriptions, source documents, correction instructions.",
    `${primarySys}, ${size === "50+" ? "Exception Management System" : ""}`,
    "Exception Log, Correction Procedure, Error Classification Guide, Escalation Matrix",
    `1. Review the errors or exceptions identified during verification.\n2. Determine the root cause of each error — data entry, system issue, missing information, or procedural gap.\n3. Correct each error following the correction procedure — do not overwrite original records without an audit trail.\n4. ${size === "10-50" || size === "50+" ? "Document the correction in the exception log with the original value, corrected value, reason, and authorisation." : "Note the correction and the reason in the processing notes."}\n5. If the correction requires re-verification, submit the corrected record for a fresh quality check.\n6. Log any non-standard situations or edge cases in the exception register.\n7. If the exception indicates a procedural gap, recommend a procedure update for the next review cycle.\n8. Confirm all corrections are complete and the record is ready to proceed.`,
    `IF the correction requires supervisor approval THEN pause and submit for approval before making the change. IF the error was caused by a system issue THEN log with IT support. IF the exception reveals a training gap THEN notify the training coordinator.`,
    `${ctx.compliance}. All corrections must be auditable — never delete or overwrite records without a documented reason and authorisation.`,
    "Root cause identified. Correction made with audit trail. Re-verification completed if required. Exception logged.",
    "Corrected record with full audit trail. Exception log entry with root cause, correction, and authorisation.",
    `Exception log entry. Correction audit trail in ${primarySys}. Re-verification record (if applicable).`,
    "Corrections made without audit trail. Root cause not investigated. Same error repeated without escalation. Authorisation bypassed.",
    "Correction requires system-level access — escalate to IT. Error indicates compliance breach — notify compliance officer. Repeated errors — escalate to department lead."));

  steps.push(s("7",
    `Complete Secondary and Follow-Up Processing`,
    `To perform any remaining processing activities, follow-up actions, or downstream steps required to complete the ${title} request, including generating outputs for review.`,
    size === "1-10" ? `${department} Operator` : size === "10-50" ? `${department} Processing Officer` : `${department} Processing Specialist`,
    "Verified processing record, exception log, output templates, reference materials.",
    `${primarySys}${systems.slice(1).map(s => `, ${s}`).join("")}`,
    `${title} Output Specification, Document Templates, ${size === "50+" ? "Quality Plan" : ""}`,
    `1. Open the verified and corrected record in ${primarySys}.\n2. Complete any secondary processing steps — additional calculations, cross-references, or downstream updates.\n3. Generate the primary output document using the approved template.\n4. Complete all output fields, summary sections, and required statements.\n5. ${size === "10-50" || size === "50+" ? "Attach all supporting documentation, evidence, and reference materials to the output package." : "Attach supporting documents and reference materials."}\n6. Review the completed output for formatting, completeness, and professional presentation.\n7. ${size === "50+" ? "Apply document classification and retention labelling as per the information governance policy." : "Save the output with the correct file naming convention."}\n8. Mark the record as Output Complete and ready for quality review.`,
    `IF the output requires specialist review (legal, technical, compliance) THEN flag for specialist review before proceeding. IF the output needs regulatory formatting THEN confirm compliance with regulatory standards.`,
    `${ctx.compliance}. Outputs must be complete, accurate, and formatted correctly before submission for quality review.`,
    "Secondary processing complete. Output document generated correctly. All supporting materials attached. Formatting checked.",
    "Completed output package ready for quality review, with all supporting documentation compiled and saved.",
    "Output document. Supporting evidence file. Document classification and retention label applied.",
    "Incomplete output. Missing supporting documents. Wrong template used. Formatting errors. Incorrect retention label.",
    "Output rejected by system validation — correct and resubmit. Specialist review identifies issues — address before quality review. Output deadline missed — escalate."));

  steps.push(s("8",
    `Conduct Quality Review and Approval`,
    `To perform a final quality review of the completed output package, confirm it meets the required standards, and obtain formal approval for release.`,
    size === "1-10" ? `${department} Lead / Senior Operator` : size === "10-50" ? `${department} Quality Reviewer` : `${department} Quality Assurance Manager`,
    "Completed output package, source documents, quality criteria, approval authority matrix.",
    `${primarySys} Approval Workflow Module`,
    `Quality Review Checklist, Approval Authority Matrix, ${title} Output Specification`,
    `1. Open the completed output package in ${primarySys}.\n2. Review the output against the quality criteria — accuracy, completeness, formatting, compliance.\n3. ${size === "10-50" || size === "50+" ? "Conduct an independent review — do not review work you personally processed." : "Review with a fresh perspective — check for any errors or omissions."}\n4. Verify all supporting evidence is present and correctly referenced.\n5. ${size === "50+" ? "Confirm segregation of duties — reviewer must be independent of the processing operator." : ""}\n6. Record the review outcome — Approve, Approve with Conditions, or Reject.\n7. If approved, submit the output through the formal approval workflow in ${primarySys}.\n8. If rejected, return to the processing operator with clear reasons and required corrections.`,
    `IF the output does not meet quality standards THEN reject with specific reasons and return for correction. IF conditions are attached to approval THEN record them and confirm before release. IF the approver is unavailable THEN follow the deputy approval process.`,
    `${ctx.compliance}. No output may be released without formal quality review and approval. ${size === "10-50" || size === "50+" ? "Independent review is mandatory." : ""}`,
    "Quality criteria met. Supporting evidence complete. Approval obtained from authorised person. Conditions addressed.",
    "Approved output package with quality review record, approval chain, and authorisation timestamp.",
    "Quality review checklist completed. Approval record with approver identity, date, and conditions. Output package marked as Approved.",
    "Review not conducted. Approval obtained from unauthorised person. Conditions not addressed. Evidence not checked.",
    "Review identifies compliance issue — notify compliance officer. Approver unavailable — follow deputy process. Output rejected twice — escalate to department head."));

  steps.push(s("9",
    `Deliver Completed Outputs and Confirm Receipt`,
    `To deliver the completed ${title} output to the customer or requestor, confirm receipt, and provide any necessary instructions or context for using the output.`,
    size === "1-10" ? `${department} Operator` : size === "10-50" ? `${department} Processing Officer` : `${department} Client Delivery Coordinator`,
    "Approved output package, delivery instructions, customer contact details, distribution list.",
    `${primarySys}, Email System, ${size === "50+" ? "Client Portal" : ""}`,
    "Delivery Checklist, Customer Contact Record, Distribution Confirmation Log",
    `1. Open the approved output package in ${primarySys}.\n2. ${size === "10-50" || size === "50+" ? "Prepare the delivery message with output summary, actions required, and contact for questions." : "Prepare a delivery email or notification with the output summary."}\n3. Send the output to the customer or requestor through the agreed channel (email, portal, hard copy).\n4. Confirm the delivery was successful and the customer has received the output.\n5. ${size === "50+" ? "For regulated outputs, request written acknowledgement of receipt and understanding." : "Request acknowledgement of receipt."}\n6. Log the delivery date, time, and method in ${primarySys}.\n7. If the customer has follow-up questions, answer them or assign to the appropriate person.\n8. Mark the delivery as Complete in the system.`,
    `IF the customer does not acknowledge receipt within the expected timeframe THEN follow up by phone or alternative channel. IF the customer rejects the output THEN investigate the reason and escalate if necessary.`,
    `${ctx.compliance}. Output delivery must comply with any regulatory deadlines or service level agreements. ${size === "50+" ? "Written acknowledgement required for regulated outputs." : ""}`,
    "Output delivered through agreed channel. Customer acknowledged receipt. Delivery logged in system.",
    `Completed delivery with customer acknowledgement and delivery confirmation recorded in ${primarySys}.`,
    `Delivery confirmation. Customer acknowledgement. Delivery record in ${primarySys}. Distribution log completed.`,
    "Wrong customer contacted. Output sent to wrong address. Delivery not confirmed. Acknowledgement not obtained. SLA missed.",
    "Customer rejects output — investigate and escalate to supervisor. Customer unreachable — document attempts and escalate. Regulatory delivery deadline at risk — escalate immediately."));

  steps.push(s("10",
    `Update Records, Close Out, and Notify Stakeholders`,
    `To finalise all system records, close the work request, notify relevant stakeholders of completion, and ensure the record is ready for archival.`,
    size === "1-10" ? `${department} Operator` : size === "10-50" ? `${department} Processing Officer` : `${department} Records Coordinator`,
    "Completed work record, delivery confirmation, stakeholder list, close-out checklist.",
    `${primarySys}, ${size === "50+" ? "Governance Dashboard, Stakeholder Notification System" : "Communication Tools"}`,
    `Close-Out Checklist, Stakeholder Notification Template, ${size === "50+" ? "Governance Close-Out Report" : ""}`,
    `1. Open the completed work record in ${primarySys}.\n2. Update the record status to Completed — add the completion date, time, and final notes.\n3. ${size === "10-50" || size === "50+" ? "Notify internal stakeholders — supervisor, downstream teams, and any other parties who need to know the work is complete." : "Notify any stakeholders who need to know the work is complete."}\n4. ${size === "50+" ? "Generate the close-out summary report including processing time, exceptions handled, and quality outcome." : ""}\n5. Complete the close-out checklist and confirm all actions are done.\n6. Ensure the record has no open actions, pending approvals, or unresolved exceptions.\n7. Lock the record against further editing (if the system supports it) or mark as Final.\n8. Confirm the record is ready for the archival step.`,
    `IF there are open actions or unresolved exceptions THEN do not close the record until they are resolved. IF the customer has outstanding queries THEN ensure they are assigned before closing.`,
    `${ctx.compliance}. Records must be complete, accurate, and locked before archival. Open actions must not remain on completed records.`,
    "All actions complete. No open items. Stakeholders notified. Record status set to Completed.",
    "Completed and locked work record with all actions finalised, stakeholders notified, and close-out checklist signed off.",
    `Close-out checklist. Stakeholder notifications. Completion record in ${primarySys}. Close-out summary (if applicable).`,
    "Record closed with open actions. Stakeholders not notified. Close-out checklist incomplete. Record not locked.",
    "Open actions cannot be resolved before deadline — escalate to supervisor. Stakeholder disputes completion — investigate. Record integrity concern — notify compliance."));

  steps.push(s("11",
    `Compile Evidence File and Verify Completeness`,
    `To assemble all records, documents, and evidence generated during the ${title} process into a structured evidence file that demonstrates complete and compliant execution.`,
    size === "1-10" ? `${department} Operator` : size === "10-50" ? `${department} Quality Reviewer` : `${department} Records Administrator`,
    "Work record, processing log, communications, approvals, delivery confirmation, quality records.",
    `${primarySys} Document Management System`,
    `Evidence File Index, ${size === "50+" ? "Evidence Quality Criteria, Retention Schedule" : "Retention Schedule"}`,
    `1. Open the completed work record in ${primarySys} and navigate to the evidence management section.\n2. Collect all records generated during the process — initiation, validation, processing, verification, corrections, approvals, delivery, and close-out.\n3. ${size === "10-50" || size === "50+" ? "Check each document for readability, completeness, and correct file naming." : "Check documents are present and legible."}\n4. Organise the evidence in a logical structure indexed against the procedure steps.\n5. ${size === "50+" ? "Generate a verification checksum or hash for the evidence file to detect unauthorised modification." : ""}\n6. Apply the correct retention classification based on the retention schedule.\n7. Confirm the evidence file is complete — no step is missing supporting evidence.\n8. Save the evidence file in the document management system.`,
    `IF evidence is missing for a step THEN document the gap and the reason. IF the evidence file contains errors THEN correct before finalising.`,
    `${ctx.compliance}. Personal data in evidence must be retained no longer than necessary. Evidence must be stored in unalterable format.`,
    "Evidence complete for all steps. Documents legible and correctly named. Retention classification applied.",
    "Complete indexed evidence file stored in document management system with correct retention.",
    "Evidence file index. Document management system record. Verification hash/certificate. Retention classification applied.",
    "Missing evidence not identified. Incorrect retention classification. Documents not indexed. Evidence file incomplete.",
    "Critical evidence cannot be located — escalate to IT for recovery. Retention classification unclear — consult compliance officer. File integrity concern — escalate."));

  steps.push(s("12",
    `Archive Records per Retention Policy`,
    `To formally archive the completed ${title} record with the correct retention period, confirm the archival is compliant with policy, and generate the archival certificate.`,
    size === "1-10" ? `${department} Operator` : size === "10-50" ? `${department} Records Officer` : `${department} Records Manager`,
    "Completed work record, evidence file, archival checklist, retention schedule.",
    `${primarySys} Document Management System, Records Management Module`,
    `Archival Checklist, Retention Schedule, ${size === "50+" ? "Archival Certificate Template" : ""}`,
    `1. Confirm the record is complete and locked — no further edits are expected.\n2. ${size === "10-50" || size === "50+" ? "Apply the retention classification from the retention schedule — confirm the retention period and trigger date." : "Apply the retention classification."}\n3. Configure any automated deletion or review triggers in the document management system.\n4. ${size === "50+" ? "Generate the archival certificate with reference, title, dates, classification, and evidence hash." : "Create the archival record in the document management system."}\n5. Save the archival certificate or record in the permanent company archive.\n6. Confirm the archived record is accessible only to authorised personnel with logged access.\n7. ${size === "50+" ? "Notify the records manager that the archival is complete." : ""}\n8. Update the master records register with the archival status and location.`,
    `IF the retention classification is unclear THEN consult the compliance officer or retention schedule owner. IF the system cannot apply the retention trigger THEN set a manual review date and escalate to IT.`,
    `${ctx.compliance}. Archived records must not be modified or deleted outside the disposal process.`,
    "Retention classification applied. Archive confirmed in system. Access controls verified. Certificate generated (if applicable).",
    "Archived record with correct retention classification, access controls, and archival certificate in permanent company archive.",
    "Archival certificate. Master records register update. Retention classification applied. Deletion/review triggers configured.",
    "Wrong retention period applied. Record not locked before archival. Access controls not configured. Archival not logged.",
    "System cannot apply retention — escalate to IT. Retention period expired but legal hold may apply — consult compliance officer. Archival failed — escalate."));

  steps.push(s("13",
    `Confirm Completion with Customer and Obtain Feedback`,
    `To formally close the ${title} engagement with the customer, confirm their satisfaction, obtain feedback, and identify any follow-up actions or improvement opportunities.`,
    size === "1-10" ? `${department} Lead / Owner` : size === "10-50" ? `${department} Account Manager` : `${department} Client Relationship Manager`,
    "Completed output, delivery confirmation, customer contact details, feedback form.",
    `${primarySys}, ${size === "50+" ? "Customer Relationship Management System, Survey Platform" : "Email / Communication Tools"}`,
    `Completion Confirmation Template, Feedback Form, ${size === "50+" ? "Customer Satisfaction Survey" : ""}`,
    `1. Contact the customer to confirm they have received and are satisfied with the completed ${title} output.\n2. ${size === "10-50" || size === "50+" ? "Ask if they need any clarification, additional work, or further support." : "Ask if they have any questions or need further support."}\n3. Request formal confirmation of completion — email acknowledgement, signed completion certificate, or portal confirmation.\n4. Record the completion confirmation in ${primarySys}.\n5. ${size === "50+" ? "Send a customer satisfaction survey or feedback request." : "Ask for informal feedback on the process."}\n6. Record any feedback received — positive or negative — against the work record.\n7. If the customer identifies issues, log them for resolution and assign to the appropriate person.\n8. Mark the overall engagement as Closed in ${primarySys}.`,
    `IF the customer is not satisfied THEN investigate the issue, resolve or escalate, and do not close until resolved. IF the customer requests additional work THEN create a new work request rather than extending the current one.`,
    `${ctx.compliance}. Customer completion confirmation should be retained as evidence of service delivery and contractual fulfilment.`,
    "Customer confirms satisfaction. Completion confirmation obtained. Feedback recorded. Follow-up actions assigned if needed.",
    "Confirmed completion with customer satisfaction confirmation and feedback recorded against closed work record.",
    `Customer completion confirmation (email, certificate, portal record). Feedback record. Closed work record in ${primarySys}.`,
    "Completion not formally confirmed. Customer dissatisfaction not addressed. Feedback not recorded. Follow-up actions not assigned.",
    "Customer disputes completion — escalate to account manager. Serious dissatisfaction — escalate to department head. Complaint received — follow complaint procedure."));

  if (size === "10-50" || size === "50+") {
    const n = steps.length + 1;
    steps.push(s(String(n),
      `Supervisor Review and Independent Quality Verification`,
      `To conduct an independent supervisory review of the completed work, verify quality standards were met, and authorise the final closure of the record.`,
      `${department} Supervisor / Team Lead`,
      "Completed work record, quality checklist, exception log, evidence file, close-out report.",
      `${primarySys}, Quality Management System`,
      `Supervisory Review Checklist, ${size === "50+" ? "Performance Metrics Report" : ""}, Team Performance Log`,
      `1. Review the complete work record — processing, quality checks, exceptions, approvals, delivery, and closure.\n2. Verify that quality standards were met at every stage — spot-check records where necessary.\n3. ${size === "50+" ? "Review the exception log — confirm all exceptions were properly resolved or escalated." : ""}\n4. Confirm segregation of duties was maintained (processing operator ≠ checker ≠ approver).\n5. Assess the overall quality and timeliness of the completed work.\n6. Record the supervisory review outcome — Approved, Minor Observations, or Requires Improvement.\n7. If observations are raised, agree corrective actions with the team member and set review dates.\n8. If approved, authorise the final closure of the record and submit for archival.`,
      `IF the review identifies quality concerns THEN return for correction with specific observations. IF a team member requires additional training THEN notify the training coordinator.`,
      `${ctx.compliance}. Supervisory review confirms compliance with procedure, regulatory requirements, and quality standards.`,
      "Work record reviewed. Quality standards met. Exceptions resolved. Observations addressed. Closure authorised.",
      "Completed supervisory review with approval, observations (if any), and closure authorisation.",
      "Supervisory review record. Quality spot-check records. Observation log with corrective actions.",
      "Review not conducted. Quality issues missed. Observations not documented. Closure authorised without full review.",
      "Systemic quality issues identified — escalate to department head. Team member performance concern — escalate to HR. Compliance concern — notify compliance officer."));
  }

  if (size === "50+") {
    const n = steps.length + 1;
    steps.push(s(String(n),
      `Compliance Confirmation and Regulatory Alignment Check`,
      `To conduct a final compliance review of the completed work, confirm alignment with all applicable legal and regulatory requirements, and sign off the compliance record.`,
      `Compliance Officer / ${department} Compliance Reviewer`,
      "Completed work record, compliance checklist, regulatory obligation register, evidence file.",
      `${primarySys}${systems.length > 1 ? `, ${systems[1]} Compliance Module` : ""}`,
      `Compliance Obligation Register, ${ctx.compliance} Checklist`,
      `1. Review the complete work record against the compliance obligation register.\n2. Confirm data protection compliance — lawful basis recorded, data minimised, subject rights considered.\n3. Verify regulatory filings or notifications were made (if applicable to the ${industry} sector).\n4. Check that the evidence file contains all required compliance documentation.\n5. Confirm the retention classification matches regulatory requirements.\n6. Record any compliance observations or recommendations for future processes.\n7. Sign off the compliance record — or flag non-compliance for escalation.\n8. Update the compliance monitoring dashboard with the review outcome.`,
      `IF a compliance gap is identified THEN assess materiality and escalate to compliance manager. IF a regulatory filing was missed THEN notify the responsible authority within the permitted timeframe and document the corrective action.`,
      `${ctx.compliance}. Non-compliance must be escalated immediately to the compliance manager and relevant stakeholders.`,
      "Compliance obligations met. Data protection confirmed. Regulatory alignment verified. Evidence complete.",
      "Signed compliance confirmation record with alignment verified against all applicable legal and regulatory obligations.",
      "Compliance checklist completed. Compliance sign-off record. Regulatory alignment confirmation. Evidence of regulatory filings (if applicable).",
      "Compliance check not performed. Regulatory obligation missed. Data protection non-compliance not identified. Sign-off given without verification.",
      "Material non-compliance identified — escalate to compliance manager and legal. Regulatory breach — notify relevant authority. Evidence of non-compliance — preserve and escalate."));

    const n2 = steps.length + 1;
    steps.push(s(String(n2),
      `Management Review and Strategic Alignment Confirmation`,
      `To present the completed work to management for review, confirm alignment with strategic objectives, and authorise any broader improvements arising from lessons learned.`,
      `${department} Head / Executive Sponsor`,
      "Completed work summary, performance metrics, exception analysis, compliance record, team feedback.",
      `${primarySys} Governance Dashboard, ${size === "50+" ? "Executive Reporting System" : ""}`,
      "Management Review Checklist, Strategic Objectives Document, Performance Dashboard",
      "1. Review the work completion summary — scope, quality, timeliness, exceptions, and compliance outcome.\n2. Compare performance against KPIs — completion rate, SLA compliance, first-pass quality, exception rate.\n3. Assess whether the work aligns with the organisation's strategic and operational objectives.\n4. Review the exception analysis — identify patterns, root causes, and systemic issues.\n5. Consider improvement recommendations from the team and feedback from the customer.\n6. Approve the work as strategically aligned or identify areas requiring corrective action.\n7. Assign any strategic actions or improvement initiatives to responsible owners with target dates.\n8. Sign off the management review record.",
      `IF strategic misalignment is identified THEN document the gap and assign corrective actions. IF systemic issues are found THEN initiate a process improvement review.`,
      `${ctx.compliance}. Management review confirms the work supports the organisation's strategic objectives and governance framework.`,
      "Strategic alignment confirmed. KPIs reviewed. Exceptions analysed. Improvement actions assigned (if any).",
      "Completed management review with strategic alignment confirmation, KPI assessment, and improvement actions.",
      "Management review record. Signed management review checklist. Improvement action register update.",
      "Review not conducted. Strategic misalignment not identified. Improvement opportunities missed. Actions assigned without follow-up.",
      "Significant strategic misalignment — escalate to board or executive committee. Critical systemic risk identified — initiate immediate review. Customer complaint at executive level — escalate."));
  }

  while (steps.length < getStepCount(size)) {
    const n = steps.length + 1;
    steps.push(s(String(n),
      `${title} — Supplementary Processing Step ${n}`,
      `To complete any remaining processing activities required for the ${title} request, ensuring nothing is omitted before closure.`,
      size === "1-10" ? `${department} Operator` : size === "10-50" ? `${department} Processing Officer` : `${department} Processing Specialist`,
      "Work record, reference materials, processing instructions, completion checklist.",
      `${primarySys}`,
      `${title} Supplementary Work Instructions`,
      `1. Open the work record in ${primarySys}.\n2. Review the completion checklist to identify any remaining actions.\n3. Complete each remaining action in sequence.\n4. Verify each action produces the expected output.\n5. Update the record with the completed actions.\n6. Confirm no actions remain outstanding.\n7. Save the updated record.\n8. Proceed to the close-out step.`,
      "IF any action cannot be completed THEN document the reason and escalate to supervisor.",
      `${ctx.compliance}. All actions must be completed and documented before closure.`,
      "All supplementary actions completed. Record updated. No outstanding items.",
      "Completed supplementary processing with all actions finalised and recorded.",
      "Supplementary processing log. Updated work record. Completion checklist signed off.",
      "Supplementary steps skipped. Actions not documented. Record not updated.",
      "Remaining actions cannot be completed — escalate to supervisor for decision."));
  }

  return steps;
}

function buildSOP(
  title: string, department: Department, input: BatchInput,
  description: string, sopType: string
): BatchSOP {
  const band = headcountToBand(input.companySize);
  const jurisdiction = input.jurisdiction || "UK";
  const leg = getLegislation(jurisdiction);
  const sys = input.softwareStack.length > 0 ? input.softwareStack : ["internal system"];
  const sysStr = sys.join(", ");
  const primarySys = sys[0] || "the designated system";
  const ref = docRef(title);
  const today = now();
  const tierLabel = getTierLabel(band);
  const ctx = getIndustryContext(input.industry);
  const totalSteps = getStepCount(band);

  const sections: BatchSOPSection[] = [];

  sections.push(buildSection("01. Document Control", [
    `Document Title: ${title}`,
    `Document Reference: ${ref}`,
    `Version: 1.0`,
    `Classification: ${sopType} — Controlled Document`,
    `Status: Active`,
    `Effective Date: ${today}`,
    `Owner: ${input.companyName} — ${department}`,
    `Author: SOPMaster Governance Platform`,
    `Location: Document Management System — ${primarySys}`,
    `This document is a controlled operational procedure. Unauthorised modification invalidates its verification hash. Any printed copy is uncontrolled unless stamped "CONTROLLED COPY" by the document control officer.`,
  ]));

  sections.push(buildSection("02. Governance Profile", [
    `Organisation: ${input.companyName}`,
    `Industry Sector: ${input.industry}`,
    `Department: ${department}`,
    `Jurisdiction: ${jurisdiction}`,
    `Organisational Scale: ${band === "1-10" ? "Startup / Small Business" : band === "10-50" ? "Growing Business" : "Enterprise"} (${input.companySize} personnel)`,
    `Governance Tier: ${tierLabel}`,
    `Procedure Classification: ${sopType}`,
    `Document Hierarchy: This procedure sits within the ${input.companyName} Operational Governance Framework and is subordinate to the Corporate Governance Policy.`,
    `Regulatory Perimeter: All activities governed by this procedure fall within the regulatory jurisdiction of ${jurisdiction} and must comply with the applicable legislative framework detailed in Section 05.`,
  ]));

  sections.push(buildSection("03. Executive Summary", [
    `This Standard Operating Procedure has been prepared by a Principal Operations Consultant for ${input.companyName}. It defines the mandatory protocol for "${title}" within the ${department} function and establishes a ${totalSteps}-step execution framework designed to be implementation-ready, audit-ready, and commercially valuable.`,
    `The procedure operates within the ${input.industry} sector under ${jurisdiction} jurisdiction and is classified as ${sopType}. It applies to all personnel engaged in executing, supervising, quality assuring, and governing the activities it describes.`,
    `This document answers four questions: how the work is actually performed, how quality is maintained, how compliance is demonstrated, and how evidence is retained. A new employee with no prior knowledge should be able to complete the task safely, consistently, accurately, and compliantly using only this document.`,
    `Adherence to this procedure is mandatory. Non-compliance exposes ${input.companyName} to regulatory sanction, operational failure, audit qualification, and legal liability. All exceptions must be documented, justified, and escalated through the defined governance channels.`,
    `Description: ${description}`,
  ]));

  sections.push(buildSection("04. Purpose and Scope", [
    `This Standard Operating Procedure serves as the single source of truth for how "${title}" must be conducted, supervised, recorded, and governed within the ${department} function at ${input.companyName}. It is designed to be handed to a new employee who has no prior knowledge of this process and enable them to complete the work correctly.`,
    `The procedure achieves four objectives. First, it explains how the work is actually performed — the specific actions, systems, and decisions required at each step. Second, it embeds quality checks into every operational activity so errors are caught before they reach the customer. Third, it integrates compliance requirements directly into the workflow rather than treating them as a separate review step. Fourth, it specifies the evidence that must be retained at each stage to demonstrate complete and compliant execution.`,
    `Scope — Inclusions: All ${department} activities directly related to ${title}. All interactions with ${sysStr} used in execution. All personnel with assigned roles in the procedure governance matrix. All records and evidence generated during procedure execution.`,
    `Scope — Exclusions: Emergency or business continuity scenarios where this procedure would impede the required response speed. Strategic decisions concerning the establishment, modification, or discontinuation of this procedure.`,
  ]));

  sections.push(buildSection("05. Applicable Legislation", [
    `Data Protection and Privacy: ${leg.dataProtection}. All processing of personal data within this procedure must be conducted in accordance with the data protection principles, with a documented lawful basis, and subject to the data subject rights framework.`,
    `Employment and Labour Law: ${leg.employment}. All procedures that involve employment-related decisions, working time, or staff management must comply with the applicable employment legislation framework.`,
    `Health and Safety: ${leg.healthSafety}. All procedures with workplace safety implications must incorporate the required risk assessments, control measures, and documentation.`,
    `Corporate and Commercial Law: ${leg.corporate}. All procedures involving corporate decisions, contracting, or financial commitments must comply with corporate governance requirements.`,
    `Anti-Discrimination: ${leg.antiDiscrimination}. All procedures must be executed without discrimination and must promote equality of opportunity in accordance with applicable law.`,
    `Sector-Specific Regulations: ${leg.sectorSpecific.join("; ")}. Personnel executing this procedure must be aware of and comply with the sector-specific regulatory requirements that apply to their role and activity.`,
  ]));

  sections.push(buildSection("06. Roles and Responsibilities", [
    ...(band === "1-10" ? [
      `${department} Lead (Director or Founder): Owns execution of all procedure steps and is the single accountable party for ${title}. Liability for regulatory non-compliance or operational failure rests with this role. May delegate execution to trained personnel but retains accountability.`,
      `${input.industry} Operations Lead: Responsible for technical execution of ${input.industry}-specific activities within this procedure. Reports to the ${department} Lead and maintains operational records.`,
      `All personnel assigned to roles in this procedure must read, acknowledge, and comply with its requirements. Any deviation requires documented authorisation from the ${department} Lead.`,
    ] : band === "10-50" ? [
      `Department Lead: Accountable for procedure adherence within the ${department} department. Reviews exceptions, signs off on completions, and reports operational performance to the executive team.`,
      `Procedure Operator: Executes the procedure steps in accordance with the defined specification. Maintains accurate execution records in ${primarySys} and reports exceptions immediately to the responsible supervisor.`,
      `Supervisor: Reviews completed work outputs, approves standard completions, manages exception handling within delegated authority, and escalates issues beyond their authority level within the defined SLA.`,
      `Compliance Reviewer: Conducts periodic compliance audits of procedure execution, flags regulatory gaps to the Department Lead, and maintains the compliance evidence repository.`,
    ] : [
      `Executive Sponsor: Provides strategic oversight, resource allocation authority, and ultimate accountability for ${title} compliance. Receives escalated issues and confirms strategic alignment.`,
      `Department Head: Accountable for procedure adherence within the ${department} department. Reports operational performance and escalated issues to the Executive Sponsor.`,
      `Supervisor: Reviews execution outputs, manages team performance, conducts quality verification, and escalates issues beyond delegated authority within the defined SLA.`,
      `Procedure Operator: Executes the procedure steps, maintains detailed and accurate records, and reports exceptions immediately upon identification.`,
      `Compliance Officer: Audits procedure adherence, maintains the compliance obligation register, conducts regulatory impact assessments for procedure changes.`,
      `${input.industry} Technical Lead: Provides authoritative technical guidance for ${input.industry}-specific procedure execution and confirms technical outputs meet professional and regulatory standards.`,
    ]),
  ]));

  sections.push(buildSection("07. Required Systems and Documentation", [
    `The following systems are required to execute this procedure. Personnel must have completed the prescribed training and hold current access credentials before assuming any operational role.`,
    ...sys.map((s, i) => `${i + 1}. ${s} — ${i === 0 ? "Primary workflow management and audit logging system. All procedure steps are initiated, tracked, and recorded in this system." : i === 1 ? "Secondary system supporting specific procedure activities. Interfaces with the primary system for data exchange." : `Supplementary system used for specialised aspects of the ${department} workflow.`}`),
    `The following documents must be current and accessible before execution: Procedure Specification Document, Quality Management Plan, Risk Assessment and Control Matrix, Compliance Obligation Register, Training and Competency Records, and the Organisational Authority Matrix.`,
  ]));

  sections.push(buildSection("08. Procedure", [
    `This section contains the complete ${totalSteps}-step execution procedure for "${title}". Each step must be executed in sequence. No step may be skipped, reordered, or omitted without documented authorisation from the responsible approver as defined in the authority matrix.`,
    ...generateProcedureSteps(title, input.companyName, sys, department, input.industry, band, sopType).map(step => {
      return BATCH_STEP_FIELDS.map((f, fi) => `[${f}] ${step[fi] || ""}`).join("\n");
    }),
    `---`,
    `Upon completion of all ${totalSteps} steps, the operator confirms that the procedure execution is complete and submits the procedure record for quality verification and approval per the defined workflow.`,
  ]));

  sections.push(buildSection("09. Quality Assurance", [
    `The quality assurance framework for "${title}" operates at two levels. Level 1 — Operational Quality Assurance: The operator performs self-verification at each procedure step, confirming that the step output meets quality criteria before proceeding. Level 2 — Independent Quality Verification: A reviewer independent of the execution verifies the complete output against the quality specification and completes a verification checklist.`,
    `Quality Standards: All outputs must meet the following minimum standards: 100 percent data accuracy, complete documentation for every procedure step, compliance with all applicable regulatory requirements, timeliness within defined SLA targets, and verifiable evidence for every output.`,
    `Quality Metrics: First-pass quality rate (target 95 percent), defect rate (target below 5 percent), rework rate (target below 3 percent). Quality metrics are reviewed monthly by the quality assurance function.`,
  ]));

  sections.push(buildSection("10. Key Performance Indicators", [
    `KPI 1 — Completion Rate: Percentage of procedure initiations that complete all steps. Target: ${band === "1-10" ? "100" : "99"} percent. Threshold: ${band === "1-10" ? "90" : "95"} percent.`,
    `KPI 2 — SLA Compliance Rate: Percentage of steps completed within the defined SLA. Target: 98 percent. Threshold: 90 percent.`,
    `KPI 3 — First-Pass Quality Rate: Percentage of outputs passing quality verification without rework. Target: 95 percent. Threshold: 85 percent.`,
    `KPI 4 — Exception Rate: Percentage of executions generating exceptions. Target: Below 5 percent. Threshold: Below 10 percent.`,
    `KPI 5 — Audit Readiness Score: Percentage of evidence files meeting completeness criteria. Target: 100 percent. Threshold: 90 percent.`,
    `KPI performance is reported to the governance committee through the monthly operational performance report. Persistent underperformance triggers a procedure review and remediation plan.`,
  ]));

  sections.push(buildSection("11. Record Retention", [
    `All records generated by this procedure must be retained in accordance with the following schedule. Premature destruction of records is a compliance breach and must be reported immediately.`,
    `Retention Period: ${leg.retention}`,
    `Archival: Records must be archived within 30 days of procedure closure. Archived records must be stored in the document management system with restricted access.`,
    `Destruction: Records due for destruction must be reviewed and approved by the Department Lead before deletion. Destruction certificates must be retained for 7 years.`,
  ]));

  sections.push(buildSection("12. Version Control", [
    `Version History: Version 1.0 — Initial release. Effective ${today}.`,
    `Review Cycle: This procedure must be reviewed annually or within 30 days of any regulatory change affecting its content, whichever is sooner.`,
    `Document Owner: The ${department} Department Head owns this procedure and is responsible for its periodic review and update.`,
    `Change Control: All changes to this procedure must be approved through the document control process. Unauthorised modification is prohibited and will be subject to disciplinary action.`,
  ]));

  return {
    id: `BATCH-${generateHash()}`,
    title,
    department,
    industry: input.industry,
    content: sections,
  };
}

function buildSimplifiedSOP(
  title: string, department: Department, input: BatchInput,
  description: string, sopType: string
): BatchSOP {
  const jurisdiction = input.jurisdiction || "UK";
  const leg = getLegislation(jurisdiction);
  const sys = input.softwareStack.length > 0 ? input.softwareStack : ["internal system"];
  const primarySys = sys[0] || "the designated system";
  const ref = docRef(title);
  const today = now();
  const band = headcountToBand(input.companySize);

  const sections: BatchSOPSection[] = [];

  sections.push(buildSection("01. Document Control", [
    `Document Title: ${title}`,
    `Document Reference: ${ref}`,
    `Version: 1.0`,
    `Classification: ${sopType} — Controlled Document`,
    `Status: Active`,
    `Effective Date: ${today}`,
    `Owner: ${input.companyName} — ${department}`,
    `Author: SOPMaster Governance Platform`,
    `Location: Document Management System — ${primarySys}`,
  ]));

  sections.push(buildSection("02. Governance Profile", [
    `Organisation: ${input.companyName}`,
    `Industry Sector: ${input.industry}`,
    `Department: ${department}`,
    `Jurisdiction: ${jurisdiction}`,
    `Organisational Scale: ${input.companySize} personnel`,
    `Procedure Classification: ${sopType}`,
  ]));

  sections.push(buildSection("03. Purpose and Scope", [
    `This procedure defines the standard approach for "${title}" within the ${department} function at ${input.companyName}. It establishes a clear, repeatable process that all personnel must follow to ensure consistency, compliance, and operational efficiency.`,
    `Scope includes all ${department} activities directly related to ${title}, including document handling, record keeping, and stakeholder coordination. This procedure applies to all personnel assigned to roles within the ${department} function.`,
  ]));

  sections.push(buildSection("04. Applicable Legislation", [
    `Data Protection: ${leg.dataProtection}. All personal data processed under this procedure must be handled in accordance with the data protection principles.`,
    `Employment: ${leg.employment}. Where this procedure involves staff-related activities, compliance with employment legislation is mandatory.`,
    `Health and Safety: ${leg.healthSafety}. Workplace safety obligations apply where relevant to the procedure activities.`,
    `Retention: ${leg.retention}.`,
  ]));

  sections.push(buildSection("05. Roles and Responsibilities", [
    `${department} Lead: Accountable for procedure adherence, exception handling, and reporting to management.`,
    `Procedure Operator: Executes the procedure steps and maintains accurate records in ${primarySys}.`,
    `All personnel must read, acknowledge, and comply with this procedure. Deviations require documented authorisation from the ${department} Lead.`,
  ]));

  sections.push(buildSection("06. Procedure", [
    `The following steps define the execution sequence for "${title}". Each step must be completed in order.`,
    `Step 1: Initiation — The operator accesses ${primarySys} and confirms the required documents, templates, and materials are available. Any missing items are flagged to the ${department} Lead.`,
    `Step 2: Execution — The operator works through the prescribed workflow in ${primarySys}, completing each action and recording the outcome before proceeding to the next.`,
    `Step 3: Verification — The operator reviews the completed work for accuracy and completeness. Any errors or omissions are corrected before the output is finalised.`,
    `Step 4: Approval — The completed work is submitted to the ${department} Lead or designated approver for sign-off. The approver reviews and approves within the defined SLA.`,
    `Step 5: Filing and Record Keeping — The final output and all supporting records are saved in the document management system with the correct file naming convention and retention classification.`,
    `Step 6: Notification — Relevant stakeholders are notified of completion. The notification includes a summary of outcomes and any follow-up actions required.`,
  ]));

  sections.push(buildSection("07. Record Retention", [
    `All records generated by this procedure must be retained in accordance with the applicable retention schedule.`,
    `Retention Period: ${leg.retention}`,
    `Destruction of records requires documented approval from the ${department} Lead. Destruction certificates must be retained for the minimum statutory period.`,
  ]));

  sections.push(buildSection("08. Version Control", [
    `Version 1.0 — Initial release. Effective ${today}.`,
    `This procedure must be reviewed annually or within 30 days of any regulatory change affecting its content.`,
    `The ${department} Department Head owns this procedure and is responsible for its periodic review and update.`,
  ]));

  return {
    id: `BATCH-${generateHash()}`,
    title,
    department,
    industry: input.industry,
    content: sections,
  };
}

const DEPARTMENT_GENERATORS: Record<string, (input: BatchInput) => BatchSOP[]> = {
  "Executive Management": (input) => getDepartmentSOPs("Executive Management").map(s => buildSOP(s.title, "Executive Management", input, s.description, s.sopType)),
  "Operations": (input) => getDepartmentSOPs("Operations").map(s => buildSOP(s.title, "Operations", input, s.description, s.sopType)),
  "Sales": (input) => getDepartmentSOPs("Sales").map(s => buildSOP(s.title, "Sales", input, s.description, s.sopType)),
  "Marketing": (input) => getDepartmentSOPs("Marketing").map(s => buildSOP(s.title, "Marketing", input, s.description, s.sopType)),
  "Customer Support": (input) => getDepartmentSOPs("Customer Support").map(s => buildSOP(s.title, "Customer Support", input, s.description, s.sopType)),
  "Finance": (input) => getDepartmentSOPs("Finance").map(s => buildSOP(s.title, "Finance", input, s.description, s.sopType)),
  "Human Resources": (input) => getDepartmentSOPs("Human Resources").map(s => buildSOP(s.title, "Human Resources", input, s.description, s.sopType)),
  "Information Technology": (input) => getDepartmentSOPs("Information Technology").map(s => buildSOP(s.title, "Information Technology", input, s.description, s.sopType)),
  "Procurement": (input) => getDepartmentSOPs("Procurement").map(s => buildSOP(s.title, "Procurement", input, s.description, s.sopType)),
  "Compliance": (input) => getDepartmentSOPs("Compliance").map(s => buildSOP(s.title, "Compliance", input, s.description, s.sopType)),
  "Logistics": (input) => getDepartmentSOPs("Logistics").map(s => buildSOP(s.title, "Logistics", input, s.description, s.sopType)),
  "Administration": (input) => getDepartmentSOPs("Administration").map(s => buildSimplifiedSOP(s.title, "Administration", input, s.description, s.sopType)),
  "Training & Development": (input) => getDepartmentSOPs("Training & Development").map(s => buildSOP(s.title, "Training & Development", input, s.description, s.sopType)),
  "E-Commerce": (input) => getDepartmentSOPs("E-Commerce").map(s => buildSOP(s.title, "E-Commerce", input, s.description, s.sopType)),
  "Management / Governance": (input) => getDepartmentSOPs("Management / Governance").map(s => buildSOP(s.title, "Management / Governance", input, s.description, s.sopType)),
};

export function generateBatchPackage(input: BatchInput): { sops: BatchSOP[]; totalCount: number; departmentCounts: Record<string, number> } {
  const allSOPs: BatchSOP[] = [];
  const departmentCounts: Record<string, number> = {};

  for (const dept of input.departments) {
    const generator = DEPARTMENT_GENERATORS[dept];
    if (generator) {
      const sops = generator(input);
      allSOPs.push(...sops);
      departmentCounts[dept] = sops.length;
    }
  }

  return { sops: allSOPs, totalCount: allSOPs.length, departmentCounts };
}
