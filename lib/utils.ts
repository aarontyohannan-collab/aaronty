import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ItemCategory, CampusLocation, ItemStatus } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}

export function formatTime(timeString?: string): string {
  if (!timeString) return '';
  try {
    const [hours, minutes] = timeString.split(':');
    const h = parseInt(hours, 10);
    const m = parseInt(minutes, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const formattedH = h % 12 === 0 ? 12 : h % 12;
    const formattedM = m < 10 ? `0${m}` : m;
    return `${formattedH}:${formattedM} ${ampm}`;
  } catch {
    return timeString;
  }
}

export function validateCollegeEmail(email: string): { isValid: boolean; message?: string } {
  const trimmed = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, message: 'Please enter a valid email address.' };
  }
  
  // Suggest college email if not ending with .edu or campus domain
  const isCollegeDomain = trimmed.endsWith('.edu') || 
                          trimmed.endsWith('.ac.in') || 
                          trimmed.endsWith('.ac.uk') || 
                          trimmed.includes('campus') || 
                          trimmed.includes('college') || 
                          trimmed.includes('univ');

  return {
    isValid: true,
    message: isCollegeDomain ? undefined : 'Tip: For priority verification, we recommend using your official student/staff college email (.edu).',
  };
}

export const SAMPLE_PHOTO_PRESETS: { label: string; url: string; category: ItemCategory }[] = [
  {
    label: 'MacBook / Laptop',
    category: 'Electronics',
    url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
  },
  {
    label: 'Leather Wallet',
    category: 'Wallets and Money',
    url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80',
  },
  {
    label: 'Keys & Lanyard',
    category: 'Keys',
    url: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=800&auto=format&fit=crop&q=80',
  },
  {
    label: 'Headphones',
    category: 'Electronics',
    url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
  },
  {
    label: 'College ID Card',
    category: 'ID Cards',
    url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80',
  },
  {
    label: 'Backpack',
    category: 'Bags and Accessories',
    url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
  },
  {
    label: 'Textbook / Notes',
    category: 'Books and Stationery',
    url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
  },
  {
    label: 'Water Bottle',
    category: 'Other',
    url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
  },
];

