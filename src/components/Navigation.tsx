'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';
import RoleSwitcher from './RoleSwitcher';
import {
  Sparkles,
  Layers,
  FileCheck,
  GitFork,
  HelpCircle,
  Bell,
  MessageSquare,
  Activity,
  Compass,
  FileText,
  ShieldCheck,
  CheckCircle,
  Menu,
  X,
  ChevronDown,
  Info,
  Shield,
  Briefcase,
  Search,
  Phone,
  Globe,
  User
} from 'lucide-react';

interface NavigationProps {
  onOpenAIChat?: () => void;
}

export default function Navigation({ onOpenAIChat }: NavigationProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentRole, notifications } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'HI'>('EN');

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Accessibility Font Scaling handlers
  const setFontSize = (size: 'sm' | 'md' | 'lg') => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('font-size-sm', 'font-size-md', 'font-size-lg');
      document.documentElement.classList.add(`font-size-${size}`);
    }
  };

  // Primary Horizontal Navigation Links (per government requirements)
  const mainNavLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Udyog Sarthi', href: '/about' },
    { name: 'Industrial Approvals', href: '/directory' },
    { name: 'Know Your Approvals', href: '/discovery' },
    { name: 'Application', href: '/register' },
    { name: 'Application Status', href: '/track' },
    { name: 'Compliance', href: '/compliance' },
    { name: 'Departments', href: '/departments' },
    { name: 'Help & Support', href: '/support' }
  ];

  return (
    <header className="w-full bg-white border-b border-slate-300">
      
      {/* Skip to Main Content Link (Accessibility) */}
      <a href="#main-content" className="skip-to-content">
        Skip to Main Content
      </a>

      {/* =========================================================================
          TIER 1: TOP GOVERNMENT UTILITY BAR
         ========================================================================= */}
      <div className="bg-[#f1f5f9] border-b border-slate-200 text-slate-700 text-[11px] py-1 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          {/* Left: Government of India / Ministry Tag */}
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1 font-semibold text-slate-800">
              <span className="w-2.5 h-2 bg-[#FF9933] inline-block" />
              <span className="w-2.5 h-2 bg-white border border-slate-300 inline-block" />
              <span className="w-2.5 h-2 bg-[#138808] inline-block" />
              <span className="ml-1">भारत सरकार | Government of India</span>
            </span>
            <span className="text-slate-300 hidden md:inline">|</span>
            <span className="text-slate-600 hidden md:inline font-medium">
              Ministry of Commerce & Industry • Single Window Initiative
            </span>
          </div>

          {/* Right: Accessibility Controls & Quick Links */}
          <div className="flex items-center space-x-4 text-[11px]">
            {/* Font Sizing Controls */}
            <div className="flex items-center space-x-1 border-r border-slate-300 pr-3 font-mono">
              <span className="text-slate-500 mr-1 hidden sm:inline">Text Size:</span>
              <button
                onClick={() => setFontSize('sm')}
                className="px-1.5 py-0.5 rounded bg-white hover:bg-slate-200 border border-slate-300 text-[10px] font-bold"
                title="Decrease font size"
                aria-label="Decrease font size"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('md')}
                className="px-1.5 py-0.5 rounded bg-white hover:bg-slate-200 border border-slate-300 text-[11px] font-bold"
                title="Normal font size"
                aria-label="Normal font size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className="px-1.5 py-0.5 rounded bg-white hover:bg-slate-200 border border-slate-300 text-[12px] font-bold"
                title="Increase font size"
                aria-label="Increase font size"
              >
                A+
              </button>
            </div>

            {/* Language Toggle */}
            <div className="flex items-center space-x-1 border-r border-slate-300 pr-3">
              <Globe className="w-3 h-3 text-slate-500" />
              <button
                onClick={() => setLanguage('EN')}
                className={`font-semibold ${language === 'EN' ? 'text-[#005a9c] underline' : 'text-slate-600'}`}
              >
                English
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={() => setLanguage('HI')}
                className={`font-semibold ${language === 'HI' ? 'text-[#005a9c] underline' : 'text-slate-600'}`}
              >
                हिंदी
              </button>
            </div>

            {/* Screen Reader Access */}
            <span className="hidden lg:inline text-slate-500 font-medium">
              Screen Reader Access
            </span>

            {/* Help & Contact */}
            <Link href="/support" className="text-slate-600 hover:text-slate-900 font-medium">
              Help
            </Link>
            <Link href="/support" className="text-slate-600 hover:text-slate-900 font-medium">
              Contact
            </Link>
          </div>

        </div>
      </div>

      {/* =========================================================================
          TIER 2: MAIN GOVERNMENT PORTAL IDENTITY SECTION
         ========================================================================= */}
      <div className="bg-white py-3 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Identity: Emblem + Portal Title */}
          <div className="flex items-center space-x-3.5">
            
            {/* Official Emblem Placeholder Crest */}
            <div className="flex flex-col items-center justify-center p-1.5 bg-[#f8fafc] border border-slate-300 rounded shadow-2xs shrink-0 w-12 h-14 text-center">
              <div className="text-[9px] font-serif font-black tracking-widest text-[#0b2545] uppercase leading-tight">
                सत्यमेव
              </div>
              <div className="w-6 h-6 my-0.5 rounded-full border border-[#0b2545] flex items-center justify-center text-[11px] font-bold text-[#0b2545] bg-white">
                🏛️
              </div>
              <div className="text-[8px] font-serif font-bold text-[#0b2545] uppercase leading-none">
                जयते
              </div>
            </div>

            {/* Portal Brand & Regulatory Identity */}
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Link href="/" className="hover:opacity-90 transition">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-[#0b2545]">
                    UDYOG SARTHI
                  </span>
                  <span className="text-sm sm:text-base font-bold text-slate-600 ml-1.5">
                    (उद्योग सारथी)
                  </span>
                </Link>
                <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-blue-50 text-[#005a9c] border border-blue-200">
                  AI Regulatory Engine
                </span>
              </div>
              
              <div className="text-xs sm:text-sm font-semibold text-slate-700 leading-snug">
                AI-Powered Industrial Approval & Compliance Coordination Platform
              </div>
              
              <div className="text-[11px] text-slate-500 font-medium">
                National & State Single Window Clearance Orchestration • Ministry of Commerce & Industry
              </div>
            </div>

          </div>

          {/* Right: Hackathon Prototype Notice Badge & Helpline */}
          <div className="hidden md:flex flex-col items-end text-right space-y-1">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded bg-amber-50 text-amber-900 border border-amber-300">
              <Info className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span>Smart India Hackathon 2026 Prototype</span>
            </span>
            <div className="text-[11px] text-slate-600 flex items-center gap-1 font-medium">
              <Phone className="w-3 h-3 text-slate-500" />
              <span>National Single Window Helpline: <strong>1800-11-8899</strong> (09:00 - 18:00 IST)</span>
            </div>
            <div className="text-[10px] text-slate-500 italic">
              Prototype Demonstration Portal • Not legally authoritative
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================================
          TIER 3: PRIMARY STICKY HORIZONTAL NAVIGATION BAR (NAVY BLUE)
         ========================================================================= */}
      <nav className="sticky top-0 z-40 bg-[#0b2545] text-white shadow-md border-y border-[#001f3f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            
            {/* Desktop Navigation Links */}
            <div className="hidden xl:flex items-center space-x-0.5 overflow-x-auto">
              {mainNavLinks.map(item => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 text-xs font-semibold whitespace-nowrap transition border-b-2 ${
                      isActive
                        ? 'bg-[#003865] text-white border-amber-400'
                        : 'text-slate-200 hover:bg-[#133b5c] hover:text-white border-transparent'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* For Medium screens: Compact primary nav */}
            <div className="hidden md:flex xl:hidden items-center space-x-1 text-xs">
              <Link href="/" className="px-2.5 py-1.5 hover:bg-[#133b5c] rounded">Home</Link>
              <Link href="/directory" className="px-2.5 py-1.5 hover:bg-[#133b5c] rounded">Approvals</Link>
              <Link href="/discovery" className="px-2.5 py-1.5 hover:bg-[#133b5c] rounded">Discovery</Link>
              <Link href="/register" className="px-2.5 py-1.5 hover:bg-[#133b5c] rounded">Apply</Link>
              <Link href="/journey" className="px-2.5 py-1.5 hover:bg-[#133b5c] rounded">Status</Link>
              <Link href="/bottlenecks" className="px-2.5 py-1.5 hover:bg-[#133b5c] rounded">Compliance</Link>
              <Link href="/support" className="px-2.5 py-1.5 hover:bg-[#133b5c] rounded">Help</Link>
            </div>

            {/* Right Action Tools: Sarthi AI + Notifications + Role Switcher */}
            <div className="flex items-center space-x-2">
              
              {/* Sarthi AI Assistance Trigger Button */}
              <button
                onClick={onOpenAIChat}
                className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-[#1e4e79] hover:bg-[#286090] text-amber-300 text-xs font-bold border border-amber-400/40 transition shadow-2xs"
                title="Open AI Pre-Scrutiny & Advisory Assistant"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span className="hidden sm:inline">AI Pre-Scrutiny</span>
              </button>

              {/* Notification Center */}
              <Link
                href="/notifications"
                className="relative p-1.5 rounded hover:bg-[#133b5c] text-slate-200 transition"
                title="System Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </Link>

              {/* Applicant / Role Dashboard Button */}
              <Link
                href={
                  currentRole === 'officer'
                    ? '/officer'
                    : currentRole === 'nodal'
                    ? '/nodal'
                    : currentRole === 'admin'
                    ? '/admin'
                    : '/dashboard'
                }
                className="px-2.5 py-1 rounded bg-[#005a9c] hover:bg-[#006bb8] text-white text-xs font-bold transition flex items-center gap-1 border border-blue-400/40"
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {currentRole === 'officer'
                    ? 'Department Desk'
                    : currentRole === 'nodal'
                    ? 'Nodal Desk'
                    : currentRole === 'admin'
                    ? 'Admin Console'
                    : 'Dashboard'}
                </span>
              </Link>

              {/* Administrative Persona Switcher */}
              <div className="text-slate-800">
                <RoleSwitcher />
              </div>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden p-1.5 rounded text-white hover:bg-[#133b5c] transition"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="xl:hidden bg-[#071a30] border-t border-[#133b5c] px-4 py-3 space-y-1">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
              Portal Menu Navigation
            </div>
            {mainNavLinks.map(item => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded text-xs font-semibold ${
                  pathname === item.href
                    ? 'bg-[#003865] text-white font-bold'
                    : 'text-slate-200 hover:bg-[#133b5c]'
                }`}
              >
                {item.name}
              </Link>
            ))}

            <div className="pt-2 border-t border-[#133b5c] mt-2 space-y-1">
              <Link
                href="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded text-xs font-bold text-amber-300 hover:bg-[#133b5c]"
              >
                Enter Applicant Dashboard
              </Link>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (onOpenAIChat) onOpenAIChat();
                }}
                className="w-full text-left px-3 py-2 rounded text-xs font-bold text-cyan-300 hover:bg-[#133b5c]"
              >
                Launch AI Pre-Scrutiny Assistant
              </button>
            </div>
          </div>
        )}
      </nav>

    </header>
  );
}
