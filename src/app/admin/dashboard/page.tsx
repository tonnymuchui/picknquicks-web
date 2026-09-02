'use client';

import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Boxes,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Loader2,
  PackageCheck,
  RefreshCw,
  ShoppingBag,
  WalletCards,
} from 'lucide-react';
import Link from 'next/link';
import { useState, type ComponentType } from 'react';

import { useAdminDashboard } from '@/lib/admin/queries';
import { formatPriceKsh } from '@/lib/utils/currency';

import type { AdminDashboardData } from '@/types/admin';

const periods = [7, 30, 90] as const;

export default function AdminDashboardPage() {
  const [periodDays, setPeriodDays] = useState(30);
  const query = useAdminDashboard(periodDays);

  if (query.isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center gap-3 text-sm text-black/45">
        <Loader2 className="animate-spin" size={19} />
        Loading store performance…
      </div>
    );
  }

  if (!query.data || query.error) {
    return (
      <div className="mx-auto flex min-h-[65vh] max-w-md flex-col items-center justify-center px-6 text-center">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-red-50 text-red-700">
          <AlertTriangle size={20} />
        </div>
        <h2 className="mt-4 text-xl font-semibold">Unable to load the overview</h2>
        <p className="mt-2 text-sm leading-6 text-black/50">
          Store data could not be retrieved. Try refreshing the dashboard.
        </p>
        <button
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#9a5d3b] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#754329]"
          onClick={() => query.refetch()}
        >
          <RefreshCw size={15} /> Try again
        </button>
      </div>
    );
  }

  const data = query.data;
  const metrics = [
    {
      current: data.periodRevenue,
      icon: CircleDollarSign,
      label: 'Collected revenue',
      previous: data.previousRevenue,
      value: formatPriceKsh(data.periodRevenue),
    },
    {
      current: data.periodOrders,
      icon: ShoppingBag,
      label: 'Orders',
      previous: data.previousOrders,
      value: data.periodOrders.toLocaleString(),
    },
    {
      current: data.averageOrderValue,
      icon: WalletCards,
      label: 'Average order value',
      previous: data.previousAverageOrderValue,
      value: formatPriceKsh(data.averageOrderValue),
    },
    {
      current: data.grossProfit,
      label: 'Gross profit estimate',
      previous: data.previousGrossProfit,
      value: formatPriceKsh(data.grossProfit),
    },
  ];

  return (
    <div className="min-h-full bg-[#f7f5f2]">
      <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold text-[#9a5d3b]">Store overview</p>
            <h2 className="mt-1 text-3xl font-semibold tracking-[-.04em] text-[#1f1c17]">
              Performance and operations
            </h2>
            <p className="mt-2 text-sm text-black/45">
              Last {periodDays} days compared with the previous {periodDays} days.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex rounded-xl border border-black/10 bg-white p-1">
              {periods.map((days) => (
                <button
                  key={days}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${periodDays === days ? 'bg-[#f2eee7] text-[#754329]' : 'text-black/45 hover:text-black'}`}
                  onClick={() => setPeriodDays(days)}
                >
                  {days}D
                </button>
              ))}
            </div>
            <button
              aria-label="Refresh overview"
              className="flex size-10 items-center justify-center rounded-xl border border-black/10 bg-white text-black/55 hover:border-[#9a5d3b]/40 hover:text-[#9a5d3b]"
              onClick={() => query.refetch()}
            >
              <RefreshCw className={query.isFetching ? 'animate-spin' : ''} size={15} />
            </button>
            <Link
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-black px-4 text-sm font-semibold text-white hover:bg-black/75"
              href="/admin/orders"
            >
              View orders <ArrowUpRight size={15} />
            </Link>
          </div>
        </header>

        <section className="mt-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,.75fr)]">
          <SalesPerformance data={data} />
          <OperationsPanel data={data} />
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,.75fr)]">
          <RecentOrders orders={data.recentOrders} />
          <InventorySummary data={data} />
        </section>

        <section className="mt-4">
          <TopProducts products={data.topProducts} />
        </section>
      </div>
    </div>
  );
}

function MetricCard({
  current,
  icon: Icon,
  label,
  previous,
  value,
}: {
  current: number;
  icon?: ComponentType<{ className?: string; size?: number }>;
  label: string;
  previous: number;
  value: string;
}) {
  const trend = getTrend(current, previous);
  return (
    <article className="min-w-0 rounded-2xl border border-black/[.08] bg-white p-3.5 sm:p-5">
      <div className="flex items-center justify-between gap-4">
        {Icon ? (
          <div className="flex size-9 items-center justify-center rounded-xl bg-[#f2eee7] text-[#9a5d3b]">
            <Icon size={17} />
          </div>
        ) : null}
        <span
          className={`ml-auto text-[11px] font-semibold ${trend.direction === 'down' ? 'text-red-600' : trend.direction === 'flat' ? 'text-black/35' : 'text-[#754329]'}`}
        >
          {trend.label}
        </span>
      </div>
      <p className="mt-5 break-words text-lg font-semibold tracking-[-.035em] text-[#1f1c17] sm:text-2xl">
        {value}
      </p>
      <p className="mt-1 text-xs text-black/45">{label}</p>
    </article>
  );
}

function SalesPerformance({ data }: { data: AdminDashboardData }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-black/[.08] bg-white">
      <div className="flex flex-wrap items-start justify-between gap-4 px-5 pt-5 sm:px-6 sm:pt-6">
        <div>
          <p className="text-xs font-medium text-black/45">Sales performance</p>
          <p className="mt-1 text-2xl font-semibold tracking-[-.035em]">
            {formatPriceKsh(data.periodRevenue)}
          </p>
          <p className="mt-1 text-xs text-black/40">Cash collected during this period</p>
        </div>
        <div className="flex gap-6 text-right">
          <div>
            <p className="text-sm font-semibold">{formatPriceKsh(data.periodSales)}</p>
            <p className="mt-1 text-[10px] text-black/40">Confirmed sales</p>
          </div>
          <div>
            <p className="text-sm font-semibold">{data.periodOrders}</p>
            <p className="mt-1 text-[10px] text-black/40">Orders placed</p>
          </div>
        </div>
      </div>
      <div className="px-3 pb-3 pt-5 sm:px-5 sm:pb-5">
        <RevenueLineChart series={data.revenueSeries} />
      </div>
    </article>
  );
}

function RevenueLineChart({ series }: { series: AdminDashboardData['revenueSeries'] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const width = 760;
  const height = 230;
  const xPadding = 18;
  const yPadding = 20;
  const max = Math.max(...series.map((item) => item.revenue), 1);
  const plotHeight = height - yPadding * 2;
  const plotWidth = width - xPadding * 2;
  const coordinates = series.map((item, index) => ({
    x: xPadding + (index / Math.max(series.length - 1, 1)) * plotWidth,
    y: yPadding + plotHeight - (item.revenue / max) * plotHeight,
  }));
  const line = coordinates.map((point) => `${point.x},${point.y}`).join(' ');
  const area = `${xPadding},${height - yPadding} ${line} ${width - xPadding},${height - yPadding}`;
  const labelIndexes = new Set([0, Math.floor((series.length - 1) / 2), series.length - 1]);
  const activePoint = activeIndex === null ? null : coordinates[activeIndex];
  const activeItem = activeIndex === null ? null : series[activeIndex];
  const hitWidth = plotWidth / Math.max(series.length - 1, 1);

  return (
    <div>
      <div className="relative" onMouseLeave={() => setActiveIndex(null)}>
        <svg
          aria-label="Collected revenue over the selected period. Hover or focus a point for revenue and order details."
          className="h-[230px] w-full"
          preserveAspectRatio="none"
          role="group"
          viewBox={`0 0 ${width} ${height}`}
        >
          {[0, 1, 2, 3].map((lineIndex) => {
            const y = yPadding + (lineIndex / 3) * plotHeight;
            return (
              <line key={lineIndex} stroke="rgba(31,28,23,.08)" x1="18" x2="742" y1={y} y2={y} />
            );
          })}
          <polygon fill="#f2eee7" points={area} />
          <polyline
            fill="none"
            points={line}
            stroke="#9a5d3b"
            strokeLinejoin="round"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
          />
          {activePoint ? (
            <line
              stroke="rgba(117,67,41,.28)"
              strokeDasharray="4 4"
              vectorEffect="non-scaling-stroke"
              x1={activePoint.x}
              x2={activePoint.x}
              y1={yPadding}
              y2={height - yPadding}
            />
          ) : null}
          {coordinates.map((point, index) =>
            series[index].revenue > 0 || activeIndex === index ? (
              <circle
                key={`point-${series[index].label}`}
                cx={point.x}
                cy={point.y}
                fill="#fff"
                r={activeIndex === index ? 6 : 4}
                stroke="#9a5d3b"
                strokeWidth={activeIndex === index ? 3 : 2}
                vectorEffect="non-scaling-stroke"
              />
            ) : null
          )}
          {coordinates.map((point, index) => (
            <rect
              key={`hit-${series[index].label}`}
              aria-label={`${series[index].label}: ${formatPriceKsh(series[index].revenue)} collected revenue from ${series[index].orders} orders`}
              fill="transparent"
              height={plotHeight}
              role="button"
              tabIndex={0}
              width={hitWidth}
              x={Math.max(xPadding, Math.min(point.x - hitWidth / 2, width - xPadding - hitWidth))}
              y={yPadding}
              onBlur={() => setActiveIndex(null)}
              onFocus={() => setActiveIndex(index)}
              onPointerDown={() => setActiveIndex(index)}
              onPointerEnter={() => setActiveIndex(index)}
            />
          ))}
        </svg>
        {activePoint && activeItem && activeIndex !== null ? (
          <div
            aria-live="polite"
            className="pointer-events-none absolute z-10 min-w-40 rounded-xl border border-black/10 bg-white px-3.5 py-3 text-left shadow-[0_12px_35px_rgba(31,28,23,.16)]"
            style={{
              left: `${(activePoint.x / width) * 100}%`,
              top: `${(activePoint.y / height) * 100}%`,
              transform: `translate(${activeIndex === 0 ? '0' : activeIndex === series.length - 1 ? '-100%' : '-50%'}, ${activePoint.y < 80 ? '12px' : 'calc(-100% - 12px)'})`,
            }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[.12em] text-black/40">
              {activeItem.label}
            </p>
            <p className="mt-1 text-sm font-semibold text-[#1f1c17]">
              {formatPriceKsh(activeItem.revenue)}
            </p>
            <p className="mt-0.5 text-[11px] text-black/50">
              {activeItem.orders} order{activeItem.orders === 1 ? '' : 's'} placed
            </p>
          </div>
        ) : null}
      </div>
      <div className="flex justify-between px-1 text-[10px] font-medium text-black/35">
        {series.map((item, index) =>
          labelIndexes.has(index) ? <span key={item.label}>{item.label}</span> : null
        )}
      </div>
    </div>
  );
}

function OperationsPanel({ data }: { data: AdminDashboardData }) {
  const awaitingPayment = getStatusCount(data, 'AWAITING_PAYMENT');
  const stockAlerts = data.lowStockProducts + data.outOfStockProducts;
  const items = [
    {
      detail: 'Orders moving through fulfilment',
      href: '/admin/orders',
      icon: PackageCheck,
      label: 'Open orders',
      tone: data.pendingOrders ? 'warm' : 'good',
      value: data.pendingOrders.toLocaleString(),
    },
    {
      detail: 'Orders waiting for payment',
      href: '/admin/payments',
      icon: Clock3,
      label: 'Awaiting payment',
      tone: awaitingPayment ? 'warm' : 'good',
      value: awaitingPayment.toLocaleString(),
    },
    {
      detail: 'Products at or below threshold',
      href: '/admin/inventory',
      icon: Boxes,
      label: 'Stock alerts',
      tone: stockAlerts ? 'danger' : 'good',
      value: stockAlerts.toLocaleString(),
    },
    {
      detail:
        data.paymentOutcomeCount > 0
          ? `${data.paymentOutcomeCount} completed payment outcomes`
          : 'No completed payment outcomes yet',
      href: '/admin/payments',
      icon: CreditCard,
      label: 'Payment settlement',
      tone: data.paymentOutcomeCount > 0 && data.paymentSuccessRate < 70 ? 'danger' : 'good',
      value: data.paymentOutcomeCount > 0 ? `${Math.round(data.paymentSuccessRate)}%` : '—',
    },
  ];

  return (
    <article className="rounded-2xl border border-black/[.08] bg-white p-5 sm:p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-black/45">Live operations</p>
          <h3 className="mt-1 text-lg font-semibold">Needs your attention</h3>
        </div>
        <span className="rounded-full bg-[#f2eee7] px-2.5 py-1 text-[10px] font-semibold text-[#754329]">
          {data.newCustomers} new customer{data.newCustomers === 1 ? '' : 's'}
        </span>
      </div>
      <div className="mt-5 divide-y divide-black/[.06]">
        {items.map(({ detail, href, icon: Icon, label, tone, value }) => (
          <Link key={label} className="group flex items-center gap-3 py-3.5" href={href}>
            <div
              className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${tone === 'danger' ? 'bg-red-50 text-red-600' : tone === 'warm' ? 'bg-[#f2eee7] text-[#9a5d3b]' : 'bg-emerald-50 text-emerald-700'}`}
            >
              <Icon size={16} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{label}</p>
              <p className="truncate text-[11px] text-black/40">{detail}</p>
            </div>
            <span className="text-sm font-semibold">{value}</span>
            <ArrowRight className="text-black/20 group-hover:text-[#9a5d3b]" size={14} />
          </Link>
        ))}
      </div>
    </article>
  );
}

function RecentOrders({ orders }: { orders: AdminDashboardData['recentOrders'] }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-black/[.08] bg-white">
      <CardHeader href="/admin/orders" subtitle="Latest activity" title="Recent orders" />
      {orders.length ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="border-y border-black/[.06] bg-[#faf9f7] text-[10px] font-semibold text-black/40">
              <tr>
                <th className="px-5 py-3 sm:px-6">Order</th>
                <th className="py-3">Customer</th>
                <th className="py-3">Status</th>
                <th className="py-3">Placed</th>
                <th className="px-5 py-3 text-right sm:px-6">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[.06]">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-5 py-3.5 sm:px-6">
                    <Link
                      className="font-semibold text-[#754329] hover:underline"
                      href={`/admin/orders/${order.id}`}
                    >
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td className="py-3.5 text-black/60">{order.customerName}</td>
                  <td className="py-3.5">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="py-3.5 text-xs text-black/40">{relativeDate(order.createdAt)}</td>
                  <td className="px-5 py-3.5 text-right font-semibold sm:px-6">
                    {formatPriceKsh(order.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState text="Orders will appear here as customers check out." />
      )}
    </article>
  );
}

function InventorySummary({ data }: { data: AdminDashboardData }) {
  const stockAlerts = data.lowStockProducts + data.outOfStockProducts;
  const readiness = data.totalProducts
    ? ((data.totalProducts - stockAlerts) / data.totalProducts) * 100
    : 0;
  const potentialMargin = Math.max(data.inventoryRetailValue - data.inventoryCostValue, 0);

  return (
    <article className="rounded-2xl border border-black/[.08] bg-white p-5 sm:p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-black/45">Inventory</p>
          <h3 className="mt-1 text-lg font-semibold">Stock position</h3>
        </div>
        <Link
          className="text-xs font-semibold text-[#9a5d3b] hover:underline"
          href="/admin/inventory"
        >
          Manage
        </Link>
      </div>
      <div className="mt-5 rounded-xl bg-[#f7f5f2] p-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-2xl font-semibold tracking-[-.035em]">
              {data.availableUnits.toLocaleString()}
            </p>
            <p className="mt-1 text-[11px] text-black/40">Available units</p>
          </div>
          <p className="text-xs text-black/45">{data.reservedUnits} reserved</p>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white">
          <div
            className="h-full rounded-full bg-[#9a5d3b]"
            style={{ width: `${Math.max(0, Math.min(readiness, 100))}%` }}
          />
        </div>
        <p className="mt-2 text-[10px] text-black/40">
          {readiness.toFixed(0)}% of active products above threshold
        </p>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-black/[.07] p-3.5">
          <dt className="text-[10px] text-black/40">Stock at cost</dt>
          <dd className="mt-1 text-sm font-semibold">{formatPriceKsh(data.inventoryCostValue)}</dd>
        </div>
        <div className="rounded-xl border border-black/[.07] p-3.5">
          <dt className="text-[10px] text-black/40">Potential margin</dt>
          <dd className="mt-1 text-sm font-semibold">{formatPriceKsh(potentialMargin)}</dd>
        </div>
      </dl>
      <Link
        className={`mt-4 flex items-center gap-2 rounded-xl px-3.5 py-3 text-xs font-medium ${stockAlerts ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'}`}
        href="/admin/inventory"
      >
        {stockAlerts ? <AlertTriangle size={15} /> : <CheckCircle2 size={15} />}
        {stockAlerts
          ? `${stockAlerts} products need stock attention`
          : 'Inventory levels look healthy'}
        <ArrowRight className="ml-auto" size={14} />
      </Link>
    </article>
  );
}

function TopProducts({ products }: { products: AdminDashboardData['topProducts'] }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-black/[.08] bg-white">
      <CardHeader
        href="/admin/products"
        subtitle="By confirmed sales value"
        title="Best-selling products"
      />
      {products.length ? (
        <div className="grid grid-cols-2 gap-px bg-black/[.06] xl:grid-cols-5">
          {products.map((product, index) => (
            <div key={`${product.id}-${product.sku}`} className="min-w-0 bg-white p-3.5 sm:p-5">
              <div className="flex items-center justify-between">
                <span className="flex size-7 items-center justify-center rounded-lg bg-[#f2eee7] text-[10px] font-semibold text-[#754329]">
                  {index + 1}
                </span>
                <span className="text-[10px] text-black/35">{product.units} sold</span>
              </div>
              <p className="mt-4 truncate text-sm font-semibold">{product.name}</p>
              <p className="mt-1 font-mono text-[9px] text-black/35">{product.sku}</p>
              <p className="mt-4 break-words text-sm font-semibold tracking-[-.025em] sm:text-lg">
                {formatPriceKsh(product.revenue)}
              </p>
              <p className="mt-1 text-[10px] text-black/40">
                {formatPriceKsh(product.profit)} est. profit
              </p>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState text="Best sellers will appear after confirmed product sales." />
      )}
    </article>
  );
}

function CardHeader({ href, subtitle, title }: { href: string; subtitle: string; title: string }) {
  return (
    <div className="flex items-center justify-between px-5 py-5 sm:px-6">
      <div>
        <p className="text-xs text-black/40">{subtitle}</p>
        <h3 className="mt-1 text-lg font-semibold">{title}</h3>
      </div>
      <Link
        className="inline-flex items-center gap-1 text-xs font-semibold text-[#9a5d3b] hover:underline"
        href={href}
      >
        View all <ArrowRight size={13} />
      </Link>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const complete = ['DELIVERED', 'COMPLETED'].includes(status);
  const danger = ['CANCELLED', 'REFUNDED', 'REFUND_PENDING'].includes(status);
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[9px] font-semibold ${danger ? 'bg-red-50 text-red-700' : complete ? 'bg-emerald-50 text-emerald-700' : 'bg-[#f2eee7] text-[#754329]'}`}
    >
      {labelStatus(status)}
    </span>
  );
}

function EmptyState({ text }: { text: string }) {
  return <p className="px-6 py-12 text-center text-sm text-black/40">{text}</p>;
}

function getStatusCount(data: AdminDashboardData, status: string) {
  return data.orderStatuses.find((item) => item.status === status)?.count ?? 0;
}

function getTrend(current: number, previous: number) {
  if (current === 0 && previous === 0) {
    return { direction: 'flat', label: 'No change' } as const;
  }
  if (previous === 0) {
    return { direction: 'up', label: 'New' } as const;
  }
  const change = ((current - previous) / Math.abs(previous)) * 100;
  if (Math.abs(change) < 0.5) {
    return { direction: 'flat', label: 'No change' } as const;
  }
  return {
    direction: change > 0 ? ('up' as const) : ('down' as const),
    label: `${Math.abs(change).toFixed(1)}%`,
  };
}

function labelStatus(status: string) {
  return status
    .toLowerCase()
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function relativeDate(value: string) {
  const date = new Date(value);
  const hours = Math.floor((Date.now() - date.getTime()) / 3_600_000);
  if (hours < 1) {
    return 'Just now';
  }
  if (hours < 24) {
    return `${hours}h ago`;
  }
  const days = Math.floor(hours / 24);
  if (days < 7) {
    return `${days}d ago`;
  }
  return date.toLocaleDateString('en-KE', { day: 'numeric', month: 'short' });
}
