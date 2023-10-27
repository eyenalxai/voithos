import { retrieveUserFromSession } from '@/lib/session'
import { NextResponse } from 'next/server'
import { deleteChatById } from '@/lib/query/chat'

export const DELETE = async (request: Request) => {
  const user = await retrieveUserFromSession()

  if (!user) return new NextResponse('Unauthorized', { status: 401 })

  const { searchParams } = new URL(request.url)
  const chatId = searchParams.get('chatId')

  if (!chatId) return new NextResponse('No chatId?', { status: 400 })

  await deleteChatById(chatId)

  return NextResponse.json({ success: true })
}
