import { User, UserRole } from './auth';

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
