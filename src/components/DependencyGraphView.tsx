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
  Flame
} from 'lucide-react';
import Link from 'next/link';

// Custom Node Component for React Flow
function ApprovalNode({ data }: { data: any }) {
  const approval: ApprovalItem = data.approval;
  const isSelected = data.isSelected;

  const statusConfig: Record<
    ApprovalStatus,
    { bg: string; border: string; text: string; icon: any; label: string }
  > = {
    COMPLETED: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-500',
      text: 'text-emerald-800',
      icon: CheckCircle2,
      label: 'Completed'
    },
    IN_PROGRESS: {
      bg: 'bg-blue-50',
      border: 'border-blue-500',
      text: 'text-blue-800',
      icon: Clock,
      label: 'In Progress'
    },
    ACTION_REQUIRED: {
      bg: 'bg-amber-50',
      border: 'border-amber-500',
      text: 'text-amber-800',
      icon: AlertTriangle,
      label: 'Action Required'
    },
    BLOCKED: {
      bg: 'bg-rose-50',
      border: 'border-rose-500',
      text: 'text-rose-800',
      icon: Ban,
      label: 'Blocked'
    },
    PENDING: {
      bg: 'bg-slate-50',
      border: 'border-slate-300',
      text: 'text-slate-600',
      icon: Clock,
      label: 'Pending'
    }
  };

  const current = statusConfig[approval.status] || statusConfig.PENDING;
  const StatusIcon = current.icon;

  return (
    <div
      className={`rounded-xl border-2 p-3.5 shadow-md transition-all duration-150 w-64 bg-white cursor-pointer ${
        current.border
      } ${isSelected ? 'ring-4 ring-sarthi-400 ring-offset-2 scale-105 shadow-xl' : 'hover:shadow-lg'}`}
    >
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-sarthi-600" />
      
      {/* Top badges */}
      <div className="flex items-center justify-between gap-1 mb-2">
        <span
          className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${current.bg} ${current.text}`}
        >
          <StatusIcon className="w-3 h-3" />
          <span>{current.label}</span>
        </span>
        {approval.isCriticalPath && (
          <span className="inline-flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-300">
            <Flame className="w-2.5 h-2.5 text-rose-600" />
            <span>Critical Path</span>
          </span>
        )}
      </div>

      {/* Title & Department */}
      <div className="font-bold text-xs text-slate-900 leading-tight mb-1 line-clamp-2">
        {approval.name}
      </div>
      <div className="text-[10px] text-slate-500 truncate mb-2">
        {approval.departmentCode} • {approval.code}
      </div>

      {/* Bottom meta */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-mono">
        <span>{approval.timelineDays} Days SLA</span>
        <span>₹{(approval.fee / 1000).toFixed(0)}k Fee</span>
      </div>

      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-sarthi-600" />
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
  // Order:
  // Col 0: MIDC-LAND
  // Col 1: MIDC-BP, MIDC-WATER
  // Col 2: FIRE-NOC, MSEDCL-HT
  // Col 3: MPCB-CTE
  // Col 4: DISH-FL
  // Col 5: BOILER-REG
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
            stroke: isCriticalEdge ? '#ef4444' : '#94a3b8',
            strokeWidth: isCriticalEdge ? 3 : 2,
            strokeDasharray: isCriticalEdge ? undefined : '5,5'
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: isCriticalEdge ? '#ef4444' : '#94a3b8'
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
    <div className="relative w-full h-[650px] bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
      
      {/* Top Filter & Legend Bar */}
      <div className="bg-slate-950/90 text-white px-5 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 z-10">
        <div className="flex items-center space-x-2">
          <GitFork className="w-5 h-5 text-sarthi-400" />
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Interactive Approval Dependency Graph (DAG)
            </h3>
            <p className="text-[11px] text-slate-400">
              NetworkX-style topological execution order • Click nodes to inspect dependencies & blockages
            </p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center space-x-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition ${
              filterMode === 'all'
                ? 'bg-sarthi-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Approvals (8)
          </button>
          <button
            onClick={() => setFilterMode('critical')}
            className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 transition ${
              filterMode === 'critical'
                ? 'bg-rose-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Flame className="w-3 h-3" />
            Critical Path Only
          </button>
          <button
            onClick={() => setFilterMode('blocked')}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition ${
              filterMode === 'blocked'
                ? 'bg-amber-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Blocked / Action Needed
          </button>
        </div>

        {/* Legend */}
        <div className="hidden xl:flex items-center space-x-3 text-[10px] font-mono text-slate-300">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Completed
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-500" /> In Progress
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Action Required
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500" /> Blocked
          </span>
          <span className="flex items-center gap-1 text-rose-400 font-bold">
            <span className="w-3 h-0.5 bg-rose-500" /> Critical Path
          </span>
        </div>
      </div>

      {/* Graph Canvas */}
      <div className="flex-1 w-full relative">
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
          <Background color="#334155" gap={24} size={1} />
          <Controls className="bg-slate-800 border-slate-700 text-white fill-white" />
          <MiniMap
            className="bg-slate-950 border border-slate-800 rounded-lg hidden sm:block"
            nodeColor={node => {
              const app = approvals.find(a => a.code === node.id);
              if (app?.status === 'COMPLETED') return '#10b981';
              if (app?.status === 'IN_PROGRESS') return '#3b82f6';
              if (app?.status === 'ACTION_REQUIRED') return '#f59e0b';
              if (app?.status === 'BLOCKED') return '#ef4444';
              return '#64748b';
            }}
          />
        </ReactFlow>

        {/* Interactive Node Details Drawer (Overlay) */}
        {selectedApproval && (
          <div className="absolute top-4 right-4 z-20 w-84 sm:w-96 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 p-5 animate-in slide-in-from-right-4 duration-150">
            <div className="flex items-start justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                  {selectedApproval.code}
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-1 leading-snug">
                  {selectedApproval.name}
                </h4>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {selectedApproval.department}
                </div>
              </div>
              <button
                onClick={() => setSelectedApproval(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Blocked / Action Required Warning Callout */}
            {(selectedApproval.status === 'BLOCKED' ||
              selectedApproval.status === 'ACTION_REQUIRED') && (
              <div className="my-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                <div className="font-bold flex items-center gap-1.5 mb-1 text-amber-800">
                  <ShieldAlert className="w-4 h-4 text-amber-600" />
                  <span>Why is this status triggered?</span>
                </div>
                <p className="leading-relaxed">
                  {selectedApproval.whyBlockedReason ||
                    'Prerequisite clearances are incomplete or pending departmental query response.'}
                </p>
              </div>
            )}

            {/* Detailed Parameters */}
            <div className="space-y-2.5 my-3 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Current Status:</span>
                <span className="font-bold capitalize text-slate-800">
                  {selectedApproval.status.replace('_', ' ')}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Application Reference:</span>
                <span className="font-mono font-semibold text-slate-800">
                  {selectedApproval.applicationId || 'Not Yet Filed'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Statutory SLA Timeline:</span>
                <span className="font-semibold text-slate-800">
                  {selectedApproval.timelineDays} Calendar Days
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Assigned Officer:</span>
                <span className="font-medium text-slate-700">
                  {selectedApproval.officerName || 'Queue Auto-Allocation'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Upstream Prerequisites:</span>
                <span className="font-semibold text-sarthi-700">
                  {selectedApproval.prerequisites.length > 0
                    ? selectedApproval.prerequisites.join(', ')
                    : 'None (Root Node)'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Downstream Impact:</span>
                <span className="font-semibold text-rose-700">
                  {selectedApproval.downstream.length > 0
                    ? selectedApproval.downstream.join(', ')
                    : 'None (Leaf Node)'}
                </span>
              </div>
            </div>

            {/* Required Documents List */}
            <div className="my-3">
              <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                Mandatory Documentation ({selectedApproval.requiredDocuments.length})
              </div>
              <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
                {selectedApproval.requiredDocuments.map((doc, idx) => (
                  <div
                    key={idx}
                    className="text-[11px] text-slate-700 bg-slate-50 px-2 py-1 rounded border border-slate-200 truncate"
                  >
                    • {doc}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-2">
              {selectedApproval.status === 'ACTION_REQUIRED' ? (
                <Link
                  href="/queries"
                  className="flex-1 py-2 px-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold text-center transition shadow-xs"
                >
                  Respond to Open Query
                </Link>
              ) : selectedApproval.certificateIssued ? (
                <Link
                  href={`/applications/${selectedApproval.applicationId || 'APP-2026-MPCB-0842'}?certificate=true`}
                  className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold text-center transition shadow-xs"
                >
                  View Digital Certificate
                </Link>
              ) : (
                <Link
                  href={`/applications/${selectedApproval.applicationId || 'APP-2026-MPCB-0842'}`}
                  className="flex-1 py-2 px-3 rounded-lg bg-sarthi-600 hover:bg-sarthi-700 text-white text-xs font-bold text-center transition shadow-xs"
                >
                  Open Application Tracker
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
