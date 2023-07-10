import { retrieveUserFromSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { v4 } from 'uuid'

export default async function Home() {
  const user = await retrieveUserFromSession()

  if (!user) {
    redirect('/sign-in')
  }

  const uuid4 = v4()
  redirect(`/chat/${uuid4}`)
}
