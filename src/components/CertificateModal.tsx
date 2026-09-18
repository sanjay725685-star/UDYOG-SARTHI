'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ShieldCheck, Download, Printer, X, Award, CheckCircle2, QrCode } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  approvalCode?: string;
}

export default function CertificateModal({
  isOpen,
  onClose,
  approvalCode = 'MPCB-CTE'
}: CertificateModalProps) {
  const { approvals, business, project } = useApp();

  const approval = approvals.find(a => a.code === approvalCode) || approvals[3];

  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Confetti fallback
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const certificateNo = approval.certificateNumber || `MAHA/${approval.code}/2026/${Math.floor(1000 + Math.random() * 9000)}`;
  const dateIssued = approval.approvalDate || new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border-4 border-slate-300 max-w-3xl w-full my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Control Bar */}
        <div className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Government of Maharashtra — Official Digital Clearance
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.print()}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1 px-2.5 transition"
              title="Print Certificate"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Printable Canvas */}
        <div className="p-8 sm:p-12 certificate-pattern relative bg-[#fdfbf7] text-slate-900 border-12 border-double border-sarthi-900 m-2 rounded-xl">
          
          {/* Watermark Emblem Icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-4 pointer-events-none">
            <ShieldCheck className="w-96 h-96 text-sarthi-950" />
          </div>

          {/* Header & Emblem */}
          <div className="text-center space-y-1 relative z-10 border-b-2 border-sarthi-900/40 pb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-sarthi-900 text-white font-serif text-xl font-bold mb-2 shadow-md">
              महाराष्ट्र
            </div>
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-sarthi-950">
              GOVERNMENT OF MAHARASHTRA
            </h2>
            <h1 className="text-lg sm:text-xl font-serif font-black tracking-tight text-sarthi-900">
              {approval.department.toUpperCase()}
            </h1>
            <p className="text-xs font-medium text-slate-600">
              Regional Office: Jog Centre, 3rd Floor, Wakdewadi, Pune - 411003
            </p>
          </div>

          {/* Certificate Title */}
          <div className="text-center my-6 relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
              STATUTORY SANCTION ORDER
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-2">
              {approval.name}
            </h3>
            <p className="text-xs font-mono text-slate-600 mt-1">
              Certificate Ref No: <span className="font-bold text-slate-900">{certificateNo}</span>
            </p>
          </div>

          {/* Body Content */}
          <div className="relative z-10 text-xs sm:text-sm text-slate-800 leading-relaxed space-y-4 font-serif">
            <p>
              In exercise of statutory powers under the regulatory framework of Maharashtra Single Window Clearance
              provisions, consent and authorization is hereby granted to:
            </p>

            {/* Industrial Entity Box */}
            <div className="bg-white/90 backdrop-blur-xs p-4 rounded-lg border border-sarthi-200 shadow-2xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 text-[11px] block">Industrial Enterprise:</span>
                  <span className="font-bold text-slate-900">{business.name}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px] block">GSTIN / Corporate PAN:</span>
                  <span className="font-mono font-bold text-slate-900">{business.gstin} / {business.pan}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px] block">Factory Site Location:</span>
                  <span className="font-medium text-slate-800">{business.registeredAddress}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px] block">Proposed Capital Outlay:</span>
                  <span className="font-bold text-emerald-800">₹{project.proposedInvestmentCr} Crores (Workforce: {project.totalEmployees})</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-justify">
              This statutory sanction is issued subject to unconditional compliance with the environmental norms,
              effluent discharge standards (Zero Liquid Discharge), fire safety provisions, and periodic submission
              of statutory returns as mandated under the applicable Acts.
            </p>

            {/* Verification QR & Digital Signature */}
            <div className="pt-6 mt-6 border-t border-slate-300 flex items-end justify-between font-sans">
              <div className="flex items-center space-x-3">
                <div className="w-16 h-16 bg-white p-1 rounded border border-slate-300 flex items-center justify-center shadow-xs">
                  <QrCode className="w-14 h-14 text-slate-900" />
                </div>
                <div className="text-[10px] text-slate-600">
                  <div className="font-bold text-slate-800">Scan for Verification</div>
                  <div>Verify on udyog-sarthi.gov.in</div>
                  <div className="text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3 h-3" /> Digitally Validated
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs font-serif font-black text-sarthi-950 uppercase">
                  Er. Sunita Patil
                </div>
                <div className="text-[11px] text-slate-600">Sub-Regional Officer (SRO Pune-II)</div>
                <div className="text-[10px] font-mono text-slate-500">Date of Sanction: {dateIssued}</div>
                <div className="text-[9px] font-mono text-emerald-700 font-semibold mt-1">
                  [DSC SHA-256 Validated]
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Official demonstration document issued under Smart India Hackathon 2026</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-sarthi-700 hover:bg-sarthi-800 text-white font-semibold text-xs transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
