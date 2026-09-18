export type UserRole = 'entrepreneur' | 'officer' | 'nodal' | 'admin';

export interface BusinessProfile {
  id: string;
  name: string;
  applicantName: string;
  email: string;
  mobile: string;
  gstin: string;
  pan: string;
  businessType: string;
  registeredAddress: string;
}

export interface ProjectProfile {
  id: string;
  name: string;
  sector: string;
  proposedInvestmentCr: number;
  totalEmployees: number;
  state: string;
  district: string;
  landType: string;
  midcArea: string;
  category: 'Manufacturing' | 'Service';
  expectedStartDate: string;
  powerDemandKVA: number;
  waterDemandKLD: number;
  pollutionCategory: 'Red' | 'Orange' | 'Green' | 'White';
  builtUpAreaSqM: number;
  plotAreaSqM: number;
  hasBoiler: boolean;
  hasHazardousMaterial: boolean;
  contractWorkers: number;
  buildingHeightMeters: number;
}

export type ApprovalStatus = 'COMPLETED' | 'IN_PROGRESS' | 'ACTION_REQUIRED' | 'BLOCKED' | 'PENDING';

export interface ApprovalItem {
  id: string;
  code: string;
  name: string;
  department: string;
  departmentCode: string;
  type: 'mandatory' | 'conditional';
  reason: string;
  status: ApprovalStatus;
  timelineDays: number;
  fee: number;
  confidenceScore: number;
  prerequisites: string[]; // approval codes
  downstream: string[]; // approval codes
  stage: string;
  applicationDate?: string;
  approvalDate?: string;
  applicationId?: string;
  officerName?: string;
  requiredDocuments: string[];
  whyBlockedReason?: string;
  riskLevel: 'low' | 'medium' | 'high';
  isCriticalPath: boolean;
  certificateIssued?: boolean;
  certificateNumber?: string;
}

export interface DocumentCheck {
  label: string;
  passed: boolean;
  note?: string;
}

export interface DocumentRecord {
  id: string;
  name: string;
  category: string;
  requiredFor: string[];
  fileName?: string;
  fileSize?: string;
  uploadedAt?: string;
  status: 'missing' | 'uploaded' | 'verified' | 'needs_review';
  confidence: number;
  extractedFields: Record<string, string>;
  checks: DocumentCheck[];
  warnings: string[];
  expiryDate?: string;
}

export interface QueryItem {
  id: string;
  applicationId: string;
  approvalCode: string;
  approvalName: string;
  department: string;
  officerName: string;
  queryText: string;
  raisedDate: string;
  deadlineDate: string;
  daysLeft: number;
  priority: 'urgent' | 'high' | 'medium';
  status: 'open' | 'responded' | 'resolved';
  applicantResponse?: string;
  responseDate?: string;
  attachedDocName?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'query' | 'status' | 'warning' | 'info' | 'success';
  timestamp: string;
  isRead: boolean;
  actionLink?: string;
}

export interface RegulatoryRule {
  id: string;
  name: string;
  description: string;
  sector: string;
  investmentMinCr: number;
  pollutionCategory?: string;
  triggeredApprovals: string[];
  department: string;
  slaDays: number;
  status: 'ACTIVE' | 'DRAFT' | 'ARCHIVED';
  version: string;
  updatedAt: string;
}

export interface GrievanceItem {
  id: string;
  applicationId: string;
  category: string;
  subject: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'Submitted' | 'Assigned' | 'In Progress' | 'Resolved';
  createdAt: string;
  assignedOfficer: string;
  resolutionNotes?: string;
}

export interface StatusHistoryEntry {
  id: string;
  date: string;
  stage: string;
  status: string;
  officer: string;
  remarks: string;
}
