import { retrieveUserFromSession } from '@/lib/session'
import { redirect } from 'next/navigation'

export default async function Home() {
  const user = await retrieveUserFromSession()

  if (!user) {
    redirect('/sign-in')
  }

  return (
    <main>
      <h1>Hello</h1>
    </main>
  )
}
