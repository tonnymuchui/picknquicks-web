export type PaymentMethod = 'MPESA_FULL' | 'CASH_ON_DELIVERY';
export type PaymentPurpose = 'ORDER_TOTAL' | 'DELIVERY_FEE' | 'ORDER_BALANCE' | 'REFUND';
export type OrderSource = 'ONLINE' | 'PHONE' | 'IN_STORE';

export type OrderStatus =
  | 'AWAITING_PAYMENT'
  | 'PAYMENT_CONFIRMED'
  | 'PAYMENT_FAILED'
  | 'PROCESSING'
  | 'READY_TO_SHIP'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'REFUND_PENDING'
  | 'REFUNDED';

export type PaymentStatus =
  | 'PENDING'
  | 'STK_PUSHED'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'FAILED'
  | 'CANCELLED'
  | 'REFUNDED';

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  email: string;
  phoneNumber: string;
  customerName: string;
  status: OrderStatus;
  source: OrderSource;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  items: OrderItem[];
  shippingAddress: OrderAddress;
  payment?: Payment;
  subtotal: number;
  taxAmount: number;
  shippingCost: number;
  totalAmount: number;
  paidAmount: number;
  balanceDue: number;
  amountDueNow: number;
  amountDueOnDelivery: number;
  notes?: string;
  trackingNumber?: string;
  estimatedDeliveryDate?: string;
  isGuest: boolean;
  guestAccessToken?: string;
  payments?: Payment[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productSku: string;
  productImageUrl?: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  subtotal: number;
  taxAmount: number;
  total: number;
}

export interface OrderAddress {
  recipientName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  county?: string;
  postalCode?: string;
  country: string;
  notes?: string;
}

export interface Payment {
  id: string;
  purpose: PaymentPurpose;
  paymentMethod?: PaymentMethod;
  status: PaymentStatus;
  amount: number;
  transactionId?: string;
  phoneNumber: string;
  mpesaReceiptNumber?: string;
  paidAt?: string;
  failureReason?: string;
}

export interface ShippingAddressInput {
  recipientName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  county?: string;
  postalCode?: string;
  notes?: string;
}

export interface CreateOrderInput {
  email: string;
  phoneNumber: string;
  customerName: string;
  paymentMethod: PaymentMethod;
  shippingAddress: ShippingAddressInput;
  notes?: string;
}

export interface CreateManualOrderInput extends CreateOrderInput {
  items: Array<{ productId: string; quantity: number }>;
  source: Exclude<OrderSource, 'ONLINE'>;
  sendPaymentPrompt: boolean;
}

export interface OrderFilters {
  page?: number;
  size?: number;
  status?: OrderStatus | 'ALL';
  paymentMethod?: PaymentMethod | '';
  search?: string;
  startDate?: string;
  endDate?: string;
}
