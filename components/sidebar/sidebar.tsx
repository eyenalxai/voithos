'use client'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useQuery } from 'react-query'
import { CHATS_QUERY_KEY } from '@/lib/constants'
import { getChats } from '@/lib/fetch/chats'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const Sidebar = () => {
  const { data } = useQuery([CHATS_QUERY_KEY], getChats)

  return (
    <Sheet>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent side={'left'}>
        {data?.reverse().map(chat => (
          <Button variant={'link'} asChild key={chat.id}>
            <Link href={`/chat/${chat.id}`}>{chat.title}</Link>
          </Button>
        ))}
      </SheetContent>
    </Sheet>
  )
}
