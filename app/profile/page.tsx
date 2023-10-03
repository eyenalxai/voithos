import { retrieveUserFromSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { SystemMessageForm } from '@/components/system-message-form'
import { fetcher } from '@/lib/fetch/fetcher'

const schema = z.object({
  content: z.string()
})

export default async function ProfilePage() {
  const user = await retrieveUserFromSession()

  if (!user) {
    redirect('/sign-in')
  }

  return <SystemMessageForm />
}
