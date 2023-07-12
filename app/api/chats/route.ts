import { retrieveUserFromSession } from '@/lib/session'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const GET = async () => {
  const user = await retrieveUserFromSession()

  if (!user) return new NextResponse('Unauthorized', { status: 401 })

  const chats = await prisma.chat.findMany({
    where: {
      userId: user.id
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      messages: {
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  })

  return NextResponse.json(chats)
}

export const DELETE = async () => {
  const user = await retrieveUserFromSession()

  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  await prisma.message.deleteMany({
    where: {
      chat: {
        userId: user.id
      }
    }
  })

  await prisma.chat.deleteMany({
    where: {
      userId: user.id
    }
  })

  return NextResponse.json({ success: true })
}
