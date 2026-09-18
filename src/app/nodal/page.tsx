'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import MetricCard from '../../components/MetricCard';
import {
  Shield,
  Layers,
  Clock,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  GitFork,
  HelpCircle,
  Activity,
  ArrowRight,
  ExternalLink,
  Flame,
  Building2
} from 'lucide-react';

export default function NodalOfficerPage() {
  const { grievances, approvals } = useApp();

  const deptMetrics = [
    { name: 'Maharashtra Pollution Control Board (MPCB)', onTimeRate: '88%', avgDays: 24, delayed: 4, score: 'Good' },
    { name: 'MIDC Town Planning Authority', onTimeRate: '94%', avgDays: 16, delayed: 1, score: 'Excellent' },
    { name: 'Maharashtra Fire Services', onTimeRate: '96%', avgDays: 11, delayed: 0, score: 'Excellent' },
    { name: 'MSEDCL (Power Distribution)', onTimeRate: '82%', avgDays: 29, delayed: 6, score: 'Needs Scrutiny' },
    { name: 'Directorate of Industrial Safety & Health (DISH)', onTimeRate: '89%', avgDays: 22, delayed: 3, score: 'Good' },
    { name: 'MIDC Water Works Engineering', onTimeRate: '92%', avgDays: 12, delayed: 2, score: 'Good' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Nodal Officer Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-amber-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-amber-900 text-amber-300 border border-amber-700">
              State Single Window Clearing Authority
            </span>
            <span className="text-xs text-slate-400 font-mono">State Level Nodal Oversight Desk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Smt. Meena Shinde — State Nodal Facilitation Officer
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Monitoring inter-departmental SLA compliance, escalating critical path bottlenecks, and resolving grievances.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 shrink-0">
          <Link
            href="/bottlenecks"
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md transition"
          >
            <Flame className="w-4 h-4" />
            <span>Active Bottlenecks</span>
          </Link>
          <Link
            href="/support"
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition"
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>Grievances ({grievances.length})</span>
          </Link>
        </div>
      </div>

      {/* 4 High-Level Nodal KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MetricCard
          title="Overall State SLA Adherence"
          value="91.4%"
          change="+4.8% vs last quarter"
          isPositive={true}
          icon={CheckCircle2}
          color="emerald"
        />
        <MetricCard
          title="Active Escalated Cases"
          value="16"
          subtitle="Beyond 30 days"
          icon={AlertTriangle}
          color="rose"
          badge="High Alert"
        />
        <MetricCard
          title="Avg Clearance Velocity"
          value="26.4 Days"
          change="-56 days from baseline"
          isPositive={true}
          icon={Clock}
          color="blue"
        />
        <MetricCard
          title="Open Grievances"
          value={grievances.length}
          subtitle="Tracked under Citizen Charter"
          icon={HelpCircle}
          color="amber"
        />
      </div>

      {/* Department Performance Matrix Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Department Performance & Citizen Charter SLA Tracking
            </h3>
            <p className="text-xs text-slate-500">Live monitoring across 6 participating state agencies</p>
          </div>
          <Link href="/analytics" className="text-xs font-bold text-sarthi-600 hover:underline">
            Open Advanced BI Analytics
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-5 py-3">Government Agency</th>
                <th className="px-5 py-3">SLA Adherence Rate</th>
                <th className="px-5 py-3">Avg Clearance Days</th>
                <th className="px-5 py-3">Delayed Cases</th>
                <th className="px-5 py-3">Performance Band</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {deptMetrics.map((dm, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition">
                  <td className="px-5 py-4 font-bold text-slate-900">{dm.name}</td>
                  <td className="px-5 py-4 font-mono font-bold text-emerald-700">{dm.onTimeRate}</td>
                  <td className="px-5 py-4 font-mono text-slate-700">{dm.avgDays} Days</td>
                  <td className="px-5 py-4 font-mono font-bold text-rose-700">{dm.delayed}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        dm.score === 'Excellent'
                          ? 'bg-emerald-100 text-emerald-800'
                          : dm.score === 'Good'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {dm.score}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition">
                      Issue SLA Notice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Escalated Grievance Tickets */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Active Grievance Redressal Tickets ({grievances.length})
            </h3>
          </div>
          <Link href="/support" className="text-xs font-semibold text-sarthi-600 hover:underline">
            View All Grievances
          </Link>
        </div>

        <div className="space-y-3">
          {grievances.map(g => (
            <div key={g.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-bold text-slate-900">{g.id}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold">
                    {g.priority.toUpperCase()} PRIORITY
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">{g.createdAt}</span>
                </div>
                <div className="font-bold text-slate-900">{g.subject}</div>
                <p className="text-slate-600 max-w-2xl">{g.description}</p>
                {g.resolutionNotes && (
                  <div className="text-[11px] text-emerald-700 font-medium">
                    Nodal Action: {g.resolutionNotes}
                  </div>
                )}
              </div>

              <div className="shrink-0 flex items-center space-x-2">
                <button className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition">
                  Mark Resolved
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
