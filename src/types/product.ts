export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description?: string;
  shortDescription?: string;
  price: number;
  salePrice?: number;
  effectivePrice: number;
  discountPercentage?: number;
  categoryId: string;
  categoryName?: string;
  brandId?: string;
  brandName?: string;
  stockQuantity: number;
  inStock: boolean;
  lowStock: boolean;
  weightGrams?: number;
  dimensions?: string;
  active: boolean;
  featured: boolean;
  isDigital: boolean;
  requiresShipping: boolean;
  averageRating?: number;
  reviewCount: number;
  saleCount: number;
  viewCount: number;
  primaryImageUrl?: string;
  images: ProductImage[];
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  imageUrl: string;
  altText?: string;
  isPrimary: boolean;
  displayOrder: number;
}

export interface CreateProductInput {
  name: string;
  slug: string;
  sku: string;
  description?: string;
  shortDescription?: string;
  price: number;
  salePrice?: number;
  costPrice?: number;
  taxRate?: number;
  categoryId: string;
  brandId?: string;
  stockQuantity?: number;
  lowStockThreshold?: number;
  weightGrams?: number;
  dimensions?: string;
  active?: boolean;
  featured?: boolean;
  isDigital?: boolean;
  requiresShipping?: boolean;
  displayOrder?: number;
  imageFiles?: File[];
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

export interface UpdateProductInput {
  name?: string;
  slug?: string;
  sku?: string;
  description?: string;
  shortDescription?: string;
  price?: number;
  salePrice?: number;
  costPrice?: number;
  taxRate?: number;
  categoryId?: string;
  brandId?: string;
  lowStockThreshold?: number;
  weightGrams?: number;
  dimensions?: string;
  active?: boolean;
  featured?: boolean;
  isDigital?: boolean;
  requiresShipping?: boolean;
  displayOrder?: number;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

export interface ProductFilters {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
  categoryId?: string;
  brandId?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}

export interface UpdateStockInput {
  quantity: number;
  reason?: string;
}