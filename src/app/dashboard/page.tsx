'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import MetricCard from '../../components/MetricCard';
import {
  Briefcase,
  Layers,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Ban,
  GitFork,
  FileCheck,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Building2,
  Calendar,
  Flame
} from 'lucide-react';

export default function EntrepreneurDashboardPage() {
  const { business, project, approvals, queries, notifications } = useApp();

  const total = approvals.length;
  const approved = approvals.filter(a => a.status === 'COMPLETED').length;
  const inProgress = approvals.filter(a => a.status === 'IN_PROGRESS').length;
  const actionReq = approvals.filter(a => a.status === 'ACTION_REQUIRED').length;
  const blocked = approvals.filter(a => a.status === 'BLOCKED').length;

  const activeQueries = queries.filter(q => q.status === 'open');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Welcome & Project Ribbon */}
      <div className="bg-gradient-to-r from-sarthi-950 via-slate-900 to-sarthi-900 text-white rounded-3xl p-6 sm:p-8 border border-sarthi-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-sarthi-800 text-cyan-300 border border-sarthi-600">
              Enterprise Cockpit
            </span>
            <span className="text-xs text-slate-400 font-mono">GSTIN: {business.gstin}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            {business.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 flex flex-wrap items-center gap-2">
            <span className="font-semibold text-amber-300">{project.name}</span>
            <span>•</span>
            <span>{project.midcArea}, Pune</span>
            <span>•</span>
            <span>Capex: ₹{project.proposedInvestmentCr} Cr (250 Workforce)</span>
          </p>
        </div>

        {/* Shortcuts */}
        <div className="flex flex-wrap gap-2 shrink-0">
          <Link
            href="/dependency-graph"
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition"
          >
            <GitFork className="w-3.5 h-3.5 text-sarthi-400" />
            <span>Dependency Graph</span>
          </Link>
          <Link
            href="/queries"
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md transition"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Open Queries ({activeQueries.length})</span>
          </Link>
        </div>
      </div>

      {/* Critical Bottleneck Alert Banner */}
      {actionReq > 0 && (
        <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-900">
                Critical Bottleneck: Action Required on MPCB Consent to Establish
              </div>
              <div className="text-xs text-amber-950 font-medium mt-0.5">
                Officer Sunita Patil raised query regarding ETP rinse neutralizer sizing.
                Resolving this within <strong>4 days</strong> prevents stalling the downstream Factory License.
              </div>
            </div>
          </div>
          <Link
            href="/queries"
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm shrink-0 transition"
          >
            Respond to Query
          </Link>
        </div>
      )}

      {/* 5 Top KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <MetricCard
          title="Total Clearances"
          value={total}
          subtitle="Industrial approvals"
          icon={Layers}
          color="blue"
        />
        <MetricCard
          title="Approved"
          value={approved}
          subtitle="Sanctions granted"
          icon={CheckCircle2}
          color="emerald"
        />
        <MetricCard
          title="In Progress"
          value={inProgress}
          subtitle="Department scrutiny"
          icon={Clock}
          color="blue"
        />
        <MetricCard
          title="Action Required"
          value={actionReq}
          subtitle="Queries to respond"
          icon={AlertTriangle}
          color="amber"
          badge="Urgent"
        />
        <MetricCard
          title="Blocked"
          value={blocked}
          subtitle="Pending prerequisites"
          icon={Ban}
          color="rose"
        />
      </div>

      {/* Main Applications Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Clearance Applications & Real-Time Status Table
            </h3>
            <p className="text-xs text-slate-500">Live multi-agency tracking for ABC Manufacturing Pvt Ltd</p>
          </div>
          <Link
            href="/discovery"
            className="text-xs font-semibold text-sarthi-600 hover:text-sarthi-800 flex items-center gap-1"
          >
            <span>Add / Discover Approvals</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-5 py-3">Application ID & Code</th>
                <th className="px-5 py-3">Approval Title</th>
                <th className="px-5 py-3">Department</th>
                <th className="px-5 py-3">Submission Date</th>
                <th className="px-5 py-3">Current Stage</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {approvals.map(app => (
                <tr key={app.id} className="hover:bg-slate-50/80 transition">
                  <td className="px-5 py-3.5">
                    <div className="font-mono font-bold text-slate-900">
                      {app.applicationId || 'APP-DRAFT-2026'}
                    </div>
                    <div className="text-[10px] font-mono text-sarthi-600">{app.code}</div>
                  </td>

                  <td className="px-5 py-3.5 font-bold text-slate-900">
                    <div className="max-w-xs truncate">{app.name}</div>
                    {app.isCriticalPath && (
                      <span className="text-[9px] font-bold text-rose-600 uppercase flex items-center gap-0.5 mt-0.5">
                        <Flame className="w-2.5 h-2.5" /> Critical Path
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-3.5 font-medium text-slate-600">
                    {app.departmentCode}
                  </td>

                  <td className="px-5 py-3.5 font-mono text-slate-500">
                    {app.applicationDate || 'Awaiting Filing'}
                  </td>

                  <td className="px-5 py-3.5 text-slate-700 max-w-xs truncate">
                    {app.stage}
                  </td>

                  <td className="px-5 py-3.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        app.status === 'COMPLETED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : app.status === 'ACTION_REQUIRED'
                          ? 'bg-amber-100 text-amber-900'
                          : app.status === 'BLOCKED'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {app.status.replace('_', ' ')}
                    </span>
                  </td>

                  <td className="px-5 py-3.5 text-right space-x-2">
                    {app.status === 'ACTION_REQUIRED' ? (
                      <Link
                        href="/queries"
                        className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-2xs transition"
                      >
                        Reply
                      </Link>
                    ) : app.certificateIssued ? (
                      <Link
                        href={`/applications/${app.applicationId || 'APP-2026-MPCB-0842'}?certificate=true`}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs transition"
                      >
                        Certificate
                      </Link>
                    ) : (
                      <Link
                        href={`/applications/${app.applicationId || 'APP-2026-MPCB-0842'}`}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition"
                      >
                        Track
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
