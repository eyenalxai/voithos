'use client'

import { useChat } from 'ai/react'
import { ChatGPTModel, Message } from '@prisma/client'
import { useQueryClient } from 'react-query'
import { CHATS_QUERY_KEY } from '@/lib/constants'
import { mapMessages } from '@/lib/mapping'
import { ChatPanel } from '@/components/chat-panel/chat-panel'

type ChatProps = {
  uuid4: string
  model: ChatGPTModel
  initialMessages: Message[]
}

export default function Chat({ uuid4, model, initialMessages }: ChatProps) {
  const queryClient = useQueryClient()

  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      api: '/api/chat-gpt',
      initialMessages: mapMessages(initialMessages),
      body: {
        chatId: uuid4,
        model: model
      },
      onFinish: () =>
        queryClient
          .invalidateQueries([CHATS_QUERY_KEY])
          .then(() => queryClient.refetchQueries([CHATS_QUERY_KEY]))
    })

  return (
    <div>
      {messages.map(m => (
        <div key={m.id}>
          {m.role}: {m.content}
        </div>
      ))}
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
