'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import MetricCard from '../../components/MetricCard';
import {
  Settings,
  ShieldCheck,
  Compass,
  Activity,
  Users,
  Database,
  Lock,
  ArrowRight,
  Server,
  Layers
} from 'lucide-react';

export default function AdminConsolePage() {
  const { rules, approvals } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-purple-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-purple-900 text-purple-300 border border-purple-700">
              System Administration
            </span>
            <span className="text-xs text-slate-400">Environment: Production Sandbox (SIH-2026)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            UDYOG SARTHI Administrative Control Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Configure regulatory rule triggers, manage public approval catalogs, view system audit logs, and monitor API adapters.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 shrink-0">
          <Link
            href="/admin/rules"
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md transition"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Rules Engine ({rules.length})</span>
          </Link>
          <Link
            href="/security"
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition"
          >
            <Lock className="w-4 h-4 text-purple-400" />
            <span>Security Architecture</span>
          </Link>
        </div>
      </div>

      {/* 4 Admin KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MetricCard
          title="Active Regulatory Rules"
          value={rules.filter(r => r.status === 'ACTIVE').length}
          subtitle="Dynamic inference rules"
          icon={ShieldCheck}
          color="purple"
        />
        <MetricCard
          title="Connected Departments"
          value="18"
          subtitle="API mock endpoints"
          icon={Server}
          color="blue"
        />
        <MetricCard
          title="Approval Catalog"
          value={approvals.length}
          subtitle="Published statutory clearances"
          icon={Compass}
          color="emerald"
        />
        <MetricCard
          title="System Audit Health"
          value="100%"
          subtitle="Zero cryptographic tampered records"
          icon={Activity}
          color="emerald"
        />
      </div>

      {/* Admin Modules Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/admin/rules"
          className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-purple-400 transition space-y-3"
        >
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base group-hover:text-purple-700 transition">
            Regulatory Rules Engine
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Configure IF-THEN conditions (sector, investment, power, effluent) to trigger approvals, SLAs, and prerequisites.
          </p>
          <div className="pt-2 flex items-center text-xs font-bold text-purple-600">
            <span>Manage Rules</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition" />
          </div>
        </Link>

        <Link
          href="/directory"
          className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-purple-400 transition space-y-3"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-700 transition">
            Approval Directory Management
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Centralized public catalog of clearances, Acts, required documents, fee matrices, and issuing authorities.
          </p>
          <div className="pt-2 flex items-center text-xs font-bold text-blue-600">
            <span>Browse Catalog</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition" />
          </div>
        </Link>

        <Link
          href="/security"
          className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-purple-400 transition space-y-3"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-700 transition">
            Security & RBAC Controls
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Role-Based Access Control matrix, JWT tokens, AES-256 document sandbox, and zero client-side credential exposure.
          </p>
          <div className="pt-2 flex items-center text-xs font-bold text-emerald-600">
            <span>View Architecture</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition" />
          </div>
        </Link>
      </div>

    </div>
  );
}
