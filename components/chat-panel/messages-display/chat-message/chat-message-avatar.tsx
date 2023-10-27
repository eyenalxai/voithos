import { Message } from 'ai'
import { cn } from '@/lib/utils'
import { IconOpenAI, IconUser } from '@/components/ui/icons'

type ChatMessageAvatarProps = {
  message: Message
}

export function ChatMessageAvatar({ message }: ChatMessageAvatarProps) {
  console.log('message', message)
  return (
    <div
      className={cn(
        'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow',
        message.role === 'user'
          ? 'bg-background'
          : 'bg-primary text-primary-foreground'
      )}
    >
      {message.role === 'user' ? <IconUser /> : <IconOpenAI />}
    </div>
  )
}
