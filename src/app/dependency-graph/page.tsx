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
  FileCheck,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function DependencyGraphPage() {
  const { approvals } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Government Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-[#0b2545]">Home</Link>
        <span>/</span>
        <Link href="/directory" className="hover:text-[#0b2545]">Industrial Approvals</Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">Approval Dependency Graph (DAG)</span>
      </nav>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#005a9c] mb-1">
            <GitFork className="w-4 h-4 text-[#005a9c]" />
            <span>Industrial Clearances Directed Acyclic Graph (DAG)</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0b2545] tracking-tight">
            Inter-Departmental Approval Dependency Graph
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Visualizing statutory prerequisite linkages, parallel clearance streams, and critical path milestones for industrial commissioning.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <Link
            href="/bottlenecks"
            className="flex items-center space-x-2 px-3.5 py-2 rounded bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-800 text-xs font-bold transition"
          >
            <Flame className="w-4 h-4 text-rose-600" />
            <span>Critical Path Analysis</span>
          </Link>
          <Link
            href="/documents"
            className="flex items-center space-x-2 px-3.5 py-2 rounded bg-[#0b2545] hover:bg-[#005a9c] text-white text-xs font-bold transition"
          >
            <FileCheck className="w-4 h-4" />
            <span>Document Checklist</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Statutory Guidance Notice */}
      <div className="p-3.5 bg-blue-50 border-l-4 border-[#005a9c] text-slate-800 text-xs leading-relaxed flex items-start space-x-2.5">
        <Info className="w-4 h-4 text-[#005a9c] shrink-0 mt-0.5" />
        <div>
          <strong>Statutory Sequencing Advisory:</strong> In accordance with state industrial single-window regulations, downstream clearances (such as Factory Licence and Final Commissioning) require validated prerequisite orders. Parallel streams (Fire NOC & High Tension Power) may proceed concurrently once Building Plan approval is recorded.
        </div>
      </div>

      {/* Main Interactive React Flow Canvas */}
      <DependencyGraphView />

      {/* Sequencing & Topological Insights (Government Administrative Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Concurrent Scrutiny Stream</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Following <strong>Building Plan Approval (MIDC-BP)</strong>, applications for{' '}
            <strong>Provisional Fire NOC</strong> and <strong>MSEDCL High Tension Power</strong> can execute concurrently, compressing overall clearance latency by 18 days.
          </p>
        </div>

        <div className="bg-white p-4 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center space-x-2 text-rose-800 font-bold text-xs">
            <Flame className="w-4 h-4 text-rose-600" />
            <span>Critical Path Dependency</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            <strong>MPCB Consent to Establish (CTE)</strong> is a statutory prerequisite for the{' '}
            <strong>DISH Factory License</strong>. Clarification response regarding the Effluent Treatment Plant sizing must be completed before Factory Scrutiny commences.
          </p>
        </div>

        <div className="bg-white p-4 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center space-x-2 text-[#0b2545] font-bold text-xs">
            <ShieldCheck className="w-4 h-4 text-[#005a9c]" />
            <span>Single Window Coordination</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Coordinated digital routing eliminates redundant inter-departmental postal transmittals, maintaining strict SLA tracking under the State Public Services Guarantee Act.
          </p>
        </div>
      </div>

    </div>
  );
}
