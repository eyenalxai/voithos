import { OpenAIStream, StreamingTextResponse } from 'ai'
import { openai } from '@/lib/openai'
import { NextResponse } from 'next/server'
import { retrieveUserFromSession } from '@/lib/session'
import { ChatCompletionRequestMessage } from 'openai-edge'
import { removeMessagesToFitLimit } from '@/lib/model-limits'
import { enumToModelName, shorten } from '@/lib/utils'
import { SYSTEM_MESSAGE_CONTENT } from '@/lib/constants'
import { ChatGPTModel } from '@/lib/schema'
import { saveMessage } from '@/lib/query/message'
import { getSystemMessageByUserId } from '@/lib/query/system-message'
import { upsertChat } from '@/lib/query/chat'

export const POST = async (req: Request) => {
  const user = await retrieveUserFromSession()

  if (!user) return new NextResponse('Unauthorized', { status: 401 })

  const {
    messages,
    chatId,
    model
  }: {
    messages: ChatCompletionRequestMessage[]
    chatId: string
    model: ChatGPTModel
  } = await req.json()

  const prompt = messages[messages.length - 1].content

  if (!prompt) return new NextResponse('No prompt?', { status: 400 })

  const userSystemMessage = await getSystemMessageByUserId(user.id)

  const systemMessage: ChatCompletionRequestMessage = {
    content: userSystemMessage?.content ?? SYSTEM_MESSAGE_CONTENT,
    role: 'system'
  }

  const chatContext = [
    systemMessage,
    ...removeMessagesToFitLimit(messages, model)
  ]

  const response = await openai.createChatCompletion({
    model: enumToModelName(model),
    stream: true,
    messages: chatContext
  })

  const chat = await upsertChat(chatId, shorten(prompt, 25), user.id, model)

  const stream = OpenAIStream(response, {
    onStart: async () =>
      await saveMessage(
        user.id,
        chat[0].insertedChatId,
        prompt,
        'user',
        model,
        chatContext
      ),
    onCompletion: async (completion: string) =>
      await saveMessage(user.id, chatId, completion, 'assistant', model)
  })

  return new StreamingTextResponse(stream)
}
