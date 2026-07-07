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
    "US-Illinois": {
      dataProtection: "Illinois Personal Information Protection Act, Biometric Information Privacy Act (BIPA)",
      employment: "Illinois Wage Payment and Collection Act, Illinois Workers' Compensation Act, One Day Rest in Seven Act",
      healthSafety: "OSHA standards — Illinois state plan (federal OSHA enforcement in IL)",
      corporate: "Illinois Business Corporation Act",
      sectorSpecific: ["Illinois Biometric Information Privacy Act — strict liability for biometrics", "Illinois Equal Pay Act — certified equal pay registration required"],
      antiDiscrimination: "Illinois Human Rights Act",
      retention: "5 years for employment records. 3 years for biometric retention consent. 2 years for BIPA violation claims (statute of limitations).",
    },
    "Germany": {
      dataProtection: "Bundesdatenschutzgesetz (BDSG) supplementing GDPR, Telekommunikation-Telemedien-Datenschutz-Gesetz (TTDSG)",
      employment: "Bürgerliches Gesetzbuch (BGB), Kündigungsschutzgesetz (dismissal protection), Betriebsverfassungsgesetz (Works Council), Mindestlohngesetz (€12.82/hr 2026)",
      healthSafety: "Arbeitsschutzgesetz (ArbSchG), Arbeitsstättenverordnung (ArbStättV), DGUV accident prevention regulations",
      corporate: "Aktiengesetz (AktG) for AGs, GmbHG for GmbHs, Handelsgesetzbuch (HGB) for commercial accounts",
      sectorSpecific: ["BaFin regulatory oversight for financial services", "Geldwäschegesetz (GwG) AML compliance", "Hinweisgeberschutzgesetz (whistleblower protection)"],
      antiDiscrimination: "Allgemeines Gleichbehandlungsgesetz (AGG) — General Equal Treatment Act",
      retention: "6-10 years under HGB (accounting records: 10 years, commercial letters: 6 years). Employment records: 3 years post-employment (BDSG §35).",
    },
    "France": {
      dataProtection: "Loi Informatique et Libertés (Law No. 78-17, amended 2019) supplementing GDPR",
      employment: "Code du Travail (35-hour week), Ordannances Macron (labour law reforms), mandatory annual NAO negotiations",
      healthSafety: "Code du Travail — Part IV (health, safety, and working conditions), CSE (Social and Economic Committee) oversight",
      corporate: "Code de Commerce, Code des Sociétés (commercial companies)",
      sectorSpecific: ["Autorité des Marchés Financiers (AMF) for financial markets", "ACPR for banking/insurance", "Index de l'Égalité professionnelle (gender pay index)"],
      antiDiscrimination: "Code du Travail L.1132-1, Loi Égalité et Citoyenneté",
      retention: "5 years general (Code de Commerce), 30 years for real estate. Employment records: 5 years post-employment. Criminal records: variable.",
    },
    "Netherlands": {
      dataProtection: "Uitvoeringswet AVG (UAVG) — GDPR implementation, Telecommunicatiewet (ePrivacy)",
      employment: "Burgerlijk Wetboek Boek 7 (Civil Code), Wet arbeidsmarkt in balans (WAB), Wet minimumloon (€13.68/hr 2026), Wet betaald ouderschapsverlof (9 weeks paid)",
      healthSafety: "Arbowet (Working Conditions Act), Arbobesluit, Arbeidsomstandighedenregeling",
      corporate: "Burgerlijk Wetboek Boek 2 (legal entities), Wet op de ondernemingsraad (Works Council)",
      sectorSpecific: ["De Nederlandsche Bank (DNB) financial oversight", "AFM financial market regulation", "Wet ter voorkoming van witwassen (AML)"],
      antiDiscrimination: "Algemene wet gelijke behandeling, Wet gelijke behandeling op grond van handicap/chronische ziekte",
      retention: "7 years tax and HR records (successie). General: 5 years (verjaringstermijn). 2 years for job applicant data (UAVG).",
    },
    "UAE-Dubai": {
      dataProtection: "UAE Federal Decree-Law No. 45 of 2021, DIFC Data Protection Law (DIFC entities), ADGM Data Protection Regulations (ADGM entities)",
      employment: "UAE Federal Decree-Law No. 33 of 2021, DIFC Employment Law 2019, ADGM Employment Regulations",
      healthSafety: "UAE Federal Law No. 32 of 2021, Abu Dhabi OSHMS, Dubai Municipality OSH standards",
      corporate: "UAE Federal Companies Law (No. 32 of 2021), DIFC Companies Law, ADGM Companies Regulations",
      sectorSpecific: ["Dubai Tax Code txcd_20030000 — 0% VAT Reverse Charge", "UAE Central Bank AML regulations", "MOHRE labour compliance (WPS, Emiratisation)"],
      antiDiscrimination: "UAE Federal Decree-Law on Prohibition of Discrimination and Hatred, DIFC Employment Law anti-discrimination provisions",
      retention: "DIFC: 6 years. UAE Federal: 5-10 years. Financial records: 10 years. Payroll: 5 years under Federal Tax Law.",
    },
    "UAE-AbuDhabi": {
      dataProtection: "ADGM Data Protection Regulations 2021, UAE Federal Decree-Law No. 45 of 2021",
      employment: "ADGM Employment Regulations 2019, UAE Federal Decree-Law No. 33 of 2021",
      healthSafety: "Abu Dhabi Occupational Safety and Health System (OSHMS), UAE Federal Law No. 32 of 2021",
      corporate: "ADGM Companies Regulations, UAE Federal Companies Law",
      sectorSpecific: ["ADDED economic licensing and compliance", "Abu Dhabi International Financial Centre (ADGM) regulatory framework", "Ghadan 21 economic stimulus compliance"],
      antiDiscrimination: "UAE Federal Decree-Law on Prohibition of Discrimination and Hatred, ADGM employment anti-discrimination rules",
      retention: "ADGM: 6 years. UAE Federal: 5-10 years. Tax records: 5 years.",
    },
    "SaudiArabia": {
      dataProtection: "Personal Data Protection Law (PDPL) — Royal Decree M/148, effective 2023, full enforcement 2025",
      employment: "Saudi Labor Law (Royal Decree M/51), Nitaqat Saudization quotas, Ministry of Human Resources regulations",
      healthSafety: "Occupational Safety and Health Regulation (Council of Ministers Resolution), Ministry of Municipal and Rural Affairs standards",
      corporate: "Saudi Companies Law (Royal Decree M/3), Capital Market Authority regulations (listed companies)",
      sectorSpecific: ["ZATCA — Zakat, Tax and Customs Authority compliance", "Qiwa platform — employment and social insurance", "SAMA financial institution oversight"],
      antiDiscrimination: "Labor Law anti-discrimination provisions, Human Rights Commission regulations",
      retention: "PDPL: 10 years personal data. Employment: 5 years post-termination. Corporate: 10 years. Tax/Zakat: 10 years.",
    },
    "Qatar": {
      dataProtection: "Qatar Data Privacy Law (Law No. 13/2016), Qatar Financial Centre (QFC) Data Protection Regulations",
      employment: "Qatar Labour Law (Law No. 14/2004, amended by Law No. 17/2020 and Law No. 19/2021), WIF regulations",
      healthSafety: "Law No. 13/1997 on Occupational Health and Safety, Ministry of Labour QHSMS standards",
      corporate: "Qatar Commercial Companies Law (Law No. 11/2015), QFC Companies Regulations",
      sectorSpecific: ["Qatar Financial Markets Authority (QFMA) regulation", "QFC regulatory authority oversight", "National Vision 2030 compliance"],
      antiDiscrimination: "Qatar Labour Law anti-discrimination provisions, Qatar Constitution Article 34 (equality)",
      retention: "5 years minimum general. Financial records: 10 years. QFC: 6 years. Employment: 5 years post-termination.",
    },
    "Singapore": {
      dataProtection: "Personal Data Protection Act (PDPA 2012, amended 2020), Do Not Call provisions, data breach notification mandatory 2022",
      employment: "Employment Act (Cap. 91), Employment Claims Act, Retirement and Re-employment Act",
      healthSafety: "Workplace Safety and Health Act (WSHA), work injury compensation, Ministry of Manpower enforcement",
      corporate: "Companies Act (Cap. 50), Accounting and Corporate Regulatory Authority (ACRA) regulation",
      sectorSpecific: ["Monetary Authority of Singapore (MAS) financial regulation", "Corruption, Drug Trafficking and Other Serious Crimes Act (CDSA) AML", "Competition Act (CCS enforcement)"],
      antiDiscrimination: "Tripartite Guidelines on Fair Employment Practices (not statutory but enforced), Protection from Harassment Act",
      retention: "PDPA: 5 years or longer if business/legal need. Companies Act: 7 years. Employment Act: 5 years. Tax: 7 years (IRAS).",
    },
    "HongKong": {
      dataProtection: "Personal Data (Privacy) Ordinance (PDPO, Cap. 486) — 6 data protection principles, amended 2021 (doxxing offences)",
      employment: "Employment Ordinance (Cap. 57), Minimum Wage Ordinance (Cap. 608), Occupational Retirement Schemes Ordinance",
      healthSafety: "Occupational Safety and Health Ordinance (Cap. 509), Factories and Industrial Undertakings Ordinance",
      corporate: "Companies Ordinance (Cap. 622), Companies Registry regulation",
      sectorSpecific: ["Hong Kong Monetary Authority (HKMA) — banking and financial regulation", "Securities and Futures Ordinance (Cap. 571) — SFC oversight", "Anti-Money Laundering and Counter-Terrorist Financing Ordinance (Cap. 615)"],
      antiDiscrimination: "Sex Discrimination Ordinance (Cap. 480), Disability Discrimination Ordinance (Cap. 487), Family Status Discrimination Ordinance (Cap. 527), Race Discrimination Ordinance (Cap. 602)",
      retention: "Inland Revenue Ordinance: 7 years. PDPO: 6 years for employment records. Companies Ordinance: 7 years. AML/CTF: 7 years.",
    },
    "Canada-BritishColumbia": {
      dataProtection: "BC Personal Information Protection Act (PIPA) — substantially similar to PIPEDA for BC private sector",
      employment: "BC Employment Standards Act, Workers Compensation Act (WorkSafeBC), Labour Relations Code",
      healthSafety: "Workers Compensation Act, Occupational Health and Safety Regulation (OHSR)",
      corporate: "BC Corporations Act, Business Corporations Act (newer)",

      sectorSpecific: ["BC Securities Commission — capital markets", "BC Privacy Act — tort of privacy violation", "Pay transparency: mandatory salary ranges on job postings (effective 2024)"],
      antiDiscrimination: "BC Human Rights Code",
      retention: "Employment Standards Act: 6 years. PIPA: 4 years after use ends. Workers' comp: 10 years for serious injury claims.",
    },
    "Canada-Quebec": {
      dataProtection: "Law 25 (formerly Bill 64) — An Act to modernize legislative provisions re privacy, effective 2023-24; PIPEDA applies otherwise",
      employment: "Act respecting labour standards (CNESST enforcement), Pay Equity Act, Labour Code (labour relations)",
      healthSafety: "Act respecting occupational health and safety, OHS regulation under CNESST enforcement",
      corporate: "Business Corporations Act (QBCA), Companies Act",
      sectorSpecific: ["Charter of the French Language (Law 96) — workplace French language requirements", "Quebec Securities Act and AMF oversight", "Act respecting Access to documents held by public bodies"],
      antiDiscrimination: "Charter of Human Rights and Freedoms (Quebec), Act respecting equal access to employment in public bodies",
      retention: "Civil Code of Quebec: 7 years (prescription). Labour standards: 6 years. Pay equity: 5 years post-reporting. Privacy: 3 years after purpose fulfilled.",
    },
    "Switzerland": {
      dataProtection: "nFADP (revised Federal Act on Data Protection, effective Sept 1 2023), DPO requirements, privacy impact assessments",
      employment: "Code of Obligations (OR) — Book of the Law of Obligations, Swiss Labour Law (ArG), Unfair Competition Act (UWG)",
      healthSafety: "Federal Labour Law (ArG: 50-hour week, 14-hour rest), Accident Insurance Act (UVG), SUVA prevention",
      corporate: "Code of Obligations corporate provisions, FINMA regulatory supervision for financial entities",
      sectorSpecific: ["FINMA — Swiss Financial Market Supervisory Authority", "Anti-Money Laundering Act (GwG/AMLA)", "Swiss Banking Act"],
      antiDiscrimination: "Swiss Gender Equality Act, Federal Act on the Elimination of Discrimination against Persons with Disabilities",
      retention: "OR 958f: 10 years for business records and accounts. Employment: 5 years. AML: 10 years.",
    },
    "Japan": {
      dataProtection: "Act on Protection of Personal Information (APPI, Law No. 57 of 2003, amended 2020/2023), cross-border transfer rules",
      employment: "Labour Standards Act (Law No. 49 of 1947), Labour Contract Act, Part-Time Workers Act, Labour Dispatch Act",
      healthSafety: "Industrial Safety and Health Act (Law No. 57 of 1972), Ministry of Health, Labour and Welfare regulations",
      corporate: "Companies Act (Law No. 86 of 2005), Financial Instruments and Exchange Act",
      sectorSpecific: ["Financial Services Agency (FSA) — banking/securities/insurance regulation", "AML/CFT — Act on Prevention of Transfer of Criminal Proceeds", "Tokyo Stock Exchange listing rules"],
      antiDiscrimination: "Labour Standards Act (equal pay, non-discrimination), Act on Employment Promotion for Persons with Disabilities",
      retention: "Labour Standards Act: 5 years (wage and employment records, increased from 3 years). Safety/health: 3 years. Companies Act: 10 years. APPI: as long as necessary.",
    },
  };
  return map[jurisdiction] || map["UK"];
}

const STEP_FIELDS = [
  "Step Number", "Step Name", "Objective", "Responsible Role", "Required Inputs",
  "Required Systems", "Required Documents", "Detailed Actions", "Decision Points",
  "Compliance Requirements", "Quality Check", "Expected Output", "Evidence to Retain",
  "Common Errors", "Escalation Trigger",
];

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

function getIndustryContext(industry: string): { trigger: string; inputs: string; actions: string; errors: string; compliance: string; quality: string } {
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

function generateProcedureSteps(title: string, company: string, systems: string, industry: string, department: string, size: CompanySize, sopType: string): string[][] {
  const steps: string[][] = [];
  const sys = getSystemsList(systems);
  const primarySys = sys[0] || "the designated system";
  const secondarySys = sys.length > 1 ? sys[1] : primarySys;
  const band = size === "1-10" ? "startup / small business" : size === "10-50" ? "growing business" : "enterprise";
  const ctx = getIndustryContext(industry);

  function s(num: string, name: string, obj: string, role: string, inputs: string, reqSys: string, docs: string, actions: string, decisions: string, compliance: string, quality: string, output: string, evidence: string, errors: string, escalation: string): string[] {
    return [num, name, obj, role, inputs, reqSys, docs, actions, decisions, compliance, quality, output, evidence, errors, escalation];
  }

  steps.push(s("1",
    `Receive and Register ${title} Request`,
    `To capture the incoming work request for ${title}, confirm it is legitimate and complete, and register it in ${primarySys} with a unique tracking reference.`,
    size === "1-10" ? `${department} Operator` : size === "10-50" ? `${department} Duty Officer` : `${department} Processing Operator`,
    `${ctx.inputs}. Contact name, contact method, date received.`,
    `${primarySys}${secondarySys !== primarySys ? `, ${secondarySys}` : ""}`,
    `${title} Request Form, Customer Record (if existing), Service Agreement or Contract Reference`,
    `1. Open ${primarySys} and navigate to the work intake module.\n2. Identify the new request — email, phone, portal submission, or internal trigger.\n3. Enter the customer or requestor name, contact details, and company name.\n4. Record the date received, required completion date, and priority level.\n5. Attach any supporting documents received with the request.\n6. Generate a unique reference number and confirm it is visible in the system.\n7. Assign the request to the appropriate team or person based on workflow rules.\n8. Send an acknowledgement to the requestor confirming receipt and reference number.`,
    `IF the request is outside agreed scope THEN notify supervisor before proceeding. IF the requestor is a new customer THEN create a preliminary record and flag for AML checks.`,
    `Record lawful basis for processing any personal data. ${size === "10-50" || size === "50+" ? "Conflicts check must be completed before acceptance." : ""}`,
    "Mandatory fields complete. Supporting documents attached. Reference generated. Requestor acknowledged within SLA.",
    `Registered request with unique reference ${title[0].toUpperCase() + title.slice(1).replace(/[^a-zA-Z0-9]/g, "")}-XXXX in ${primarySys}. Acknowledgement sent.`,
    `System record in ${primarySys}. Request acknowledgement sent to requestor. Supporting documents stored against reference.`,
    "Incorrect customer details. Missing supporting documents. Wrong priority. Duplicate reference. Delayed acknowledgement.",
    "System unavailable — notify IT and use manual log. Request outside scope — escalate to supervisor. Time-sensitive — flag for immediate processing."));

  steps.push(s("2",
    `Validate Information and Input Completeness`,
    `To verify that all required information has been received, is accurate, and is sufficient to process the ${title} request without delays caused by missing data.`,
    size === "1-10" ? `${department} Operator` : size === "10-50" ? `${department} Processing Officer` : `${department} Vetting Officer`,
    "Registered request details, supporting documents, customer records, any prior correspondence or reference files.",
    `${primarySys}${sys.length > 1 ? `, ${sys[1]}` : ""}`,
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
    `${primarySys}${sys.slice(1).map(s => `, ${s}`).join("")}`,
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
    `${primarySys}${sys.length > 1 ? `, ${sys.slice(1).join(", ")}` : ""}`,
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
    `${primarySys}${sys.slice(1).map(s => `, ${s}`).join("")}`,
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
    `1. Open the completed work record in ${primarySys} and navigate to the evidence management section.\n2. Collect all records generated during the process — initiation, validation, processing, verification, corrections, approvals, delivery, and close-out.\n3. ${size === "10-50" || size === "50+" ? "Check each document for readability, completeness, and correct file naming." : "Check documents are present and legible."}\n4. Organise the evidence in a logical structure indexed against the procedure steps.\n5. ${size === "50+" ? "Generate a verification checksum or hash for the evidence file to detect unauthorised modification." : ""}\n6. Apply the correct retention classification based on the ${company} retention schedule.\n7. Confirm the evidence file is complete — no step is missing supporting evidence.\n8. Save the evidence file in the document management system.`,
    `IF evidence is missing for a step THEN document the gap and the reason. IF the evidence file contains errors THEN correct before finalising.`,
    `${ctx.compliance}. ${getLegislation("UK").dataProtection} — personal data in evidence must be retained no longer than necessary. Evidence must be stored in unalterable format.`,
    "Evidence complete for all steps. Documents legible and correctly named. Retention classification applied.",
    "Complete indexed evidence file with verification hash (if applicable) stored in document management system with correct retention.",
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
    `${ctx.compliance}. ${getLegislation("UK").retention}. Archived records must not be modified or deleted outside the disposal process.`,
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

  const extraSteps: string[][] = [];

  if (size === "10-50" || size === "50+") {
    extraSteps.push(s("14",
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
    extraSteps.push(s("15",
      `Compliance Confirmation and Regulatory Alignment Check`,
      `To conduct a final compliance review of the completed work, confirm alignment with all applicable legal and regulatory requirements, and sign off the compliance record.`,
      `Compliance Officer / ${department} Compliance Reviewer`,
      "Completed work record, compliance checklist, regulatory obligation register, evidence file.",
      `${primarySys}${sys.length > 1 ? `, ${sys[1]} Compliance Module` : ""}`,
      `Compliance Obligation Register, ${getLegislation("UK").dataProtection} Requirements, ${ctx.compliance} Checklist`,
      `1. Review the complete work record against the compliance obligation register.\n2. Confirm data protection compliance — lawful basis recorded, data minimised, subject rights considered.\n3. Verify regulatory filings or notifications were made (if applicable to the ${industry} sector).\n4. Check that the evidence file contains all required compliance documentation.\n5. Confirm the retention classification matches regulatory requirements.\n6. Record any compliance observations or recommendations for future processes.\n7. Sign off the compliance record — or flag non-compliance for escalation.\n8. Update the compliance monitoring dashboard with the review outcome.`,
      `IF a compliance gap is identified THEN assess materiality and escalate to compliance manager. IF a regulatory filing was missed THEN notify the responsible authority within the permitted timeframe and document the corrective action.`,
      `${ctx.compliance}. ${getLegislation("UK").retention}. Non-compliance must be escalated immediately to the compliance manager and relevant stakeholders.`,
      "Compliance obligations met. Data protection confirmed. Regulatory alignment verified. Evidence complete.",
      "Signed compliance confirmation record with alignment verified against all applicable legal and regulatory obligations.",
      "Compliance checklist completed. Compliance sign-off record. Regulatory alignment confirmation. Evidence of regulatory filings (if applicable).",
      "Compliance check not performed. Regulatory obligation missed. Data protection non-compliance not identified. Sign-off given without verification.",
      "Material non-compliance identified — escalate to compliance manager and legal. Regulatory breach — notify relevant authority. Evidence of non-compliance — preserve and escalate."));

    extraSteps.push(s("16",
      `Management Review and Strategic Alignment Confirmation`,
      `To present the completed work to management for review, confirm alignment with strategic objectives, and authorise any broader improvements arising from lessons learned.`,
      `${department} Head / Executive Sponsor`,
      "Completed work summary, performance metrics, exception analysis, compliance record, team feedback.",
      `${primarySys} Governance Dashboard, ${size === "50+" ? "Executive Reporting System" : ""}`,
      `Management Review Checklist, ${company} Strategic Objectives Document, Performance Dashboard`,
      `1. Review the work completion summary — scope, quality, timeliness, exceptions, and compliance outcome.\n2. Compare performance against KPIs — completion rate, SLA compliance, first-pass quality, exception rate.\n3. Assess whether the work aligns with ${company}'s strategic and operational objectives.\n4. Review the exception analysis — identify patterns, root causes, and systemic issues.\n5. Consider improvement recommendations from the team and feedback from the customer.\n6. Approve the work as strategically aligned or identify areas requiring corrective action.\n7. Assign any strategic actions or improvement initiatives to responsible owners with target dates.\n8. Sign off the management review record.`,
      `IF strategic misalignment is identified THEN document the gap and assign corrective actions. IF systemic issues are found THEN initiate a process improvement review.`,
      `${ctx.compliance}. Management review confirms the work supports the organisation's strategic objectives and governance framework.`,
      "Strategic alignment confirmed. KPIs reviewed. Exceptions analysed. Improvement actions assigned (if any).",
      "Completed management review with strategic alignment confirmation, KPI assessment, and improvement actions.",
      "Management review record. Signed management review checklist. Improvement action register update.",
      "Review not conducted. Strategic misalignment not identified. Improvement opportunities missed. Actions assigned without follow-up.",
      "Significant strategic misalignment — escalate to board or executive committee. Critical systemic risk identified — initiate immediate review. Customer complaint at executive level — escalate."));
  }

  const allSteps = [...steps, ...extraSteps];
  const stepCount = getStepCount(size);

  while (allSteps.length < stepCount) {
    const n = allSteps.length + 1;
    allSteps.push(s(String(n),
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

  return allSteps;
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
    `This Standard Operating Procedure has been prepared by a Principal Operations Consultant for ${company}. It defines the mandatory protocol for "${title}" and establishes a ${stepCount}-step execution framework designed to be implementation-ready, audit-ready, and commercially valuable.`,
    `The procedure operates within the ${industry} sector under ${jurisdiction} jurisdiction and is classified as ${sopType || "Operational"}. It applies to all personnel engaged in executing, supervising, quality assuring, and governing the activities it describes.`,
    `This document answers four questions: how the work is actually performed, how quality is maintained, how compliance is demonstrated, and how evidence is retained. A new employee with no prior knowledge should be able to complete the task safely, consistently, accurately, and compliantly using only this document.`,
    `Adherence to this procedure is mandatory. Non-compliance exposes ${company} to regulatory sanction, operational failure, audit qualification, and legal liability. All exceptions must be documented, justified, and escalated through the defined governance channels.`,
    `This document has been prepared to the standard expected by regulatory authorities, external auditors, and professional consultancy practice. It is designed to be handed directly to a paying client and implemented immediately without significant editing.`,
  ]));

  sections.push(generateSection("04", "Purpose", [
    `This Standard Operating Procedure serves as the single source of truth for how "${title}" must be conducted, supervised, recorded, and governed at ${company}. It is designed to be handed to a new employee who has no prior knowledge of this process and enable them to complete the work correctly.`,
    `The procedure achieves four objectives. First, it explains how the work is actually performed — the specific actions, systems, and decisions required at each step. Second, it embeds quality checks into every operational activity so errors are caught before they reach the customer. Third, it integrates compliance requirements directly into the workflow rather than treating them as a separate review step. Fourth, it specifies the evidence that must be retained at each stage to demonstrate complete and compliant execution.`,
    `Every paragraph in this document provides practical implementation value. Generic filler has been removed. Each procedure step has been written as if by a senior operations consultant who has personally performed this work and is explaining it to a new team member.`,
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
    ...generateProcedureSteps(title, company, systems, industry, sopType, resolvedSize, sopType).map((step) => {
      return `<PROCEDURE_STEP>${STEP_FIELDS.map((f, fi) => `[${f}] ${step[fi] || ""}`).join("\n")}</PROCEDURE_STEP>`;
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
