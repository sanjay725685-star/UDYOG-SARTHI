'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '../../../../context/AppContext';
import CertificateModal from '../../../../components/CertificateModal';
import {
  Sparkles,
  Shield,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Building2,
  Clock,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Check,
  X,
  FileCheck,
  Award,
  Send,
  Eye
} from 'lucide-react';

export default function OfficerReviewAssistantPage() {
  const params = useParams();
  const router = useRouter();
  const { approvals, documents, queries, approveApplication, raiseOfficerQuery, project, business } = useApp();

  const appId = (params?.id as string) || 'APP-2026-MPCB-0842';
  const approval = approvals.find(a => a.applicationId === appId || a.code === 'MPCB-CTE') || approvals[3];
  const linkedDocs = documents.filter(d => d.requiredFor.includes(approval.code));
  const [selectedDocId, setSelectedDocId] = useState<string>('doc-7');
  const [officerRemarks, setOfficerRemarks] = useState(
    'Reviewed revised ETP hydraulic retention calculations and ZLD layout. Mass balance verified at 42 m³/day with adequate chemical dosing safeguards. Recommended for formal statutory sanction.'
  );
  const [isApproving, setIsApproving] = useState(false);
  const [isCertOpen, setIsCertOpen] = useState(false);

  const activeDoc = documents.find(d => d.id === selectedDocId) || linkedDocs[0] || documents[0];

  const handleApprove = () => {
    setIsApproving(true);
    setTimeout(() => {
      approveApplication(approval.code, 'Er. Sunita Patil (MPCB SRO Pune)', officerRemarks);
      setIsApproving(false);
      setIsCertOpen(true);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-700 mb-1">
            <Link href="/officer" className="flex items-center gap-1 hover:underline">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Officer Queue</span>
            </Link>
            <span>•</span>
            <span className="font-mono text-slate-500">ID: {appId}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            AI Regulatory Review Assistant — Co-Pilot Workbench
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Assisting <strong>Er. Sunita Patil (MPCB SRO Pune)</strong> in technical scrutiny of {approval.name}.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          {approval.status === 'COMPLETED' ? (
            <button
              onClick={() => setIsCertOpen(true)}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold shadow-md"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>Sanction Granted (View Certificate)</span>
            </button>
          ) : (
            <button
              onClick={handleApprove}
              disabled={isApproving}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md transition disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isApproving ? 'Generating Sanction Order...' : 'Grant Formal Statutory Sanction'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Mandatory Statutory Officer Authority Notice */}
      <div className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md flex items-start space-x-3">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed">
          <strong className="font-bold text-amber-300 uppercase tracking-wider block mb-0.5">
            Statutory Officer Authority & AI Guardrail Notice
          </strong>
          The AI Regulatory Assistant analyzes engineering metrics and cross-references regulatory limits purely as an advisory decision-support tool.
          <strong className="text-white"> Statutory authority and legal sanction responsibility rest solely with the designated Government Officer</strong>.
          AI suggestions are not self-executing.
        </div>
      </div>

      {/* 3-Column Split Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Col 1: Project Dossier & Verification Checklist */}
        <div className="space-y-6">
          
          {/* Enterprise Summary Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2">
              Applicant Profile & Siting Particulars
            </h3>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-500 text-[11px] block">Enterprise Name:</span>
                <span className="font-bold text-slate-900">{business.name}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[11px] block">Proposed Plant Location:</span>
                <span className="font-medium text-slate-800">{business.registeredAddress}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <span className="text-slate-500 text-[11px] block">Capital Outlay:</span>
                  <span className="font-bold text-emerald-700 font-mono">₹{project.proposedInvestmentCr} Cr</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px] block">Personnel:</span>
                  <span className="font-semibold text-slate-800">{project.totalEmployees} Workers</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <span className="text-slate-500 text-[11px] block">Effluent Discharge:</span>
                  <span className="font-semibold text-amber-700">35 KLD (Orange Category)</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px] block">Connected Power:</span>
                  <span className="font-semibold text-slate-800 font-mono">1200 kVA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Document Verification Selector */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Submitted Dossier Files
              </h3>
              <span className="text-[10px] text-slate-500 font-mono">{linkedDocs.length} Mandatory</span>
            </div>

            <div className="space-y-2">
              {linkedDocs.map(doc => (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDocId(doc.id)}
                  className={`w-full text-left p-3 rounded-xl border transition text-xs flex items-start justify-between ${
                    doc.id === selectedDocId
                      ? 'border-sarthi-600 bg-sarthi-50 font-bold ring-1 ring-sarthi-500'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="truncate pr-2">
                    <div className="truncate">{doc.name}</div>
                    <div className="text-[10px] text-slate-500 font-normal">{doc.fileName}</div>
                  </div>
                  {doc.status === 'verified' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  )}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Col 2: Active Document Viewer with AI Highlight Overlays */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-400">
                  Document Viewport
                </span>
                <h4 className="text-sm font-bold text-white mt-1">{activeDoc.name}</h4>
              </div>
              <span className="text-xs font-mono font-bold text-amber-400">
                {activeDoc.confidence}% AI Scored
              </span>
            </div>

            {/* Simulated Document Canvas / Blueprint Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
              <div className="text-[10px] text-slate-500 uppercase">Vectorized Text Stream Preview:</div>
              <div className="bg-slate-900 p-3 rounded text-slate-300 leading-relaxed text-[11px] border border-slate-800">
                &quot;PROPOSED EFFLUENT TREATMENT SCHEME FOR M/S ABC MANUFACTURING PVT LTD. DESIGN PEAK HYDRAULIC FLOW: 42.0 M³/DAY.
                HEAVY METAL RINSE PRECIPITATION AT PH 9.5 VIA AUTOMATED CAUSTIC SODA DOSING. REVERSE OSMOSIS RECOVERY 85%,
                RO REJECT CONCENTRATED VIA MULTIPLE EFFECT EVAPORATOR (MEE). ACHIEVING ZERO LIQUID DISCHARGE (ZLD).&quot;
              </div>

              {/* Highlight Badges */}
              <div className="space-y-1.5 pt-2">
                <div className="text-[10px] text-slate-400 uppercase font-bold">
                  AI Parameter Extraction Matrix:
                </div>
                {Object.entries(activeDoc.extractedFields).map(([k, v]) => (
                  <div key={k} className="flex justify-between py-1 border-b border-slate-800/80 text-[11px]">
                    <span className="text-slate-400">{k}:</span>
                    <span className="text-cyan-300 font-bold truncate max-w-[170px]">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Automated Checklist */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="text-[10px] uppercase font-bold text-slate-400">
                Compliance Verification Flags
              </div>
              {activeDoc.checks.map((chk, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/80 text-[11px] flex items-center justify-between"
                >
                  <span className="text-slate-200">{chk.label}</span>
                  <span className={chk.passed ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                    {chk.passed ? 'PASSED ✓' : 'FLAGGED ⚠'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Col 3: AI Officer Summary & Statutory Decision Desk */}
        <div className="space-y-6">
          
          {/* AI Executive Recommendation Card */}
          <div className="bg-gradient-to-br from-sarthi-900 to-slate-900 text-white rounded-2xl border border-sarthi-700 p-6 shadow-xl space-y-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-bold text-white">AI Regulatory Recommendation</h3>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                <span className="text-slate-300">Composite Risk Score:</span>
                <span className="font-mono font-bold text-emerald-400">LOW (12 / 100)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                <span className="text-slate-300">Dossier Completeness:</span>
                <span className="font-mono font-bold text-white">100% (7 of 7 Files)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                <span className="text-slate-300">Upstream Clearances:</span>
                <span className="font-mono font-bold text-emerald-400">SATISFIED (Land, BP, Fire)</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-200 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-emerald-400">
                <Check className="w-4 h-4" />
                <span>AI Recommendation: APPROVE</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-300">
                The technical clarification satisfactorily answers query QRY-2026-041. All criteria under the Water Act 1974 & Air Act 1981 are met.
              </p>
            </div>
          </div>

          {/* Statutory Decision Form */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-2">
              Officer Findings & Statutory Sanction
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Official Regulatory Order Remarks (Recorded on DSC Certificate)
              </label>
              <textarea
                rows={4}
                value={officerRemarks}
                onChange={e => setOfficerRemarks(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sarthi-500 leading-relaxed font-sans"
              />
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={handleApprove}
                disabled={isApproving || approval.status === 'COMPLETED'}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{approval.status === 'COMPLETED' ? 'Sanction Already Issued' : 'Grant Formal Statutory Sanction'}</span>
              </button>

              <Link
                href="/queries"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center justify-center gap-1.5 border border-slate-200 transition"
              >
                <span>Issue Additional Query Instead</span>
              </Link>
            </div>
          </div>

        </div>

      </div>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isCertOpen}
        onClose={() => setIsCertOpen(false)}
        approvalCode={approval.code}
      />

    </div>
  );
}
