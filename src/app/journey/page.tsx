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
  Sparkles,
  Building2,
  FileUp,
  Ban
} from 'lucide-react';

export default function JourneyPage() {
  const { project, business, approvals, queries } = useApp();

  const openQueries = queries.filter(q => q.status === 'open');

  const STAGES = [
    {
      id: 1,
      name: 'Business Details',
      subtitle: 'Entity Registration & Tax Profiles',
      status: 'COMPLETED',
      completedDate: 'Completed on 10 Jan 2026',
      description: 'ABC Manufacturing Pvt Ltd registered with verified GSTIN (27AABCA1234F1Z5) and PAN.',
      actionText: 'View Entity Profile',
      actionHref: '/register?step=1',
      icon: Building2
    },
    {
      id: 2,
      name: 'Required Approvals Discovery',
      subtitle: 'AI Regulatory Inference',
      status: 'COMPLETED',
      completedDate: 'Completed on 12 Jan 2026',
      description: '8 statutory industrial clearances identified including MPCB Orange CTE, DISH Factory License, and HT Power.',
      actionText: 'Inspect Approvals',
      actionHref: '/discovery',
      icon: Sparkles
    },
    {
      id: 3,
      name: 'Document Pre-Audit',
      subtitle: 'Neural OCR & Mismatch Checks',
      status: 'COMPLETED',
      completedDate: 'Completed on 15 Feb 2026',
      description: '10 mandatory engineering blueprints & certificates pre-audited with 96.5% average confidence.',
      actionText: 'Open Pre-Audit Desk',
      actionHref: '/pre-audit',
      icon: FileCheck
    },
    {
      id: 4,
      name: 'Dependency Check',
      subtitle: 'Directed Acyclic Graph (DAG) Analysis',
      status: 'COMPLETED',
      completedDate: 'Completed on 18 Feb 2026',
      description: 'Topological critical path calculated. Parallel track identified between Fire NOC and High Tension Power.',
      actionText: 'View Dependency Graph',
      actionHref: '/dependency-graph',
      icon: GitFork
    },
    {
      id: 5,
      name: 'Submit Consolidated Dossier',
      subtitle: 'Single Window Common Application Form',
      status: 'COMPLETED',
      completedDate: 'Submitted on 02 Mar 2026',
      description: 'Unified application APP-2026-MPCB-0842 dispatched to MPCB, MIDC Town Planning, and Fire Wing.',
      actionText: 'View Application Receipt',
      actionHref: '/applications/APP-2026-MPCB-0842',
      icon: FileUp
    },
    {
      id: 6,
      name: 'Government Department Review',
      subtitle: 'Multi-Department Technical Scrutiny',
      status: 'IN_PROGRESS',
      completedDate: 'Active Scrutiny',
      description: 'Assigned to Er. Sunita Patil (MPCB SRO Pune) and Ar. Vikram Deshmukh (MIDC). Fire NOC completed.',
      actionText: 'Open Officer View',
      actionHref: '/officer',
      icon: Clock
    },
    {
      id: 7,
      name: 'Query & Clarification Cycle',
      subtitle: 'Interactive Department Exchange',
      status: openQueries.length > 0 ? 'ACTION_REQUIRED' : 'COMPLETED',
      completedDate: openQueries.length > 0 ? 'Action Required (4 Days Left)' : 'All Queries Resolved',
      description: openQueries.length > 0
        ? 'Er. Sunita Patil raised a query on nickel rinse neutralizer tank calculations. Response required to unblock CTE.'
        : 'All technical clarifications satisfied with revised ETP documentation.',
      actionText: 'Resolve Active Query',
      actionHref: '/queries',
      icon: MessageSquare
    },
    {
      id: 8,
      name: 'Statutory Sanction Decision',
      subtitle: 'Formal Order by Competent Authority',
      status: approvals.find(a => a.code === 'MPCB-CTE')?.status === 'COMPLETED' ? 'COMPLETED' : 'PENDING',
      completedDate: approvals.find(a => a.code === 'MPCB-CTE')?.status === 'COMPLETED' ? 'Sanctioned' : 'Pending Officer Sanction',
      description: 'Formal digital order under Water Act 1974 & Air Act 1981 pending completion of query verification.',
      actionText: 'Review Decision Desk',
      actionHref: '/officer/review/APP-2026-MPCB-0842',
      icon: ShieldCheck
    },
    {
      id: 9,
      name: 'Digital Sanction Certificate',
      subtitle: 'QR-Verified Official Order',
      status: approvals.find(a => a.code === 'MPCB-CTE')?.certificateIssued ? 'COMPLETED' : 'PENDING',
      completedDate: approvals.find(a => a.code === 'MPCB-CTE')?.certificateIssued ? 'Certificate Ready' : 'Awaiting Final Grant',
      description: 'Tamper-evident digital clearance certificate with cryptographic DSC hash and statutory validity.',
      actionText: 'Download Certificate',
      actionHref: '/applications/APP-2026-MPCB-0842?certificate=true',
      icon: Award
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-sarthi-600 mb-1">
            <Sparkles className="w-4 h-4 text-sarthi-600" />
            <span>Workflow Orchestration Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            The Approval Journey — 9 Regulatory Milestones
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Real-time end-to-end orchestration tracking your enterprise from initial registration to operational licensing.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <Link
            href="/bottlenecks"
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition"
          >
            <span>Critical Path Intel</span>
          </Link>
          <Link
            href="/queries"
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md transition"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Active Queries ({openQueries.length})</span>
          </Link>
        </div>
      </div>

      {/* Auto-Suggested Next Action Banner */}
      <div className="p-5 rounded-2xl bg-amber-500/10 border-2 border-amber-400 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-900">
              AI Orchestrator Recommended Immediate Action
            </div>
            <div className="text-xs text-amber-950 font-medium mt-0.5">
              Respond to MPCB Query QRY-2026-041 with revised ETP neutralizer CAD diagram within <strong>4 calendar days</strong>.
              Resolving this will immediately unblock Stage 8 and the downstream DISH Factory License.
            </div>
          </div>
        </div>
        <Link
          href="/queries"
          className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm shrink-0 transition"
        >
          Resolve Now
        </Link>
      </div>

      {/* 9-Stage Visual Timeline Stepper */}
      <div className="space-y-4 relative">
        
        {/* Connecting Vertical Track Line */}
        <div className="absolute top-8 bottom-8 left-6 sm:left-8 w-0.5 bg-slate-200 -z-0" />

        {STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          const isDone = stage.status === 'COMPLETED';
          const isCurrent = stage.status === 'IN_PROGRESS';
          const isAction = stage.status === 'ACTION_REQUIRED';
          const isPending = stage.status === 'PENDING';

          return (
            <div
              key={stage.id}
              className={`relative z-10 bg-white rounded-2xl border p-5 sm:p-6 transition shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                isAction
                  ? 'border-amber-400 ring-2 ring-amber-200 shadow-md'
                  : isCurrent
                  ? 'border-blue-400 ring-2 ring-blue-100 shadow-sm'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex items-start space-x-4">
                {/* Stage Badge Node */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold shrink-0 transition shadow-xs ${
                    isDone
                      ? 'bg-emerald-600 text-white'
                      : isAction
                      ? 'bg-amber-500 text-white animate-pulse'
                      : isCurrent
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-400 border border-slate-300'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      Stage {stage.id} of 9
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isDone
                          ? 'bg-emerald-100 text-emerald-800'
                          : isAction
                          ? 'bg-amber-100 text-amber-900'
                          : isCurrent
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {stage.status.replace('_', ' ')}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {stage.completedDate}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">{stage.name}</h3>
                  <div className="text-xs font-medium text-sarthi-700">{stage.subtitle}</div>
                  <p className="text-xs text-slate-600 max-w-2xl leading-relaxed pt-1">
                    {stage.description}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="shrink-0 self-end md:self-center pl-16 md:pl-0">
                <Link
                  href={stage.actionHref}
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs ${
                    isAction
                      ? 'bg-amber-600 hover:bg-amber-700 text-white'
                      : isDone
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
                      : isCurrent
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-slate-50 text-slate-400 border border-slate-200'
                  }`}
                >
                  <span>{stage.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
