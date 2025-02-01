import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, language: string) {
  return new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
    style: 'currency',
    currency: language === 'ar' ? 'SAR' : 'USD'
  }).format(amount);
}

export function calculatePriceBreakdown(price: number, discount?: number) {
  console.log('Price breakdown:', {
    originalPrice: price,
    adminFee: price * 0.02,
    sellerAmount: price * 0.98,
    discount: discount
  });
  
  const priceAfterDiscount = discount ? price - (price * discount / 100) : price;
  const adminFee = priceAfterDiscount * 0.02;
  
  return {
    originalPrice: price,
    finalPrice: priceAfterDiscount + adminFee,
    adminFee: adminFee,
    sellerAmount: priceAfterDiscount - adminFee
  };
}