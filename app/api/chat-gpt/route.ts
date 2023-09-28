import { OpenAIStream, StreamingTextResponse } from 'ai'
import { openai } from '@/lib/openai'
import { NextResponse } from 'next/server'
import { retrieveUserFromSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { saveMessage } from '@/lib/actions'
import { ChatCompletionRequestMessage } from 'openai-edge'
import { ChatGPTModel } from '@prisma/client'
import { removeMessagesToFitLimit } from '@/lib/model-limits'
import { enumToModelName, shorten } from '@/lib/utils'
import { SYSTEM_MESSAGE } from '@/lib/constants'

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

  const chatContext = [
    SYSTEM_MESSAGE,
    ...removeMessagesToFitLimit(messages, model)
  ]

  const response = await openai.createChatCompletion({
    model: enumToModelName(model),
    stream: true,
    messages: chatContext
  })

  const chat = await prisma.chat.upsert({
    where: {
      id: chatId
    },
    update: {
      user: {
        connect: {
          id: user.id
        }
      },
      lastUsedModel: model
    },
    create: {
      id: chatId,
      lastUsedModel: model,
      userId: user.id,
      title: shorten(prompt, 25)
    }
  })

  const stream = OpenAIStream(response, {
    onStart: async () =>
      await saveMessage(user.id, chat.id, prompt, 'USER', model, chatContext),
    onCompletion: async (completion: string) =>
      await saveMessage(user.id, chatId, completion, 'ASSISTANT', model)
  })

  return new StreamingTextResponse(stream)
}
