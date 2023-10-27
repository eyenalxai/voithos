import { retrieveUserFromSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { SystemMessageForm } from '@/components/system-message-form'
import { getSystemMessageByUserId } from '@/lib/query/system-message'

export default async function ProfilePage() {
  const user = await retrieveUserFromSession()

  if (!user) {
    redirect('/sign-in')
  }

  const initialSystemMessage = await getSystemMessageByUserId(user.id)

  return <SystemMessageForm initialSystemMessage={initialSystemMessage} />
}
