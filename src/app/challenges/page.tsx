'use client';

import React from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  FileSearch,
  Server,
  Layers,
  Lock,
  RefreshCw,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function ChallengesPage() {
  const risks = [
    {
      id: 'RISK-01',
      title: 'AI Document Extraction & OCR Hallucination Risk',
      icon: FileSearch,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      description: 'Industrial blueprints, handwritten notary stamps, rotated architect drawings, and low-dpi scanned PDFs can produce OCR parsing errors or numeric hallucinations in chemical flow capacities if left unchecked.'
    },
    {
      id: 'RISK-02',
      title: 'Legacy Departmental IT Integration Risk',
      icon: Server,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      description: 'Certain state department portals operate on 15-year-old monolithic architectures lacking modern REST APIs or webhook callbacks. Direct database coupling is prohibited under state security guidelines.'
    },
    {
      id: 'RISK-03',
      title: 'Regulatory Scope & Sectoral Complexity Risk',
      icon: Layers,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
      description: 'India spans 28 states, 8 Union Territories, and hundreds of industrial micro-sectors with hyper-local building bye-laws (DCR), municipal fire codes, and varying pollution thresholds across industrial estates.'
    },
    {
      id: 'RISK-04',
      title: 'Data Security, Blueprint Privacy & Trade Secret Risk',
      icon: Lock,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
      description: 'Industrial blueprints contain proprietary factory machinery layouts, confidential chemical formulations, and intellectual property. Unauthorized data exposure would compromise competitive enterprise advantage.'
    },
    {
      id: 'RISK-05',
      title: 'Dynamic Regulatory Change & Gazette Amendments Risk',
      icon: RefreshCw,
      color: 'text-teal-600 bg-teal-50 border-teal-200',
      description: 'Pollution control boards and urban planning bodies frequently issue gazette amendments modifying Red/Orange/Green categorization, building FSI multipliers, or boiler inspection rules, rendering static logic obsolete.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Top Header */}
      <div className="border-b border-slate-200 pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
          Smart India Hackathon 2026 Evaluation Criterion
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-3">
          Challenges & Systemic Regulatory Risks
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Rigorous threat modeling addressing technical, operational, and legal pitfalls in public governance digitization.
        </p>
      </div>

      {/* 5 Risk Cards */}
      <div className="space-y-4">
        {risks.map(r => {
          const Icon = r.icon;
          return (
            <div
              key={r.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 hover:border-slate-300 transition"
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-xl border ${r.color} shrink-0 mt-0.5`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-slate-400">{r.id}</span>
                    <h3 className="text-base font-bold text-slate-900">{r.title}</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                    {r.description}
                  </p>
                </div>
              </div>

              <Link
                href="/risk-mitigation"
                className="shrink-0 flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 transition"
              >
                <span>View Mitigation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          );
        })}
      </div>

      {/* Call to Action to Risk Mitigation */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-sarthi-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-bold">Every challenge has an engineered defense.</h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Explore our human-in-the-loop guardrails, modular API adapters, and zero-trust encryption matrix.
          </p>
        </div>
        <Link
          href="/risk-mitigation"
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition shadow-md shrink-0"
        >
          <span>Risk Mitigation Strategies</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
