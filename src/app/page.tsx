'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  GitFork,
  FileCheck,
  Activity,
  Layers,
  CheckCircle2,
  Clock,
  Building2,
  Cpu,
  AlertTriangle,
  Play,
  TrendingUp,
  FileSearch,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const { setRole, setDemoStep } = useApp();

  const startJourney = () => {
    setRole('entrepreneur');
    setDemoStep(2);
    router.push('/register?step=1');
  };

  const exploreDiscovery = () => {
    setRole('entrepreneur');
    setDemoStep(5);
    router.push('/discovery');
  };

  return (
    <div className="space-y-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sarthi-950 via-slate-900 to-slate-950 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        {/* Subtle background glow effect */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-sarthi-600/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10 space-y-6">
          
          {/* Top pill badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sarthi-900/80 border border-sarthi-600/40 text-xs font-semibold text-sarthi-200 shadow-inner">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span>Smart India Hackathon 2026 Innovation Prototype</span>
            <span className="text-slate-400">|</span>
            <span className="text-amber-300 font-mono">Next-Gen Single Window Platform</span>
          </div>

          {/* Headline & Tagline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-tight">
            Your Intelligent Journey from{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-amber-300 bg-clip-text text-transparent">
              Application to Approval
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
            &quot;From Application to Approval — One Intelligent Regulatory Journey&quot;
          </p>

          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            UDYOG SARTHI redefines industrial compliance in India. Eliminate fragmented departmental silos,
            resolve opaque approval dependencies with interactive DAG graphs, pre-audit blueprints via neural OCR,
            and fast-track factory commissioning.
          </p>

          {/* Hero CTAs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={startJourney}
              className="flex items-center space-x-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-sarthi-500 to-blue-600 hover:from-sarthi-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-sarthi-600/30 transition transform hover:-translate-y-0.5"
            >
              <span>Start Your Approval Journey</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={exploreDiscovery}
              className="flex items-center space-x-2 px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm transition"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Know Your Required Approvals</span>
            </button>

            <Link
              href="/dashboard"
              className="flex items-center space-x-2 px-5 py-3.5 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white border border-emerald-500/40 font-semibold text-sm transition"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Launch Demo Case (Pune EV Unit)</span>
            </Link>
          </div>

          {/* Quick Disclaimer */}
          <div className="pt-2 text-[11px] text-slate-500 max-w-xl mx-auto">
            Statutory AI Disclaimer: UDYOG SARTHI provides AI-assisted decision support. All final approvals are
            sanctioned exclusively by statutory government officers.
          </div>
        </div>

        {/* 2. STATS CARDS BAR */}
        <div className="max-w-7xl mx-auto mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl backdrop-blur-xs text-center">
            <div className="text-2xl sm:text-3xl font-black text-white">84+</div>
            <div className="text-xs font-semibold text-slate-400 mt-1">Approvals Managed</div>
            <div className="text-[10px] text-emerald-400 mt-0.5">Central & State Clearances</div>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl backdrop-blur-xs text-center">
            <div className="text-2xl sm:text-3xl font-black text-amber-400">18</div>
            <div className="text-xs font-semibold text-slate-400 mt-1">Departments Connected</div>
            <div className="text-[10px] text-slate-400 mt-0.5">MPCB, MIDC, DISH, Fire, Power</div>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl backdrop-blur-xs text-center">
            <div className="text-2xl sm:text-3xl font-black text-cyan-400">14,280+</div>
            <div className="text-xs font-semibold text-slate-400 mt-1">Applications Tracked</div>
            <div className="text-[10px] text-cyan-300 mt-0.5">62% Faster Clearance Turnaround</div>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl backdrop-blur-xs text-center">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">186,000+</div>
            <div className="text-xs font-semibold text-slate-400 mt-1">Documents AI Pre-Audited</div>
            <div className="text-[10px] text-emerald-300 mt-0.5">91% First-Time Right Rate</div>
          </div>
        </div>
      </section>

      {/* 3. PROBLEM IT SOLVES & SOLUTION ARCHITECTURE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-sarthi-600 bg-sarthi-50 px-3 py-1 rounded-full border border-sarthi-200">
            The Industrial Challenge
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3">
            Why Setting Up a Factory Takes 6–18 Months in India
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Even with single-window portals, entrepreneurs face systemic friction that stalls capital investment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-rose-100 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="font-bold text-slate-900 text-base">Opaque Approval Dependencies</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Entrepreneurs apply for Factory License without knowing it strictly requires MPCB Consent to Establish and Fire NOC first, causing months of silent departmental stalling.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-rose-100 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="font-bold text-slate-900 text-base">Repeated Document Submissions</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Same company PAN, GSTIN, land title deed, and site blueprints are repeatedly uploaded and verified across 7 different department portals with zero interoperability.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-rose-100 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="font-bold text-slate-900 text-base">Avoidable Query Cycles</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Minor drawing mismatches or missing ETP calculations are discovered only after 30 days of officer queue wait, triggering back-and-forth queries that reset statutory clocks.
            </p>
          </div>
        </div>
      </section>

      {/* 4. THE 6 CORE FEATURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Intelligent Platform Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3">
            Architected for Smart India Hackathon 2026
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Taking inspiration from NSWS, Maharashtra MAITRI, and MIDC Single Window Clearance, with an original AI layer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Feature 1 */}
          <Link
            href="/discovery"
            className="group p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-sarthi-400 transition flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-sarthi-700 transition">
                AI Approval Discovery
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Smart rules engine analyzes capital outlay, workforce, plot size, effluent discharge, and power needs to generate a comprehensive list of required statutory clearances.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sarthi-600">
              <span>Explore Engine</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Feature 2 */}
          <Link
            href="/pre-audit"
            className="group p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-sarthi-400 transition flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <FileSearch className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-sarthi-700 transition">
                Intelligent Document Pre-Audit
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Drag-and-drop OCR scans uploaded blueprints, DPRs, and certificates. Cross-references GSTIN, verifies retention formulas, and highlights flaws before officer submission.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sarthi-600">
              <span>Run AI Scanner</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Feature 3 */}
          <Link
            href="/dependency-graph"
            className="group p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-sarthi-400 transition flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <GitFork className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-sarthi-700 transition">
                Approval Dependency Graph (DAG)
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Interactive React Flow canvas visually graphs prerequisite relationships. Click any node to understand why it is blocked and what upstream action unlocks it.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sarthi-600">
              <span>Open React Flow Canvas</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Feature 4 */}
          <Link
            href="/bottlenecks"
            className="group p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-sarthi-400 transition flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-sarthi-700 transition">
                Critical Path Intelligence
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Graph-theoretic algorithms calculate the critical clearance sequence. Identifies downstream cascading risks and recommends fast-track interventions.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sarthi-600">
              <span>Inspect Bottlenecks</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Feature 5 */}
          <Link
            href="/journey"
            className="group p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-sarthi-400 transition flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-sarthi-700 transition">
                Workflow Orchestration
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                9-stage visual milestone journey from initial business registration to digital sanction certificate, auto-suggesting actionable next steps at each checkpoint.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sarthi-600">
              <span>View Orchestration</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Feature 6 */}
          <Link
            href="/officer"
            className="group p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-sarthi-400 transition flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-sarthi-700 transition">
                Role-Based Workspaces
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Tailored cockpits for Entrepreneurs, Department Scrutiny Officers (MPCB, DISH, MIDC), State Nodal Officers, and System Administrators with strict RBAC isolation.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sarthi-600">
              <span>Switch Personas</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </Link>
        </div>
      </section>

      {/* 5. PRE-POPULATED DEMO CASE PREVIEW CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-sarthi-900 via-slate-900 to-sarthi-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-sarthi-700/50 relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            <div className="lg:col-span-2 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
                <Building2 className="w-3.5 h-3.5" />
                <span>Pre-Populated Hackathon Evaluation Case</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                ABC Manufacturing Pvt Ltd — EV Components Unit
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Experience an end-to-end interactive simulation of an Electric Vehicle assembly unit in{' '}
                <strong className="text-white">MIDC Chakan Phase II, Pune</strong> with a proposed capital outlay of{' '}
                <strong className="text-amber-300">₹25 Crore</strong> and 250 personnel.
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-300">
                <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700">8 Approvals Modeled</span>
                <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700">10 Documents Verified</span>
                <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700">1 Active MPCB Query</span>
                <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700">1 Digital Certificate Unlocked</span>
              </div>
            </div>

            <div className="lg:col-span-1 flex flex-col space-y-3">
              <Link
                href="/dashboard"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs text-center shadow-lg transition"
              >
                Enter Entrepreneur Dashboard
              </Link>
              <Link
                href="/officer"
                className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs text-center transition"
              >
                Open Government Officer Workbench
              </Link>
              <Link
                href="/dependency-graph"
                className="w-full py-3 px-4 rounded-xl bg-sarthi-800 hover:bg-sarthi-700 text-white border border-sarthi-600 font-semibold text-xs text-center transition"
              >
                View Approval Dependency Graph
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
