'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CATALOG_APPROVALS } from '../../data/rulesData';
import {
  Compass,
  Search,
  Filter,
  FileText,
  Clock,
  IndianRupee,
  Layers,
  ArrowRight,
  Sparkles,
  ExternalLink,
  BookOpen,
  X
} from 'lucide-react';

export default function DirectoryPage() {
  const [search, setSearch] = useState('');
  const [filterStage, setFilterStage] = useState('all');
  const [selectedCatalogItem, setSelectedCatalogItem] = useState<any | null>(null);

  const filteredCatalog = CATALOG_APPROVALS.filter(item => {
    if (filterStage !== 'all' && item.stage !== filterStage) return false;
    if (search.trim()) {
      return (
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.department.toLowerCase().includes(search.toLowerCase()) ||
        item.code.toLowerCase().includes(search.toLowerCase()) ||
        item.act.toLowerCase().includes(search.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-sarthi-600 mb-1">
            <Compass className="w-4 h-4 text-sarthi-600" />
            <span>Master Statutory Regulatory Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Central & State Industrial Approval Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Searchable repository of statutory clearances, governing Acts, mandatory documentation checklists, and processing SLAs.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <Link
            href="/discovery"
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-sarthi-600 hover:bg-sarthi-700 text-white text-xs font-bold shadow-md transition"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Run AI Discovery on Your Project</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <button
            onClick={() => setFilterStage('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              filterStage === 'all'
                ? 'bg-sarthi-600 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Stages ({CATALOG_APPROVALS.length})
          </button>
          <button
            onClick={() => setFilterStage('Pre-Establishment')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              filterStage === 'Pre-Establishment'
                ? 'bg-sarthi-600 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Pre-Establishment
          </button>
          <button
            onClick={() => setFilterStage('Pre-Construction')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              filterStage === 'Pre-Construction'
                ? 'bg-sarthi-600 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Pre-Construction
          </button>
          <button
            onClick={() => setFilterStage('Pre-Operation')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              filterStage === 'Pre-Operation'
                ? 'bg-sarthi-600 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Pre-Operation
          </button>
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by approval name, department, act..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sarthi-500"
          />
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredCatalog.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  {item.code}
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-sarthi-50 text-sarthi-800 border border-sarthi-200">
                  {item.stage}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-snug">{item.name}</h3>
              <p className="text-xs text-sarthi-700 font-medium mt-0.5">{item.department}</p>
              <div className="text-[11px] font-mono text-slate-500 mt-1 italic">
                Statutory Ground: {item.act}
              </div>

              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                {item.description}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-400 block">SLA Timeline:</span>
                  <span className="font-bold text-slate-800 font-mono">{item.estDays} Days</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Prescribed Fee:</span>
                  <span className="font-bold text-emerald-700 font-mono">{item.feeRange}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Documents:</span>
                  <span className="font-bold text-slate-800 font-mono">{item.docCount} Mandatory</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 truncate max-w-[200px]">
                Prerequisites: {item.prereqs.join(', ')}
              </span>
              <button
                onClick={() => setSelectedCatalogItem(item)}
                className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center gap-1"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>View Guidelines</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Guidelines Modal */}
      {selectedCatalogItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full p-6 sm:p-8 space-y-5 animate-in fade-in duration-150">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-sarthi-100 text-sarthi-800">
                  {selectedCatalogItem.code}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  {selectedCatalogItem.name}
                </h3>
                <p className="text-xs text-slate-500">{selectedCatalogItem.department}</p>
              </div>
              <button
                onClick={() => setSelectedCatalogItem(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div>
                <strong className="text-slate-900 block mb-1">Governing Legislation & Statutory Power:</strong>
                <p className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 font-mono">
                  {selectedCatalogItem.act}
                </p>
              </div>

              <div>
                <strong className="text-slate-900 block mb-1">Scope & Purpose:</strong>
                <p className="leading-relaxed">{selectedCatalogItem.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Processing Turnaround SLA:</span>
                  <span className="font-bold text-slate-900">{selectedCatalogItem.estDays} Calendar Days</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Fee Structure:</span>
                  <span className="font-bold text-emerald-700">{selectedCatalogItem.feeRange}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
              <button
                onClick={() => setSelectedCatalogItem(null)}
                className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
              >
                Close
              </button>
              <Link
                href="/register?step=1"
                className="px-4 py-2 rounded-lg bg-sarthi-600 text-white text-xs font-bold hover:bg-sarthi-700"
              >
                Add to My Approval Journey
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
