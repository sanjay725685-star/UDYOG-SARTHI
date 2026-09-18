'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  Sparkles,
  Mail,
  Smartphone,
  CheckCheck,
  Trash2,
  ArrowRight,
  Info,
  Clock,
  Building2,
  FileCheck
} from 'lucide-react';

export default function NotificationsPage() {
  const { notifications, markNotificationRead, setNotifications } = useApp();
  const [emailAlertsEnabled, setEmailAlertsEnabled] = useState(true);
  const [smsAlertsEnabled, setSmsAlertsEnabled] = useState(true);

  // Government notification examples conforming to Section 16 specifications
  const governmentNotifications = [
    {
      id: 'notif-1',
      applicationId: 'US-2026-0001',
      title: 'Clarification required for Application US-2026-0001.',
      details: 'MPCB Sub-Regional Officer Er. Sunita Patil requested revised hydraulic calculation data for the Effluent Treatment Plant (ETP).',
      date: '10 Mar 2026',
      time: '04:30 PM IST',
      actionText: 'Respond to Clarification',
      actionHref: '/queries',
      type: 'action_required',
      isRead: false
    },
    {
      id: 'notif-2',
      applicationId: 'US-2026-0001',
      title: 'Environmental approval has moved to Department Review.',
      details: 'Consent to Establish (CTE) application dossier transferred from Single Window Scrutiny to Maharashtra Pollution Control Board.',
      date: '06 Mar 2026',
      time: '02:00 PM IST',
      actionText: 'Track Application',
      actionHref: '/applications/US-2026-0001',
      type: 'status_update',
      isRead: false
    },
    {
      id: 'notif-3',
      applicationId: 'US-2026-0001',
      title: 'Document verification completed.',
      details: 'Single Window Scrutiny desk verified land allotment deed, power feasibility single line diagram, and factory layout blueprint.',
      date: '03 Mar 2026',
      time: '11:15 AM IST',
      actionText: 'View Dossier',
      actionHref: '/documents',
      type: 'completed',
      isRead: true
    },
    {
      id: 'notif-4',
      applicationId: 'US-2026-0001',
      title: 'Application submitted successfully.',
      details: 'Common Application Form (CAF) for Pune EV Manufacturing Unit registered. Reference ID US-2026-0001 generated.',
      date: '02 Mar 2026',
      time: '10:30 AM IST',
      actionText: 'Download Receipt',
      actionHref: '/applications/US-2026-0001',
      type: 'submission',
      isRead: true
    }
  ];

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Government Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-[#0b2545]">Home</Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">Notification Panel</span>
      </nav>

      {/* Page Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#005a9c] mb-1">
            <Bell className="w-4 h-4 text-[#005a9c]" />
            <span>Official Communications & Alerts</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0b2545] tracking-tight">
            Official Notification Panel
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Statutory notices, departmental queries, SLA milestone updates, and formal sanction advisories.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={markAllAsRead}
            className="px-3.5 py-2 rounded bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
          >
            <CheckCheck className="w-4 h-4 text-emerald-700" />
            <span>Mark All as Read</span>
          </button>
        </div>
      </div>

      {/* Statutory Guidance Notice */}
      <div className="p-3.5 bg-blue-50 border-l-4 border-[#005a9c] text-slate-800 text-xs leading-relaxed flex items-start space-x-2.5">
        <Info className="w-4 h-4 text-[#005a9c] shrink-0 mt-0.5" />
        <div>
          <strong>Communication Delivery Protocol:</strong> Alerts published here are concurrently transmitted via National SMS Gateway to registered mobile (+91 98230 45678) and official enterprise email (compliance@abcmfg.in) in compliance with e-governance standards.
        </div>
      </div>

      {/* Notification Preferences & Delivery Gateways */}
      <div className="bg-white border border-slate-300 p-4 rounded shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div>
          <strong className="text-slate-900 block">External Dispatch Gateways</strong>
          <span className="text-slate-500 text-[11px]">
            National SMS Gateway (NIC) • State e-Governance Email Gateway (gov.in)
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-1.5 cursor-pointer font-medium text-slate-700">
            <input
              type="checkbox"
              checked={smsAlertsEnabled}
              onChange={e => setSmsAlertsEnabled(e.target.checked)}
              className="rounded text-[#005a9c]"
            />
            <span>SMS Notifications (Active)</span>
          </label>
          <label className="flex items-center space-x-1.5 cursor-pointer font-medium text-slate-700">
            <input
              type="checkbox"
              checked={emailAlertsEnabled}
              onChange={e => setEmailAlertsEnabled(e.target.checked)}
              className="rounded text-[#005a9c]"
            />
            <span>Email Notifications (Active)</span>
          </label>
        </div>
      </div>

      {/* =========================================================================
          SECTION 16: NOTIFICATIONS LOG (DATE, TIME, APPLICATION ID, ACTION)
         ========================================================================= */}
      <div className="bg-white border border-slate-300 rounded overflow-hidden shadow-xs">
        <div className="bg-[#f8fafc] px-4 py-3 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#0b2545]">
            Chronological Communications Log ({governmentNotifications.length})
          </h3>
          <span className="text-[11px] text-slate-500 font-mono">Real-time Feed</span>
        </div>

        <div className="divide-y divide-slate-200">
          {governmentNotifications.map(notif => {
            const isActionRequired = notif.type === 'action_required';

            return (
              <div
                key={notif.id}
                className={`p-4 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  !notif.isRead ? 'bg-amber-50/40' : 'hover:bg-slate-50 bg-white'
                }`}
              >
                <div className="flex items-start space-x-3.5">
                  <div className="shrink-0 mt-0.5">
                    {isActionRequired ? (
                      <div className="w-8 h-8 rounded bg-amber-100 text-amber-800 flex items-center justify-center border border-amber-300">
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded bg-blue-50 text-[#005a9c] flex items-center justify-center border border-blue-200">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">
                        {notif.title}
                      </span>
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-300">
                        App ID: {notif.applicationId}
                      </span>
                      {!notif.isRead && (
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                          New Notice
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {notif.details}
                    </p>

                    <div className="text-[11px] text-slate-500 font-mono flex items-center gap-2 pt-0.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Date: {notif.date}</span>
                      <span>•</span>
                      <span>Time: {notif.time}</span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 self-start sm:self-center">
                  <Link
                    href={notif.actionHref}
                    className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded text-xs font-bold transition shadow-2xs ${
                      isActionRequired
                        ? 'bg-amber-700 hover:bg-amber-800 text-white'
                        : 'bg-[#0b2545] hover:bg-[#005a9c] text-white'
                    }`}
                  >
                    <span>{notif.actionText}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
