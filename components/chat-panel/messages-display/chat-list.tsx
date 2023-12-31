import { type Message } from 'ai'

import { Separator } from '@/components/ui/separator'
import { ChatMessage } from '@/components/chat-panel/messages-display/chat-message/chat-message'
import { cn } from '@/lib/utils'

export interface ChatList {
  messages: Message[]
}

export function ChatList({ messages }: ChatList) {
  if (!messages.length || messages.length === 0) {
    return null
  }

  return (
    <div className={cn('w-full pb-[200px] pt-4 md:pt-10')}>
      {messages.map((message, index) => (
        <div key={index}>
          <ChatMessage message={message} />
          {index < messages.length - 1 && (
            <Separator className="my-2 md:my-4" />
          )}
        </div>
      ))}
    </div>
  )
}
