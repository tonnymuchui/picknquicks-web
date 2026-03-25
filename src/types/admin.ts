import type { User, UserRole } from './auth';

export interface RoleResponse {
  id: string;
  name: string;
  description?: string;
  permissions?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateRoleRequest {
  name: string;
  description?: string;
  permissions?: string[];
}

export interface UpdateRoleRequest {
  name?: string;
  description?: string;
  permissions?: string[];
}

export interface UpdateUserRolesRequest {
  userId: string;
  roles: UserRole[];
}

export interface CreateStaffRequest {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  roles: UserRole[];
}

export interface UserListResponse {
  content: User[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface UserFilters {
  page?: number;
  size?: number;
  role?: UserRole;
  search?: string;
  emailVerified?: boolean;
  enabled?: boolean;
}

// Dashboard Types
export interface MetricData {
  value: number | string;
  label: string;
  change: number;
  isPositive: boolean;
  trend?: 'up' | 'down' | 'stable';
}

export interface ChartDataPoint {
  label: string;
  value: number;
  fill?: string;
}

export interface SalesMetrics {
  revenue: MetricData;
  customers: MetricData;
  totalOrders: MetricData;
  averageValue: MetricData;
}

export interface SalesPerformanceData {
  months: string[];
  sales: number[];
  currentMonthIncrease: number;
}

export interface CategorySalesData {
  category: string;
  sales: number;
  percentage: number;
  color?: string;
}

export interface RecentOrderItem {
  id: string;
  customerName: string;
  email: string;
  orderId: string;
  date: string;
  itemCount: number;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  customerImage?: string;
}

export interface AdminDashboardData {
  metrics: SalesMetrics;
  salesPerformance: SalesPerformanceData;
  categorySales: CategorySalesData[];
  recentOrders: RecentOrderItem[];
}
