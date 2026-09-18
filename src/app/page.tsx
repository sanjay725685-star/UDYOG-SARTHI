'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';
import {
  FileCheck,
  FileText,
  Search,
  ArrowRight,
  ShieldCheck,
  Clock,
  Building2,
  HelpCircle,
  Activity,
  AlertTriangle,
  Compass,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  GitFork,
  Bell,
  Layers,
  Phone,
  Info
} from 'lucide-react';

export default function GovernmentHomePage() {
  const router = useRouter();
  const { setRole, setDemoStep } = useApp();
  const [trackInput, setTrackInput] = useState('APP-2026-MPCB-0842');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackInput.trim()) {
      router.push(`/applications/${trackInput.trim()}`);
    }
  };

  const startApplication = () => {
    setRole('entrepreneur');
    setDemoStep(2);
    router.push('/register?step=1');
  };

  const exploreDiscovery = () => {
    setRole('entrepreneur');
    setDemoStep(5);
    router.push('/discovery');
  };

  const trackJourney = () => {
    setRole('entrepreneur');
    setDemoStep(9);
    router.push('/journey');
  };

  return (
    <div className="space-y-8 pb-12" id="main-content">
      
      {/* 1. OFFICIAL NOTIFICATION TICKER / ANNOUNCEMENT STRIP */}
      <div className="bg-[#fff9e6] border-b border-[#f3e5ab] px-4 py-2 text-xs text-[#7c5e10] flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center space-x-2">
          <span className="font-bold uppercase tracking-wider bg-[#d97706] text-white text-[10px] px-2 py-0.5 rounded font-mono shrink-0">
            NOTICE
          </span>
          <span className="truncate">
            Standardized Maharashtra Industrial Approval Guidelines 2026 active • AI Pre-Scrutiny operational for Orange & Red categories • Zero Liquid Discharge (ZLD) design compliance mandatory.
          </span>
        </div>
      </div>

      {/* 2. GOVERNMENT SERVICE-FIRST HERO & QUICK APPLICATION TRACKER */}
      <section className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column (7 cols): Official Heading & Action Buttons */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#e8f1f8] border border-[#b6d4eb] text-xs font-bold text-[#005a9c]">
              <span>National Single Window Regulatory Framework</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-[#0b2545] tracking-tight leading-tight">
              Single Window Industrial Approval & Compliance
            </h1>

            <p className="text-sm text-slate-700 leading-relaxed">
              Apply for industrial approvals, identify applicable clearances, track applications, and coordinate
              compliance requirements through a unified digital platform.
            </p>

            {/* Formal Government Portal Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={startApplication}
                className="px-5 py-2.5 bg-[#005a9c] hover:bg-[#004780] text-white text-xs font-bold rounded shadow-xs transition flex items-center gap-1.5 uppercase tracking-wider"
              >
                <span>APPLY FOR APPROVAL</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={trackJourney}
                className="px-5 py-2.5 bg-white hover:bg-slate-50 text-[#0b2545] border-2 border-[#0b2545] text-xs font-bold rounded transition flex items-center gap-1.5 uppercase tracking-wider"
              >
                <span>TRACK APPLICATION</span>
              </button>

              <button
                onClick={exploreDiscovery}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded border border-slate-300 transition"
              >
                KNOW YOUR REQUIRED APPROVALS
              </button>
            </div>

            {/* Prototype Notice */}
            <div className="text-[11px] text-slate-500 pt-1">
              <strong>Smart India Hackathon 2026 Prototype</strong>: Demonstrating AI-assisted pre-scrutiny and approval dependency orchestration.
            </div>
          </div>

          {/* Right Column (5 cols): Instant Application Tracker Search Card */}
          <div className="lg:col-span-5 bg-[#f8fafc] border-2 border-slate-300 rounded-lg p-5 shadow-xs space-y-3">
            <div className="border-b border-slate-200 pb-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#0b2545] flex items-center gap-1.5">
                <Search className="w-4 h-4 text-[#005a9c]" />
                <span>Track Your Application Status</span>
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Enter your Application Reference Number to view real-time department scrutiny status
              </p>
            </div>

            <form onSubmit={handleTrackSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Application ID / Reference Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={trackInput}
                    onChange={e => setTrackInput(e.target.value)}
                    placeholder="e.g. US-2026-0001 or APP-2026-MPCB-0842"
                    className="w-full px-3 py-2 text-xs font-mono font-semibold bg-white border border-slate-300 rounded focus:ring-2 focus:ring-[#005a9c] focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] text-slate-500">
                  Demo Ref: <strong className="text-slate-800 font-mono">APP-2026-MPCB-0842</strong>
                </span>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0b2545] hover:bg-[#133b5c] text-white text-xs font-bold rounded transition uppercase tracking-wide"
                >
                  TRACK STATUS
                </button>
              </div>
            </form>
          </div>

        </div>
      </section>

      {/* 3. CITIZEN / INDUSTRY SERVICES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="border-b border-slate-300 pb-2 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#0b2545] uppercase tracking-wide">
              Industrial Services
            </h2>
            <p className="text-xs text-slate-600">
              Select an industrial facilitation service to proceed
            </p>
          </div>
          <span className="text-xs font-semibold text-[#005a9c]">6 Core Services</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Card 1: Know Your Approvals */}
          <Link
            href="/discovery"
            className="group bg-white p-5 rounded border border-slate-300 shadow-2xs hover:border-[#005a9c] hover:shadow-xs transition flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-400">SERVICE 01</span>
                <Compass className="w-5 h-5 text-[#005a9c]" />
              </div>
              <h3 className="font-bold text-sm text-[#0b2545] group-hover:text-[#005a9c]">
                1. Know Your Approvals
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Find approvals and clearances applicable to your proposed industrial activity based on investment, sector, and site characteristics.
              </p>
            </div>
            <div className="pt-3 mt-2 border-t border-slate-100 flex items-center text-xs font-bold text-[#005a9c]">
              <span>Identify Approvals</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition" />
            </div>
          </Link>

          {/* Card 2: New Application */}
          <Link
            href="/register"
            className="group bg-white p-5 rounded border border-slate-300 shadow-2xs hover:border-[#005a9c] hover:shadow-xs transition flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-400">SERVICE 02</span>
                <FileText className="w-5 h-5 text-[#005a9c]" />
              </div>
              <h3 className="font-bold text-sm text-[#0b2545] group-hover:text-[#005a9c]">
                2. New Application
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Submit an industrial approval application through the standardized Single Window Common Application Form (CAF).
              </p>
            </div>
            <div className="pt-3 mt-2 border-t border-slate-100 flex items-center text-xs font-bold text-[#005a9c]">
              <span>Apply Online</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition" />
            </div>
          </Link>

          {/* Card 3: Track Application */}
          <Link
            href="/journey"
            className="group bg-white p-5 rounded border border-slate-300 shadow-2xs hover:border-[#005a9c] hover:shadow-xs transition flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-400">SERVICE 03</span>
                <Activity className="w-5 h-5 text-[#005a9c]" />
              </div>
              <h3 className="font-bold text-sm text-[#0b2545] group-hover:text-[#005a9c]">
                3. Track Application
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Track application status, departmental scrutiny stages, and officer queries in real time.
              </p>
            </div>
            <div className="pt-3 mt-2 border-t border-slate-100 flex items-center text-xs font-bold text-[#005a9c]">
              <span>View Processing Timeline</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition" />
            </div>
          </Link>

          {/* Card 4: Compliance */}
          <Link
            href="/bottlenecks"
            className="group bg-white p-5 rounded border border-slate-300 shadow-2xs hover:border-[#005a9c] hover:shadow-xs transition flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-400">SERVICE 04</span>
                <GitFork className="w-5 h-5 text-[#005a9c]" />
              </div>
              <h3 className="font-bold text-sm text-[#0b2545] group-hover:text-[#005a9c]">
                4. Compliance & Dependencies
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                View clearance dependency graphs, prerequisite conditions, and critical path bottlenecks.
              </p>
            </div>
            <div className="pt-3 mt-2 border-t border-slate-100 flex items-center text-xs font-bold text-[#005a9c]">
              <span>Inspect Dependencies</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition" />
            </div>
          </Link>

          {/* Card 5: Document Verification */}
          <Link
            href="/pre-audit"
            className="group bg-white p-5 rounded border border-slate-300 shadow-2xs hover:border-[#005a9c] hover:shadow-xs transition flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-400">SERVICE 05</span>
                <FileCheck className="w-5 h-5 text-[#005a9c]" />
              </div>
              <h3 className="font-bold text-sm text-[#0b2545] group-hover:text-[#005a9c]">
                5. Document Verification & Pre-Scrutiny
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Upload and pre-audit engineering blueprints, ETP reports, and identity certificates to verify completeness prior to department submission.
              </p>
            </div>
            <div className="pt-3 mt-2 border-t border-slate-100 flex items-center text-xs font-bold text-[#005a9c]">
              <span>Run Pre-Scrutiny Check</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition" />
            </div>
          </Link>

          {/* Card 6: Grievance / Help */}
          <Link
            href="/support"
            className="group bg-white p-5 rounded border border-slate-300 shadow-2xs hover:border-[#005a9c] hover:shadow-xs transition flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-400">SERVICE 06</span>
                <HelpCircle className="w-5 h-5 text-[#005a9c]" />
              </div>
              <h3 className="font-bold text-sm text-[#0b2545] group-hover:text-[#005a9c]">
                6. Grievance & Facilitation
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Raise and track support requests, contact District Industries Centre (DIC) facilitation officers, and escalate delayed clearances.
              </p>
            </div>
            <div className="pt-3 mt-2 border-t border-slate-100 flex items-center text-xs font-bold text-[#005a9c]">
              <span>Access Help Desk</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition" />
            </div>
          </Link>

        </div>
      </section>

      {/* 4. APPLICATION PROCESSING WORKFLOW (GOVERNMENT E-GOVERNANCE TIMELINE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="border-b border-slate-300 pb-2">
          <h2 className="text-lg font-bold text-[#0b2545] uppercase tracking-wide">
            Application Processing Workflow
          </h2>
          <p className="text-xs text-slate-600">
            Standard operating procedure for industrial approval applications under Single Window Citizen Charter
          </p>
        </div>

        {/* Structured 7-Stage Process Visualization */}
        <div className="bg-white border border-slate-300 rounded p-6 shadow-2xs">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-3 relative text-center">
            
            {/* Stage 1 */}
            <div className="bg-[#f8fafc] border border-slate-200 rounded p-3 text-xs space-y-1">
              <div className="font-bold font-mono text-[10px] text-slate-500">STAGE 1</div>
              <div className="font-bold text-slate-900 leading-tight">Application Submission</div>
              <div className="text-[10px] text-slate-500">Entrepreneur / CAF</div>
              <div className="pt-1 text-[10px] font-bold text-emerald-700">✓ Completed</div>
            </div>

            {/* Stage 2 */}
            <div className="bg-[#f8fafc] border border-slate-200 rounded p-3 text-xs space-y-1">
              <div className="font-bold font-mono text-[10px] text-slate-500">STAGE 2</div>
              <div className="font-bold text-slate-900 leading-tight">Document Verification</div>
              <div className="text-[10px] text-slate-500">Single Window Cell</div>
              <div className="pt-1 text-[10px] font-bold text-emerald-700">✓ Completed</div>
            </div>

            {/* Stage 3 */}
            <div className="bg-[#f8fafc] border border-slate-200 rounded p-3 text-xs space-y-1">
              <div className="font-bold font-mono text-[10px] text-slate-500">STAGE 3</div>
              <div className="font-bold text-slate-900 leading-tight">AI-Assisted Pre-Scrutiny</div>
              <div className="text-[10px] text-slate-500">Sarthi AI Engine</div>
              <div className="pt-1 text-[10px] font-bold text-emerald-700">✓ Completed</div>
            </div>

            {/* Stage 4 */}
            <div className="bg-[#f8fafc] border-2 border-blue-400 rounded p-3 text-xs space-y-1 bg-blue-50/50">
              <div className="font-bold font-mono text-[10px] text-blue-700">STAGE 4</div>
              <div className="font-bold text-[#0b2545] leading-tight">Departmental Review</div>
              <div className="text-[10px] text-slate-600">MPCB / DISH / Fire</div>
              <div className="pt-1 text-[10px] font-bold text-blue-800">In Scrutiny</div>
            </div>

            {/* Stage 5 */}
            <div className="bg-[#fffbeb] border-2 border-amber-400 rounded p-3 text-xs space-y-1">
              <div className="font-bold font-mono text-[10px] text-amber-700">STAGE 5</div>
              <div className="font-bold text-amber-950 leading-tight">Query / Clarification</div>
              <div className="text-[10px] text-amber-800">Er. Sunita Patil (MPCB)</div>
              <div className="pt-1 text-[10px] font-bold text-amber-800 animate-pulse">Action Required</div>
            </div>

            {/* Stage 6 */}
            <div className="bg-[#f8fafc] border border-slate-200 rounded p-3 text-xs space-y-1 opacity-70">
              <div className="font-bold font-mono text-[10px] text-slate-400">STAGE 6</div>
              <div className="font-bold text-slate-800 leading-tight">Approval / Rejection</div>
              <div className="text-[10px] text-slate-500">Competent Authority</div>
              <div className="pt-1 text-[10px] font-bold text-slate-500">Pending</div>
            </div>

            {/* Stage 7 */}
            <div className="bg-[#f8fafc] border border-slate-200 rounded p-3 text-xs space-y-1 opacity-70">
              <div className="font-bold font-mono text-[10px] text-slate-400">STAGE 7</div>
              <div className="font-bold text-slate-800 leading-tight">Compliance & Renewal</div>
              <div className="text-[10px] text-slate-500">Annual Return / OCEMS</div>
              <div className="pt-1 text-[10px] font-bold text-slate-500">Post-Commission</div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. PROTOTYPE DEMONSTRATION CASE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border-2 border-slate-300 rounded-lg p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div className="flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-[#005a9c]" />
              <h2 className="text-sm font-bold text-[#0b2545] uppercase tracking-wider">
                Prototype Demonstration Case: ABC Manufacturing Pvt Ltd
              </h2>
            </div>
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 font-bold self-start sm:self-auto">
              Demo Data • Pune EV Manufacturing Unit
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="bg-[#f8fafc] p-3 rounded border border-slate-200">
              <span className="text-slate-500 block text-[10px] uppercase">Enterprise:</span>
              <span className="font-bold text-slate-900">ABC Manufacturing Pvt Ltd</span>
            </div>
            <div className="bg-[#f8fafc] p-3 rounded border border-slate-200">
              <span className="text-slate-500 block text-[10px] uppercase">Location:</span>
              <span className="font-semibold text-slate-900">Plot C-14, Chakan MIDC Phase II, Pune</span>
            </div>
            <div className="bg-[#f8fafc] p-3 rounded border border-slate-200">
              <span className="text-slate-500 block text-[10px] uppercase">Proposed Investment:</span>
              <span className="font-bold text-[#15803d]">₹25.40 Crores (Orange Category)</span>
            </div>
            <div className="bg-[#f8fafc] p-3 rounded border border-slate-200">
              <span className="text-slate-500 block text-[10px] uppercase">Workforce:</span>
              <span className="font-semibold text-slate-900">250 Personnel (110 Contractual)</span>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-slate-600">
              Status: <strong>3 Granted</strong>, <strong>3 In Progress</strong>, <strong>1 Query Active (MPCB)</strong>, <strong>1 Blocked</strong>.
            </div>
            <div className="flex items-center space-x-2">
              <Link
                href="/dashboard"
                className="px-3.5 py-1.5 rounded bg-[#005a9c] hover:bg-[#004780] text-white text-xs font-bold transition uppercase"
              >
                View Applicant Dashboard
              </Link>
              <Link
                href="/officer"
                className="px-3.5 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300 transition uppercase"
              >
                View Department Queue
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROTOTYPE DEMONSTRATION METRICS (REALISTIC & TRANSPARENTLY LABELED) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        <div className="border-b border-slate-300 pb-1 flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            Prototype Demonstration Metrics (Pune Pilot Benchmark)
          </h2>
          <span className="text-[10px] text-slate-500 font-mono">Sample Simulation Baseline</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded border border-slate-300 text-center">
            <div className="text-xs text-slate-500 font-semibold uppercase">Modeled Approvals</div>
            <div className="text-2xl font-black text-[#0b2545] mt-1 font-mono">8</div>
            <div className="text-[11px] text-slate-600">State & Central Clearances</div>
          </div>

          <div className="bg-white p-4 rounded border border-slate-300 text-center">
            <div className="text-xs text-slate-500 font-semibold uppercase">Departments Integrated</div>
            <div className="text-2xl font-black text-[#005a9c] mt-1 font-mono">6</div>
            <div className="text-[11px] text-slate-600">MPCB, MIDC, DISH, Fire, Power, Water</div>
          </div>

          <div className="bg-white p-4 rounded border border-slate-300 text-center">
            <div className="text-xs text-slate-500 font-semibold uppercase">Target Processing SLA</div>
            <div className="text-2xl font-black text-[#15803d] mt-1 font-mono">26.4 Days</div>
            <div className="text-[11px] text-slate-600">Citizen Charter Benchmark</div>
          </div>

          <div className="bg-white p-4 rounded border border-slate-300 text-center">
            <div className="text-xs text-slate-500 font-semibold uppercase">Dossier Documents</div>
            <div className="text-2xl font-black text-[#b45309] mt-1 font-mono">10</div>
            <div className="text-[11px] text-slate-600">Pre-Audited Blueprint Files</div>
          </div>
        </div>
      </section>

      {/* 7. STATUTORY ADVISORY DISCLAIMER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 rounded bg-[#fff8e6] border border-[#f3e5ab] text-slate-800 text-xs flex items-start space-x-3">
          <Info className="w-4 h-4 text-[#b45309] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Statutory Legal Disclaimer:</strong> UDYOG SARTHI is developed as an academic and technological prototype for{' '}
            <strong>Smart India Hackathon 2026</strong>. AI-assisted outputs, pre-audit flags, and dependency estimations are advisory decision-support tools.
            All formal sanctions, licenses, and statutory permits are issued solely by competent government authorities under relevant Acts.
          </div>
        </div>
      </section>

    </div>
  );
}
