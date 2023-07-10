import { retrieveUserFromSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import Chat from '@/components/chat'

export default async function Home() {
  const user = await retrieveUserFromSession()

  if (!user) {
    redirect('/sign-in')
  }

  return (
    <main>
      <Chat />
    </main>
  )
}
