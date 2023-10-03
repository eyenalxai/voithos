import { retrieveUserFromSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { SystemMessageForm } from '@/components/system-message-form'

export default async function ProfilePage() {
  const user = await retrieveUserFromSession()

  if (!user) {
    redirect('/sign-in')
  }

  return <SystemMessageForm />
}
