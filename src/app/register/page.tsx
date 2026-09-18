'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Briefcase,
  Sliders,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  RotateCcw,
  Zap,
  Droplets,
  Flame,
  Users,
  ShieldCheck,
  Info
} from 'lucide-react';

function RegisterWizardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { business, setBusiness, project, setProject, setDemoStep } = useApp();

  const initialStepParam = parseInt(searchParams.get('step') || '1', 10);
  const [currentStep, setCurrentStep] = useState<number>(initialStepParam);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const stepParam = parseInt(searchParams.get('step') || '1', 10);
    if (stepParam >= 1 && stepParam <= 3) {
      setCurrentStep(stepParam);
    }
  }, [searchParams]);

  const handleNext = () => {
    if (currentStep < 3) {
      const next = currentStep + 1;
      setCurrentStep(next);
      setDemoStep(next === 2 ? 3 : 4);
    } else {
      // Step 3 submission: trigger AI generation
      setIsGenerating(true);
      setTimeout(() => {
        setIsGenerating(false);
        setDemoStep(5);
        router.push('/discovery');
      }, 1500);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      setDemoStep(prev === 1 ? 2 : 3);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header & Title */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-sarthi-700 bg-sarthi-50 px-3 py-1 rounded-full border border-sarthi-200">
          Smart Entrepreneur Onboarding
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Register Business & Profile Industrial Project
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Our intelligent rules engine converts your enterprise profile into an exact, ordered regulatory journey.
        </p>
      </div>

      {/* 3-Step Wizard Indicator */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between relative">
          
          {/* Connecting Track Line */}
          <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-0.5 bg-slate-200 -z-0" />
          <div
            className="absolute top-1/2 left-8 -translate-y-1/2 h-0.5 bg-sarthi-600 transition-all duration-300 -z-0"
            style={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' }}
          />

          {/* Step 1 Pill */}
          <button
            onClick={() => setCurrentStep(1)}
            className="relative z-10 flex flex-col items-center group cursor-pointer"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition ${
                currentStep >= 1
                  ? 'bg-sarthi-600 text-white shadow-md shadow-sarthi-600/30'
                  : 'bg-slate-100 text-slate-500 border border-slate-300'
              }`}
            >
              1
            </div>
            <span className="text-xs font-semibold text-slate-800 mt-2">Business Details</span>
            <span className="text-[10px] text-slate-400">Entity & Tax IDs</span>
          </button>

          {/* Step 2 Pill */}
          <button
            onClick={() => setCurrentStep(2)}
            className="relative z-10 flex flex-col items-center group cursor-pointer"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition ${
                currentStep >= 2
                  ? 'bg-sarthi-600 text-white shadow-md shadow-sarthi-600/30'
                  : 'bg-slate-100 text-slate-500 border border-slate-300'
              }`}
            >
              2
            </div>
            <span className="text-xs font-semibold text-slate-800 mt-2">Project Details</span>
            <span className="text-[10px] text-slate-400">Location, Capex & Land</span>
          </button>

          {/* Step 3 Pill */}
          <button
            onClick={() => setCurrentStep(3)}
            className="relative z-10 flex flex-col items-center group cursor-pointer"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition ${
                currentStep >= 3
                  ? 'bg-sarthi-600 text-white shadow-md shadow-sarthi-600/30'
                  : 'bg-slate-100 text-slate-500 border border-slate-300'
              }`}
            >
              3
            </div>
            <span className="text-xs font-semibold text-slate-800 mt-2">Project Requirements</span>
            <span className="text-[10px] text-slate-400">Utilities, Safety & Effluent</span>
          </button>
        </div>
      </div>

      {/* Main Wizard Form Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        
        {/* STEP 1: BUSINESS DETAILS */}
        {currentStep === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-sarthi-600" />
                  <span>Step 1: Enterprise Legal Entity & Applicant Information</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Primary corporate identifiers cross-referenced against MCA21 and GSTN
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Company / Legal Entity Name</label>
                <input
                  type="text"
                  value={business.name}
                  onChange={e => setBusiness({ ...business, name: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sarthi-500 font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Authorized Applicant Name</label>
                <input
                  type="text"
                  value={business.applicantName}
                  onChange={e => setBusiness({ ...business, applicantName: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sarthi-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email ID</label>
                <input
                  type="email"
                  value={business.email}
                  onChange={e => setBusiness({ ...business, email: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sarthi-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  value={business.mobile}
                  onChange={e => setBusiness({ ...business, mobile: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sarthi-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">GSTIN Number</label>
                <input
                  type="text"
                  value={business.gstin}
                  onChange={e => setBusiness({ ...business, gstin: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sarthi-500 font-mono uppercase"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Permanent Account Number (PAN)</label>
                <input
                  type="text"
                  value={business.pan}
                  onChange={e => setBusiness({ ...business, pan: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sarthi-500 font-mono uppercase"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Entity Constitution / Type</label>
                <select
                  value={business.businessType}
                  onChange={e => setBusiness({ ...business, businessType: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sarthi-500 bg-white"
                >
                  <option value="Private Limited Company">Private Limited Company (Pvt Ltd)</option>
                  <option value="Public Limited Company">Public Limited Company (Ltd)</option>
                  <option value="Limited Liability Partnership">Limited Liability Partnership (LLP)</option>
                  <option value="Partnership Firm">Partnership Firm</option>
                  <option value="Sole Proprietorship">Sole Proprietorship</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Registered Factory / Office Address</label>
                <textarea
                  rows={2}
                  value={business.registeredAddress}
                  onChange={e => setBusiness({ ...business, registeredAddress: e.target.value })}
                  className="w-full text-xs px-3.5 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sarthi-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: PROJECT DETAILS */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-sarthi-600" />
                  <span>Step 2: Industrial Project Profile & Geographic Location</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Defines regulatory jurisdiction, zone classifications, and capital scale
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Proposed Project Title</label>
                <input
                  type="text"
                  value={project.name}
                  onChange={e => setProject({ ...project, name: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sarthi-500 font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Industry Sector</label>
                <select
                  value={project.sector}
                  onChange={e => setProject({ ...project, sector: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sarthi-500 bg-white font-medium"
                >
                  <option value="Automobile & Electric Mobility">Automobile & Electric Mobility (EV)</option>
                  <option value="Chemicals & Petrochemicals">Chemicals & Petrochemicals</option>
                  <option value="Pharmaceuticals & Bulk Drugs">Pharmaceuticals & Bulk Drugs</option>
                  <option value="Electronics & Semiconductor">Electronics & Semiconductor</option>
                  <option value="Textiles & Garments">Textiles & Garments</option>
                  <option value="Food Processing & Agro">Food Processing & Agro</option>
                  <option value="Renewable Energy Equipment">Renewable Energy Equipment</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Total Proposed Investment (₹ Crores)</label>
                <input
                  type="number"
                  value={project.proposedInvestmentCr}
                  onChange={e => setProject({ ...project, proposedInvestmentCr: parseFloat(e.target.value) || 0 })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sarthi-500 font-bold text-emerald-700"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Direct Workforce / Employees</label>
                <input
                  type="number"
                  value={project.totalEmployees}
                  onChange={e => setProject({ ...project, totalEmployees: parseInt(e.target.value) || 0 })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sarthi-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">State & District</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    disabled
                    value={project.state}
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-100 text-slate-700 font-semibold"
                  />
                  <input
                    type="text"
                    value={project.district}
                    onChange={e => setProject({ ...project, district: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sarthi-500 font-semibold"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Land Classification</label>
                <select
                  value={project.landType}
                  onChange={e => setProject({ ...project, landType: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sarthi-500 bg-white"
                >
                  <option value="MIDC Industrial Estate">MIDC Notified Industrial Area</option>
                  <option value="Private Industrial Park">Private Industrial Park / SEZ</option>
                  <option value="Non-Agricultural (NA) Land">Non-Agricultural (NA) Private Land</option>
                  <option value="Agricultural Land (Conversion Required)">Agricultural (Section 63 Needed)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Designated Industrial Park / Zone</label>
                <input
                  type="text"
                  value={project.midcArea}
                  onChange={e => setProject({ ...project, midcArea: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sarthi-500 font-semibold"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: PROJECT REQUIREMENTS & UTILITIES */}
        {currentStep === 3 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-sarthi-600" />
                  <span>Step 3: Intelligent Regulatory & Utility Questionnaire</span>
                </h3>
                <p className="text-xs text-slate-500">
                  These operational parameters trigger automated statutory rules for pollution, fire, and safety acts
                </p>
              </div>
            </div>

            <div className="space-y-4">
              
              {/* Question 1: Pollution Category */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Droplets className="w-4 h-4 text-cyan-600" />
                    CPCB Pollution Classification
                  </div>
                  <div className="text-[11px] text-slate-600">
                    Determines Consent to Establish (CTE) fee, scrutiny level, and environmental baseline study requirement.
                  </div>
                </div>
                <select
                  value={project.pollutionCategory}
                  onChange={e => setProject({ ...project, pollutionCategory: e.target.value as any })}
                  className="text-xs px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-bold text-amber-700"
                >
                  <option value="Red">Red Category (Heavy Effluent/Emissions)</option>
                  <option value="Orange">Orange Category (Moderate Environmental Impact)</option>
                  <option value="Green">Green Category (Low Environmental Footprint)</option>
                  <option value="White">White Category (Non-Polluting - Exempt)</option>
                </select>
              </div>

              {/* Question 2: Power Demand */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-500" />
                    Connected Power Load Demand
                  </div>
                  <div className="text-[11px] text-slate-600">
                    Loads &gt; 150 kVA trigger dedicated MSEDCL High Tension (HT) 11kV/22kV sub-station bay sanction.
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={project.powerDemandKVA}
                    onChange={e => setProject({ ...project, powerDemandKVA: parseInt(e.target.value) || 0 })}
                    className="w-28 text-xs px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-mono font-bold"
                  />
                  <span className="text-xs font-mono text-slate-500">kVA</span>
                </div>
              </div>

              {/* Question 3: Water Demand */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    Bulk Water Requirement
                  </div>
                  <div className="text-[11px] text-slate-600">
                    Determines MIDC Water Works pipeline sizing and statutory water balance chart review.
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={project.waterDemandKLD}
                    onChange={e => setProject({ ...project, waterDemandKLD: parseInt(e.target.value) || 0 })}
                    className="w-28 text-xs px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-mono font-bold"
                  />
                  <span className="text-xs font-mono text-slate-500">KLD</span>
                </div>
              </div>

              {/* Question 4: Fire & Hazard Checks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                      <Flame className="w-4 h-4 text-rose-500" />
                      Hazardous Chemical / Battery Storage
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Triggers Special Fire NOC</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={project.hasHazardousMaterial}
                    onChange={e => setProject({ ...project, hasHazardousMaterial: e.target.checked })}
                    className="w-5 h-5 text-sarthi-600 rounded"
                  />
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-purple-600" />
                      Industrial Boiler / Autoclave System
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Triggers Boilers Act Clearance</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={project.hasBoiler}
                    onChange={e => setProject({ ...project, hasBoiler: e.target.checked })}
                    className="w-5 h-5 text-sarthi-600 rounded"
                  />
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Wizard Footer Controls */}
        <div className="border-t border-slate-100 pt-5 flex items-center justify-between">
          <div>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="flex items-center space-x-1.5 px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-xs transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={handleNext}
              disabled={isGenerating}
              className="flex items-center space-x-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-sarthi-600 to-blue-600 hover:from-sarthi-500 hover:to-blue-500 text-white font-bold text-xs shadow-md transition disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
                  <span>Analyzing Regulatory Rules...</span>
                </>
              ) : currentStep === 3 ? (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Generate AI Approval Journey</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Save & Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

export default function RegisterWizardPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-500 font-mono">Loading Registration Module...</div>}>
      <RegisterWizardContent />
    </Suspense>
  );
}
