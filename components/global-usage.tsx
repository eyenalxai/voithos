import { getAllUsers } from '@/lib/query/user'
import { getUsageByUserId, Usage } from '@/lib/query/usage'
import { cn } from '@/lib/utils'

type UserUsage = {
  userUsage: {
    username: string
    usage: Usage
  }
}

const RenderUsageItem = ({
  description,
  value
}: {
  description: string
  value: number | null
}) => {
  if (!value) return null

  return (
    <div>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        {description}
      </p>
      <p className="mt-1 text-xs text-slate-900 dark:text-slate-100">
        {value.toFixed(2)}
      </p>
    </div>
  )
}

const UserUsage = ({ userUsage }: UserUsage) => {
  const { totalSpent, totalSpentThisMonth, totalSpentLastMonth } =
    userUsage.usage

  if (
    (!totalSpent || totalSpent < 0.1) &&
    (!totalSpentThisMonth || totalSpentThisMonth < 0.1) &&
    (!totalSpentLastMonth || totalSpentLastMonth < 0.1)
  )
    return null

  return (
    <div className="mx-auto max-w-md rounded-xl border px-2 py-4 sm:px-4 lg:px-6">
      <ul className="space-y-2">
        <li className="rounded-lg p-2 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">{userUsage.username}</h2>
          </div>
          <div className="mt-1 grid grid-cols-3 gap-2">
            <RenderUsageItem
              description="This Month"
              value={userUsage.usage.totalSpentThisMonth}
            />
            <RenderUsageItem
              description="Last Month"
              value={userUsage.usage.totalSpentLastMonth}
            />
            <RenderUsageItem
              description="Total"
              value={userUsage.usage.totalSpent}
            />
          </div>
        </li>
      </ul>
    </div>
  )
}

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
        usage: await getUsageByUserId(user.id)
      }
    })
  )

  return (
    <div>
      <p className={cn('font-semibold', 'text-lg', 'mb-4')}>Global Usage</p>
      {userUsages.map(userUsage => {
        return <UserUsage key={userUsage.username} userUsage={userUsage} />
      })}
    </div>
  )
}
