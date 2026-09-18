'use client';

import React from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Building2,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  IndianRupee,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function ViabilityPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Top Header */}
      <div className="border-b border-slate-200 pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
          Smart India Hackathon 2026 Evaluation Criterion
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-3">
          Commercial Viability & GovTech Sustainability Model
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Dual-engine financial model supporting universal open public governance while delivering enterprise B2B compliance coordination.
        </p>
      </div>

      {/* 3 Value Propositions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Value for Entrepreneurs</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Eliminates external regulatory liaison consultants who charge ₹5–15 Lakhs for routine industrial follow-ups.
            Entrepreneurs gain complete agency, real-time tracking, and automated document validation directly from their dashboard.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Value for Government Departments</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Reduces officer burnout and paper backlog by 45%. Automates routine completeness screening so technical engineers
            can focus strictly on genuine environmental and fire hazard evaluations rather than chasing missing GST numbers.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Value as a Sustainable Platform</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Designed as a high-efficiency GovTech utility that costs a fraction of monolithic legacy IT contracts.
            Supported via State Industrial Development Corp annual service contracts and enterprise multi-plant compliance suites.
          </p>
        </div>

      </div>

      {/* Business & Sustainability Architecture */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <h3 className="text-lg font-bold text-slate-900">
          Dual Operational & Revenue Framework
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Tier 1: GovTech DPI */}
          <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sarthi-700 bg-sarthi-50 px-2.5 py-0.5 rounded border border-sarthi-200">
              Tier 1: Digital Public Infrastructure (DPI) Model
            </span>
            <h4 className="text-base font-bold text-slate-900">State Industrial Portal License</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Adopted by State Single Window Clearance Cells (e.g. MAITRI Maharashtra, iNDEXTb Gujarat, Guidance Tamil Nadu)
              as a public utility. Free for all registered MSME entrepreneurs. Funded via departmental EoDB modernisation grants.
            </p>
            <div className="pt-2 text-xs font-mono text-emerald-700 font-bold">
              ROI: Over 12x return in accelerated state GST collections from operational factories.
            </div>
          </div>

          {/* Tier 2: B2B Enterprise */}
          <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded border border-purple-200">
              Tier 2: Enterprise Industrial Coordination (B2B SaaS)
            </span>
            <h4 className="text-base font-bold text-slate-900">Private Industrial Parks & Conglomerates</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Automated compliance coordination suite for private SEZ operators (e.g. Mahindra World City, Reliance MET, Foxconn suppliers)
              managing multi-plant statutory renewals, continuous emission sensor telemetry, and annual return filings.
            </p>
            <div className="pt-2 text-xs font-mono text-purple-700 font-bold">
              Subscription Model: Predictable recurring revenue for ongoing platform R&D.
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
