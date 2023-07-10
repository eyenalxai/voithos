import { retrieveUserFromSession } from '@/lib/session'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const user = await retrieveUserFromSession()

  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const chats = await prisma.chat.findMany({
    where: {
      userId: user.id
    }
  })

  return NextResponse.json(chats)
}
