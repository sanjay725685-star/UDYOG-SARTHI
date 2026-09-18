'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { Shield, User, Briefcase, Settings, ChevronDown, CheckCircle } from 'lucide-react';

export default function RoleSwitcher() {
  const { currentRole, setRole } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const roles: { id: UserRole; name: string; title: string; desc: string; icon: any; color: string }[] = [
    {
      id: 'entrepreneur',
      name: 'Entrepreneur / Business',
      title: 'ABC Manufacturing Pvt Ltd',
      desc: 'Applications, Documents, Approvals, Query Response',
      icon: Briefcase,
      color: 'text-blue-600 bg-blue-50 border-blue-200'
    },
    {
      id: 'officer',
      name: 'Department Officer',
      title: 'Er. Sunita Patil (MPCB SRO)',
      desc: 'Scrutiny Queue, AI Review Assistant, Query Desk, Sanction',
      icon: Shield,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200'
    },
    {
      id: 'nodal',
      name: 'Nodal / Facilitation Officer',
      title: 'State Single Window Authority',
      desc: 'Cross-Department SLA Tracking, Bottlenecks, Escalations',
      icon: User,
      color: 'text-amber-700 bg-amber-50 border-amber-200'
    },
    {
      id: 'admin',
      name: 'System Administrator',
      title: 'Regulatory Rules & Config',
      desc: 'Rules Engine, Approval Directory, Audit Logs, System Health',
      icon: Settings,
      color: 'text-purple-700 bg-purple-50 border-purple-200'
    }
  ];

  const current = roles.find(r => r.id === currentRole) || roles[0];
  const CurrentIcon = current.icon;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white shadow-sm hover:bg-slate-50 transition text-xs md:text-sm font-medium"
      >
        <span className={`p-1 rounded ${current.color}`}>
          <CurrentIcon className="w-3.5 h-3.5" />
        </span>
        <div className="text-left hidden sm:block">
          <div className="font-semibold text-slate-800 leading-tight flex items-center gap-1.5">
            {current.name}
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 uppercase border border-slate-200">
              Role
            </span>
          </div>
          <div className="text-[11px] text-slate-500 truncate max-w-[130px]">{current.title}</div>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Switch Active Persona
              </span>
              <span className="text-[10px] bg-sarthi-100 text-sarthi-800 font-medium px-2 py-0.5 rounded-full">
                Interactive Demo
              </span>
            </div>
            <div className="p-1 space-y-1">
              {roles.map(r => {
                const Icon = r.icon;
                const isSelected = r.id === currentRole;
                return (
                  <button
                    key={r.id}
                    onClick={() => {
                      setRole(r.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-start space-x-3 transition ${
                      isSelected
                        ? 'bg-sarthi-50 border border-sarthi-200 shadow-xs'
                        : 'hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    <span className={`p-1.5 rounded-md mt-0.5 ${r.color}`}>
                      <Icon className="w-4 h-4" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">{r.name}</span>
                        {isSelected && <CheckCircle className="w-3.5 h-3.5 text-sarthi-600" />}
                      </div>
                      <div className="text-[11px] font-medium text-slate-700">{r.title}</div>
                      <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{r.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="px-3 py-2 mt-1 border-t border-slate-100 bg-slate-50 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Switching instantly filters navigation & data</span>
              <span className="font-semibold text-sarthi-700">RBAC Active</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
