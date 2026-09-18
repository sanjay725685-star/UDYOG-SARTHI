'use client';

import './globals.css';
import React, { useState } from 'react';
import { AppProvider } from '../context/AppContext';
import Navigation from '../components/Navigation';
import DemoFlowBar from '../components/DemoFlowBar';
import AIChatDrawer from '../components/AIChatDrawer';
import Link from 'next/link';
import { Sparkles, Shield, Compass, BookOpen, Layers } from 'lucide-react';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 pb-24">
      {/* Top Header */}
      <Navigation onOpenAIChat={() => setIsAIChatOpen(true)} />

      {/* Main Page Content */}
      <main className="flex-1 w-full">{children}</main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-16 pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
            
            {/* Col 1: Brand & Tagline */}
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-sarthi-600 flex items-center justify-center text-white font-bold text-sm">
                  उS
                </div>
                <span className="font-bold text-base text-white">
                  UDYOG <span className="text-sarthi-400">SARTHI</span>
                </span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                &quot;From Application to Approval — One Intelligent Regulatory Journey&quot;
              </p>
              <div className="text-[10px] bg-slate-800 p-2 rounded border border-slate-700 text-slate-300">
                <strong>Smart India Hackathon 2026 Prototype</strong>
                <br />Designed for evaluation. Mock integration architecture for NSWS & Maharashtra MAITRI.
              </div>
            </div>

            {/* Col 2: Core Modules */}
            <div className="space-y-2">
              <div className="text-slate-200 font-bold uppercase tracking-wider text-[11px]">
                Platform Modules
              </div>
              <ul className="space-y-1.5 text-[11px]">
                <li><Link href="/register" className="hover:text-white transition">Business Registration Wizard</Link></li>
                <li><Link href="/discovery" className="hover:text-white transition">AI Approval Discovery Engine</Link></li>
                <li><Link href="/dependency-graph" className="hover:text-white transition">React Flow Dependency Graph</Link></li>
                <li><Link href="/pre-audit" className="hover:text-white transition">AI Document Pre-Audit & OCR</Link></li>
                <li><Link href="/bottlenecks" className="hover:text-white transition">Critical Path & Bottlenecks</Link></li>
                <li><Link href="/journey" className="hover:text-white transition">Workflow Orchestration Timeline</Link></li>
              </ul>
            </div>

            {/* Col 3: Role Portals */}
            <div className="space-y-2">
              <div className="text-slate-200 font-bold uppercase tracking-wider text-[11px]">
                Role-Based Workspaces
              </div>
              <ul className="space-y-1.5 text-[11px]">
                <li><Link href="/dashboard" className="hover:text-white transition">Entrepreneur Dashboard</Link></li>
                <li><Link href="/officer" className="hover:text-white transition">Department Officer Queue</Link></li>
                <li><Link href="/officer/review/APP-2026-MPCB-0842" className="hover:text-white transition">AI Regulatory Review Assistant</Link></li>
                <li><Link href="/nodal" className="hover:text-white transition">Nodal Officer & Escalations</Link></li>
                <li><Link href="/admin/rules" className="hover:text-white transition">Regulatory Rules Engine (Admin)</Link></li>
                <li><Link href="/analytics" className="hover:text-white transition">Performance Analytics BI</Link></li>
              </ul>
            </div>

            {/* Col 4: Hackathon Presentation */}
            <div className="space-y-2">
              <div className="text-slate-200 font-bold uppercase tracking-wider text-[11px]">
                Evaluation & References
              </div>
              <ul className="space-y-1.5 text-[11px]">
                <li><Link href="/impact" className="hover:text-white transition">Impact & Quantitative Benefits</Link></li>
                <li><Link href="/feasibility" className="hover:text-white transition">Feasibility & Phased Rollout</Link></li>
                <li><Link href="/viability" className="hover:text-white transition">Viability & Business Model</Link></li>
                <li><Link href="/challenges" className="hover:text-white transition">Challenges & Risks</Link></li>
                <li><Link href="/risk-mitigation" className="hover:text-white transition">Risk Mitigation Strategies</Link></li>
                <li><Link href="/security" className="hover:text-white transition">Security & RBAC Architecture</Link></li>
                <li><Link href="/references" className="hover:text-white transition">Research & Single-Window Citations</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
            <div>
              © 2026 UDYOG SARTHI. Built for Smart India Hackathon 2026.
            </div>
            <div className="text-amber-400/90 text-center sm:text-right">
              Statutory Notice: Prototype demonstration only. All regulatory clearances require formal department sanction.
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Demo Flow Bar */}
      <DemoFlowBar />

      {/* Sarthi AI Regulatory Assistant Drawer */}
      <AIChatDrawer isOpen={isAIChatOpen} onClose={() => setIsAIChatOpen(false)} />
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>UDYOG SARTHI — AI-Powered Industrial Approval Platform</title>
        <meta
          name="description"
          content="From Application to Approval — One Intelligent Regulatory Journey for Smart India Hackathon 2026"
        />
      </head>
      <body>
        <AppProvider>
          <LayoutContent>{children}</LayoutContent>
        </AppProvider>
      </body>
    </html>
  );
}
