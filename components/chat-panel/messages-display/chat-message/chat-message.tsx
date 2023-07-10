import { Message } from 'ai'

import { cn } from '@/lib/utils'
import { ChatMessageAvatar } from '@/components/chat-panel/messages-display/chat-message/chat-message-avatar'
import { ChatMessageContent } from '@/components/chat-panel/messages-display/chat-message/chat-message-content'
import { ChatMessageActions } from '@/components/chat-panel/messages-display/chat-message/chat-message-actions'

export type ChatMessageProps = {
  message: Message
}

export function ChatMessage({ message, ...props }: ChatMessageProps) {
  return (
    <div
      className={cn('group relative mb-4 flex items-start md:-ml-12')}
      {...props}
    >
      <ChatMessageAvatar message={message} />
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        <ChatMessageContent message={message} />
        <ChatMessageActions message={message} />
      </div>
    </div>
  )
}
