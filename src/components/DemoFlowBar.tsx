'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  ListOrdered,
  Eye,
  CheckCircle2,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const DEMO_STEPS = [
  { step: 1, title: 'Landing Page', path: '/', role: 'entrepreneur', desc: 'Hero, problem statement, key metrics & single-window value proposition' },
  { step: 2, title: 'Register Business (Step 1)', path: '/register?step=1', role: 'entrepreneur', desc: 'Corporate details, GSTIN, PAN validation for ABC Manufacturing' },
  { step: 3, title: 'Project Details (Step 2)', path: '/register?step=2', role: 'entrepreneur', desc: 'EV Unit in Pune MIDC, ₹25 Cr investment, 250 employees' },
  { step: 4, title: 'Project Requirements (Step 3)', path: '/register?step=3', role: 'entrepreneur', desc: 'Intelligent questionnaire: power, effluent, boiler, fire hazards' },
  { step: 5, title: 'AI Approval Discovery', path: '/discovery', role: 'entrepreneur', desc: 'Auto-generates 8 statutory approvals with AI reasoning & legal disclaimers' },
  { step: 6, title: 'Approval Dependency Graph', path: '/dependency-graph', role: 'entrepreneur', desc: 'Interactive React Flow DAG showing prerequisites, blockages & status' },
  { step: 7, title: 'Document Checklist', path: '/documents', role: 'entrepreneur', desc: 'Unified multi-department document repository & missing file checklist' },
  { step: 8, title: 'AI Document Pre-Audit', path: '/pre-audit', role: 'entrepreneur', desc: 'Drag-and-drop OCR laser scanning, field extraction & mismatch alerts' },
  { step: 9, title: 'Workflow Journey Timeline', path: '/journey', role: 'entrepreneur', desc: '9-stage orchestration timeline with automated next-action suggestions' },
  { step: 10, title: 'Critical Path & Bottlenecks', path: '/bottlenecks', role: 'entrepreneur', desc: 'NetworkX graph analysis highlighting high-risk delays on MPCB CTE' },
  { step: 11, title: 'Entrepreneur Dashboard', path: '/dashboard', role: 'entrepreneur', desc: 'Active applications, KPI cards, pending queries & quick shortcuts' },
  { step: 12, title: 'Application Deep-Dive', path: '/applications/APP-2026-MPCB-0842', role: 'entrepreneur', desc: 'Detailed tracking for Consent to Establish with full audit trail' },
  { step: 13, title: 'Officer Dashboard Queue', path: '/officer', role: 'officer', desc: 'Department officer workbench, SLA timers & prioritized scrutiny queue' },
  { step: 14, title: 'AI Officer Review Assistant', path: '/officer/review/APP-2026-MPCB-0842', role: 'officer', desc: 'Split-screen AI review assistant with risk score & statutory guardrails' },
  { step: 15, title: 'Officer Raises Query', path: '/queries', role: 'officer', desc: 'Er. Sunita Patil raises query on ETP neutralizer design with 4-day SLA' },
  { step: 16, title: 'Entrepreneur Notification', path: '/notifications', role: 'entrepreneur', desc: 'Instant alert received regarding MPCB technical discrepancy' },
  { step: 17, title: 'Query Resolution & Upload', path: '/queries', role: 'entrepreneur', desc: 'Entrepreneur submits explanation with revised ETP CAD blueprint' },
  { step: 18, title: 'Officer Sanctions Approval', path: '/officer/review/APP-2026-MPCB-0842', role: 'officer', desc: 'Officer verifies re-audit, clicks Approve, issuing formal sanction' },
  { step: 19, title: 'Digital Certificate Issued', path: '/applications/APP-2026-MPCB-0842?certificate=true', role: 'entrepreneur', desc: 'Official government certificate unlocked with QR code & digital seal' },
  { step: 20, title: 'Admin Rules & Analytics', path: '/admin/rules', role: 'admin', desc: 'Regulatory rules engine, BI analytics, impact & single-window citations' }
];

export default function DemoFlowBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { demoStep, setDemoStep, setRole, resetToDefault } = useApp();
  const [isMinimized, setIsMinimized] = useState(false);
  const [showList, setShowList] = useState(false);

  const current = DEMO_STEPS.find(s => s.step === demoStep) || DEMO_STEPS[0];

  const goToStep = (stepNumber: number) => {
    const target = DEMO_STEPS.find(s => s.step === stepNumber);
    if (!target) return;
    setDemoStep(stepNumber);
    setRole(target.role as any);
    router.push(target.path);
    setShowList(false);
  };

  const nextStep = () => {
    if (demoStep < DEMO_STEPS.length) {
      goToStep(demoStep + 1);
    }
  };

  const prevStep = () => {
    if (demoStep > 1) {
      goToStep(demoStep - 1);
    }
  };

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
      <div className="bg-slate-900/95 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-slate-700/80 p-3 transition-all duration-300">
        <div className="flex items-center justify-between gap-3">
          
          {/* Left: Badge & Step Header */}
          <div className="flex items-center space-x-3 min-w-0">
            <div className="flex items-center space-x-2 shrink-0">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="hidden sm:inline-flex text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sarthi-700/60 text-sarthi-200 border border-sarthi-500/30">
                SIH 2026 Prototype Flow
              </span>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowList(!showList)}
                className="flex items-center space-x-2 text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 transition"
              >
                <span className="text-amber-400 font-mono">Step {demoStep} of {DEMO_STEPS.length}:</span>
                <span className="truncate max-w-[130px] sm:max-w-[200px] text-slate-200">{current.title}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>

              {/* Step Dropdown Menu */}
              {showList && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowList(false)} />
                  <div className="absolute bottom-full mb-2 left-0 w-80 sm:w-96 max-h-96 overflow-y-auto bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50 space-y-1">
                    <div className="px-3 py-1.5 border-b border-slate-800 flex items-center justify-between text-xs font-bold text-slate-300">
                      <span>Jump to Flow Milestone</span>
                      <span className="text-[10px] text-slate-400">20 Clickable Steps</span>
                    </div>
                    {DEMO_STEPS.map(s => (
                      <button
                        key={s.step}
                        onClick={() => goToStep(s.step)}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center justify-between transition ${
                          s.step === demoStep
                            ? 'bg-sarthi-600 text-white font-bold'
                            : 'hover:bg-slate-800 text-slate-300'
                        }`}
                      >
                        <div className="truncate pr-2">
                          <span className="font-mono text-amber-400 mr-2">#{s.step}</span>
                          <span>{s.title}</span>
                        </div>
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                          {s.role}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Center: Context Description (Desktop) */}
          <div className="hidden md:block flex-1 text-xs text-slate-300 truncate">
            {current.desc}
          </div>

          {/* Right: Next / Prev & Reset Controls */}
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={prevStep}
              disabled={demoStep === 1}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed border border-slate-700 transition"
              title="Previous Step"
            >
              <ChevronLeft className="w-4 h-4 text-slate-200" />
            </button>

            <button
              onClick={nextStep}
              disabled={demoStep === DEMO_STEPS.length}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-sarthi-600 to-blue-600 hover:from-sarthi-500 hover:to-blue-500 text-xs font-semibold shadow-md transition disabled:opacity-40"
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                resetToDefault();
                goToStep(1);
              }}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition"
              title="Reset Demo to Initial State"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
