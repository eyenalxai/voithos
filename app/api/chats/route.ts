import { retrieveUserFromSession } from '@/lib/session'
import { NextResponse } from 'next/server'
import { deleteAllChatsByUserId, getChatsByUserId } from '@/lib/query/chat'

export const GET = async () => {
  const user = await retrieveUserFromSession()

  if (!user) return new NextResponse('Unauthorized', { status: 401 })

  const chats = await getChatsByUserId(user.id)

  return NextResponse.json(chats)
}

export const DELETE = async () => {
  const user = await retrieveUserFromSession()

  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  await deleteAllChatsByUserId(user.id)

  return NextResponse.json({ success: true })
}
