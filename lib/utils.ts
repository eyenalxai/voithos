import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function shorten(str: string, length: number) {
  if (str.length <= length - 5) {
    return str
  }

  // Add ... to the end of the string
  return `${str.slice(0, length)}...`
}
