'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  HelpCircle,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  Plus,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  Building2
} from 'lucide-react';

export default function SupportPage() {
  const { grievances, addGrievance } = useApp();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [isGrievanceModalOpen, setIsGrievanceModalOpen] = useState(false);

  // Grievance form state
  const [appId, setAppId] = useState('APP-2026-MPCB-0842');
  const [category, setCategory] = useState('Department Scrutiny Delay');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'critical'>('high');

  const faqs = [
    {
      q: 'What is Consent to Establish (CTE) and when is it required?',
      a: 'Consent to Establish (CTE) is a statutory permit under the Water Act 1974 and Air Act 1981 granted by State Pollution Control Boards (e.g. MPCB). It is mandatory prior to commencing physical factory construction or equipment installation for any industrial unit classified under Red, Orange, or Green categories.'
    },
    {
      q: 'Why can’t I apply for the DISH Factory License immediately?',
      a: 'Under the Maharashtra Factories Rules 1963 and the Factories Act 1948, the Directorate of Industrial Safety & Health requires that the physical plant layout first has statutory environmental clearance (MPCB Consent to Establish) and Provisional Fire NOC to verify occupational safety.'
    },
    {
      q: 'What is the function of the AI Document Pre-Audit tool?',
      a: 'The AI Pre-Audit engine vectorizes uploaded blueprints and documents, verifies PAN/GSTIN concordance, validates engineering capacity equations (such as ETP flow sizing), and flags discrepancies so entrepreneurs can rectify them before departmental officers begin scrutiny.'
    },
    {
      q: 'How does UDYOG SARTHI handle legacy single-window systems like MAITRI and NSWS?',
      a: 'UDYOG SARTHI features an API-Ready adapter architecture. It ingests the Common Application Form (CAF) from the National Single Window System (NSWS) or state systems like MAITRI via REST webhooks and passes back verified milestones.'
    }
  ];

  const handleCreateGrievance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;

    addGrievance({
      applicationId: appId,
      category,
      subject,
      description,
      priority
    });

    setIsGrievanceModalOpen(false);
    setSubject('');
    setDescription('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-sarthi-600 mb-1">
            <HelpCircle className="w-4 h-4 text-sarthi-600" />
            <span>Investor Facilitation & Grievance Redressal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Support & District Facilitation Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Direct assistance from District Industries Centre (DIC) facilitation officers, grievance redressal, and regulatory FAQs.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => setIsGrievanceModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md transition"
          >
            <Plus className="w-4 h-4" />
            <span>Raise Formal Grievance</span>
          </button>
        </div>
      </div>

      {/* Facilitation Officers Directory */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-sarthi-600" />
          <span>District Industries Centre (DIC Pune) Facilitation Desk</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs">
            <div className="font-bold text-slate-900 text-sm">Sh. Arvind Gaikwad</div>
            <div className="text-sarthi-700 font-semibold">General Manager, DIC Pune</div>
            <p className="text-slate-500">Nodal Investor Relations & Escort Service for Large Industries</p>
            <div className="pt-2 border-t border-slate-200 space-y-1 text-slate-600">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>+91 (020) 2612-4890</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>gm.dic-pune@maharashtra.gov.in</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs">
            <div className="font-bold text-slate-900 text-sm">Smt. Meena Shinde</div>
            <div className="text-amber-700 font-semibold">Single Window Facilitation Officer</div>
            <p className="text-slate-500">Fast-Track Clearance Inter-Departmental Escalation Desk</p>
            <div className="pt-2 border-t border-slate-200 space-y-1 text-slate-600">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>+91 (020) 2612-5102</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>nodal.swc@maharashtra.gov.in</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs">
            <div className="font-bold text-slate-900 text-sm">MIDC Chakan Sub-Division Office</div>
            <div className="text-blue-700 font-semibold">Executive Engineer & Regional Office</div>
            <p className="text-slate-500">Land Possession, Water Pipeline, and Zoning Clearances</p>
            <div className="pt-2 border-t border-slate-200 space-y-1 text-slate-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>MIDC Administrative Bldg, Chakan Phase II, Pune 410501</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>1800-233-1020 (Toll-Free Helpline)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Track Raised Grievances */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Your Registered Grievances & Escalations ({grievances.length})
            </h3>
          </div>
          <button
            onClick={() => setIsGrievanceModalOpen(true)}
            className="text-xs font-bold text-amber-700 hover:underline"
          >
            + File New Ticket
          </button>
        </div>

        <div className="space-y-3">
          {grievances.map(g => (
            <div
              key={g.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-bold text-slate-900">{g.id}</span>
                  <span className="font-mono text-sarthi-700 font-semibold">{g.applicationId}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                    {g.priority.toUpperCase()} PRIORITY
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{g.subject}</h4>
                <p className="text-slate-600 max-w-2xl">{g.description}</p>
                {g.resolutionNotes && (
                  <div className="text-[11px] text-emerald-700 font-medium">
                    Officer Resolution Note: {g.resolutionNotes}
                  </div>
                )}
              </div>

              <div className="shrink-0 text-right">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{g.status}</span>
                </span>
                <div className="text-[10px] text-slate-400 mt-1 font-mono">{g.assignedOfficer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Frequently Asked Questions Accordion */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
          Frequently Asked Regulatory Questions
        </h3>

        <div className="space-y-2">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-slate-200 rounded-xl overflow-hidden transition"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full text-left p-4 text-xs font-bold text-slate-900 hover:bg-slate-50 flex items-center justify-between"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    activeFaq === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {activeFaq === idx && (
                <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed bg-slate-50/50 border-t border-slate-100">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Grievance Modal */}
      {isGrievanceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4 animate-in fade-in duration-150">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Raise Formal Investor Grievance</h3>
              <p className="text-xs text-slate-500">
                Escalate inspection delays, officer queries, or technical clearance bottlenecks to the State Nodal Authority.
              </p>
            </div>

            <form onSubmit={handleCreateGrievance} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Linked Application ID</label>
                <input
                  type="text"
                  value={appId}
                  onChange={e => setAppId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono focus:ring-2 focus:ring-sarthi-500"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Grievance Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                >
                  <option value="Department Scrutiny Delay">Department Scrutiny Delay beyond SLA</option>
                  <option value="Inspection Team Non-Arrival">Site Inspection Team Non-Arrival</option>
                  <option value="Repeated Redundant Query">Repeated / Redundant Technical Query</option>
                  <option value="Digital Portal Technical Failure">Single Window Portal / Payment Glitch</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Subject / Summary</label>
                <input
                  type="text"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  placeholder="e.g. MPCB CTE review delayed 12 days past Citizen Charter mandate"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sarthi-500"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Detailed Description</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Provide timestamps, officer names, and business impact..."
                  className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sarthi-500"
                  required
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsGrievanceModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-xs"
                >
                  Register Grievance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
