import { retrieveUserFromSession } from '@/lib/session'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const DELETE = async (request: Request) => {
  const user = await retrieveUserFromSession()

  if (!user) return new NextResponse('Unauthorized', { status: 401 })

  const { searchParams } = new URL(request.url)
  const chatId = searchParams.get('chatId')

  if (!chatId) return new NextResponse('No chatId?', { status: 400 })

  await prisma.message.deleteMany({
    where: {
      chat: {
        id: chatId
      }
    }
  })

  await prisma.chat.delete({
    where: {
      id: chatId
    }
  })

  return NextResponse.json({ success: true })
}
