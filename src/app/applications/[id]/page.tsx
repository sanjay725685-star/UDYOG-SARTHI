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
  Building2
} from 'lucide-react';

function ApplicationDetailContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { approvals, documents, queries, auditLogs, project, business } = useApp();

  const appId = (params?.id as string) || 'APP-2026-MPCB-0842';
  const showCertOnLoad = searchParams.get('certificate') === 'true';

  // Find linked approval
  const approval = approvals.find(a => a.applicationId === appId || a.code === 'MPCB-CTE') || approvals[3];
  const linkedDocs = documents.filter(d => d.requiredFor.includes(approval.code));
  const linkedQueries = queries.filter(q => q.approvalCode === approval.code || q.applicationId === appId);

  const [isCertModalOpen, setIsCertModalOpen] = useState(showCertOnLoad);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  // 5-Stage Stepper for Application Detail
  const stages = [
    { name: 'Submitted', done: true, date: approval.applicationDate || '02 Mar 2026' },
    { name: 'AI Pre-Audit', done: true, date: '03 Mar 2026' },
    { name: 'Officer Review', done: true, date: '06 Mar 2026' },
    {
      name: 'Department Query',
      done: approval.status === 'COMPLETED' || linkedQueries.every(q => q.status === 'resolved'),
      active: approval.status === 'ACTION_REQUIRED',
      date: '15 Mar 2026'
    },
    {
      name: 'Sanction / Order',
      done: approval.status === 'COMPLETED',
      date: approval.approvalDate || 'Pending'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-sarthi-700 mb-1">
            <span>Application Dossier</span>
            <span>•</span>
            <span className="font-bold">{appId}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {approval.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {approval.department} • Ref: <span className="font-mono text-slate-800">{approval.code}</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {approval.certificateIssued && (
            <button
              onClick={() => setIsCertModalOpen(true)}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md transition"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>View Sanction Certificate</span>
            </button>
          )}

          {approval.status === 'ACTION_REQUIRED' && (
            <Link
              href="/queries"
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Respond to Open Query</span>
            </Link>
          )}

          <button
            onClick={() => window.print()}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print Dossier</span>
          </button>
        </div>
      </div>

      {/* 5-Stage Visual Stepper */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-6">
          Lifecycle Tracking Stepper
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 relative">
          {stages.map((stg, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition shadow-2xs ${
                  stg.done
                    ? 'bg-emerald-600 text-white'
                    : stg.active
                    ? 'bg-amber-500 text-white animate-pulse ring-4 ring-amber-100'
                    : 'bg-slate-100 text-slate-400 border border-slate-200'
                }`}
              >
                {stg.done ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">{stg.name}</div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">{stg.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: Details + Submitted Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Details, Officer Remarks & Queries */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Metadata Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
              Application Metadata & Regulatory Particulars
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block text-[11px]">Industrial Enterprise:</span>
                <span className="font-bold text-slate-900">{business.name}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Authorized Signatory:</span>
                <span className="font-semibold text-slate-900">{business.applicantName}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Statutory SLA Deadline:</span>
                <span className="font-semibold text-slate-900">{approval.timelineDays} Calendar Days</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Assigned Officer:</span>
                <span className="font-semibold text-slate-900">{approval.officerName || 'Queue Allocation'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Prescribed Statutory Fee:</span>
                <span className="font-bold text-emerald-700">₹{approval.fee.toLocaleString('en-IN')} (Paid)</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Current Scrutiny Stage:</span>
                <span className="font-bold text-amber-700">{approval.stage}</span>
              </div>
            </div>

            {approval.whyBlockedReason && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 mt-2">
                <div className="font-bold text-amber-800 flex items-center gap-1.5 mb-1">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Officer Remark / Open Requirement:</span>
                </div>
                {approval.whyBlockedReason}
              </div>
            )}
          </div>

          {/* Department Queries Desk on this App */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-sarthi-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Department Query History ({linkedQueries.length})
                </h3>
              </div>
              <Link href="/queries" className="text-xs font-bold text-sarthi-600 hover:underline">
                Open Query Desk
              </Link>
            </div>

            {linkedQueries.length === 0 ? (
              <div className="text-xs text-slate-500 py-4 text-center">No queries raised on this application.</div>
            ) : (
              <div className="space-y-3">
                {linkedQueries.map(q => (
                  <div
                    key={q.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-slate-900">{q.officerName}</div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          q.status === 'resolved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : q.status === 'responded'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-900'
                        }`}
                      >
                        {q.status.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
                      &quot;{q.queryText}&quot;
                    </p>

                    {q.applicantResponse && (
                      <div className="bg-sarthi-50 p-3 rounded-lg border border-sarthi-200 space-y-1">
                        <div className="text-[10px] font-bold text-sarthi-800 uppercase">
                          Applicant Response ({q.responseDate}):
                        </div>
                        <p className="text-slate-800">{q.applicantResponse}</p>
                        {q.attachedDocName && (
                          <div className="text-[11px] font-mono text-sarthi-700 font-medium">
                            Attachment: {q.attachedDocName}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Immutable Audit Trail Logs */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <History className="w-5 h-5 text-slate-700" />
              <h3 className="text-sm font-bold text-slate-900">
                Immutable Status History & Officer Audit Log
              </h3>
            </div>

            <div className="space-y-3">
              {auditLogs.map(log => (
                <div key={log.id} className="text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span className="font-bold text-slate-700">{log.officer}</span>
                    <span>{log.date}</span>
                  </div>
                  <div className="font-bold text-slate-900">{log.stage} ({log.status})</div>
                  <p className="text-slate-600 leading-relaxed">{log.remarks}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 1 Col: Linked Documents Dossier */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">
                Mandatory Dossier Files
              </h3>
              <span className="text-xs text-slate-500 font-mono">{linkedDocs.length} Documents</span>
            </div>

            <div className="space-y-2.5">
              {linkedDocs.map(doc => (
                <div
                  key={doc.id}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 transition space-y-2 text-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-bold text-slate-900 leading-tight">{doc.name}</div>
                    {doc.status === 'verified' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                    )}
                  </div>

                  <div className="text-[11px] font-mono text-slate-500 truncate">
                    {doc.fileName || 'Pending upload'}
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-200 text-[10px]">
                    <span className="text-slate-500 font-mono">OCR: {doc.confidence}%</span>
                    <button
                      onClick={() => setIsScannerOpen(true)}
                      className="font-bold text-sarthi-700 hover:underline"
                    >
                      Inspect AI
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/pre-audit"
                className="w-full py-2.5 px-3 rounded-xl bg-sarthi-50 hover:bg-sarthi-100 text-sarthi-700 font-bold text-xs flex items-center justify-center gap-1.5 border border-sarthi-200 transition"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Pre-Audit Another File</span>
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* Modals */}
      <CertificateModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        approvalCode={approval.code}
      />

      <DocumentScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        initialDocId="doc-7"
      />

    </div>
  );
}

export default function ApplicationDetailPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-500 font-mono">Loading Application Dossier...</div>}>
      <ApplicationDetailContent />
    </Suspense>
  );
}
