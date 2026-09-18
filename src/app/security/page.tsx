'use client';

import React from 'react';
import Link from 'next/link';
import {
  Shield,
  Lock,
  Key,
  Database,
  EyeOff,
  FileCheck,
  CheckCircle2,
  Server,
  UserCheck,
  History,
  ArrowRight
} from 'lucide-react';

export default function SecurityArchitecturePage() {
  const rbacMatrix = [
    { module: 'File Common Application Form (CAF)', entrepreneur: 'Full (Write)', officer: 'Read Only', nodal: 'Read Only', admin: 'Audit View' },
    { module: 'Upload & Pre-Audit Blueprints', entrepreneur: 'Full (Upload)', officer: 'Read & Annotate', nodal: 'View Metadata', admin: 'Audit View' },
    { module: 'Issue Statutory Query Notice', entrepreneur: 'No Access', officer: 'Full (Issue/Close)', nodal: 'Escalate If Overdue', admin: 'Audit View' },
    { module: 'Respond to Department Query', entrepreneur: 'Full (Submit)', officer: 'Read & Scrutinize', nodal: 'Track Response SLA', admin: 'Audit View' },
    { module: 'Grant / Reject Sanction Order', entrepreneur: 'No Access', officer: 'Full Statutory Power', nodal: 'No Access', admin: 'Audit View' },
    { module: 'Configure Regulatory Rules Engine', entrepreneur: 'No Access', officer: 'Suggest Modification', nodal: 'Suggest Modification', admin: 'Full (Deploy/Rollback)' },
    { module: 'View Cross-Enterprise Analytics', entrepreneur: 'Own Company Only', officer: 'Own Department Only', nodal: 'Statewide Aggregates', admin: 'Full Telemetry' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Top Header */}
      <div className="border-b border-slate-200 pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Enterprise Security Standard
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-3">
          Security Architecture & Defense-in-Depth
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Zero-trust security model designed for sensitive industrial designs, environmental records, and statutory decisions.
        </p>
      </div>

      {/* 4 Core Pillars of Platform Security */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 w-fit">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Data Encryption</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            TLS 1.3 in transit with strict HSTS. AES-256-GCM encryption at rest with customer-managed cryptographic key rotation.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 w-fit">
            <Key className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">JWT & Session Isolation</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Stateless RS256 signed JSON Web Tokens with short 15-minute expirations and cryptographic refresh token rotation.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 w-fit">
            <History className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Immutable Audit Trails</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every file upload, query issuance, and sanction order is hashed with SHA-256 and appended to an unalterable log.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 w-fit">
            <EyeOff className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Zero Client-Side Exposure</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Sensitive tax IDs and passwords are sanitized server-side. Document previews are delivered via signed time-bound URLs.
          </p>
        </div>
      </div>

      {/* Complete RBAC Matrix Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-sm font-bold text-slate-900">
            Role-Based Access Control (RBAC) Entitlement Matrix
          </h3>
          <p className="text-xs text-slate-500">Enforced by middleware guards on every REST route and UI view</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-5 py-3.5">Platform Operation / Capability</th>
                <th className="px-5 py-3.5">🏢 Entrepreneur</th>
                <th className="px-5 py-3.5">👮 Scrutiny Officer</th>
                <th className="px-5 py-3.5">🏛️ Nodal Officer</th>
                <th className="px-5 py-3.5">⚙️ System Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {rbacMatrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition">
                  <td className="px-5 py-3.5 font-bold text-slate-900">{row.module}</td>
                  <td className="px-5 py-3.5 font-medium text-slate-700">{row.entrepreneur}</td>
                  <td className="px-5 py-3.5 font-medium text-emerald-800">{row.officer}</td>
                  <td className="px-5 py-3.5 font-medium text-amber-800">{row.nodal}</td>
                  <td className="px-5 py-3.5 font-mono text-purple-800 font-semibold">{row.admin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Statutory Document Sandbox Specifications */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Document Sandboxing & Antivirus Pipeline
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed max-w-4xl">
          All uploaded files (PDF, JPG, PNG, DOCX) pass through an isolated sandboxed quarantine container before reaching departmental review.
          Files undergo ClamAV binary inspection, MIME-type magic-number validation (preventing extension spoofing), and file size restriction (&lt; 25MB).
          Dossiers are mirrored to redundant multi-region object storage with version locks to guarantee legal non-repudiation.
        </p>
      </div>

    </div>
  );
}
