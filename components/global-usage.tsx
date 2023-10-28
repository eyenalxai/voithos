import { getAllUsers } from '@/lib/query/user'
import { getUsageByUserId, Usage } from '@/lib/query/usage'
import { cn } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { compareUserUsage, filterUserUsage } from '@/lib/pricing'

type UserUsage = {
  userUsage: {
    username: string
    email: string
    usage: Usage
  }
}

const RenderUsageItem = ({ userUsage }: UserUsage) => {
  const totalSpentThisMonth = (
    userUsage.usage.totalSpentThisMonth || 0
  ).toFixed(2)
  const totalSpentLastMonth = (
    userUsage.usage.totalSpentLastMonth || 0
  ).toFixed(2)
  const totalSpent = (userUsage.usage.totalSpent || 0).toFixed(2)

  return (
    <TableRow key={userUsage.username}>
      <TableCell className="font-medium">{userUsage.username}</TableCell>
      <TableCell>{userUsage.email}</TableCell>
      <TableCell>${totalSpentThisMonth}</TableCell>
      <TableCell>${totalSpentLastMonth}</TableCell>
      <TableCell className="text-right">${totalSpent}</TableCell>
    </TableRow>
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
        email: user.email,
        usage: await getUsageByUserId(user.id)
      }
    })
  )

  return (
    <div>
      <p className={cn('font-semibold', 'text-lg', 'mb-4')}>Global Usage</p>
      <Table>
        <TableCaption>A list of all users and their usage</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>This Month</TableHead>
            <TableHead>Last Month</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userUsages
            .filter(filterUserUsage)
            .sort(compareUserUsage)
            .map(userUsage => {
              return (
                <RenderUsageItem
                  userUsage={userUsage}
                  key={userUsage.username}
                />
              )
            })}
        </TableBody>
      </Table>
    </div>
  )
}
