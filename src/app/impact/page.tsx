'use client';

import React from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  Building2,
  ShieldCheck,
  Leaf,
  Users,
  Award,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function ImpactBenefitsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Top Header */}
      <div className="border-b border-slate-200 pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-sarthi-600 bg-sarthi-50 px-3 py-1 rounded-full border border-sarthi-200">
          Smart India Hackathon 2026 Evaluation Criterion
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-3">
          Impact & Quantitative Socio-Economic Benefits
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Measurable transformative outcomes delivered across Entrepreneurs, Government Authorities, the Economy, Society, and the Environment.
        </p>
      </div>

      {/* 5 Distinct Impact Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* 1. Impact for Entrepreneurs */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">For Entrepreneurs & MSMEs</h3>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Single Submission, Zero Duplication:</strong> Upload GSTIN, blueprints, and corporate PAN once; re-use across all 6 departments.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>60%+ Faster Clearances:</strong> Average turnaround reduced from 82 days to 26.4 days through parallel tracking.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Transparent DAG Tracking:</strong> Always know exact stage, officer in charge, and reason for any blockage.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Automated Risk Alerts:</strong> Proactive notification before SLA expiration or certificate validity lapses.</span>
            </li>
          </ul>
        </div>

        {/* 2. Impact for Government Departments */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">For Government Departments</h3>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>45% Reduction in Scrutiny Load:</strong> AI Pre-Audit filters out incomplete dossiers, invalid seals, and mismatched equations.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Early Query Resolution:</strong> Queries resolved in 3–4 days via interactive upload rather than months of postal summons.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Automated SLA Monitoring:</strong> Citizen Charter compliance tracked automatically with zero manual spreadsheet logging.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Cross-Department Transparency:</strong> MPCB, DISH, and Fire wings share common verified blueprints securely.</span>
            </li>
          </ul>
        </div>

        {/* 3. Economic Impact */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Macro Economic Impact</h3>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Faster Capital Deployment:</strong> Unlocks ₹1,400+ Cr of industrial capex months ahead of scheduled commercial operations (COD).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Ease of Doing Business (EoDB):</strong> Strengthens India and Maharashtra rankings under DPIIT Business Reforms Action Plan (BRAP).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Reduced Idle Overhead:</strong> Eliminates ₹2+ Lakhs/day interest drain on stalled factory capex financing.</span>
            </li>
          </ul>
        </div>

        {/* 4. Social & Workforce Impact */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Social & Employment Impact</h3>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Accelerated Job Creation:</strong> Fast-tracks hiring for 250+ workers per medium manufacturing enterprise.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Safer Workplace Standards:</strong> Mandatory verification of machine safety guards, emergency exits, and labour welfare rules.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Formal Labour Contracts:</strong> Form V and Contract Labour Act enforcement guarantees minimum wages and ESI coverage.</span>
            </li>
          </ul>
        </div>

        {/* 5. Environmental Sustainability */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <Leaf className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Environmental Protection</h3>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Zero Liquid Discharge (ZLD) Adherence:</strong> Algorithmic verification of reverse osmosis and multi-effect evaporator sizing.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Hazardous Waste Tracking:</strong> Ensures valid membership agreements with common TSDF facilities before grant of CTE.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Continuous Monitoring (OCEMS):</strong> IoT telemetry readiness baked into preliminary industrial consent conditions.</span>
            </li>
          </ul>
        </div>

      </div>

    </div>
  );
}
