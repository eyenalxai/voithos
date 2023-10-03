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
import { User } from '@prisma/client'
import Link from 'next/link'
import { UsageDisplay } from '@/components/header/usage-display'

type UserMenuProps = {
  user: User
}

export function UserMenu({ user }: UserMenuProps) {
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
            <Link href={`/profile`}>
              <div className="text-xs font-medium">{user.username}</div>
              <div className="text-xs text-slate-500">{user.email}</div>
              <UsageDisplay />
            </Link>
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
