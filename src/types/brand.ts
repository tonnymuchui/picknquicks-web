export interface Brand {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
  websiteUrl?: string;
  countryOfOrigin?: string;
  active: boolean;
  featured: boolean;
  displayOrder: number;
  productCount: number;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBrandInput {
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
  logoFile?: File;
  bannerFile?: File;
  websiteUrl?: string;
  countryOfOrigin?: string;
  displayOrder?: number;
  active?: boolean;
  featured?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

export interface UpdateBrandInput {
  name?: string;
  slug?: string;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
  logoFile?: File;
  bannerFile?: File;
  websiteUrl?: string;
  countryOfOrigin?: string;
  displayOrder?: number;
  active?: boolean;
  featured?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

export interface BrandFilters {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
}