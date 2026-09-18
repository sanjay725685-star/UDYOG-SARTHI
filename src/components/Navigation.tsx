'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  Briefcase
} from 'lucide-react';

interface NavigationProps {
  onOpenAIChat?: () => void;
}

export default function Navigation({ onOpenAIChat }: NavigationProps) {
  const pathname = usePathname();
  const { currentRole, notifications } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Role-specific navigation items
  const getNavLinks = () => {
    switch (currentRole) {
      case 'officer':
        return [
          { name: 'Application Queue', href: '/officer', icon: Layers },
          { name: 'AI Review Assistant', href: '/officer/review/APP-2026-MPCB-0842', icon: Sparkles },
          { name: 'Queries Desk', href: '/queries', icon: MessageSquare },
          { name: 'Bottleneck Intel', href: '/bottlenecks', icon: GitFork },
          { name: 'Directory', href: '/directory', icon: Compass }
        ];
      case 'nodal':
        return [
          { name: 'Nodal Overview', href: '/nodal', icon: Shield },
          { name: 'Bottlenecks', href: '/bottlenecks', icon: GitFork },
          { name: 'Grievance Desk', href: '/support', icon: HelpCircle },
          { name: 'System Analytics', href: '/analytics', icon: Activity },
          { name: 'Directory', href: '/directory', icon: Compass }
        ];
      case 'admin':
        return [
          { name: 'Admin Console', href: '/admin', icon: Layers },
          { name: 'Rules Engine', href: '/admin/rules', icon: ShieldCheck },
          { name: 'Approval Directory', href: '/directory', icon: Compass },
          { name: 'Analytics BI', href: '/analytics', icon: Activity },
          { name: 'Security & Audit', href: '/security', icon: Shield }
        ];
      case 'entrepreneur':
      default:
        return [
          { name: 'Dashboard', href: '/dashboard', icon: Layers },
          { name: 'Approvals Discovery', href: '/discovery', icon: Compass },
          { name: 'Dependency Graph', href: '/dependency-graph', icon: GitFork },
          { name: 'AI Pre-Audit', href: '/pre-audit', icon: Sparkles },
          { name: 'Documents', href: '/documents', icon: FileCheck },
          { name: 'Journey', href: '/journey', icon: Activity },
          { name: 'Queries', href: '/queries', icon: MessageSquare }
        ];
    }
  };

  const navLinks = getNavLinks();

  const presentationLinks = [
    { name: 'Impact & Benefits', href: '/impact' },
    { name: 'Feasibility & Rollout', href: '/feasibility' },
    { name: 'Viability & Business Model', href: '/viability' },
    { name: 'Challenges & Risks', href: '/challenges' },
    { name: 'Risk Mitigation', href: '/risk-mitigation' },
    { name: 'Security Architecture', href: '/security' },
    { name: 'Research & Single-Window Citations', href: '/references' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top microbar for national single-window context & SIH prototype badge */}
      <div className="bg-gradient-to-r from-sarthi-950 via-sarthi-900 to-slate-900 text-white text-[11px] px-4 py-1 flex items-center justify-between border-b border-sarthi-800/40">
        <div className="flex items-center space-x-2">
          <span className="flex space-x-1 items-center">
            <span className="w-2 h-2 rounded-full bg-[#FF9933]" />
            <span className="w-2 h-2 rounded-full bg-white" />
            <span className="w-2 h-2 rounded-full bg-[#138808]" />
          </span>
          <span className="font-semibold text-slate-200 tracking-wide">
            UDYOG SARTHI — AI-Powered Industrial Approval & Compliance Coordination Platform
          </span>
          <span className="hidden lg:inline text-slate-400">|</span>
          <span className="hidden lg:inline italic text-slate-300">
            &quot;From Application to Approval — One Intelligent Regulatory Journey&quot;
          </span>
        </div>
        <div className="flex items-center space-x-3 text-[11px]">
          <span className="bg-amber-500/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            SIH 2026 Prototype
          </span>
          <span className="text-slate-400 hidden md:inline">API-Ready / Prototype Mock</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Tag */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sarthi-800 to-blue-700 flex items-center justify-center text-white shadow-md shadow-sarthi-900/20 group-hover:scale-105 transition transform">
                <span className="font-black text-xl tracking-tight">उS</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-lg tracking-tight text-slate-900">
                    UDYOG <span className="text-sarthi-600">SARTHI</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                    AI-CORE
                  </span>
                </div>
                <div className="text-[10px] font-medium text-slate-500 -mt-0.5">
                  Single Window Regulatory Engine
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    isActive
                      ? 'bg-sarthi-50 text-sarthi-700 border border-sarthi-200 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}

            {/* Presentation Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition"
              >
                <span>Hackathon Evaluation</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isMoreOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsMoreOpen(false)} />
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Presentation Modules
                    </div>
                    {presentationLinks.map(item => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMoreOpen(false)}
                        className={`block px-3 py-2 text-xs transition ${
                          pathname === item.href
                            ? 'bg-sarthi-50 text-sarthi-700 font-bold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center space-x-2.5">
            {/* AI Assistant Chat Trigger */}
            <button
              onClick={onOpenAIChat}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold shadow-sm transition"
              title="Open AI Regulatory Assistant"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask Sarthi AI</span>
            </button>

            {/* Notification Bell */}
            <Link
              href="/notifications"
              className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white shadow-xs">
                  {unreadCount}
                </span>
              )}
            </Link>

            {/* Role Switcher */}
            <RoleSwitcher />

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
            Current Persona: <span className="text-sarthi-700">{currentRole}</span>
          </div>
          {navLinks.map(link => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100"
              >
                <Icon className="w-4 h-4 text-sarthi-600" />
                <span>{link.name}</span>
              </Link>
            );
          })}

          <div className="border-t border-slate-100 pt-2 mt-2">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
              Hackathon Evaluation
            </div>
            {presentationLinks.map(item => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (onOpenAIChat) onOpenAIChat();
              }}
              className="w-full py-2 px-3 rounded-lg bg-amber-500 text-white font-bold text-xs flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch AI Regulatory Assistant</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
