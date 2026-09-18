'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import {
  Shield,
  Layers,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Filter,
  Search,
  ArrowRight,
  Eye,
  MessageSquare,
  Sparkles,
  ChevronRight,
  FileText,
  UserCheck,
  Building2,
  Calendar,
  X,
  Send,
  Ban
} from 'lucide-react';

export default function DepartmentalDashboardPage() {
  const { approvals, queries, approveApplication, raiseOfficerQuery, project, business } = useApp();
  
  // Filter States per Section 13
  const [filterDept, setFilterDept] = useState<string>('all');
  const [filterDistrict, setFilterDistrict] = useState<string>('all');
  const [filterApprovalType, setFilterApprovalType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterDateRange, setFilterDateRange] = useState<string>('Current FY 2025-26');
  const [search, setSearch] = useState<string>('');

  // Officer quick query modal state
  const [queryModalApp, setQueryModalApp] = useState<string | null>(null);
  const [customQueryText, setCustomQueryText] = useState('');

  // Map approvals into departmental review applications
  const queueData = approvals.map(app => ({
    id: app.applicationId || `APP-2026-${app.code}`,
    code: app.code,
    industry: business.name,
    district: 'Pune (Chakan MIDC)',
    approval: app.name,
    approvalType: app.code,
    department: app.department,
    departmentCode: app.departmentCode,
    assignedDate: app.applicationDate || '02 Mar 2026',
    slaDays: app.timelineDays,
    status:
      app.status === 'COMPLETED'
        ? 'Approved'
        : app.status === 'ACTION_REQUIRED'
        ? 'Query Raised'
        : app.status === 'IN_PROGRESS'
        ? 'Pending Review'
        : 'Under Scrutiny'
  }));

  const filteredQueue = queueData.filter(item => {
    if (filterDept !== 'all' && item.departmentCode !== filterDept) return false;
    if (filterApprovalType !== 'all' && item.approvalType !== filterApprovalType) return false;
    if (filterStatus !== 'all' && item.status !== filterStatus) return false;
    if (search.trim()) {
      return (
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.industry.toLowerCase().includes(search.toLowerCase()) ||
        item.approval.toLowerCase().includes(search.toLowerCase()) ||
        item.department.toLowerCase().includes(search.toLowerCase())
      );
    }
    return true;
  });

  // Departmental Metrics per Section 13
  const applicationsReceived = 142;
  const pendingReview = 18;
  const queriesRaised = queries.filter(q => q.status === 'open').length + 3;
  const approvedCount = 116;
  const rejectedCount = 5;
  const averageProcessingTime = '21.4 Days';

  const handleQuickApprove = (code: string) => {
    approveApplication(code, 'Er. Sunita Patil (MPCB SRO Pune)', 'Technical scrutiny satisfied under state industrial single-window mandate.');
  };

  const handleQuickQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryModalApp || !customQueryText.trim()) return;
    raiseOfficerQuery(queryModalApp, customQueryText);
    setQueryModalApp(null);
    setCustomQueryText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Government Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-[#0b2545]">Home</Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">Departmental Dashboard</span>
      </nav>

      {/* Official Department Officer Header */}
      <div className="bg-white border border-slate-300 p-5 rounded shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#005a9c] mb-1">
            <Shield className="w-4 h-4 text-[#005a9c]" />
            <span>Nodal Regulatory Authority</span>
            <span>•</span>
            <span className="text-slate-600">Sub-Regional Office, Pune & Pimpri-Chinchwad</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0b2545] tracking-tight">
            Departmental Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Officer: <strong>Er. Sunita Patil</strong> (Sub-Regional Officer, Maharashtra Pollution Control Board) • Jurisdiction: Chakan & Talegaon Industrial Clusters
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/officer/review/APP-2026-MPCB-0842"
            className="px-3.5 py-2 rounded bg-[#0b2545] hover:bg-[#005a9c] text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Launch Scrutiny Review Desk</span>
          </Link>
        </div>
      </div>

      {/* =========================================================================
          SECTION 13: 6 METRIC CARDS
         ========================================================================= */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Desk Performance & Scrutiny Telemetry
          </h2>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-300 font-mono">
            Demo Data
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          
          <div className="bg-white p-3.5 border border-slate-300 rounded shadow-2xs">
            <div className="text-[11px] font-semibold text-slate-600 uppercase">Applications Received</div>
            <div className="text-2xl font-bold text-[#0b2545] mt-1">{applicationsReceived}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Assigned to desk</div>
          </div>

          <div className="bg-white p-3.5 border border-slate-300 rounded shadow-2xs">
            <div className="text-[11px] font-semibold text-[#005a9c] uppercase">Pending Review</div>
            <div className="text-2xl font-bold text-[#005a9c] mt-1">{pendingReview}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Active queue</div>
          </div>

          <div className="bg-white p-3.5 border border-slate-300 rounded shadow-2xs">
            <div className="text-[11px] font-semibold text-amber-700 uppercase">Queries Raised</div>
            <div className="text-2xl font-bold text-amber-700 mt-1">{queriesRaised}</div>
            <div className="text-[10px] text-amber-600 mt-0.5">Awaiting applicant</div>
          </div>

          <div className="bg-white p-3.5 border border-slate-300 rounded shadow-2xs">
            <div className="text-[11px] font-semibold text-emerald-700 uppercase">Approved</div>
            <div className="text-2xl font-bold text-emerald-700 mt-1">{approvedCount}</div>
            <div className="text-[10px] text-emerald-600 mt-0.5">Sanctions granted</div>
          </div>

          <div className="bg-white p-3.5 border border-slate-300 rounded shadow-2xs">
            <div className="text-[11px] font-semibold text-rose-700 uppercase">Rejected</div>
            <div className="text-2xl font-bold text-rose-700 mt-1">{rejectedCount}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Non-compliant</div>
          </div>

          <div className="bg-white p-3.5 border border-slate-300 rounded shadow-2xs">
            <div className="text-[11px] font-semibold text-slate-700 uppercase">Average Processing Time</div>
            <div className="text-2xl font-bold text-slate-900 mt-1">{averageProcessingTime}</div>
            <div className="text-[10px] text-emerald-600 mt-0.5">Well within 45d SLA</div>
          </div>

        </div>
      </div>

      {/* =========================================================================
          SECTION 13: FILTERS & SEARCH STRIP
         ========================================================================= */}
      <div className="bg-white border border-slate-300 p-4 rounded shadow-xs space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-[#005a9c]" />
          <span>Queue Filters & Search Criteria</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          
          {/* Department Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Department</label>
            <select
              value={filterDept}
              onChange={e => setFilterDept(e.target.value)}
              className="w-full text-xs p-1.5 border border-slate-300 rounded bg-white focus:outline-none focus:border-[#005a9c]"
            >
              <option value="all">All Departments</option>
              <option value="MPCB">MPCB (Pollution)</option>
              <option value="MIDC">MIDC (Industrial Dev)</option>
              <option value="MFS">Fire Services</option>
              <option value="DISH">DISH (Safety)</option>
              <option value="MSEDCL">MSEDCL (Power)</option>
            </select>
          </div>

          {/* District Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">District</label>
            <select
              value={filterDistrict}
              onChange={e => setFilterDistrict(e.target.value)}
              className="w-full text-xs p-1.5 border border-slate-300 rounded bg-white focus:outline-none focus:border-[#005a9c]"
            >
              <option value="all">All Districts</option>
              <option value="Pune">Pune District</option>
              <option value="Thane">Thane District</option>
              <option value="Nashik">Nashik District</option>
              <option value="Chhatrapati Sambhajinagar">Chhatrapati Sambhajinagar</option>
            </select>
          </div>

          {/* Approval Type Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Approval Type</label>
            <select
              value={filterApprovalType}
              onChange={e => setFilterApprovalType(e.target.value)}
              className="w-full text-xs p-1.5 border border-slate-300 rounded bg-white focus:outline-none focus:border-[#005a9c]"
            >
              <option value="all">All Clearances</option>
              <option value="MPCB-CTE">MPCB Consent to Establish</option>
              <option value="MIDC-BP">MIDC Building Plan</option>
              <option value="FIRE-NOC">Fire Services NOC</option>
              <option value="DISH-FL">DISH Factory License</option>
              <option value="MSEDCL-HT">MSEDCL Power Sanction</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Status</label>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="w-full text-xs p-1.5 border border-slate-300 rounded bg-white focus:outline-none focus:border-[#005a9c]"
            >
              <option value="all">All Statuses</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Query Raised">Query Raised</option>
              <option value="Approved">Approved</option>
              <option value="Under Scrutiny">Under Scrutiny</option>
            </select>
          </div>

          {/* Date Range Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Date Range</label>
            <select
              value={filterDateRange}
              onChange={e => setFilterDateRange(e.target.value)}
              className="w-full text-xs p-1.5 border border-slate-300 rounded bg-white focus:outline-none focus:border-[#005a9c]"
            >
              <option value="Current FY 2025-26">Current FY 2025-26</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Last 7 Days">Last 7 Days</option>
            </select>
          </div>

          {/* Search Box */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Search Keyword</label>
            <div className="relative">
              <input
                type="text"
                placeholder="ID or Enterprise..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full text-xs p-1.5 pl-7 border border-slate-300 rounded bg-white focus:outline-none focus:border-[#005a9c]"
              />
              <Search className="w-3.5 h-3.5 absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================================
          SECTION 13: SCRUTINY QUEUE TABLE
         ========================================================================= */}
      <div className="bg-white border border-slate-300 rounded overflow-hidden shadow-xs">
        <div className="bg-[#f8fafc] px-4 py-3 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#0b2545]">
            Assigned Applications Scrutiny Queue ({filteredQueue.length})
          </h3>
          <span className="text-[11px] text-slate-500 font-mono">
            Filtered by: {filterDept.toUpperCase()} • Status: {filterStatus.toUpperCase()}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f1f5f9] text-[#0b2545] font-bold uppercase tracking-wider border-b border-slate-300">
              <tr>
                <th className="px-4 py-3 border-r border-slate-200">Application ID</th>
                <th className="px-4 py-3 border-r border-slate-200">Industry</th>
                <th className="px-4 py-3 border-r border-slate-200">Approval</th>
                <th className="px-4 py-3 border-r border-slate-200">Department</th>
                <th className="px-4 py-3 border-r border-slate-200">Assigned Date</th>
                <th className="px-4 py-3 border-r border-slate-200">SLA</th>
                <th className="px-4 py-3 border-r border-slate-200">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {filteredQueue.map(item => {
                const statusBadge =
                  item.status === 'Approved'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : item.status === 'Query Raised'
                    ? 'bg-amber-50 text-amber-900 border-amber-300'
                    : item.status === 'Pending Review'
                    ? 'bg-blue-50 text-[#005a9c] border-blue-300'
                    : 'bg-slate-50 text-slate-700 border-slate-300';

                return (
                  <tr key={item.id} className="hover:bg-slate-50 transition">
                    
                    {/* Application ID */}
                    <td className="px-4 py-3 border-r border-slate-200 font-mono font-bold text-slate-900">
                      {item.id}
                    </td>

                    {/* Industry */}
                    <td className="px-4 py-3 border-r border-slate-200 font-semibold text-slate-900">
                      {item.industry}
                      <div className="text-[10px] text-slate-500 font-normal">{item.district}</div>
                    </td>

                    {/* Approval */}
                    <td className="px-4 py-3 border-r border-slate-200 text-slate-800">
                      <div className="font-medium">{item.approval}</div>
                      <div className="text-[10px] font-mono text-slate-500">{item.code}</div>
                    </td>

                    {/* Department */}
                    <td className="px-4 py-3 border-r border-slate-200 font-medium text-slate-700">
                      {item.departmentCode}
                    </td>

                    {/* Assigned Date */}
                    <td className="px-4 py-3 border-r border-slate-200 font-mono text-slate-600">
                      {item.assignedDate}
                    </td>

                    {/* SLA */}
                    <td className="px-4 py-3 border-r border-slate-200 font-mono text-slate-700">
                      {item.slaDays} Days
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3 border-r border-slate-200">
                      <span className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded border ${statusBadge}`}>
                        {item.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center space-x-1">
                        <Link
                          href={`/officer/review/${item.id}`}
                          className="px-2.5 py-1 rounded bg-[#0b2545] hover:bg-[#005a9c] text-white text-xs font-semibold transition"
                          title="Open Technical Review Workspace"
                        >
                          Review
                        </Link>
                        {item.status !== 'Approved' && (
                          <>
                            <button
                              onClick={() => handleQuickApprove(item.code)}
                              className="px-2 py-1 rounded bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition"
                              title="Grant Direct Sanction"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => setQueryModalApp(item.code)}
                              className="px-2 py-1 rounded bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition"
                              title="Raise Statutory Clarification Query"
                            >
                              Query
                            </button>
                          </>
                        )}
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Query Modal Dialog */}
      {queryModalApp && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded border border-slate-300 w-full max-w-md p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0b2545]">
                Issue Statutory Query Notice ({queryModalApp})
              </h4>
              <button
                onClick={() => setQueryModalApp(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleQuickQuery} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Query Particulars / Requested Rectification:
                </label>
                <textarea
                  rows={4}
                  value={customQueryText}
                  onChange={e => setCustomQueryText(e.target.value)}
                  placeholder="Specify missing technical drawings, chemical dosing details, or statutory calculations required from applicant..."
                  className="w-full p-2.5 border border-slate-300 rounded focus:outline-none focus:border-[#005a9c]"
                  required
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setQueryModalApp(null)}
                  className="px-3 py-1.5 rounded border border-slate-300 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-amber-700 hover:bg-amber-800 text-white font-bold transition flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Query</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
