import {
  BusinessProfile,
  ProjectProfile,
  ApprovalItem,
  DocumentRecord,
  QueryItem,
  NotificationItem,
  GrievanceItem,
  StatusHistoryEntry
} from '../types';

export const INITIAL_BUSINESS: BusinessProfile = {
  id: 'BIZ-2026-0941',
  name: 'ABC Manufacturing Pvt Ltd',
  applicantName: 'Rajesh Verma',
  email: 'rajesh.verma@abcmfg.in',
  mobile: '+91 98201 45678',
  gstin: '27AABCA1234F1Z5',
  pan: 'AABCA1234F',
  businessType: 'Private Limited Company',
  registeredAddress: 'Plot C-14, Phase II, Chakan MIDC Industrial Area, Taluka Khed, Pune, Maharashtra 410501'
};

export const INITIAL_PROJECT: ProjectProfile = {
  id: 'PRJ-2026-MH-0842',
  name: 'Electric Vehicle Components Manufacturing Unit',
  sector: 'Automobile & Electric Mobility',
  proposedInvestmentCr: 25,
  totalEmployees: 250,
  state: 'Maharashtra',
  district: 'Pune',
  landType: 'MIDC Industrial Estate',
  midcArea: 'MIDC Chakan Phase II',
  category: 'Manufacturing',
  expectedStartDate: '2026-11-01',
  powerDemandKVA: 1200,
  waterDemandKLD: 75,
  pollutionCategory: 'Orange',
  builtUpAreaSqM: 8500,
  plotAreaSqM: 18000,
  hasBoiler: true,
  hasHazardousMaterial: true,
  contractWorkers: 110,
  buildingHeightMeters: 14.5
};

export const INITIAL_APPROVALS: ApprovalItem[] = [
  {
    id: 'app-1',
    code: 'MIDC-LAND',
    name: 'Industrial Land Allotment & Lease Deed',
    department: 'Maharashtra Industrial Development Corp (MIDC)',
    departmentCode: 'MIDC',
    type: 'mandatory',
    reason: 'Prerequisite for physical industrial possession and factory layout clearance in designated MIDC park.',
    status: 'COMPLETED',
    timelineDays: 15,
    fee: 45000,
    confidenceScore: 99,
    prerequisites: [],
    downstream: ['MIDC-BP', 'MIDC-WATER'],
    stage: 'Statutory Sanction Granted',
    applicationDate: '2026-01-10',
    approvalDate: '2026-01-24',
    applicationId: 'APP-MIDC-2026-0109',
    officerName: 'Ar. Vikram Deshmukh (MIDC)',
    requiredDocuments: ['MIDC Land Allotment Letter', 'Possession Receipt', 'Company PAN & GSTIN'],
    riskLevel: 'low',
    isCriticalPath: true,
    certificateIssued: true,
    certificateNumber: 'MIDC/CHAKAN/LEAS/2026/0491'
  },
  {
    id: 'app-2',
    code: 'MIDC-BP',
    name: 'Industrial Building & Factory Layout Approval',
    department: 'MIDC Town Planning Authority',
    departmentCode: 'MIDC-TP',
    type: 'mandatory',
    reason: 'Statutory clearance under DCR Section 44 for industrial factory shed and administrative wing.',
    status: 'COMPLETED',
    timelineDays: 21,
    fee: 38000,
    confidenceScore: 97,
    prerequisites: ['MIDC-LAND'],
    downstream: ['FIRE-NOC', 'MSEDCL-HT'],
    stage: 'Approved & Stamped',
    applicationDate: '2026-02-01',
    approvalDate: '2026-02-20',
    applicationId: 'APP-BP-2026-0284',
    officerName: 'Er. Sachin Shinde (Town Planner)',
    requiredDocuments: ['Architect Approved Blueprint', 'Soil Test Certificate', 'Structural Stability Certificate'],
    riskLevel: 'low',
    isCriticalPath: true,
    certificateIssued: true,
    certificateNumber: 'MIDC/TP/PUNE/2026/1102'
  },
  {
    id: 'app-3',
    code: 'FIRE-NOC',
    name: 'Provisional Fire Safety NOC',
    department: 'Maharashtra Fire Services / MIDC Fire Wing',
    departmentCode: 'MFS',
    type: 'mandatory',
    reason: 'Factory built-up area > 5,000 sq.m and EV battery pack assembly involves hazardous thermal storage.',
    status: 'COMPLETED',
    timelineDays: 14,
    fee: 25000,
    confidenceScore: 98,
    prerequisites: ['MIDC-BP'],
    downstream: ['MPCB-CTE', 'DISH-FL'],
    stage: 'Provisional NOC Issued',
    applicationDate: '2026-02-25',
    approvalDate: '2026-03-08',
    applicationId: 'APP-FIRE-2026-0941',
    officerName: 'Chief Fire Officer S. K. Jadhav',
    requiredDocuments: ['Fire Hydrant Layout Blueprint', 'Underground Tank Specs', 'Evacuation Plan'],
    riskLevel: 'low',
    isCriticalPath: true,
    certificateIssued: true,
    certificateNumber: 'MFS/PUNE/NOC/2026/894'
  },
  {
    id: 'app-4',
    code: 'MPCB-CTE',
    name: 'Consent to Establish (CTE) - Orange Category',
    department: 'Maharashtra Pollution Control Board (MPCB)',
    departmentCode: 'MPCB',
    type: 'mandatory',
    reason: 'EV component electroplating, battery pack testing, and CNC machining generate industrial effluent and particulate emissions.',
    status: 'ACTION_REQUIRED',
    timelineDays: 30,
    fee: 75000,
    confidenceScore: 95,
    prerequisites: ['MIDC-BP', 'FIRE-NOC'],
    downstream: ['DISH-FL'],
    stage: 'Officer Query Raised - Awaiting Response',
    applicationDate: '2026-03-02',
    applicationId: 'APP-2026-MPCB-0842',
    officerName: 'Er. Sunita Patil (Sub-Regional Officer)',
    requiredDocuments: ['Detailed Project Report', 'ETP/STP Engineering Design', 'Hazardous Waste Storage Layout', 'Manufacturing Process Flow'],
    whyBlockedReason: 'Awaiting revised Effluent Treatment Plant (ETP) capacity calculation for heavy metal rinse discharge.',
    riskLevel: 'high',
    isCriticalPath: true,
    certificateIssued: false
  },
  {
    id: 'app-5',
    code: 'MSEDCL-HT',
    name: 'High Tension Industrial Power Connection (1200 kVA)',
    department: 'Maharashtra State Electricity Distribution Co (MSEDCL)',
    departmentCode: 'MSEDCL',
    type: 'mandatory',
    reason: 'Industrial connected load exceeds 150 kVA; requires dedicated 11/22kV sub-station bay tapping.',
    status: 'IN_PROGRESS',
    timelineDays: 25,
    fee: 120000,
    confidenceScore: 96,
    prerequisites: ['MIDC-BP'],
    downstream: ['BOILER-REG'],
    stage: 'Technical Feasibility Inspection In Progress',
    applicationDate: '2026-03-05',
    applicationId: 'APP-MSEDCL-2026-5512',
    officerName: 'Er. Prakash Tambe (Executive Engineer)',
    requiredDocuments: ['Single-Line Diagram (SLD)', 'Electrical Inspector Sanction', 'Transformer Test Report'],
    riskLevel: 'medium',
    isCriticalPath: false,
    certificateIssued: false
  },
  {
    id: 'app-6',
    code: 'MIDC-WATER',
    name: 'Industrial Bulk Water Allocation (75 KLD)',
    department: 'MIDC Water Works Division',
    departmentCode: 'MIDC-WW',
    type: 'mandatory',
    reason: 'Continuous process water required for machining, cooling towers, and employee sanitation.',
    status: 'IN_PROGRESS',
    timelineDays: 14,
    fee: 18000,
    confidenceScore: 99,
    prerequisites: ['MIDC-LAND'],
    downstream: [],
    stage: 'Pipeline Connection Estimate Generated',
    applicationDate: '2026-03-07',
    applicationId: 'APP-MIDC-WW-2026-302',
    officerName: 'Sh. Nitin More (Assistant Engineer)',
    requiredDocuments: ['Water Balance Chart', 'Internal Plumbing Layout', 'Underground Reservoir Details'],
    riskLevel: 'low',
    isCriticalPath: false,
    certificateIssued: false
  },
  {
    id: 'app-7',
    code: 'DISH-FL',
    name: 'Factory License & Machinery Layout Sanction',
    department: 'Directorate of Industrial Safety & Health (DISH)',
    departmentCode: 'DISH',
    type: 'mandatory',
    reason: 'Manufacturing facility employing more than 20 workers with electric power exceeding 100 HP under Factories Act 1948.',
    status: 'BLOCKED',
    timelineDays: 30,
    fee: 52000,
    confidenceScore: 94,
    prerequisites: ['MPCB-CTE', 'FIRE-NOC'],
    downstream: ['BOILER-REG'],
    stage: 'Blocked on Prerequisite Clearances',
    applicationId: 'APP-DISH-2026-PENDING',
    officerName: 'Joint Director Sh. Anil Kulkarni',
    requiredDocuments: ['Factory Layout Blueprint (Form 1)', 'Machinery Schedule & Drive Details', 'Emergency Response Plan'],
    whyBlockedReason: 'Cannot submit to DISH portal until MPCB Consent to Establish (CTE) is formally granted.',
    riskLevel: 'high',
    isCriticalPath: true,
    certificateIssued: false
  },
  {
    id: 'app-8',
    code: 'BOILER-REG',
    name: 'Steam Boiler & Pressure Vessels Registration',
    department: 'Directorate of Steam Boilers, Maharashtra',
    departmentCode: 'DSB',
    type: 'conditional',
    reason: 'Unit includes high-pressure autoclave curing chambers and steam cleaning vessel rated > 2.5 bar.',
    status: 'PENDING',
    timelineDays: 20,
    fee: 28000,
    confidenceScore: 92,
    prerequisites: ['DISH-FL', 'MSEDCL-HT'],
    downstream: [],
    stage: 'Application Drafting Stage',
    applicationId: 'APP-BOILER-DRAFT',
    officerName: 'Inspector of Boilers Pune Circle',
    requiredDocuments: ['IBR Manufacturer Test Certificate', 'Hydraulic Test Certificate', 'Boiler Attendant Competency Card'],
    whyBlockedReason: 'Depends on DISH factory machinery layout and MSEDCL power commissioning.',
    riskLevel: 'medium',
    isCriticalPath: true,
    certificateIssued: false
  }
];

export const INITIAL_DOCUMENTS: DocumentRecord[] = [
  {
    id: 'doc-1',
    name: 'GSTIN Registration Certificate',
    category: 'Corporate Identity',
    requiredFor: ['MIDC-LAND', 'MPCB-CTE', 'MSEDCL-HT', 'DISH-FL'],
    fileName: 'ABC_Mfg_GSTIN_Certificate.pdf',
    fileSize: '412 KB',
    uploadedAt: '2026-01-08 11:30 AM',
    status: 'verified',
    confidence: 99,
    extractedFields: {
      'Legal Business Name': 'ABC Manufacturing Pvt Ltd',
      'GSTIN ID': '27AABCA1234F1Z5',
      'Principal Place': 'Chakan MIDC Phase II, Pune',
      'Date of Registration': '14/11/2021',
      'Taxpayer Type': 'Regular Corporate'
    },
    checks: [
      { label: 'Name match against application', passed: true, note: '100% exact match' },
      { label: 'Active GST portal status check', passed: true, note: 'Active and filed' },
      { label: 'Authorized signatory verification', passed: true, note: 'Rajesh Verma (Director)' }
    ],
    warnings: []
  },
  {
    id: 'doc-2',
    name: 'Corporate PAN Card',
    category: 'Corporate Identity',
    requiredFor: ['MIDC-LAND', 'MPCB-CTE', 'DISH-FL'],
    fileName: 'ABC_Mfg_PAN_Card.pdf',
    fileSize: '298 KB',
    uploadedAt: '2026-01-08 11:32 AM',
    status: 'verified',
    confidence: 100,
    extractedFields: {
      'Entity Name': 'ABC MANUFACTURING PRIVATE LIMITED',
      'PAN Number': 'AABCA1234F',
      'Incorporation Date': '02/11/2021',
      'Category': 'Company'
    },
    checks: [
      { label: 'PAN-GSTIN cross verification', passed: true, note: 'Characters 3-12 match GSTIN' },
      { label: 'Entity status verification', passed: true, note: 'Active company record' }
    ],
    warnings: []
  },
  {
    id: 'doc-3',
    name: 'MIDC Land Allotment Letter & Possession Receipt',
    category: 'Land & Property',
    requiredFor: ['MIDC-BP', 'MPCB-CTE', 'MSEDCL-HT', 'MIDC-WATER'],
    fileName: 'MIDC_Plot_Allotment_Order_C14.pdf',
    fileSize: '1.8 MB',
    uploadedAt: '2026-01-25 02:15 PM',
    status: 'verified',
    confidence: 98,
    extractedFields: {
      'Allottee Name': 'ABC Manufacturing Pvt Ltd',
      'Plot Reference': 'Plot No. C-14, Chakan Phase II',
      'Allotted Area': '18,000 sq. meters',
      'Lease Period': '95 Years',
      'Zoning Classification': 'Heavy Industrial Zone'
    },
    checks: [
      { label: 'MIDC official digital signature stamp', passed: true, note: 'Valid digital seal' },
      { label: 'Demarcation survey report attached', passed: true, note: '7 coordinates verified' }
    ],
    warnings: []
  },
  {
    id: 'doc-4',
    name: 'Architect Approved Factory Layout & Blueprint',
    category: 'Engineering & Architecture',
    requiredFor: ['FIRE-NOC', 'MPCB-CTE', 'DISH-FL'],
    fileName: 'Architect_Site_Layout_Approved_DCR44.pdf',
    fileSize: '4.6 MB',
    uploadedAt: '2026-02-18 10:45 AM',
    status: 'verified',
    confidence: 96,
    extractedFields: {
      'Project Title': 'EV Motor & Battery Assembly Plant',
      'Total Built-Up Area': '8,500 sq. meters',
      'Factory Building Height': '14.5 meters',
      'Architect License No': 'CA/2012/58941 (Council of Arch)',
      'Marginal Open Spaces': 'Front: 12m, Rear: 9m, Sides: 7.5m'
    },
    checks: [
      { label: 'Fire engine access road perimeter > 6m', passed: true, note: 'Continuous 7.5m driveway' },
      { label: 'Floor Space Index (FSI) compliance', passed: true, note: 'FSI 0.47 within 1.0 limit' }
    ],
    warnings: []
  },
  {
    id: 'doc-5',
    name: 'Detailed Project Report (DPR) & Investment Summary',
    category: 'Project Techno-Commercial',
    requiredFor: ['MPCB-CTE', 'MSEDCL-HT', 'DISH-FL'],
    fileName: 'DPR_EV_Components_25Cr.pdf',
    fileSize: '3.2 MB',
    uploadedAt: '2026-02-28 04:20 PM',
    status: 'verified',
    confidence: 94,
    extractedFields: {
      'Total Capital Investment': '₹25.40 Crores',
      'Plant & Machinery Capex': '₹16.80 Crores',
      'Annual Manufacturing Capacity': '120,000 EV Battery Modules & Drives',
      'Workforce Projection': '250 (140 Permanent, 110 Contractual)',
      'Water Requirement': '75 KLD'
    },
    checks: [
      { label: 'Chartered Accountant net worth audit', passed: true, note: 'UDIN verified' },
      { label: 'Pollution classification concordance', passed: true, note: 'Orange Category verified' }
    ],
    warnings: []
  },
  {
    id: 'doc-6',
    name: 'Fire Hydrant & Evacuation Layout Blueprint',
    category: 'Safety & Emergency',
    requiredFor: ['FIRE-NOC', 'DISH-FL'],
    fileName: 'Fire_Hydrant_Sprinkler_Blueprint_R2.pdf',
    fileSize: '2.9 MB',
    uploadedAt: '2026-02-26 09:10 AM',
    status: 'verified',
    confidence: 97,
    extractedFields: {
      'Water Tank Capacity': '200,000 Litres Dedicated Fire Sump',
      'Hydrant Points': '18 external ring points + 24 internal hose reels',
      'Fire Sprinkler Coverage': '100% Assembly & Warehouse bays',
      'Diesel Booster Pump': '2850 LPM @ 7 bar rating'
    },
    checks: [
      { label: 'NBC 2016 Part 4 Compliance Matrix', passed: true, note: 'Certified by Licensed Fire Agency' },
      { label: 'Emergency exit egress distance check', passed: true, note: 'Max travel distance 26m < 30m' }
    ],
    warnings: []
  },
  {
    id: 'doc-7',
    name: 'Effluent Treatment Plant (ETP/STP) Engineering Design',
    category: 'Environmental Compliance',
    requiredFor: ['MPCB-CTE'],
    fileName: 'ETP_STP_Design_Report_v1.pdf',
    fileSize: '2.1 MB',
    uploadedAt: '2026-03-02 01:40 PM',
    status: 'needs_review',
    confidence: 84,
    extractedFields: {
      'Proposed ETP Hydraulic Capacity': '35 KLD',
      'Treated Effluent Standard': 'Zero Liquid Discharge (ZLD) RO + MEE',
      'Domestic Sewage STP Capacity': '25 KLD',
      'Discharge Medium': '100% Recycled for Cooling & Gardening'
    },
    checks: [
      { label: 'ZLD recovery mass balance validation', passed: true, note: 'Mass balance balanced' },
      { label: 'Heavy metal rinse precipitation stage', passed: false, note: 'Chemical dosage design table missing' },
      { label: 'Continuous Effluent Monitoring System (OCEMS)', passed: true, note: 'IoT sensor provision included' }
    ],
    warnings: [
      'Department Officer flagged query: Missing design calculation for nickel electroplating rinse neutralizer tank.'
    ]
  },
  {
    id: 'doc-8',
    name: 'Hazardous Waste Storage & Authorized Recycler Agreement',
    category: 'Environmental Compliance',
    requiredFor: ['MPCB-CTE', 'DISH-FL'],
    fileName: 'Hazardous_Waste_Management_Plan.pdf',
    fileSize: '1.4 MB',
    uploadedAt: '2026-03-02 01:50 PM',
    status: 'needs_review',
    confidence: 89,
    extractedFields: {
      'Hazardous Waste Category': 'Schedule I - Item 5.1 (Used oil), 33.1 (Chemical sludge)',
      'Storage Bay Area': '120 sq. meters covered shed with impervious flooring',
      'Common TSDF Facility': 'MEPL Ranjangaon Common Waste Treatment Facility',
      'Membership Agreement Ref': 'MEPL/HAZ/PUNE/2025/1198'
    },
    checks: [
      { label: 'TSDF membership validity', passed: true, note: 'Valid up to 31/12/2027' },
      { label: 'Containment bund wall height', passed: false, note: 'Specified 15cm, requires min 20cm' }
    ],
    warnings: ['Storage shed containment bund height requires minor amendment.']
  },
  {
    id: 'doc-9',
    name: 'Single-Line High-Tension Electrical Schematic Diagram',
    category: 'Electrical & Utility',
    requiredFor: ['MSEDCL-HT', 'DISH-FL'],
    fileName: 'HT_Substation_SLD_1200kVA.pdf',
    fileSize: '1.7 MB',
    uploadedAt: '2026-03-04 11:20 AM',
    status: 'uploaded',
    confidence: 91,
    extractedFields: {
      'Incoming Voltage': '22 kV Substation Feed',
      'Step-Down Transformer': '1 x 1200 kVA, 22kV / 433V Oil-Cooled',
      'Chartered Electrical Engineer': 'Er. S. R. Joshi (License CE-7841)',
      'Capacitor Bank': '450 kVAR Automatic APFC'
    },
    checks: [
      { label: 'Grounding resistance specification', passed: true, note: '< 1.0 Ohm copper plate earthing' },
      { label: 'HT Vacuum Circuit Breaker (VCB) rating', passed: true, note: '25kA for 3 sec rated' }
    ],
    warnings: []
  },
  {
    id: 'doc-10',
    name: 'Contract Labour Undertaking & Contractor License (Form V)',
    category: 'Labour & Workforce',
    requiredFor: ['DISH-FL'],
    fileName: 'Form_V_Contract_Labour_Registration.pdf',
    fileSize: '820 KB',
    uploadedAt: '2026-03-06 03:15 PM',
    status: 'uploaded',
    confidence: 93,
    extractedFields: {
      'Principal Employer': 'ABC Manufacturing Pvt Ltd',
      'Max Contract Workers': '110 workers',
      'Authorized Contractor': 'Apex Facility & Industrial Services LLP',
      'Labour Welfare Fund Contribution': 'Remitted online'
    },
    checks: [
      { label: 'Minimum wages undertaking clause', passed: true, note: 'Certified as per Maharashtra Zone II' },
      { label: 'ESI & EPF registration codes', passed: true, note: 'Codes active on EPFO Shram Suvidha' }
    ],
    warnings: []
  }
];

export const INITIAL_QUERIES: QueryItem[] = [
  {
    id: 'QRY-2026-041',
    applicationId: 'APP-2026-MPCB-0842',
    approvalCode: 'MPCB-CTE',
    approvalName: 'Consent to Establish (CTE) - Orange Category',
    department: 'Maharashtra Pollution Control Board (MPCB)',
    officerName: 'Er. Sunita Patil (Sub-Regional Officer)',
    queryText: 'In the submitted ETP design report, the nickel/chromium rinse neutralizer tank sizing is missing retention time calculations for peak 40 m³/day flow. Furthermore, please attach the revised CAD layout indicating the chemical dosing pump shed location and emergency eye-wash station.',
    raisedDate: '2026-03-15 14:30',
    deadlineDate: '2026-03-22 17:00',
    daysLeft: 4,
    priority: 'high',
    status: 'open'
  },
  {
    id: 'QRY-2026-029',
    applicationId: 'APP-MSEDCL-2026-5512',
    approvalCode: 'MSEDCL-HT',
    approvalName: 'High Tension Industrial Power Connection (1200 kVA)',
    department: 'Maharashtra State Electricity Distribution Co (MSEDCL)',
    officerName: 'Er. Prakash Tambe (Executive Engineer)',
    queryText: 'Please submit the NOC from adjacent plot owner for overhead 22kV cable trench wayleave clearance across Plot C-13 boundary.',
    raisedDate: '2026-03-12 10:15',
    deadlineDate: '2026-03-26 18:00',
    daysLeft: 8,
    priority: 'medium',
    status: 'open'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'NOTIF-1',
    title: 'Department Query Raised by MPCB',
    message: 'Er. Sunita Patil (MPCB SRO Pune) raised a query regarding ETP rinse neutralizer sizing on Application APP-2026-MPCB-0842. Action required within 4 days.',
    type: 'query',
    timestamp: '2 hours ago',
    isRead: false,
    actionLink: '/queries'
  },
  {
    id: 'NOTIF-2',
    title: 'Critical Path Warning: Factory License Blocked',
    message: 'DISH Factory License is dependent on MPCB Consent to Establish. Resolving the MPCB query will unblock downstream sanction.',
    type: 'warning',
    timestamp: '5 hours ago',
    isRead: false,
    actionLink: '/bottlenecks'
  },
  {
    id: 'NOTIF-3',
    title: 'Provisional Fire NOC Granted!',
    message: 'Maharashtra Fire Services has issued Provisional Fire NOC (MFS/PUNE/NOC/2026/894). Stamped certificate available for download.',
    type: 'success',
    timestamp: 'Yesterday',
    isRead: true,
    actionLink: '/applications/APP-FIRE-2026-0941'
  },
  {
    id: 'NOTIF-4',
    title: 'AI Document Pre-Audit Completed',
    message: 'Single-Line Electrical Diagram verified with 91% confidence score. No compliance mismatches detected.',
    type: 'info',
    timestamp: '2 days ago',
    isRead: true,
    actionLink: '/pre-audit'
  }
];

export const INITIAL_GRIEVANCES: GrievanceItem[] = [
  {
    id: 'GRV-2026-104',
    applicationId: 'APP-MIDC-WW-2026-302',
    category: 'Water Works Division Inspection Delay',
    subject: 'Site inspection pending beyond 7-day citizen charter SLA',
    description: 'Application for industrial water connection was filed on 07/03/2026. Feasibility survey team has not visited site yet.',
    priority: 'medium',
    status: 'In Progress',
    createdAt: '2026-03-14 09:30',
    assignedOfficer: 'Smt. Meena Shinde (Nodal Facilitation Officer)',
    resolutionNotes: 'Inspection scheduled by MIDC Sub-division on 19/03/2026 morning.'
  }
];

export const APPLICATION_AUDIT_LOGS: StatusHistoryEntry[] = [
  {
    id: 'LOG-1',
    date: '2026-03-02 14:00',
    stage: 'Application Submission',
    status: 'SUBMITTED',
    officer: 'System Auto-Receipt',
    remarks: 'Application APP-2026-MPCB-0842 received with 4 mandatory documents via Single Window API.'
  },
  {
    id: 'LOG-2',
    date: '2026-03-03 10:15',
    stage: 'AI Pre-Audit Inspection',
    status: 'AI_AUDITED',
    officer: 'Udyog Sarthi AI Engine v2.4',
    remarks: 'AI extracted metadata from DPR, verified land zoning, and flagged warning on ETP chemical neutralization formula.'
  },
  {
    id: 'LOG-3',
    date: '2026-03-06 16:45',
    stage: 'Department Scrutiny',
    status: 'IN_SCRUTINY',
    officer: 'Er. Sunita Patil (MPCB SRO Pune)',
    remarks: 'Application assigned to Environmental Field Officer for desk and emissions review.'
  },
  {
    id: 'LOG-4',
    date: '2026-03-15 14:30',
    stage: 'Department Query Raised',
    status: 'ACTION_REQUIRED',
    officer: 'Er. Sunita Patil (MPCB SRO Pune)',
    remarks: 'Technical query issued requesting updated ETP calculation and revised CAD drawings within 7 calendar days.'
  }
];
