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
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

export default function BottlenecksPage() {
  const { approvals, queries } = useApp();
  const [simulatedDelayDays, setSimulatedDelayDays] = useState<number>(7);

  // Critical path sequence
  const criticalPathCodes = ['MIDC-LAND', 'MIDC-BP', 'FIRE-NOC', 'MPCB-CTE', 'DISH-FL', 'BOILER-REG'];
  const criticalApprovals = approvals.filter(a => criticalPathCodes.includes(a.code));

  // Find the highest-risk bottleneck
  const activeBottleneck = approvals.find(a => a.code === 'MPCB-CTE') || approvals[3];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-rose-700 mb-1">
            <Flame className="w-4 h-4 text-rose-600" />
            <span>NetworkX Critical Path Graph Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Critical Path & Clearance Bottleneck Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Algorithmic detection of the longest dependency sequence determining overall industrial commercial operations date (COD).
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <Link
            href="/dependency-graph"
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition"
          >
            <GitFork className="w-4 h-4 text-sarthi-600" />
            <span>React Flow DAG</span>
          </Link>
          <Link
            href="/queries"
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md transition"
          >
            <span>Resolve Bottleneck Query</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Hero Bottleneck Alert Card */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-rose-950 text-white p-6 sm:p-8 rounded-3xl border border-rose-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/40 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              <span>Primary Project Bottleneck Identified</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {activeBottleneck.name} ({activeBottleneck.code})
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              This clearance has <strong className="text-rose-400">4 direct and indirect downstream dependents</strong>,
              including the statutory DISH Factory License and Boiler Commissioning. The open query regarding ETP neutralizer sizing
              is currently stalling the critical clearance path.
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-300 pt-1">
              <span className="px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700">Department: {activeBottleneck.departmentCode}</span>
              <span className="px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700 text-amber-400">Status: Action Required</span>
              <span className="px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700 text-rose-400">Downstream Impact: High (30+ Days)</span>
            </div>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-rose-700/50 text-center w-full lg:w-72 shrink-0">
            <div className="text-xs text-slate-400 font-mono">Recommended Action</div>
            <div className="text-sm font-bold text-white mt-1">Upload Revised ETP Drawing</div>
            <p className="text-[11px] text-slate-400 mt-1">Estimated recovery: 14 business days saved</p>
            <Link
              href="/queries"
              className="mt-4 block w-full py-2 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs shadow-md transition"
            >
              Resolve Query Now
            </Link>
          </div>
        </div>
      </div>

      {/* Critical Path Interactive Simulation */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-sarthi-600" />
              <span>Delay Impact Simulator (What-If Scenario)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Drag the slider to project financial and schedule ramifications of query response delays
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-slate-500 font-mono">Projected Commissioning Shift:</span>
            <span className="text-sm font-bold text-rose-600 ml-1.5 font-mono">+{simulatedDelayDays} Days</span>
          </div>
        </div>

        {/* Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-600 font-mono">
            <span>0 Days Delay</span>
            <span className="font-bold text-sarthi-700">{simulatedDelayDays} Days Delay in Response</span>
            <span>30 Days Delay</span>
          </div>
          <input
            type="range"
            min={1}
            max={30}
            value={simulatedDelayDays}
            onChange={e => setSimulatedDelayDays(parseInt(e.target.value, 10))}
            className="w-full accent-rose-600 cursor-pointer"
          />
        </div>

        {/* Financial and Schedule Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-xs text-slate-500 font-semibold uppercase">Revised Commissioning Target</div>
            <div className="text-lg font-black text-slate-900 mt-1">
              08 Nov 2026 <span className="text-xs text-rose-600 font-normal">(+{simulatedDelayDays}d)</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Original Target: 01 Nov 2026</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-xs text-slate-500 font-semibold uppercase">Idle Capital Carrying Cost</div>
            <div className="text-lg font-black text-amber-700 mt-1">
              ₹{(simulatedDelayDays * 2.15).toFixed(1)} Lakhs
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">At 10.5% interest on ₹25 Cr Capex</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-xs text-slate-500 font-semibold uppercase">Downstream Labor Mobilization</div>
            <div className="text-lg font-black text-rose-700 mt-1">High Disruption Risk</div>
            <div className="text-[11px] text-slate-500 mt-0.5">250 skilled worker contracts affected</div>
          </div>
        </div>
      </div>

      {/* Bottleneck Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            Comprehensive Clearance Bottleneck Matrix
          </h3>
          <span className="text-xs font-mono text-slate-500">Sorted by Downstream Impact</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-5 py-3">Approval Name</th>
                <th className="px-5 py-3">Department</th>
                <th className="px-5 py-3">Current Status</th>
                <th className="px-5 py-3">Downstream Dependents</th>
                <th className="px-5 py-3">Risk Level</th>
                <th className="px-5 py-3">Recommended AI Intervention</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {approvals.map(app => (
                <tr key={app.id} className="hover:bg-slate-50/80 transition">
                  <td className="px-5 py-3.5">
                    <div className="font-bold text-slate-900">{app.name}</div>
                    <div className="text-[10px] font-mono text-slate-500">{app.code}</div>
                  </td>
                  <td className="px-5 py-3.5 font-medium text-slate-600">{app.departmentCode}</td>
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
                  <td className="px-5 py-3.5 font-mono text-slate-600">
                    {app.downstream.length > 0 ? (
                      <span className="font-bold text-rose-700">{app.downstream.join(', ')}</span>
                    ) : (
                      <span className="text-slate-400">Terminal Clearance</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
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
                  <td className="px-5 py-3.5 text-xs text-slate-600 max-w-xs">
                    {app.code === 'MPCB-CTE' ? (
                      <Link href="/queries" className="font-bold text-amber-700 hover:underline">
                        Submit revised neutralizer calculations to unblock DISH Factory License
                      </Link>
                    ) : app.code === 'DISH-FL' ? (
                      <span>Awaiting MPCB CTE clearance to initiate physical machinery inspection</span>
                    ) : app.status === 'COMPLETED' ? (
                      <span className="text-emerald-700">Clearance granted on schedule</span>
                    ) : (
                      <span>Proceed with parallel documentation</span>
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
