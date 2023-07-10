import { retrieveUserFromSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import Chat from '@/components/chat'
import { v4 } from 'uuid'

export default async function Home() {
  const user = await retrieveUserFromSession()

  if (!user) {
    redirect('/sign-in')
  }

  const uuid4 = v4()

  return (
    <main>
      <Chat uuid4={uuid4} />
    </main>
  )
}
