'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '../../../../context/AppContext';
import CertificateModal from '../../../../components/CertificateModal';
import {
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
  Eye,
  Info
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
    'Reviewed revised ETP hydraulic retention calculations and ZLD layout. Mass balance verified at 42 m³/day with adequate chemical dosing safeguards. Recommended for formal statutory sanction under Section 25 of Water Act 1974.'
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
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Government Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-[#0b2545]">Home</Link>
        <span>/</span>
        <Link href="/officer" className="hover:text-[#0b2545]">Departmental Dashboard</Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">Technical Scrutiny Desk</span>
      </nav>

      {/* Page Title & Context Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#005a9c] mb-1">
            <Link href="/officer" className="flex items-center gap-1 hover:underline text-[#005a9c]">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Department Queue</span>
            </Link>
            <span>•</span>
            <span className="font-mono text-slate-500">Dossier: {appId}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0b2545] tracking-tight">
            Technical Scrutiny & Sanction Desk
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Assisting <strong>Er. Sunita Patil</strong> (Sub-Regional Officer, MPCB) in technical evaluation of {approval.name}.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          {approval.status === 'COMPLETED' ? (
            <button
              onClick={() => setIsCertOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 rounded bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition shadow-xs"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>Sanction Granted (View Order)</span>
            </button>
          ) : (
            <button
              onClick={handleApprove}
              disabled={isApproving}
              className="flex items-center space-x-2 px-4 py-2 rounded bg-[#0b2545] hover:bg-[#005a9c] text-white text-xs font-bold transition shadow-xs disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isApproving ? 'Recording Order on Ledger...' : 'Grant Formal Statutory Sanction'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Mandatory Statutory Officer Authority Notice */}
      <div className="p-3.5 bg-blue-50 border-l-4 border-[#005a9c] text-slate-800 text-xs leading-relaxed flex items-start space-x-2.5">
        <Info className="w-4 h-4 text-[#005a9c] shrink-0 mt-0.5" />
        <div>
          <strong>Statutory Authority Notice:</strong> Technical pre-scrutiny analyses and automated rule flags operate strictly as advisory decision support. Statutory sanction authority and legal responsibility reside exclusively with the designated Government Officer in accordance with the Water Act 1974.
        </div>
      </div>

      {/* 3-Column Split Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Col 1: Project Dossier & Verification Checklist */}
        <div className="space-y-4">
          
          {/* Enterprise Summary Card */}
          <div className="bg-white border border-slate-300 rounded p-4 shadow-xs space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0b2545] border-b border-slate-200 pb-1.5">
              Applicant Siting & Operational Details
            </h3>

            <table className="w-full text-xs text-left">
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-1.5 text-slate-500 font-medium">Enterprise</td>
                  <td className="py-1.5 font-bold text-slate-900">{business.name}</td>
                </tr>
                <tr>
                  <td className="py-1.5 text-slate-500 font-medium">Location</td>
                  <td className="py-1.5 text-slate-800">{project.midcArea}, Pune</td>
                </tr>
                <tr>
                  <td className="py-1.5 text-slate-500 font-medium">Capital Outlay</td>
                  <td className="py-1.5 font-bold text-slate-900">₹{project.proposedInvestmentCr} Cr</td>
                </tr>
                <tr>
                  <td className="py-1.5 text-slate-500 font-medium">Personnel</td>
                  <td className="py-1.5 text-slate-800">{project.totalEmployees} Workers</td>
                </tr>
                <tr>
                  <td className="py-1.5 text-slate-500 font-medium">Effluent Load</td>
                  <td className="py-1.5 text-amber-700 font-semibold">35 KLD (Orange Category)</td>
                </tr>
                <tr>
                  <td className="py-1.5 text-slate-500 font-medium">Power Demand</td>
                  <td className="py-1.5 text-slate-800 font-mono">1,500 kVA (HT)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Submitted Enclosures List */}
          <div className="bg-white border border-slate-300 rounded p-4 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0b2545]">
                Submitted Dossier Enclosures
              </h3>
              <span className="text-[10px] text-slate-500 font-mono">{linkedDocs.length} Mandatory</span>
            </div>

            <div className="space-y-1.5">
              {linkedDocs.map(doc => {
                const isSelected = doc.id === selectedDocId;
                return (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDocId(doc.id)}
                    className={`w-full text-left p-2.5 rounded border transition text-xs flex items-start justify-between ${
                      isSelected
                        ? 'border-[#0b2545] bg-blue-50/70 font-bold ring-1 ring-[#0b2545]'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="truncate pr-2">
                      <div className="truncate">{doc.name}</div>
                      <div className="text-[10px] text-slate-500 font-normal">{doc.fileName}</div>
                    </div>
                    {doc.status === 'verified' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Col 2: Active Document Technical Preview */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-300 rounded p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-300 font-bold">
                  Technical Inspector
                </span>
                <h4 className="text-xs font-bold text-slate-900 mt-1">{activeDoc.name}</h4>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700">
                {activeDoc.confidence}% Pre-Scrutiny
              </span>
            </div>

            {/* Document Extract Snippet */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-2 text-xs">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Technical Specification Excerpt:
              </span>
              <p className="text-[11px] text-slate-700 leading-relaxed font-mono bg-white p-2.5 border border-slate-200 rounded">
                &quot;PROPOSED EFFLUENT TREATMENT SCHEME FOR M/S ABC MANUFACTURING PVT LTD. DESIGN PEAK HYDRAULIC FLOW: 42.0 M³/DAY. AUTOMATED CAUSTIC SODA DOSING FOR HEAVY METAL PRECIPITATION AT PH 9.5. REVERSE OSMOSIS RECOVERY 85%, RO REJECT TREATED VIA MULTIPLE EFFECT EVAPORATOR (MEE). ACHIEVING ZERO LIQUID DISCHARGE (ZLD).&quot;
              </p>
            </div>

            {/* AI Extracted Parameters Table */}
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                Extracted Parameters Matrix:
              </span>
              <table className="w-full text-left text-xs border border-slate-200 rounded overflow-hidden">
                <tbody className="divide-y divide-slate-200">
                  {Object.entries(activeDoc.extractedFields).map(([k, v]) => (
                    <tr key={k} className="hover:bg-slate-50">
                      <td className="px-2.5 py-1.5 bg-slate-50 font-medium text-slate-600 text-[10px] uppercase w-1/3">
                        {k}
                      </td>
                      <td className="px-2.5 py-1.5 font-mono text-slate-900 font-semibold">
                        {v}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Compliance Flags */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Statutory Rule Concordance:
              </span>
              {activeDoc.checks.map((chk, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded border text-[11px] flex items-center justify-between ${
                    chk.passed
                      ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                      : 'bg-amber-50 border-amber-300 text-amber-950'
                  }`}
                >
                  <span>{chk.label}</span>
                  <span className="font-bold">
                    {chk.passed ? 'PASSED ✓' : 'FLAGGED ⚠'}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Col 3: Statutory Decision & Order Remarks */}
        <div className="space-y-4">
          
          {/* Pre-Scrutiny Synthesis */}
          <div className="bg-white border border-slate-300 rounded p-4 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0b2545] border-b border-slate-200 pb-1.5">
              Technical Pre-Scrutiny Synthesis
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                <span className="text-slate-600">Composite Risk Rating:</span>
                <span className="font-bold text-emerald-700">LOW (12 / 100)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                <span className="text-slate-600">Enclosures Verified:</span>
                <span className="font-bold text-slate-900">100% (7 of 7 Files)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                <span className="text-slate-600">Prerequisite Clearances:</span>
                <span className="font-bold text-emerald-700">SATISFIED (Land, BP, Fire)</span>
              </div>
            </div>

            <div className="p-3 rounded bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                <Check className="w-4 h-4" />
                <span>Pre-Scrutiny Outcome: RECOMMENDED FOR APPROVAL</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-700">
                Revised mass balance submission satisfies open technical query. Proposed treatment achieves prescribed CPCB/MPCB norms.
              </p>
            </div>
          </div>

          {/* Statutory Decision Form */}
          <div className="bg-white border border-slate-300 rounded p-4 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0b2545] border-b border-slate-200 pb-1.5">
              Officer Findings & Sanction Order
            </h3>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Official Order Remarks (Recorded on Sanction Certificate):
              </label>
              <textarea
                rows={4}
                value={officerRemarks}
                onChange={e => setOfficerRemarks(e.target.value)}
                className="w-full text-xs p-2.5 border border-slate-300 rounded focus:outline-none focus:border-[#005a9c] leading-relaxed"
              />
            </div>

            <div className="space-y-2 pt-1">
              <button
                onClick={handleApprove}
                disabled={isApproving || approval.status === 'COMPLETED'}
                className="w-full py-2.5 px-3 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{approval.status === 'COMPLETED' ? 'Sanction Order Already Issued' : 'Grant Formal Statutory Sanction'}</span>
              </button>

              <Link
                href="/queries"
                className="w-full py-2 px-3 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 border border-slate-300 transition"
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
