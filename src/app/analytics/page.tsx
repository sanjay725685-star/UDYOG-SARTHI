'use client';

import React from 'react';
import MetricCard from '../../components/MetricCard';
import {
  Activity,
  TrendingDown,
  TrendingUp,
  Clock,
  Layers,
  FileCheck,
  Building2,
  AlertTriangle,
  Award
} from 'lucide-react';

export default function AnalyticsPage() {
  const deptWorkloads = [
    { name: 'MPCB (Pollution Control)', active: 42, resolved: 184, avgDays: 24, delayed: 4, bar: '78%' },
    { name: 'MIDC Town Planning', active: 28, resolved: 210, avgDays: 16, delayed: 1, bar: '92%' },
    { name: 'Maharashtra Fire Services', active: 14, resolved: 195, avgDays: 11, delayed: 0, bar: '98%' },
    { name: 'MSEDCL (Power Utility)', active: 36, resolved: 142, avgDays: 29, delayed: 6, bar: '71%' },
    { name: 'DISH (Factory Safety)', active: 22, resolved: 168, avgDays: 22, delayed: 3, bar: '84%' },
    { name: 'MIDC Water Works', active: 11, resolved: 180, avgDays: 12, delayed: 2, bar: '94%' }
  ];

  const monthlyTurnaround = [
    { month: 'Oct 2025', traditional: 82, udyogSarthi: 76 },
    { month: 'Nov 2025', traditional: 84, udyogSarthi: 64 },
    { month: 'Dec 2025', traditional: 79, udyogSarthi: 51 },
    { month: 'Jan 2026', traditional: 85, udyogSarthi: 38 },
    { month: 'Feb 2026', traditional: 81, udyogSarthi: 31 },
    { month: 'Mar 2026', traditional: 83, udyogSarthi: 26.4 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center space-x-2 text-xs font-semibold text-sarthi-600 mb-1">
          <Activity className="w-4 h-4 text-sarthi-600" />
          <span>Executive Business Intelligence & SLA Telemetry</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          System Analytics & Regulatory Performance Index
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Quantitative telemetry evaluating clearance velocity, AI document first-time right rates, and inter-departmental workload.
        </p>
      </div>

      {/* 4 High-Impact BI KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MetricCard
          title="Average Clearance Time"
          value="26.4 Days"
          subtitle="Down from 82 days baseline"
          change="-67.8% reduction"
          isPositive={true}
          icon={Clock}
          color="emerald"
        />
        <MetricCard
          title="First-Time Right Rate"
          value="91.2%"
          subtitle="Pre-audited dossiers"
          change="+34% increase"
          isPositive={true}
          icon={FileCheck}
          color="blue"
        />
        <MetricCard
          title="Total Capital Facilitated"
          value="₹1,420 Cr"
          subtitle="Industrial capex cleared"
          icon={Award}
          color="purple"
        />
        <MetricCard
          title="Query Cycle Frequency"
          value="0.32 / App"
          subtitle="Down from 1.8 queries per application"
          change="-82% fewer queries"
          isPositive={true}
          icon={TrendingDown}
          color="emerald"
        />
      </div>

      {/* Chart 1: Processing Velocity Trend (Traditional vs UDYOG SARTHI) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Clearance Turnaround Velocity (Days to Grant Sanction)
            </h3>
            <p className="text-xs text-slate-500">
              Comparison between traditional single-window timelines and UDYOG SARTHI AI-coordinated orchestration
            </p>
          </div>
          <div className="flex items-center space-x-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-3 h-3 rounded bg-slate-300" /> Traditional Portal (82d avg)
            </span>
            <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
              <span className="w-3 h-3 rounded bg-emerald-500" /> UDYOG SARTHI (26.4d)
            </span>
          </div>
        </div>

        {/* Visual Bar Comparison Chart */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 pt-4">
          {monthlyTurnaround.map((m, idx) => (
            <div key={idx} className="flex flex-col items-center space-y-2">
              <div className="h-44 w-full flex items-end justify-center space-x-2 bg-slate-50 rounded-xl p-2 border border-slate-100">
                {/* Traditional Bar */}
                <div
                  className="w-4 bg-slate-300 rounded-t transition-all hover:bg-slate-400 relative group"
                  style={{ height: `${(m.traditional / 100) * 100}%` }}
                >
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] font-mono bg-slate-800 text-white px-1 rounded opacity-0 group-hover:opacity-100 transition">
                    {m.traditional}d
                  </span>
                </div>
                {/* UDYOG SARTHI Bar */}
                <div
                  className="w-4 bg-gradient-to-t from-emerald-600 to-teal-500 rounded-t transition-all hover:opacity-90 relative group"
                  style={{ height: `${(m.udyogSarthi / 100) * 100}%` }}
                >
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold bg-emerald-700 text-white px-1 rounded opacity-0 group-hover:opacity-100 transition">
                    {m.udyogSarthi}d
                  </span>
                </div>
              </div>
              <div className="text-[11px] font-mono text-slate-600 font-semibold">{m.month}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart 2: Department Workload & SLA Adherence */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-base font-bold text-slate-900">
            Participating Department Workload & SLA Efficiency Index
          </h3>
          <p className="text-xs text-slate-500">Live throughput across 6 core industrial approval authorities</p>
        </div>

        <div className="space-y-4">
          {deptWorkloads.map((dept, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="font-bold text-xs text-slate-900">{dept.name}</div>
                <div className="text-[11px] font-mono text-slate-600 flex items-center gap-3">
                  <span>{dept.active} Active Queued</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-bold">{dept.resolved} Sanctioned</span>
                  <span>•</span>
                  <span>Avg: {dept.avgDays} Days</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sarthi-600 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: dept.bar }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
