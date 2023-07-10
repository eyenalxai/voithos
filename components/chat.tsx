'use client'

import { useChat } from 'ai/react'
import { ChatGPTModel, Message } from '@prisma/client'
import { useQueryClient } from 'react-query'
import { CHATS_QUERY_KEY } from '@/lib/constants'
import { mapMessages } from '@/lib/mapping'
import { ChatPanel } from '@/components/chat-panel/chat-panel'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { ChatList } from '@/components/chat-panel/messages-display/chat-list'
import { ChatScrollAnchor } from '@/components/chat-panel/chat-scroll-anchor'

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
    <div className={cn('flex', 'flex-col', 'items-center')}>
      <Select
        onValueChange={value => setModel(value as ChatGPTModel)}
        defaultValue={model}
      >
        <SelectTrigger className={cn('w-44', 'mt-4')}>
          <SelectValue placeholder="GPT Model" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>GPT Models</SelectLabel>
            <SelectItem value="GPT_3_5_TURBO">GPT 3.5 Turbo</SelectItem>
            <SelectItem value="GPT_4">GPT 4</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className={cn('pb-[200px] pt-4 md:pt-10')}>
        {messages.length > 0 && (
          <>
            <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        )}
      </div>
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
