'use client'

import { useChat } from 'ai/react'
import { ChatGPTModel, Message } from '@prisma/client'
import { useQueryClient } from 'react-query'
import { CHATS_QUERY_KEY } from '@/lib/constants'
import { mapMessages } from '@/lib/mapping'

type ChatProps = {
  uuid4: string
  model: ChatGPTModel
  initialMessages: Message[]
}

export default function Chat({ uuid4, model, initialMessages }: ChatProps) {
  const queryClient = useQueryClient()

  const { messages, input, handleInputChange, handleSubmit } = useChat({
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

      <form onSubmit={handleSubmit}>
        <label>
          Say something...
          <input value={input} onChange={handleInputChange} />
        </label>
      </form>
    </div>
  )
}
