import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ChatGPTModel } from '@prisma/client'

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
): 'gpt-3.5-turbo' | 'gpt-4' => {
  if (model === ChatGPTModel.GPT_3_5_TURBO) return 'gpt-3.5-turbo'
  if (model === ChatGPTModel.GPT_4) return 'gpt-4'

  throw new Error(`Unknown model: ${model}`)
}
