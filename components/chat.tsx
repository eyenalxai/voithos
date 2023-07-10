'use client'

import { useChat } from 'ai/react'

type ChatProps = {
  uuid4: string
}

export default function Chat({ uuid4 }: ChatProps) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    body: {
      chatId: uuid4
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
