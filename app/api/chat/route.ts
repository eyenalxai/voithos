import { OpenAIStream, StreamingTextResponse } from 'ai'
import { openai } from '@/lib/openai'
import { NextResponse } from 'next/server'
import { retrieveUserFromSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const user = await retrieveUserFromSession()

  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const { messages, prompt, chatId } = await req.json()

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
    onStart: async () => {
      await prisma.message.create({
        data: {
          content: prompt,
          role: 'USER',
          chatId: chat.id
        }
      })
    },
    onCompletion: async (completion: string) => {
      await prisma.message.create({
        data: {
          content: completion,
          role: 'ASSISTANT',
          chatId: chat.id
        }
      })
    }
  })

  return new StreamingTextResponse(stream)
}
