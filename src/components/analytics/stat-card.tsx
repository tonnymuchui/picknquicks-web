import { type LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  critical?: boolean;
}

export function StatCard({ title, value, icon: Icon, trend, critical = false }: StatCardProps) {
  return (
    <div className="border border-black/10 bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <div className={critical ? 'text-red-700' : 'text-black/45'}>
          <Icon size={20} strokeWidth={1.6} />
        </div>
      </div>

      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold text-gray-900">{value}</p>

        {trend ? (
          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              trend.isPositive ? 'text-black/65' : 'text-red-600'
            }`}
          >
            {trend.isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            {Math.abs(trend.value)}%
          </div>
        ) : null}
      </div>
    </div>
  );
}
