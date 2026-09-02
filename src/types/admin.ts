import type { User, UserRole } from './auth';

export interface RoleResponse {
  id: string;
  name: string;
  description?: string;
  userCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoleRequest {
  name: string;
  description?: string;
}

export interface UpdateRoleRequest {
  name?: string;
  description?: string;
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

export interface AdminDashboardData {
  periodDays: number;
  totalUsers: number;
  totalCustomers: number;
  activeUsers: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  completedOrders: number;
  totalProducts: number;
  lowStockProducts: number;
  outOfStockProducts: number;
  periodRevenue: number;
  previousRevenue: number;
  periodSales: number;
  previousSales: number;
  periodOrders: number;
  previousOrders: number;
  averageOrderValue: number;
  previousAverageOrderValue: number;
  grossProfit: number;
  previousGrossProfit: number;
  newCustomers: number;
  previousNewCustomers: number;
  paymentSuccessRate: number;
  paymentOutcomeCount: number;
  inventoryCostValue: number;
  inventoryRetailValue: number;
  availableUnits: number;
  reservedUnits: number;
  revenueSeries: Array<{
    label: string;
    revenue: number;
    orders: number;
  }>;
  orderStatuses: Array<{
    status: string;
    count: number;
  }>;
  topProducts: Array<{
    id: string | null;
    name: string;
    sku: string;
    units: number;
    revenue: number;
    profit: number;
  }>;
  recentOrders: Array<{
    id: string;
    orderNumber: string;
    customerName: string;
    status: string;
    total: number;
    createdAt: string;
  }>;
  stockAlerts: Array<{
    id: string;
    name: string;
    sku: string;
    available: number;
    threshold: number;
  }>;
}
