'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MessageSquare,
  Clock,
  AlertTriangle,
  Send,
  Upload,
  CheckCircle2,
  FileText,
  ShieldCheck,
  HelpCircle,
  FileUp,
  ArrowRight,
  Info
} from 'lucide-react';
import Link from 'next/link';

export default function QueryManagementPage() {
  const { queries, respondToQuery, uploadAndScanDocument } = useApp();
  const [activeQueryId, setActiveQueryId] = useState<string>('QRY-2026-041');
  const [responseText, setResponseText] = useState(
    'We have updated the ETP design report with detailed mass balance retention calculations for peak 42 m³/day flow. The revised CAD drawing sheet MPCB-ETP-ZLD-R2 clearly marks the caustic dosing pump shed and safety eye-wash shower within 10m of the electroplating bay.'
  );
  const [attachedFile, setAttachedFile] = useState('Revised_ETP_ZLD_Calculations_v2.pdf');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const currentQuery = queries.find(q => q.id === activeQueryId) || queries[0];

  const handleSubmitResponse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!responseText.trim()) return;

    setIsSubmitting(true);
    await uploadAndScanDocument('doc-7', attachedFile);
    respondToQuery(currentQuery.id, responseText, attachedFile);

    setIsSubmitting(false);
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Government Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-[#0b2545]">Home</Link>
        <span>/</span>
        <Link href="/dashboard" className="hover:text-[#0b2545]">Applicant Dashboard</Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">Query Management & Clarifications</span>
      </nav>

      {/* Page Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-amber-800 mb-1">
            <MessageSquare className="w-4 h-4 text-amber-700" />
            <span>Official Scrutiny Clarification Portal</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0b2545] tracking-tight">
            Department Queries & Statutory Clarifications
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Respond directly to departmental scrutiny notices with verified replacement drawings and affidavits to avoid resetting SLA clocks.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <Link
            href="/officer"
            className="px-3.5 py-2 rounded bg-[#0b2545] hover:bg-[#005a9c] text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <span>Department Officer Desk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Success Notification Banner */}
      {submitSuccess && (
        <div className="p-3.5 rounded bg-emerald-50 border border-emerald-300 text-emerald-950 flex items-center justify-between shadow-2xs">
          <div className="flex items-center space-x-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <div className="text-xs">
              <strong className="font-bold">Clarification Transmitted Successfully:</strong>
              <span> Response and revised engineering attachment uploaded to MPCB Sub-Regional Office. Status updated to Under Scrutiny.</span>
            </div>
          </div>
          <Link
            href="/officer/review/APP-2026-MPCB-0842"
            className="px-3 py-1 rounded bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shrink-0 transition"
          >
            Review as Officer
          </Link>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Query Selection List */}
        <div className="lg:col-span-1 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Active Scrutiny Notices ({queries.length})
          </div>

          <div className="space-y-2">
            {queries.map(q => {
              const isSelected = q.id === activeQueryId;
              const isResolved = q.status === 'resolved';
              const isResponded = q.status === 'responded';

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setActiveQueryId(q.id);
                    setSubmitSuccess(false);
                  }}
                  className={`w-full text-left p-3.5 rounded border transition shadow-2xs flex flex-col justify-between space-y-2 ${
                    isSelected
                      ? 'border-[#0b2545] bg-blue-50/70 ring-1 ring-[#0b2545]'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-300">
                      {q.id}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        isResolved
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : isResponded
                          ? 'bg-blue-50 text-[#005a9c] border-blue-300'
                          : 'bg-amber-50 text-amber-900 border-amber-300'
                      }`}
                    >
                      {isResolved ? 'RESOLVED' : isResponded ? 'UNDER REVIEW' : `${q.daysLeft} DAYS REMAINING`}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{q.approvalName}</h4>
                    <div className="text-[11px] text-slate-500 mt-0.5">{q.department}</div>
                  </div>

                  <p className="text-xs text-slate-700 line-clamp-2 italic bg-slate-50 p-2 rounded border border-slate-200">
                    &quot;{q.queryText}&quot;
                  </p>

                  <div className="pt-1.5 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono text-slate-500 w-full">
                    <span>Officer: {q.officerName}</span>
                    <span className="font-bold uppercase text-amber-800">{q.priority} Priority</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Response Workbench */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-slate-300 rounded p-6 shadow-xs space-y-5">
            
            {/* Query Header Detail */}
            <div className="border-b border-slate-200 pb-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-[#005a9c] border border-blue-200">
                  {currentQuery.approvalCode} • {currentQuery.applicationId}
                </span>
                <div className="flex items-center space-x-1.5 text-xs font-mono text-slate-600">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  <span className="font-bold text-amber-800">Statutory Deadline: {currentQuery.deadlineDate}</span>
                </div>
              </div>

              <h2 className="text-base font-bold text-[#0b2545]">{currentQuery.approvalName}</h2>
              <div className="text-xs text-slate-600">
                Issued by: <strong>{currentQuery.officerName}</strong> ({currentQuery.department}) on {currentQuery.raisedDate}
              </div>

              {/* The Officer's Question */}
              <div className="p-3.5 rounded bg-amber-50 border border-amber-300 text-amber-950 space-y-1 mt-2">
                <div className="text-[10px] uppercase font-bold text-amber-900 tracking-wider">
                  Statutory Query Notice:
                </div>
                <p className="text-xs text-slate-800 leading-relaxed font-sans">
                  &quot;{currentQuery.queryText}&quot;
                </p>
              </div>
            </div>

            {/* Response Form */}
            <form onSubmit={handleSubmitResponse} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Applicant Clarification & Explanatory Statement <span className="text-rose-600">*</span>
                </label>
                <textarea
                  rows={4}
                  value={responseText}
                  onChange={e => setResponseText(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded focus:outline-none focus:border-[#005a9c] leading-relaxed"
                  required
                />
              </div>

              {/* Attachment */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Mandatory Enclosure Attachment
                </label>
                <div className="flex items-center space-x-2 text-xs">
                  <FileText className="w-4 h-4 text-[#005a9c]" />
                  <span className="font-mono text-slate-800 font-semibold">{attachedFile}</span>
                  <span className="text-slate-500 text-[11px]">(2.4 MB PDF, Digitally Signed)</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  Submitting will transmit this clarification to the concerned departmental desk.
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded bg-[#0b2545] hover:bg-[#005a9c] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Transmitting Response...' : 'Submit Official Clarification'}</span>
                </button>
              </div>
            </form>

          </div>
        </div>

      </div>

    </div>
  );
}
