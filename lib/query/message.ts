import { ChatGPTModel, messages, Role, usage } from '@/lib/schema'
import { ChatCompletionRequestMessage } from 'openai-edge'
import { countTokens, getTokenCost } from '@/lib/pricing'
import { db } from '@/lib/database'
import { eq } from 'drizzle-orm'

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

  await db.insert(messages).values({
    content: content,
    role: role,
    chatId: chatId
  })

  await db.insert(usage).values({
    chatGPTModel: model,
    role: role,
    tokensCount: tokensCount,
    priceUSD: priceUSD,
    userId: userId
  })
}

export const deleteMessagesByChatId = async (chatId: string) => {
  return db.delete(messages).where(eq(messages.chatId, chatId))
}
