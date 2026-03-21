export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  iconUrl?: string;
  active: boolean;
  displayOrder: number;
  parentId?: string;
  parentName?: string;
  level: number;
  fullPath: string;
  hasChildren: boolean;
  childrenCount: number;
  children?: Category[];
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryTree {
  id: string;
  name: string;
  slug: string;
  iconUrl?: string;
  active: boolean;
  displayOrder: number;
  level: number;
  children: CategoryTree[];
}

export interface CreateCategoryInput {
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  iconUrl?: string;
  imageFile?: File;
  iconFile?: File;
  parentId?: string;
  displayOrder?: number;
  active?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

export interface UpdateCategoryInput {
  name?: string;
  slug?: string;
  description?: string;
  imageUrl?: string;
  iconUrl?: string;
  imageFile?: File;
  iconFile?: File;
  parentId?: string;
  displayOrder?: number;
  active?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

export interface CategoryFilters {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
}