export interface Cart {
  id: string;
  userId?: string;
  guestToken?: string;
  status: 'ACTIVE' | 'ABANDONED' | 'CONVERTED' | 'EXPIRED' | 'MERGED';
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  tax: number;
  total: number;
  isGuest: boolean;
  expiresAt?: string;
  lastActivityAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productSku: string;
  productSlug: string;
  productImageUrl?: string;
  price: number;
  quantity: number;
  taxRate: number;
  itemTotal: number;
  taxAmount: number;
  totalWithTax: number;
  inStock: boolean;
  availableStock: number;
  priceChanged: boolean;
  currentPrice?: number;
}

export interface AddToCartInput {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemInput {
  quantity: number;
}