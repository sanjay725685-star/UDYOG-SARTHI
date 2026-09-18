'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Flame,
  GitFork,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Clock,
  Ban,
  CheckCircle2,
  ShieldAlert,
  Layers,
  Info
} from 'lucide-react';
import Link from 'next/link';

export default function BottlenecksPage() {
  const { approvals, queries } = useApp();
  const [simulatedDelayDays, setSimulatedDelayDays] = useState<number>(7);

  const activeBottleneck = approvals.find(a => a.code === 'MPCB-CTE') || approvals[3];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Government Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-[#0b2545]">Home</Link>
        <span>/</span>
        <Link href="/dependency-graph" className="hover:text-[#0b2545]">Dependency Graph</Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">Critical Path & Bottleneck Analysis</span>
      </nav>

      {/* Page Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-rose-700 mb-1">
            <Flame className="w-4 h-4 text-rose-600" />
            <span>Topological Critical Path Analysis</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0b2545] tracking-tight">
            Clearance Bottlenecks & Critical Path Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Algorithmic sequencing of the longest clearance dependency chain determining the commercial operations date (COD).
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <Link
            href="/dependency-graph"
            className="flex items-center space-x-2 px-3.5 py-2 rounded bg-[#0b2545] hover:bg-[#005a9c] text-white text-xs font-bold transition"
          >
            <GitFork className="w-4 h-4" />
            <span>Open Clearance DAG</span>
          </Link>
          <Link
            href="/queries"
            className="flex items-center space-x-2 px-3.5 py-2 rounded bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold transition"
          >
            <span>Respond to Bottleneck Query</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Statutory Guidance Advisory */}
      <div className="p-3.5 bg-blue-50 border-l-4 border-[#005a9c] text-slate-800 text-xs leading-relaxed flex items-start space-x-2.5">
        <Info className="w-4 h-4 text-[#005a9c] shrink-0 mt-0.5" />
        <div>
          <strong>Statutory Scheduling Advisory:</strong> Clearances located on the critical path directly govern total project commissioning latency. A delay on any critical path node translates 1:1 into overall industrial commissioning delay.
        </div>
      </div>

      {/* Primary Bottleneck Notice Card (Government Style) */}
      <div className="bg-white border-2 border-rose-300 rounded p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200 text-[11px] font-bold">
            <Flame className="w-3.5 h-3.5 text-rose-600" />
            <span>Primary Critical Path Bottleneck</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            {activeBottleneck.name} ({activeBottleneck.code})
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
            This clearance has <strong>4 downstream dependents</strong>, including the statutory DISH Factory Licence and Boiler Registration. Clarification query response regarding ETP mass balance sizing is required to prevent project stall.
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-600 pt-0.5">
            <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">Department: {activeBottleneck.departmentCode}</span>
            <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-bold">Status: Clarification Required</span>
            <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200 font-bold">Downstream Impact: High (30+ Days)</span>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded border border-slate-200 text-center w-full md:w-64 shrink-0 space-y-2">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Recommended Action</div>
          <div className="text-xs font-bold text-slate-900">Submit Revised ETP Technical Note</div>
          <Link
            href="/queries"
            className="block w-full py-2 px-3 rounded bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs transition shadow-2xs"
          >
            Resolve Query Now
          </Link>
        </div>
      </div>

      {/* Delay Impact Simulator */}
      <div className="bg-white border border-slate-300 rounded p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-sm font-bold text-[#0b2545] flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#005a9c]" />
              <span>Delay Impact Simulator (What-If Analysis)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Project financial and timeline impact of response latency on critical clearance nodes
            </p>
          </div>
          <div className="text-right font-mono">
            <span className="text-xs text-slate-500">Commissioning Shift:</span>{' '}
            <span className="text-sm font-bold text-rose-700">+{simulatedDelayDays} Calendar Days</span>
          </div>
        </div>

        {/* Range Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-600 font-mono">
            <span>0 Days</span>
            <span className="font-bold text-[#0b2545]">{simulatedDelayDays} Days Response Latency</span>
            <span>30 Days</span>
          </div>
          <input
            type="range"
            min={1}
            max={30}
            value={simulatedDelayDays}
            onChange={e => setSimulatedDelayDays(parseInt(e.target.value, 10))}
            className="w-full accent-[#0b2545] cursor-pointer"
          />
        </div>

        {/* Impact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="p-3.5 rounded bg-slate-50 border border-slate-200">
            <div className="text-[11px] text-slate-500 font-semibold uppercase">Projected Commissioning Date</div>
            <div className="text-base font-bold text-slate-900 mt-1">
              08 Nov 2026 <span className="text-xs text-rose-700 font-normal font-mono">(+{simulatedDelayDays}d)</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Original Baseline: 01 Nov 2026</div>
          </div>
          <div className="p-3.5 rounded bg-slate-50 border border-slate-200">
            <div className="text-[11px] text-slate-500 font-semibold uppercase">Capital Carrying Cost Impact</div>
            <div className="text-base font-bold text-amber-800 mt-1 font-mono">
              ₹{(simulatedDelayDays * 2.15).toFixed(1)} Lakhs
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">At 10.5% interest on ₹25 Cr Capex</div>
          </div>
          <div className="p-3.5 rounded bg-slate-50 border border-slate-200">
            <div className="text-[11px] text-slate-500 font-semibold uppercase">Worker Mobilization Schedule</div>
            <div className="text-base font-bold text-rose-800 mt-1">Disruption Risk</div>
            <div className="text-[10px] text-slate-500 mt-0.5">250 skilled employment contracts</div>
          </div>
        </div>
      </div>

      {/* Comprehensive Bottlenecks Table */}
      <div className="bg-white border border-slate-300 rounded overflow-hidden shadow-xs">
        <div className="bg-[#f8fafc] px-4 py-3 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#0b2545]">
            Approval Dependency Bottleneck Matrix
          </h3>
          <span className="text-[11px] text-slate-500 font-mono">Ranked by Downstream Criticality</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f1f5f9] text-[#0b2545] font-bold uppercase tracking-wider border-b border-slate-300">
              <tr>
                <th className="px-4 py-3 border-r border-slate-200">Approval Name & Code</th>
                <th className="px-4 py-3 border-r border-slate-200">Department</th>
                <th className="px-4 py-3 border-r border-slate-200">Current Status</th>
                <th className="px-4 py-3 border-r border-slate-200">Downstream Dependents</th>
                <th className="px-4 py-3 border-r border-slate-200">Critical Path Risk</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {approvals.map(app => {
                const isBlockedOrAction = app.status === 'BLOCKED' || app.status === 'ACTION_REQUIRED';

                return (
                  <tr key={app.id} className="hover:bg-slate-50 transition">
                    <td className="px-4 py-3 border-r border-slate-200">
                      <div className="font-bold text-slate-900">{app.name}</div>
                      <div className="text-[10px] font-mono text-slate-500">{app.code}</div>
                    </td>
                    <td className="px-4 py-3 border-r border-slate-200 font-medium text-slate-700">
                      {app.departmentCode}
                    </td>
                    <td className="px-4 py-3 border-r border-slate-200">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                          app.status === 'COMPLETED'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : app.status === 'ACTION_REQUIRED'
                            ? 'bg-amber-50 text-amber-900 border-amber-300'
                            : app.status === 'BLOCKED'
                            ? 'bg-rose-50 text-rose-800 border-rose-300'
                            : 'bg-blue-50 text-[#005a9c] border-blue-300'
                        }`}
                      >
                        {app.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 border-r border-slate-200 font-mono text-slate-600">
                      {app.downstream.length > 0 ? app.downstream.join(', ') : 'None (Leaf Node)'}
                    </td>
                    <td className="px-4 py-3 border-r border-slate-200">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          app.isCriticalPath
                            ? 'bg-rose-50 text-rose-800 border border-rose-200'
                            : 'bg-slate-50 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {app.isCriticalPath ? 'Critical Path' : 'Non-Critical'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {isBlockedOrAction ? (
                        <Link
                          href="/queries"
                          className="px-2.5 py-1 rounded bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold transition"
                        >
                          Resolve Query
                        </Link>
                      ) : (
                        <Link
                          href={`/applications/${app.applicationId || 'APP-2026-MPCB-0842'}`}
                          className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-300 transition"
                        >
                          View Status
                        </Link>
                      )}
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
