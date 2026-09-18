'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  BusinessProfile,
  ProjectProfile,
  ApprovalItem,
  DocumentRecord,
  QueryItem,
  NotificationItem,
  GrievanceItem,
  RegulatoryRule,
  StatusHistoryEntry
} from '../types';
import {
  INITIAL_BUSINESS,
  INITIAL_PROJECT,
  INITIAL_APPROVALS,
  INITIAL_DOCUMENTS,
  INITIAL_QUERIES,
  INITIAL_NOTIFICATIONS,
  INITIAL_GRIEVANCES,
  APPLICATION_AUDIT_LOGS
} from '../data/seedData';
import { INITIAL_RULES } from '../data/rulesData';

interface AppContextType {
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  business: BusinessProfile;
  setBusiness: React.Dispatch<React.SetStateAction<BusinessProfile>>;
  project: ProjectProfile;
  setProject: React.Dispatch<React.SetStateAction<ProjectProfile>>;
  approvals: ApprovalItem[];
  setApprovals: React.Dispatch<React.SetStateAction<ApprovalItem[]>>;
  documents: DocumentRecord[];
  setDocuments: React.Dispatch<React.SetStateAction<DocumentRecord[]>>;
  queries: QueryItem[];
  setQueries: React.Dispatch<React.SetStateAction<QueryItem[]>>;
  notifications: NotificationItem[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
  grievances: GrievanceItem[];
  setGrievances: React.Dispatch<React.SetStateAction<GrievanceItem[]>>;
  rules: RegulatoryRule[];
  setRules: React.Dispatch<React.SetStateAction<RegulatoryRule[]>>;
  auditLogs: StatusHistoryEntry[];
  
  // Interactive operations
  uploadAndScanDocument: (docId: string, customName?: string) => Promise<DocumentRecord>;
  respondToQuery: (queryId: string, responseText: string, attachedDocName?: string) => void;
  raiseOfficerQuery: (approvalCode: string, queryText: string, priority?: 'urgent' | 'high' | 'medium') => void;
  approveApplication: (approvalCode: string, officerName?: string, remarks?: string) => void;
  addNotification: (notif: Omit<NotificationItem, 'id' | 'timestamp' | 'isRead'>) => void;
  markNotificationRead: (id: string) => void;
  addGrievance: (g: Omit<GrievanceItem, 'id' | 'createdAt' | 'status' | 'assignedOfficer'>) => void;
  addRule: (rule: Omit<RegulatoryRule, 'id' | 'updatedAt'>) => void;
  resetToDefault: () => void;
  
  // Guided Tour
  demoStep: number;
  setDemoStep: (step: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentRole, setRole] = useState<UserRole>('entrepreneur');
  const [business, setBusiness] = useState<BusinessProfile>(INITIAL_BUSINESS);
  const [project, setProject] = useState<ProjectProfile>(INITIAL_PROJECT);
  const [approvals, setApprovals] = useState<ApprovalItem[]>(INITIAL_APPROVALS);
  const [documents, setDocuments] = useState<DocumentRecord[]>(INITIAL_DOCUMENTS);
  const [queries, setQueries] = useState<QueryItem[]>(INITIAL_QUERIES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [grievances, setGrievances] = useState<GrievanceItem[]>(INITIAL_GRIEVANCES);
  const [rules, setRules] = useState<RegulatoryRule[]>(INITIAL_RULES);
  const [auditLogs, setAuditLogs] = useState<StatusHistoryEntry[]>(APPLICATION_AUDIT_LOGS);
  const [demoStep, setDemoStep] = useState<number>(1);

  // Helper to add notification
  const addNotification = (notif: Omit<NotificationItem, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotif: NotificationItem = {
      ...notif,
      id: `NOTIF-${Date.now()}`,
      timestamp: 'Just now',
      isRead: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  // Simulated AI Document OCR & Pre-Audit
  const uploadAndScanDocument = async (docId: string, customName?: string): Promise<DocumentRecord> => {
    // Simulates an async OCR reading, parsing and field mismatch validation
    return new Promise((resolve) => {
      setTimeout(() => {
        let updatedDoc: DocumentRecord | undefined;
        setDocuments(prev => {
          const mapped = prev.map(doc => {
            if (doc.id === docId) {
              const fileName = customName || doc.fileName || `${doc.name.replace(/\s+/g, '_')}_v2.pdf`;
              updatedDoc = {
                ...doc,
                fileName,
                fileSize: '3.4 MB',
                uploadedAt: 'Just now',
                status: 'verified',
                confidence: 97,
                extractedFields: {
                  ...doc.extractedFields,
                  'AI Verification Status': 'PASSED - Discrepancy Rectified',
                  'Neutralizer Tank Sizing': '42 m³/day Capacity (Peak load: 1.2x safety factor)',
                  'Chemical Precipitation Unit': 'Automated Caustic Dosing + Flocculator design included',
                  'Last Scan Timestamp': new Date().toISOString()
                },
                checks: doc.checks.map(c => ({ ...c, passed: true })),
                warnings: []
              };
              return updatedDoc;
            }
            return doc;
          });
          return mapped;
        });

        addNotification({
          title: 'AI Document Pre-Audit Passed',
          message: `${customName || 'Uploaded document'} successfully scanned and passed 100% compliance checks.`,
          type: 'success',
          actionLink: '/pre-audit'
        });

        resolve(updatedDoc || documents[0]);
      }, 1200);
    });
  };

  // Respond to department query
  const respondToQuery = (queryId: string, responseText: string, attachedDocName?: string) => {
    setQueries(prev =>
      prev.map(q => {
        if (q.id === queryId) {
          return {
            ...q,
            status: 'responded',
            applicantResponse: responseText,
            responseDate: 'Just now',
            attachedDocName: attachedDocName || 'Revised_ETP_ZLD_Calculations_v2.pdf'
          };
        }
        return q;
      })
    );

    // Update the linked approval state to IN_PROGRESS
    setApprovals(prev =>
      prev.map(app => {
        if (app.code === 'MPCB-CTE') {
          return {
            ...app,
            status: 'IN_PROGRESS',
            stage: 'Response Submitted - Under Officer Re-Review',
            whyBlockedReason: undefined
          };
        }
        return app;
      })
    );

    // Add audit log
    setAuditLogs(prev => [
      ...prev,
      {
        id: `LOG-${Date.now()}`,
        date: new Date().toLocaleString('en-IN'),
        stage: 'Applicant Response Submitted',
        status: 'RESPONSE_FILED',
        officer: 'Rajesh Verma (Applicant)',
        remarks: `Response filed with revised technical ETP calculation attachment: "${responseText.substring(0, 70)}..."`
      }
    ]);

    addNotification({
      title: 'Query Response Submitted',
      message: 'Your explanation and revised document were delivered to Er. Sunita Patil (MPCB).',
      type: 'info',
      actionLink: '/officer'
    });
  };

  // Officer raises query
  const raiseOfficerQuery = (approvalCode: string, queryText: string, priority: 'urgent' | 'high' | 'medium' = 'high') => {
    const targetApproval = approvals.find(a => a.code === approvalCode);
    const newQuery: QueryItem = {
      id: `QRY-${Date.now().toString().slice(-4)}`,
      applicationId: targetApproval?.applicationId || `APP-${approvalCode}-2026`,
      approvalCode,
      approvalName: targetApproval?.name || 'Regulatory Approval',
      department: targetApproval?.department || 'Government Department',
      officerName: 'Er. Sunita Patil (SRO Pune)',
      queryText,
      raisedDate: 'Just now',
      deadlineDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      daysLeft: 7,
      priority,
      status: 'open'
    };

    setQueries(prev => [newQuery, ...prev]);

    setApprovals(prev =>
      prev.map(app => {
        if (app.code === approvalCode) {
          return {
            ...app,
            status: 'ACTION_REQUIRED',
            stage: 'Officer Query Raised - Awaiting Response',
            whyBlockedReason: queryText
          };
        }
        return app;
      })
    );

    addNotification({
      title: `Query Raised: ${targetApproval?.name}`,
      message: `Officer requested clarification: "${queryText.substring(0, 60)}..."`,
      type: 'query',
      actionLink: '/queries'
    });
  };

  // Officer approves application
  const approveApplication = (approvalCode: string, officerName: string = 'Er. Sunita Patil (MPCB SRO Pune)', remarks?: string) => {
    const certNumber = `MAHA/${approvalCode}/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`;

    setApprovals(prev => {
      // Find downstream approvals to unblock
      const approvedApp = prev.find(a => a.code === approvalCode);
      const downstreamCodes = approvedApp?.downstream || [];

      return prev.map(app => {
        if (app.code === approvalCode) {
          return {
            ...app,
            status: 'COMPLETED',
            stage: 'Statutory Sanction Granted',
            approvalDate: new Date().toISOString().split('T')[0],
            certificateIssued: true,
            certificateNumber: certNumber,
            whyBlockedReason: undefined
          };
        }

        // If downstream was blocked by this approval, check if all prereqs are now satisfied
        if (downstreamCodes.includes(app.code)) {
          return {
            ...app,
            status: 'IN_PROGRESS',
            stage: 'Prerequisites Satisfied - Under Review',
            whyBlockedReason: undefined
          };
        }

        return app;
      });
    });

    // Mark any open query for this approval as resolved
    setQueries(prev =>
      prev.map(q => (q.approvalCode === approvalCode ? { ...q, status: 'resolved' } : q))
    );

    // Add to audit logs
    setAuditLogs(prev => [
      ...prev,
      {
        id: `LOG-${Date.now()}`,
        date: new Date().toLocaleString('en-IN'),
        stage: 'Final Statutory Approval',
        status: 'SANCTION_ISSUED',
        officer: officerName,
        remarks: remarks || `Application approved. Certificate ${certNumber} generated with digital seal.`
      }
    ]);

    addNotification({
      title: `Approval Granted! Certificate Generated`,
      message: `Congratulations! ${approvalCode} has received formal sanction. Certificate Ref: ${certNumber}`,
      type: 'success',
      actionLink: `/applications/APP-2026-MPCB-0842?certificate=true`
    });
  };

  const addGrievance = (g: Omit<GrievanceItem, 'id' | 'createdAt' | 'status' | 'assignedOfficer'>) => {
    const newGrievance: GrievanceItem = {
      ...g,
      id: `GRV-2026-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: 'Just now',
      status: 'Submitted',
      assignedOfficer: 'Smt. Meena Shinde (District Nodal Officer)'
    };
    setGrievances(prev => [newGrievance, ...prev]);

    addNotification({
      title: 'Grievance Ticket Created',
      message: `Ticket #${newGrievance.id} registered and assigned to District Nodal Facilitation Officer.`,
      type: 'info',
      actionLink: '/support'
    });
  };

  const addRule = (r: Omit<RegulatoryRule, 'id' | 'updatedAt'>) => {
    const newRule: RegulatoryRule = {
      ...r,
      id: `RULE-CUSTOM-${Date.now().toString().slice(-4)}`,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setRules(prev => [newRule, ...prev]);
  };

  const resetToDefault = () => {
    setBusiness(INITIAL_BUSINESS);
    setProject(INITIAL_PROJECT);
    setApprovals(INITIAL_APPROVALS);
    setDocuments(INITIAL_DOCUMENTS);
    setQueries(INITIAL_QUERIES);
    setNotifications(INITIAL_NOTIFICATIONS);
    setGrievances(INITIAL_GRIEVANCES);
    setRules(INITIAL_RULES);
    setAuditLogs(APPLICATION_AUDIT_LOGS);
    setRole('entrepreneur');
    setDemoStep(1);
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setRole,
        business,
        setBusiness,
        project,
        setProject,
        approvals,
        setApprovals,
        documents,
        setDocuments,
        queries,
        setQueries,
        notifications,
        setNotifications,
        grievances,
        setGrievances,
        rules,
        setRules,
        auditLogs,
        uploadAndScanDocument,
        respondToQuery,
        raiseOfficerQuery,
        approveApplication,
        addNotification,
        markNotificationRead,
        addGrievance,
        addRule,
        resetToDefault,
        demoStep,
        setDemoStep
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
