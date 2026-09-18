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
  ArrowRight
} from 'lucide-react';

export default function NotificationsPage() {
  const { notifications, markNotificationRead, setNotifications } = useApp();
  const [emailAlertsEnabled, setEmailAlertsEnabled] = useState(true);
  const [smsAlertsEnabled, setSmsAlertsEnabled] = useState(true);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-sarthi-600 mb-1">
            <Bell className="w-4 h-4 text-sarthi-600" />
            <span>Real-Time Alert Dispatcher</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Notification Center & Communication Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            In-app, SMS, and Email delivery triggers for query notices, SLA deadlines, and sanction orders.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={markAllAsRead}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
          >
            <CheckCheck className="w-4 h-4 text-emerald-600" />
            <span>Mark All Read</span>
          </button>
          <button
            onClick={clearAll}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition"
            title="Clear all alerts"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Integration Adapter Toggles (Email & SMS Mock Ready) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-0.5 text-xs">
          <span className="font-bold text-slate-900 block">External Communication Gateway Webhooks</span>
          <span className="text-slate-500">
            API-Ready integration with NIC Government SMS Gateway & SendGrid/Gov-Mail server.
          </span>
        </div>

        <div className="flex items-center space-x-4 shrink-0">
          <label className="flex items-center space-x-2 cursor-pointer text-xs font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={emailAlertsEnabled}
              onChange={e => setEmailAlertsEnabled(e.target.checked)}
              className="w-4 h-4 text-sarthi-600 rounded"
            />
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-blue-600" /> Email
            </span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer text-xs font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={smsAlertsEnabled}
              onChange={e => setSmsAlertsEnabled(e.target.checked)}
              className="w-4 h-4 text-sarthi-600 rounded"
            />
            <span className="flex items-center gap-1">
              <Smartphone className="w-3.5 h-3.5 text-emerald-600" /> SMS / WhatsApp
            </span>
          </label>
        </div>
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
            No notifications in your inbox.
          </div>
        ) : (
          notifications.map(n => {
            const isQuery = n.type === 'query';
            const isWarning = n.type === 'warning';
            const isSuccess = n.type === 'success';

            return (
              <div
                key={n.id}
                onClick={() => markNotificationRead(n.id)}
                className={`p-5 rounded-2xl border transition shadow-xs flex items-start justify-between gap-4 ${
                  !n.isRead
                    ? 'bg-white border-sarthi-300 ring-1 ring-sarthi-200'
                    : 'bg-slate-50/70 border-slate-200 opacity-80'
                }`}
              >
                <div className="flex items-start space-x-3.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isQuery
                        ? 'bg-amber-100 text-amber-800'
                        : isWarning
                        ? 'bg-rose-100 text-rose-800'
                        : isSuccess
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {isQuery && <MessageSquare className="w-4 h-4" />}
                    {isWarning && <AlertTriangle className="w-4 h-4" />}
                    {isSuccess && <CheckCircle2 className="w-4 h-4" />}
                    {!isQuery && !isWarning && !isSuccess && <Sparkles className="w-4 h-4" />}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-xs font-bold text-slate-900">{n.title}</h4>
                      {!n.isRead && (
                        <span className="w-2 h-2 rounded-full bg-sarthi-600 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed max-w-xl">{n.message}</p>
                    <div className="text-[10px] font-mono text-slate-400 pt-0.5">{n.timestamp}</div>
                  </div>
                </div>

                {n.actionLink && (
                  <Link
                    href={n.actionLink}
                    className="shrink-0 p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
