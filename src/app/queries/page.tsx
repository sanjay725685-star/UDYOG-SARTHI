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
  Sparkles,
  HelpCircle,
  FileUp,
  ArrowRight
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
    // Trigger simulated pre-audit on response attachment
    await uploadAndScanDocument('doc-7', attachedFile);
    respondToQuery(currentQuery.id, responseText, attachedFile);

    setIsSubmitting(false);
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-amber-700 mb-1">
            <MessageSquare className="w-4 h-4 text-amber-600" />
            <span>Interactive Department Query Resolution Desk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Query Management & Statutory Clarifications
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Resolve officer queries directly with pre-audited replacement documents to avoid resetting statutory review clocks.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <Link
            href="/officer"
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold shadow-xs transition"
          >
            <span>Switch to Officer Persona</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Success Notification Banner */}
      {submitSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950 flex items-center justify-between shadow-xs animate-in fade-in duration-200">
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div className="text-xs">
              <strong className="font-bold">Response successfully transmitted to Er. Sunita Patil (MPCB)!</strong>
              <div className="text-emerald-800">
                AI Pre-Audit validated the attached ETP design with 97% confidence. Application state shifted to In-Review.
              </div>
            </div>
          </div>
          <Link
            href="/officer/review/APP-2026-MPCB-0842"
            className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white text-xs font-bold shrink-0 hover:bg-emerald-800"
          >
            Review as Officer
          </Link>
        </div>
      )}

      {/* Main Grid: Query List on Left, Active Query Resolution on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Query Selection List */}
        <div className="lg:col-span-1 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Active Department Queries ({queries.length})
          </div>

          <div className="space-y-3">
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
                  className={`w-full text-left p-4 rounded-2xl border transition shadow-xs flex flex-col justify-between space-y-2 ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50/70 ring-2 ring-amber-200'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {q.id}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isResolved
                          ? 'bg-emerald-100 text-emerald-800'
                          : isResponded
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {isResolved ? 'RESOLVED' : isResponded ? 'UNDER REVIEW' : `${q.daysLeft} DAYS LEFT`}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{q.approvalName}</h4>
                    <div className="text-[11px] text-slate-500 mt-0.5">{q.department}</div>
                  </div>

                  <p className="text-xs text-slate-700 line-clamp-2 italic bg-white/70 p-2 rounded-lg border border-slate-200/60">
                    &quot;{q.queryText}&quot;
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-500 w-full">
                    <span>Officer: {q.officerName}</span>
                    <span className="font-bold uppercase text-amber-700">{q.priority} Priority</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 2 Cols: Interactive Response Workbench */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            
            {/* Query Header Detail */}
            <div className="border-b border-slate-100 pb-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-amber-100 text-amber-900 border border-amber-300">
                  {currentQuery.approvalCode} • {currentQuery.applicationId}
                </span>
                <div className="flex items-center space-x-2 text-xs font-mono text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span className="font-bold text-amber-700">Deadline: {currentQuery.deadlineDate}</span>
                </div>
              </div>

              <h2 className="text-lg font-bold text-slate-900">{currentQuery.approvalName}</h2>
              <div className="text-xs text-slate-600">
                Raised by: <strong className="text-slate-800">{currentQuery.officerName}</strong> ({currentQuery.department}) on {currentQuery.raisedDate}
              </div>

              {/* The Officer's Question */}
              <div className="p-4 rounded-xl bg-slate-900 text-white space-y-1.5 mt-3 shadow-inner">
                <div className="text-[10px] uppercase font-mono font-bold text-amber-400">
                  Statutory Query Notice:
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-serif">
                  &quot;{currentQuery.queryText}&quot;
                </p>
              </div>
            </div>

            {/* Response Form */}
            <form onSubmit={handleSubmitResponse} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Applicant Clarification & Technical Explanation
                </label>
                <textarea
                  rows={4}
                  value={responseText}
                  onChange={e => setResponseText(e.target.value)}
                  placeholder="Explain how the technical requirement or formula discrepancy was resolved..."
                  className="w-full text-xs p-3.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sarthi-500 leading-relaxed"
                  required
                />
              </div>

              {/* File Attachment with AI Pre-Audit Scanner */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <FileUp className="w-4 h-4 text-sarthi-600" />
                    Revised Supporting Drawing / Report
                  </span>
                  <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    AI Pre-Audit Ready
                  </span>
                </div>

                <div className="flex items-center space-x-3 bg-white p-3 rounded-lg border border-slate-200">
                  <FileText className="w-6 h-6 text-sarthi-600 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate">{attachedFile}</div>
                    <div className="text-[10px] text-slate-500">PDF Document • 3.4 MB • Auto-Audited</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAttachedFile('Revised_ETP_ZLD_Calculations_v2_Final.pdf')}
                    className="text-xs font-semibold text-sarthi-700 hover:underline"
                  >
                    Replace
                  </button>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="text-[11px] text-slate-500 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Responses are cryptographically logged into the state audit trail.</span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || currentQuery.status === 'resolved'}
                    className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-sarthi-600 hover:from-amber-500 hover:to-sarthi-500 text-white font-bold text-xs shadow-md transition disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Sparkles className="w-4 h-4 animate-spin text-white" />
                        <span>Pre-Auditing & Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Response to Department Officer</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>

      </div>

    </div>
  );
}
