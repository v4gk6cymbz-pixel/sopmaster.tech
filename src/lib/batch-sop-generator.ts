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
  const counts: Record<CompanySizeBand, number> = { "1-10": 8, "10-50": 10, "50+": 13 };
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

function generateProcedureSteps(
  title: string, company: string, systems: string[], department: string,
  industry: Industry, size: CompanySizeBand, sopType: string
): string[][] {
  const primarySys = systems[0] || "the designated system";
  const secondarySys = systems.length > 1 ? systems[1] : primarySys;
  const stepCount = getStepCount(size);
  const ctx = getIndustryContext(industry);
  const band = size === "1-10" ? "startup and small business" : size === "10-50" ? "growing business" : "enterprise";
  const dpmt = department.toLowerCase();

  const steps: string[][] = [];

  const step0 = [
    `Step 1: Procedure Initiation and Access Verification`,
    `WHY: Confirming system availability and user access rights before commencing the ${title} procedure eliminates the risk of execution delays caused by avoidable technical or authorization failures.`,
    `The responsible person accesses ${primarySys} using their assigned credentials and verifies that their user profile carries the full permissions necessary to execute every step within the ${title} scope. Where ${secondarySys} interfaces with ${primarySys} as part of the ${dpmt} workflow, cross-system connectivity is confirmed by performing a handshake check or generating a test transaction. Any system returning an error, timeout, or access denial is logged immediately in the IT incident register, and the procedure is paused until the issue is resolved. For organisations operating in the ${band} category, this step also requires confirmation that the procedure version displayed in ${primarySys} matches the current authorised version from the document control register.`,
    `* Access ${primarySys} and confirm user credentials are valid`,
    `* Verify user profile carries all required permissions for the full procedure scope`,
    `* Perform cross-system connectivity checks between ${primarySys} and ${secondarySys}`,
    `* Log any system errors, timeouts, or access denials in the IT incident register`,
    `* Confirm the procedure version in ${primarySys} matches the authorised document control register`,
    `* Record system check results including timestamps and response codes in the procedure log`,
    `HOW TO VERIFY: Completed system verification checklist with timestamps, user identity confirmation, and system response codes stored in the procedure audit file.`,
    `REAL-WORLD EXAMPLE: ${company} confirms that ${primarySys} returns an operational status code and the operator's system access is verified against the current authorised user matrix before the ${title} procedure is initiated.`,
  ];
  steps.push(step0);

  const step1 = [
    `Step 2: Document Version Verification and Authorisation Confirmation`,
    `WHY: Using an outdated or unauthorised procedure version exposes ${company} to operational inconsistency, regulatory non-compliance, and audit qualification.`,
    `The operator retrieves the ${title} procedure document from the document management system and cross-references the document control number against the master document register. The version number, approval date, and next review date are confirmed as current. All supporting forms, templates, and checklists referenced in the procedure are located and checked for version alignment. Where the ${industry} sector requires specific document versioning protocols, the operator confirms compliance with those requirements. For ${band} organisations, this step includes verifying that any jurisdiction-specific addenda are the correct versions for the current compliance period. Discrepancies are escalated to the document control officer within one hour.`,
    `* Retrieve the ${title} procedure from the document management system`,
    `* Cross-reference the document control number against the master document register`,
    `* Confirm version number, approval date, and next review date are current`,
    `* Verify all supporting documents have matching version numbers`,
    `* Escalate any discrepancies to the document control officer within one hour`,
    `HOW TO VERIFY: Version confirmation recorded in the procedure log. Any discrepancies logged in the document non-compliance register with escalation timestamp.`,
    `REAL-WORLD EXAMPLE: At ${company}, the operator confirms the ${title} procedure is at version 1.0 approved on ${now()} before commencing the first execution step.`,
  ];
  steps.push(step1);

  const step2 = [
    `Step 3: Stakeholder Identification and Notification`,
    `WHY: Uninformed stakeholders create downstream delays, misaligned expectations, and handover failures that compromise the effectiveness of the ${title} procedure.`,
    `The operator identifies all parties with a defined interest in the ${title} procedure outcome. This includes the procedure owner, the responsible supervisor, downstream process owners, the quality assurance contact, and any external parties such as clients or regulators who require notification. Using ${primarySys}, the operator sends a standardised notification specifying the procedure reference, expected duration, systems affected, and any actions required from the recipient. Stakeholders confirm receipt within the defined response window. For ${band} organisations, this notification forms part of the governance record and must be retained accordingly. Non-responding stakeholders are followed up within two hours.`,
    `* Identify all mandatory and optional stakeholders from the stakeholder register`,
    `* Send standardised notification via ${primarySys} with procedure reference and expected duration`,
    `* Request receipt confirmation within the defined response window`,
    `* Follow up with non-responding stakeholders within two hours`,
    `* Record all notifications and acknowledgements in the communication log`,
    `HOW TO VERIFY: Stakeholder notification log with timestamps, acknowledgement receipts, and escalation records for non-responding parties.`,
    `REAL-WORLD EXAMPLE: The ${department} team at ${company} notifies the compliance officer, quality assurance lead, and downstream process owners before commencing the ${title} procedure.`,
  ];
  steps.push(step2);

  const step3 = [
    `Step 4: Resource and Materials Preparation`,
    `WHY: Incomplete or unavailable resources are the leading cause of procedure delays, rework, and quality failures in ${industry} operations.`,
    `The operator reviews the resource requirements defined in the procedure specification and assembles each item against the resource checklist. For digital resources, this includes confirming that the correct templates, data sets, and system configurations are loaded in ${primarySys}. For physical resources, the operator confirms availability and checks them against the specification. Where ${industry} sector regulations impose specific requirements on materials or data, the operator verifies compliance before proceeding. In ${band} organisations, this step extends to confirming that third-party or outsourced resources have been ordered with delivery timelines that do not conflict with the procedure schedule. Any resource failing the readiness check is flagged, and the operator determines whether a substitute is available or the procedure must be delayed.`,
    `* Review resource requirements from the procedure specification`,
    `* Confirm digital resources are loaded in ${primarySys} with correct configurations`,
    `* Verify physical resources against the specification`,
    `* Flag any resource that fails the readiness check`,
    `* Document resource substitutions with supervisory approval`,
    `HOW TO VERIFY: Completed resource readiness checklist with confirmation status for each required resource. Substitution records with approval references.`,
    `REAL-WORLD EXAMPLE: ${company} verifies that all required templates, data sets, and ${primarySys} configurations are available before the ${department} team begins the ${title} procedure.`,
  ];
  steps.push(step3);

  const step4 = [
    `Step 5: Pre-Execution Risk Assessment`,
    `WHY: Identifying and controlling operational risks before execution prevents regulatory breaches, financial loss, and reputational damage that could otherwise arise from unmanaged exposure.`,
    `The operator accesses the risk register in ${primarySys} and identifies the risk profile applicable to the ${title} procedure. Each risk listed in the procedure's risk register is reviewed to confirm that assigned control measures are in place and operational. For risks rated medium or higher, the operator verifies that the control owner has confirmed effectiveness within the required review period. New risks identified since the last review are documented and assigned a provisional rating. Where ${industry} sector regulations prescribe specific risk assessment methodologies, those methodologies are followed. Residual risks that fall outside the organisational risk appetite are escalated to the responsible authority before the procedure proceeds.`,
    `* Access the risk register in ${primarySys} and identify relevant risks`,
    `* Review each risk to confirm control measures are operational`,
    `* Verify control effectiveness for medium-rated and higher risks`,
    `* Document any new risks identified since the last review`,
    `* Escalate residual risks exceeding organisational risk appetite`,
    `HOW TO VERIFY: Completed pre-execution risk assessment with control confirmation status, residual risk log, and escalation records.`,
    `REAL-WORLD EXAMPLE: ${company} reviews five operational risks associated with the ${title} procedure, confirms all controls are effective, and documents residual risk acceptance before proceeding.`,
  ];
  steps.push(step4);

  const step5 = [
    `Step 6: Procedure Execution`,
    `WHY: Structured execution in the defined sequence ensures consistent, auditable, and repeatable outcomes across every instance of the ${title} procedure.`,
    `The operator accesses the procedure workflow in ${primarySys} and initiates a new execution instance. All required inputs are loaded into the system, including customer data, reference materials, specifications, and authorisation codes. The operator confirms that each input matches the expected format, value range, and quality standard. Where ${industry} sector practice requires dual data entry or independent verification of inputs, this is completed before the first processing action. Each sub-step is executed in the prescribed order, and outputs are captured in ${primarySys} before the next sub-step commences. Any calculations, transformations, or data manipulations are performed and independently verified where the control framework requires segregation. The operator monitors processing against the expected timeline and flags any sub-step exceeding its allocated window.`,
    `* Initiate a new execution instance in ${primarySys} with a unique reference identifier`,
    `* Load all required inputs and confirm they meet quality standards`,
    `* Execute each sub-step in the prescribed order`,
    `* Capture outputs in ${primarySys} before proceeding to the next sub-step`,
    `* Apply defined decision criteria and document the rationale for each decision`,
    `* Flag any sub-step exceeding its allocated processing window`,
    `HOW TO VERIFY: Completed procedure execution log with timestamped sub-step records, decision rationales, and verification results.`,
    `REAL-WORLD EXAMPLE: The ${department} operator at ${company} completes all processing steps in ${primarySys}, capturing each output before advancing to the next sub-step.`,
  ];
  steps.push(step5);

  const step6 = [
    `Step 7: Quality Verification and Accuracy Check`,
    `WHY: Independent verification of procedure outputs is the primary defence against undetected errors reaching clients, regulators, or downstream processes.`,
    `The designated verifier conducts a systematic check of all execution outputs against the expected results defined in the procedure specification. Each output is examined for completeness, accuracy, formatting compliance, and adherence to regulatory or industry standards. Where the ${industry} sector requires independent verification of specific output types, this is confirmed and documented. Numerical outputs are recalculated or independently derived where the control framework requires. Discrepancies are logged in the quality discrepancy register and returned for correction. Corrected outputs are re-verified before the procedure proceeds. For ${band} organisations, automated validation tools within ${primarySys} support the verification, but the verifier's independent sign-off remains mandatory.`,
    `* Examine each output for completeness, accuracy, and formatting compliance`,
    `* Recalculate or independently verify numerical outputs`,
    `* Log any discrepancies in the quality discrepancy register`,
    `* Return discrepant outputs for correction and re-verify`,
    `* Complete the quality verification checklist with pass or fail determination`,
    `HOW TO VERIFY: Completed quality verification checklist with pass or fail determination, discrepancy log, and verifier identity and timestamp.`,
    `REAL-WORLD EXAMPLE: The quality reviewer at ${company} independently verifies all ${title} procedure outputs against the specification, confirming 100% data accuracy before release.`,
  ];
  steps.push(step6);

  const step7 = [
    `Step 8: Compliance Verification and Regulatory Alignment`,
    `WHY: Regulatory non-compliance exposes ${company} to legal sanction, financial penalty, and reputational damage that can be avoided through systematic compliance verification at the point of procedure completion.`,
    `The operator or compliance reviewer conducts a systematic check of the procedure execution against the compliance obligation register. Each regulatory requirement identified in the procedure's compliance matrix is reviewed to confirm that the execution has addressed it. Data protection compliance is confirmed where personal data has been processed during the procedure. Employment law obligations are reviewed where the procedure involves staff-related decisions. Health and safety compliance is confirmed where the procedure has workplace safety implications. Any compliance gaps are documented and assigned for remediation. The reviewer records the compliance verification outcome and attaches it to the procedure file.`,
    `* Check procedure execution against the compliance obligation register`,
    `* Confirm data protection compliance for any personal data processed`,
    `* Review employment law compliance for staff-related decisions`,
    `* Verify health and safety compliance where applicable`,
    `* Document any compliance gaps with assigned remediation actions`,
    `HOW TO VERIFY: Completed compliance verification checklist with documented confirmation of legislative alignment and any non-compliance records.`,
    `REAL-WORLD EXAMPLE: ${company} confirms that the ${title} procedure execution complies with UK GDPR, the applicable employment legislation, and ${industry}-specific regulatory requirements before the outputs are released.`,
  ];
  steps.push(step7);

  if (size === "10-50" || size === "50+") {
    const step8 = [
      `Step 9: Exception and Deviation Reconciliation`,
      `WHY: Unexamined exceptions accumulate into systemic risks that degrade procedure effectiveness and increase regulatory exposure over time.`,
      `The operator reviews the exception and deviation logs generated during execution. Each entry is examined to confirm that a root cause has been identified, a corrective action has been taken or planned, and the residual risk has been assessed. Exceptions escalated during execution are checked to confirm acknowledgement by the appropriate authority. Open exceptions rated medium or higher are escalated to the department lead for immediate decision. The operator compiles an exception reconciliation report listing each exception, its root cause, corrective action, escalation status, and final disposition. This report becomes part of the permanent procedure record.`,
      `* Review all exception and deviation logs from the procedure execution`,
      `* Confirm root cause identification and corrective action for each exception`,
      `* Escalate open exceptions rated medium or higher to the department lead`,
      `* Compile the exception reconciliation report`,
      `* Attach the report to the permanent procedure record`,
      `HOW TO VERIFY: Completed exception reconciliation report with root cause, corrective action, escalation history, and final status for each exception.`,
      `REAL-WORLD EXAMPLE: ${company} reconciles two minor exceptions from the ${title} procedure execution, confirms corrective actions, and documents both in the exception reconciliation report.`,
    ];
    steps.push(step8);
  }

  const nextStep = steps.length + 1;
  const stepN = [
    `Step ${nextStep}: Output Generation and Documentation`,
    `WHY: Complete, accurate output documentation is the foundation of audit readiness, regulatory compliance, and stakeholder confidence in ${industry} operations.`,
    `The operator generates the procedure outputs using ${primarySys}. Each output document is checked against the output specification to confirm mandatory fields, correct data, and appropriate formatting. Where the ${industry} sector requires specific output formats for regulatory submissions, the operator confirms compliance. The operator compiles a complete output package including the primary output document, all supporting evidence, the procedure log, and any exception records. The output package is stored in the designated document management location with a unique file reference cross-referenced to the procedure record. For ${band} organisations, this step includes confirming compliance with applicable record-keeping standards.`,
    `* Generate procedure outputs using ${primarySys}`,
    `* Check each output document against the specification for completeness`,
    `* Compile the complete output package with supporting evidence`,
    `* Store the output package with correct file reference and naming convention`,
    `* Confirm compliance with record-keeping standards`,
    `HOW TO VERIFY: Completed output package with validated documents, supporting evidence, procedure log, and exception records.`,
    `REAL-WORLD EXAMPLE: ${company} generates the ${title} output package through ${primarySys}, storing it in the document management system with the correct retention classification.`,
  ];
  steps.push(stepN);

  const nextStep2 = steps.length + 1;
  const stepN2 = [
    `Step ${nextStep2}: Approval and Authorisation Gate`,
    `WHY: Formal approval by an authorised party confirms that the procedure has been executed correctly and that the outputs are appropriate for release or further processing.`,
    `The operator submits the complete procedure record to the designated approver in ${primarySys}. The approver reviews the record against the approval criteria: completeness of execution, accuracy of outputs, regulatory compliance, exception resolution, and alignment with scope and objectives. The approver may request additional information, which the operator provides within two hours. Once satisfied, the approver formally approves the procedure in ${primarySys}, recording their identity, timestamp, and any conditions. For ${band} organisations, the approval chain follows the authority matrix defined in the procedure governance framework.`,
    `* Submit the complete procedure record to the designated approver`,
    `* Respond to any approver requests for additional information within two hours`,
    `* Obtain formal approval recorded in ${primarySys}`,
    `* Document any conditions attached to the approval`,
    `* Record approver identity and timestamp in the procedure audit log`,
    `HOW TO VERIFY: Formal approval record with approver identity, timestamp, approval conditions, and system-generated approval reference.`,
    `REAL-WORLD EXAMPLE: The ${department} lead at ${company} reviews and approves the ${title} procedure record in ${primarySys}, confirming completeness, accuracy, and compliance.`,
  ];
  steps.push(stepN2);

  if (size === "50+") {
    const nextStep3 = steps.length + 1;
    const stepN3 = [
      `Step ${nextStep3}: Management Review and Strategic Alignment Confirmation`,
      `WHY: Management review ensures that procedure outputs support the organisation's strategic objectives and that any systemic issues are escalated for governance attention.`,
      `The department head or executive sponsor reviews the complete procedure record, including the execution summary, performance metrics, exception reconciliation, quality verification, and compliance confirmation. The review confirms alignment with the organisation's strategic objectives for the ${industry} sector and that regulatory obligations have been fully discharged. Where systemic issues or strategic risks are identified, the management review assigns ownership and target dates for resolution. The reviewer signs off on procedure closure, confirming that all required steps have been completed to an acceptable standard.`,
      `* Review the complete procedure record including execution summary and metrics`,
      `* Confirm strategic alignment with organisational objectives`,
      `* Assign ownership and target dates for any systemic issues`,
      `* Sign off on procedure closure`,
      `* Document the management review record in the governance section`,
      `HOW TO VERIFY: Completed management review record with sign-off, strategic alignment confirmation, and assigned actions for any systemic findings.`,
      `REAL-WORLD EXAMPLE: The executive sponsor at ${company} reviews the ${title} procedure outcome, confirms alignment with quarterly strategic objectives, and signs off on closure.`,
    ];
    steps.push(stepN3);

    const nextStep4 = steps.length + 1;
    const stepN4 = [
      `Step ${nextStep4}: Final Archival and Record Retention Confirmation`,
      `WHY: Proper archival with the correct retention period ensures that procedure records remain accessible for regulatory audit and legal defence throughout the required retention period.`,
      `The operator confirms that the complete procedure record has been stored in the document management system. The retention period is confirmed against the organisational retention schedule, and the retention classification is applied. Any automated deletion or review triggers are configured. The system generates an archival certificate confirming the procedure reference, title, execution date, approving authority, evidence file verification hash, retention period, and archival date. The archival certificate is stored in the permanent company record. The operator confirms that the archived record is accessible only to authorised personnel and that access is logged.`,
      `* Confirm the complete procedure record is stored in the document management system`,
      `* Apply the correct retention classification`,
      `* Configure automated deletion or review triggers`,
      `* Generate and store the archival certificate`,
      `* Confirm access controls restrict the archived record to authorised personnel`,
      `HOW TO VERIFY: Completed archival with retention classification applied, verification hash generated, and archival certificate stored.`,
      `REAL-WORLD EXAMPLE: ${company} archives the ${title} procedure record with a 6-year retention period, generates an archival certificate, and stores it in the permanent company record.`,
    ];
    steps.push(stepN4);
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
  const stepCount = getStepCount(band);
  const totalSteps = stepCount + (band === "10-50" ? 0 : band === "50+" ? 2 : 0) + 2;

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
    `This Standard Operating Procedure defines the mandatory protocol for "${title}" at ${input.companyName}. It establishes a ${totalSteps}-step controlled execution framework designed to deliver consistent, auditable, and compliant outcomes across the ${department} function.`,
    `The procedure operates within the ${input.industry} sector under ${jurisdiction} jurisdiction and is classified as ${sopType}. It applies to all personnel engaged in the execution, supervision, quality assurance, and governance of the activities it describes.`,
    `Adherence to this procedure is mandatory. Non-compliance exposes ${input.companyName} to regulatory sanction, operational failure, audit qualification, and legal liability. All exceptions must be documented, justified, and escalated through the defined governance channels.`,
    `Description: ${description}`,
  ]));

  sections.push(buildSection("04. Purpose and Scope", [
    `The purpose of this Standard Operating Procedure is to establish a definitive, repeatable methodology for executing "${title}" across the ${department} department of ${input.companyName}. It serves as the single source of truth for how this activity must be conducted, supervised, recorded, and governed.`,
    `This procedure is designed to achieve five primary objectives. First, to standardise execution so that every instance of "${title}" produces consistent outcomes regardless of which operator performs the work. Second, to embed regulatory and legislative compliance into every step of the workflow, eliminating reliance on individual knowledge or discretion. Third, to create a complete and defensible audit trail that demonstrates compliance with applicable legal and regulatory standards. Fourth, to define clear accountability boundaries through assigned roles and authority levels. Fifth, to establish a framework for continuous improvement through documented performance measurement and periodic review.`,
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
    ...generateProcedureSteps(title, input.companyName, sys, department, input.industry, band, sopType).flat(),
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
