import { OpenAIStream, StreamingTextResponse } from 'ai'
import { openai } from '@/lib/openai'
import { NextResponse } from 'next/server'
import { retrieveUserFromSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { saveMessage } from '@/lib/actions'
import { ChatCompletionRequestMessage } from 'openai-edge'
import { ChatGPTModel } from '@prisma/client'
import { removeMessagesToFitLimit } from '@/lib/model-limits'
import { shorten } from '@/lib/utils'

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

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: removeMessagesToFitLimit(messages, model)
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
      }
    },
    create: {
      id: chatId,
      userId: user.id,
      title: shorten(prompt, 30)
    }
  })

  const stream = OpenAIStream(response, {
    onStart: async () => await saveMessage(chat.id, prompt, 'USER', model),
    onCompletion: async (completion: string) =>
      await saveMessage(chatId, completion, 'ASSISTANT', model)
  })

  return new StreamingTextResponse(stream)
}
