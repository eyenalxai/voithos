import { retrieveUserFromSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { SystemMessageForm } from '@/components/profile/system-message-form'
import { getSystemMessageByUserId } from '@/lib/query/system-message'
import { AllowedUsersDisplay } from '@/components/profile/allowed-users/allowed-users-display'
import { cn } from '@/lib/utils'
import { getAllowedUsers } from '@/lib/query/allowed-user'
import { isUserAdmin } from '@/lib/permissions'
import { GlobalUsage } from '@/components/profile/global-usage'

export default async function SettingsPage() {
  const user = await retrieveUserFromSession()

  if (!user) {
    redirect('/sign-in')
  }

  const isAdmin = isUserAdmin(user)

  const initialSystemMessage = await getSystemMessageByUserId(user.id)

  const allowedUsers = await getAllowedUsers()

  return (
    <div className={cn('flex', 'flex-col', 'gap-12', 'my-8', 'items-start')}>
      <SystemMessageForm initialSystemMessage={initialSystemMessage} />
      <AllowedUsersDisplay isAdmin={isAdmin} allowedUsers={allowedUsers} />
      <GlobalUsage isAdmin={isAdmin} />
    </div>
  )
}
