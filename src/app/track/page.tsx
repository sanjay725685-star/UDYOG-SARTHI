'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import {
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileCheck,
  Building2,
  ArrowRight,
  ShieldCheck,
  Award,
  Info,
  Calendar,
  Layers,
  Printer
} from 'lucide-react';

export default function TrackApplicationPage() {
  const { approvals, project, business, queries } = useApp();
  const [appIdInput, setAppIdInput] = useState('US-2026-0001');
  const [hasSearched, setHasSearched] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  const activeApproval = approvals.find(a => a.code === 'MPCB-CTE') || approvals[3];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
    }, 400);
  };

  // Complete 7-stage vertical timeline per Section 17 & Section 10 specifications
  const completeTimeline = [
    {
      title: 'Application Submitted',
      date: '02 Mar 2026',
      time: '10:30 AM IST',
      department: 'Single Window Investor Gateway',
      officer: 'Applicant (ABC Manufacturing Pvt Ltd)',
      action: 'Common Application Form (CAF) & mandatory engineering dossier lodged.',
      isCompleted: true
    },
    {
      title: 'Document Verification',
      date: '03 Mar 2026',
      time: '11:15 AM IST',
      department: 'MAITRI Scrutiny Cell',
      officer: 'Shri R. K. Shinde (Scrutiny Officer)',
      action: 'All 10 required architectural drawings and statutory affidavits verified.',
      isCompleted: true
    },
    {
      title: 'AI Pre-Scrutiny',
      date: '03 Mar 2026',
      time: '11:45 AM IST',
      department: 'Udyog Sarthi Regulatory Engine',
      officer: 'Automated Regulatory Sub-system',
      action: 'OCR extraction performed. Engineering parameter validation flagged ETP sizing.',
      isCompleted: true
    },
    {
      title: 'Department Review',
      date: '06 Mar 2026',
      time: '02:00 PM IST',
      department: 'Maharashtra Pollution Control Board',
      officer: 'Er. Sunita Patil (Sub-Regional Officer)',
      action: 'Technical evaluation of effluent load, air stacks, and industrial zonation.',
      isCompleted: true
    },
    {
      title: 'Query Raised',
      date: '10 Mar 2026',
      time: '04:30 PM IST',
      department: 'Maharashtra Pollution Control Board',
      officer: 'Er. Sunita Patil (Sub-Regional Officer)',
      action: 'Clarification query raised regarding hydraulic retention mass balance of ETP.',
      isCompleted: true
    },
    {
      title: 'Applicant Response',
      date: '12 Mar 2026',
      time: '11:00 AM IST',
      department: 'Single Window Gateway',
      officer: 'Rajesh Sharma (Authorized Signatory)',
      action: 'Revised engineering drawings and mass balance calculations uploaded.',
      isCompleted: true
    },
    {
      title: 'Final Decision',
      date: '15 Mar 2026',
      time: '03:30 PM IST',
      department: 'Maharashtra Pollution Control Board',
      officer: 'Competent Statutory Authority',
      action: 'Statutory Consent to Establish (CTE) Sanction Order issued under Section 25.',
      isCompleted: activeApproval.status === 'COMPLETED'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Government Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-[#0b2545]">Home</Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">Track Your Application</span>
      </nav>

      {/* Page Title Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center space-x-2 text-xs font-semibold text-[#005a9c] mb-1">
          <Clock className="w-4 h-4 text-[#005a9c]" />
          <span>Real-Time E-Governance Tracking</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#0b2545] tracking-tight">
          Track Your Application Status
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Enter your Application Reference ID to retrieve real-time departmental processing status, scrutiny remarks, and expected statutory milestones.
        </p>
      </div>

      {/* =========================================================================
          SECTION 17: SEARCH FIELD & ACTION BUTTON
         ========================================================================= */}
      <div className="bg-white border border-slate-300 p-5 rounded shadow-xs">
        <form onSubmit={handleSearch} className="space-y-3">
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
            Enter Application ID <span className="text-rose-600">*</span>
          </label>
          
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <input
                type="text"
                value={appIdInput}
                onChange={e => setAppIdInput(e.target.value)}
                placeholder="e.g. US-2026-0001 or APP-2026-MPCB-0842"
                className="w-full text-sm font-mono p-2.5 border border-slate-300 rounded bg-white focus:outline-none focus:border-[#005a9c]"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isSearching}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#0b2545] hover:bg-[#005a9c] text-white text-xs font-bold rounded uppercase tracking-wider transition shadow-xs flex items-center justify-center space-x-2 shrink-0 disabled:opacity-50"
            >
              <Search className="w-4 h-4" />
              <span>{isSearching ? 'Tracking...' : 'TRACK STATUS'}</span>
            </button>
          </div>

          <div className="text-[11px] text-slate-500 font-medium flex items-center gap-2 pt-1">
            <span>Prototype Demo IDs:</span>
            <button
              type="button"
              onClick={() => setAppIdInput('US-2026-0001')}
              className="font-mono text-[#005a9c] hover:underline"
            >
              US-2026-0001
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setAppIdInput('APP-2026-MPCB-0842')}
              className="font-mono text-[#005a9c] hover:underline"
            >
              APP-2026-MPCB-0842
            </button>
          </div>
        </form>
      </div>

      {/* =========================================================================
          SECTION 17: DISPLAY SUMMARY PARTICULARS
         ========================================================================= */}
      {hasSearched && (
        <div className="space-y-6">
          
          <div className="bg-white border border-slate-300 rounded overflow-hidden shadow-xs">
            <div className="bg-[#f8fafc] px-4 py-3 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#005a9c]" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#0b2545]">
                  Application Status Record
                </h2>
              </div>
              <span className="text-[11px] font-mono text-slate-600 font-bold">
                Ref ID: {appIdInput}
              </span>
            </div>

            <div className="p-5">
              <table className="w-full text-xs text-left">
                <tbody className="divide-y divide-slate-200">
                  <tr className="bg-slate-50">
                    <td className="py-2.5 px-3 text-slate-600 font-semibold w-1/3">Application</td>
                    <td className="py-2.5 px-3 font-bold text-slate-900">
                      {project.name} ({business.name}) • {activeApproval.name}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 text-slate-600 font-semibold">Department</td>
                    <td className="py-2.5 px-3 font-bold text-[#005a9c]">
                      {activeApproval.department} ({activeApproval.departmentCode})
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="py-2.5 px-3 text-slate-600 font-semibold">Current Stage</td>
                    <td className="py-2.5 px-3 font-bold text-amber-700">
                      Technical Scrutiny & Applicant Clarification Review
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 text-slate-600 font-semibold">Submission Date</td>
                    <td className="py-2.5 px-3 font-mono text-slate-800">
                      02 Mar 2026
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="py-2.5 px-3 text-slate-600 font-semibold">Last Updated</td>
                    <td className="py-2.5 px-3 font-mono text-slate-800">
                      12 Mar 2026 (11:00 AM IST)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 text-slate-600 font-semibold">Expected Next Action</td>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">
                      Sub-Regional Officer evaluation of revised ETP mass balance calculations. (Statutory SLA Deadline: 4 Days)
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between">
                <Link
                  href={`/applications/${appIdInput}`}
                  className="text-xs font-bold text-[#005a9c] hover:underline flex items-center gap-1"
                >
                  <span>Open Full Application Dossier</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>

                <Link
                  href="/queries"
                  className="px-3 py-1.5 rounded bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold transition"
                >
                  Respond to Open Clarification
                </Link>
              </div>
            </div>
          </div>

          {/* =========================================================================
              SECTION 17: COMPLETE LIFECYCLE TIMELINE
             ========================================================================= */}
          <div className="bg-white border border-slate-300 p-6 rounded shadow-xs space-y-5">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#0b2545]">
                  Complete Application Processing Timeline
                </h3>
                <p className="text-xs text-slate-500">
                  Chronological progression of departmental scrutiny, inspections, and applicant submissions
                </p>
              </div>
              <button
                onClick={() => window.print()}
                className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition flex items-center gap-1"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Timeline</span>
              </button>
            </div>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {completeTimeline.map((evt, idx) => (
                <div key={idx} className="relative group">
                  <div
                    className={`absolute -left-[27px] top-0.5 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${
                      evt.isCompleted
                        ? 'border-emerald-600 text-emerald-600'
                        : 'border-slate-400 text-slate-400'
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        evt.isCompleted ? 'bg-emerald-600' : 'bg-slate-300'
                      }`}
                    />
                  </div>

                  <div className="bg-slate-50 border border-slate-200 p-3.5 rounded text-xs space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-200 pb-1.5">
                      <span className="font-bold text-slate-900">
                        {idx + 1}. {evt.title}
                      </span>
                      <span className="font-mono text-slate-600 text-[11px]">
                        {evt.date} • {evt.time}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px]">
                      <div>
                        <span className="text-slate-500">Department:</span>{' '}
                        <strong className="text-slate-800">{evt.department}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500">Officer:</span>{' '}
                        <strong className="text-slate-800">{evt.officer}</strong>
                      </div>
                    </div>

                    <p className="text-slate-700 pt-0.5 text-[11px]">
                      <strong>Action:</strong> {evt.action}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
