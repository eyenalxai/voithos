import { ChatGPTModel, Role } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { countTokens, getTokenCost } from '@/lib/pricing'

export const saveMessage = async (
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
      chatId: chatId,
      tokensCount: tokensCount,
      chatGPTModel: model,
      priceUSD: priceUSD
    }
  })
}

export const getUsage = async (chatIds: string[]) => {
  const totalSpent = await prisma.message.aggregate({
    where: {
      chatId: {
        in: chatIds
      }
    },
    _sum: {
      priceUSD: true
    }
  })

  const date = new Date()
  const firstDayThisMonth = new Date(date.getFullYear(), date.getMonth(), 1)
  const lastDayThisMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)

  const totalSpentThisMonth = await prisma.message.aggregate({
    where: {
      chatId: {
        in: chatIds
      },
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

  const totalSpentLastMonth = await prisma.message.aggregate({
    where: {
      chatId: {
        in: chatIds
      },
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
