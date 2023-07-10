import { encode } from 'gpt-tokenizer'
import { ChatGPTModel, Role } from '@prisma/client'

export const GPT_4_INPUT = 0.00003
export const GPT_4_OUTPUT = 0.00006

export const GPT_35_TURBO_INPUT = 0.0000015
export const GPT_35_TURBO_OUTPUT = 0.000002

export const getTokenCost = (
  tokens: number,
  role: Role,
  model: ChatGPTModel
) => {
  if (model === 'GPT_3_5_TURBO') {
    if (role === 'USER') return tokens * GPT_35_TURBO_INPUT
    if (role === 'ASSISTANT') return tokens * GPT_35_TURBO_OUTPUT
    throw new Error('Invalid role')
  }

  if (model === 'GPT_4') {
    if (role === 'USER') return tokens * GPT_4_INPUT
    if (role === 'ASSISTANT') return tokens * GPT_4_OUTPUT
    throw new Error('Invalid role')
  }

  throw new Error('Invalid model')
}

export const countTokens = (message: string | undefined) => {
  return message ? encode(message).length : 0
}