'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Download,
  FileCheck,
  Building2,
  Info,
  ArrowRight,
  Filter,
  Search
} from 'lucide-react';

export default function CompliancePage() {
  const [filterDept, setFilterDept] = useState('all');

  const complianceItems = [
    {
      id: 'CMP-01',
      title: 'Annual Environmental Statement (Form V)',
      department: 'MPCB',
      statute: 'Environment (Protection) Rules 1986',
      dueDate: '30 Sep 2026',
      status: 'Upcoming',
      frequency: 'Annual',
      description: 'Audit report of water consumption, raw material balance, and air pollution emissions.'
    },
    {
      id: 'CMP-02',
      title: 'Effluent Treatment Plant (ETP) Continuous Telemetry Upload',
      department: 'MPCB',
      statute: 'Water (Prevention & Control of Pollution) Act 1974',
      dueDate: '15th of Every Month',
      status: 'Active Compliance',
      frequency: 'Monthly',
      description: 'Digital flow meter and pH/TDS sensor telemetry linked to MPCB central monitoring server.'
    },
    {
      id: 'CMP-03',
      title: 'Annual Fire Safety Audit & Certificate of Maintenance (Form B)',
      department: 'Maharashtra Fire Services',
      statute: 'Maharashtra Fire Prevention and Life Safety Measures Act 2006',
      dueDate: '15 Jan 2027',
      status: 'Scheduled',
      frequency: 'Annual',
      description: 'Verification of operational readiness of sprinkler networks, smoke alarms, and hydrant pumps.'
    },
    {
      id: 'CMP-04',
      title: 'Factory Safety Officer Half-Yearly Report (Form 24)',
      department: 'DISH',
      statute: 'Maharashtra Factories Rules 1963',
      dueDate: '15 Jul 2026',
      status: 'Pending Submission',
      frequency: 'Half-Yearly',
      description: 'Occupational health screening reports and machine guarding verification for 250 personnel.'
    },
    {
      id: 'CMP-05',
      title: 'Steam Boiler Annual Hydraulic Test & Fitness Inspection',
      department: 'Directorate of Steam Boilers',
      statute: 'Indian Boilers Act 1923',
      dueDate: '20 Nov 2026',
      status: 'Upcoming',
      frequency: 'Annual',
      description: 'Physical hydraulic pressure test by authorized Boiler Inspector prior to certificate renewal.'
    }
  ];

  const filtered = complianceItems.filter(item => {
    if (filterDept !== 'all' && item.department !== filterDept) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Government Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-[#0b2545]">Home</Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">Compliance & Statutory Renewals</span>
      </nav>

      {/* Page Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#005a9c] mb-1">
            <ShieldCheck className="w-4 h-4 text-[#005a9c]" />
            <span>Post-Clearance Regulatory Governance</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0b2545] tracking-tight">
            Industrial Compliance & Statutory Renewals
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Track periodic returns, statutory environmental statements, occupational health audits, and clearance renewal schedules for ABC Manufacturing Pvt Ltd.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <Link
            href="/dashboard"
            className="px-3.5 py-2 rounded bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition"
          >
            Applicant Dashboard
          </Link>
        </div>
      </div>

      {/* Statutory Guidance Notice */}
      <div className="p-3.5 bg-blue-50 border-l-4 border-[#005a9c] text-slate-800 text-xs leading-relaxed flex items-start space-x-2.5">
        <Info className="w-4 h-4 text-[#005a9c] shrink-0 mt-0.5" />
        <div>
          <strong>Compliance Advisory:</strong> Timely lodgement of statutory returns ensures uninterrupted validity of Consent to Operate and Factory Licences. Automated alert notifications are dispatched 30 days prior to each regulatory deadline.
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 border border-slate-300 rounded shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-600 uppercase">Active Obligations</div>
          <div className="text-2xl font-bold text-[#0b2545] mt-1">5 Statutes</div>
          <div className="text-[10px] text-slate-500 mt-0.5">MPCB, DISH, Fire, Boilers</div>
        </div>

        <div className="bg-white p-3.5 border border-slate-300 rounded shadow-2xs">
          <div className="text-[11px] font-semibold text-emerald-700 uppercase">In Full Compliance</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">100%</div>
          <div className="text-[10px] text-emerald-600 mt-0.5">Zero default notices</div>
        </div>

        <div className="bg-white p-3.5 border border-slate-300 rounded shadow-2xs">
          <div className="text-[11px] font-semibold text-amber-700 uppercase">Next Action Due</div>
          <div className="text-2xl font-bold text-amber-700 mt-1">15 Jul 2026</div>
          <div className="text-[10px] text-amber-600 mt-0.5">DISH Form 24 Half-Yearly</div>
        </div>

        <div className="bg-white p-3.5 border border-slate-300 rounded shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-700 uppercase">Telemetry Uplink</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">Online (24x7)</div>
          <div className="text-[10px] text-slate-500 mt-0.5">ETP & Stack telemetry live</div>
        </div>
      </div>

      {/* Filter Strip */}
      <div className="bg-white border border-slate-300 p-3.5 rounded shadow-xs flex items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <label className="text-xs font-semibold text-slate-700">Filter Department:</label>
          <select
            value={filterDept}
            onChange={e => setFilterDept(e.target.value)}
            className="text-xs p-1.5 border border-slate-300 rounded bg-white focus:outline-none focus:border-[#005a9c]"
          >
            <option value="all">All Departments</option>
            <option value="MPCB">MPCB (Pollution)</option>
            <option value="Maharashtra Fire Services">Fire Services</option>
            <option value="DISH">DISH (Labour & Safety)</option>
            <option value="Directorate of Steam Boilers">Steam Boilers</option>
          </select>
        </div>

        <span className="text-[11px] text-slate-500 font-mono">
          Showing {filtered.length} Regulatory Obligations
        </span>
      </div>

      {/* Compliance Obligations Table */}
      <div className="bg-white border border-slate-300 rounded overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f1f5f9] text-[#0b2545] font-bold uppercase tracking-wider border-b border-slate-300">
              <tr>
                <th className="px-4 py-3 border-r border-slate-200">Obligation / Return Title</th>
                <th className="px-4 py-3 border-r border-slate-200">Department</th>
                <th className="px-4 py-3 border-r border-slate-200">Governing Statute</th>
                <th className="px-4 py-3 border-r border-slate-200">Frequency</th>
                <th className="px-4 py-3 border-r border-slate-200">Statutory Due Date</th>
                <th className="px-4 py-3 border-r border-slate-200">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {filtered.map(item => {
                const statusBadge =
                  item.status === 'Active Compliance'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : item.status === 'Pending Submission'
                    ? 'bg-amber-50 text-amber-900 border-amber-300'
                    : 'bg-blue-50 text-[#005a9c] border-blue-300';

                return (
                  <tr key={item.id} className="hover:bg-slate-50 transition">
                    <td className="px-4 py-3 border-r border-slate-200">
                      <div className="font-bold text-slate-900">{item.title}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{item.description}</div>
                    </td>
                    <td className="px-4 py-3 border-r border-slate-200 font-semibold text-slate-700">
                      {item.department}
                    </td>
                    <td className="px-4 py-3 border-r border-slate-200 text-slate-600">
                      {item.statute}
                    </td>
                    <td className="px-4 py-3 border-r border-slate-200 text-slate-700 font-medium">
                      {item.frequency}
                    </td>
                    <td className="px-4 py-3 border-r border-slate-200 font-mono font-bold text-slate-900">
                      {item.dueDate}
                    </td>
                    <td className="px-4 py-3 border-r border-slate-200">
                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded border ${statusBadge}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => alert(`Opening statutory filing portal for ${item.title}`)}
                        className="px-2.5 py-1 rounded bg-[#0b2545] hover:bg-[#005a9c] text-white text-xs font-semibold transition"
                      >
                        File Return
                      </button>
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
