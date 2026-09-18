'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  color?: 'blue' | 'emerald' | 'amber' | 'rose' | 'purple' | 'slate';
  badge?: string;
  onClick?: () => void;
}

export default function MetricCard({
  title,
  value,
  subtitle,
  change,
  isPositive = true,
  icon: Icon,
  color = 'blue',
  badge,
  onClick
}: MetricCardProps) {
  const colorMap = {
    blue: {
      border: 'border-slate-300 hover:border-[#005a9c]',
      iconBg: 'bg-blue-50 text-[#005a9c]'
    },
    emerald: {
      border: 'border-slate-300 hover:border-emerald-600',
      iconBg: 'bg-emerald-50 text-emerald-700'
    },
    amber: {
      border: 'border-slate-300 hover:border-amber-600',
      iconBg: 'bg-amber-50 text-amber-800'
    },
    rose: {
      border: 'border-slate-300 hover:border-rose-600',
      iconBg: 'bg-rose-50 text-rose-800'
    },
    purple: {
      border: 'border-slate-300 hover:border-purple-600',
      iconBg: 'bg-purple-50 text-purple-700'
    },
    slate: {
      border: 'border-slate-300 hover:border-slate-400',
      iconBg: 'bg-slate-100 text-slate-700'
    }
  };

  const scheme = colorMap[color] || colorMap.blue;

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded border p-4 shadow-2xs transition-all ${scheme.border} ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
          {title}
        </div>
        <div className={`p-1.5 rounded ${scheme.iconBg}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-2.5 flex items-baseline justify-between">
        <div className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {value}
        </div>
        {badge && (
          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-300">
            {badge}
          </span>
        )}
      </div>

      {(subtitle || change) && (
        <div className="mt-1.5 flex items-center justify-between text-[11px]">
          {subtitle && <span className="text-slate-500">{subtitle}</span>}
          {change && (
            <span
              className={`font-semibold flex items-center gap-0.5 ${
                isPositive ? 'text-emerald-700' : 'text-rose-700'
              }`}
            >
              {change}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
