import { cn } from '@/lib/utils'
import { retrieveUserFromSession } from '@/lib/session'
import { UserMenu } from '@/components/header/user-menu'
import { Sidebar } from '@/components/sidebar/sidebar'
import { getUsageByUserId } from '@/lib/query/usage'

export const Header = async () => {
  const user = await retrieveUserFromSession()

  if (!user) {
    return null
  }

  const userUsage = await getUsageByUserId(user.id)

  return (
    <header
      className={cn(
        'pl-6',
        'py-2',
        'sticky',
        'top-0',
        'z-50',
        'flex',
        'flex-row',
        'w-full',
        'shrink-0',
        'items-center',
        'justify-start',
        'backdrop-blur',

        'border-b',
        'gap-4'
      )}
    >
      <Sidebar />
      <UserMenu user={user} userUsage={userUsage} />
    </header>
  )
}
