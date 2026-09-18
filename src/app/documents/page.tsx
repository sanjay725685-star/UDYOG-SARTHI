'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import DocumentScannerModal from '../../components/DocumentScannerModal';
import {
  FileText,
  FileCheck,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Scan,
  Download,
  Filter,
  Eye,
  ArrowRight,
  ShieldCheck,
  Search,
  X,
  Building2,
  FileUp,
  Info
} from 'lucide-react';
import Link from 'next/link';

export default function ApplicationDocumentsPage() {
  const { documents, uploadAndScanDocument } = useApp();
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [activeModalDocId, setActiveModalDocId] = useState<string | undefined>(undefined);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<any | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Map documents into the 5 government statuses specified in Section 15:
  // Uploaded, Verified, Pending Verification, Invalid, Missing
  const mappedDocs = documents.map(doc => {
    let verificationStatus: 'Uploaded' | 'Verified' | 'Pending Verification' | 'Invalid' | 'Missing' = 'Uploaded';
    if (doc.status === 'verified') verificationStatus = 'Verified';
    else if (doc.status === 'needs_review') verificationStatus = 'Pending Verification';
    else if (doc.status === 'missing') verificationStatus = 'Missing';
    else verificationStatus = 'Uploaded';

    return {
      ...doc,
      verificationStatus,
      requiredText: 'Mandatory'
    };
  });

  const filteredDocs = mappedDocs.filter(doc => {
    if (filter !== 'all' && doc.verificationStatus !== filter) return false;
    if (search.trim()) {
      return (
        doc.name.toLowerCase().includes(search.toLowerCase()) ||
        doc.category.toLowerCase().includes(search.toLowerCase()) ||
        doc.requiredFor.some(r => r.toLowerCase().includes(search.toLowerCase()))
      );
    }
    return true;
  });

  const verifiedCount = mappedDocs.filter(d => d.verificationStatus === 'Verified').length;
  const pendingCount = mappedDocs.filter(d => d.verificationStatus === 'Pending Verification').length;
  const uploadedCount = mappedDocs.filter(d => d.verificationStatus === 'Uploaded').length;
  const missingCount = mappedDocs.filter(d => d.verificationStatus === 'Missing').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Government Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-[#0b2545]">Home</Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">Application Documents</span>
      </nav>

      {/* Page Title & Context Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#005a9c] mb-1">
            <FileText className="w-4 h-4 text-[#005a9c]" />
            <span>Single Window Document Repository</span>
            <span>•</span>
            <span className="text-slate-500 font-mono">Dossier Ref: DOS-2026-PUNE-0842</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0b2545] tracking-tight">
            Application Documents
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Centralized document locker for ABC Manufacturing Pvt Ltd. Mandatory enclosures are verified once and routed across all participating departments.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center space-x-2 px-3.5 py-2 rounded bg-[#0b2545] hover:bg-[#005a9c] text-white text-xs font-bold transition shadow-xs"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Document</span>
          </button>
          <Link
            href="/pre-audit"
            className="flex items-center space-x-2 px-3.5 py-2 rounded bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition"
          >
            <ShieldCheck className="w-4 h-4 text-[#005a9c]" />
            <span>AI Pre-Scrutiny</span>
          </Link>
        </div>
      </div>

      {/* Statutory Guidance Advisory */}
      <div className="p-3.5 bg-blue-50 border-l-4 border-[#005a9c] text-slate-800 text-xs leading-relaxed flex items-start space-x-2.5">
        <Info className="w-4 h-4 text-[#005a9c] shrink-0 mt-0.5" />
        <div>
          <strong>Document Integrity Notice:</strong> In accordance with Digital India guidelines, all uploaded PDFs, CAD plans, and affidavits undergo automated OCR validation and digital hash integrity verification. Files must be signed digitally or self-attested.
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 border border-slate-300 rounded shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-600 uppercase">Total Mandatory Files</div>
          <div className="text-2xl font-bold text-[#0b2545] mt-1">{documents.length} Enclosures</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Covering 8 Clearances</div>
        </div>

        <div className="bg-white p-3.5 border border-slate-300 rounded shadow-2xs">
          <div className="text-[11px] font-semibold text-emerald-700 uppercase">Verified</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">{verifiedCount} Files</div>
          <div className="text-[10px] text-emerald-600 mt-0.5">Scrutiny Ready</div>
        </div>

        <div className="bg-white p-3.5 border border-slate-300 rounded shadow-2xs">
          <div className="text-[11px] font-semibold text-amber-700 uppercase">Pending Verification</div>
          <div className="text-2xl font-bold text-amber-700 mt-1">{pendingCount} Files</div>
          <div className="text-[10px] text-amber-600 mt-0.5">Officer Clarification</div>
        </div>

        <div className="bg-white p-3.5 border border-slate-300 rounded shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-700 uppercase">Uploaded</div>
          <div className="text-2xl font-bold text-slate-700 mt-1">{uploadedCount} Files</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Queued for Scrutiny</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-300 p-3.5 rounded shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded text-xs font-bold transition ${
              filter === 'all'
                ? 'bg-[#0b2545] text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Documents ({documents.length})
          </button>
          <button
            onClick={() => setFilter('Verified')}
            className={`px-3 py-1.5 rounded text-xs font-bold transition ${
              filter === 'Verified'
                ? 'bg-emerald-700 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Verified ({verifiedCount})
          </button>
          <button
            onClick={() => setFilter('Pending Verification')}
            className={`px-3 py-1.5 rounded text-xs font-bold transition ${
              filter === 'Pending Verification'
                ? 'bg-amber-700 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Pending Verification ({pendingCount})
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search document, category, clearance..."
            className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none focus:border-[#005a9c]"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* =========================================================================
          SECTION 15: APPLICATION DOCUMENTS TABLE (DOCUMENT, REQUIRED, UPLOADED, VERIFICATION, ACTION)
         ========================================================================= */}
      <div className="bg-white border border-slate-300 rounded overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f1f5f9] text-[#0b2545] font-bold uppercase tracking-wider border-b border-slate-300">
              <tr>
                <th className="px-4 py-3 border-r border-slate-200 w-1/3">Document</th>
                <th className="px-4 py-3 border-r border-slate-200">Required</th>
                <th className="px-4 py-3 border-r border-slate-200">Uploaded</th>
                <th className="px-4 py-3 border-r border-slate-200">Verification</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {filteredDocs.map(doc => {
                const statusBadgeMap: Record<string, string> = {
                  'Verified': 'bg-emerald-50 text-emerald-800 border-emerald-300',
                  'Pending Verification': 'bg-amber-50 text-amber-900 border-amber-300',
                  'Invalid': 'bg-rose-50 text-rose-900 border-rose-300',
                  'Missing': 'bg-rose-50 text-rose-800 border-rose-300',
                  'Uploaded': 'bg-blue-50 text-[#005a9c] border-blue-300'
                };
                const statusBadge = statusBadgeMap[doc.verificationStatus] || 'bg-slate-50 text-slate-700 border-slate-300';

                return (
                  <tr key={doc.id} className="hover:bg-slate-50 transition">
                    
                    {/* Document */}
                    <td className="px-4 py-3 border-r border-slate-200">
                      <div className="font-bold text-slate-900">{doc.name}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Category: <span className="font-medium text-slate-700">{doc.category}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                        Mandatory For: {doc.requiredFor.join(', ')}
                      </div>
                    </td>

                    {/* Required */}
                    <td className="px-4 py-3 border-r border-slate-200">
                      <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-300 uppercase">
                        {doc.requiredText}
                      </span>
                    </td>

                    {/* Uploaded */}
                    <td className="px-4 py-3 border-r border-slate-200 font-mono text-slate-700">
                      <div className="font-semibold text-slate-900">{doc.fileName || 'Pending_Upload.pdf'}</div>
                      <div className="text-[10px] text-slate-500">{doc.uploadedAt || '02 Mar 2026'} • {doc.fileSize || '2.4 MB'}</div>
                    </td>

                    {/* Verification */}
                    <td className="px-4 py-3 border-r border-slate-200">
                      <span className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded border ${statusBadge}`}>
                        {doc.verificationStatus}
                      </span>
                      {doc.confidence > 0 && (
                        <span className="text-[10px] text-slate-500 block mt-0.5 font-mono">
                          OCR Match: {doc.confidence}%
                        </span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center space-x-1.5">
                        <button
                          onClick={() => setPreviewDoc(doc)}
                          className="px-2.5 py-1 rounded bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition flex items-center gap-1"
                          title="Preview document details"
                        >
                          <Eye className="w-3 h-3 text-[#005a9c]" />
                          <span>Preview</span>
                        </button>
                        <button
                          onClick={() => {
                            setActiveModalDocId(doc.id);
                            setIsScannerOpen(true);
                          }}
                          className="px-2.5 py-1 rounded bg-[#0b2545] hover:bg-[#005a9c] text-white text-xs font-semibold transition"
                          title="Inspect OCR & Pre-Audit"
                        >
                          Inspect OCR
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Document Preview Modal Dialog */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded border border-slate-300 w-full max-w-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-300 font-bold">
                  Document ID: {previewDoc.id.toUpperCase()}
                </span>
                <h4 className="text-sm font-bold text-[#0b2545] mt-1">{previewDoc.name}</h4>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 border border-slate-200 rounded">
                <div>
                  <span className="text-slate-500 block text-[11px]">Category:</span>
                  <strong className="text-slate-900">{previewDoc.category}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Mandatory Clearances:</span>
                  <strong className="text-slate-900">{previewDoc.requiredFor.join(', ')}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">File Particulars:</span>
                  <span className="font-mono text-slate-800">{previewDoc.fileName || 'Sample.pdf'} ({previewDoc.fileSize || '2.4 MB'})</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Verification Status:</span>
                  <span className="font-bold text-emerald-700">{previewDoc.verificationStatus}</span>
                </div>
              </div>

              <div>
                <h5 className="font-bold uppercase tracking-wider text-slate-700 text-[11px] mb-2">
                  OCR Extracted Parameters:
                </h5>
                <div className="border border-slate-200 rounded overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <tbody className="divide-y divide-slate-200">
                      {Object.entries(previewDoc.extractedFields || {}).map(([k, v]) => (
                        <tr key={k}>
                          <td className="px-3 py-1.5 bg-slate-50 font-medium text-slate-600 uppercase text-[10px] w-1/3">
                            {k}
                          </td>
                          <td className="px-3 py-1.5 font-mono text-slate-800">
                            {String(v)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="px-3.5 py-1.5 rounded border border-slate-300 text-slate-700 font-semibold text-xs"
              >
                Close Preview
              </button>
              <Link
                href="/pre-audit"
                className="px-3.5 py-1.5 rounded bg-[#0b2545] hover:bg-[#005a9c] text-white font-bold text-xs"
              >
                Open Full Scrutiny Workbench
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Upload Document Modal Dialog */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded border border-slate-300 w-full max-w-md p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0b2545]">
                Upload Mandatory Industrial Document
              </h4>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Document Type:</label>
                <select className="w-full text-xs p-2 border border-slate-300 rounded bg-white">
                  <option>Architectural Site Plan (MIDC-BP)</option>
                  <option>Effluent Treatment Plant (ETP) Engineering Drawing</option>
                  <option>Provisional Fire Safety Hydrant Plan</option>
                  <option>Factory Machinery Layout Drawing</option>
                  <option>High Tension Single Line Electrical Diagram</option>
                </select>
              </div>

              <div className="p-6 border-2 border-dashed border-slate-300 rounded text-center space-y-2 bg-slate-50">
                <FileUp className="w-8 h-8 text-slate-400 mx-auto" />
                <div className="text-xs text-slate-600 font-medium">
                  Drag and drop digitally signed PDF or DWG file here
                </div>
                <div className="text-[10px] text-slate-400">Supported: PDF, DWG, JPG (Max 25MB)</div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="px-3 py-1.5 rounded border border-slate-300 text-slate-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsUploadModalOpen(false);
                  uploadAndScanDocument('doc-7');
                }}
                className="px-4 py-1.5 rounded bg-[#0b2545] hover:bg-[#005a9c] text-white text-xs font-bold transition"
              >
                Upload & Verify
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Scanner */}
      <DocumentScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        initialDocId={activeModalDocId}
      />

    </div>
  );
}
