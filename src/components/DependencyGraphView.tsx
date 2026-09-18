'use client';

import React, { useState, useMemo, useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  Handle,
  Position
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useApp } from '../context/AppContext';
import { ApprovalItem, ApprovalStatus } from '../types';
import {
  GitFork,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Ban,
  HelpCircle,
  X,
  ExternalLink,
  Layers,
  ArrowRight,
  ShieldAlert,
  SlidersHorizontal,
  Flame,
  Building2,
  FileCheck,
  Info
} from 'lucide-react';
import Link from 'next/link';

// Custom Node Component for React Flow (Government Administrative Card Style)
function ApprovalNode({ data }: { data: any }) {
  const approval: ApprovalItem = data.approval;
  const isSelected = data.isSelected;

  const statusConfig: Record<
    ApprovalStatus,
    { bg: string; border: string; text: string; icon: any; label: string }
  > = {
    COMPLETED: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-600',
      text: 'text-emerald-800',
      icon: CheckCircle2,
      label: 'Approved / Completed'
    },
    IN_PROGRESS: {
      bg: 'bg-blue-50',
      border: 'border-[#005a9c]',
      text: 'text-[#005a9c]',
      icon: Clock,
      label: 'Under Scrutiny'
    },
    ACTION_REQUIRED: {
      bg: 'bg-amber-50',
      border: 'border-amber-600',
      text: 'text-amber-900',
      icon: AlertTriangle,
      label: 'Clarification Needed'
    },
    BLOCKED: {
      bg: 'bg-rose-50',
      border: 'border-rose-600',
      text: 'text-rose-900',
      icon: Ban,
      label: 'Prerequisite Pending'
    },
    PENDING: {
      bg: 'bg-slate-50',
      border: 'border-slate-300',
      text: 'text-slate-700',
      icon: Clock,
      label: 'Awaiting Initiation'
    }
  };

  const current = statusConfig[approval.status] || statusConfig.PENDING;
  const StatusIcon = current.icon;

  return (
    <div
      className={`rounded border-2 p-3 shadow-xs transition-all w-64 bg-white cursor-pointer ${
        current.border
      } ${
        isSelected
          ? 'ring-2 ring-[#0b2545] ring-offset-2 shadow-md'
          : 'hover:shadow'
      }`}
    >
      <Handle type="target" position={Position.Left} className="w-2.5 h-2.5 bg-[#0b2545]" />
      
      {/* Top badges */}
      <div className="flex items-center justify-between gap-1 mb-1.5">
        <span
          className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded ${current.bg} ${current.text}`}
        >
          <StatusIcon className="w-3 h-3" />
          <span>{current.label}</span>
        </span>
        {approval.isCriticalPath && (
          <span className="inline-flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-300">
            <Flame className="w-2.5 h-2.5 text-rose-600" />
            <span>Critical Path</span>
          </span>
        )}
      </div>

      {/* Title & Department */}
      <div className="font-bold text-xs text-slate-900 leading-snug mb-1 line-clamp-2">
        {approval.name}
      </div>
      <div className="text-[11px] text-[#005a9c] font-medium truncate mb-2">
        {approval.departmentCode} • {approval.code}
      </div>

      {/* Bottom meta */}
      <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-600 font-mono">
        <span>SLA: {approval.timelineDays} Days</span>
        <span>Fee: ₹{(approval.fee / 1000).toFixed(0)}k</span>
      </div>

      <Handle type="source" position={Position.Right} className="w-2.5 h-2.5 bg-[#0b2545]" />
    </div>
  );
}

const nodeTypes = {
  approvalNode: ApprovalNode
};

export default function DependencyGraphView() {
  const { approvals } = useApp();
  const [selectedApproval, setSelectedApproval] = useState<ApprovalItem | null>(approvals[3]); // default MPCB-CTE
  const [filterMode, setFilterMode] = useState<'all' | 'critical' | 'blocked'>('all');

  // Topological layout calculation for the 8 approvals
  const initialNodes = useMemo(() => {
    const layoutPositions: Record<string, { x: number; y: number }> = {
      'MIDC-LAND': { x: 30, y: 150 },
      'MIDC-BP': { x: 330, y: 100 },
      'MIDC-WATER': { x: 330, y: 310 },
      'FIRE-NOC': { x: 630, y: 80 },
      'MSEDCL-HT': { x: 630, y: 260 },
      'MPCB-CTE': { x: 930, y: 80 },
      'DISH-FL': { x: 1230, y: 150 },
      'BOILER-REG': { x: 1530, y: 200 }
    };

    return approvals
      .filter(app => {
        if (filterMode === 'critical') return app.isCriticalPath;
        if (filterMode === 'blocked') return app.status === 'BLOCKED' || app.status === 'ACTION_REQUIRED';
        return true;
      })
      .map(app => ({
        id: app.code,
        type: 'approvalNode',
        position: layoutPositions[app.code] || { x: 100, y: 100 },
        data: {
          approval: app,
          isSelected: selectedApproval?.code === app.code
        }
      }));
  }, [approvals, selectedApproval, filterMode]);

  // Generate Edges based on prerequisites & downstream
  const initialEdges = useMemo(() => {
    const edges: any[] = [];
    approvals.forEach(app => {
      app.downstream.forEach(downstreamCode => {
        const isCriticalEdge = app.isCriticalPath && approvals.find(a => a.code === downstreamCode)?.isCriticalPath;
        edges.push({
          id: `e-${app.code}-${downstreamCode}`,
          source: app.code,
          target: downstreamCode,
          animated: app.status === 'IN_PROGRESS' || app.status === 'ACTION_REQUIRED',
          style: {
            stroke: isCriticalEdge ? '#b91c1c' : '#64748b',
            strokeWidth: isCriticalEdge ? 2.5 : 1.5,
            strokeDasharray: isCriticalEdge ? undefined : '4,4'
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: isCriticalEdge ? '#b91c1c' : '#64748b'
          }
        });
      });
    });
    return edges;
  }, [approvals]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Sync nodes selection
  React.useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes, setNodes]);

  const onNodeClick = useCallback(
    (_: any, node: any) => {
      const clicked = approvals.find(a => a.code === node.id);
      if (clicked) {
        setSelectedApproval(clicked);
      }
    },
    [approvals]
  );

  return (
    <div className="relative w-full h-[660px] bg-[#f8fafc] border border-slate-300 rounded shadow-xs overflow-hidden flex flex-col">
      
      {/* Top Government Sub-Header & Legend Bar */}
      <div className="bg-[#0b2545] text-white px-4 py-2.5 border-b border-[#001f3f] flex flex-wrap items-center justify-between gap-3 z-10">
        <div className="flex items-center space-x-2">
          <GitFork className="w-4 h-4 text-amber-300" />
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Approval Dependency Graph (DAG) — Clearance Sequence & Linkages
            </h3>
            <p className="text-[11px] text-slate-300">
              Topological clearance workflow • Click nodes to view prerequisites, mandatory documents, and actions
            </p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center space-x-1.5 bg-[#001f3f] p-1 rounded border border-blue-900/50">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition ${
              filterMode === 'all'
                ? 'bg-white text-[#0b2545]'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            All Approvals (8)
          </button>
          <button
            onClick={() => setFilterMode('critical')}
            className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 transition ${
              filterMode === 'critical'
                ? 'bg-rose-700 text-white'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Flame className="w-3 h-3" />
            Critical Path
          </button>
          <button
            onClick={() => setFilterMode('blocked')}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition ${
              filterMode === 'blocked'
                ? 'bg-amber-600 text-white'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Clarification Required / Blocked
          </button>
        </div>

        {/* Legend */}
        <div className="hidden xl:flex items-center space-x-3 text-[11px] text-slate-200">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-emerald-600" /> Approved
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-[#005a9c]" /> Under Scrutiny
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-amber-500" /> Clarification Needed
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-rose-600" /> Prerequisite Pending
          </span>
          <span className="flex items-center gap-1.5 text-rose-300 font-semibold">
            <span className="w-3.5 h-0.5 bg-rose-500" /> Critical Path
          </span>
        </div>
      </div>

      {/* Graph Canvas */}
      <div className="flex-1 w-full relative bg-[#f1f5f9]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
          minZoom={0.3}
          maxZoom={1.5}
        >
          <Background color="#cbd5e1" gap={20} size={1} />
          <Controls className="bg-white border border-slate-300 rounded shadow-xs text-slate-700 fill-slate-700" />
          <MiniMap
            className="bg-white border border-slate-300 rounded shadow-xs hidden sm:block"
            nodeColor={node => {
              const app = approvals.find(a => a.code === node.id);
              if (app?.status === 'COMPLETED') return '#16a34a';
              if (app?.status === 'IN_PROGRESS') return '#005a9c';
              if (app?.status === 'ACTION_REQUIRED') return '#d97706';
              if (app?.status === 'BLOCKED') return '#dc2626';
              return '#64748b';
            }}
          />
        </ReactFlow>

        {/* Node Inspection Drawer (Formal Government Panel) */}
        {selectedApproval && (
          <div className="absolute top-4 right-4 z-20 w-84 sm:w-96 bg-white border border-slate-300 shadow-lg rounded overflow-hidden flex flex-col">
            <div className="bg-[#0b2545] text-white p-3 flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/20 text-white font-bold">
                  {selectedApproval.code}
                </span>
                <h4 className="text-xs font-bold text-white mt-1 leading-snug">
                  {selectedApproval.name}
                </h4>
                <div className="text-[11px] text-slate-200 mt-0.5">
                  {selectedApproval.department}
                </div>
              </div>
              <button
                onClick={() => setSelectedApproval(null)}
                className="p-1 rounded text-slate-300 hover:text-white hover:bg-white/10"
                aria-label="Close Inspector"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-3 text-xs overflow-y-auto max-h-[480px]">
              {/* Clarification Required Callout */}
              {(selectedApproval.status === 'BLOCKED' ||
                selectedApproval.status === 'ACTION_REQUIRED') && (
                <div className="p-2.5 rounded bg-amber-50 border border-amber-300 text-amber-950 text-xs">
                  <div className="font-bold flex items-center gap-1 mb-1 text-amber-900">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
                    <span>Statutory Requirement / Query Notice</span>
                  </div>
                  <p className="leading-relaxed text-[11px]">
                    {selectedApproval.whyBlockedReason ||
                      'Prerequisite clearances are incomplete or pending departmental clarification response.'}
                  </p>
                </div>
              )}

              {/* Detailed Administrative Parameters Table */}
              <div className="border border-slate-200 rounded overflow-hidden">
                <table className="w-full text-left text-xs">
                  <tbody className="divide-y divide-slate-200">
                    <tr className="bg-slate-50">
                      <td className="px-2.5 py-1.5 text-slate-500 font-medium">Current Status</td>
                      <td className="px-2.5 py-1.5 font-bold text-slate-900 capitalize">
                        {selectedApproval.status.replace('_', ' ')}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-2.5 py-1.5 text-slate-500 font-medium">Application Ref</td>
                      <td className="px-2.5 py-1.5 font-mono font-semibold text-slate-900">
                        {selectedApproval.applicationId || 'Not Yet Submitted'}
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-2.5 py-1.5 text-slate-500 font-medium">Statutory SLA</td>
                      <td className="px-2.5 py-1.5 font-semibold text-slate-900">
                        {selectedApproval.timelineDays} Calendar Days
                      </td>
                    </tr>
                    <tr>
                      <td className="px-2.5 py-1.5 text-slate-500 font-medium">Assigned Officer</td>
                      <td className="px-2.5 py-1.5 text-slate-800">
                        {selectedApproval.officerName || 'Single Window Desk Allocation'}
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-2.5 py-1.5 text-slate-500 font-medium">Upstream Prerequisites</td>
                      <td className="px-2.5 py-1.5 font-semibold text-[#005a9c]">
                        {selectedApproval.prerequisites.length > 0
                          ? selectedApproval.prerequisites.join(', ')
                          : 'None (Root Node)'}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-2.5 py-1.5 text-slate-500 font-medium">Downstream Linkages</td>
                      <td className="px-2.5 py-1.5 font-semibold text-rose-700">
                        {selectedApproval.downstream.length > 0
                          ? selectedApproval.downstream.join(', ')
                          : 'None (Final Node)'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Required Documents List */}
              <div>
                <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Required Documents ({selectedApproval.requiredDocuments.length})
                </div>
                <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
                  {selectedApproval.requiredDocuments.map((doc, idx) => (
                    <div
                      key={idx}
                      className="text-[11px] text-slate-800 bg-slate-100 px-2 py-1 rounded border border-slate-200 truncate"
                    >
                      • {doc}
                    </div>
                  ))}
                </div>
              </div>

              {/* Statutory Disclaimer */}
              <div className="text-[10px] text-slate-500 border-t border-slate-200 pt-2 leading-tight">
                * Note: Approvals and clearance orders are issued exclusively by designated competent authorities under applicable state and central industrial acts.
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-2">
                {selectedApproval.status === 'ACTION_REQUIRED' ? (
                  <Link
                    href="/queries"
                    className="flex-1 py-2 px-3 rounded bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold text-center transition"
                  >
                    Respond to Clarification
                  </Link>
                ) : selectedApproval.certificateIssued ? (
                  <Link
                    href={`/applications/${selectedApproval.applicationId || 'APP-2026-MPCB-0842'}?certificate=true`}
                    className="flex-1 py-2 px-3 rounded bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold text-center transition"
                  >
                    View Sanction Order
                  </Link>
                ) : (
                  <Link
                    href={`/applications/${selectedApproval.applicationId || 'APP-2026-MPCB-0842'}`}
                    className="flex-1 py-2 px-3 rounded bg-[#0b2545] hover:bg-[#005a9c] text-white text-xs font-bold text-center transition"
                  >
                    Track Application
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
