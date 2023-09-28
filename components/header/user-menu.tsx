'use client'

import { signOut } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { IconProfiles } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { USAGE_QUERY_KEY } from '@/lib/constants'
import { getUsage } from '@/lib/fetch/usage'
import { User } from '@prisma/client'

type UserMenuProps = {
  user: User
}

export function UserMenu({ user }: UserMenuProps) {
  const { data: usage } = useQuery([USAGE_QUERY_KEY], getUsage, {
    refetchInterval: 30 * 1000,
    refetchOnWindowFocus: true,
    refetchOnMount: true
  })

  if (!usage) {
    return null
  }

  const { totalSpentThisMonth, totalSpentLastMonth, totalSpent } = usage

  return (
    <div className="flex items-center justify-between">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <IconProfiles className={cn('w-5', 'h-5')} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[180px]">
          <DropdownMenuItem className="flex-col items-start">
            <div className="text-xs font-medium">{user.username}</div>
            <div className="text-xs text-slate-500">{user.email}</div>
            {totalSpentThisMonth && totalSpentThisMonth > 0.01 && (
              <div className="mt-2 text-xs text-slate-500">
                ${totalSpentThisMonth.toFixed(2)} This Month
              </div>
            )}
            {totalSpentLastMonth && totalSpentLastMonth > 0.01 && (
              <div className="mt-2 text-xs text-slate-500">
                ${totalSpentLastMonth.toFixed(2)} Last Month
              </div>
            )}
            {totalSpent && totalSpent > 0.01 && (
              <div className="text-xs text-slate-500">
                ${totalSpent.toFixed(2)} Total
              </div>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() =>
              signOut({
                callbackUrl: '/'
              })
            }
            className="text-xs"
          >
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
