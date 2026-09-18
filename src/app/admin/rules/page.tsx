'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '../../../context/AppContext';
import { RegulatoryRule } from '../../../types';
import {
  ShieldCheck,
  Plus,
  ArrowLeft,
  Sparkles,
  Sliders,
  CheckCircle2,
  Clock,
  Archive,
  Layers,
  Search,
  Code2
} from 'lucide-react';

export default function RulesEnginePage() {
  const { rules, addRule } = useApp();
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'ACTIVE' | 'DRAFT' | 'ARCHIVED'>('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New rule form state
  const [newRuleName, setNewRuleName] = useState('');
  const [newRuleDesc, setNewRuleDesc] = useState('');
  const [newRuleSector, setNewRuleSector] = useState('Automobile & Electric Mobility');
  const [newRuleDept, setNewRuleDept] = useState('Maharashtra Pollution Control Board');
  const [newRuleMinInv, setNewRuleMinInv] = useState(10);
  const [newRuleSla, setNewRuleSla] = useState(30);

  const filteredRules = rules.filter(r => {
    if (filterStatus !== 'ALL' && r.status !== filterStatus) return false;
    return true;
  });

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleName.trim()) return;

    addRule({
      name: newRuleName,
      description: newRuleDesc || `IF Sector = ${newRuleSector} AND Investment > ₹${newRuleMinInv} Cr THEN Trigger Statutory Scrutiny with ${newRuleDept}.`,
      sector: newRuleSector,
      investmentMinCr: newRuleMinInv,
      triggeredApprovals: ['CUSTOM-CLEARANCE'],
      department: newRuleDept,
      slaDays: newRuleSla,
      status: 'ACTIVE',
      version: 'v1.0'
    });

    setIsAddModalOpen(false);
    setNewRuleName('');
    setNewRuleDesc('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-purple-700 mb-1">
            <Link href="/admin" className="flex items-center gap-1 hover:underline">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Admin Console</span>
            </Link>
            <span>•</span>
            <span>Versioned Rule Execution Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Regulatory Rules Engine & Conditional Logic
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Define declarative condition → outcome rules linking industrial project parameters to statutory clearances.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md transition"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Regulatory Rule</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
        {(['ALL', 'ACTIVE', 'DRAFT', 'ARCHIVED'] as const).map(st => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              filterStatus === st
                ? 'bg-purple-600 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {st} ({st === 'ALL' ? rules.length : rules.filter(r => r.status === st).length})
          </button>
        ))}
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredRules.map(rule => (
          <div
            key={rule.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition space-y-4 flex flex-col justify-between"
          >
            <div>
              {/* Header Badges */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    {rule.id}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-50 text-purple-800 font-bold border border-purple-200">
                    {rule.version}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    rule.status === 'ACTIVE'
                      ? 'bg-emerald-100 text-emerald-800'
                      : rule.status === 'DRAFT'
                      ? 'bg-amber-100 text-amber-900'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {rule.status}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-slate-900 leading-snug">{rule.name}</h3>
              <p className="text-xs text-purple-700 font-medium mt-0.5">{rule.department}</p>

              {/* Declarative IF-THEN Expression */}
              <div className="mt-3 p-3.5 rounded-xl bg-slate-900 text-cyan-300 font-mono text-xs leading-relaxed border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold mb-1">
                  Declarative Condition Rule:
                </span>
                {rule.description}
              </div>

              {/* Scope & Triggers */}
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div>
                  <span className="text-[11px] text-slate-400 block">Sector Applicability:</span>
                  <span className="font-semibold text-slate-800">{rule.sector}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Triggered Clearances:</span>
                  <span className="font-mono font-bold text-slate-800">{rule.triggeredApprovals.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>SLA: {rule.slaDays} Days</span>
              <span>Updated: {rule.updatedAt}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Create Rule Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4 animate-in fade-in duration-150">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Define New Regulatory Rule</h3>
              <p className="text-xs text-slate-500">Add an automated conditional trigger for industrial clearances</p>
            </div>

            <form onSubmit={handleCreateRule} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Rule Name</label>
                <input
                  type="text"
                  value={newRuleName}
                  onChange={e => setNewRuleName(e.target.value)}
                  placeholder="e.g. Hazardous Battery Waste EPR Clearance"
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Department</label>
                <input
                  type="text"
                  value={newRuleDept}
                  onChange={e => setNewRuleDept(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Min Investment (₹ Cr)</label>
                  <input
                    type="number"
                    value={newRuleMinInv}
                    onChange={e => setNewRuleMinInv(parseFloat(e.target.value) || 0)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">SLA Days</label>
                  <input
                    type="number"
                    value={newRuleSla}
                    onChange={e => setNewRuleSla(parseInt(e.target.value) || 0)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">IF-THEN Expression Formula</label>
                <textarea
                  rows={3}
                  value={newRuleDesc}
                  onChange={e => setNewRuleDesc(e.target.value)}
                  placeholder="IF Industry = Chemical AND Investment > ₹10 Cr THEN Environmental Approval = Required..."
                  className="w-full text-xs p-3 rounded-lg border border-slate-300 font-mono focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs"
                >
                  Deploy Rule (Active)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
