'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DocumentRecord } from '../types';
import {
  Sparkles,
  Upload,
  CheckCircle2,
  AlertTriangle,
  FileText,
  X,
  Scan,
  RefreshCw,
  Cpu,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';

interface DocumentScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDocId?: string;
}

export default function DocumentScannerModal({
  isOpen,
  onClose,
  initialDocId
}: DocumentScannerModalProps) {
  const { documents, uploadAndScanDocument } = useApp();
  const [selectedDocId, setSelectedDocId] = useState<string>(initialDocId || 'doc-7');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [scannedResult, setScannedResult] = useState<DocumentRecord | null>(null);

  if (!isOpen) return null;

  const currentDoc = documents.find(d => d.id === selectedDocId) || documents[0];

  const handleStartScan = async () => {
    setIsScanning(true);
    setScanStep(1);

    setTimeout(() => setScanStep(2), 500);
    setTimeout(() => setScanStep(3), 1000);
    setTimeout(() => setScanStep(4), 1600);

    const result = await uploadAndScanDocument(selectedDocId);
    setIsScanning(false);
    setScannedResult(result);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-sarthi-600 text-white">
              <Scan className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold">AI Document Pre-Audit & OCR Simulator</h3>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Dual-Engine OCR
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Automated metadata extraction, entity verification & discrepancy detection before department submission
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Document Selector & Upload Zone */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Left: Document selection */}
            <div className="md:col-span-1 space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Select Document to Pre-Audit
              </label>
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {documents.map(doc => (
                  <button
                    key={doc.id}
                    onClick={() => {
                      setSelectedDocId(doc.id);
                      setScannedResult(null);
                    }}
                    className={`w-full text-left p-2.5 rounded-lg text-xs transition border flex items-center justify-between ${
                      doc.id === selectedDocId
                        ? 'border-sarthi-600 bg-sarthi-50 text-sarthi-900 font-semibold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="truncate pr-2">
                      <div className="truncate">{doc.name}</div>
                      <div className="text-[10px] text-slate-500">{doc.category}</div>
                    </div>
                    {doc.status === 'verified' && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                    {doc.status === 'needs_review' && (
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Active Document Preview / Scanner Canvas */}
            <div className="md:col-span-2 bg-slate-900 rounded-xl p-5 text-white relative overflow-hidden flex flex-col justify-between border border-slate-800 min-h-[240px]">
              
              {/* Laser Scan Animation Line */}
              {isScanning && (
                <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.8)] animate-laser z-20" />
              )}

              {/* Document Header in Canvas */}
              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    Source Document
                  </span>
                  <h4 className="text-sm font-bold text-white mt-1">{currentDoc.name}</h4>
                  <p className="text-xs text-slate-400">{currentDoc.fileName || 'Sample_File.pdf'} • {currentDoc.fileSize || '2.4 MB'}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Current AI Confidence</div>
                  <div className="text-xl font-mono font-bold text-amber-400">
                    {currentDoc.confidence}%
                  </div>
                </div>
              </div>

              {/* Scanning Stepper Indicator */}
              {isScanning ? (
                <div className="my-6 space-y-2 bg-slate-950/80 p-4 rounded-lg border border-cyan-500/30">
                  <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Neural OCR Pipeline Executing...</span>
                  </div>
                  <div className="space-y-1 text-[11px] text-slate-300 font-mono">
                    <div className={scanStep >= 1 ? 'text-emerald-400' : 'text-slate-600'}>
                      {scanStep >= 1 ? '✓' : '○'} Parsing layout geometry & vectorized text layers...
                    </div>
                    <div className={scanStep >= 2 ? 'text-emerald-400' : 'text-slate-600'}>
                      {scanStep >= 2 ? '✓' : '○'} Cross-matching entity & GSTIN against National Registry...
                    </div>
                    <div className={scanStep >= 3 ? 'text-emerald-400' : 'text-slate-600'}>
                      {scanStep >= 3 ? '✓' : '○'} Verifying engineering capacity thresholds against DCR & MPCB norms...
                    </div>
                    <div className={scanStep >= 4 ? 'text-emerald-400' : 'text-slate-600'}>
                      {scanStep >= 4 ? '✓' : '○'} Generating automated pre-audit verification stamp...
                    </div>
                  </div>
                </div>
              ) : (
                <div className="my-4 py-3 px-4 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300">
                  <div className="font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-sarthi-400" />
                    Inspection Ready
                  </div>
                  Click &quot;Run AI Pre-Audit Scanner&quot; to execute real-time OCR extraction, verify statutory formulas, and detect missing clauses before officer review.
                </div>
              )}

              {/* Action Trigger */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800 relative z-10">
                <span className="text-[11px] text-slate-400">
                  Algorithm: LayoutLMv3 + Regulatory Rules Engine
                </span>
                <button
                  onClick={handleStartScan}
                  disabled={isScanning}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-sarthi-600 to-cyan-600 hover:from-sarthi-500 hover:to-cyan-500 text-white font-bold text-xs shadow-md transition disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isScanning ? 'Analyzing Document...' : 'Run AI Pre-Audit Scanner'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Results Display */}
          {(scannedResult || currentDoc) && (
            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <h4 className="text-sm font-bold text-slate-900">
                    Extracted Metadata & Compliance Verification
                  </h4>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Confidence: {scannedResult?.confidence || currentDoc.confidence}%
                </span>
              </div>

              {/* Extracted Key-Value Fields */}
              <div>
                <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                  Extracted Regulatory Parameters
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries((scannedResult || currentDoc).extractedFields).map(([k, v]) => (
                    <div key={k} className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
                      <div className="text-[10px] text-slate-500 font-medium uppercase">{k}</div>
                      <div className="text-xs font-bold text-slate-800 mt-0.5 truncate" title={v}>
                        {v}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verification Checklist */}
              <div>
                <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                  AI Compliance Checks
                </div>
                <div className="space-y-2">
                  {(scannedResult || currentDoc).checks.map((chk, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-lg border flex items-start justify-between text-xs ${
                        chk.passed
                          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                          : 'bg-amber-50/80 border-amber-200 text-amber-900'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
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
              </div>

              {/* Warnings (if any) */}
              {(scannedResult || currentDoc).warnings.length > 0 && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Officer Scrutiny Flag:</span>{' '}
                    {(scannedResult || currentDoc).warnings.join(', ')}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Pre-audit scans are recorded in tamper-evident application audit log
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold"
            >
              Close Inspector
            </button>
            <button
              onClick={() => {
                onClose();
              }}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs"
            >
              Commit Verified Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
