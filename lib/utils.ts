import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ChatGPTModel } from '@/lib/schema'
import { Children, ReactNode } from 'react'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function shorten(str: string, length: number) {
  if (str.length <= length - 5) {
    return str
  }

  return `${str.slice(0, length)}...`
}

export const enumToModelName = (
  model: ChatGPTModel
): 'gpt-3.5-turbo-1106' | 'gpt-4-turbo-preview' => {
  if (model === 'gpt_3_5_turbo') return 'gpt-3.5-turbo-1106'
  if (model === 'gpt_4') return 'gpt-4-turbo-preview'

  throw new Error(`Unknown model: ${model}`)
}

export const isInline = (children: ReactNode): boolean => {
  for (let child of Children.toArray(children)) {
    if (typeof child === 'string' && child.includes('\n')) {
      return false
    }
  }

  return true
}
