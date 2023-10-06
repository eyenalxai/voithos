import { retrieveUserFromSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { SystemMessageForm } from '@/components/system-message-form'
import { prisma } from '@/lib/prisma'

export default async function ProfilePage() {
  const user = await retrieveUserFromSession()

  if (!user) {
    redirect('/sign-in')
  }

  const initialSystemMessage = await prisma.systemMessage.findUnique({
    where: {
      userId: user.id
    }
  })

  return <SystemMessageForm initialSystemMessage={initialSystemMessage} />
}
