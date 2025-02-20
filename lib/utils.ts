import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFavicon(url: string): string | null {
  try {
    const parsedUrl = new URL(url);
    return `https://www.google.com/s2/favicons?sz=64&domain=${parsedUrl.hostname}`;
  } catch (error) {
    console.error('Invalid URL', error);
    return null;
  }
}
