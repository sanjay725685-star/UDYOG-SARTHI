'use client';

import React from 'react';
import Link from 'next/link';
import DependencyGraphView from '../../components/DependencyGraphView';
import {
  GitFork,
  ArrowRight,
  Flame,
  CheckCircle2,
  Clock,
  Ban,
  AlertTriangle,
  Info,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function DependencyGraphPage() {
  const { approvals } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-sarthi-600 mb-1">
            <GitFork className="w-4 h-4 text-sarthi-600" />
            <span>Topological Workflow Coordination Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Approval Dependency Graph (DAG)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Visualizing inter-departmental prerequisite linkages, parallel tracks, and bottleneck points for fast-track clearance.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <Link
            href="/bottlenecks"
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 text-xs font-bold transition"
          >
            <Flame className="w-4 h-4 text-rose-600" />
            <span>Critical Path Intel</span>
          </Link>
          <Link
            href="/documents"
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-sarthi-600 hover:bg-sarthi-700 text-white text-xs font-bold shadow-md transition"
          >
            <FileCheck className="w-4 h-4" />
            <span>Check Document Checklist</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Main Interactive React Flow Canvas */}
      <DependencyGraphView />

      {/* Parallelization & Topological Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center space-x-2 text-emerald-700 font-bold text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Parallel Track Opportunities</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Once <strong>Building Plan Approval</strong> is issued, you can simultaneously apply for{' '}
            <strong>Provisional Fire NOC</strong> and <strong>MSEDCL High Tension Power</strong>, saving 18 calendar days.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center space-x-2 text-rose-700 font-bold text-xs">
            <Flame className="w-4 h-4 text-rose-600" />
            <span>Critical Path Bottleneck</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            <strong>MPCB Consent to Establish (CTE)</strong> directly gates the <strong>DISH Factory License</strong>.
            Resolving the open ETP query is necessary before Factory License scrutiny begins.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center space-x-2 text-sarthi-700 font-bold text-xs">
            <TrendingUp className="w-4 h-4 text-sarthi-600" />
            <span>Algorithmic Optimization</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            By eliminating serial wait times through UDYOG SARTHI’s dependency model, total commissioning time is
            reduced from an industry average of <strong>164 days</strong> to <strong>58 days</strong>.
          </p>
        </div>
      </div>

    </div>
  );
}
