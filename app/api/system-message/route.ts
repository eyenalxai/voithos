import { NextResponse } from 'next/server'
import { retrieveUserFromSession } from '@/lib/session'

import { prisma } from '@/lib/prisma'
import { SYSTEM_MESSAGE_CONTENT } from '@/lib/constants'

export const POST = async (req: Request) => {
  const user = await retrieveUserFromSession()

  if (!user) return new NextResponse('Unauthorized', { status: 401 })

  const { content }: { content: string } = await req.json()

  await prisma.systemMessage.upsert({
    where: {
      userId: user.id
    },
    update: {
      content: content
    },
    create: {
      userId: user.id,
      content: content
    }
  })

  return NextResponse.json({ success: true })
}

export const GET = async () => {
  const user = await retrieveUserFromSession()

  if (!user) return new NextResponse('Unauthorized', { status: 401 })

  const systemMessage = await prisma.systemMessage.findUnique({
    where: {
      userId: user.id
    }
  })

  return NextResponse.json({
    content: systemMessage?.content ?? SYSTEM_MESSAGE_CONTENT
  })
}
