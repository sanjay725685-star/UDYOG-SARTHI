'use client';

import './globals.css';
import React, { useState } from 'react';
import { AppProvider } from '../context/AppContext';
import Navigation from '../components/Navigation';
import DemoFlowBar from '../components/DemoFlowBar';
import AIChatDrawer from '../components/AIChatDrawer';
import Link from 'next/link';
import { Sparkles, Shield, Compass, BookOpen, Layers, Phone, Mail, Globe, ExternalLink, Info } from 'lucide-react';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800 antialiased">
      {/* 3-Tier Official Government Header */}
      <Navigation onOpenAIChat={() => setIsAIChatOpen(true)} />

      {/* Main Page Content Viewport */}
      <main className="flex-1 w-full" id="main-content">
        {children}
      </main>

      {/* =========================================================================
          AUTHENTIC GOVERNMENT PORTAL FOOTER (NIC / E-GOVERNANCE STANDARD)
         ========================================================================= */}
      <footer className="bg-[#0b2545] text-slate-300 text-xs border-t-4 border-[#005a9c] mt-12 pt-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Main Footer Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-700">
            
            {/* Col 1: Portal Identity & Legal Disclaimer */}
            <div className="space-y-3 md:col-span-1">
              <div className="space-y-1">
                <div className="text-base font-black tracking-tight text-white flex items-center gap-1.5">
                  <span>UDYOG SARTHI</span>
                  <span className="text-xs font-normal text-slate-300">(उद्योग सारथी)</span>
                </div>
                <div className="text-[11px] font-semibold text-slate-400">
                  AI-Powered Industrial Approval & Compliance Coordination Platform
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                National Single Window Regulatory Framework • Ministry of Commerce & Industry • Government of India.
              </p>

              <div className="p-2.5 rounded bg-[#071a30] border border-slate-700 text-[10px] text-slate-300 leading-tight space-y-1">
                <div className="font-bold text-amber-400 uppercase">Smart India Hackathon 2026 Prototype</div>
                <div>Demonstration prototype. External systems (NSWS, MAITRI, MIDC) cited as benchmarks.</div>
              </div>
            </div>

            {/* Col 2: Services & Clearances */}
            <div className="space-y-2">
              <div className="text-white font-bold uppercase tracking-wider text-[11px] border-b border-slate-700 pb-1">
                Industrial Services
              </div>
              <ul className="space-y-1.5 text-[11px]">
                <li><Link href="/discovery" className="hover:text-white transition">Know Your Approvals</Link></li>
                <li><Link href="/register" className="hover:text-white transition">New Industrial Application (CAF)</Link></li>
                <li><Link href="/journey" className="hover:text-white transition">Application Status & Timeline</Link></li>
                <li><Link href="/documents" className="hover:text-white transition">Document Checklist & Vault</Link></li>
                <li><Link href="/pre-audit" className="hover:text-white transition">AI Document Pre-Scrutiny</Link></li>
                <li><Link href="/bottlenecks" className="hover:text-white transition">Clearance Dependency & Bottlenecks</Link></li>
              </ul>
            </div>

            {/* Col 3: Departments & Portals */}
            <div className="space-y-2">
              <div className="text-white font-bold uppercase tracking-wider text-[11px] border-b border-slate-700 pb-1">
                Participating Authorities
              </div>
              <ul className="space-y-1.5 text-[11px]">
                <li><Link href="/directory" className="hover:text-white transition">Maharashtra Pollution Control Board (MPCB)</Link></li>
                <li><Link href="/directory" className="hover:text-white transition">MIDC Town Planning & Industrial Area</Link></li>
                <li><Link href="/directory" className="hover:text-white transition">Directorate of Industrial Safety & Health (DISH)</Link></li>
                <li><Link href="/directory" className="hover:text-white transition">Maharashtra Fire Services (Directorate of Fire)</Link></li>
                <li><Link href="/directory" className="hover:text-white transition">MSEDCL Power Distribution Utility</Link></li>
                <li><Link href="/directory" className="hover:text-white transition">Directorate of Steam Boilers</Link></li>
              </ul>
            </div>

            {/* Col 4: Important Links per Section 19 */}
            <div className="space-y-2">
              <div className="text-white font-bold uppercase tracking-wider text-[11px] border-b border-slate-700 pb-1">
                Important Links
              </div>
              <ul className="space-y-1.5 text-[11px]">
                <li><Link href="/about" className="hover:text-white transition">About</Link></li>
                <li><Link href="/discovery" className="hover:text-white transition">Services</Link></li>
                <li><Link href="/departments" className="hover:text-white transition">Departments</Link></li>
                <li><Link href="/support" className="hover:text-white transition">Help</Link></li>
                <li><Link href="/support" className="hover:text-white transition">Contact</Link></li>
                <li><Link href="/references" className="hover:text-white transition">Privacy Policy</Link></li>
                <li><Link href="/references" className="hover:text-white transition">Terms of Use</Link></li>
                <li><Link href="/support" className="hover:text-white transition">Accessibility</Link></li>
                <li><Link href="/directory" className="hover:text-white transition">Sitemap</Link></li>
              </ul>
            </div>

          </div>

          {/* Statutory Authority Disclaimer Notice */}
          <div className="p-3 bg-[#071a30] border border-slate-700 rounded text-[11px] text-slate-300 leading-relaxed space-y-1">
            <div>
              <span className="font-bold text-amber-400">Statutory Notice:</span> “AI-assisted information does not constitute statutory approval. Final decisions remain with the competent authority.”
            </div>
            <div className="text-slate-400 text-[10px]">
              “This prototype is developed for Smart India Hackathon 2026.”
            </div>
          </div>

          {/* Bottom Copyright & Last Updated Strip */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2 border-t border-slate-800">
            <div>
              UDYOG SARTHI (उद्योग सारथी) • AI-Powered Industrial Approval & Compliance Coordination Platform
            </div>
            <div className="text-slate-400 font-mono text-[10px]">
              Prototype Demonstration Portal • SIH 2026
            </div>
          </div>

        </div>
      </footer>

      {/* Non-Obtrusive Compact Demo Flow Guide (Docked at bottom-right, collapsible) */}
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
        <title>UDYOG SARTHI | Single Window Industrial Approval & Compliance Platform</title>
        <meta
          name="description"
          content="Single Window Industrial Approval & Compliance Platform — Smart India Hackathon 2026 Prototype"
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
