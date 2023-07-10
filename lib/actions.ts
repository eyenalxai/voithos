import { ChatGPTModel, Role } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { countTokens, getTokenCost } from '@/lib/pricing'

export const saveMessage = async (
  userId: number,
  chatId: string,
  content: string,
  role: Role,
  model: ChatGPTModel
) => {
  const tokensCount = countTokens(content)
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

export const getUsage = async (userId: number) => {
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
