import { NextResponse } from 'next/server'
import { retrieveUserFromSession } from '@/lib/session'

import { SYSTEM_MESSAGE_CONTENT } from '@/lib/constants'
import {
  getSystemMessageByUserId,
  upsertUserSystemMessage
} from '@/lib/query/system-message'

export const POST = async (req: Request) => {
  const user = await retrieveUserFromSession()

  if (!user) return new NextResponse('Unauthorized', { status: 401 })

  const { content }: { content: string } = await req.json()

  await upsertUserSystemMessage(content, user.id)

  return NextResponse.json({ success: true })
}

export const GET = async () => {
  const user = await retrieveUserFromSession()

  if (!user) return new NextResponse('Unauthorized', { status: 401 })

  const systemMessage = await getSystemMessageByUserId(user.id)

  return NextResponse.json({
    content: systemMessage?.content ?? SYSTEM_MESSAGE_CONTENT
  })
}
