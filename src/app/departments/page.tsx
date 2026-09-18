'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  Search,
  Filter,
  ArrowRight,
  Info,
  ShieldCheck,
  ExternalLink,
  Phone,
  FileCheck,
  GitFork
} from 'lucide-react';

export default function DepartmentsPage() {
  const [search, setSearch] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');

  const departments = [
    {
      id: 'mpcb',
      name: 'Maharashtra Pollution Control Board (MPCB)',
      shortCode: 'MPCB',
      function: 'Environmental preservation, air & water pollution prevention, wastewater discharge standards, and hazardous waste regulation under Water Act 1974 and Air Act 1981.',
      clearance: 'Consent to Establish (CTE) & Consent to Operate (CTO)',
      level: 'State Government',
      status: 'Active (Single Window Gateway)',
      contactHelp: 'Single Window Nodal Cell • Helpline: 1800-11-8899 • helpdesk-mpcb@gov.in'
    },
    {
      id: 'midc',
      name: 'Maharashtra Industrial Development Corporation (MIDC)',
      shortCode: 'MIDC',
      function: 'Industrial estate administration, plot allotment, architectural building plan sanctions, drainage, and bulk industrial water connectivity under MIDC Act 1961.',
      clearance: 'Plot Allotment, Building Plan Approval, Piped Water Allocation',
      level: 'State Statutory Authority',
      status: 'Active (Single Window Gateway)',
      contactHelp: 'MIDC SWC Facilitation Centre • Helpline: 1800-11-8899 • swc-midc@gov.in'
    },
    {
      id: 'mfs',
      name: 'Maharashtra Fire Services (Directorate of Fire Prevention)',
      shortCode: 'MFS',
      function: 'Fire prevention scrutiny, means of escape verification, industrial fire hydrants, and life safety compliance under Maharashtra Fire Safety Act 2006.',
      clearance: 'Provisional Fire NOC & Final Fire Safety Certificate',
      level: 'State Government',
      status: 'Active (Single Window Gateway)',
      contactHelp: 'Fire Safety Clearance Cell • Helpline: 1800-11-8899 • fire-safety@gov.in'
    },
    {
      id: 'dish',
      name: 'Directorate of Industrial Safety & Health (DISH)',
      shortCode: 'DISH',
      function: 'Occupational safety, worker health standards, dangerous machinery safeguards, and industrial layout registration under Factories Act 1948.',
      clearance: 'Factory Licence & Machinery Layout Plan Approval',
      level: 'State Directorate (Labour Dept)',
      status: 'Active (Single Window Gateway)',
      contactHelp: 'Factory Inspection Desk • Helpline: 1800-11-8899 • dish-desk@gov.in'
    },
    {
      id: 'msedcl',
      name: 'Maharashtra State Electricity Distribution Co. Ltd. (MSEDCL)',
      shortCode: 'MSEDCL',
      function: 'Electrical distribution infrastructure, transformer load sanction, HT substations, and transmission connectivity under Electricity Act 2003.',
      clearance: 'High Tension (HT) 11kV Power Feasibility Sanction',
      level: 'State Distribution Utility',
      status: 'Active (Single Window Gateway)',
      contactHelp: 'HT Power Feasibility Wing • Helpline: 1800-11-8899 • htpower-desk@gov.in'
    },
    {
      id: 'boilers',
      name: 'Directorate of Steam Boilers',
      shortCode: 'DSB',
      function: 'Pressure vessel safety inspection, steam pipeline hydraulic tests, and boiler registration under Indian Boilers Act 1923.',
      clearance: 'Steam Boiler & Pipeline Erection Sanction',
      level: 'Central / State Statutory Body',
      status: 'Active (Single Window Gateway)',
      contactHelp: 'Boiler Inspection Bureau • Helpline: 1800-11-8899 • boilers-help@gov.in'
    },
    {
      id: 'cpcb',
      name: 'Central Pollution Control Board (CPCB) / MoEFCC',
      shortCode: 'CPCB',
      function: 'Apex regulatory classification of industrial sectors (Red/Orange/Green/White), environmental standards, and national single-window interlinks.',
      clearance: 'National Industrial Categorization & Central Clearances',
      level: 'Central Government',
      status: 'Active (National Gateway Interlink)',
      contactHelp: 'Central Single Window Desk • Helpline: 1800-11-8899 • nsws-helpdesk@gov.in'
    }
  ];

  const filtered = departments.filter(d => {
    if (filterLevel !== 'all' && d.level !== filterLevel) return false;
    if (search.trim()) {
      return (
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.shortCode.toLowerCase().includes(search.toLowerCase()) ||
        d.function.toLowerCase().includes(search.toLowerCase()) ||
        d.clearance.toLowerCase().includes(search.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Government Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-[#0b2545]">Home</Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">Departments & Agencies</span>
      </nav>

      {/* Page Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#005a9c] mb-1">
            <Building2 className="w-4 h-4 text-[#005a9c]" />
            <span>Participating Regulatory Bodies & Authorities</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0b2545] tracking-tight">
            Departments & Agencies
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Directory of central, state, and utility authorities integrated with UDYOG SARTHI for single-window clearances and compliance coordination.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <Link
            href="/discovery"
            className="px-3.5 py-2 rounded bg-[#0b2545] hover:bg-[#005a9c] text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <span>Know Your Approvals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Statutory Advisory Notice */}
      <div className="p-3.5 bg-blue-50 border-l-4 border-[#005a9c] text-slate-800 text-xs leading-relaxed flex items-start space-x-2.5">
        <Info className="w-4 h-4 text-[#005a9c] shrink-0 mt-0.5" />
        <div>
          <strong>Facilitation Notice:</strong> All participating departments operate within mandated statutory time limits specified under the Public Services Guarantee Act. Contact points connect directly to the Single Window Facilitation Helpdesk.
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-300 p-3.5 rounded shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <label className="text-xs font-semibold text-slate-700">Filter Jurisdiction:</label>
          <select
            value={filterLevel}
            onChange={e => setFilterLevel(e.target.value)}
            className="text-xs p-1.5 border border-slate-300 rounded bg-white focus:outline-none focus:border-[#005a9c]"
          >
            <option value="all">All Jurisdictions</option>
            <option value="State Government">State Government</option>
            <option value="State Statutory Authority">State Statutory Authority</option>
            <option value="State Distribution Utility">State Distribution Utility</option>
            <option value="Central Government">Central Government</option>
          </select>
        </div>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search Department or Clearance..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full text-xs p-1.5 pl-8 border border-slate-300 rounded bg-white focus:outline-none focus:border-[#005a9c]"
          />
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {/* =========================================================================
          SECTION 14: STRUCTURED DEPARTMENTS & AGENCIES TABLE
         ========================================================================= */}
      <div className="bg-white border border-slate-300 rounded overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f1f5f9] text-[#0b2545] font-bold uppercase tracking-wider border-b border-slate-300">
              <tr>
                <th className="px-4 py-3 border-r border-slate-200 w-1/4">Department / Agency</th>
                <th className="px-4 py-3 border-r border-slate-200 w-1/4">Function</th>
                <th className="px-4 py-3 border-r border-slate-200">Approval / Clearance</th>
                <th className="px-4 py-3 border-r border-slate-200">Level</th>
                <th className="px-4 py-3 border-r border-slate-200">Application Status</th>
                <th className="px-4 py-3">Contact / Help</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {filtered.map(dept => (
                <tr key={dept.id} className="hover:bg-slate-50 transition">
                  
                  {/* Department / Agency */}
                  <td className="px-4 py-3 border-r border-slate-200 align-top">
                    <div className="font-bold text-slate-900">{dept.name}</div>
                    <span className="inline-block text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 mt-1">
                      {dept.shortCode}
                    </span>
                  </td>

                  {/* Function */}
                  <td className="px-4 py-3 border-r border-slate-200 text-slate-600 leading-relaxed align-top">
                    {dept.function}
                  </td>

                  {/* Approval / Clearance */}
                  <td className="px-4 py-3 border-r border-slate-200 font-medium text-[#005a9c] align-top">
                    {dept.clearance}
                  </td>

                  {/* Level */}
                  <td className="px-4 py-3 border-r border-slate-200 text-slate-700 align-top">
                    <span className="text-[11px] font-semibold bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {dept.level}
                    </span>
                  </td>

                  {/* Application Status */}
                  <td className="px-4 py-3 border-r border-slate-200 align-top">
                    <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-300">
                      {dept.status}
                    </span>
                  </td>

                  {/* Contact / Help */}
                  <td className="px-4 py-3 text-slate-600 text-[11px] leading-relaxed align-top">
                    {dept.contactHelp}
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
