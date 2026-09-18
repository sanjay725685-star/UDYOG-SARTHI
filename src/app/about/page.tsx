'use client';

import React from 'react';
import Link from 'next/link';
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  GitFork,
  FileCheck,
  Award,
  Info,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Government Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-[#0b2545]">Home</Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">About Udyog Sarthi</span>
      </nav>

      {/* Page Title Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center space-x-2 text-xs font-semibold text-[#005a9c] mb-1">
          <Building2 className="w-4 h-4 text-[#005a9c]" />
          <span>Single Window Regulatory Coordination Initiative</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#0b2545] tracking-tight">
          About UDYOG SARTHI (उद्योग सारथी)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          AI-Powered Industrial Approval & Compliance Coordination Platform developed as an advanced digital public infrastructure prototype.
        </p>
      </div>

      {/* Hackathon Prototype Declaration Banner */}
      <div className="p-4 rounded bg-amber-50 border-l-4 border-amber-600 text-amber-950 text-xs shadow-2xs leading-relaxed space-y-1">
        <strong className="text-amber-900 font-bold block uppercase tracking-wider text-[11px]">
          Smart India Hackathon 2026 Prototype Notice
        </strong>
        <p>
          “This prototype is developed for Smart India Hackathon 2026.”
        </p>
        <p className="text-[11px] text-amber-900">
          “AI-assisted information does not constitute statutory approval. Final decisions remain with the competent authority.”
        </p>
      </div>

      {/* Vision & Objectives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-white border border-slate-300 p-6 rounded shadow-xs space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#0b2545] border-b border-slate-200 pb-2">
            The Vision: Frictionless Industrial Clearance
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed">
            Industrial establishment in India typically requires coordination across multiple departmental silos: State Pollution Control Boards, Industrial Development Corporations, Fire Services, Labour Directorates, Electrical Utilities, and Municipal Bodies.
          </p>
          <p className="text-xs text-slate-700 leading-relaxed">
            <strong>UDYOG SARTHI</strong> transforms this fragmented experience into a unified, intelligent single-window journey. By integrating automated regulatory inference, dual-layer OCR pre-scrutiny, and Directed Acyclic Graph (DAG) dependency mapping, it ensures that entrepreneurs submit once and departments review with verified data.
          </p>
        </div>

        <div className="bg-white border border-slate-300 p-6 rounded shadow-xs space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#0b2545] border-b border-slate-200 pb-2">
            Alignment with National Frameworks
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed">
            UDYOG SARTHI is architecturally modeled on established e-governance standards:
          </p>
          <ul className="text-xs text-slate-700 space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>National Single Window System (NSWS):</strong> Coaligned with DPIIT guidelines for Common Application Form (CAF) ingestion.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>State Single Window Act (MAITRI):</strong> Compliant with the Maharashtra Industry, Trade and Investment Facilitation Act 2016.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Public Services Guarantee Act:</strong> Automated SLA countdowns enforcing deemed approval mandates.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Core Architectural Pillars */}
      <div className="bg-white border border-slate-300 p-6 rounded shadow-xs space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#0b2545] border-b border-slate-200 pb-2">
          Key Functional Components
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded space-y-1.5">
            <span className="font-bold text-[#0b2545] block">1. Know Your Approvals (KYA)</span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Rules engine mapping 11 industrial parameters against statutory schedules, identifying exact required permits and documentary requirements.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded space-y-1.5">
            <span className="font-bold text-[#0b2545] block">2. AI-Assisted Pre-Scrutiny</span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Document OCR, corporate identity verification against CBDT/GSTN, and engineering calculation checks to prevent first-pass rejections.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded space-y-1.5">
            <span className="font-bold text-[#0b2545] block">3. Directed Acyclic Graph (DAG)</span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Topological clearance orchestration unlocking parallel processing paths (e.g. Fire NOC and Power Sanction running concurrently).
            </p>
          </div>
        </div>
      </div>

      {/* Action Links */}
      <div className="p-4 bg-slate-100 border border-slate-300 rounded flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <span className="text-slate-700">
          Ready to explore industrial clearances for your proposed unit?
        </span>
        <div className="flex items-center space-x-2">
          <Link
            href="/discovery"
            className="px-3.5 py-1.5 rounded bg-[#0b2545] hover:bg-[#005a9c] text-white font-bold transition"
          >
            Know Your Required Approvals
          </Link>
          <Link
            href="/departments"
            className="px-3.5 py-1.5 rounded bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold transition"
          >
            Departments Directory
          </Link>
        </div>
      </div>

    </div>
  );
}
