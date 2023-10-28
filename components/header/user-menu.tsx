'use client'

import { signOut } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { IconProfiles } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import { UsageDisplay } from '@/components/header/usage-display'
import { User } from '@/lib/schema'
import Link from 'next/link'
import { Usage } from '@/lib/query/usage'

type UserMenuProps = {
  user: User
  userUsage: Usage
}

export function UserMenu({ user, userUsage }: UserMenuProps) {
  return (
    <div className="flex items-center justify-between">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <IconProfiles className={cn('w-5', 'h-5')} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className={cn(
            'flex',
            'flex-col',
            'justify-center',
            'gap-2',
            'w-[200px]',
            'p-2'
          )}
        >
          <div
            className={cn('flex', 'flex-col', 'justify-center', 'm-2', 'w-fit')}
          >
            <div className="text-sm font-medium">{user.username}</div>
            <div className="text-sm text-slate-500">{user.email}</div>
            <UsageDisplay initialUsage={userUsage} />
          </div>

          <Button asChild variant={'outline'} className={'mx-4'}>
            <Link href={`/profile`}>Profile</Link>
          </Button>

          <Button
            className={'mx-4'}
            variant={'ghost'}
            onClick={() =>
              signOut({
                callbackUrl: '/'
              })
            }
          >
            Log Out
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
