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

export function secondsToRecurringTime(seconds: number) {
  if (seconds % 86400 === 0) {
    const days = seconds / 86400;
    return `Every ${days > 1 ? days : ''} day${days > 1 ? 's' : ''}`;
  }
  if (seconds % 3600 === 0) {
    const hours = seconds / 3600;
    return `Every ${hours > 1 ? hours : ''} hour${hours > 1 ? 's' : ''}`;
  }
  if (seconds % 60 === 0) {
    const minutes = seconds / 60;
    return `Every ${minutes > 1 ? minutes : ''} minute${
      minutes > 1 ? 's' : ''
    }`;
  }
  return `Every ${seconds > 1 ? seconds : ''} second${seconds > 1 ? 's' : ''}`;
}
