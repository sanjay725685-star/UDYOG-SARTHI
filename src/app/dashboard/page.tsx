'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
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
  Flame,
  Info,
  Search,
  Eye,
  FileText
} from 'lucide-react';

export default function ApplicantDashboardPage() {
  const { business, project, approvals, queries, notifications } = useApp();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  // Realistic government statuses mapped from approvals
  const mappedApplications = approvals.map(app => {
    let govStatus = 'Submitted';
    if (app.status === 'COMPLETED') govStatus = 'Approved';
    else if (app.status === 'ACTION_REQUIRED') govStatus = 'Clarification Required';
    else if (app.status === 'IN_PROGRESS') govStatus = 'Department Review';
    else if (app.status === 'BLOCKED') govStatus = 'Under Scrutiny';
    else govStatus = 'Pending';

    return {
      ...app,
      govStatus,
      projectName: project.name,
      displayAppId: app.applicationId || `APP-2026-${app.code}`
    };
  });

  const total = mappedApplications.length;
  const pendingCount = mappedApplications.filter(a => a.govStatus === 'Pending').length;
  const underReviewCount = mappedApplications.filter(a => a.govStatus === 'Department Review' || a.govStatus === 'Under Scrutiny').length;
  const approvedCount = mappedApplications.filter(a => a.govStatus === 'Approved').length;
  const clarificationCount = mappedApplications.filter(a => a.govStatus === 'Clarification Required').length;
  const rejectedCount = 0; // Prototype has 0 rejections

  const filteredApps = mappedApplications.filter(app => {
    if (filterStatus !== 'ALL' && app.govStatus !== filterStatus) return false;
    if (search.trim()) {
      return (
        app.displayAppId.toLowerCase().includes(search.toLowerCase()) ||
        app.name.toLowerCase().includes(search.toLowerCase()) ||
        app.department.toLowerCase().includes(search.toLowerCase()) ||
        app.projectName.toLowerCase().includes(search.toLowerCase())
      );
    }
    return true;
  });

  const activeQueries = queries.filter(q => q.status === 'open');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Government Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-[#0b2545]">Home</Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">Applicant Dashboard</span>
      </nav>

      {/* Page Title & Applicant Particulars */}
      <div className="bg-white border border-slate-300 p-5 rounded shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#005a9c] mb-1">
            <Building2 className="w-4 h-4 text-[#005a9c]" />
            <span>Industrial Investor Portal</span>
            <span>•</span>
            <span className="font-mono text-slate-600">GSTIN: {business.gstin}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0b2545] tracking-tight">
            Applicant Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Enterprise: <strong>{business.name}</strong> • Project: <strong>{project.name}</strong> ({project.midcArea}, Pune)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/discovery"
            className="px-3.5 py-2 rounded bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition"
          >
            Know Your Approvals
          </Link>
          <Link
            href="/queries"
            className="px-3.5 py-2 rounded bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Clarifications Desk ({activeQueries.length})</span>
          </Link>
          <Link
            href="/register"
            className="px-3.5 py-2 rounded bg-[#0b2545] hover:bg-[#005a9c] text-white text-xs font-bold transition"
          >
            New Application
          </Link>
        </div>
      </div>

      {/* Urgent Clarification Notice if required */}
      {clarificationCount > 0 && (
        <div className="p-3.5 rounded bg-amber-50 border-l-4 border-amber-600 text-amber-950 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-start space-x-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-900 block uppercase tracking-wider text-[11px]">
                Statutory Notice: Clarification Required (MPCB Consent to Establish)
              </span>
              <span>
                Departmental officer Sunita Patil requested revised mass balance calculations for the Effluent Treatment Plant (ETP). SLA deadline: 4 days.
              </span>
            </div>
          </div>
          <Link
            href="/queries"
            className="px-3 py-1.5 rounded bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shrink-0 transition"
          >
            Respond Now
          </Link>
        </div>
      )}

      {/* =========================================================================
          SECTION 9: 6 KPI CARDS (WITH "DEMO DATA" LABEL)
         ========================================================================= */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Application Status Summary
          </h2>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-300 font-mono">
            Demo Data
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          
          {/* Total Applications */}
          <div className="bg-white p-3.5 border border-slate-300 rounded shadow-2xs">
            <div className="text-[11px] font-semibold text-slate-600 uppercase">Total Applications</div>
            <div className="text-2xl font-bold text-[#0b2545] mt-1">{total}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">8 Clearances</div>
          </div>

          {/* Pending */}
          <div className="bg-white p-3.5 border border-slate-300 rounded shadow-2xs">
            <div className="text-[11px] font-semibold text-slate-600 uppercase">Pending</div>
            <div className="text-2xl font-bold text-slate-700 mt-1">{pendingCount}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Awaiting filing</div>
          </div>

          {/* Under Review */}
          <div className="bg-white p-3.5 border border-slate-300 rounded shadow-2xs">
            <div className="text-[11px] font-semibold text-[#005a9c] uppercase">Under Review</div>
            <div className="text-2xl font-bold text-[#005a9c] mt-1">{underReviewCount}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Dept. Scrutiny</div>
          </div>

          {/* Approved */}
          <div className="bg-white p-3.5 border border-slate-300 rounded shadow-2xs">
            <div className="text-[11px] font-semibold text-emerald-700 uppercase">Approved</div>
            <div className="text-2xl font-bold text-emerald-700 mt-1">{approvedCount}</div>
            <div className="text-[10px] text-emerald-600 mt-0.5">Orders Issued</div>
          </div>

          {/* Clarification Required */}
          <div className="bg-white p-3.5 border border-slate-300 rounded shadow-2xs">
            <div className="text-[11px] font-semibold text-amber-700 uppercase">Clarification Required</div>
            <div className="text-2xl font-bold text-amber-700 mt-1">{clarificationCount}</div>
            <div className="text-[10px] text-amber-600 mt-0.5">Applicant Action</div>
          </div>

          {/* Rejected */}
          <div className="bg-white p-3.5 border border-slate-300 rounded shadow-2xs">
            <div className="text-[11px] font-semibold text-rose-700 uppercase">Rejected</div>
            <div className="text-2xl font-bold text-rose-700 mt-1">{rejectedCount}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">0 Applications</div>
          </div>

        </div>
      </div>

      {/* =========================================================================
          SECTION 9: APPLICATION TABLE (WITH FILTERS & SEARCH)
         ========================================================================= */}
      <div className="bg-white border border-slate-300 rounded overflow-hidden shadow-xs">
        
        {/* Table Header & Controls */}
        <div className="p-4 border-b border-slate-200 bg-[#f8fafc] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-[#0b2545]">
              Industrial Clearance Applications Log
            </h3>
            <p className="text-[11px] text-slate-500">
              Official records of single-window applications submitted under MAITRI / National Single Window mandate
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search Application ID, Approval..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="text-xs pl-8 pr-3 py-1.5 border border-slate-300 rounded bg-white focus:outline-none focus:border-[#005a9c]"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="text-xs px-2.5 py-1.5 border border-slate-300 rounded bg-white focus:outline-none focus:border-[#005a9c]"
            >
              <option value="ALL">All Statuses ({total})</option>
              <option value="Approved">Approved ({approvedCount})</option>
              <option value="Department Review">Department Review ({underReviewCount})</option>
              <option value="Clarification Required">Clarification Required ({clarificationCount})</option>
              <option value="Pending">Pending ({pendingCount})</option>
            </select>
          </div>
        </div>

        {/* Table per Government Specification */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f1f5f9] text-[#0b2545] font-bold uppercase tracking-wider border-b border-slate-300">
              <tr>
                <th className="px-4 py-3 border-r border-slate-200">Application ID</th>
                <th className="px-4 py-3 border-r border-slate-200">Project Name</th>
                <th className="px-4 py-3 border-r border-slate-200">Approval</th>
                <th className="px-4 py-3 border-r border-slate-200">Department</th>
                <th className="px-4 py-3 border-r border-slate-200">Submission Date</th>
                <th className="px-4 py-3 border-r border-slate-200">Current Stage</th>
                <th className="px-4 py-3 border-r border-slate-200">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {filteredApps.map(app => {
                const statusBadgeClass =
                  app.govStatus === 'Approved'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : app.govStatus === 'Clarification Required'
                    ? 'bg-amber-50 text-amber-900 border-amber-300'
                    : app.govStatus === 'Department Review'
                    ? 'bg-blue-50 text-[#005a9c] border-blue-300'
                    : 'bg-slate-50 text-slate-700 border-slate-300';

                return (
                  <tr key={app.id} className="hover:bg-slate-50 transition">
                    
                    {/* Application ID */}
                    <td className="px-4 py-3 border-r border-slate-200 font-mono font-bold text-slate-900">
                      {app.displayAppId}
                    </td>

                    {/* Project Name */}
                    <td className="px-4 py-3 border-r border-slate-200 font-medium text-slate-800">
                      {app.projectName}
                    </td>

                    {/* Approval */}
                    <td className="px-4 py-3 border-r border-slate-200 font-semibold text-slate-900">
                      <div>{app.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{app.code}</div>
                    </td>

                    {/* Department */}
                    <td className="px-4 py-3 border-r border-slate-200 text-slate-700">
                      <div>{app.departmentCode}</div>
                      <div className="text-[10px] text-slate-500 truncate max-w-[140px]">{app.department}</div>
                    </td>

                    {/* Submission Date */}
                    <td className="px-4 py-3 border-r border-slate-200 font-mono text-slate-600">
                      {app.applicationDate || '10 Jan 2026'}
                    </td>

                    {/* Current Stage */}
                    <td className="px-4 py-3 border-r border-slate-200 text-slate-700">
                      {app.stage}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3 border-r border-slate-200">
                      <span className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded border ${statusBadgeClass}`}>
                        {app.govStatus}
                      </span>
                    </td>

                    {/* Action (VIEW DETAILS / TRACK APPLICATION) */}
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center space-x-1.5">
                        <Link
                          href={`/applications/${app.displayAppId}`}
                          className="px-2.5 py-1 rounded bg-[#0b2545] hover:bg-[#005a9c] text-white text-xs font-semibold transition"
                          title="View complete application dossier"
                        >
                          VIEW DETAILS
                        </Link>
                        <Link
                          href={`/journey?appId=${app.displayAppId}`}
                          className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-semibold transition"
                          title="Track lifecycle and department actions"
                        >
                          TRACK APPLICATION
                        </Link>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
