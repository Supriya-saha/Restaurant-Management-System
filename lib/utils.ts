import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
}

export function calculateTax(amount: number, taxRate: number = 0.18): number {
  return amount * taxRate;
}

export function calculateTotal(amount: number, taxRate: number = 0.18): number {
  const tax = calculateTax(amount, taxRate);
  return amount + tax;
}

export function generateOrderId(): string {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 1000);
  return `ORD-${timestamp}-${random}`;
}

export function generateKitchenToken(orderId: string, items: any[]): string {
  const timestamp = new Date().toLocaleString();
  const tokenItems = items.map(item => `${item.quantity}x ${item.name}`).join('\n');
  
  return `
    --- KITCHEN TOKEN ---
    Order ID: ${orderId}
    Time: ${timestamp}
    Items:
    ${tokenItems}
    -------------------
  `;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}