import type { CompanySize, Jurisdiction } from "@/types";

export interface SOPDocument {
  title: string;
  company: string;
  systems: string;
  headcount: string;
  jurisdiction: Jurisdiction;
  complexity: CompanySize;
  sections: SOPSection[];
  generatedAt: string;
  industry: string;
  sopType: string;
}

export interface SOPSection {
  heading: string;
  content: string[];
}

interface LegislationSet {
  dataProtection: string;
  employment: string;
  healthSafety: string;
  corporate: string;
  sectorSpecific: string[];
  antiDiscrimination: string;
  retention: string;
}

export function getLegislation(jurisdiction: Jurisdiction): LegislationSet {
  const map: Record<string, LegislationSet> = {
    "UK": {
      dataProtection: "UK GDPR and the Data Protection Act 2018",
      employment: "Employment Rights Act 1996, Employment Relations Act 1999, Employment Act 2002, and the Working Time Regulations 1998",
      healthSafety: "Health and Safety at Work etc. Act 1974, Management of Health and Safety at Work Regulations 1999",
      corporate: "Companies Act 2006",
      sectorSpecific: ["Financial Services and Markets Act 2000 (FCA regulated activities)", "Money Laundering, Terrorist Financing and Transfer of Funds Regulations 2017", "Consumer Rights Act 2015"],
      antiDiscrimination: "Equality Act 2010",
      retention: "6 years minimum from completion of the procedure. Contracts and regulatory records retained for 7 years per Limitation Act 1980.",
    },
    "Scotland": {
      dataProtection: "UK GDPR and the Data Protection Act 2018 (applies concurrently with Scots law)",
      employment: "Employment Rights Act 1996 (as modified for Scotland), Working Time Regulations 1998",
      healthSafety: "Health and Safety at Work etc. Act 1974",
      corporate: "Companies Act 2006 (applicable across Great Britain)",
      sectorSpecific: ["Legal profession regulated by the Law Society of Scotland", "Scottish charitable accounting requirements under OSCR regulations"],
      antiDiscrimination: "Equality Act 2010",
      retention: "6 years from date of completion. Professional negligence claims under Scots law subject to 5-year prescriptive period.",
    },
    "Wales": {
      dataProtection: "UK GDPR and the Data Protection Act 2018",
      employment: "Employment Rights Act 1996, Employment Act 2002, Working Time Regulations 1998",
      healthSafety: "Health and Safety at Work etc. Act 1974 (enforced in Wales by HSE and local authorities)",
      corporate: "Companies Act 2006",
      sectorSpecific: ["Welsh language standards under the Welsh Language (Wales) Measure 2011", "Well-being of Future Generations (Wales) Act 2015 applies to public bodies"],
      antiDiscrimination: "Equality Act 2010",
      retention: "6 years minimum. Public bodies must follow Welsh language record-keeping standards.",
    },
    "England": {
      dataProtection: "UK GDPR and the Data Protection Act 2018",
      employment: "Employment Rights Act 1996, Employment Relations Act 1999, Employment Act 2002, Working Time Regulations 1998",
      healthSafety: "Health and Safety at Work etc. Act 1974",
      corporate: "Companies Act 2006",
      sectorSpecific: ["Consumer Rights Act 2015", "Modern Slavery Act 2015 (statement requirement for qualifying organisations)"],
      antiDiscrimination: "Equality Act 2010",
      retention: "6 years minimum from completion. Contracts under seal retained 12 years. Regulatory records held per sector-specific guidance.",
    },
    "US-Federal": {
      dataProtection: "No single federal data protection law. Sectoral regulations apply: HIPAA (health), GLBA (financial), COPPA (children). State-level CCPA/CPRA, VCDPA, CPA have extraterritorial effect.",
      employment: "Fair Labor Standards Act 1938, Title VII of the Civil Rights Act 1964, Americans with Disabilities Act 1990, Age Discrimination in Employment Act 1967, Family and Medical Leave Act 1993",
      healthSafety: "Occupational Safety and Health Act 1970 (OSHA standards)",
      corporate: "Sarbanes-Oxley Act 2002 (public companies), Dodd-Frank Wall Street Reform and Consumer Protection Act 2010",
      sectorSpecific: ["SEC reporting requirements for publicly traded entities", "FinCEN AML compliance obligations", "Federal Trade Commission Act Section 5 (unfair or deceptive practices)"],
      antiDiscrimination: "Title VII, ADEA, ADA, and relevant Executive Orders governing federal contractors",
      retention: "3 to 7 years depending on record type. SEC-regulated firms: 6 years. Employment records: 3 years post-termination. Consult legal for specific retention schedules.",
    },
    "US-NewYork": {
      dataProtection: "New York SHIELD Act (S5575B), NY DFS Cybersecurity Regulation (23 NYCRR 500) for financial services",
      employment: "New York Labor Law, New York City Human Rights Law, Workers Compensation Law",
      healthSafety: "OSHA standards enforced by NY DOL. Public Employee Safety and Health Bureau for state and local workers.",
      corporate: "New York Business Corporation Law, Sarbanes-Oxley Act 2002 (public companies)",
      sectorSpecific: ["New York Department of Financial Services regulations", "NY SHIELD Act data security requirements"],
      antiDiscrimination: "New York State Human Rights Law, New York City Human Rights Law",
      retention: "6 years for employment records under NY law. Financial services records held per DFS requirements.",
    },
    "US-California": {
      dataProtection: "California Consumer Privacy Act (CCPA) as amended by CPRA, California Privacy Rights Act 2020",
      employment: "California Labor Code, California Fair Employment and Housing Act, Workers Compensation Act",
      healthSafety: "California Division of Occupational Safety and Health (Cal/OSHA) standards",
      corporate: "California Corporations Code",
      sectorSpecific: ["California Consumer Privacy Act compliance regime", "California Private Attorneys General Act (PAGA) exposure"],
      antiDiscrimination: "California Fair Employment and Housing Act (FEHA), Unruh Civil Rights Act",
      retention: "4 years minimum for employment records under California law. Longer for specific record categories.",
    },
    "US-Texas": {
      dataProtection: "Texas Data Privacy and Security Act, Texas Identity Theft Enforcement and Protection Act",
      employment: "Texas Labor Code (at-will employment framework), Workers Compensation Act",
      healthSafety: "OSHA Texas state plan. Texas Department of Insurance Division of Workers Compensation.",
      corporate: "Texas Business Organizations Code",
      sectorSpecific: ["Texas Privacy Act compliance", "Texas Department of Banking regulations"],
      antiDiscrimination: "Texas Commission on Human Rights Act, Title VII of the Civil Rights Act 1964",
      retention: "2-4 years depending on record type. 4 years for employment records. Tax records retained 4 years.",
    },
    "US-Florida": {
      dataProtection: "Florida Digital Bill of Rights (effective July 2024), Florida Information Protection Act",
      employment: "Florida Workers Compensation Act, Florida Civil Rights Act",
      healthSafety: "OSHA standards enforced in Florida by federal OSHA.",
      corporate: "Florida Business Corporation Act",
      sectorSpecific: ["Florida Department of Financial Services regulations for financial entities", "Florida Digital Bill of Rights compliance"],
      antiDiscrimination: "Florida Civil Rights Act of 1992",
      retention: "5 years for employment records under Florida law. General business records: 3-5 years.",
    },
    "US-Delaware": {
      dataProtection: "Delaware Personal Data Privacy Act (effective January 2025)",
      employment: "Delaware Wage Payment and Collection Act, Workers Compensation Act",
      healthSafety: "OSHA standards enforced in Delaware by federal OSHA.",
      corporate: "Delaware General Corporation Law (most widely used corporate law in US)",
      sectorSpecific: ["Delaware Division of Corporations compliance", "Delaware Personal Data Privacy Act requirements"],
      antiDiscrimination: "Delaware Discrimination in Employment Act",
      retention: "3-6 years depending on record type. Corporate records retained per DGCL requirements.",
    },
    "EU-GDPR": {
      dataProtection: "General Data Protection Regulation (EU 2016/679), ePrivacy Directive 2002/58/EC",
      employment: "Applicable member state employment legislation implementing EU Working Time Directive, Posted Workers Directive",
      healthSafety: "EU Framework Directive 89/391/EEC and member state transpositions",
      corporate: "Applicable member state company law, EU Market Abuse Regulation (MAR) for listed entities",
      sectorSpecific: ["Member state implementation of EU Anti-Money Laundering Directives", "Sector-specific regulations per member state"],
      antiDiscrimination: "EU Employment Equality Directive (2000/78/EC), Racial Equality Directive (2000/43/EC)",
      retention: "GDPR Article 5(1)(e): personal data retained no longer than necessary. Sector-specific retention periods apply. Typically 5-10 years for contractual and employment records.",
    },
    "EU-PayTransparency": {
      dataProtection: "General Data Protection Regulation (EU 2016/679), EU Pay Transparency Directive (2023/970)",
      employment: "EU Pay Transparency Directive implementation, member state equal pay legislation",
      healthSafety: "EU Framework Directive 89/391/EEC",
      corporate: "EU Corporate Sustainability Reporting Directive (CSRD) for qualifying entities",
      sectorSpecific: ["EU Pay Transparency Directive: reverse burden of proof, job posting pay ranges, employee right to pay averages", "Member state transposition deadlines vary. Immediate remediation required if not yet compliant."],
      antiDiscrimination: "EU Equal Pay Directive, Article 157 TFEU, Racial Equality Directive",
      retention: "Pay data retained per member state implementation. Minimum 3 years from reporting period end. Anonymised data retained longer for trend analysis.",
    },
    "Canada": {
      dataProtection: "Personal Information Protection and Electronic Documents Act (PIPEDA), applicable provincial privacy laws",
      employment: "Canada Labour Code (federal), Employment Standards Acts (provincial), applicable provincial employment legislation",
      healthSafety: "Canada Labour Code Part II (federal), Occupational Health and Safety Acts (provincial)",
      corporate: "Canada Business Corporations Act, applicable provincial corporate legislation",
      sectorSpecific: ["Proceeds of Crime (Money Laundering) and Terrorist Financing Act", "Pay equity legislation at federal and provincial levels"],
      antiDiscrimination: "Canadian Human Rights Act, applicable provincial human rights codes",
      retention: "6 years minimum for records required under federal legislation. Provincial requirements vary; typically 3-7 years.",
    },
    "Canada-Ontario": {
      dataProtection: "PIPEDA (Ontario has not adopted substantially similar privacy legislation), Ontario's FIPPA for public sector",
      employment: "Employment Standards Act 2000, Ontario Labour Relations Act, Workplace Safety and Insurance Act",
      healthSafety: "Ontario Occupational Health and Safety Act (OHSA)",
      corporate: "Ontario Business Corporations Act, Canada Business Corporations Act",
      sectorSpecific: ["Ontario Pay Transparency Act", "Ontario Human Rights Code compliance"],
      antiDiscrimination: "Ontario Human Rights Code, Accessibility for Ontarians with Disabilities Act (AODA)",
      retention: "Employment Standards Act: 3 years for records. ESA requires pay range disclosure on job postings. 3-year retention for job postings and interview notes.",
    },
    "Australia": {
      dataProtection: "Privacy Act 1988 (Cth), Australian Privacy Principles (APPs)",
      employment: "Fair Work Act 2009, National Employment Standards, applicable modern awards",
      healthSafety: "Work Health and Safety Act 2011 (Cth) and state/territory WHS legislation",
      corporate: "Corporations Act 2001 (Cth)",
      sectorSpecific: ["Anti-Money Laundering and Counter-Terrorism Financing Act 2006", "Superannuation Guarantee (Administration) Act 1992 — Payday Super from 1 July 2026"],
      antiDiscrimination: "Fair Work Act 2009 (general protections), Sex Discrimination Act 1984, Disability Discrimination Act 1992, Racial Discrimination Act 1975, Age Discrimination Act 2004",
      retention: "Fair Work Act: 7 years for employee records. Corporations Act: 7 years for company records. Privacy Act: destroy or de-identify when no longer required.",
    },
    "Dubai-Global": {
      dataProtection: "UAE Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data, Dubai International Financial Centre (DIFC) Data Protection Law",
      employment: "UAE Federal Decree-Law No. 33 of 2021 on Employment Relations, DIFC Employment Law",
      healthSafety: "UAE Federal Law No. 32 of 2021 on Occupational Health and Safety",
      corporate: "UAE Federal Companies Law, DIFC Companies Law",
      sectorSpecific: ["Dubai Global Tax Code (txcd_20030000) — 0% VAT Reverse Charge", "UAE Central Bank regulations for financial activities"],
      antiDiscrimination: "UAE Federal Decree-Law on the Prohibition of Discrimination and Hatred",
      retention: "DIFC: 6 years for records. UAE Federal: 5-10 years depending on document type. Tax records: 5 years under Federal Tax Law.",
    },
  };
  return map[jurisdiction] || map["UK"];
}

function getTierLabel(size: CompanySize): string {
  const map: Record<CompanySize, string> = { "1-10": "Core Execution Tier", "10-50": "Operational Control Tier", "50+": "Enterprise Governance Tier" };
  return map[size];
}

function getStepCount(size: CompanySize): number {
  const counts: Record<CompanySize, number> = { "1-10": 13, "10-50": 16, "50+": 18 };
  return counts[size];
}

function headcountToBand(headcount: string): CompanySize {
  const n = parseInt(headcount) || 5;
  if (n <= 20) return "1-10";
  if (n <= 200) return "10-50";
  return "50+";
}

function getSystemsList(systems: string): string[] {
  if (!systems || systems.trim() === "") return ["designated operational systems"];
  return systems.split(",").map(s => s.trim()).filter(Boolean);
}

function formatSystems(systems: string): string {
  const list = getSystemsList(systems);
  if (list.length <= 2) return list.join(" and ");
  return list.slice(0, -1).join(", ") + ", and " + list[list.length - 1];
}

function formatSystemsShort(systems: string): string {
  const list = getSystemsList(systems);
  return list[0] || "the designated system";
}

function now(): string {
  return new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
}

function docRef(title: string): string {
  return `SOP-${title.substring(0, 3).toUpperCase()}-${new Date().getFullYear()}`;
}

function generateProcedureSteps(title: string, company: string, systems: string, industry: string, department: string, size: CompanySize, sopType: string): string[][] {
  const steps: string[][] = [];
  const sys = getSystemsList(systems);
  const primarySys = sys[0] || "the designated system";
  const secondarySys = sys.length > 1 ? sys[1] : primarySys;
  const headcount = size === "1-10" ? 20 : size === "10-50" ? 200 : 500;
  const band = size === "1-10" ? "startup and small business" : size === "10-50" ? "growing business" : "enterprise";

  const stepTemplates: ((n: number) => string[])[] = [
    (n) => [
      `Step ${n}: Procedure Initiation and Access Verification`,
      `Objective: Confirm that all required systems are operational, user credentials are valid, and the operating environment is ready before commencing the ${title} procedure.`,
      `The responsible person accesses ${primarySys} using their assigned credentials and verifies that their user profile carries the necessary permissions to execute the full procedure scope. Where ${secondarySys} interfaces with ${primarySys} as part of the workflow, cross-system connectivity is confirmed by generating a test transaction or performing a handshake check. Any system that returns an error, timeout, or access denial is logged immediately in the IT incident register and the procedure is paused until the issue is resolved. For organisations operating in the ${band} category, this step also requires confirmation that the procedure version displayed in the system matches the current authorised version from the document control register. The operator records the system check results, including timestamps and system response codes, in the procedure log.`,
      `Responsible Person: ${size === "1-10" ? "Chief Operator" : size === "10-50" ? "Department Lead" : "System Administrator"}`,
      `Systems Used: ${formatSystems(systems)}`,
      "Documents Used: Procedure Initiation Checklist, System Access Log, Authorised User Register",
      `Control Point: The procedure must not proceed past Step ${n} unless ${primarySys} confirms operational status and the operator's access level is verified against the authorised user matrix.`,
      `Expected Output: Completed system verification checklist with timestamps, user identity confirmation, and system response codes stored in the procedure audit file.`,
      `Exception Handling: If ${primarySys} is unavailable, the operator notifies IT Support immediately and logs the system failure in the incident register. The procedure is placed on hold. Processing resumes only after ${primarySys} has been restored and the operator has re-verified system access.`,
    ],
    (n) => [
      `Step ${n}: Document Verification and Authorised Version Confirmation`,
      `Objective: Verify that the ${title} procedure document is the current authorised version and that all referenced supporting documents are accessible and correctly versioned.`,
      `The operator retrieves the ${title} procedure from the document management system and cross-references the document control number against the master document register. The version number, approval date, and next review date are confirmed as current. Any supporting forms, templates, checklists, or reference materials listed in the procedure are located and checked for version alignment. Where the ${industry} sector requires regulatory document retention or specific versioning protocols, the operator confirms that the document hierarchy complies with those requirements. For ${band} organisations, this step includes verifying that any jurisdiction-specific addenda or regulatory supplements attached to the procedure are the correct versions for the current compliance period. Discrepancies between the issued procedure and the document register are escalated to the document control officer within one hour.`,
      `Responsible Person: ${size === "1-10" ? "Chief Operator" : "Procedure Operator"}`,
      `Systems Used: ${primarySys} Document Management System, Master Document Register`,
      "Documents Used: Master Document Register, Document Control Log, Approved Procedure Version",
      `Control Point: No step beyond Step ${n} may be executed unless the procedure version in the document management system matches the authorised version from the document control register.`,
      `Expected Output: Version confirmation recorded in the procedure log. Any version discrepancies logged in the document non-compliance register with escalation timestamp.`,
      `Exception Handling: If the document version in the system does not match the approved version, the operator flags this to the document control officer and places the procedure on hold. The procedure may only continue once the correct version is confirmed and the discrepancy is investigated.`,
    ],
    (n) => [
      `Step ${n}: Stakeholder Identification and Notification`,
      `Objective: Identify all parties who must be notified of the ${title} procedure initiation and secure their acknowledgement before execution proceeds.`,
      `The operator identifies the stakeholders who have a defined interest in the ${title} procedure outcome. This includes the procedure owner, the responsible supervisor, downstream process owners whose work may be affected by the output, the quality assurance contact, and any external parties such as clients, regulators, or third-party service providers who require notification. Using ${primarySys}, the operator sends a standardised procedure initiation notification to each stakeholder, specifying the procedure reference, expected duration, systems affected, and any actions required from the recipient. Stakeholders are asked to confirm receipt within a defined response window. For ${band} organisations operating under ${getLegislation("UK").corporate} standards, this notification forms part of the governance record and must be retained accordingly. Non-responding stakeholders are followed up by telephone or equivalent direct communication within two hours of the notification being sent.`,
      `Responsible Person: ${size === "1-10" ? "Chief Operator" : size === "10-50" ? "Department Lead" : "Procedure Operator"}`,
      `Systems Used: ${primarySys}, ${size === "50+" ? "Enterprise Communication Platform, Stakeholder Register" : "Communication Tools"}`,
      "Documents Used: Stakeholder Register, Communication Log, Acknowledgement Tracking Sheet",
      `Control Point: The procedure must not proceed past Step ${n} unless all mandatory stakeholders have acknowledged receipt of the notification. Non-mandatory stakeholders may be notified after Step ${n} completion.`,
      `Expected Output: Stakeholder notification log with timestamps, acknowledgement receipts, and escalation records for non-responding parties.`,
      `Exception Handling: If a mandatory stakeholder cannot be reached within the defined response window, the operator escalates to the next authority level. The procedure may proceed if the delegated authority provides written acknowledgement in place of the primary stakeholder.`,
    ],
    (n) => [
      `Step ${n}: Resource and Materials Preparation`,
      `Objective: Assemble all physical and digital resources required to execute the ${title} procedure and confirm that each resource meets the specified quality or compliance standard.`,
      `The operator reviews the resource requirements defined in the procedure scope and assembles each item against the resource checklist. For digital resources, this includes confirming that the correct templates, data sets, reference files, and system configurations are loaded and accessible in ${primarySys}. For physical resources, the operator confirms availability of any printed forms, equipment, or materials and checks them against the specification. Where ${industry} sector regulations impose specific requirements on materials or data used in operational procedures, the operator verifies compliance before proceeding. In ${band} organisations, this step extends to confirming that third-party or outsourced resources have been ordered and confirmed with delivery timelines that do not conflict with the procedure schedule. Any resource that fails the readiness check is flagged, and the operator determines whether a suitable substitute is available or whether the procedure must be delayed.`,
      `Responsible Person: ${size === "1-10" ? "Chief Operator" : "Operations Coordinator"}`,
      `Systems Used: ${formatSystems(systems)}, Resource Management System, Procurement Log`,
      "Documents Used: Resource Checklist, Materials Specification Sheet, Supplier Confirmation Records",
      `Control Point: All critical-path resources must be confirmed as available and compliant before the procedure proceeds past Step ${n}. Substitute resources require documented approval from the responsible supervisor.`,
      `Expected Output: Completed resource readiness checklist. Any resource substitutions documented with approval references. Supplier confirmations attached to the procedure file.`,
      `Exception Handling: If a critical resource is unavailable and no approved substitute exists, the operator escalates to the department lead. The procedure start may be deferred. Non-critical resources may be procured while the procedure is in progress, but their absence must be documented as a risk item.`,
    ],
    (n) => [
      `Step ${n}: Risk Assessment and Control Confirmation`,
      `Objective: Conduct a pre-execution risk assessment for the ${title} procedure, confirm that all identified risks have assigned controls, and document any residual risk that requires active management during execution.`,
      `The operator accesses the risk register in ${primarySys} and identifies the risk profile applicable to the ${title} procedure. Each risk listed in the procedure's risk register section is reviewed to confirm that the assigned control measures are in place and operational. For risks rated medium or higher, the operator verifies that the control owner has confirmed the control's effectiveness within the required review period. New risks identified since the last risk review are documented and assigned a provisional risk rating. Where ${industry} sector regulations prescribe specific risk assessment methodologies, those methodologies are followed and documented. The operator records the pre-execution risk assessment in the procedure log, noting any risks where controls are not fully operational and the mitigating actions that have been put in place. Residual risks that fall outside the organisation's risk appetite are escalated to the responsible authority level before the procedure proceeds.`,
      `Responsible Person: ${size === "1-10" ? "Chief Operator" : size === "10-50" ? "Risk Owner" : "Risk and Compliance Officer"}`,
      `Systems Used: ${primarySys} Risk Management Module, ${size === "50+" ? "Enterprise Risk Register, Governance Platform" : "Risk Register"}`,
      "Documents Used: Risk Register Extract, Control Effectiveness Confirmation Records, Risk Assessment Methodology",
      `Control Point: The procedure must not proceed past Step ${n} if any high-rated risk has an ineffective or untested control. Medium-rated risks with ineffective controls require documented acceptance from the risk owner before proceeding.`,
      `Expected Output: Completed pre-execution risk assessment with control confirmation status, residual risk log, and escalation records for any risks exceeding appetite.`,
      `Exception Handling: Where a control is found to be ineffective, the operator notifies the control owner and requests remediation within 24 hours. If the risk is time-sensitive and the procedure cannot be deferred, the risk owner may accept the risk in writing for a single execution only, with remediation required before the next scheduled execution.`,
    ],
    (n) => [
      `Step ${n}: Procedure Execution — Phase One Initiation`,
      `Objective: Commence the ${title} procedure by executing the initial phase in accordance with the defined sequence, capturing all inputs, and establishing the baseline record from which all subsequent steps are measured.`,
      `The operator accesses the procedure workflow in ${primarySys} and initiates a new execution instance. The unique procedure reference identifier is recorded. All inputs required for Phase One are loaded into the system, including any customer data, reference materials, specifications, or authorisation codes specified in the procedure definition. The operator confirms that each input matches the expected format, value range, and quality standard defined in the procedure specification. Where ${industry} sector practice requires dual data entry or independent verification of inputs, this is completed before the first processing action is taken. The system captures the initiation timestamp, operator identity, and input values in the audit log. For ${band} organisations, Phase One may be subject to automated validation rules in ${primarySys} that prevent initiation if mandatory inputs are missing or out of range. The operator checks for any validation warnings or errors and resolves them before proceeding.`,
      `Responsible Person: ${size === "1-10" ? "Chief Operator" : "Procedure Operator"}`,
      `Systems Used: ${formatSystems(systems)}`,
      "Documents Used: Procedure Specification, Input Validation Criteria, Phase One Checklist",
      `Control Point: Phase One initiation must generate a confirmed audit log entry in ${primarySys} before any further processing steps can be taken. Manual workarounds are not permitted.`,
      `Expected Output: Confirmed procedure initiation record with unique reference, input validation report, and audit log timestamp. Any validation warnings documented with resolution.`,
      `Exception Handling: If ${primarySys} rejects the initiation due to validation failure, the operator reviews the validation error and corrects the input. If the input is correct but the system validation rule is inaccurate, the operator escalates to the system administrator for rule correction. Procedure initiation is deferred until the rule is corrected or an authorised override is obtained.`,
    ],
    (n) => [
      `Step ${n}: Procedure Execution — Core Processing`,
      `Objective: Execute the core processing activities of the ${title} procedure, processing each work item in the defined sequence and recording completion at each control point.`,
      `The operator works through the core processing sequence defined in the procedure specification. Each sub-step is executed in the prescribed order. Outputs from each sub-step are captured in ${primarySys} before the next sub-step commences. Where the procedure involves decision points, the operator applies the defined criteria and documents the rationale for each decision. Any calculations, transformations, or data manipulations prescribed by the procedure are performed and the results are independently verified where the control framework requires segregation. For ${industry} operations, the operator pays particular attention to regulatory data handling requirements, ensuring that any personal data processed during this step is handled in accordance with applicable data protection legislation. The operator monitors processing against the expected timeline and flags any sub-step that exceeds its allocated processing window. In ${band} organisations, the system may automatically escalate overdue sub-steps to the responsible supervisor. The operator completes the core processing log and submits it for verification.`,
      `Responsible Person: ${size === "1-10" ? "Chief Operator" : "Procedure Operator"}`,
      `Systems Used: ${formatSystems(systems)}, Processing Log, Workflow Management Module`,
      "Documents Used: Core Processing Specification, Decision Criteria Matrix, Processing Log Template",
      `Control Point: Each sub-step within the core processing sequence must be completed and logged before the next sub-step begins. The system must not allow out-of-sequence processing. Segregation of duties applies where dual control is specified.`,
      `Expected Output: Completed core processing log with timestamped sub-step records, decision rationales, verification results, and any timing deviations documented.`,
      `Exception Handling: If a sub-step cannot be completed within its allocated processing window, the operator logs the delay and the reason, and escalates if the delay affects the overall procedure timeline. For sub-steps that require external input or approval, the operator follows up with the responsible party and records the follow-up action in the processing log.`,
    ],
    (n) => [
      `Step ${n}: Quality Verification and Accuracy Check`,
      `Objective: Independently verify that the outputs from the core processing phase are complete, accurate, and compliant with the ${title} procedure specification before proceeding to output generation.`,
      `The operator or designated verifier conducts a systematic check of all core processing outputs against the expected results defined in the procedure specification. Each output item is examined for completeness, accuracy, formatting compliance, and adherence to regulatory or industry standards. Where the ${industry} sector requires independent verification of specific output types, the verifier confirms that this has been completed and documented. Numerical outputs are recalculated or independently derived where the control framework requires. Any discrepancies identified are logged in the quality discrepancy register. The verifier completes a quality verification checklist and records their identity, the verification timestamp, and the outcome. If the verification identifies errors or omissions, the operator returns to the relevant processing sub-step to make corrections. The corrected output is re-verified before the procedure proceeds to the next phase. For ${band} organisations, the quality verification step may be supported by automated validation tools within ${primarySys}, but the verifier's independent sign-off remains mandatory.`,
      `Responsible Person: ${size === "1-10" ? "Chief Operator (self-verification with supervisor oversight)" : size === "10-50" ? "Quality Reviewer" : "Quality Assurance Specialist"}`,
      `Systems Used: ${primarySys} Quality Module, ${size === "50+" ? "Independent Validation Tool" : ""}`,
      "Documents Used: Quality Verification Checklist, Expected Output Specification, Discrepancy Register",
      `Control Point: No output may proceed to the next step without a completed quality verification. Verification must be performed by a person independent of the core processing execution.`,
      `Expected Output: Completed quality verification checklist with pass/fail determination, discrepancy log (if applicable), and verifier identity and timestamp.`,
      `Exception Handling: If verification identifies discrepancies exceeding the acceptable quality threshold defined in the procedure specification, the entire core processing phase is returned for rework. The rework is completed, re-verified, and documented. Persistent quality failures trigger a process improvement review.`,
    ],
    (n) => [
      `Step ${n}: Output Generation and Documentation`,
      `Objective: Generate the formal outputs of the ${title} procedure, compile supporting documentation, and prepare the output package for distribution or further processing.`,
      `The operator generates the procedure outputs using ${primarySys}. Each output document is checked against the output specification to confirm that it contains all mandatory fields, correct data, and appropriate formatting. Where the ${industry} sector requires specific output formats for regulatory submissions or client reporting, the operator confirms compliance with those format requirements. Outputs that require authorisation or approval before release are identified and queued for the appropriate approval workflow. The operator compiles a complete output package that includes the primary output document, all supporting evidence, the procedure log, and any exception or deviation records generated during execution. The output package is stored in the designated document management location with a unique file reference that cross-references to the procedure record in ${primarySys}. For ${band} organisations, this step includes confirming that the output package complies with any applicable record-keeping standards and that the file naming convention follows the organisational standard.`,
      `Responsible Person: ${size === "1-10" ? "Chief Operator" : "Procedure Operator"}`,
      `Systems Used: ${formatSystems(systems)}, Document Management System, Output Generation Module`,
      "Documents Used: Output Specification, Document Template, Output Package Checklist",
      `Control Point: Outputs must be validated against the output specification before they are released from this step. Any output that does not meet specification must be corrected before proceeding.`,
      `Expected Output: Completed output package with validated documents, supporting evidence, procedure log, and exception records. Output package stored with correct file reference and naming convention.`,
      `Exception Handling: If the output generation process in ${primarySys} produces unexpected results or system errors, the operator logs the issue and consults the system administrator or vendor support. Outputs may be generated using the approved manual fallback procedure documented in the business continuity plan while the system issue is investigated.`,
    ],
    (n) => [
      `Step ${n}: Compliance Verification and Regulatory Alignment Check`,
      `Objective: Verify that the ${title} procedure execution and its outputs comply with all applicable legal, regulatory, and industry standards identified in the procedure's legislative framework.`,
      `The operator or compliance reviewer conducts a systematic check of the procedure execution against the compliance obligation register. Each regulatory requirement identified in the procedure's compliance matrix is reviewed to confirm that the execution has addressed it. Where ${getLegislation("UK").dataProtection} applies to any personal data processed during this procedure, the reviewer confirms that data processing has been conducted in accordance with the data protection principles, that a lawful basis for processing has been documented, and that any data subject rights requests have been handled within the statutory timeframe. Employment law obligations under ${getLegislation("UK").employment} are reviewed where the procedure involves staff-related decisions. Health and safety compliance under ${getLegislation("UK").healthSafety} is confirmed where the procedure has workplace safety implications. Any compliance gaps are documented and assigned for remediation. The reviewer records the compliance verification outcome and attaches it to the procedure file.`,
      `Responsible Person: ${size === "1-10" ? "Chief Operator with external advisor review" : size === "10-50" ? "Compliance Reviewer" : "Compliance Officer"}`,
      `Systems Used: ${primarySys} Compliance Module, Compliance Obligation Register`,
      "Documents Used: Compliance Obligation Register, Regulatory Alignment Checklist, Data Processing Record",
      `Control Point: The procedure must not proceed to the approval stage unless all mandatory compliance obligations have been verified as met. Any non-compliance must be escalated to the responsible authority level.`,
      `Expected Output: Completed compliance verification checklist, documented confirmation of legislative alignment, and any non-compliance records with assigned remediation actions.`,
      `Exception Handling: If a compliance gap is identified, the reviewer assesses its materiality. Material gaps are escalated to the compliance officer and the procedure output is held pending remediation. Non-material gaps may proceed with a corrective action plan attached to the procedure record.`,
    ],
    (n) => [
      `Step ${n}: Exception and Deviation Reconciliation`,
      `Objective: Review all exceptions, deviations, and discrepancies that occurred during the ${title} procedure execution, confirm that each has been appropriately resolved or escalated, and document the final status.`,
      `The operator reviews the exception and deviation logs generated during the procedure execution. Each entry is examined to confirm that a root cause has been identified, a corrective action has been taken or planned, and the residual risk has been assessed. Exceptions that were escalated during execution are checked to confirm that the escalation was acknowledged by the appropriate authority level and that a response or decision was received. Any exceptions that remain open at this stage are reviewed for materiality. Open exceptions rated medium or higher are escalated to the department lead or compliance officer for immediate decision. The operator compiles an exception reconciliation report that lists each exception, its root cause, the corrective action taken, the escalation status, and the final disposition. This report becomes part of the permanent procedure record. For ${band} organisations, the exception reconciliation report is reviewed by the quality assurance function before the procedure is closed.`,
      `Responsible Person: ${size === "1-10" ? "Chief Operator" : size === "10-50" ? "Department Lead" : "Quality Assurance Manager"}`,
      `Systems Used: ${primarySys} Exception Management Module`,
      "Documents Used: Exception Log, Deviation Register, Exception Reconciliation Report Template",
      `Control Point: All exceptions rated medium or higher must have a documented disposition before the procedure record can be finalised. Open exceptions without an assigned owner or target date are escalated immediately.`,
      `Expected Output: Completed exception reconciliation report showing each exception's root cause, corrective action, escalation history, and final status. Any unresolved exceptions with escalation documentation.`,
      `Exception Handling: If an exception cannot be resolved within the procedure timeline, it is formally transferred to the organisational issues register with a designated owner, target resolution date, and interim risk acceptance. The procedure record cross-references the issues register entry.`,
    ],
    (n) => [
      `Step ${n}: Approval and Authorisation Gate`,
      `Objective: Obtain formal approval of the ${title} procedure outputs from the authorised approver, confirming that the procedure has been executed in accordance with the defined specification and that outputs are fit for purpose.`,
      `The operator submits the complete procedure record, including the output package, compliance verification, quality verification, and exception reconciliation report, to the designated approver in ${primarySys}. The approver reviews the complete record against the approval criteria defined in the procedure governance framework. The review covers: completeness of the execution record, accuracy of outputs, compliance with regulatory and legislative requirements, resolution or escalation of all exceptions, and alignment with the defined scope and objectives. The approver may request additional information or clarification, in which case the operator provides the requested information within two hours. Once satisfied, the approver formally approves the procedure in ${primarySys}, which triggers the closure workflow. The approval is recorded with the approver's identity, timestamp, and any conditions attached to the approval. For ${band} organisations, the approval chain follows the authority matrix defined in the procedure governance section, with higher-value or higher-risk procedures requiring approval at a more senior level.`,
      `Responsible Person: ${size === "1-10" ? "Chief Operator or External Consultant" : size === "10-50" ? "Department Head" : "Department Head or Executive Sponsor"}`,
      `Systems Used: ${primarySys} Approval Workflow Module`,
      "Documents Used: Procedure Record, Approval Criteria Matrix, Authority Matrix",
      `Control Point: No procedure may be closed without formal approval recorded in ${primarySys}. Retrospective approval is not permitted. The approver must be independent of the execution where the control framework requires segregation.`,
      `Expected Output: Formal approval record with approver identity, timestamp, approval conditions (if any), and system-generated approval reference.`,
      `Exception Handling: If the required approver is unavailable, the pre-designated deputy or delegate assumes approval authority. If no deputy exists, the procedure is escalated to the next authority level. Approval by delegation is recorded with the delegating authority's pre-authorisation reference.`,
    ],
    (n) => [
      `Step ${n}: Record Collation and Evidence File Compilation`,
      `Objective: Compile all records generated during the ${title} procedure into a structured evidence file that demonstrates complete and compliant execution for audit and regulatory purposes.`,
      `The operator assembles the complete evidence file by collecting all records generated during the procedure execution. This includes the procedure log, system audit trail extracts, quality verification checklists, compliance verification records, exception and deviation logs, approval records, and the final output package. Each document is checked for readability, completeness, and correct file naming. The evidence file is structured according to the organisational evidence filing standard, with each document indexed against the corresponding procedure step. Where the ${industry} sector requires specific evidence formats or certification, the operator confirms that these requirements are met. The operator generates an evidence file index that lists each document, its source, its version, and the procedure step it supports. The complete evidence file is stored in the document management system with the correct retention classification applied. The system generates a checksum or verification hash for the evidence file to detect any subsequent unauthorised modification. For ${band} organisations, this evidence file constitutes the primary defence in any regulatory investigation or audit.`,
      `Responsible Person: ${size === "1-10" ? "Chief Operator" : "Procedure Operator"}`,
      `Systems Used: ${formatSystems(systems)}, Document Management System, Evidence Management Module`,
      "Documents Used: Evidence File Index, Document Naming Convention Guide, Evidence Quality Criteria",
      `Control Point: Every procedure step must have corresponding evidence in the evidence file. Any step without supporting evidence is documented as an exception, and the procedure record must include a justification.`,
      `Expected Output: Complete evidence file with indexed documents, verification hash, and retention classification. Evidence file index cross-referenced to procedure steps.`,
      `Exception Handling: If a required piece of evidence cannot be located, the operator investigates whether it was generated during execution. If it was not generated, this is documented as a procedural non-compliance. If it was generated but lost, the operator attempts to retrieve it from system backups. Unrecoverable evidence is documented with a statement of why it is missing and what mitigating records exist.`,
    ],
    (n) => [
      `Step ${n}: Stakeholder Notification and Output Distribution`,
      `Objective: Distribute the ${title} procedure outputs to all identified stakeholders, confirm receipt, and provide any necessary briefing or contextual information to support effective use of the outputs.`,
      `The operator identifies the distribution list from the stakeholder register updated in Step ${n - 11}. Each stakeholder receives a notification that the procedure outputs are available, along with a summary of the key outcomes, any actions required from the recipient, and the availability of supporting documentation in the document management system. Where the ${industry} sector or regulatory framework requires formal handover of specific outputs, the operator arranges the handover and obtains a receipt. Stakeholders who require a briefing on the outputs are offered a briefing session within five working days. The operator confirms that the distribution is complete by checking read receipts, system access logs, or signed acknowledgements. Non-responsive stakeholders are followed up within two working days. The distribution record is added to the procedure file, confirming that each stakeholder has been notified and has either received the outputs or been offered access. For ${band} organisations, stakeholders with regulatory or compliance responsibilities receive priority notification.`,
      `Responsible Person: ${size === "1-10" ? "Chief Operator" : "Procedure Operator"}`,
      `Systems Used: ${primarySys}, ${size === "50+" ? "Enterprise Communication Platform" : "Communication Tools"}`,
      "Documents Used: Stakeholder Distribution List, Output Summary Document, Distribution Tracking Log",
      `Control Point: All mandatory stakeholders must receive notification of output availability before the procedure is formally closed. Optional stakeholders may be notified after closure.`,
      `Expected Output: Completed distribution log with stakeholder acknowledgements, follow-up records, and distribution tracking confirmation.`,
      `Exception Handling: If a mandatory stakeholder does not acknowledge receipt within the defined period, the operator escalates to the stakeholder's line manager. If the stakeholder is unavailable, a deputy or delegate is identified and notified.`,
    ],
  ];

  const enterpriseSteps: ((n: number) => string[])[] = [
    (n) => [
      `Step ${n}: Periodic Progress Monitoring and Control Adjustment`,
      `Objective: Monitor the execution progress of the ${title} procedure against the planned timeline, adjust resource allocation if required, and document any material variances for management review.`,
      `The department lead or supervisor reviews the execution progress report generated by ${primarySys}. Actual progress is compared against the planned timeline for each completed step. Any step that has exceeded its allocated duration or is approaching its deadline is flagged for attention. Where the ${industry} sector imposes specific timing requirements for operational procedures, compliance with those timing requirements is verified. The supervisor adjusts resource allocation if required to bring the procedure back on track, documenting the adjustment and its rationale. Material variances, defined as any step exceeding 120 percent of its allocated time, are escalated to the department head with a variance explanation and corrective action plan. The progress monitoring record is added to the procedure file. For enterprises operating at scale, this monitoring step is supported by automated dashboard reporting in ${primarySys}, but the supervisor's independent assessment and sign-off remain mandatory before the procedure proceeds to the next phase.`,
      `Responsible Person: ${size === "10-50" ? "Supervisor" : "Department Head"}`,
      `Systems Used: ${primarySys} Reporting Module, ${size === "50+" ? "Enterprise Dashboard, Resource Management System" : "Progress Tracking Tool"}`,
      "Documents Used: Progress Report, Variance Analysis Template, Resource Adjustment Log",
      `Control Point: Procedures with variances exceeding the defined threshold must have documented corrective action before proceeding. The department head reviews and approves all variance records.`,
      `Expected Output: Completed progress monitoring report with variance analysis, resource adjustment records, and escalation documentation for material variances.`,
      `Exception Handling: If the procedure is running significantly behind schedule, the department head may authorise additional resources or approve a revised timeline. Any timeline revision is documented and communicated to all stakeholders.`,
    ],
    (n) => [
      `Step ${n}: Process Improvement and Optimisation Review`,
      `Objective: Evaluate the execution of the ${title} procedure to identify opportunities for process improvement, efficiency gains, or control enhancement, and document recommendations for the next review cycle.`,
      `The operator and supervisor conduct a post-execution review of the ${title} procedure. The review examines the procedure's efficiency, effectiveness, and control performance based on the data captured during execution. Particular attention is given to steps that experienced delays, generated exceptions, required rework, or produced unexpected outcomes. The reviewer identifies whether these issues resulted from procedure design, system limitations, operator training gaps, or external factors. Recommendations for improvement are documented in the continuous improvement register. Each recommendation is assigned a priority rating based on its potential impact on efficiency, risk reduction, or compliance improvement. For ${industry} sector procedures, improvement recommendations that affect regulatory compliance outcomes are flagged for pre-implementation review by the compliance officer. The improvement review record is added to the procedure file and the recommendations are scheduled for consideration at the next procedure governance review meeting.`,
      `Responsible Person: ${size === "10-50" ? "Supervisor" : "Process Improvement Specialist"}`,
      `Systems Used: ${primarySys}, Continuous Improvement Register`,
      "Documents Used: Procedure Execution Data, Improvement Recommendation Template, Continuous Improvement Register",
      `Control Point: Every ${title} procedure execution must have a process improvement review completed before closure. The review may conclude that no improvements are required, but the review must still be documented.`,
      `Expected Output: Completed improvement review record with recommendations, priority ratings, and scheduled review date. All recommendations logged in the continuous improvement register.`,
      `Exception Handling: If the operator or supervisor identifies a systemic issue that poses an immediate risk to procedure effectiveness or compliance, they escalate it as a high-priority finding. The procedure owner initiates an expedited procedure review within 10 working days.`,
    ],
  ];

  const enterpriseSteps2: ((n: number) => string[])[] = [
    (n) => [
      `Step ${n}: Management Review and Strategic Alignment Confirmation`,
      `Objective: Conduct a management-level review of the ${title} procedure execution outcome, confirm strategic alignment with organisational objectives, and authorise any changes to the procedure framework arising from lessons learned.`,
      `The department head or executive sponsor reviews the complete procedure record, including the execution summary, performance metrics, exception reconciliation, quality verification, compliance confirmation, and improvement recommendations. The review confirms that the procedure output supports the organisation's strategic objectives for the ${industry} sector and that any regulatory or compliance obligations have been fully discharged. Where the procedure has identified systemic issues or strategic risks, the management review assigns ownership and target dates for resolution. The reviewer signs off on the procedure closure, confirming that all required steps have been completed to an acceptable standard. The management review record is added to the governance section of the procedure file. For enterprises operating under enhanced governance standards, this management review is a mandatory control gate before the procedure record is archived and any lessons learned are incorporated into the next procedure review cycle.`,
      `Responsible Person: ${size === "50+" ? "Executive Sponsor" : "Department Head"}`,
      `Systems Used: ${primarySys} Governance Dashboard`,
      "Documents Used: Complete Procedure Record, Management Review Checklist, Strategic Alignment Matrix",
      `Control Point: The procedure must not be archived until the management review is completed and signed off. Any strategic risks or systemic issues identified must have assigned owners and target dates.`,
      `Expected Output: Completed management review record with sign-off, strategic alignment confirmation, and assigned actions for any systemic or strategic findings.`,
      `Exception Handling: If the management review identifies a material issue that requires further investigation, the reviewer may defer closure and request a supplementary review. The supplementary review is completed within 10 working days.`,
    ],
    (n) => [
      `Step ${n}: Final Archival and Record Retention Confirmation`,
      `Objective: Complete the archival of the ${title} procedure record, confirm that the correct retention period has been applied, and generate the archival certificate that serves as the permanent record of compliance.`,
      `The operator confirms that the complete procedure record, including the evidence file, approval records, exception reconciliation, and management review sign-off, has been stored in the document management system. The retention period applicable to the procedure is confirmed against the organisational retention schedule, taking into account the ${getLegislation("UK").retention}. The retention classification is applied in the document management system, and any automated deletion or review triggers are configured. The system generates an archival certificate that confirms the procedure reference, title, execution date, approving authority, evidence file verification hash, retention period, and archival date. The archival certificate is stored in the permanent company record. For ${band} organisations, the archival certificate serves as the definitive evidence of compliance and must be producible within the response time required by any regulatory authority or audit body. The operator confirms that the archived record is accessible only to authorised personnel and that access is logged.`,
      `Responsible Person: ${size === "1-10" ? "Chief Operator" : "Records Administrator"}`,
      `Systems Used: ${primarySys} Document Management System, Records Retention Module`,
      "Documents Used: Retention Schedule, Archival Certificate Template, Records Management Policy",
      `Control Point: The procedure record must not be deleted or modified after archival. Any post-archival access is logged and requires documented authorisation. The archival certificate is the definitive closure record.`,
      `Expected Output: Completed archival with retention classification applied, verification hash generated, and archival certificate stored in the permanent company record.`,
      `Exception Handling: If the document management system cannot apply the required retention classification, the operator notifies the system administrator. The record is held in a controlled holding state with restricted access until the retention classification can be applied correctly. Manual retention tracking is implemented as a temporary measure.`,
    ],
  ];

  const baseSteps = stepTemplates;
  const extraSteps = size === "10-50" ? enterpriseSteps : size === "50+" ? [...enterpriseSteps, ...enterpriseSteps2] : [];

  const allTemplates = [...baseSteps, ...extraSteps];
  const stepCount = getStepCount(size);

  for (let i = 0; i < Math.min(stepCount, allTemplates.length); i++) {
    steps.push(allTemplates[i](i + 1));
  }

  while (steps.length < stepCount) {
    const n = steps.length + 1;
    const baseIdx = n % baseSteps.length;
    const template = baseSteps[baseIdx];
    steps.push(template(n));
  }

  return steps;
}

function generateSection(sectionNumber: string, heading: string, content: string[]): SOPSection {
  return { heading: `${sectionNumber}. ${heading}`, content };
}

export function generateSOPDocument(
  title: string,
  company: string,
  systems: string,
  headcount: string,
  jurisdiction: Jurisdiction,
  size: CompanySize,
  industry: string = "General Business",
  sopType: string = "Operational"
): SOPDocument {
  const resolvedSize = size || headcountToBand(headcount);
  const stepCount = getStepCount(resolvedSize);
  const band = resolvedSize === "1-10" ? "startup / small business" : resolvedSize === "10-50" ? "growing business" : "enterprise";
  const leg = getLegislation(jurisdiction);
  const sys = formatSystems(systems);
  const sysShort = formatSystemsShort(systems);
  const sysList = getSystemsList(systems);
  const ref = docRef(title);
  const today = now();
  const tierLabel = getTierLabel(resolvedSize);

  const sections: SOPSection[] = [];

  sections.push(generateSection("01", "Document Control", [
    `Document Title: ${title}`,
    `Document Reference: ${ref}`,
    `Version: 1.0`,
    `Classification: ${sopType || "Operational"} — Controlled Document`,
    `Status: Active`,
    `Effective Date: ${today}`,
    `Owner: ${company} — ${industry} Division`,
    `Author: SOPMaster Governance Platform`,
    `Location: Document Management System — ${sysShort}`,
    `This document is a controlled operational procedure. Unauthorised modification invalidates its verification hash. Any printed copy is uncontrolled unless stamped "CONTROLLED COPY" by the document control officer.`,
  ]));

  sections.push(generateSection("02", "Governance Profile", [
    `Organisation: ${company}`,
    `Industry Sector: ${industry}`,
    `Department: ${sopType} Operations`,
    `Jurisdiction: ${jurisdiction}`,
    `Organisational Scale: ${band} (${headcount} personnel)`,
    `Governance Tier: ${tierLabel}`,
    `Procedure Classification: ${sopType || "Standard Operating Procedure"}`,
    `Document Hierarchy: This procedure sits within the ${company} Operational Governance Framework and is subordinate to the Corporate Governance Policy.`,
    `Regulatory Perimeter: All activities governed by this procedure fall within the regulatory jurisdiction of ${jurisdiction} and must comply with the applicable legislative framework detailed in Section 07.`,
  ]));

  sections.push(generateSection("03", "Executive Summary", [
    `This Standard Operating Procedure defines the mandatory protocol for "${title}" at ${company}. It establishes a ${stepCount}-step controlled execution framework designed to deliver consistent, auditable, and compliant outcomes across all operational contexts.`,
    `The procedure operates within the ${industry} sector under ${jurisdiction} jurisdiction and is classified as ${sopType || "Operational"}. It applies to all personnel engaged in the execution, supervision, quality assurance, and governance of the activities it describes.`,
    `Adherence to this procedure is mandatory. Non-compliance exposes ${company} to regulatory sanction, operational failure, audit qualification, and legal liability. All exceptions must be documented, justified, and escalated through the defined governance channels.`,
    `This document has been prepared to the standard expected by regulatory authorities, external auditors, and professional consultancy practice. It is designed to be implemented immediately, used by operational staff, reviewed by consultants, and stored as permanent company documentation.`,
  ]));

  sections.push(generateSection("04", "Purpose", [
    `The purpose of this Standard Operating Procedure is to establish a definitive, repeatable, and auditable methodology for executing "${title}" across all operational areas of ${company}. It serves as the single source of truth for how this activity must be conducted, supervised, recorded, and governed.`,
    `This procedure is designed to achieve five primary objectives: first, to standardise execution so that every instance of "${title}" produces consistent outcomes regardless of which operator performs the work. Second, to embed regulatory and legislative compliance into every step of the workflow, eliminating reliance on individual knowledge or discretion. Third, to create a complete and defensible audit trail that demonstrates compliance with applicable legal, regulatory, and industry standards. Fourth, to define clear accountability boundaries through assigned roles, responsibilities, and authority levels. Fifth, to establish a framework for continuous improvement through documented performance measurement, exception analysis, and periodic review.`,
    `This procedure does not replace professional judgement where it is required, but it mandates that any exercise of judgement be documented with the rationale, the factors considered, and the authority under which the judgement was exercised.`,
  ]));

  sections.push(generateSection("05", "Scope", [
    `This procedure applies to all activities, personnel, systems, and third-party interactions associated with the execution of "${title}" at ${company}. It covers the complete lifecycle from initiation through planning, execution, quality verification, compliance checking, approval, record keeping, and archival.`,
    `Inclusions: All internal operational activities directly related to ${title}. All interactions with ${sys} used in the execution of this procedure. All personnel with assigned roles in the procedure governance matrix. All records, documents, and evidence generated during procedure execution. All third-party service providers whose activities form part of the procedure workflow.`,
    `Exclusions: Activities that fall outside the ${industry} operational framework as defined in the Corporate Governance Policy. Emergency or business continuity scenarios where this procedure would impede the required response speed — in such cases, the emergency response protocol takes precedence, and this procedure resumes at the earliest safe opportunity. Strategic decisions concerning the establishment, modification, or discontinuation of this procedure — those are governed by the Procedure Governance Framework.`,
    `Boundary Conditions: This procedure is effective from the date of authorisation and remains in force until superseded, withdrawn, or expired per the review schedule in Section 28. Personnel assigned to roles defined in this procedure must have completed the required training and competency assessment before exercising those roles.`,
  ]));

  sections.push(generateSection("06", "Objectives", [
    `Operational Objective: Achieve consistent, repeatable execution of "${title}" across all instances, eliminating process variation and reducing execution errors to below the defined quality threshold.`,
    `Compliance Objective: Maintain full alignment with ${leg.dataProtection}, ${leg.healthSafety}, ${leg.corporate}, and sector-specific regulatory requirements applicable to ${industry} operations in ${jurisdiction}.`,
    `Audit Objective: Generate a complete, indexed, and verifiable evidence file for every procedure execution that satisfies regulatory audit requirements and can be produced within the response time mandated by the relevant authority.`,
    `Efficiency Objective: Complete each procedure execution within the defined SLA targets, with continuous improvement reviews identifying and implementing efficiency gains without compromising control effectiveness.`,
    `Governance Objective: Maintain a clear and documented chain of accountability from the operator through to the executive sponsor, with every decision, approval, and exception traceable to a named individual and timestamped in the audit log.`,
    `Risk Objective: Identify, assess, and control operational risks associated with ${title} through the pre-execution risk assessment process, with residual risks documented and accepted at the appropriate authority level before execution proceeds.`,
  ]));

  sections.push(generateSection("07", "Applicable Legislation", [
    `Data Protection and Privacy: ${leg.dataProtection}. All processing of personal data within this procedure must be conducted in accordance with the data protection principles, with a documented lawful basis, and subject to the data subject rights framework.`,
    `Employment and Labour Law: ${leg.employment}. All procedures that involve employment-related decisions, working time, or staff management must comply with the applicable employment legislation framework.`,
    `Health and Safety: ${leg.healthSafety}. All procedures with workplace safety implications must incorporate the required risk assessments, control measures, and documentation.`,
    `Corporate and Commercial Law: ${leg.corporate}. All procedures involving corporate decisions, contracting, or financial commitments must comply with corporate governance requirements.`,
    `Anti-Discrimination: ${leg.antiDiscrimination}. All procedures must be executed without discrimination and must promote equality of opportunity in accordance with applicable law.`,
    `Sector-Specific Regulations: ${leg.sectorSpecific.join("; ")}. Personnel executing this procedure must be aware of and comply with the sector-specific regulatory requirements that apply to their role and activity.`,
    `This legislative framework is not exhaustive. Personnel should seek legal advice if they are uncertain about the application of any legislation to their activities under this procedure.`,
  ]));

  sections.push(generateSection("08", "Industry Regulations", [
    `The ${industry} sector operates within a regulatory environment that imposes specific obligations on ${company} in the execution of this procedure. The following regulatory requirements have been identified as directly relevant to "${title}".`,
    ...(industry === "Finance" ? [
      "Financial Conduct Authority (FCA) Handbook — including SYSC (Senior Management Arrangements, Systems and Controls), SUP (Supervision), COBS (Conduct of Business), and PRIN (Principles for Businesses) as applicable to the specific activity.",
      "FCA Senior Managers and Certification Regime (SM&CR) — individual accountability allocated for each function performed under this procedure.",
      "Prudential Regulation Authority (PRA) Rulebook — where the activity falls within PRA-regulated perimeter.",
      "Money Laundering Regulations 2017 — customer due diligence, record keeping, and internal controls for relevant activities.",
      "Market Abuse Regulation (MAR) — where the procedure involves or touches upon market-sensitive information.",
      "All records generated under this procedure are regulatory records and must be maintained per FCA record-keeping requirements.",
    ] : industry === "Healthcare" ? [
      "Care Quality Commission (CQC) Fundamental Standards — all activities must meet the standards of quality and safety.",
      "Health and Social Care Act 2008 (Regulated Activities) Regulations — compliance with the regulatory framework for healthcare provision.",
      "NHS Digital Data Security Standards — where the procedure involves or connects to NHS systems or data.",
      "Clinical Governance Framework — all clinical procedures must be evidence-based and subject to clinical audit.",
      "Information governance requirements under the Data Protection Act 2018 and UK GDPR apply to all patient data processed during this procedure.",
    ] : industry === "Construction" ? [
      "Construction (Design and Management) Regulations 2015 — legal duties for managing health, safety, and welfare on construction projects.",
      "Health and Safety Executive (HSE) guidance for the construction sector — all site-based activities must comply with applicable approved codes of practice.",
      "Building Regulations 2010 — compliance with building standards and approved document requirements.",
      "Environmental Protection Act 1990 — waste management and environmental controls for construction activities.",
      "All contractors and subcontractors engaged under this procedure must hold valid and current certifications for the work they perform.",
    ] : industry === "SaaS" ? [
      "UK GDPR and Data Protection Act 2018 — all user data processing must comply with data protection principles, including data minimisation and purpose limitation.",
      "Privacy and Electronic Communications Regulations (PECR) — marketing communications, cookie usage, and electronic messaging must comply with PECR requirements.",
      "Network and Information Systems (NIS) Regulations 2018 — security obligations for digital service providers.",
      "ISO/IEC 27001:2022 — information security management standard applicable to SaaS operations handling customer data.",
      "Sector-specific consumer protection regulations under the Consumer Rights Act 2015 apply to SaaS subscription models.",
    ] : industry === "Accountancy" ? [
      "ICAEW Code of Ethics — professional conduct standards for chartered accountants.",
      "Anti-Money Laundering (AML) Regulations 2017 — customer due diligence, record keeping, and suspicious activity reporting.",
      "HMRC Standards for Agents — professional conduct and filing obligations for tax practitioners.",
      "Financial Reporting Council (FRC) standards — auditing and reporting standards applicable to regulated entities.",
      "Professional indemnity insurance requirements and continuing professional development obligations apply to all personnel exercising professional accountancy functions under this procedure.",
    ] : [
      `${industry} sector regulatory framework as published by the relevant regulatory body for ${jurisdiction}.`,
      `${getLegislation(jurisdiction).sectorSpecific.join("; ")}.`,
      "Personnel should consult with the compliance officer to confirm the full set of regulatory obligations applicable to their specific role and activity under this procedure.",
    ]),
  ]));

  sections.push(generateSection("09", "Standards and Frameworks", [
    `This procedure is aligned with the following standards and governance frameworks. Compliance with these standards is mandatory unless a documented and approved deviation has been granted.`,
    `ISO 9001:2015 — Quality Management Systems. The procedure design, execution, verification, and continuous improvement cycle follows the Plan-Do-Check-Act methodology.`,
    `ISO 27001:2022 — Information Security Management. Where this procedure involves or connects to information systems, it incorporates the applicable information security controls.`,
    `ISO 37001:2016 — Anti-Bribery Management Systems. All procedures involving external parties, financial decisions, or discretionary authority incorporate anti-bribery controls.`,
    `Three Lines of Defence Model — Operational management (first line), risk and compliance oversight (second line), and independent audit assurance (third line) are embedded in the governance structure.`,
    `COSO Internal Control — Integrated Framework. Control activities, information and communication, and monitoring activities are designed in accordance with COSO principles.`,
    `Applicable industry-specific standards for ${industry} operations in ${jurisdiction}. Personnel should confirm the current applicable standards with the compliance officer.`,
  ]));

  sections.push(generateSection("10", "Roles and Responsibilities", [
    ...(resolvedSize === "1-10" ? [
      `Chief Operator (Director or Founder): Owns execution of all procedure steps and is the single accountable party for ${title}. Liability for regulatory non-compliance or operational failure rests with this role. The Chief Operator may delegate execution to trained personnel but retains accountability.`,
      `${industry} Operations Lead: Responsible for technical execution of industry-specific activities. Reports directly to the Chief Operator and maintains operational records.`,
      `System Access: All personnel with roles in this procedure must hold current ${industry} sector certifications where required by regulation and must have completed the prescribed training in ${sysShort} before exercising any operational role.`,
      `External Advisors: Engaged for specialist compliance, legal, or technical review where the complexity of the procedure exceeds internal capability. External advisors do not displace internal accountability.`,
      `All personnel assigned to roles in this procedure must read, acknowledge, and comply with its requirements. Any deviation requires documented authorisation from the Chief Operator.`,
    ] : resolvedSize === "10-50" ? [
      `Department Lead: Accountable for procedure adherence within the department. Reviews exceptions, signs off on completions, and reports operational performance to the executive team. The Department Lead holds delegated authority from the executive for day-to-day procedure governance.`,
      `Procedure Operator: Executes the procedure steps in accordance with the defined specification. Maintains accurate execution records in ${sysShort} and reports exceptions immediately to the responsible supervisor.`,
      `Supervisor: Reviews completed work outputs, approves standard completions, manages exception handling within delegated authority, and escalates issues beyond their authority level within the defined SLA.`,
      `System Owner: Maintains ${sys}, manages user access controls, ensures system availability meets operational requirements, and provides technical support for procedure-related system issues.`,
      `Compliance Reviewer: Conducts periodic compliance audits of procedure execution, flags regulatory gaps to the Department Lead, and maintains the compliance evidence repository.`,
      `${industry} Technical Specialist: Provides technical guidance on ${industry}-specific aspects of the procedure and confirms that technical outputs meet professional standards.`,
    ] : [
      `Executive Sponsor: Provides strategic oversight, resource allocation authority, and ultimate accountability for ${title} compliance. The Executive Sponsor receives escalated issues and confirms strategic alignment.`,
      `Department Head: Accountable for procedure adherence within the department. Reports operational performance and escalated issues to the Executive Sponsor. Authorises procedure variations within governance boundaries.`,
      `Supervisor: Reviews execution outputs, manages team performance, conducts quality verification, and escalates issues beyond delegated authority within the defined SLA.`,
      `Procedure Operator: Executes the procedure steps, maintains detailed and accurate records, and reports exceptions immediately upon identification.`,
      `Compliance Officer: Audits procedure adherence, maintains the compliance obligation register, conducts regulatory impact assessments for procedure changes, and reports compliance status to the governance committee.`,
      `System Administrator: Manages ${sys}, enforces role-based access control, maintains the system audit log, and ensures system integrity.`,
      `Internal Audit: Conducts independent reviews of procedure effectiveness and control operation on a risk-based schedule. Reports findings to the audit committee.`,
      `${industry} Technical Lead: Provides authoritative technical guidance for ${industry}-specific procedure execution and confirms technical outputs meet professional and regulatory standards.`,
    ]),
  ]));

  sections.push(generateSection("11", "Required Systems", [
    `The following systems are required to execute this procedure. Personnel must have completed the prescribed training and hold current access credentials for each system before assuming any operational role.`,
    ...sysList.map((s, i) => `${i + 1}. ${s} — ${i === 0 ? "Primary workflow management and audit logging system. All procedure steps are initiated, tracked, and recorded in this system." : i === 1 ? "Secondary system supporting specific procedure activities. Interfaces with the primary system for data exchange." : `Supplementary system used for specialised aspects of the ${title} workflow.`}`),
    `System Availability: All required systems must be operational before procedure execution commences. System downtime must be reported through the IT incident management process and the procedure may be delayed or executed using the approved manual fallback procedure documented in the Business Continuity Plan.`,
    `System Access: Access to all systems is role-based and individually assigned. Shared accounts are prohibited. System access audits are conducted quarterly with findings reported to the governance committee.`,
  ]));

  sections.push(generateSection("12", "Required Documentation", [
    `The following documents must be available and current before executing this procedure. All documents are maintained in the Document Management System under version control.`,
    `Procedure Specification Document — defines the detailed requirements, inputs, outputs, and success criteria for "${title}".`,
    `Quality Management Plan — defines the quality standards, verification methodology, and acceptance criteria applicable to procedure outputs.`,
    `Risk Assessment and Control Matrix — documents the risk profile, control measures, and residual risk acceptance for this procedure.`,
    `Compliance Obligation Register — maps all legal, regulatory, and industry obligations to the corresponding procedure steps and controls.`,
    `Training and Competency Records — confirms that all personnel assigned to roles in this procedure have completed the required training and competency assessment.`,
    `Organisational Charts and Authority Matrix — defines the reporting lines, delegated authorities, and approval thresholds applicable to this procedure.`,
    `All documents must be the current authorised version. Outdated documents must not be used for procedure execution.`,
  ]));

  sections.push(generateSection("13", "Inputs", [
    `The following inputs are required to initiate and execute the "${title}" procedure. Each input must meet the defined quality criteria before the procedure can proceed.`,
    `Initiation Request — a formal instruction to execute the procedure, including the scope, priority, and any special instructions. Must be authorised by the responsible approver.`,
    `Customer or Subject Data — the specific data, information, or materials that form the subject of the procedure. Must be complete, accurate, and provided in the required format.`,
    `Reference Materials — any specifications, standards, templates, or guidance documents required to execute the procedure correctly. Must be the current authorised version.`,
    `System Access Credentials — valid user accounts with the required permissions in ${sys}. Credentials must be current and not shared.`,
    `Resource Confirmation — confirmation that all required resources have been assembled and verified against the resource checklist.`,
    `Risk Assessment Confirmation — completed pre-execution risk assessment confirming that all identified risks have assigned controls and that residual risks are within appetite.`,
    `Inputs that do not meet the defined quality criteria must be rejected and returned to the provider with a clear explanation of the deficiency. The procedure initiation is deferred until all inputs are confirmed as meeting the required standard.`,
  ]));

  sections.push(generateSection("14", "Trigger", [
    `The "${title}" procedure is triggered by one or more of the following events. The trigger event must be documented in the procedure log with the date, time, and source of the trigger.`,
    `Scheduled Trigger: The procedure is executed according to a predefined schedule. The schedule is maintained by the operations team and approved by the Department Lead. Scheduled triggers must be initiated within the defined SLA.`,
    `Event-Driven Trigger: The procedure is initiated in response to a specific event, such as a customer request, a regulatory requirement, a system notification, or an operational incident. The event must be documented and the trigger verified as legitimate before initiation.`,
    `Management Directive: The procedure is initiated by a direct instruction from an authorised manager or executive. The directive must be documented with the authorising individual's identity and authority reference.`,
    `Regulatory or Legal Requirement: The procedure is initiated to meet a regulatory filing deadline, legal obligation, or statutory requirement. The specific obligation and deadline must be referenced in the procedure log.`,
    `In all cases, the trigger event must be validated before procedure initiation. Invalid or unauthorised triggers must be rejected and reported to the responsible authority.`,
  ]));

  sections.push(generateSection("15", "Procedure", [
    `This section contains the complete ${stepCount}-step execution procedure for "${title}". Each step must be executed in sequence. No step may be skipped, reordered, or omitted without documented authorisation from the responsible approver as defined in the authority matrix.`,
    ...generateProcedureSteps(title, company, systems, industry, sopType, resolvedSize, sopType).map((step, idx) => {
      const fields = ["Step Number", "Step Name", "Objective", "Detailed Instructions", "Responsible Person", "Systems Used", "Documents Used", "Control Point", "Expected Output", "Exception Handling"];
      return `<PROCEDURE_STEP>${fields.map((f, fi) => `[${f}] ${step[fi] || ""}`).join("\n")}</PROCEDURE_STEP>`;
    }),
    `Upon completion of all ${stepCount} steps, the operator confirms that the procedure execution is complete and submits the procedure record for quality verification and approval per the defined workflow.`,
  ]));

  sections.push(generateSection("16", "Outputs", [
    `The "${title}" procedure produces the following outputs. Each output must meet the defined quality and compliance standards before it is released or distributed.`,
    `Primary Output Document — the main deliverable of the procedure, as defined in the procedure specification. Must contain all mandatory fields, correct data, and appropriate formatting.`,
    `Procedure Execution Log — a complete, timestamped record of every step executed, including operator identity, system interactions, decisions made, and exceptions encountered. Must be generated by ${sysShort} or manually completed using the approved template.`,
    `Evidence File — a structured compilation of all records, documents, and evidence generated during procedure execution. Must be indexed, verified, and stored with the correct retention classification.`,
    `Exception and Deviation Report — a consolidated report of all exceptions, deviations, and discrepancies that occurred during execution, with root cause, corrective action, and escalation status for each entry.`,
    `Compliance Confirmation Certificate — a formal statement confirming that the procedure was executed in compliance with all applicable legal, regulatory, and industry requirements. Signed by the compliance officer or authorised delegate.`,
    `All outputs must be reviewed for completeness and accuracy before release. Incomplete or non-compliant outputs must be held pending remediation.`,
  ]));

  sections.push(generateSection("17", "Evidence Requirements", [
    `Every execution of the "${title}" procedure must generate a complete evidence file that satisfies regulatory audit requirements and can be produced within the response time mandated by the relevant authority.`,
    `Mandatory Evidence Components: Completed procedure log with step-by-step execution records, including operator identity and timestamps for every step. System audit trail extracts confirming all system interactions. Quality verification checklists and sign-off records. Compliance verification records confirming alignment with legislative and regulatory requirements. Exception and deviation logs with root cause analysis and escalation documentation. Approval records with approver identity, timestamp, and any conditions. Final output document as released or distributed. Stakeholder notification and distribution records.`,
    `Evidence Quality Standards: All evidence must be legible, complete, and verifiable. Digital evidence must be stored in an unalterable format with system-generated checksums or verification hashes. Handwritten evidence must be legible, dated, and signed.`,
    `Evidence File Structure: The evidence file must be indexed and structured to allow rapid retrieval of evidence for any procedure step. The index must cross-reference each evidence item to the corresponding procedure step.`,
    `Retention and Access: The evidence file must be retained for the full retention period defined in Section 24. Access is role-based and logged. Any non-routine access is flagged and reviewed.`,
  ]));

  sections.push(generateSection("18", "Internal Controls", [
    `The following internal controls operate within the "${title}" procedure. Each control has a defined control objective, control activity, control owner, and frequency of operation.`,
    `Control 1 — Segregation of Duties: No single individual may execute, verify, and approve the same procedure step. Enforced through role-based access controls in ${sysShort} and independent verification of critical steps. Control Owner: System Administrator. Operating Frequency: Continuous — enforced by system configuration and verified by supervisory review.`,
    `Control 2 — Dual Authorisation: All exceptions, deviations, and outputs exceeding the standard approval threshold require dual authorisation before proceeding. Control Owner: Department Lead. Operating Frequency: Per instance — triggered when defined thresholds are exceeded.`,
    `Control 3 — Timeliness Monitoring: All procedure steps are monitored against defined SLA targets. Steps exceeding the SLA threshold are automatically escalated. Control Owner: Supervisor. Operating Frequency: Continuous — system-monitored with manual review at step completion.`,
    `Control 4 — Evidence Integrity: All procedure records are stored in unalterable format. Any modification to a stored record requires system-level authorisation and creates an immutable audit log entry. Control Owner: System Administrator. Operating Frequency: Continuous — system-enforced.`,
    `Control 5 — Independent Compliance Verification: A compliance reviewer independent of the execution team verifies procedure adherence for each execution. Control Owner: Compliance Officer. Operating Frequency: Per execution — completed before procedure closure.`,
    `Control 6 — Management Review: All procedure executions are subject to management review, with escalations reviewed at the appropriate authority level. Control Owner: Executive Sponsor. Operating Frequency: Per execution cycle.`,
    `Control Effectiveness Testing: Each control is tested for effectiveness on a risk-based schedule. Control tests are documented and retained in the compliance evidence repository. Controls that fail effectiveness testing are remediated within the defined timeline.`,
  ]));

  sections.push(generateSection("19", "Risk Register", [
    `The following risks have been identified as relevant to the "${title}" procedure. Each risk is assigned a pre-control and post-control rating, a control owner, and a review frequency.`,
    `Risk 1 — System or Technology Failure: Loss of availability or integrity of ${sys} during procedure execution. Pre-Control Rating: High (4). Controls: System redundancy, backup procedures, manual fallback procedure. Post-Control Rating: Medium (2). Control Owner: System Administrator. Review Frequency: Quarterly.`,
    `Risk 2 — Regulatory Non-Compliance: Failure to comply with applicable legal or regulatory requirements due to procedural gap, operator error, or legislative change. Pre-Control Rating: Critical (5). Controls: Compliance verification step, regulatory obligation register, periodic compliance audit. Post-Control Rating: Low (1). Control Owner: Compliance Officer. Review Frequency: Monthly and on regulatory change.`,
    `Risk 3 — Data Protection Breach: Unauthorised access to, loss of, or improper processing of personal data during procedure execution. Pre-Control Rating: High (4). Controls: Role-based access controls, data handling training, data protection impact assessment, incident response procedure. Post-Control Rating: Medium (2). Control Owner: Data Protection Officer. Review Frequency: Quarterly and on any significant data processing change.`,
    `Risk 4 — Operational Error: Incorrect execution of procedure steps resulting in inaccurate outputs, rework, or operational failure. Pre-Control Rating: Medium (3). Controls: Quality verification step, supervisor review, training and competency assessment. Post-Control Rating: Low (1). Control Owner: Department Lead. Review Frequency: Per execution and monthly aggregate review.`,
    `Risk 5 — Fraud or Unauthorised Activity: Deliberate manipulation of procedure outputs, records, or approvals for personal gain or other improper purpose. Pre-Control Rating: High (4). Controls: Segregation of duties, dual authorisation, immutable audit logs, independent compliance verification. Post-Control Rating: Low (1). Control Owner: Compliance Officer. Review Frequency: Quarterly.`,
    `Risk 6 — Third-Party or Supplier Failure: Failure of an external service provider or system to deliver the required service within the defined SLA. Pre-Control Rating: Medium (3). Controls: Supplier due diligence, service level agreements, performance monitoring, escalation procedures. Post-Control Rating: Low (1). Control Owner: Procurement Manager. Review Frequency: Quarterly.`,
    `Risk acceptance: All residual risks have been reviewed and accepted at the appropriate authority level. Any risk exceeding the organisational risk appetite must be escalated to the Executive Sponsor for acceptance or remediation.`,
  ]));

  sections.push(generateSection("20", "Escalation Matrix", [
    `The following escalation matrix defines the authority levels, decision rights, and response times for issues arising during the "${title}" procedure.`,
    `Level 1 — Operational Escalation: Issue: Step execution delay, minor exception, resource constraint. Escalated To: Supervisor. Response Time: Within 1 hour. Decision Rights: Authorise resource reallocation, approve minor deviations within defined limits, grant timeline extensions up to 4 hours.`,
    `Level 2 — Management Escalation: Issue: SLA breach, medium-rated exception, quality failure, system outage. Escalated To: Department Lead. Response Time: Within 2 hours. Decision Rights: Authorise procedure pause or restart, approve deviations outside Level 1 limits, allocate additional resources, approve revised timelines.`,
    `Level 3 — Executive Escalation: Issue: Regulatory non-compliance, critical system failure, fraud suspicion, material financial exposure, stakeholder complaint escalations. Escalated To: Executive Sponsor. Response Time: Within 1 hour. Decision Rights: Authorise procedure suspension, approve regulatory notifications, direct investigation, commit organisational resources.`,
    `Level 4 — Board or Regulatory Escalation: Issue: Significant regulatory breach, material data breach, notifiable event, legal proceedings. Escalated To: Board of Directors or relevant regulatory authority. Response Time: Per regulatory requirement. Decision Rights: As defined in the Corporate Governance Policy and regulatory mandate.`,
    `All escalations must be documented in the procedure log with the issue description, escalation route, response received, and outcome. Escalations that are not acknowledged within the defined response time are automatically escalated to the next level.`,
  ]));

  sections.push(generateSection("21", "Quality Assurance", [
    `The quality assurance framework for the "${title}" procedure operates at three levels to ensure that every execution meets the defined quality standards.`,
    `Level 1 — Operational Quality Assurance: The operator performs self-verification at each procedure step, confirming that the step output meets the defined quality criteria before proceeding to the next step. Operational quality checks are documented in the procedure log.`,
    `Level 2 — Independent Quality Verification: A reviewer independent of the execution verifies the complete procedure output against the quality specification. The reviewer completes a quality verification checklist, signs off on the output, and logs any discrepancies in the quality register. Discrepancies are returned for correction and re-verified before the procedure proceeds.`,
    `Level 3 — Quality Assurance Audit: The quality assurance function conducts scheduled audits of procedure executions to confirm that the overall quality framework is operating effectively. Audit findings are reported to the governance committee and tracked to closure.`,
    `Quality Standards: All outputs must meet the following minimum quality standards: 100 percent data accuracy, complete documentation for every procedure step, compliance with all applicable regulatory requirements, timeliness within defined SLA targets, and legible and verifiable evidence for every output.`,
    `Quality Metrics: Procedure quality is measured through the following metrics: first-pass quality rate (target 95 percent), defect rate (target below 5 percent), rework rate (target below 3 percent), and stakeholder satisfaction score (target above 4 out of 5).`,
    `Quality improvement: Quality metrics are reviewed monthly by the quality assurance function. Trends are analysed and improvement actions are implemented through the continuous improvement process.`,
  ]));

  sections.push(generateSection("22", "Key Performance Indicators", [
    `The following KPIs are used to measure the performance and effectiveness of the "${title}" procedure. KPIs are measured and reported monthly within five working days of month end.`,
    `KPI 1 — Procedure Completion Rate: Percentage of procedure initiations that complete all ${stepCount} steps. Target: ${resolvedSize === "1-10" ? "100" : "99"} percent. Threshold: ${resolvedSize === "1-10" ? "90" : "95"} percent. Below threshold triggers process review.`,
    `KPI 2 — SLA Compliance Rate: Percentage of procedure steps completed within the defined SLA. Target: 98 percent. Threshold: 90 percent. SLA breaches require root cause analysis within five working days.`,
    `KPI 3 — First-Pass Quality Rate: Percentage of procedure outputs that pass quality verification without rework. Target: 95 percent. Threshold: 85 percent. Rework indicates training or process design gaps.`,
    `KPI 4 — Exception Rate: Percentage of procedure executions that generate one or more exceptions. Target: Below 5 percent of executions. Threshold: Below 10 percent. Above threshold triggers compliance review.`,
    `KPI 5 — Audit Readiness Score: Percentage of procedure evidence files that meet the completeness criteria for regulatory audit. Target: 100 percent. Threshold: 90 percent. Measured through periodic sample audits.`,
    `KPI 6 — Regulatory Breach Rate: Number of regulatory breaches attributable to this procedure. Target: 0. Threshold: 0. Any breach requires immediate escalation to Executive Sponsor and root cause analysis.`,
    `KPI 7 — Continuous Improvement Uptake: Percentage of improvement recommendations from the process improvement review that are implemented within the review cycle. Target: 70 percent. Threshold: 50 percent.`,
    `KPI performance is reported to the governance committee through the monthly operational performance report. Persistent underperformance triggers a procedure review and remediation plan.`,
  ]));

  sections.push(generateSection("23", "Common Failures", [
    `The following operational failures have been identified as common risks in the execution of "${title}" procedures within the ${industry} sector. Each failure is described with its root cause, early warning indicators, and preventive measures.`,
    `Failure 1 — Documentation Gaps: Incomplete or missing evidence for procedure steps, particularly for verification and approval steps. Root Cause: Retrospective documentation practices rather than real-time recording. Early Warning: Increasing time gap between step completion and evidence recording. Preventive Measure: Mandatory real-time logging enforced through ${sysShort}. Evidence completeness check at each control point.`,
    `Failure 2 — Control Point Bypass: Operators skipping control points to expedite processing. Root Cause: Perception that control points add time without value, particularly under pressure. Early Warning: Decreasing average time at control points without corresponding quality improvement. Preventive Measure: System-enforced control points in ${sysShort}. Mandatory sign-off from independent verifier. Auditing of bypass rates and consequences.`,
    `Failure 3 — Unauthorised Deviation: Operators deviating from the defined procedure without documented authorisation. Root Cause: belief that minor deviations do not require formal approval. Early Warning: Increasing frequency of ad-hoc decisions. Preventive Measure: Clear policy that any deviation requires pre-approval. Training on deviation protocol. System controls that flag deviations.`,
    `Failure 4 — Communication Breakdown: Failure to notify stakeholders of procedure initiation, progress, or completion. Root Cause: Assumption that stakeholders are automatically informed by system notifications. Early Warning: Stakeholder complaints about lack of visibility. Preventive Measure: Mandatory stakeholder notification step with receipt tracking. Weekly status reports for extended procedures.`,
    `Failure 5 — Outdated Document Use: Using an outdated version of the procedure or supporting documents. Root Cause: Document management system not checked before commencement. Early Warning: Operator referencing previous version numbering. Preventive Measure: Version verification step at procedure initiation. System restriction preventing use of outdated documents.`,
    `Each failure identified during procedure execution is logged in the exception register with root cause analysis and corrective action. Trend analysis is conducted quarterly to identify systemic issues requiring procedure design changes.`,
  ]));

  sections.push(generateSection("24", "Record Retention", [
    `All records generated by the "${title}" procedure must be retained in accordance with the following schedule. Premature destruction of records is a compliance breach and must be reported immediately.`,
    `Retention Period: ${leg.retention}`,
    `Retention triggers: The retention period commences from the date of procedure completion, as recorded in the procedure closure certificate.`,
    `Storage Requirements: All records must be stored in the designated document management system with the correct retention classification applied. Records must be stored in unalterable format with system-generated verification hashes. Access is role-based and logged.`,
    `Disposal Procedure: Records that have reached the end of their retention period are disposed of through the secure disposal process. Disposal requires: documented authorisation from the Department Lead and Compliance Officer, a disposal certificate generated by the document management system, and confirmation that no legal hold or regulatory investigation applies to the records.`,
    `Legal Hold: If any records covered by this retention schedule become subject to a legal hold, litigation, or regulatory investigation, retention is extended until the hold is formally lifted. The legal hold is documented and the affected records are flagged in the document management system.`,
  ]));

  sections.push(generateSection("25", "Compliance Requirements", [
    `The following compliance requirements apply to the "${title}" procedure. Each requirement must be fulfilled before the procedure can be certified as compliant.`,
    `Regulatory Compliance: The procedure must be executed in full compliance with the legislative and regulatory framework set out in Section 07. Any deviation from regulatory requirements is a compliance breach and must be reported through the escalation matrix.`,
    `Data Protection Compliance: All processing of personal data within this procedure must have a documented lawful basis. Data subject rights requests received during procedure execution must be handled within statutory timeframes. A data protection impact assessment must be completed before the procedure is executed if the processing is likely to result in high risk to individuals.`,
    `Health and Safety Compliance: Where the procedure involves workplace activities, a suitable and sufficient risk assessment must be completed, and reasonably practicable control measures must be implemented before execution.`,
    `Financial Compliance: Where the procedure involves financial transactions, commitments, or reporting, it must comply with applicable financial governance requirements, including authorisation limits and segregation of duties.`,
    `Anti-Bribery and Corruption Compliance: No individual executing this procedure may offer, promise, give, request, or accept any financial or other advantage in connection with the procedure. Any suspicion of bribery or corruption is reported immediately through the escalation matrix.`,
    `Compliance Certification: The compliance officer certifies that the procedure meets all applicable compliance requirements. The compliance certificate is attached to the procedure record before archival.`,
  ]));

  sections.push(generateSection("26", "Audit Requirements", [
    `The "${title}" procedure is subject to the following audit requirements. Audit readiness must be maintained at all times, not only during scheduled audit periods.`,
    `Internal Audit: The internal audit function conducts audits of this procedure on a risk-based schedule. Audits examine: procedure design adequacy, control effectiveness, compliance with legislative and regulatory requirements, evidence file completeness, and adherence to defined roles and responsibilities. Audit findings are rated and tracked to closure in the audit management system.`,
    `External Audit: External auditors may review this procedure as part of the annual financial audit, regulatory audit, or certification audit (ISO or similar). All procedure records must be producible within the response time specified by the auditing body.`,
    `Regulatory Audit: The relevant regulatory authority for ${jurisdiction} and the ${industry} sector may conduct audits or inspections of this procedure. Regulatory audit requests are escalated immediately to the compliance officer.`,
    `Audit Evidence: The evidence file compiled for each procedure execution (Section 17) constitutes the primary evidence for audit. Additional evidence requested by auditors is compiled and provided within the defined response time.`,
    `Audit Readiness: Procedure evidence files are sampled quarterly to confirm audit readiness. Any gaps identified are remediated immediately and reported to the governance committee.`,
    `Audit findings specifically related to this procedure are documented in the audit findings register and tracked to closure. The status of audit findings is reported to the governance committee at each scheduled meeting.`,
  ]));

  sections.push(generateSection("27", "Business Continuity Notes", [
    `The following business continuity considerations apply to the "${title}" procedure. These notes ensure that the procedure can continue to operate, or be rapidly restored, in the event of a disruption.`,
    `System Failure: If ${sys} is unavailable, the approved manual fallback procedure is activated. The manual fallback procedure is documented in the Business Continuity Plan and uses pre-printed forms and manual record-keeping. All manual records are transferred to ${sys} within two working days of system restoration.`,
    `Personnel Unavailability: If the assigned operator is unavailable, the pre-designated deputy assumes the role. If no deputy exists, the procedure is escalated to the supervisor, who assigns a trained alternative or assumes direct responsibility.`,
    `Location Disruption: If the primary operating location is inaccessible, personnel with assigned roles in this procedure may operate from the designated alternative location using remote access to ${sys} and cloud-based resources.`,
    `Extended Disruption: If a disruption extends beyond 48 hours, the business continuity plan is escalated to the executive sponsor, who determines whether the procedure should continue using alternative arrangements or be temporarily suspended.`,
    `Post-Disruption Recovery: Following any disruption that affected procedure execution, a post-incident review is conducted within 10 working days. The review examines the effectiveness of the continuity arrangements and identifies improvements.`,
    `All business continuity activations related to this procedure are documented in the incident management system with the trigger event, actions taken, and recovery timeline.`,
  ]));

  sections.push(generateSection("28", "Review Schedule", [
    `The "${title}" procedure is subject to the following review schedule. Reviews ensure that the procedure remains current, effective, and compliant with evolving legal, regulatory, and operational requirements.`,
    `Scheduled Review: This procedure is reviewed annually from the effective date. The review is conducted by the procedure owner with input from the compliance officer, quality assurance function, and operational stakeholders.`,
    `Triggered Review: An unscheduled review is triggered by any of the following events: a change in applicable legislation or regulation that affects the procedure, a material operational failure or near-miss, a regulatory or audit finding that identifies a procedure gap, a change in ${sys} that affects the procedure workflow, a significant change in organisational structure or roles, or a complaint or incident that indicates a procedure deficiency.`,
    `Review Scope: Each review examines: the continued accuracy and completeness of the procedure content, alignment with current legal and regulatory requirements, effectiveness of controls based on execution data, relevance of KPIs and performance targets, currency of referenced systems, documents, and roles, and opportunities for improvement identified through execution data and stakeholder feedback.`,
    `Review Output: The review produces a revised procedure document (if changes are required), a review report documenting the review findings and recommendations, and updated review schedule and next review date. Review outputs are approved by the procedure owner and documented in the procedure governance record.`,
    `Expired Procedures: A procedure that has passed its review date without a completed review is classified as "under review" and should be used with caution pending the review outcome. A procedure that is more than 12 months past its review date is classified as "expired" and must not be used until the review is completed and the procedure is re-authorised.`,
  ]));

  sections.push(generateSection("29", "Consultant Recommendations", [
    `The following recommendations have been prepared based on an independent assessment of the "${title}" procedure design, the ${industry} operating context, and the ${band} organisational profile at ${company}.`,
    `Recommendation 1 — Control Automation: As ${company} scales beyond ${headcount} personnel or transaction volumes increase beyond 10,000 monthly interactions within this procedure scope, introduce automated control monitoring for all approval checkpoints. Automated monitoring reduces manual validation workload by an estimated 60 percent while maintaining audit integrity and providing real-time exception alerts to the compliance function.`,
    `Recommendation 2 — Procedure Segmentation: If execution volumes for this procedure exceed 50 instances per month, consider segmenting the procedure into standard and enhanced execution tracks. Standard track serves low-complexity, low-risk instances with a streamlined ${Math.max(8, stepCount - 5)}-step workflow. Enhanced track maintains the full ${stepCount}-step process for high-complexity or high-risk instances. This segmentation preserves control integrity for material activities while improving throughput for routine operations.`,
    `Recommendation 3 — Competency Assurance: Implement a six-monthly competency assessment cycle for all personnel with assigned roles in this procedure. The assessment should include a practical simulation of the procedure execution, a regulatory knowledge test covering the ${jurisdiction} legislative framework, and a system proficiency evaluation for ${sys}. Assessment results are recorded in the training management system and competency gaps are addressed within 30 days.`,
    `Recommendation 4 — Regulatory Horizon Scanning: Establish a quarterly regulatory horizon scanning process for ${industry} sector developments in ${jurisdiction}. The scanning output is assessed for impact on this procedure and, where a regulatory change is identified, a procedure impact assessment is completed within 20 working days. This proactive approach prevents the last-minute remediation that results from reactive regulatory awareness.`,
    `Recommendation 5 — Evidence File Digitisation: If the evidence file compilation step currently involves manual document assembly, migrate to automated evidence collection using ${sys} workflow triggers. Automated collection captures procedure records at the point of creation, applies the correct document classification, and assembles the evidence file index without manual intervention. This eliminates the common failure of incomplete or incorrectly indexed evidence files.`,
    `Recommendation 6 — Cross-Functional Procedure Integration: Review whether this procedure has dependencies on or interfaces with other operational procedures within ${company}. Where dependencies exist, document the interface points and establish a coordination protocol that ensures procedure outputs from one process flow seamlessly as inputs to the dependent process. Procedure silos are a leading cause of operational friction in ${band} organisations.`,
    `These recommendations should be reviewed and prioritised by the procedure governance committee. Implementation of high-priority recommendations should be scheduled within the next operational planning cycle.`,
  ]));

  sections.push(generateSection("30", "Version Control", [
    `This section tracks the version history of the "${title}" procedure. All changes must be documented with the version number, change description, author, approver, and effective date.`,
    `Version 1.0 — Initial Release. Effective Date: ${today}. Author: SOPMaster Governance Platform. Approver: ${company} Governance. Description: Initial release of the ${title} Standard Operating Procedure. ${stepCount}-step execution framework for ${band} organisations operating in the ${industry} sector under ${jurisdiction} jurisdiction.`,
    `Document Location: The current authorised version of this procedure is maintained in the Document Management System under document reference ${ref}. Printed copies are uncontrolled unless stamped "CONTROLLED COPY" by the document control officer.`,
    `Next Scheduled Review: ${new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}.`,
    `Amendment History:`,
    `| Version | Date | Author | Change Description | Approved By |`,
    `|---------|------|--------|-------------------|-------------|`,
    `| 1.0 | ${today} | SOPMaster Platform | Initial Release | ${company} Governance |`,
    `This procedure document is a controlled operational governance instrument. Any modification, reproduction, or distribution without authorisation is a breach of the Governance Policy.`,
  ]));

  const generatedAt = new Date();
  return {
    title,
    company,
    systems,
    headcount,
    jurisdiction,
    complexity: resolvedSize,
    sections,
    generatedAt: generatedAt.toISOString(),
    industry,
    sopType,
  };
}
