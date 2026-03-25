'use client';

import type { SalesPerformanceData } from '@/types/admin';

interface SalesChartProps {
  data: SalesPerformanceData;
}

interface BarProps {
  value: number;
  month: string;
  maxValue: number;
  isHighlight: boolean;
}

function ChartBar({ value, month, maxValue, isHighlight }: BarProps) {
  const heightPercent = (value / maxValue) * 100;

  return (
    <div className="flex flex-col items-center gap-1 md:gap-2">
      <div className="relative h-24 w-6 md:h-40 md:w-10 overflow-hidden rounded-lg bg-gray-800">
        <div
          className={`absolute bottom-0 w-full rounded-t-lg transition-all ${
            isHighlight ? 'bg-yellow-400' : 'bg-gray-700'
          }`}
          style={{ height: `${heightPercent}%` }}
        />
        {isHighlight ? (
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gray-950 px-2 py-1 text-xs font-semibold text-white">
            +${(value / 1000).toFixed(1)}k
          </div>
        ) : null}
      </div>
      <span className="text-xs font-medium text-gray-500">{month}</span>
    </div>
  );
}

export function SalesChart({ data }: SalesChartProps) {
  const maxValue = Math.max(...data.sales);

  return (
    <div className="flex flex-col rounded-xl md:rounded-2xl border border-gray-800 bg-gray-900 p-4 md:p-6 shadow-sm h-full">
      <div className="mb-4 md:mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-base md:text-lg font-semibold text-white">Sales Performance</h3>
          <p className="mt-1 text-xs md:text-sm text-gray-500">Monthly sales trend</p>
        </div>
        <select
          className="rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-xs md:text-sm font-medium text-white cursor-pointer transition-all hover:border-gray-500 w-full md:w-auto md:min-w-fit"
          defaultValue="monthly"
        >
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <div className="flex items-end justify-between gap-2 md:gap-4 px-2 md:px-4 py-6 md:py-8 min-w-min">
          {data.months.map((month, index) => (
            <ChartBar
              key={month}
              isHighlight={index === data.months.length - 1}
              maxValue={maxValue}
              month={month}
              value={data.sales[index]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
