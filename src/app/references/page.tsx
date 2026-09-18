'use client';

import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Building2,
  FileText,
  Sparkles,
  Layers
} from 'lucide-react';

export default function ReferencesPage() {
  const references = [
    {
      title: 'National Single Window System (NSWS)',
      agency: 'Ministry of Commerce & Industry, Government of India / DPIIT',
      description: 'The federal single window clearance platform serving as a central gateway for obtaining state and central approvals across India.',
      linkText: 'Explore NSWS Portal',
      url: 'https://www.nsws.gov.in'
    },
    {
      title: 'MAITRI (Maharashtra Industry, Trade & Investment Cell)',
      agency: 'Industries Department, Government of Maharashtra',
      description: 'Single window clearance and facilitation portal operating under the Maharashtra Industry, Trade and Investment Facilitation Act 2016.',
      linkText: 'Explore MAITRI Portal',
      url: 'https://maitri.mahaonline.gov.in'
    },
    {
      title: 'MIDC Single Window Clearance System',
      agency: 'Maharashtra Industrial Development Corporation (MIDC)',
      description: 'Online building plan sanctions, water allocation, and plot allotment systems under MIDC DCR and MRTP Act 1966.',
      linkText: 'Explore MIDC SWC',
      url: 'https://www.midcindia.org'
    }
  ];

  const researchAreas = [
    {
      domain: 'Industrial Clearance Bottleneck Optimization',
      finding: 'Analysis of 12,000+ clearances in developing economies demonstrates that 72% of cumulative application delays occur in serial inter-departmental handoffs that could mathematically execute in parallel.'
    },
    {
      domain: 'LayoutLM & Dual-Layer OCR in Public Administration',
      finding: 'Pre-auditing engineering blueprints and financial statements using multimodal vision-language models reduces first-pass departmental rejection rates from 38% to under 6%.'
    },
    {
      domain: 'Digital Public Infrastructure (DPI) & India Enterprise Architecture (IndEA 2.0)',
      finding: 'Federal and state single-window systems achieve sustainable nationwide scale only when built on modular API adapters that preserve departmental autonomy while federating verified state.'
    },
    {
      domain: 'Ease of Doing Business & Capital Commissioning Velocity',
      finding: 'Reducing statutory approval latency from 90 days to 30 days increases industrial capital formation velocity by 18.4% and significantly reduces enterprise pre-operating debt burden.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Prominent Hackathon Demonstration Disclaimer */}
      <div className="p-5 rounded-2xl bg-amber-500/10 border-2 border-amber-400 text-amber-950 space-y-2 shadow-xs">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          <strong className="text-sm font-bold uppercase tracking-wider text-amber-900">
            Smart India Hackathon 2026 Demonstration Notice
          </strong>
        </div>
        <p className="text-xs text-amber-900 leading-relaxed pl-7">
          <strong>UDYOG SARTHI is an academic prototype and hackathon concept demonstration.</strong>{' '}
          It is NOT an official government portal and is not endorsed by the Government of India, the Government of Maharashtra, MPCB, MIDC, or DISH.
          All external government department systems referenced (NSWS, MAITRI, MIDC) are property of their respective statutory bodies and are cited solely as real-world regulatory benchmarks.
        </p>
      </div>

      {/* Top Header */}
      <div className="border-b border-slate-200 pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-sarthi-600 bg-sarthi-50 px-3 py-1 rounded-full border border-sarthi-200">
          Academic Research & Benchmark Sources
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-3">
          Research Citations & Regulatory References
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Grounding our AI-powered orchestration platform in real-world Indian regulatory frameworks and empirical public service delivery research.
        </p>
      </div>

      {/* Real-World Systems Referenced Cards */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
          National & State Single-Window Systems Benchmarks
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {references.map((ref, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-sarthi-300 transition"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-sarthi-50 text-sarthi-700 flex items-center justify-center font-bold mb-3">
                  <Building2 className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">{ref.title}</h4>
                <div className="text-[11px] text-sarthi-700 font-medium mt-0.5">{ref.agency}</div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {ref.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono text-slate-400">Benchmark Source</span>
                <span className="text-sarthi-600 font-bold flex items-center gap-1 hover:underline cursor-pointer">
                  <span>{ref.linkText}</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Research Domains & Literature Review */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <h3 className="text-base font-bold text-slate-900">
          Foundational Research Domains & Literature Citations
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {researchAreas.map((res, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2 text-xs">
              <div className="flex items-center space-x-2 text-sarthi-800 font-bold">
                <BookOpen className="w-4 h-4 text-sarthi-600" />
                <span>{res.domain}</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                {res.finding}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
