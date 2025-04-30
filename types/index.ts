export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'waiter';
  avatar?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  available: boolean;
  preparationTime?: number; // in minutes
  vegetarian: boolean;
  spicyLevel?: 1 | 2 | 3; // 1: mild, 2: medium, 3: spicy
}

export type OrderType = 'dine-in' | 'parcel';

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';

export interface OrderItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
}

export interface Order {
  id: string;
  tableNumber?: number; // Only for dine-in orders
  items: OrderItem[];
  type: OrderType;
  status: OrderStatus;
  subtotal: number;
  tax: number;
  total: number;
  waiterId: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export interface Bill {
  id: string;
  orderId: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod?: 'cash' | 'card' | 'upi';
  createdAt: Date;
  paidAt?: Date;
}

export interface AnalyticsData {
  dailyRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  topSellingItems: {
    name: string;
    quantity: number;
    revenue: number;
  }[];
  ordersByType: {
    dineIn: number;
    parcel: number;
  };
}