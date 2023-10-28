import { getAllUsers } from '@/lib/query/user'
import { getUsageByUserId } from '@/lib/query/usage'
import { cn } from '@/lib/utils'
import { UsageTable } from '@/components/usage-table'

type GlobalUsageProps = {
  isAdmin: boolean
}

export const GlobalUsage = async ({ isAdmin }: GlobalUsageProps) => {
  if (!isAdmin) return null

  const users = await getAllUsers()

  const userUsages = await Promise.all(
    users.map(async user => {
      return {
        username: user.username,
        email: user.email,
        usage: await getUsageByUserId(user.id)
      }
    })
  )

  return (
    <div>
      <p className={cn('font-semibold', 'text-lg', 'mb-4')}>Global Usage</p>
      <UsageTable userUsages={userUsages} />
    </div>
  )
}
