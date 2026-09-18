'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  Award,
  ArrowRight,
  ShieldCheck,
  FileCheck,
  GitFork,
  MessageSquare,
  Building2,
  FileUp,
  Ban,
  Info
} from 'lucide-react';

export default function JourneyPage() {
  const { project, business, approvals, queries } = useApp();

  const openQueries = queries.filter(q => q.status === 'open');

  const STAGES = [
    {
      id: 1,
      name: 'Business Entity Registration',
      subtitle: 'Entity Particulars & Tax Identifiers',
      status: 'COMPLETED',
      completedDate: 'Completed on 10 Jan 2026',
      description: 'ABC Manufacturing Pvt Ltd verified with Corporate PAN (AABCA1234F) and State GSTIN (27AABCA1234F1Z5).',
      actionText: 'View Entity Profile',
      actionHref: '/register?step=1',
      icon: Building2
    },
    {
      id: 2,
      name: 'Required Clearances Identification',
      subtitle: 'Statutory Regulatory Schedule Mapping',
      status: 'COMPLETED',
      completedDate: 'Completed on 12 Jan 2026',
      description: '8 statutory industrial clearances identified including MPCB Consent to Establish, DISH Factory License, and HT Power.',
      actionText: 'Inspect Clearances',
      actionHref: '/discovery',
      icon: FileCheck
    },
    {
      id: 3,
      name: 'Document Pre-Scrutiny Verification',
      subtitle: 'Automated OCR & Parameter Validation',
      status: 'COMPLETED',
      completedDate: 'Completed on 15 Feb 2026',
      description: '10 mandatory engineering blueprints & affidavits pre-audited with 100% format integrity.',
      actionText: 'Open Pre-Scrutiny Desk',
      actionHref: '/pre-audit',
      icon: ShieldCheck
    },
    {
      id: 4,
      name: 'Approval Dependency Mapping',
      subtitle: 'Directed Acyclic Graph (DAG) Sequencing',
      status: 'COMPLETED',
      completedDate: 'Completed on 18 Feb 2026',
      description: 'Critical path sequenced. Parallel scrutiny track initiated between Fire NOC and High Tension Power.',
      actionText: 'View Dependency Graph',
      actionHref: '/dependency-graph',
      icon: GitFork
    },
    {
      id: 5,
      name: 'Consolidated Dossier Submission',
      subtitle: 'Common Application Form (CAF) Lodged',
      status: 'COMPLETED',
      completedDate: 'Submitted on 02 Mar 2026',
      description: 'Unified application US-2026-0001 dispatched to MPCB, MIDC Town Planning, and Fire Services.',
      actionText: 'View Application Receipt',
      actionHref: '/applications/US-2026-0001',
      icon: FileUp
    },
    {
      id: 6,
      name: 'Department Technical Scrutiny',
      subtitle: 'Multi-Department Technical Evaluation',
      status: 'IN_PROGRESS',
      completedDate: 'Active Scrutiny',
      description: 'Assigned to Er. Sunita Patil (MPCB SRO Pune) and Ar. Vikram Deshmukh (MIDC). Fire NOC completed.',
      actionText: 'Open Department Review',
      actionHref: '/officer',
      icon: Clock
    },
    {
      id: 7,
      name: 'Query & Clarification Cycle',
      subtitle: 'Official Statutory Notice Exchange',
      status: openQueries.length > 0 ? 'ACTION_REQUIRED' : 'COMPLETED',
      completedDate: openQueries.length > 0 ? 'Action Required (4 Days Left)' : 'All Queries Resolved',
      description: openQueries.length > 0
        ? 'MPCB raised query regarding hydraulic retention mass balance calculations. Response uploaded and under review.'
        : 'All technical clarifications satisfied with revised ETP documentation.',
      actionText: 'Open Clarification Desk',
      actionHref: '/queries',
      icon: MessageSquare
    },
    {
      id: 8,
      name: 'Statutory Sanction Decision',
      subtitle: 'Formal Order by Competent Authority',
      status: approvals.find(a => a.code === 'MPCB-CTE')?.status === 'COMPLETED' ? 'COMPLETED' : 'PENDING',
      completedDate: approvals.find(a => a.code === 'MPCB-CTE')?.status === 'COMPLETED' ? 'Sanctioned' : 'Pending Officer Sanction',
      description: 'Formal digital order under Water Act 1974 & Air Act 1981 pending completion of final scrutiny.',
      actionText: 'Review Decision Desk',
      actionHref: '/officer/review/APP-2026-MPCB-0842',
      icon: ShieldCheck
    },
    {
      id: 9,
      name: 'Digital Sanction Certificate',
      subtitle: 'Tamper-Evident Official Clearance',
      status: approvals.find(a => a.code === 'MPCB-CTE')?.certificateIssued ? 'COMPLETED' : 'PENDING',
      completedDate: approvals.find(a => a.code === 'MPCB-CTE')?.certificateIssued ? 'Certificate Ready' : 'Awaiting Final Grant',
      description: 'Digital clearance certificate with cryptographic hash and statutory validity under state single window act.',
      actionText: 'Download Certificate',
      actionHref: '/applications/APP-2026-MPCB-0842?certificate=true',
      icon: Award
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Government Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-[#0b2545]">Home</Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">The Approval Journey</span>
      </nav>

      {/* Page Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#005a9c] mb-1">
            <ShieldCheck className="w-4 h-4 text-[#005a9c]" />
            <span>Single Window Lifecycle Orchestration</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0b2545] tracking-tight">
            The Approval Journey — 9 Regulatory Milestones
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            End-to-end statutory orchestration tracking ABC Manufacturing Pvt Ltd from initial profile registration to operational licensing.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <Link
            href="/track"
            className="px-3.5 py-2 rounded bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition"
          >
            Track Application ID
          </Link>
          <Link
            href="/queries"
            className="flex items-center space-x-2 px-3.5 py-2 rounded bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold transition"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Active Clarifications ({openQueries.length})</span>
          </Link>
        </div>
      </div>

      {/* Action Notice */}
      <div className="p-3.5 bg-amber-50 border-l-4 border-amber-600 text-amber-950 rounded text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-start space-x-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-900 block uppercase tracking-wider text-[11px]">
              Priority Department Action
            </span>
            <span>
              Clarification response regarding MPCB Effluent Treatment Plant sizing is under technical evaluation. Resolving this completes Stage 8 and unblocks Factory Licencing scrutiny.
            </span>
          </div>
        </div>
        <Link
          href="/queries"
          className="px-3 py-1.5 rounded bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shrink-0 transition"
        >
          View Clarification Desk
        </Link>
      </div>

      {/* 9 Regulatory Milestones List */}
      <div className="space-y-3">
        {STAGES.map(stg => {
          const isDone = stg.status === 'COMPLETED';
          const isActionReq = stg.status === 'ACTION_REQUIRED';
          const isInProg = stg.status === 'IN_PROGRESS';
          const StageIcon = stg.icon;

          return (
            <div
              key={stg.id}
              className={`p-4 rounded border transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                isDone
                  ? 'bg-white border-slate-200 shadow-2xs'
                  : isActionReq
                  ? 'bg-amber-50/50 border-amber-300 shadow-xs'
                  : isInProg
                  ? 'bg-blue-50/40 border-blue-300 shadow-xs'
                  : 'bg-slate-50 border-slate-200 opacity-80'
              }`}
            >
              <div className="flex items-start space-x-3.5">
                <div
                  className={`w-9 h-9 rounded flex items-center justify-center font-bold text-xs shrink-0 ${
                    isDone
                      ? 'bg-emerald-700 text-white'
                      : isActionReq
                      ? 'bg-amber-600 text-white'
                      : isInProg
                      ? 'bg-[#005a9c] text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-5 h-5" /> : stg.id}
                </div>

                <div className="space-y-0.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm">
                      {stg.id}. {stg.name}
                    </h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        isDone
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : isActionReq
                          ? 'bg-amber-50 text-amber-900 border-amber-300'
                          : isInProg
                          ? 'bg-blue-50 text-[#005a9c] border-blue-300'
                          : 'bg-slate-100 text-slate-600 border-slate-300'
                      }`}
                    >
                      {stg.completedDate}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {stg.description}
                  </p>
                </div>
              </div>

              <div className="shrink-0 self-start sm:self-center">
                <Link
                  href={stg.actionHref}
                  className="inline-flex items-center space-x-1 px-3 py-1.5 rounded bg-[#0b2545] hover:bg-[#005a9c] text-white text-xs font-semibold transition"
                >
                  <span>{stg.actionText}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
