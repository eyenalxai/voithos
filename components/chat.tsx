'use client'

import { useChat } from 'ai/react'
import { ChatGPTModel } from '@prisma/client'

type ChatProps = {
  uuid4: string
  model: ChatGPTModel
}

export default function Chat({ uuid4, model }: ChatProps) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    body: {
      chatId: uuid4,
      model: model
    }
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
