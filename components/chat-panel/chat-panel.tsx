'use client'

import { type UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { IconStop } from '@/components/ui/icons'
import { ButtonScrollToBottom } from '@/components/chat-panel/button-scroll-to-bottom'
import { PromptForm } from '@/components/chat-panel/prompt-form'
import { cn } from '@/lib/utils'

export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    'append' | 'isLoading' | 'stop' | 'input' | 'setInput'
  > {
  id?: string
}

export function ChatPanel({
  isLoading,
  stop,
  append,
  input,
  setInput
}: ChatPanelProps) {
  return (
    <div className="fixed inset-x-0 bottom-0">
      <ButtonScrollToBottom />
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="flex h-10 items-center justify-center">
          {isLoading && (
            <Button
              variant="outline"
              onClick={() => stop()}
              className={cn('bg-background', 'mb-6')}
            >
              <IconStop className="mr-2" />
              Stop generating
            </Button>
          )}
        </div>
        <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <PromptForm
            onSubmit={async value => {
              await append({
                content: value,
                role: 'user'
              })
            }}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}
