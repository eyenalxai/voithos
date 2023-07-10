import { cn } from '@/lib/utils'
import { retrieveUserFromSession } from '@/lib/session'
import { UserMenu } from '@/components/header/user-menu'
import { prisma } from '@/lib/prisma'
import { getUsage } from '@/lib/actions'

export const Header = async () => {
  const user = await retrieveUserFromSession()

  if (!user) {
    return null
  }

  const chats = await prisma.chat.findMany({
    where: {
      userId: user.id
    },
    select: {
      id: true
    }
  })

  const chatIds = chats.map(chat => chat.id)

  const { totalSpent, totalSpentThisMonth, totalSpentLastMonth } =
    await getUsage(chatIds)

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
      <UserMenu
        user={user}
        totalSpent={totalSpent}
        totalSpentThisMonth={totalSpentThisMonth}
        totalSpentLastMonth={totalSpentLastMonth}
      />
    </header>
  )
}
