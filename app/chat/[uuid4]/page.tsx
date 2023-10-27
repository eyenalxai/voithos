import { retrieveUserFromSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import Chat from '@/components/chat'
import { getChatById } from '@/lib/query/chat'

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

  const chat = await getChatById(params.uuid4)

  return (
    <Chat
      uuid4={params.uuid4}
      initialMessages={chat ? chat.messages : []}
      initialModel={chat?.lastUsedModel || 'gpt_3_5_turbo'}
    />
  )
}
