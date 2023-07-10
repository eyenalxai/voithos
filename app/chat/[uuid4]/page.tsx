import { retrieveUserFromSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import Chat from '@/components/chat'
import { ChatGPTModel } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export type ChatPageProps = {
  params: {
    uuid4: string
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const user = await retrieveUserFromSession()

  if (!user) {
    redirect('/sign-in')
  }

  const model: ChatGPTModel = 'GPT_3_5_TURBO'

  const chat = await prisma.chat.findFirst({
    where: {
      id: params.uuid4,
      userId: user.id
    },
    include: {
      messages: true
    }
  })

  const initialMessages = chat ? chat.messages : []

  return (
    <Chat
      uuid4={params.uuid4}
      model={model}
      initialMessages={initialMessages}
    />
  )
}
