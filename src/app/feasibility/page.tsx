'use client';

import React from 'react';
import Link from 'next/link';
import {
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Server,
  ArrowRight,
  Sparkles,
  Milestone
} from 'lucide-react';

export default function FeasibilityPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Top Header */}
      <div className="border-b border-slate-200 pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Smart India Hackathon 2026 Evaluation Criterion
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-3">
          Technical Feasibility & Phased Rollout Strategy
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Proven, production-grade architecture combining modern web frameworks with fail-safe AI decision support.
        </p>
      </div>

      {/* 3 Pillars of Feasibility */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Pillar 1 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">1. Lean & Proven Tech Stack</h3>
          <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
            <li><strong>Frontend:</strong> Next.js 14 App Router, React, Tailwind CSS for server-rendered speed and accessible UI components.</li>
            <li><strong>Graph Topology:</strong> React Flow on frontend, NetworkX-style DAG traversal algorithms for critical path calculation.</li>
            <li><strong>Backend APIs:</strong> Modular REST microservices designed for low-latency state single-window ingestion.</li>
            <li><strong>Data Integrity:</strong> PostgreSQL relational schema with immutable append-only audit logging for statutory defensibility.</li>
          </ul>
        </div>

        {/* Pillar 2 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">2. Safe AI Architecture</h3>
          <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
            <li><strong>Zero Autonomous Sanctions:</strong> The AI model never approves or rejects an application independently.</li>
            <li><strong>Human-in-the-Loop Scrutiny:</strong> AI performs OCR extraction, parameter verification, and risk scoring; the officer reviews and signs.</li>
            <li><strong>Deterministic Rule Fallbacks:</strong> Core environmental thresholds are enforced by hard-coded statutory rules, not hallucinating LLMs.</li>
            <li><strong>Pre-Audit Shield:</strong> Catches errors in applicant drafts before they enter departmental official registers.</li>
          </ul>
        </div>

        {/* Pillar 3 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Server className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">3. API-Ready Decoupled Adapters</h3>
          <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
            <li><strong>Non-Invasive Overlay:</strong> Operates as an intelligent coordination layer on top of existing portal databases.</li>
            <li><strong>Webhook Bridges:</strong> Ingests Common Application Forms (CAF) from NSWS and MAITRI without requiring core rewrites.</li>
            <li><strong>Offline/Batch Resilient:</strong> Syncs asynchronous document approvals via background message queues.</li>
            <li><strong>Standard Data Formats:</strong> JSON Schemas conforming to India Enterprise Architecture (IndEA 2.0).</li>
          </ul>
        </div>

      </div>

      {/* Practical 3-Phase Rollout Plan */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <h3 className="text-lg font-bold text-slate-900">
          Practical 3-Phase Implementation Roadmap
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-5 rounded-xl border border-blue-200 bg-blue-50/50 space-y-2.5">
            <div className="text-xs font-mono font-bold text-blue-700 uppercase">Phase 1: Months 1–6</div>
            <h4 className="text-sm font-bold text-slate-900">Pilot in Pune MIDC (Chakan Industrial Corridor)</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Focus on Automobile, EV Components, and Heavy Engineering. Partner with MPCB Pune SRO, MIDC Chakan office, and DIC.
              Validate OCR accuracy on 500 live industrial dossiers.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2.5">
            <div className="text-xs font-mono font-bold text-emerald-700 uppercase">Phase 2: Months 7–14</div>
            <h4 className="text-sm font-bold text-slate-900">Statewide Integration with Maharashtra MAITRI</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Deploy across all 36 districts of Maharashtra. Expand rule templates to Chemical, Agro-processing, and Pharmaceuticals.
              Full integration with MAITRI Single Window Clearance cell.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-purple-200 bg-purple-50/50 space-y-2.5">
            <div className="text-xs font-mono font-bold text-purple-700 uppercase">Phase 3: Months 15–24</div>
            <h4 className="text-sm font-bold text-slate-900">National Federation with NSWS (Govt of India)</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Federal rollout bridging Central Ministries (MoEFCC, CPCB, Petroleum, Labour) with State Single Windows under DPIIT National Single Window System framework.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
