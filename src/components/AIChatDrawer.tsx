'use client';

import React, { useState } from 'react';
import { Sparkles, Send, X, Bot, User, HelpCircle, ArrowRight, ShieldAlert } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  quickActions?: { label: string; action: string }[];
}

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIChatDrawer({ isOpen, onClose }: AIChatDrawerProps) {
  const { approvals, project, business } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: `Hello Rajesh Verma! I am **Sarthi AI**, your Regulatory Review & Compliance Assistant for **${project.name}** in ${project.midcArea}, Pune.\n\nHow can I assist your regulatory journey today?`,
      timestamp: 'Just now',
      quickActions: [
        { label: 'Why is my Factory License blocked?', action: 'why_blocked' },
        { label: 'Explain MPCB query & required documents', action: 'mpcb_query' },
        { label: 'What is the Critical Path for my project?', action: 'critical_path' },
        { label: 'Check my ETP design compliance', action: 'check_etp' }
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSend = (userText: string) => {
    if (!userText.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiReply = '';
      let quickActions: { label: string; action: string }[] | undefined;

      const lower = userText.toLowerCase();

      if (lower.includes('blocked') || lower.includes('factory license')) {
        aiReply = `⚠️ **Factory License (DISH-FL) Status Analysis**:\n\nUnder Maharashtra Factories Rules 1963, your factory license application is currently **BLOCKED** because it requires two upstream prerequisite clearances:\n\n1. **Consent to Establish (CTE)** from MPCB (Currently in 'Action Required' state due to an open query on ETP neutralizer design).\n2. **Fire Safety NOC** from Maharashtra Fire Services (Already COMPLETED ✓).\n\n**Recommended Next Action**: Submit the revised ETP CAD blueprint via the Query Management Desk to unblock MPCB clearance.`;
        quickActions = [{ label: 'Go to Query Desk', action: '/queries' }];
      } else if (lower.includes('query') || lower.includes('mpcb')) {
        aiReply = `📋 **MPCB Query Breakdown (APP-2026-MPCB-0842)**:\n\nSub-Regional Officer **Er. Sunita Patil** raised a query regarding:\n- Sizing & retention time for the **nickel/chromium rinse neutralizer tank** for peak 40 m³/day effluent flow.\n- Location layout of the chemical dosing pump shed & emergency eye-wash station.\n\n**Deadline**: 4 days remaining. You can use our **AI Document Pre-Audit** tool to scan your revised file before sending it to the officer!`;
        quickActions = [
          { label: 'Pre-Audit Revised Document', action: '/pre-audit' },
          { label: 'Respond to Query Now', action: '/queries' }
        ];
      } else if (lower.includes('critical path') || lower.includes('path')) {
        aiReply = `⚡ **Critical Path Analysis**:\n\nYour project's critical path sequence is:\n**MIDC Land Allotment** (Done) ➔ **Building Plan** (Done) ➔ **Fire NOC** (Done) ➔ **MPCB CTE** (Active Bottleneck) ➔ **Factory License** (Blocked) ➔ **Boiler Registration** (Pending).\n\nDelaying the MPCB query response by 1 day shifts the entire factory commissioning target date forward by 1 day!`;
        quickActions = [{ label: 'View Dependency Graph', action: '/dependency-graph' }];
      } else if (lower.includes('etp') || lower.includes('compliance')) {
        aiReply = `🧪 **ETP/ZLD Design Guidelines for Orange Category**:\n\nFor EV component manufacturing with electroplating:\n1. Total hydraulic capacity must exceed 35 KLD with 1.2x surge factor.\n2. Chemical precipitation requires dual-stage pH adjustment (Lime + Ferrous Sulphate) followed by clarifier.\n3. Reverse Osmosis (RO) reject must feed into a Multiple Effect Evaporator (MEE) to achieve Zero Liquid Discharge (ZLD) as per MIDC environmental guidelines.`;
      } else {
        aiReply = `Thank you for your question regarding **${project.name}**. Sarthi AI continuously cross-references your inputs against the Maharashtra Single Window Regulations, DCR 2024, and Central Environmental Acts.\n\nWould you like me to inspect your document repository, check pending queries, or simulate an approval timeline?`;
        quickActions = [
          { label: 'Check Document Checklist', action: '/documents' },
          { label: 'Open Approval Discovery', action: '/discovery' }
        ];
      }

      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: aiReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          quickActions
        }
      ]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-2xs">
      <div className="bg-white w-full max-w-md h-full shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-200">
        
        {/* Drawer Header */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 text-white shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold">Sarthi AI Assistant</h3>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Regulatory LLM
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Intelligent Industrial Approval Co-Pilot</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Disclaimer Bar */}
        <div className="px-4 py-2 bg-amber-50 border-b border-amber-200 text-[11px] text-amber-900 flex items-center space-x-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-700 shrink-0" />
          <span>
            <strong>AI Guidance Notice:</strong> Advisory recommendations only. Not a substitute for statutory authority sanction.
          </span>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-start space-x-2 max-w-[90%]">
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-lg bg-sarthi-100 text-sarthi-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-sarthi-600 text-white rounded-br-none shadow-xs'
                      : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200 shadow-2xs whitespace-pre-line'
                  }`}
                >
                  {msg.text}

                  {/* Quick action buttons attached to AI message */}
                  {msg.quickActions && msg.quickActions.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-slate-200/80 space-y-1.5">
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Suggested Inquiries:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.quickActions.map((qa, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSend(qa.label)}
                            className="text-left text-[11px] px-2.5 py-1 rounded-lg bg-white hover:bg-sarthi-50 text-sarthi-700 font-medium border border-slate-200 transition shadow-2xs flex items-center gap-1"
                          >
                            <span>{qa.label}</span>
                            <ArrowRight className="w-2.5 h-2.5" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center space-x-2 text-xs text-slate-500 italic p-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />
              <span>Sarthi AI is analyzing regulatory acts & project graph...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-200 bg-slate-50">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about approvals, queries, rules, acts..."
              className="flex-1 bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-sarthi-500"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-sarthi-600 hover:bg-sarthi-700 disabled:opacity-40 text-white transition shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="text-[10px] text-slate-400 text-center mt-1.5">
            Trained on Maharashtra Industrial Policy, Factories Act, and MPCB Regulations
          </div>
        </div>
      </div>
    </div>
  );
}
