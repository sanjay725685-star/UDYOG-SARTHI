'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import MetricCard from '../../components/MetricCard';
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
  UserCheck
} from 'lucide-react';

export default function OfficerDashboardPage() {
  const { approvals, queries, approveApplication, raiseOfficerQuery } = useApp();
  const [filterDept, setFilterDept] = useState<string>('all');
  const [filterRisk, setFilterRisk] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  // Officer quick query modal state
  const [queryModalApp, setQueryModalApp] = useState<string | null>(null);
  const [customQueryText, setCustomQueryText] = useState('');

  const filteredQueue = approvals.filter(app => {
    if (filterDept !== 'all' && app.departmentCode !== filterDept) return false;
    if (filterRisk !== 'all' && app.riskLevel !== filterRisk) return false;
    if (search.trim()) {
      return (
        app.name.toLowerCase().includes(search.toLowerCase()) ||
        app.code.toLowerCase().includes(search.toLowerCase()) ||
        (app.applicationId && app.applicationId.toLowerCase().includes(search.toLowerCase()))
      );
    }
    return true;
  });

  const pendingCount = approvals.filter(a => a.status === 'IN_PROGRESS').length + 8;
  const underReviewCount = approvals.filter(a => a.status === 'ACTION_REQUIRED').length + 3;
  const queriesPending = queries.filter(q => q.status === 'open').length;

  const handleQuickApprove = (code: string) => {
    approveApplication(code, 'Er. Sunita Patil (MPCB SRO Pune)', 'Technical scrutiny satisfied. Approved under single-window mandate.');
  };

  const handleQuickQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryModalApp || !customQueryText.trim()) return;
    raiseOfficerQuery(queryModalApp, customQueryText);
    setQueryModalApp(null);
    setCustomQueryText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Officer Header */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-emerald-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-emerald-900 text-emerald-300 border border-emerald-700">
              Department Scrutiny Cockpit
            </span>
            <span className="text-xs text-slate-400">Regional Jurisdiction: Pune & MIDC Industrial Corridors</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Er. Sunita Patil — Sub-Regional Officer (MPCB)
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Designated Regulatory Authority for Air & Water Pollution Prevention and Industrial Consents.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 shrink-0">
          <Link
            href="/officer/review/APP-2026-MPCB-0842"
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md transition"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Launch AI Regulatory Review Assistant</span>
          </Link>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MetricCard
          title="Pending Applications"
          value={pendingCount}
          subtitle="Assigned to desk"
          icon={Layers}
          color="blue"
        />
        <MetricCard
          title="Under Active Review"
          value={underReviewCount}
          subtitle="Engineering scrutiny"
          icon={Clock}
          color="emerald"
        />
        <MetricCard
          title="Queries Awaiting Reply"
          value={queriesPending}
          subtitle="Applicant action required"
          icon={MessageSquare}
          color="amber"
          badge="Active"
        />
        <MetricCard
          title="Overdue SLA Breached"
          value="2"
          subtitle="Citizen Charter escalation"
          icon={AlertTriangle}
          color="rose"
        />
      </div>

      {/* Scrutiny Queue Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-6">
        
        {/* Table Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Department Scrutiny Queue & Decision Workbench
            </h3>
            <p className="text-xs text-slate-500">Filter applications by risk profile, jurisdiction, or department code</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={filterDept}
              onChange={e => setFilterDept(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-semibold text-slate-700"
            >
              <option value="all">All Departments</option>
              <option value="MPCB">MPCB (Pollution Board)</option>
              <option value="MIDC">MIDC (Industrial Dev)</option>
              <option value="DISH">DISH (Safety & Health)</option>
              <option value="MFS">MFS (Fire Services)</option>
              <option value="MSEDCL">MSEDCL (Power)</option>
            </select>

            <select
              value={filterRisk}
              onChange={e => setFilterRisk(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-semibold text-slate-700"
            >
              <option value="all">All Risk Levels</option>
              <option value="high">High Risk Only</option>
              <option value="medium">Medium Risk</option>
              <option value="low">Low Risk</option>
            </select>

            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search ID, Applicant, Act..."
              className="text-xs px-3 py-1.5 rounded-lg border border-slate-300 w-48"
            />
          </div>
        </div>

        {/* Queue Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Applicant & ID</th>
                <th className="px-4 py-3">Approval Title</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Risk Level</th>
                <th className="px-4 py-3">Current Status</th>
                <th className="px-4 py-3 text-right">Officer Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filteredQueue.map(app => (
                <tr key={app.id} className="hover:bg-slate-50/80 transition">
                  <td className="px-4 py-3.5">
                    <div className="font-bold text-slate-900">ABC Manufacturing Pvt Ltd</div>
                    <div className="text-[10px] font-mono text-slate-500">
                      {app.applicationId || 'APP-2026-DRAFT'} • Chakan Phase II, Pune
                    </div>
                  </td>

                  <td className="px-4 py-3.5 font-bold text-slate-900">
                    <div className="max-w-xs truncate">{app.name}</div>
                    <div className="text-[10px] font-mono text-sarthi-700">{app.code}</div>
                  </td>

                  <td className="px-4 py-3.5 font-medium text-slate-600">{app.departmentCode}</td>

                  <td className="px-4 py-3.5">
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        app.riskLevel === 'high'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : app.riskLevel === 'medium'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {app.riskLevel}
                    </span>
                  </td>

                  <td className="px-4 py-3.5">
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

                  <td className="px-4 py-3.5 text-right space-x-1.5">
                    <Link
                      href={`/officer/review/${app.applicationId || 'APP-2026-MPCB-0842'}`}
                      className="px-2.5 py-1.5 rounded-lg bg-sarthi-600 hover:bg-sarthi-700 text-white font-bold text-xs inline-flex items-center gap-1 shadow-2xs transition"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>AI Review</span>
                    </Link>

                    {app.status !== 'COMPLETED' && (
                      <>
                        <button
                          onClick={() => handleQuickApprove(app.code)}
                          className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => setQueryModalApp(app.code)}
                          className="px-2.5 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs transition"
                        >
                          Raise Query
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Query Modal */}
      {queryModalApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-2xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4 animate-in fade-in duration-150">
            <h3 className="text-base font-bold text-slate-900">
              Raise Statutory Technical Query on {queryModalApp}
            </h3>
            <p className="text-xs text-slate-500">
              This query will be dispatched to ABC Manufacturing Pvt Ltd with a 7-day citizen charter deadline.
            </p>

            <form onSubmit={handleQuickQuery} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Query Particulars & Clarification Notes</label>
                <textarea
                  rows={4}
                  value={customQueryText}
                  onChange={e => setCustomQueryText(e.target.value)}
                  placeholder="Detail the technical deficiency, missing calculation, or required drawing revision..."
                  className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sarthi-500"
                  required
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setQueryModalApp(null)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs"
                >
                  Issue Query
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
