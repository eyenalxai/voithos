'use client'

import { useChat } from 'ai/react'
import { CHATS_QUERY_KEY, USAGE_QUERY_KEY } from '@/lib/constants'
import { mapMessages } from '@/lib/mapping'
import { ChatPanel } from '@/components/chat-panel/chat-panel'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { ChatList } from '@/components/chat-panel/messages-display/chat-list'
import { ChatScrollAnchor } from '@/components/chat-panel/chat-scroll-anchor'
import { useQueryClient } from '@tanstack/react-query'
import { ChatGPTModel, Message } from '@/lib/schema'
import { revalidateChat } from '@/lib/actions'
import { SelectModel } from '@/components/chat-panel/select-model'

type ChatProps = {
  uuid4: string
  initialMessages: Message[]
  initialModel: ChatGPTModel
}

export default function Chat({
  uuid4,
  initialMessages,
  initialModel
}: ChatProps) {
  const queryClient = useQueryClient()

  const [model, setModel] = useState<ChatGPTModel>(initialModel)

  const { messages, append, stop, isLoading, input, setInput } = useChat({
    api: '/api/chat-gpt',
    initialMessages: mapMessages(initialMessages),
    body: {
      chatId: uuid4,
      model: model
    },
    onFinish: () => {
      queryClient
        .invalidateQueries({ queryKey: [CHATS_QUERY_KEY] })
        .then(() => queryClient.refetchQueries({ queryKey: [CHATS_QUERY_KEY] }))
        .then(() =>
          queryClient.invalidateQueries({ queryKey: [USAGE_QUERY_KEY] })
        )
        .then(() => queryClient.refetchQueries({ queryKey: [USAGE_QUERY_KEY] }))
        .then(() => revalidateChat())
    }
  })

  return (
    <div className={cn('flex', 'flex-col', 'items-center')}>
      <SelectModel model={model} setModel={setModel} />
      <ChatList messages={messages} />
      <ChatScrollAnchor trackVisibility={isLoading} />
      <ChatPanel
        isLoading={isLoading}
        stop={stop}
        append={append}
        input={input}
        setInput={setInput}
      />
    </div>
  )
}
