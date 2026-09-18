'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Server,
  RefreshCw,
  Eye,
  FileCheck,
  History,
  ArrowRight
} from 'lucide-react';

export default function RiskMitigationPage() {
  const strategies = [
    {
      challenge: 'AI Extraction & OCR Error Risk',
      solution: 'Human-Verified Dual-Layer Pre-Audit',
      icon: Eye,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      details: 'All extracted parameters are displayed side-by-side with original document bounding boxes. The applicant verifies extracted fields during upload, and the scrutiny officer must explicitly confirm them before issuing sanctions. Zero autonomous decisions.'
    },
    {
      challenge: 'Legacy Departmental IT Integration',
      solution: 'Decoupled REST & Webhook Adapters',
      icon: Server,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      details: 'UDYOG SARTHI does not touch legacy SQL databases directly. Instead, lightweight stateless micro-adapters poll or receive standardized JSON payloads conforming to IndEA 2.0 standards, supporting air-gapped departmental networks.'
    },
    {
      challenge: 'Regulatory Scope & Micro-Sector Complexity',
      solution: 'Phased Corridor Deployment & Modular Templates',
      icon: RefreshCw,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
      details: 'Rollout begins in focused industrial clusters (e.g. Automobile/EV in Chakan Phase II, Pharmaceuticals in Kurkumbh). Local bye-laws are encoded as modular, composable rule plugins without perturbing core platform logic.'
    },
    {
      challenge: 'Blueprint Privacy & Trade Secret Exposure',
      solution: 'Zero-Trust Storage & RBAC Data Isolation',
      icon: Lock,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
      details: 'Engineering blueprints and financial audits are encrypted at rest with AES-256 and accessible strictly via short-lived signed URLs. Multi-tenant database row-level security (RLS) ensures competitor enterprises can never access cross-entity files.'
    },
    {
      challenge: 'Dynamic Regulatory & Gazette Amendments',
      solution: 'Declarative Rules Engine with Semantic Versioning',
      icon: History,
      color: 'text-teal-600 bg-teal-50 border-teal-200',
      details: 'Statutory rules are decoupled from code. Administrators can update investment thresholds, DCR clauses, or SLA days in the visual Rules Engine, generating versioned rules (e.g. v2.4 ➔ v2.5) with full historical rollback capabilities.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Top Header */}
      <div className="border-b border-slate-200 pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Smart India Hackathon 2026 Evaluation Criterion
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-3">
          Engineered Risk Mitigation Strategies
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Architectural, cryptographic, and procedural guardrails guaranteeing safety, compliance, and institutional trust.
        </p>
      </div>

      {/* Strategies Grid */}
      <div className="space-y-5">
        {strategies.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-3 hover:border-emerald-300 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-xl border ${s.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
                      Challenge: {s.challenge}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">{s.solution}</h3>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 self-start sm:self-center">
                  Engineered Defense
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed max-w-4xl">
                {s.details}
              </p>
            </div>
          );
        })}
      </div>

      {/* Direct links to Security and Rules Engine */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/security"
          className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 flex items-center justify-between hover:bg-slate-800 transition"
        >
          <div>
            <div className="text-xs font-bold text-emerald-400">Security Architecture</div>
            <div className="text-xs text-slate-300 mt-0.5">Explore our JWT, RBAC, and encryption specifications</div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </Link>

        <Link
          href="/admin/rules"
          className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 flex items-center justify-between hover:bg-slate-800 transition"
        >
          <div>
            <div className="text-xs font-bold text-purple-400">Rules Engine Management</div>
            <div className="text-xs text-slate-300 mt-0.5">Inspect version-controlled declarative rules</div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </Link>
      </div>

    </div>
  );
}
