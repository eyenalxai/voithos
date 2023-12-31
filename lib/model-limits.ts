import { ChatCompletionRequestMessage } from 'openai-edge'
import { countTokens } from '@/lib/pricing'
import { ChatGPTModel } from '@/lib/schema'

const LIMIT_MODIFIER = 0.65

export const GPT_4_TOKENS_LIMIT = 128_000
export const GPT_3_5_TURBO_TOKENS_LIMIT = 16_000

export const MODEL_TOKENS_LIMITS: Record<ChatGPTModel, number> = {
  gpt_3_5_turbo: GPT_3_5_TURBO_TOKENS_LIMIT,
  gpt_4: GPT_4_TOKENS_LIMIT
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
