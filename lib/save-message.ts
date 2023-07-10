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
