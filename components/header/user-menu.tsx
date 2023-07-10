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
import { User } from '@prisma/client'

type UserMenuProps = {
  user: User
  totalSpent: number | null
  totalSpentThisMonth: number | null
  totalSpentLastMonth: number | null
}

export function UserMenu({
  user,
  totalSpent,
  totalSpentThisMonth,
  totalSpentLastMonth
}: UserMenuProps) {
  return (
    <div className="flex items-center justify-between">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">{user.username}</Button>
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
