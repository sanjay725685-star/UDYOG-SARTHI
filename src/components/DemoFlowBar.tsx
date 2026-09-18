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
  ChevronDown,
  ChevronUp,
  X,
  Compass
} from 'lucide-react';

export const DEMO_STEPS = [
  { step: 1, title: 'Portal Homepage', path: '/', role: 'entrepreneur', desc: 'Government service homepage with industrial service cards & workflow' },
  { step: 2, title: 'Register Entity (Step 1)', path: '/register?step=1', role: 'entrepreneur', desc: 'Corporate legal constitution, MCA21, GSTIN, PAN validation' },
  { step: 3, title: 'Project Profiler (Step 2)', path: '/register?step=2', role: 'entrepreneur', desc: 'Pune MIDC Chakan EV unit, ₹25 Cr Capex, 250 workers' },
  { step: 4, title: 'Statutory Utilities (Step 3)', path: '/register?step=3', role: 'entrepreneur', desc: 'Pollution Orange Category, power 1200 kVA, water 75 KLD, boiler' },
  { step: 5, title: 'AI Approval Discovery', path: '/discovery', role: 'entrepreneur', desc: '8 statutory clearances identified with fees, SLAs, and disclaimers' },
  { step: 6, title: 'Approval Dependency Graph', path: '/dependency-graph', role: 'entrepreneur', desc: 'Administrative DAG flowchart showing prerequisite linkages' },
  { step: 7, title: 'Document Checklist', path: '/documents', role: 'entrepreneur', desc: 'Unified multi-department dossier vault and verification status' },
  { step: 8, title: 'AI Document Pre-Scrutiny', path: '/pre-audit', role: 'entrepreneur', desc: 'Optical character extraction, GST cross-match, ETP capacity audit' },
  { step: 9, title: 'Application Processing Timeline', path: '/journey', role: 'entrepreneur', desc: '7-stage e-governance process timeline with departmental tracking' },
  { step: 10, title: 'Critical Path & Bottlenecks', path: '/bottlenecks', role: 'entrepreneur', desc: 'Downstream dependency risk matrix & what-if delay cost simulator' },
  { step: 11, title: 'Applicant Dashboard', path: '/dashboard', role: 'entrepreneur', desc: 'Logged-in industrial user dashboard & active application registry' },
  { step: 12, title: 'Application Deep-Dive', path: '/applications/APP-2026-MPCB-0842', role: 'entrepreneur', desc: 'Full application dossier APP-2026-MPCB-0842 with audit history' },
  { step: 13, title: 'Departmental Queue', path: '/officer', role: 'officer', desc: 'MPCB Sub-Regional Officer scrutiny queue and SLA timers' },
  { step: 14, title: 'AI Officer Review Assistant', path: '/officer/review/APP-2026-MPCB-0842', role: 'officer', desc: 'Split-screen officer workbench with advisory check flags' },
  { step: 15, title: 'Department Raises Query', path: '/queries', role: 'officer', desc: 'Officer Sunita Patil issues technical query on ETP neutralizer' },
  { step: 16, title: 'Applicant Notification', path: '/notifications', role: 'entrepreneur', desc: 'Applicant receives SMS/Email notification of department query' },
  { step: 17, title: 'Query Clarification Response', path: '/queries', role: 'entrepreneur', desc: 'Applicant uploads revised ETP CAD blueprint with pre-audit' },
  { step: 18, title: 'Officer Sanctions Order', path: '/officer/review/APP-2026-MPCB-0842', role: 'officer', desc: 'Officer verifies re-audit and executes statutory approval' },
  { step: 19, title: 'Digital Sanction Order', path: '/applications/APP-2026-MPCB-0842?certificate=true', role: 'entrepreneur', desc: 'Official digital clearance certificate with QR code and DSC seal' },
  { step: 20, title: 'Rules Engine & Telemetry', path: '/admin/rules', role: 'admin', desc: 'Declarative regulatory rules, BI telemetry, and GoI citations' }
];

export default function DemoFlowBar() {
  const router = useRouter();
  const { demoStep, setDemoStep, setRole, resetToDefault } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);
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

  const nextStep = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (demoStep < DEMO_STEPS.length) {
      goToStep(demoStep + 1);
    }
  };

  const prevStep = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (demoStep > 1) {
      goToStep(demoStep - 1);
    }
  };

  return (
    <aside aria-label="Demo flow guide" className="fixed bottom-3 right-3 z-30 max-w-sm sm:max-w-md">
      {/* Expanded Modal Box */}
      {isExpanded ? (
        <div className="bg-[#0b2545] text-white rounded-xl shadow-2xl border-2 border-amber-400/80 p-3.5 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-150 text-xs">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-700 pb-2">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">
                SIH 2026 Prototype Guide
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 rounded text-slate-300 hover:text-white hover:bg-slate-800"
              title="Minimize Demo Panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Current Step Description */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
              <span className="text-amber-400 font-bold">Milestone {demoStep} of {DEMO_STEPS.length}:</span>
              <span className="uppercase px-1.5 py-0.5 rounded bg-slate-800 text-[9px] border border-slate-700">
                Role: {current.role}
              </span>
            </div>
            <div className="font-bold text-white text-xs">{current.title}</div>
            <p className="text-[11px] text-slate-300 leading-snug">{current.desc}</p>
          </div>

          {/* Jump to any step dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowList(!showList)}
              className="w-full py-1.5 px-2.5 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600 text-left text-[11px] font-medium flex items-center justify-between"
            >
              <span>Jump to Workflow Step...</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showList && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowList(false)} />
                <div className="absolute bottom-full mb-1 left-0 right-0 max-h-60 overflow-y-auto bg-slate-900 border border-slate-700 rounded-lg shadow-xl p-1 z-50 space-y-0.5 text-[11px]">
                  {DEMO_STEPS.map(s => (
                    <button
                      key={s.step}
                      onClick={() => goToStep(s.step)}
                      className={`w-full text-left px-2 py-1 rounded flex items-center justify-between ${
                        s.step === demoStep
                          ? 'bg-[#005a9c] text-white font-bold'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="truncate">#{s.step} {s.title}</span>
                      <span className="text-[9px] text-slate-400 uppercase ml-1">{s.role}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-700 gap-2">
            <div className="flex items-center space-x-1">
              <button
                onClick={prevStep}
                disabled={demoStep === 1}
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 border border-slate-600"
                title="Previous Milestone"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={nextStep}
                disabled={demoStep === DEMO_STEPS.length}
                className="px-2.5 py-1 rounded bg-[#005a9c] hover:bg-[#006bb8] text-white font-bold flex items-center gap-1 shadow-2xs"
              >
                <span>Next Step</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={() => {
                resetToDefault();
                goToStep(1);
              }}
              className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-600"
              title="Reset Prototype State"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* Compact Floating Badge (Never covers page buttons or text) */
        <div
          onClick={() => setIsExpanded(true)}
          className="cursor-pointer bg-[#0b2545] hover:bg-[#133b5c] text-white px-3 py-2 rounded-lg shadow-lg border border-amber-400/80 flex items-center space-x-2 transition-all"
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-[11px] font-bold text-amber-300 font-mono">
            Demo Guide: Step {demoStep}/20
          </span>
          <span className="text-[10px] text-slate-300 hidden sm:inline truncate max-w-[120px]">
            • {current.title}
          </span>
          <div className="flex items-center space-x-1 pl-1 border-l border-slate-700">
            <button
              onClick={nextStep}
              className="p-1 rounded bg-[#005a9c] hover:bg-[#006bb8] text-white text-[10px]"
              title="Next Step"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
