import { cn } from '@/lib/utils'
import { retrieveUserFromSession } from '@/lib/session'
import { UserMenu } from '@/components/header/user-menu'

export const Header = async () => {
  const user = await retrieveUserFromSession()

  if (!user) {
    return null
  }

  return (
    <header
      className={cn(
        'p-2',
        'sticky',
        'top-0',
        'z-50',
        'flex',
        'flex-row',
        'w-full',
        'shrink-0',
        'items-center',
        'justify-between',
        ['bg-white', 'dark:bg-slate-950'],
        'border-b',
        'gap-4'
      )}
    >
      <UserMenu user={user} />
    </header>
  )
}
