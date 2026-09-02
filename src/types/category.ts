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

export type CategoryStoryKind = 'HERO' | 'SCENE' | 'GUIDE';

export interface CategoryStoryItem {
  id: string;
  categoryId: string;
  kind: CategoryStoryKind;
  eyebrow?: string;
  title: string;
  body?: string;
  mediaUrl?: string;
  altText?: string;
  displayOrder: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryStoryInput {
  kind: CategoryStoryKind;
  eyebrow?: string;
  title: string;
  body?: string;
  mediaUrl?: string;
  altText?: string;
  displayOrder?: number;
  active?: boolean;
  file?: File;
}
