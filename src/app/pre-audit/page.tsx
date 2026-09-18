'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import DocumentScannerModal from '../../components/DocumentScannerModal';
import {
  Sparkles,
  Upload,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Scan,
  RefreshCw,
  Cpu,
  ArrowRight,
  ShieldCheck,
  Check,
  Eye,
  RotateCcw,
  FileUp
} from 'lucide-react';
import Link from 'next/link';

export default function PreAuditPage() {
  const { documents, uploadAndScanDocument } = useApp();
  const [selectedDocId, setSelectedDocId] = useState<string>('doc-7'); // ETP Design
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isScanningInline, setIsScanningInline] = useState(false);
  const [scanStage, setScanStage] = useState(0);

  const currentDoc = documents.find(d => d.id === selectedDocId) || documents[0];

  const handleInlineScan = async () => {
    setIsScanningInline(true);
    setScanStage(1);
    setTimeout(() => setScanStage(2), 400);
    setTimeout(() => setScanStage(3), 800);
    setTimeout(() => setScanStage(4), 1300);

    await uploadAndScanDocument(selectedDocId);
    setIsScanningInline(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-700 mb-1">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>AI Neural OCR & Verification Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            AI Document Pre-Audit & Mismatch Inspector
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Prevent costly department query cycles by catching engineering calculation errors, expiry dates, and name discrepancies before submission.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sarthi-600 to-cyan-600 hover:from-sarthi-500 hover:to-cyan-500 text-white text-xs font-bold shadow-md transition"
          >
            <Scan className="w-4 h-4" />
            <span>Launch Laser Scanner Modal</span>
          </button>
          <Link
            href="/documents"
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition"
          >
            <FileText className="w-4 h-4 text-sarthi-600" />
            <span>Document Repository</span>
          </Link>
        </div>
      </div>

      {/* Main Workbench Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Document Select List */}
        <div className="lg:col-span-1 space-y-3">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Uploaded Dossier ({documents.length})
              </span>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                Click to Inspect
              </span>
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {documents.map(doc => (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDocId(doc.id)}
                  className={`w-full text-left p-3 rounded-xl border transition flex items-start justify-between ${
                    doc.id === selectedDocId
                      ? 'border-sarthi-600 bg-sarthi-50/70 shadow-2xs ring-1 ring-sarthi-500'
                      : 'border-slate-200 hover:bg-slate-50 bg-white'
                  }`}
                >
                  <div className="truncate pr-2">
                    <div className="text-xs font-bold text-slate-900 truncate">{doc.name}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{doc.category}</div>
                    <div className="text-[10px] font-mono text-slate-400 mt-1">
                      {doc.fileName || 'Pending Upload'}
                    </div>
                  </div>
                  <div className="shrink-0">
                    {doc.status === 'verified' && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" /> {doc.confidence}%
                      </span>
                    )}
                    {doc.status === 'needs_review' && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                        <AlertTriangle className="w-3 h-3" /> Flagged
                      </span>
                    )}
                    {doc.status === 'uploaded' && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                        Ready
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (2 spans): Interactive Scanner Canvas & Extracted Metadata */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Document Scanner Viewport */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 text-white relative overflow-hidden shadow-xl">
            {/* Laser Line Animation */}
            {isScanningInline && (
              <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_rgba(34,211,238,1)] animate-laser z-20" />
            )}

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-sarthi-900 text-cyan-400 border border-sarthi-700">
                  Active Document Target
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-1.5">{currentDoc.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  File: {currentDoc.fileName || 'Sample_Blueprint.pdf'} • Size: {currentDoc.fileSize || '2.4 MB'}
                </p>
              </div>

              <div className="text-right">
                <div className="text-[11px] text-slate-400 font-mono">Neural Confidence Gauge</div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-amber-400">
                  {currentDoc.confidence}%
                </div>
                <span className="text-[10px] font-medium text-emerald-400">
                  {currentDoc.status === 'verified' ? '✓ Verified by Pre-Audit' : '⚠ Flagged for Officer Clarification'}
                </span>
              </div>
            </div>

            {/* Scanning Progress Console */}
            {isScanningInline ? (
              <div className="my-6 p-4 rounded-xl bg-slate-950/90 border border-cyan-500/40 space-y-2">
                <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono font-bold">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing Layout & Parameter Matrices...</span>
                </div>
                <div className="space-y-1 text-xs font-mono text-slate-300">
                  <div className={scanStage >= 1 ? 'text-emerald-400' : 'text-slate-600'}>
                    {scanStage >= 1 ? '✓' : '○'} Vectorizing document text layers & OCR font glyphs...
                  </div>
                  <div className={scanStage >= 2 ? 'text-emerald-400' : 'text-slate-600'}>
                    {scanStage >= 2 ? '✓' : '○'} Cross-matching corporate PAN & GSTIN against National Registry...
                  </div>
                  <div className={scanStage >= 3 ? 'text-emerald-400' : 'text-slate-600'}>
                    {scanStage >= 3 ? '✓' : '○'} Validating engineering flow calculations against MPCB Orange Category rules...
                  </div>
                  <div className={scanStage >= 4 ? 'text-emerald-400' : 'text-slate-600'}>
                    {scanStage >= 4 ? '✓' : '○'} Discrepancy rectified: Sizing equation validated at 42 m³/day!
                  </div>
                </div>
              </div>
            ) : (
              <div className="my-5 p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-slate-700 text-sarthi-300">
                    <FileUp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Drag & drop revised PDF or re-run pre-audit</div>
                    <div className="text-[11px] text-slate-400">Supported formats: PDF, DWG (converted), JPG, PNG (Max 25MB)</div>
                  </div>
                </div>
                <button
                  onClick={handleInlineScan}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-sarthi-600 to-cyan-600 hover:from-sarthi-500 hover:to-cyan-500 text-white font-bold text-xs shadow-md transition"
                >
                  Re-Scan with AI
                </button>
              </div>
            )}

            {/* Extracted Key-Value Parameters */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Extracted Metadata Parameters
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {Object.entries(currentDoc.extractedFields).map(([k, v]) => (
                  <div key={k} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                    <div className="text-[10px] text-slate-400 font-mono uppercase">{k}</div>
                    <div className="text-xs font-semibold text-slate-200 mt-0.5 truncate" title={v}>
                      {v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Compliance Checks & Discrepancies Table */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h4 className="text-sm font-bold text-slate-900">
                  Pre-Audit Verification Checklist & Warnings
                </h4>
              </div>
              <span className="text-xs text-slate-500 font-mono">
                {currentDoc.checks.filter(c => c.passed).length} of {currentDoc.checks.length} Passed
              </span>
            </div>

            <div className="space-y-2">
              {currentDoc.checks.map((chk, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border flex items-start justify-between text-xs transition ${
                    chk.passed
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                      : 'bg-amber-50/80 border-amber-200 text-amber-950'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    {chk.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    )}
                    <span className="font-semibold">{chk.label}</span>
                  </div>
                  {chk.note && (
                    <span className="text-[11px] text-slate-600 font-medium">{chk.note}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Warnings list */}
            {currentDoc.warnings.length > 0 && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-rose-700">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Officer Flag / Regulatory Notice:</span>
                </div>
                <p className="leading-relaxed pl-5">{currentDoc.warnings.join(', ')}</p>
              </div>
            )}

            {/* Action Bar */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-500">
                Required for: <strong className="text-slate-800">{currentDoc.requiredFor.join(', ')}</strong>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold"
                >
                  View Extracted Data
                </button>
                <Link
                  href="/queries"
                  className="px-4 py-2 rounded-lg bg-sarthi-600 hover:bg-sarthi-700 text-white text-xs font-semibold shadow-xs"
                >
                  Submit with Query Response
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Modal Scanner */}
      <DocumentScannerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialDocId={selectedDocId}
      />

    </div>
  );
}
