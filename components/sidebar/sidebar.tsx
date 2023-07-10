'use client'

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger
} from '@/components/ui/sheet'
import { useQuery } from 'react-query'
import { CHATS_QUERY_KEY } from '@/lib/constants'
import { getChats } from '@/lib/fetch/chats'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { v4 } from 'uuid'

export const Sidebar = () => {
  const { data } = useQuery([CHATS_QUERY_KEY], getChats)

  return (
    <Sheet>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent side={'left'} className={cn('w-[20rem]')}>
        <SheetHeader>
          <Button variant={'ghost'} asChild>
            <Link href={`/chat/${v4()}`}>New Chat</Link>
          </Button>
        </SheetHeader>
        <div
          className={cn(
            'flex',
            'flex-col',
            'gap-2',
            'justify-center',
            'items-start'
          )}
        >
          {data?.map(chat => (
            <Button variant={'link'} asChild key={chat.id}>
              <Link href={`/chat/${chat.id}`}>{chat.title}</Link>
            </Button>
          ))}
        </div>
        <SheetFooter>
          <Button variant={'ghost'}>Delete All</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
