import { ChatGPTModel, Role } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { countTokens, getTokenCost } from '@/lib/pricing'
import { ChatCompletionRequestMessage } from 'openai-edge'

export const saveMessage = async (
  userId: number,
  chatId: string,
  content: string,
  role: Role,
  model: ChatGPTModel,
  chatContext?: ChatCompletionRequestMessage[]
) => {
  const tokensCount =
    chatContext === undefined
      ? countTokens(content)
      : chatContext.reduce((total, message) => {
          const tokens = countTokens(message.content)
          return total + tokens
        }, 0)

  const priceUSD = getTokenCost(tokensCount, role, model)
  await prisma.message.create({
    data: {
      content: content,
      role: role,
      chatId: chatId
    }
  })

  await prisma.usage.create({
    data: {
      tokensCount: tokensCount,
      chatGPTModel: model,
      role: role,
      priceUSD: priceUSD,
      userId: userId
    }
  })
}

export type Usage = {
  totalSpent: number | null
  totalSpentThisMonth: number | null
  totalSpentLastMonth: number | null
}

export const getUsage = async (userId: number): Promise<Usage> => {
  const totalSpent = await prisma.usage.aggregate({
    where: {
      userId: userId
    },
    _sum: {
      priceUSD: true
    }
  })

  const date = new Date()
  const firstDayThisMonth = new Date(date.getFullYear(), date.getMonth(), 1)
  const lastDayThisMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)

  const totalSpentThisMonth = await prisma.usage.aggregate({
    where: {
      userId: userId,
      createdAt: {
        gte: firstDayThisMonth,
        lte: lastDayThisMonth
      }
    },
    _sum: {
      priceUSD: true
    }
  })

  const firstDayLastMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1)
  const lastDayLastMonth = new Date(date.getFullYear(), date.getMonth(), 0)

  const totalSpentLastMonth = await prisma.usage.aggregate({
    where: {
      userId: userId,
      createdAt: {
        gte: firstDayLastMonth,
        lte: lastDayLastMonth
      }
    },
    _sum: {
      priceUSD: true
    }
  })

  return {
    totalSpent: totalSpent._sum.priceUSD,
    totalSpentThisMonth: totalSpentThisMonth._sum.priceUSD,
    totalSpentLastMonth: totalSpentLastMonth._sum.priceUSD
  }
}
