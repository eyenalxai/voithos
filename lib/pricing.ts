import { encode } from 'gpt-tokenizer'
import { ChatGPTModel, Role } from '@/lib/schema'
import { Usage } from '@/lib/query/usage'

export const GPT_4_INPUT = 0.00001
export const GPT_4_OUTPUT = 0.00003

export const GPT_35_TURBO_INPUT = 0.0000015
export const GPT_35_TURBO_OUTPUT = 0.000002

export const PRICE_THRESHOLD = 0.01

export type UserUsage = {
  username: string
  email: string
  usage: Usage
}

export const filterUserUsage = (userUsage: {
  username: string
  usage: Usage
}) => {
  const totalSpentThisMonth = userUsage.usage.totalSpentThisMonth
  const totalSpentLastMonth = userUsage.usage.totalSpentLastMonth
  const totalSpent = userUsage.usage.totalSpent

  return (
    (totalSpentThisMonth && totalSpentThisMonth > PRICE_THRESHOLD) ||
    (totalSpentLastMonth && totalSpentLastMonth > PRICE_THRESHOLD) ||
    (totalSpent && totalSpent > PRICE_THRESHOLD)
  )
}

export type UsageSortKey = keyof Usage

export const compareUserUsage = (
  a: UserUsage,
  b: UserUsage,
  sortBy: UsageSortKey
) => (b.usage[sortBy] || 0) - (a.usage[sortBy] || 0)

export const getTokenCost = (
  tokens: number,
  role: Role,
  model: ChatGPTModel
) => {
  if (model === 'gpt_3_5_turbo') {
    if (role === 'user') return tokens * GPT_35_TURBO_INPUT
    if (role === 'assistant') return tokens * GPT_35_TURBO_OUTPUT
    throw new Error('Invalid role')
  }

  if (model === 'gpt_4') {
    if (role === 'user') return tokens * GPT_4_INPUT
    if (role === 'assistant') return tokens * GPT_4_OUTPUT
    throw new Error('Invalid role')
  }

  throw new Error('Invalid model')
}

export const countTokens = (message: string | undefined) => {
  return message ? encode(message).length : 0
}
