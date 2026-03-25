'use client';

import type { MetricData } from '@/types/admin';

interface MetricCardProps {
  metric: MetricData;
  icon: React.ReactNode;
  color: 'emerald' | 'red' | 'amber' | 'purple';
}

const colorConfig = {
  emerald: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    icon: 'text-emerald-600',
  },
  red: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    icon: 'text-red-600',
  },
  amber: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    icon: 'text-amber-600',
  },
  purple: {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    icon: 'text-purple-600',
  },
};

export function MetricCard({ metric, icon, color }: MetricCardProps) {
  const config = colorConfig[color];
  const changeColor = metric.isPositive ? 'text-emerald-400' : 'text-red-400';

  return (
    <div className="flex flex-col gap-3 rounded-xl md:rounded-2xl border border-gray-800 bg-gray-900 p-4 md:p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className={`rounded-lg md:rounded-xl ${config.bg} ${config.icon} p-2 md:p-3`}>{icon}</div>
        <div className={`text-xs font-semibold ${changeColor}`}>
          {metric.isPositive ? '+' : ''}
          {metric.change}%
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-xs md:text-sm font-medium text-gray-400">{metric.label}</p>
        <p className="text-xl md:text-3xl font-bold text-white">{metric.value}</p>
      </div>
    </div>
  );
}
