'use client'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { v4 } from 'uuid'
import { Separator } from '@/components/ui/separator'
import { IconSidebar, IconTrash } from '@/components/ui/icons'
import { useChats } from '@/lib/hook/chats'
import { ScrollArea } from '@/components/ui/scroll-area'

export const Sidebar = () => {
  const { chats, deleteChatMutation, deleteAllChatsMutation } = useChats()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="-ml-2 h-9 w-9 p-0">
          <IconSidebar className="h-6 w-6" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'} className={cn('w-[20rem]')}>
        <SheetHeader>
          <div
            className={cn('w-full', 'flex', 'justify-center', 'items-center')}
          >
            <SheetClose asChild>
              <Button variant={'outline'} asChild className={cn('w-32')}>
                <Link href={`/chat/${v4()}`}>New Chat</Link>
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>
        {chats && chats?.length > 0 && (
          <div className={cn('flex', 'flex-col', 'justify-between', 'h-full')}>
            <div>
              <Separator className={cn('my-2')} />
              <ScrollArea className={cn('h-[calc(100vh-10rem)]')}>
                <div
                  className={cn(
                    'flex',
                    'flex-col',
                    'gap-2',
                    'justify-center',
                    'items-start'
                  )}
                >
                  {chats?.map(chat => (
                    <div
                      key={chat.id}
                      className={cn(
                        'flex',
                        'flex-row',
                        'justify-between',
                        'items-center',
                        'w-full',
                        'gap-2'
                      )}
                    >
                      <Button
                        variant={'ghost'}
                        asChild
                        className={cn('w-full', 'flex', 'justify-start')}
                      >
                        <Link href={`/chat/${chat.id}`}>{chat.title}</Link>
                      </Button>
                      <Button
                        variant={'ghost'}
                        onClick={() => deleteChatMutation(chat.id)}
                      >
                        <IconTrash />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
            <SheetFooter className={cn('mb-10')}>
              <Button
                variant={'outline'}
                onClick={() => deleteAllChatsMutation()}
              >
                Clear History
              </Button>
            </SheetFooter>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
