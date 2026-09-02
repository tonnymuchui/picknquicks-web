import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api/client';
import { createClient } from '@/lib/supabase/client';

import type {
  UserFilters,
  UserListResponse,
  RoleResponse,
  AdminDashboardData,
} from '@/types/admin';

export const adminKeys = {
  all: ['admin'] as const,
  users: () => [...adminKeys.all, 'users'] as const,
  usersList: (filters: UserFilters) => [...adminKeys.users(), 'list', filters] as const,
  userDetail: (id: string) => [...adminKeys.users(), 'detail', id] as const,
  dashboard: (periodDays: number) => [...adminKeys.all, 'dashboard', periodDays] as const,
  roles: () => [...adminKeys.all, 'roles'] as const,
};

export function useUsers(filters: UserFilters = {}) {
  return useQuery({
    queryKey: adminKeys.usersList(filters),
    queryFn: async (): Promise<UserListResponse> => {
      const { data } = await apiClient.get('/admin/users', {
        params: filters,
      });
      return data;
    },
    staleTime: 60 * 1000,
  });
}

export function useUser(userId: string) {
  return useQuery({
    queryKey: adminKeys.userDetail(userId),
    queryFn: async () => {
      const { data } = await apiClient.get(`/admin/users/${userId}`);
      return data;
    },
    enabled: !!userId,
  });
}

export function useRoles() {
  return useQuery({
    queryKey: adminKeys.roles(),
    queryFn: async (): Promise<RoleResponse[]> => {
      const { data } = await apiClient.get('/admin/roles');
      return data.data ?? data;
    },
    staleTime: 2 * 60 * 1000,
  });
}

export function useAdminDashboard(periodDays = 30) {
  return useQuery({
    queryKey: adminKeys.dashboard(periodDays),
    queryFn: async (): Promise<AdminDashboardData> => {
      const supabase = createClient();
      const now = new Date();
      const currentStart = new Date(now);
      currentStart.setDate(currentStart.getDate() - periodDays);
      const previousStart = new Date(currentStart);
      previousStart.setDate(previousStart.getDate() - periodDays);
      const [
        users,
        customers,
        activeUsers,
        orders,
        products,
        payments,
        customerRoles,
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase
          .from('user_roles')
          .select('*', { count: 'exact', head: true })
          .eq('role', 'CUSTOMER'),
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('enabled', true),
        supabase
          .from('orders')
          .select(
            'id,order_number,customer_name,status,total_amount,created_at,order_items(product_id,product_name,product_sku,quantity,subtotal,total,unit_cost)'
          )
          .gte('created_at', previousStart.toISOString())
          .order('created_at', { ascending: false }),
        supabase
          .from('products')
          .select(
            'id,name,sku,active,stock_quantity,reserved_quantity,low_stock_threshold,cost_price,price,sale_price'
          ),
        supabase
          .from('payments')
          .select('amount,status,purpose,created_at')
          .gte('created_at', previousStart.toISOString()),
        supabase
          .from('user_roles')
          .select('created_at')
          .eq('role', 'CUSTOMER')
          .gte('created_at', previousStart.toISOString()),
      ]);

      const queryErrors = [orders.error, products.error, payments.error, customerRoles.error].filter(
        Boolean
      );
      if (queryErrors.length) {
        throw queryErrors[0];
      }

      const allOrders = orders.data ?? [];
      const stock = products.data ?? [];
      const allPayments = payments.data ?? [];
      const roleDates = customerRoles.data ?? [];
      const currentOrders = allOrders.filter(
        (order) => new Date(order.created_at) >= currentStart
      );
      const previousOrders = allOrders.filter(
        (order) => new Date(order.created_at) < currentStart
      );
      const saleStatuses = new Set([
        'PAYMENT_CONFIRMED',
        'PROCESSING',
        'READY_TO_SHIP',
        'SHIPPED',
        'DELIVERED',
        'COMPLETED',
      ]);
      const openStatuses = new Set([
        'AWAITING_PAYMENT',
        'PAYMENT_CONFIRMED',
        'PROCESSING',
        'READY_TO_SHIP',
        'SHIPPED',
      ]);
      const settledStatuses = new Set(['DELIVERED', 'COMPLETED']);
      const salesValue = (rows: typeof allOrders) =>
        rows
          .filter((order) => saleStatuses.has(order.status))
          .reduce((sum, order) => sum + Number(order.total_amount), 0);
      const orderProfit = (rows: typeof allOrders) =>
        rows
          .filter((order) => saleStatuses.has(order.status))
          .flatMap((order) => order.order_items ?? [])
          .reduce(
            (sum, item) => sum + Number(item.subtotal) - Number(item.unit_cost) * item.quantity,
            0
          );
      const currentPayments = allPayments.filter(
        (payment) => new Date(payment.created_at) >= currentStart
      );
      const previousPayments = allPayments.filter(
        (payment) => new Date(payment.created_at) < currentStart
      );
      const collected = (rows: typeof allPayments) =>
        rows
          .filter((payment) => payment.status === 'SUCCEEDED')
          .reduce(
            (sum, payment) =>
              sum + Number(payment.amount) * (payment.purpose === 'REFUND' ? -1 : 1),
            0
          );
      const paidCurrent = currentPayments.filter((payment) => payment.status === 'SUCCEEDED').length;
      const completedPayments = currentPayments.filter((payment) =>
        ['SUCCEEDED', 'FAILED', 'CANCELLED', 'EXPIRED'].includes(payment.status)
      ).length;
      const activeProducts = stock.filter((product) => product.active);
      const available = (product: (typeof stock)[number]) =>
        Math.max(product.stock_quantity - product.reserved_quantity, 0);
      const lowStockProducts = activeProducts.filter(
        (product) => available(product) > 0 && available(product) <= product.low_stock_threshold
      );
      const outOfStockProducts = activeProducts.filter((product) => available(product) === 0);

      const bucketCount = periodDays <= 7 ? 7 : periodDays <= 30 ? 10 : 12;
      const bucketSize = periodDays / bucketCount;
      const revenueSeries = Array.from({ length: bucketCount }, (_, index) => {
        const from = new Date(currentStart);
        from.setTime(currentStart.getTime() + index * bucketSize * 86_400_000);
        const to = new Date(currentStart);
        to.setTime(currentStart.getTime() + (index + 1) * bucketSize * 86_400_000);
        const bucketOrders = currentOrders.filter((order) => {
          const date = new Date(order.created_at);
          return date >= from && date < to;
        });
        const bucketPayments = currentPayments.filter((payment) => {
          const date = new Date(payment.created_at);
          return date >= from && date < to;
        });
        return {
          label: from.toLocaleDateString('en-KE', { month: 'short', day: 'numeric' }),
          revenue: collected(bucketPayments),
          orders: bucketOrders.length,
        };
      });

      const statusOrder = [
        'AWAITING_PAYMENT',
        'PAYMENT_CONFIRMED',
        'PROCESSING',
        'READY_TO_SHIP',
        'SHIPPED',
        'DELIVERED',
        'COMPLETED',
        'CANCELLED',
        'REFUND_PENDING',
        'REFUNDED',
      ];
      const orderStatuses = statusOrder
        .map((status) => ({
          status,
          count: currentOrders.filter((order) => order.status === status).length,
        }))
        .filter((item) => item.count > 0);

      const productMap = new Map<
        string,
        { id: string | null; name: string; sku: string; units: number; revenue: number; profit: number }
      >();
      currentOrders
        .filter((order) => saleStatuses.has(order.status))
        .flatMap((order) => order.order_items ?? [])
        .forEach((item) => {
          const key = item.product_id ?? item.product_sku;
          const existing = productMap.get(key) ?? {
            id: item.product_id,
            name: item.product_name,
            sku: item.product_sku,
            units: 0,
            revenue: 0,
            profit: 0,
          };
          existing.units += item.quantity;
          existing.revenue += Number(item.total);
          existing.profit += Number(item.subtotal) - Number(item.unit_cost) * item.quantity;
          productMap.set(key, existing);
        });

      const periodSales = salesValue(currentOrders);
      const previousSales = salesValue(previousOrders);
      return {
        periodDays,
        totalUsers: users.count ?? 0,
        totalCustomers: customers.count ?? 0,
        activeUsers: activeUsers.count ?? 0,
        totalOrders: allOrders.length,
        pendingOrders: currentOrders.filter((order) => openStatuses.has(order.status)).length,
        completedOrders: currentOrders.filter((order) => settledStatuses.has(order.status)).length,
        totalProducts: activeProducts.length,
        lowStockProducts: lowStockProducts.length,
        outOfStockProducts: outOfStockProducts.length,
        totalRevenue: collected(allPayments),
        periodRevenue: collected(currentPayments),
        previousRevenue: collected(previousPayments),
        periodSales,
        previousSales,
        periodOrders: currentOrders.length,
        previousOrders: previousOrders.length,
        averageOrderValue: currentOrders.length ? periodSales / currentOrders.length : 0,
        previousAverageOrderValue: previousOrders.length
          ? previousSales / previousOrders.length
          : 0,
        grossProfit: orderProfit(currentOrders),
        previousGrossProfit: orderProfit(previousOrders),
        newCustomers: roleDates.filter((row) => new Date(row.created_at) >= currentStart).length,
        previousNewCustomers: roleDates.filter((row) => new Date(row.created_at) < currentStart)
          .length,
        paymentSuccessRate: completedPayments ? (paidCurrent / completedPayments) * 100 : 0,
        paymentOutcomeCount: completedPayments,
        inventoryCostValue: activeProducts.reduce(
          (sum, product) => sum + available(product) * Number(product.cost_price),
          0
        ),
        inventoryRetailValue: activeProducts.reduce(
          (sum, product) =>
            sum + available(product) * Number(product.sale_price ?? product.price),
          0
        ),
        availableUnits: activeProducts.reduce((sum, product) => sum + available(product), 0),
        reservedUnits: activeProducts.reduce(
          (sum, product) => sum + product.reserved_quantity,
          0
        ),
        revenueSeries,
        orderStatuses,
        topProducts: [...productMap.values()]
          .sort((a, b) => b.revenue - a.revenue)
          .slice(0, 5),
        recentOrders: allOrders.slice(0, 6).map((order) => ({
          id: order.id,
          orderNumber: order.order_number,
          customerName: order.customer_name,
          status: order.status,
          total: Number(order.total_amount),
          createdAt: order.created_at,
        })),
        stockAlerts: [...outOfStockProducts, ...lowStockProducts]
          .sort((a, b) => available(a) - available(b))
          .slice(0, 5)
          .map((product) => ({
            id: product.id,
            name: product.name,
            sku: product.sku,
            available: available(product),
            threshold: product.low_stock_threshold,
          })),
      };
    },
    staleTime: 2 * 60_000,
  });
}
