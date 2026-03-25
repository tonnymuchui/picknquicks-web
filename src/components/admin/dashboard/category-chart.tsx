'use client';

import type { CategorySalesData } from '@/types/admin';

interface CategoryChartProps {
  data: CategorySalesData[];
}

interface LegendItemProps {
  category: string;
  percentage: number;
  color: string;
}

function LegendItem({ category, percentage, color }: LegendItemProps) {
  return (
    <div className="flex items-center gap-2">
      <div className={`h-2 w-2 rounded-full ${color}`} />
      <span className="text-xs md:text-sm font-medium text-gray-300">{category}</span>
      <span className="ml-auto text-xs md:text-sm font-semibold text-white">({percentage}%)</span>
    </div>
  );
}

function DonutChart({ data }: { data: CategorySalesData[] }) {
  const totalSales = data.reduce((sum, item) => sum + item.sales, 0);
  const colors = ['bg-purple-500', 'bg-yellow-400', 'bg-pink-400'];

  const slices = data.map((item, index) => {
    const percentage = (item.sales / totalSales) * 100;
    const startAngle =
      index === 0
        ? -90
        : -90 + data.slice(0, index).reduce((sum, d) => sum + (d.sales / totalSales) * 360, 0);
    const endAngle = startAngle + (percentage / 100) * 360;

    return { item, percentage, startAngle, endAngle };
  });

  return (
    <div className="relative flex h-32 w-32 md:h-48 md:w-48 items-center justify-center">
      <svg className="h-full w-full" viewBox="0 0 200 200">
        {slices.map((slice, _index) => {
          const startAngleRad = (slice.startAngle * Math.PI) / 180;
          const endAngleRad = (slice.endAngle * Math.PI) / 180;

          const r = 80;
          const innerR = 50;

          const x1 = 100 + r * Math.cos(startAngleRad);
          const y1 = 100 + r * Math.sin(startAngleRad);
          const x2 = 100 + r * Math.cos(endAngleRad);
          const y2 = 100 + r * Math.sin(endAngleRad);

          const ix1 = 100 + innerR * Math.cos(startAngleRad);
          const iy1 = 100 + innerR * Math.sin(startAngleRad);
          const ix2 = 100 + innerR * Math.cos(endAngleRad);
          const iy2 = 100 + innerR * Math.sin(endAngleRad);

          const largeArc = slice.endAngle - slice.startAngle > 180 ? 1 : 0;

          const colorClass = colors[_index % colors.length];
          const colorMap = {
            'bg-purple-500': '#a855f7',
            'bg-yellow-400': '#facc15',
            'bg-pink-400': '#f472b6',
          };

          return (
            <path
              key={_index}
              className="transition-opacity hover:opacity-80"
              d={`M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${innerR} ${innerR} 0 ${largeArc} 0 ${ix1} ${iy1} Z`}
              fill={colorMap[colorClass as keyof typeof colorMap]}
            />
          );
        })}
      </svg>
      <div className="absolute flex flex-col items-center">
        <p className="text-lg md:text-2xl font-bold text-white">{(totalSales / 1000).toFixed(0)}k</p>
        <p className="text-xs font-medium text-gray-500">Total Sales</p>
      </div>
    </div>
  );
}

export function CategoryChart({ data }: CategoryChartProps) {
  return (
    <div className="flex flex-col rounded-xl md:rounded-2xl border border-gray-800 bg-gray-900 p-4 md:p-6 shadow-sm h-full">
      <div className="mb-4 md:mb-6">
        <h3 className="text-base md:text-lg font-semibold text-white">Sales by Category</h3>
        <p className="mt-1 text-xs md:text-sm text-gray-500">Category distribution</p>
      </div>

      <div className="flex flex-col items-center gap-4 md:gap-8">
        <DonutChart data={data} />
        <div className="space-y-2 md:space-y-3 w-full md:w-48">
          {data.map((item) => (
            <LegendItem
              key={item.category}
              category={item.category}
              color={
                data.indexOf(item) === 0
                  ? 'bg-purple-500'
                  : data.indexOf(item) === 1
                    ? 'bg-yellow-400'
                    : 'bg-pink-400'
              }
              percentage={item.percentage}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
