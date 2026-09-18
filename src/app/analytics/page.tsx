'use client';

import React from 'react';
import Link from 'next/link';
import {
  Activity,
  Clock,
  Layers,
  FileCheck,
  Building2,
  AlertTriangle,
  Award,
  Info,
  ArrowRight,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

export default function AnalyticsPage() {
  // 4 Government-Style Chart Data Sets (Section 18)
  const applicationsByStatus = [
    { label: 'Approved & Orders Granted', count: 116, percentage: 81.7, color: 'bg-emerald-700' },
    { label: 'Under Departmental Review', count: 18, percentage: 12.7, color: 'bg-[#005a9c]' },
    { label: 'Clarification Required (Query)', count: 5, percentage: 3.5, color: 'bg-amber-600' },
    { label: 'Under Preliminary Scrutiny', count: 3, percentage: 2.1, color: 'bg-slate-500' }
  ];

  const applicationsByDepartment = [
    { name: 'Maharashtra Pollution Control Board (MPCB)', count: 42, percentage: 29.6, avgDays: 24 },
    { name: 'Maharashtra Industrial Development Corp (MIDC)', count: 38, percentage: 26.8, avgDays: 16 },
    { name: 'Maharashtra Fire Services (MFS)', count: 24, percentage: 16.9, avgDays: 11 },
    { name: 'Directorate of Industrial Safety & Health (DISH)', count: 22, percentage: 15.5, avgDays: 21 },
    { name: 'MSEDCL (Power Distribution Utility)', count: 16, percentage: 11.2, avgDays: 28 }
  ];

  const processingStages = [
    { stage: 'Pre-Establishment Stage', count: 58, percentage: 40.8, desc: 'Consent to Establish, Land Allotment, Feasibility' },
    { stage: 'Pre-Construction Stage', count: 48, percentage: 33.8, desc: 'Building Plan, Fire NOC, Water Connection' },
    { stage: 'Pre-Operation Stage', count: 36, percentage: 25.4, desc: 'Factory Licence, Consent to Operate, Boiler Reg' }
  ];

  const approvalTypes = [
    { type: 'Mandatory Clearances', count: 88, percentage: 62.0, desc: 'Statutory requirements applicable across all units' },
    { type: 'Conditional / Sector-Specific', count: 54, percentage: 38.0, desc: 'Triggered by water, power, or hazardous material thresholds' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Government Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-[#0b2545]">Home</Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">Prototype Demonstration Metrics</span>
      </nav>

      {/* Page Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#005a9c] mb-1">
            <Activity className="w-4 h-4 text-[#005a9c]" />
            <span>Operational Telemetry & Performance Statistics</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0b2545] tracking-tight">
            Prototype Demonstration Metrics
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Administrative monitoring metrics, departmental workload distribution, and clearance turnaround performance.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <span className="text-xs font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-300 font-mono">
            Smart India Hackathon 2026 Test Data
          </span>
        </div>
      </div>

      {/* Statutory Guidance Notice */}
      <div className="p-3.5 bg-blue-50 border-l-4 border-[#005a9c] text-slate-800 text-xs leading-relaxed flex items-start space-x-2.5">
        <Info className="w-4 h-4 text-[#005a9c] shrink-0 mt-0.5" />
        <div>
          <strong>Data Governance Disclaimer:</strong> Figures presented on this page are clearly designated demonstration metrics generated for validating the single-window orchestration and SLA tracking engine of the UDYOG SARTHI prototype.
        </div>
      </div>

      {/* =========================================================================
          SECTION 18: 4 GOVERNMENT-STYLE CHARTS
         ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Chart 1: Applications by Status */}
        <div className="bg-white border border-slate-300 rounded p-5 shadow-xs space-y-4">
          <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0b2545]">
              1. Applications by Status (Total: 142)
            </h3>
            <span className="text-[11px] text-slate-500 font-mono">Status Breakdown</span>
          </div>

          <div className="space-y-3">
            {applicationsByStatus.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">{item.label}</span>
                  <span className="font-mono text-slate-600 font-bold">
                    {item.count} ({item.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className={`h-full ${item.color}`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Applications by Department */}
        <div className="bg-white border border-slate-300 rounded p-5 shadow-xs space-y-4">
          <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0b2545]">
              2. Applications by Department (Total: 142)
            </h3>
            <span className="text-[11px] text-slate-500 font-mono">Workload Allocation</span>
          </div>

          <div className="space-y-3">
            {applicationsByDepartment.map((dept, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 truncate max-w-[240px]">{dept.name}</span>
                  <span className="font-mono text-slate-600 font-bold">
                    {dept.count} ({dept.percentage}%) • Avg {dept.avgDays}d
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className="h-full bg-[#005a9c]"
                    style={{ width: `${dept.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 3: Processing Stage */}
        <div className="bg-white border border-slate-300 rounded p-5 shadow-xs space-y-4">
          <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0b2545]">
              3. Processing Stage Distribution
            </h3>
            <span className="text-[11px] text-slate-500 font-mono">Lifecycle Pipeline</span>
          </div>

          <div className="space-y-3">
            {processingStages.map((stg, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-slate-800">{stg.stage}</span>
                    <span className="text-[10px] text-slate-500 block">{stg.desc}</span>
                  </div>
                  <span className="font-mono text-slate-600 font-bold shrink-0">
                    {stg.count} ({stg.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className="h-full bg-slate-700"
                    style={{ width: `${stg.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 4: Approval Type */}
        <div className="bg-white border border-slate-300 rounded p-5 shadow-xs space-y-4">
          <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0b2545]">
              4. Approval Type Classification
            </h3>
            <span className="text-[11px] text-slate-500 font-mono">Regulatory Categories</span>
          </div>

          <div className="space-y-3">
            {approvalTypes.map((t, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-slate-800">{t.type}</span>
                    <span className="text-[10px] text-slate-500 block">{t.desc}</span>
                  </div>
                  <span className="font-mono text-slate-600 font-bold shrink-0">
                    {t.count} ({t.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className="h-full bg-[#0b2545]"
                    style={{ width: `${t.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* SLA Compliance Table */}
      <div className="bg-white border border-slate-300 rounded overflow-hidden shadow-xs">
        <div className="bg-[#f8fafc] px-4 py-3 border-b border-slate-200">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#0b2545]">
            Statutory Public Services Guarantee SLA Compliance Matrix
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f1f5f9] text-[#0b2545] font-bold uppercase tracking-wider border-b border-slate-300">
              <tr>
                <th className="px-4 py-2.5 border-r border-slate-200">Clearance / Permit</th>
                <th className="px-4 py-2.5 border-r border-slate-200">Competent Authority</th>
                <th className="px-4 py-2.5 border-r border-slate-200">Statutory SLA</th>
                <th className="px-4 py-2.5 border-r border-slate-200">Avg. Turnaround</th>
                <th className="px-4 py-2.5 text-right">Compliance Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              <tr>
                <td className="px-4 py-3 border-r border-slate-200 font-semibold">Consent to Establish (CTE)</td>
                <td className="px-4 py-3 border-r border-slate-200">MPCB</td>
                <td className="px-4 py-3 border-r border-slate-200 font-mono">45 Days</td>
                <td className="px-4 py-3 border-r border-slate-200 font-mono">24 Days</td>
                <td className="px-4 py-3 text-right font-mono font-bold text-emerald-700">96.8%</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="px-4 py-3 border-r border-slate-200 font-semibold">Building Plan Sanction</td>
                <td className="px-4 py-3 border-r border-slate-200">MIDC Town Planning</td>
                <td className="px-4 py-3 border-r border-slate-200 font-mono">30 Days</td>
                <td className="px-4 py-3 border-r border-slate-200 font-mono">16 Days</td>
                <td className="px-4 py-3 text-right font-mono font-bold text-emerald-700">98.2%</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-r border-slate-200 font-semibold">Provisional Fire NOC</td>
                <td className="px-4 py-3 border-r border-slate-200">Maharashtra Fire Services</td>
                <td className="px-4 py-3 border-r border-slate-200 font-mono">15 Days</td>
                <td className="px-4 py-3 border-r border-slate-200 font-mono">11 Days</td>
                <td className="px-4 py-3 text-right font-mono font-bold text-emerald-700">100.0%</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="px-4 py-3 border-r border-slate-200 font-semibold">Factory Registration Licence</td>
                <td className="px-4 py-3 border-r border-slate-200">DISH</td>
                <td className="px-4 py-3 border-r border-slate-200 font-mono">30 Days</td>
                <td className="px-4 py-3 border-r border-slate-200 font-mono">21 Days</td>
                <td className="px-4 py-3 text-right font-mono font-bold text-emerald-700">94.5%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
