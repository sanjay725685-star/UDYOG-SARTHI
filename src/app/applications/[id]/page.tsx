'use client';

import React, { useState, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '../../../context/AppContext';
import CertificateModal from '../../../components/CertificateModal';
import DocumentScannerModal from '../../../components/DocumentScannerModal';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Download,
  Upload,
  MessageSquare,
  ShieldCheck,
  History,
  ArrowRight,
  Printer,
  Award,
  Sparkles,
  ChevronRight,
  Building2,
  MapPin,
  IndianRupee,
  Users,
  Calendar,
  Layers,
  Info
} from 'lucide-react';

function ApplicationDetailContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { approvals, documents, queries, auditLogs, project, business } = useApp();

  const appId = (params?.id as string) || 'US-2026-0001';
  const showCertOnLoad = searchParams.get('certificate') === 'true';

  // Find linked approval or default to MPCB-CTE
  const approval = approvals.find(a => a.applicationId === appId || a.code === 'MPCB-CTE') || approvals[3];
  const linkedDocs = documents.filter(d => d.requiredFor.includes(approval.code));
  const linkedQueries = queries.filter(q => q.approvalCode === approval.code || q.applicationId === appId);

  const [activeTab, setActiveTab] = useState<
    'OVERVIEW' | 'TIMELINE' | 'DOCUMENTS' | 'AI_PRE_SCRUTINY' | 'QUERIES' | 'COMPLIANCE'
  >('OVERVIEW');
  const [isCertModalOpen, setIsCertModalOpen] = useState(showCertOnLoad);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  // Section 10: Exact 7-Event Vertical Timeline
  const verticalTimelineEvents = [
    {
      title: 'Application Submitted',
      date: '02 Mar 2026',
      time: '10:30 AM IST',
      department: 'Single Window Clearing Cell',
      officer: 'Applicant Submission (Self)',
      action: 'Common Application Form (CAF) & preliminary industrial dossier lodged successfully.',
      status: 'completed'
    },
    {
      title: 'Document Verification',
      date: '03 Mar 2026',
      time: '11:15 AM IST',
      department: 'MAITRI Verification Desk',
      officer: 'Shri R. K. Shinde (Scrutiny Clerk)',
      action: 'Mandatory checklist format, land deed, and digital signature validity verified.',
      status: 'completed'
    },
    {
      title: 'AI Pre-Scrutiny',
      date: '03 Mar 2026',
      time: '11:45 AM IST',
      department: 'Udyog Sarthi Regulatory Engine',
      officer: 'Automated Pre-Scrutiny Sub-system',
      action: 'OCR extraction performed. Engineering parameter validation flagged potential ETP sizing discrepancy.',
      status: 'completed'
    },
    {
      title: 'Department Review',
      date: '06 Mar 2026',
      time: '02:00 PM IST',
      department: 'Maharashtra Pollution Control Board (MPCB)',
      officer: 'Er. Sunita Patil (Sub-Regional Officer)',
      action: 'Technical evaluation of effluent generation, air emission stacks, and hazardous waste storage.',
      status: 'completed'
    },
    {
      title: 'Query Raised',
      date: '10 Mar 2026',
      time: '04:30 PM IST',
      department: 'Maharashtra Pollution Control Board (MPCB)',
      officer: 'Er. Sunita Patil (Sub-Regional Officer)',
      action: 'Clarification query raised regarding hydraulic retention mass balance of the effluent treatment plant.',
      status: 'completed'
    },
    {
      title: 'Applicant Response',
      date: '12 Mar 2026',
      time: '11:00 AM IST',
      department: 'Single Window Investor Gateway',
      officer: 'Rajesh Sharma (Authorized Signatory)',
      action: 'Revised engineering blueprint and technical explanatory note uploaded by applicant.',
      status: 'completed'
    },
    {
      title: 'Final Decision',
      date: '15 Mar 2026',
      time: '03:30 PM IST',
      department: 'Maharashtra Pollution Control Board (MPCB)',
      officer: 'Competent Statutory Authority',
      action: 'Final statutory Consent to Establish (CTE) granted under Section 25 of Water Act 1974.',
      status: approval.status === 'COMPLETED' ? 'completed' : 'pending'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Government Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-[#0b2545]">Home</Link>
        <span>/</span>
        <Link href="/dashboard" className="hover:text-[#0b2545]">Applicant Dashboard</Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">Application Dossier</span>
      </nav>

      {/* =========================================================================
          SECTION 10 HEADER: APPLICATION ID & PROJECT
         ========================================================================= */}
      <div className="bg-white border border-slate-300 p-5 rounded shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#005a9c] mb-1">
            <span className="font-bold bg-blue-50 text-[#005a9c] px-2 py-0.5 rounded border border-blue-200">
              Application ID: {appId}
            </span>
            <span>•</span>
            <span className="text-slate-600 font-sans">Single Window Clearance Dossier</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0b2545] tracking-tight">
            Project: Pune EV Manufacturing Unit
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Statutory Approval: <strong>{approval.name}</strong> • Department: <strong>{approval.department}</strong> ({approval.departmentCode})
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {approval.certificateIssued && (
            <button
              onClick={() => setIsCertModalOpen(true)}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>View Sanction Order</span>
            </button>
          )}

          {approval.status === 'ACTION_REQUIRED' && (
            <Link
              href="/queries"
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Respond to Open Query</span>
            </Link>
          )}

          <button
            onClick={() => window.print()}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print Dossier</span>
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="border-b border-slate-300 flex items-center space-x-1 overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setActiveTab('OVERVIEW')}
          className={`px-4 py-2.5 border-b-2 transition ${
            activeTab === 'OVERVIEW'
              ? 'border-[#0b2545] text-[#0b2545]'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Particulars & Metadata
        </button>
        <button
          onClick={() => setActiveTab('TIMELINE')}
          className={`px-4 py-2.5 border-b-2 transition ${
            activeTab === 'TIMELINE'
              ? 'border-[#0b2545] text-[#0b2545]'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Lifecycle Timeline (7 Stages)
        </button>
        <button
          onClick={() => setActiveTab('DOCUMENTS')}
          className={`px-4 py-2.5 border-b-2 transition ${
            activeTab === 'DOCUMENTS'
              ? 'border-[#0b2545] text-[#0b2545]'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Documents ({linkedDocs.length})
        </button>
        <button
          onClick={() => setActiveTab('AI_PRE_SCRUTINY')}
          className={`px-4 py-2.5 border-b-2 transition ${
            activeTab === 'AI_PRE_SCRUTINY'
              ? 'border-[#0b2545] text-[#0b2545]'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          AI-Assisted Pre-Scrutiny
        </button>
        <button
          onClick={() => setActiveTab('QUERIES')}
          className={`px-4 py-2.5 border-b-2 transition ${
            activeTab === 'QUERIES'
              ? 'border-[#0b2545] text-[#0b2545]'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Department Queries ({linkedQueries.length})
        </button>
        <button
          onClick={() => setActiveTab('COMPLIANCE')}
          className={`px-4 py-2.5 border-b-2 transition ${
            activeTab === 'COMPLIANCE'
              ? 'border-[#0b2545] text-[#0b2545]'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Post-Approval Compliance
        </button>
      </div>

      {/* =========================================================================
          TAB 1: OVERVIEW & PARTICULARS
         ========================================================================= */}
      {activeTab === 'OVERVIEW' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Applicant Details */}
          <div className="bg-white border border-slate-300 rounded p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0b2545] border-b border-slate-200 pb-2">
              Applicant Details
            </h3>
            <table className="w-full text-xs text-left">
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2 text-slate-500 font-medium">Enterprise Name</td>
                  <td className="py-2 font-bold text-slate-900">{business.name}</td>
                </tr>
                <tr>
                  <td className="py-2 text-slate-500 font-medium">Authorized Signatory</td>
                  <td className="py-2 font-semibold text-slate-800">{business.applicantName}</td>
                </tr>
                <tr>
                  <td className="py-2 text-slate-500 font-medium">Corporate PAN</td>
                  <td className="py-2 font-mono font-bold text-slate-900">{business.pan}</td>
                </tr>
                <tr>
                  <td className="py-2 text-slate-500 font-medium">State GSTIN</td>
                  <td className="py-2 font-mono font-bold text-slate-900">{business.gstin}</td>
                </tr>
                <tr>
                  <td className="py-2 text-slate-500 font-medium">Registered Address</td>
                  <td className="py-2 text-slate-700">{business.registeredAddress}</td>
                </tr>
                <tr>
                  <td className="py-2 text-slate-500 font-medium">Authorized Email / Mobile</td>
                  <td className="py-2 text-slate-700">{business.email} • {business.mobile}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Project Details */}
          <div className="bg-white border border-slate-300 rounded p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0b2545] border-b border-slate-200 pb-2">
              Project Details
            </h3>
            <table className="w-full text-xs text-left">
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2 text-slate-500 font-medium">Project Title</td>
                  <td className="py-2 font-bold text-slate-900">{project.name}</td>
                </tr>
                <tr>
                  <td className="py-2 text-slate-500 font-medium">Location</td>
                  <td className="py-2 font-semibold text-slate-800">{project.midcArea}, Pune, Maharashtra</td>
                </tr>
                <tr>
                  <td className="py-2 text-slate-500 font-medium">Proposed Capital Investment</td>
                  <td className="py-2 font-bold text-slate-900">₹{project.proposedInvestmentCr} Crores (Capex)</td>
                </tr>
                <tr>
                  <td className="py-2 text-slate-500 font-medium">Direct Employment Potential</td>
                  <td className="py-2 font-bold text-slate-900">{project.totalEmployees} Personnel</td>
                </tr>
                <tr>
                  <td className="py-2 text-slate-500 font-medium">Land Area Allocated</td>
                  <td className="py-2 text-slate-700">{(project.plotAreaSqM || 25000).toLocaleString('en-IN')} sq. metres (MIDC Plot A-12/1)</td>
                </tr>
                <tr>
                  <td className="py-2 text-slate-500 font-medium">Pollution Classification</td>
                  <td className="py-2 text-slate-700">Orange Category (Moderate Pollution)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Applicable Approvals Summary */}
          <div className="bg-white border border-slate-300 rounded p-5 shadow-xs space-y-3 md:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0b2545] border-b border-slate-200 pb-2">
              Applicable Approval Details & Departmental Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                <span className="text-slate-500 text-[11px] block">Statutory Clearance</span>
                <strong className="text-slate-900 block mt-0.5">{approval.name}</strong>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                <span className="text-slate-500 text-[11px] block">Nodal Department</span>
                <strong className="text-slate-900 block mt-0.5">{approval.department}</strong>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                <span className="text-slate-500 text-[11px] block">Mandated SLA Timeline</span>
                <strong className="text-slate-900 block mt-0.5">{approval.timelineDays} Calendar Days</strong>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                <span className="text-slate-500 text-[11px] block">Prescribed Statutory Fee</span>
                <strong className="text-slate-900 block mt-0.5">₹{approval.fee.toLocaleString('en-IN')} (Paid)</strong>
              </div>
            </div>

            <div className="p-3.5 bg-blue-50 border border-blue-200 rounded text-xs text-slate-800 leading-relaxed">
              <strong>Departmental Scrutiny Note:</strong> Application APP-2026-MPCB-0842 is assigned to Er. Sunita Patil, Sub-Regional Officer Pune. Scrutiny is proceeding in accordance with the Water (Prevention and Control of Pollution) Act 1974.
            </div>
          </div>

        </div>
      )}

      {/* =========================================================================
          TAB 2: VERTICAL TIMELINE (EXACT 7 SPECIFIED STAGES)
         ========================================================================= */}
      {activeTab === 'TIMELINE' && (
        <div className="bg-white border border-slate-300 rounded p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="text-sm font-bold text-[#0b2545]">
              Statutory Processing & Scrutiny Timeline
            </h3>
            <p className="text-xs text-slate-500">
              Chronological log of administrative actions, inspections, and applicant submissions
            </p>
          </div>

          <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {verticalTimelineEvents.map((evt, idx) => (
              <div key={idx} className="relative group">
                {/* Dot */}
                <div
                  className={`absolute -left-[27px] top-0.5 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${
                    evt.status === 'completed'
                      ? 'border-emerald-600 text-emerald-600'
                      : 'border-slate-400 text-slate-400'
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      evt.status === 'completed' ? 'bg-emerald-600' : 'bg-slate-300'
                    }`}
                  />
                </div>

                {/* Event Card */}
                <div className="bg-slate-50 border border-slate-200 p-4 rounded text-xs space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-200 pb-2">
                    <span className="font-bold text-slate-900 text-sm">
                      {idx + 1}. {evt.title}
                    </span>
                    <span className="font-mono text-slate-600 text-[11px]">
                      {evt.date} • {evt.time}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-slate-500">Department / Cell:</span>{' '}
                      <strong className="text-slate-800">{evt.department}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500">Officer / Role:</span>{' '}
                      <strong className="text-slate-800">{evt.officer}</strong>
                    </div>
                  </div>

                  <p className="text-slate-700 leading-relaxed pt-1">
                    <strong>Action Recorded:</strong> {evt.action}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: DOCUMENTS
         ========================================================================= */}
      {activeTab === 'DOCUMENTS' && (
        <div className="bg-white border border-slate-300 rounded p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h3 className="text-sm font-bold text-[#0b2545]">
                Mandatory Documentation Dossier
              </h3>
              <p className="text-xs text-slate-500">
                Uploaded blueprints, affidavits, and statutory declarations for {approval.code}
              </p>
            </div>
            <Link
              href="/documents"
              className="px-3 py-1.5 rounded bg-[#0b2545] hover:bg-[#005a9c] text-white text-xs font-bold transition"
            >
              Upload / Replace Document
            </Link>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f1f5f9] text-[#0b2545] font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-4 py-2.5">Document Title</th>
                  <th className="px-4 py-2.5">Category</th>
                  <th className="px-4 py-2.5">File Particulars</th>
                  <th className="px-4 py-2.5">Pre-Scrutiny Verification</th>
                  <th className="px-4 py-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800">
                {linkedDocs.map(doc => (
                  <tr key={doc.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-900">{doc.name}</td>
                    <td className="px-4 py-3 text-slate-600">{doc.category}</td>
                    <td className="px-4 py-3 font-mono text-slate-500 text-[11px]">
                      {doc.fileName || 'Pending_Upload.pdf'} ({doc.fileSize || '1.8 MB'})
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                          doc.status === 'verified'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : doc.status === 'needs_review'
                            ? 'bg-amber-50 text-amber-900 border-amber-300'
                            : 'bg-slate-50 text-slate-700 border-slate-300'
                        }`}
                      >
                        {doc.status === 'verified' ? 'Verified (100%)' : doc.status === 'needs_review' ? 'Clarification Needed' : 'Uploaded'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href="/pre-audit"
                        className="text-[#005a9c] hover:underline font-bold"
                      >
                        Inspect OCR
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: AI-ASSISTED PRE-SCRUTINY
         ========================================================================= */}
      {activeTab === 'AI_PRE_SCRUTINY' && (
        <div className="bg-white border border-slate-300 rounded p-6 shadow-xs space-y-5">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="text-sm font-bold text-[#0b2545]">
              AI-Assisted Pre-Scrutiny Verification Summary
            </h3>
            <p className="text-xs text-slate-500">
              Automated document validation, engineering flow calculations, and cross-registry concordance
            </p>
          </div>

          {/* Statutory Disclaimer */}
          <div className="p-3 bg-blue-50 border-l-4 border-[#005a9c] text-xs text-slate-800 leading-relaxed">
            <strong>Statutory Disclaimer:</strong> AI-generated outputs are provided for assistance and pre-scrutiny only. Final decisions and statutory approvals are made exclusively by the competent government authority.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded text-xs space-y-1">
              <span className="text-slate-500 block text-[11px]">Document Classification</span>
              <strong className="text-emerald-700 flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Completed
              </strong>
              <p className="text-slate-600 text-[11px] pt-1">
                All 10 required architectural and environmental formats correctly identified.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded text-xs space-y-1">
              <span className="text-slate-500 block text-[11px]">OCR Extraction</span>
              <strong className="text-emerald-700 flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Completed
              </strong>
              <p className="text-slate-600 text-[11px] pt-1">
                Corporate PAN & GSTIN matched against CBDT & GSTN registry database.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded text-xs space-y-1">
              <span className="text-slate-500 block text-[11px]">Rule-Based Validation</span>
              <strong className="text-amber-700 flex items-center gap-1 font-bold">
                <AlertTriangle className="w-3.5 h-3.5" /> Warning / Attention Required
              </strong>
              <p className="text-slate-600 text-[11px] pt-1">
                Effluent sizing equation in Doc-7 verified at 42 m³/day; clarification submitted.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 5: QUERIES
         ========================================================================= */}
      {activeTab === 'QUERIES' && (
        <div className="bg-white border border-slate-300 rounded p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h3 className="text-sm font-bold text-[#0b2545]">
                Department Query & Clarification Desk
              </h3>
              <p className="text-xs text-slate-500">
                Official statutory queries raised under the Water & Air Acts
              </p>
            </div>
            <Link
              href="/queries"
              className="px-3 py-1.5 rounded bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold transition"
            >
              Open Full Query Desk
            </Link>
          </div>

          <div className="space-y-3">
            {linkedQueries.map(q => (
              <div key={q.id} className="p-4 rounded border border-slate-200 bg-slate-50 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <strong className="text-slate-900">{q.officerName}</strong>
                  <span className="font-mono text-slate-500 text-[11px]">{q.raisedDate}</span>
                </div>
                <div className="bg-white p-3 border border-slate-200 rounded text-slate-800">
                  &quot;{q.queryText}&quot;
                </div>
                {q.applicantResponse && (
                  <div className="bg-emerald-50 border border-emerald-200 p-3 rounded text-emerald-900">
                    <strong className="block text-[11px] uppercase mb-1">Applicant Response ({q.responseDate}):</strong>
                    {q.applicantResponse}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 6: COMPLIANCE
         ========================================================================= */}
      {activeTab === 'COMPLIANCE' && (
        <div className="bg-white border border-slate-300 rounded p-6 shadow-xs space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="text-sm font-bold text-[#0b2545]">
              Post-Approval Statutory Compliance & Periodic Returns
            </h3>
            <p className="text-xs text-slate-500">
              Prescribed statutory obligations following grant of Consent to Establish (CTE)
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded flex items-start space-x-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Environmental Statement (Form V):</strong>
                <p className="text-slate-600 mt-0.5">Annual environmental audit submission mandated by 30th September each financial year.</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded flex items-start space-x-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Water Cess / Flow Meter Telemetry:</strong>
                <p className="text-slate-600 mt-0.5">Continuous digital flow meter data uplink to MPCB Central Server before commercial commissioning.</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded flex items-start space-x-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Consent to Operate (CTO) Application:</strong>
                <p className="text-slate-600 mt-0.5">Mandatory application 60 days prior to commencement of trial production or trial run.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      {isCertModalOpen && (
        <CertificateModal
          isOpen={isCertModalOpen}
          onClose={() => setIsCertModalOpen(false)}
          approvalCode={approval.code}
        />
      )}

    </div>
  );
}

export default function ApplicationDetailPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-xs text-slate-500">Loading application dossier...</div>}>
      <ApplicationDetailContent />
    </Suspense>
  );
}
