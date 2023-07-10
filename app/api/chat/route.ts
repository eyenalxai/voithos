import { OpenAIStream, StreamingTextResponse } from 'ai'
import { openai } from '@/lib/openai'
import { NextResponse } from 'next/server'
import { retrieveUserFromSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { saveMessage } from '@/lib/save-message'
import { ChatCompletionRequestMessage } from 'openai-edge'

export async function POST(req: Request) {
  const user = await retrieveUserFromSession()

  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const {
    messages,
    chatId
  }: {
    messages: ChatCompletionRequestMessage[]
    chatId: string
  } = await req.json()

  const prompt = messages[messages.length - 1].content

  if (!prompt) {
    return new NextResponse('No prompt?', { status: 500 })
  }

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages
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
      userId: user.id
    }
  })

  const stream = OpenAIStream(response, {
    onStart: async () => await saveMessage(chat.id, prompt, 'USER'),
    onCompletion: async (completion: string) =>
      await saveMessage(chatId, completion, 'ASSISTANT')
  })

  return new StreamingTextResponse(stream)
}
