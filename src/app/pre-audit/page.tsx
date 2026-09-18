'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import DocumentScannerModal from '../../components/DocumentScannerModal';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  Info,
  Building2,
  FileUp,
  Search,
  Eye,
  SlidersHorizontal,
  Layers,
  GitFork
} from 'lucide-react';
import Link from 'next/link';

export default function PreAuditPage() {
  const { documents, uploadAndScanDocument } = useApp();
  const [selectedDocId, setSelectedDocId] = useState<string>('doc-7'); // ETP Design
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isScanningInline, setIsScanningInline] = useState(false);
  const [scanStep, setScanStep] = useState(0);

  const currentDoc = documents.find(d => d.id === selectedDocId) || documents[0];

  const handleInlineScan = async () => {
    setIsScanningInline(true);
    setScanStep(1);
    setTimeout(() => setScanStep(2), 350);
    setTimeout(() => setScanStep(3), 700);
    setTimeout(() => setScanStep(4), 1100);

    await uploadAndScanDocument(selectedDocId);
    setIsScanningInline(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Government Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-[#0b2545]">Home</Link>
        <span>/</span>
        <Link href="/documents" className="hover:text-[#0b2545]">Application Documents</Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">AI-Assisted Pre-Scrutiny</span>
      </nav>

      {/* Page Title & Context Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#005a9c] mb-1">
            <ShieldCheck className="w-4 h-4 text-[#005a9c]" />
            <span>Statutory Verification Assistance</span>
            <span>•</span>
            <span className="text-slate-500 font-mono">Module Ref: AI-PRE-SCRUTINY-2026</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0b2545] tracking-tight">
            AI-Assisted Pre-Scrutiny
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Pre-submission technical validation of industrial documents, OCR parameter extraction, and regulatory rule compliance to prevent departmental query cycles.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <Link
            href="/documents"
            className="flex items-center space-x-2 px-3.5 py-2 rounded bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition"
          >
            <FileText className="w-4 h-4 text-[#005a9c]" />
            <span>Document Repository</span>
          </Link>
          <Link
            href="/dependency-graph"
            className="flex items-center space-x-2 px-3.5 py-2 rounded bg-[#0b2545] hover:bg-[#005a9c] text-white text-xs font-bold transition"
          >
            <GitFork className="w-4 h-4" />
            <span>Dependency Graph</span>
          </Link>
        </div>
      </div>

      {/* =========================================================================
          SECTION 11 MANDATORY DISCLAIMER
         ========================================================================= */}
      <div className="p-4 rounded bg-amber-50 border-l-4 border-amber-600 text-amber-950 text-xs shadow-2xs">
        <div className="flex items-start space-x-2.5">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-900 block uppercase tracking-wider text-[11px] mb-0.5">
              Statutory Disclaimer Notice
            </span>
            <span>
              “AI-generated outputs are provided for assistance and pre-scrutiny only. Final decisions and statutory approvals are made by the competent government authority.”
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 11: 6 CORE SCRUTINY MODULES (STATUS: COMPLETED / WARNING / ATTENTION REQUIRED)
         ========================================================================= */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
          Pre-Scrutiny Module Verification Status
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          
          {/* 1. Document Classification */}
          <div className="bg-white p-4 border border-slate-300 rounded shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">1. Document Classification</span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="w-3 h-3" /> Completed
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              All 10 required architectural, corporate, and environmental documents correctly categorized against statutory schedule.
            </p>
          </div>

          {/* 2. OCR Extraction */}
          <div className="bg-white p-4 border border-slate-300 rounded shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">2. OCR Extraction</span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="w-3 h-3" /> Completed
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              PAN (AABCA1234F) & GSTIN extracted and verified with 100% concordance against CBDT & GSTN databases.
            </p>
          </div>

          {/* 3. Missing Document Detection */}
          <div className="bg-white p-4 border border-slate-300 rounded shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">3. Missing Document Detection</span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="w-3 h-3" /> Completed (0 Missing)
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              All 10 mandatory enclosures required for Pre-Establishment scrutiny are present in the dossier.
            </p>
          </div>

          {/* 4. Rule-Based Validation */}
          <div className="bg-white p-4 border border-slate-300 rounded shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">4. Rule-Based Validation</span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-300">
                <AlertTriangle className="w-3 h-3" /> Attention Required
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Doc-7 ETP mass balance sizing equation flagged for officer clarification under MPCB Orange Category rules.
            </p>
          </div>

          {/* 5. Approval Dependency Analysis */}
          <div className="bg-white p-4 border border-slate-300 rounded shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">5. Approval Dependency Analysis</span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="w-3 h-3" /> Completed (8 Identified)
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Sequential prerequisite linkages mapped: MIDC Allotment → CTE → Building Plan → Fire NOC → Factory License.
            </p>
          </div>

          {/* 6. Compliance Risk Identification */}
          <div className="bg-white p-4 border border-slate-300 rounded shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">6. Compliance Risk Identification</span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-300">
                <AlertTriangle className="w-3 h-3" /> Warning (1 Open Query)
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Query pending response on MPCB Consent to Establish. Prompt response required within 4 calendar days.
            </p>
          </div>

        </div>
      </div>

      {/* =========================================================================
          INTERACTIVE DOCUMENT PRE-SCRUTINY INSPECTION WORKBENCH
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Document List */}
        <div className="lg:col-span-1 space-y-3">
          <div className="bg-white border border-slate-300 rounded p-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Dossier Documents ({documents.length})
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Select to Inspect</span>
            </div>

            <div className="space-y-1.5 max-h-[520px] overflow-y-auto pr-1">
              {documents.map(doc => {
                const isSelected = doc.id === selectedDocId;
                return (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDocId(doc.id)}
                    className={`w-full text-left p-3 rounded border transition flex items-start justify-between ${
                      isSelected
                        ? 'border-[#0b2545] bg-blue-50/60 ring-1 ring-[#0b2545]'
                        : 'border-slate-200 hover:bg-slate-50 bg-white'
                    }`}
                  >
                    <div className="truncate pr-2">
                      <div className="text-xs font-bold text-slate-900 truncate">{doc.name}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{doc.category}</div>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                        {doc.fileName || 'Document_File.pdf'}
                      </div>
                    </div>
                    <div className="shrink-0">
                      {doc.status === 'verified' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {doc.confidence}%
                        </span>
                      )}
                      {doc.status === 'needs_review' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-300">
                          <AlertTriangle className="w-3 h-3 text-amber-600" /> Flagged
                        </span>
                      )}
                      {doc.status === 'uploaded' && (
                        <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          Uploaded
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Technical Inspector Pane */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Document Header & OCR Action */}
          <div className="bg-white border border-slate-300 rounded p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-bold">
                  Inspection Target: {currentDoc.id.toUpperCase()}
                </span>
                <h3 className="text-base font-bold text-[#0b2545] mt-1.5">{currentDoc.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  File: {currentDoc.fileName || 'Technical_Drawing.pdf'} • File Size: {currentDoc.fileSize || '2.4 MB'}
                </p>
              </div>

              <div className="text-right shrink-0">
                <div className="text-[11px] text-slate-500 font-medium">Pre-Scrutiny Score</div>
                <div className="text-2xl font-black font-mono text-[#0b2545]">
                  {currentDoc.confidence}%
                </div>
                <span className={`text-[10px] font-bold ${currentDoc.status === 'verified' ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {currentDoc.status === 'verified' ? '✓ Technical Validation Passed' : '⚠ Clarification Pending'}
                </span>
              </div>
            </div>

            {/* Inline Scan Action & Status */}
            {isScanningInline ? (
              <div className="p-3.5 rounded bg-blue-50 border border-blue-200 text-xs space-y-1.5 font-mono">
                <div className="flex items-center space-x-2 text-[#005a9c] font-bold">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Executing OCR Extraction & Statutory Rule Scrutiny...</span>
                </div>
                <div className="text-[11px] text-slate-700 space-y-0.5">
                  <div className={scanStep >= 1 ? 'text-emerald-700 font-bold' : 'text-slate-500'}>
                    {scanStep >= 1 ? '✓' : '○'} Vectorizing document text layers & verifying digital signatures...
                  </div>
                  <div className={scanStep >= 2 ? 'text-emerald-700 font-bold' : 'text-slate-500'}>
                    {scanStep >= 2 ? '✓' : '○'} Cross-matching entity PAN & GSTIN against National Business Register...
                  </div>
                  <div className={scanStep >= 3 ? 'text-emerald-700 font-bold' : 'text-slate-500'}>
                    {scanStep >= 3 ? '✓' : '○'} Validating hydraulic sizing against MPCB Orange Category rules...
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div>
                  <strong className="text-slate-800 block">Re-Scan or Upload Revised Document</strong>
                  <span className="text-slate-500 text-[11px]">
                    Supported formats: PDF, DWG (standard vectorized), JPG, PNG (Max 25MB)
                  </span>
                </div>
                <button
                  onClick={handleInlineScan}
                  className="px-3.5 py-1.5 bg-[#0b2545] hover:bg-[#005a9c] text-white text-xs font-bold rounded transition shrink-0"
                >
                  Run Pre-Scrutiny Check
                </button>
              </div>
            )}

            {/* Extracted Metadata Parameters Table */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Extracted Parameters & Values (OCR)
              </h4>
              <div className="border border-slate-200 rounded overflow-hidden">
                <table className="w-full text-left text-xs">
                  <tbody className="divide-y divide-slate-200">
                    {Object.entries(currentDoc.extractedFields).map(([k, v]) => (
                      <tr key={k} className="hover:bg-slate-50">
                        <td className="px-3 py-2 bg-slate-50 font-medium text-slate-600 uppercase text-[11px] w-1/3">
                          {k}
                        </td>
                        <td className="px-3 py-2 font-mono font-semibold text-slate-900">
                          {v}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Validation Checklist & Warnings */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Technical Validation Checklist ({currentDoc.checks.filter(c => c.passed).length} of {currentDoc.checks.length} Passed)
              </h4>
              <div className="space-y-1.5">
                {currentDoc.checks.map((chk, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded border text-xs flex items-start space-x-2.5 ${
                      chk.passed
                        ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                        : 'bg-amber-50 border-amber-300 text-amber-950'
                    }`}
                  >
                    {chk.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="font-bold">{chk.label}</div>
                      {chk.note && <div className="text-[11px] mt-0.5 text-slate-700">{chk.note}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
