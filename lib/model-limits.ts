import { ChatGPTModel } from '@prisma/client'
import { ChatCompletionRequestMessage } from 'openai-edge'
import { countTokens } from '@/lib/pricing'

const LIMIT_MODIFIER = 0.75

export const GPT_4_TOKENS_LIMIT = 8000
export const GPT_3_5_TURBO_TOKENS_LIMIT = 4000

export const MODEL_TOKENS_LIMITS: Record<ChatGPTModel, number> = {
  GPT_3_5_TURBO: GPT_3_5_TURBO_TOKENS_LIMIT,
  GPT_4: GPT_4_TOKENS_LIMIT
}

export const removeMessagesToFitLimit = (
  messages: ChatCompletionRequestMessage[],
  model: ChatGPTModel
): ChatCompletionRequestMessage[] => {
  const limit = MODEL_TOKENS_LIMITS[model] * LIMIT_MODIFIER

  const getTotalTokens = (msgs: ChatCompletionRequestMessage[]): number => {
    return msgs.reduce((total, message) => {
      const tokens = countTokens(message.content)
      return total + tokens
    }, 0)
  }

  const removeFirstMessage = (
    msgs: ChatCompletionRequestMessage[]
  ): ChatCompletionRequestMessage[] => {
    return msgs.slice(1)
  }

  const shouldRemoveMoreMessages = (
    msgs: ChatCompletionRequestMessage[]
  ): boolean => {
    return getTotalTokens(msgs) > limit && msgs.length > 0
  }

  const removeMessagesRecursively = (
    msgs: ChatCompletionRequestMessage[]
  ): ChatCompletionRequestMessage[] => {
    if (shouldRemoveMoreMessages(msgs)) {
      const updatedMessages = removeFirstMessage(msgs)
      return removeMessagesRecursively(updatedMessages)
    }
    return msgs
  }

  return removeMessagesRecursively(messages)
}
