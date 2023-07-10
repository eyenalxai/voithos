import { retrieveUserFromSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import Chat from '@/components/chat'
import { v4 } from 'uuid'
import { ChatGPTModel } from '@prisma/client'

export default async function Home() {
  const user = await retrieveUserFromSession()

  if (!user) {
    redirect('/sign-in')
  }

  const uuid4 = v4()
  const model: ChatGPTModel = 'GPT_3_5_TURBO'

  return (
    <main>
      <Chat uuid4={uuid4} model={model} />
    </main>
  )
}
