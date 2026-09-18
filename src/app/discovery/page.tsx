'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  ShieldCheck,
  Clock,
  IndianRupee,
  Layers,
  ArrowRight,
  GitFork,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
  Building2,
  ExternalLink,
  Search,
  Filter,
  Check
} from 'lucide-react';

export default function KnowYourApprovalsPage() {
  const { approvals, project, business } = useApp();

  // 11 Form Fields per Government Specification
  const [industryType, setIndustryType] = useState('Automobile & Electric Vehicles (EV)');
  const [state, setState] = useState('Maharashtra');
  const [district, setDistrict] = useState('Pune (MIDC Chakan Industrial Area)');
  const [investmentRange, setInvestmentRange] = useState('₹10 Cr to ₹50 Cr (₹25 Cr Proposed Capex)');
  const [landStatus, setLandStatus] = useState('MIDC Allotted Industrial Plot (Plot No. A-12/1)');
  const [projectCategory, setProjectCategory] = useState('Large Enterprise');
  const [pollutionCategory, setPollutionCategory] = useState('Orange Category (Moderate Pollution Potential)');
  const [employmentSize, setEmploymentSize] = useState('150 to 300 Personnel (250 Proposed)');
  const [waterRequirement, setWaterRequirement] = useState('25,000 Litres/Day (MIDC Piped Supply)');
  const [powerRequirement, setPowerRequirement] = useState('1,500 kVA (High Tension 11kV Connection)');
  const [constructionRequirement, setConstructionRequirement] = useState('New Factory Shed Construction (> 10,000 sq.m)');

  const [hasChecked, setHasChecked] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'ALL' | 'Mandatory' | 'Conditional'>('ALL');

  const handleCheckApprovals = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setHasChecked(true);
      const resultsElement = document.getElementById('applicable-approvals-section');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 600);
  };

  const filteredApprovals = approvals.filter(app => {
    if (activeCategoryFilter === 'ALL') return true;
    if (activeCategoryFilter === 'Mandatory') return app.type === 'mandatory';
    if (activeCategoryFilter === 'Conditional') return app.type === 'conditional';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Government Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-[#0b2545]">Home</Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">Know Your Required Approvals</span>
      </nav>

      {/* Page Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#005a9c] mb-1">
            <Building2 className="w-4 h-4 text-[#005a9c]" />
            <span>Single Window Clearance Inference Engine</span>
            <span>•</span>
            <span className="text-slate-500 font-mono">Demo Case: ABC Manufacturing Pvt Ltd</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0b2545] tracking-tight">
            Know Your Required Approvals
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Provide key parameters of your proposed industrial enterprise to determine all applicable statutory clearances, departments, SLAs, and mandatory documents.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <Link
            href="/dependency-graph"
            className="flex items-center space-x-2 px-3.5 py-2 rounded bg-[#0b2545] hover:bg-[#005a9c] text-white text-xs font-bold transition"
          >
            <GitFork className="w-4 h-4" />
            <span>Dependency Graph</span>
          </Link>
          <Link
            href="/documents"
            className="flex items-center space-x-2 px-3.5 py-2 rounded bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition"
          >
            <FileCheck className="w-4 h-4 text-[#005a9c]" />
            <span>Document Checklist</span>
          </Link>
        </div>
      </div>

      {/* Statutory Guidance Notice */}
      <div className="p-3.5 bg-blue-50 border-l-4 border-[#005a9c] text-slate-800 text-xs leading-relaxed flex items-start space-x-2.5">
        <Info className="w-4 h-4 text-[#005a9c] shrink-0 mt-0.5" />
        <div>
          <strong>Statutory Rules Disclaimer:</strong> Identification of applicable approvals is performed by an automated regulatory inference engine mapping industrial classification, pollution category, and land tenancy against prevailing state and central industrial acts. Final applicability and scrutiny are governed by concerned competent authorities.
        </div>
      </div>

      {/* =========================================================================
          SECTION 8 FORM: KNOW YOUR REQUIRED APPROVALS (11 FIELDS)
         ========================================================================= */}
      <div className="bg-white border border-slate-300 shadow-xs">
        <div className="bg-[#f8fafc] px-5 py-3 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#005a9c]" />
            <h2 className="text-sm font-bold text-[#0b2545] uppercase tracking-wider">
              Proposed Industrial Activity Questionnaire
            </h2>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">Form Ref: KYA-IND-2026</span>
        </div>

        <form onSubmit={handleCheckApprovals} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {/* 1. Industry Type */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                1. Industry Type <span className="text-rose-600">*</span>
              </label>
              <select
                value={industryType}
                onChange={e => setIndustryType(e.target.value)}
                className="w-full text-xs p-2.5 border border-slate-300 rounded bg-white focus:outline-none focus:border-[#005a9c] focus:ring-1 focus:ring-[#005a9c]"
              >
                <option value="Automobile & Electric Vehicles (EV)">Automobile & Electric Vehicles (EV)</option>
                <option value="Electronics & Semi-conductor Manufacturing">Electronics & Semi-conductor Manufacturing</option>
                <option value="Chemicals & Petrochemicals">Chemicals & Petrochemicals</option>
                <option value="Pharmaceuticals & Biotech">Pharmaceuticals & Biotech</option>
                <option value="Food Processing & Agro-allied">Food Processing & Agro-allied</option>
                <option value="Textiles & Apparel">Textiles & Apparel</option>
                <option value="General Engineering & Metal Fabrication">General Engineering & Metal Fabrication</option>
              </select>
            </div>

            {/* 2. State */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                2. State <span className="text-rose-600">*</span>
              </label>
              <select
                value={state}
                onChange={e => setState(e.target.value)}
                className="w-full text-xs p-2.5 border border-slate-300 rounded bg-white focus:outline-none focus:border-[#005a9c] focus:ring-1 focus:ring-[#005a9c]"
              >
                <option value="Maharashtra">Maharashtra</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Telangana">Telangana</option>
              </select>
            </div>

            {/* 3. District */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                3. District <span className="text-rose-600">*</span>
              </label>
              <select
                value={district}
                onChange={e => setDistrict(e.target.value)}
                className="w-full text-xs p-2.5 border border-slate-300 rounded bg-white focus:outline-none focus:border-[#005a9c] focus:ring-1 focus:ring-[#005a9c]"
              >
                <option value="Pune (MIDC Chakan Industrial Area)">Pune (MIDC Chakan Industrial Area)</option>
                <option value="Pune (Talegaon Industrial Corridor)">Pune (Talegaon Industrial Corridor)</option>
                <option value="Thane Industrial Zone">Thane Industrial Zone</option>
                <option value="Nashik Industrial Cluster">Nashik Industrial Cluster</option>
                <option value="Chhatrapati Sambhajinagar (Aurangabad)">Chhatrapati Sambhajinagar (Aurangabad)</option>
                <option value="Nagpur Butibori">Nagpur Butibori</option>
              </select>
            </div>

            {/* 4. Investment Range */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                4. Investment Range (Plant & Machinery) <span className="text-rose-600">*</span>
              </label>
              <select
                value={investmentRange}
                onChange={e => setInvestmentRange(e.target.value)}
                className="w-full text-xs p-2.5 border border-slate-300 rounded bg-white focus:outline-none focus:border-[#005a9c] focus:ring-1 focus:ring-[#005a9c]"
              >
                <option value="₹10 Cr to ₹50 Cr (₹25 Cr Proposed Capex)">₹10 Cr to ₹50 Cr (₹25 Cr Proposed Capex)</option>
                <option value="Less than ₹1 Cr (Micro Enterprise)">Less than ₹1 Cr (Micro Enterprise)</option>
                <option value="₹1 Cr to ₹10 Cr (Small Enterprise)">₹1 Cr to ₹10 Cr (Small Enterprise)</option>
                <option value="₹50 Cr to ₹250 Cr (Medium/Large)">₹50 Cr to ₹250 Cr (Medium/Large)</option>
                <option value="Above ₹250 Cr (Mega Project)">Above ₹250 Cr (Mega Project)</option>
              </select>
            </div>

            {/* 5. Land Status */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                5. Land Status <span className="text-rose-600">*</span>
              </label>
              <select
                value={landStatus}
                onChange={e => setLandStatus(e.target.value)}
                className="w-full text-xs p-2.5 border border-slate-300 rounded bg-white focus:outline-none focus:border-[#005a9c] focus:ring-1 focus:ring-[#005a9c]"
              >
                <option value="MIDC Allotted Industrial Plot (Plot No. A-12/1)">MIDC Allotted Industrial Plot</option>
                <option value="Private Non-Agricultural (NA) Industrial Land">Private Non-Agricultural (NA) Land</option>
                <option value="Agricultural Land (Conversion Required)">Agricultural Land (Conversion Required)</option>
                <option value="Leased Built-up Industrial Shed">Leased Built-up Industrial Shed</option>
              </select>
            </div>

            {/* 6. Project Category */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                6. Project Category <span className="text-rose-600">*</span>
              </label>
              <select
                value={projectCategory}
                onChange={e => setProjectCategory(e.target.value)}
                className="w-full text-xs p-2.5 border border-slate-300 rounded bg-white focus:outline-none focus:border-[#005a9c] focus:ring-1 focus:ring-[#005a9c]"
              >
                <option value="Large Enterprise">Large Enterprise</option>
                <option value="Medium Enterprise">Medium Enterprise</option>
                <option value="Small Enterprise">Small Enterprise</option>
                <option value="Mega Project (Special Package Scheme)">Mega Project (Special Package Scheme)</option>
              </select>
            </div>

            {/* 7. Pollution Category */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                7. Pollution Category (CPCB / SPCB) <span className="text-rose-600">*</span>
              </label>
              <select
                value={pollutionCategory}
                onChange={e => setPollutionCategory(e.target.value)}
                className="w-full text-xs p-2.5 border border-slate-300 rounded bg-white focus:outline-none focus:border-[#005a9c] focus:ring-1 focus:ring-[#005a9c]"
              >
                <option value="Orange Category (Moderate Pollution Potential)">Orange Category (Moderate Pollution)</option>
                <option value="Red Category (High Pollution Potential)">Red Category (High Pollution)</option>
                <option value="Green Category (Low Pollution Potential)">Green Category (Low Pollution)</option>
                <option value="White Category (Non-Polluting)">White Category (Non-Polluting)</option>
              </select>
            </div>

            {/* 8. Employment Size */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                8. Employment Size <span className="text-rose-600">*</span>
              </label>
              <select
                value={employmentSize}
                onChange={e => setEmploymentSize(e.target.value)}
                className="w-full text-xs p-2.5 border border-slate-300 rounded bg-white focus:outline-none focus:border-[#005a9c] focus:ring-1 focus:ring-[#005a9c]"
              >
                <option value="150 to 300 Personnel (250 Proposed)">150 to 300 Personnel (250 Proposed)</option>
                <option value="Less than 20 Personnel">Less than 20 Personnel</option>
                <option value="20 to 100 Personnel">20 to 100 Personnel</option>
                <option value="More than 300 Personnel">More than 300 Personnel</option>
              </select>
            </div>

            {/* 9. Water Requirement */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                9. Water Requirement <span className="text-rose-600">*</span>
              </label>
              <select
                value={waterRequirement}
                onChange={e => setWaterRequirement(e.target.value)}
                className="w-full text-xs p-2.5 border border-slate-300 rounded bg-white focus:outline-none focus:border-[#005a9c] focus:ring-1 focus:ring-[#005a9c]"
              >
                <option value="25,000 Litres/Day (MIDC Piped Supply)">25,000 Litres/Day (MIDC Piped Supply)</option>
                <option value="Less than 10,000 Litres/Day">Less than 10,000 Litres/Day</option>
                <option value="50,000 to 1,00,000 Litres/Day">50,000 to 1,00,000 Litres/Day</option>
                <option value="Groundwater Extraction / Borewell">Groundwater Extraction / Borewell</option>
              </select>
            </div>

            {/* 10. Power Requirement */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                10. Power Requirement <span className="text-rose-600">*</span>
              </label>
              <select
                value={powerRequirement}
                onChange={e => setPowerRequirement(e.target.value)}
                className="w-full text-xs p-2.5 border border-slate-300 rounded bg-white focus:outline-none focus:border-[#005a9c] focus:ring-1 focus:ring-[#005a9c]"
              >
                <option value="1,500 kVA (High Tension 11kV Connection)">1,500 kVA (High Tension 11kV Connection)</option>
                <option value="Less than 75 kW (Low Tension 415V)">Less than 75 kW (Low Tension 415V)</option>
                <option value="75 kW to 500 kVA">75 kW to 500 kVA</option>
                <option value="Above 5 MVA (Extra High Voltage 33kV+)">Above 5 MVA (Extra High Voltage 33kV+)</option>
              </select>
            </div>

            {/* 11. Construction Requirement */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                11. Construction Requirement <span className="text-rose-600">*</span>
              </label>
              <select
                value={constructionRequirement}
                onChange={e => setConstructionRequirement(e.target.value)}
                className="w-full text-xs p-2.5 border border-slate-300 rounded bg-white focus:outline-none focus:border-[#005a9c] focus:ring-1 focus:ring-[#005a9c]"
              >
                <option value="New Factory Shed Construction (> 10,000 sq.m)">New Factory Shed Construction (&gt; 10,000 sq.m)</option>
                <option value="Pre-engineered Built Shed (Minor Alterations)">Pre-engineered Built Shed (Minor Alterations)</option>
                <option value="Factory Expansion / Addition of Floor">Factory Expansion / Addition of Floor</option>
                <option value="No Construction / Commercial Lease">No Construction / Commercial Lease</option>
              </select>
            </div>

            {/* Submission Action Button */}
            <div className="flex items-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-[38px] px-4 py-2 bg-[#0b2545] hover:bg-[#005a9c] text-white text-xs font-bold rounded uppercase tracking-wider transition shadow-xs flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <Search className="w-4 h-4" />
                <span>{isSubmitting ? 'Evaluating Clearances...' : 'CHECK REQUIRED APPROVALS'}</span>
              </button>
            </div>

          </div>
        </form>
      </div>

      {/* =========================================================================
          SECTION 8 RESULTS: APPLICABLE APPROVALS TABLE
         ========================================================================= */}
      {hasChecked && (
        <div id="applicable-approvals-section" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-300 pb-2">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#0b2545]">
                Applicable Approvals ({filteredApprovals.length} Clearances Identified)
              </h2>
              <p className="text-xs text-slate-600">
                Statutory regulatory approvals and departmental clearances determined from your project parameters.
              </p>
            </div>

            {/* Category Tabs */}
            <div className="flex items-center space-x-1 border border-slate-300 rounded p-0.5 bg-slate-50 text-xs">
              <button
                onClick={() => setActiveCategoryFilter('ALL')}
                className={`px-2.5 py-1 rounded font-semibold transition ${
                  activeCategoryFilter === 'ALL'
                    ? 'bg-[#0b2545] text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Clearances ({approvals.length})
              </button>
              <button
                onClick={() => setActiveCategoryFilter('Mandatory')}
                className={`px-2.5 py-1 rounded font-semibold transition ${
                  activeCategoryFilter === 'Mandatory'
                    ? 'bg-[#0b2545] text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Mandatory ({approvals.filter(a => a.type === 'mandatory').length})
              </button>
              <button
                onClick={() => setActiveCategoryFilter('Conditional')}
                className={`px-2.5 py-1 rounded font-semibold transition ${
                  activeCategoryFilter === 'Conditional'
                    ? 'bg-[#0b2545] text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Conditional ({approvals.filter(a => a.type === 'conditional').length})
              </button>
            </div>
          </div>

          {/* Table per Government Specification */}
          <div className="bg-white border border-slate-300 rounded overflow-x-auto shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f1f5f9] text-[#0b2545] font-bold uppercase tracking-wider border-b border-slate-300">
                <tr>
                  <th className="px-4 py-3 border-r border-slate-200">Approval Name & Code</th>
                  <th className="px-4 py-3 border-r border-slate-200">Department</th>
                  <th className="px-4 py-3 border-r border-slate-200">Category</th>
                  <th className="px-4 py-3 border-r border-slate-200">Estimated Processing Time</th>
                  <th className="px-4 py-3 border-r border-slate-200">Required Documents</th>
                  <th className="px-4 py-3 border-r border-slate-200">Status</th>
                  <th className="px-4 py-3 text-right">Application Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800">
                {filteredApprovals.map(app => {
                  // Realistic government status labels per spec
                  const govStatus =
                    app.status === 'COMPLETED'
                      ? 'Required (Approved)'
                      : app.status === 'ACTION_REQUIRED'
                      ? 'Information Needed'
                      : app.type === 'conditional'
                      ? 'Information Needed'
                      : 'Required';

                  const govStatusBadge =
                    govStatus === 'Required (Approved)'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : govStatus === 'Information Needed'
                      ? 'bg-amber-50 text-amber-900 border-amber-300'
                      : 'bg-blue-50 text-[#005a9c] border-blue-300';

                  return (
                    <tr key={app.id} className="hover:bg-slate-50 transition">
                      
                      {/* Approval Name */}
                      <td className="px-4 py-3 border-r border-slate-200 font-medium">
                        <div className="font-bold text-slate-900">{app.name}</div>
                        <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                          Code: {app.code}
                        </div>
                      </td>

                      {/* Department */}
                      <td className="px-4 py-3 border-r border-slate-200">
                        <div className="font-semibold text-slate-800">{app.department}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{app.departmentCode}</div>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-3 border-r border-slate-200">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                            app.type === 'mandatory'
                              ? 'bg-slate-100 text-slate-800 border border-slate-300'
                              : 'bg-amber-50 text-amber-800 border border-amber-300'
                          }`}
                        >
                          {app.type}
                        </span>
                      </td>

                      {/* Estimated Processing Time (SLA) */}
                      <td className="px-4 py-3 border-r border-slate-200 font-mono text-slate-700">
                        {app.timelineDays} Calendar Days
                      </td>

                      {/* Required Documents */}
                      <td className="px-4 py-3 border-r border-slate-200">
                        <div className="text-[11px] text-slate-700">
                          {app.requiredDocuments.length} Mandatory Docs
                        </div>
                        <div className="text-[10px] text-slate-500 truncate max-w-[200px]" title={app.requiredDocuments.join(', ')}>
                          {app.requiredDocuments[0]}
                          {app.requiredDocuments.length > 1 && `, +${app.requiredDocuments.length - 1} more`}
                        </div>
                      </td>

                      {/* Status (Required / Not Required / Information Needed) */}
                      <td className="px-4 py-3 border-r border-slate-200">
                        <span
                          className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded border ${govStatusBadge}`}
                        >
                          {govStatus}
                        </span>
                      </td>

                      {/* Application Link */}
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={
                            app.applicationId
                              ? `/applications/${app.applicationId}`
                              : '/register?step=3'
                          }
                          className="inline-flex items-center space-x-1 px-3 py-1 bg-[#0b2545] hover:bg-[#005a9c] text-white text-xs font-semibold rounded transition shadow-2xs"
                        >
                          <span>{app.applicationId ? 'Track Dossier' : 'Apply Now'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Workflow Sequence Footnote */}
          <div className="p-4 bg-slate-50 border border-slate-300 rounded flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="text-slate-700">
              <strong>Need to inspect clearance sequencing and prerequisites?</strong> View the topological DAG to understand which approvals run in parallel.
            </div>
            <Link
              href="/dependency-graph"
              className="px-3.5 py-1.5 rounded bg-[#005a9c] hover:bg-[#0b2545] text-white font-bold transition flex items-center gap-1.5 shrink-0"
            >
              <GitFork className="w-3.5 h-3.5" />
              <span>Open Clearance Dependency Graph</span>
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
