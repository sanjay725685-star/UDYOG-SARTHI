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
  Search
} from 'lucide-react';
import Link from 'next/link';

export default function DocumentChecklistPage() {
  const { documents, uploadAndScanDocument } = useApp();
  const [filter, setFilter] = useState<'all' | 'verified' | 'needs_review' | 'missing'>('all');
  const [search, setSearch] = useState('');
  const [activeModalDocId, setActiveModalDocId] = useState<string | undefined>(undefined);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const filteredDocs = documents.filter(doc => {
    if (filter === 'verified') return doc.status === 'verified';
    if (filter === 'needs_review') return doc.status === 'needs_review';
    if (filter === 'missing') return doc.status === 'missing';
    if (search.trim()) {
      return (
        doc.name.toLowerCase().includes(search.toLowerCase()) ||
        doc.category.toLowerCase().includes(search.toLowerCase()) ||
        doc.requiredFor.some(r => r.toLowerCase().includes(search.toLowerCase()))
      );
    }
    return true;
  });

  const verifiedCount = documents.filter(d => d.status === 'verified').length;
  const reviewCount = documents.filter(d => d.status === 'needs_review').length;
  const missingCount = documents.filter(d => d.status === 'missing').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-sarthi-600 mb-1">
            <FileCheck className="w-4 h-4 text-sarthi-600" />
            <span>Unified Multi-Department Repository</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Document Checklist & Dossier Vault
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Submit once, use across all 6 departments. Zero duplicate uploads with AI-verified integrity.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => {
              setActiveModalDocId('doc-7');
              setIsScannerOpen(true);
            }}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-sarthi-600 hover:bg-sarthi-700 text-white text-xs font-bold shadow-md transition"
          >
            <Scan className="w-4 h-4" />
            <span>Scan New Document with AI</span>
          </button>
        </div>
      </div>

      {/* KPI Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-semibold uppercase">Total Documents</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{documents.length} Files</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Covering 8 Clearances</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-semibold uppercase">AI Pre-Audit Verified</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">{verifiedCount} Verified</div>
          <div className="text-[11px] text-emerald-700 mt-0.5">Passed OCR & Integrity Check</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-semibold uppercase">Discrepancy / Review</div>
          <div className="text-2xl font-black text-amber-600 mt-1">{reviewCount} Flagged</div>
          <div className="text-[11px] text-amber-700 mt-0.5">Requires Minor Rectification</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-semibold uppercase">Missing Mandatory</div>
          <div className="text-2xl font-black text-slate-700 mt-1">{missingCount} Pending</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Labour Form V drafting</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              filter === 'all'
                ? 'bg-sarthi-600 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All ({documents.length})
          </button>
          <button
            onClick={() => setFilter('verified')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              filter === 'verified'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Verified ({verifiedCount})
          </button>
          <button
            onClick={() => setFilter('needs_review')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              filter === 'needs_review'
                ? 'bg-amber-600 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Needs Review ({reviewCount})
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search document, approval, category..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sarthi-500"
          />
        </div>
      </div>

      {/* Document Checklist Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-5 py-3.5">Document Title & Filename</th>
                <th className="px-5 py-3.5">Required For (Clearances)</th>
                <th className="px-5 py-3.5">Uploaded / Size</th>
                <th className="px-5 py-3.5">AI Pre-Audit Status</th>
                <th className="px-5 py-3.5">Confidence</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filteredDocs.map(doc => (
                <tr key={doc.id} className="hover:bg-slate-50/80 transition">
                  <td className="px-5 py-4">
                    <div className="font-bold text-slate-900">{doc.name}</div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                      <span className="font-mono text-sarthi-700 font-semibold">{doc.fileName || 'Not uploaded'}</span>
                      <span>•</span>
                      <span>{doc.category}</span>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {doc.requiredFor.map(req => (
                        <span
                          key={req}
                          className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="px-5 py-4 font-mono text-slate-600 text-[11px]">
                    <div>{doc.uploadedAt || '—'}</div>
                    <div className="text-slate-400 text-[10px]">{doc.fileSize || '—'}</div>
                  </td>

                  <td className="px-5 py-4">
                    {doc.status === 'verified' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Verified Passed</span>
                      </span>
                    )}
                    {doc.status === 'needs_review' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                        <span>Discrepancy Flagged</span>
                      </span>
                    )}
                    {doc.status === 'uploaded' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Uploaded</span>
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-4 font-mono font-bold text-slate-900">
                    <span
                      className={`text-xs ${
                        doc.confidence >= 95
                          ? 'text-emerald-700'
                          : doc.confidence >= 85
                          ? 'text-amber-700'
                          : 'text-slate-500'
                      }`}
                    >
                      {doc.confidence}%
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        setActiveModalDocId(doc.id);
                        setIsScannerOpen(true);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-sarthi-50 hover:bg-sarthi-100 text-sarthi-700 font-bold text-xs border border-sarthi-200 transition"
                      title="Inspect OCR"
                    >
                      Inspect OCR
                    </button>
                    <Link
                      href="/pre-audit"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition"
                    >
                      Pre-Audit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Scanner */}
      <DocumentScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        initialDocId={activeModalDocId}
      />

    </div>
  );
}
