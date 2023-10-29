import { Message } from 'ai'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { MemoizedReactMarkdown } from '@/components/chat-panel/messages-display/markdown'
import { CodeBlock } from '@/components/chat-panel/messages-display/codeblock'
import { cn, isInline } from '@/lib/utils'

type ChatMessageContentProps = {
  message: Message
}

export function ChatMessageContent({ message }: ChatMessageContentProps) {
  if (message.role === 'assistant') {
    return (
      <MemoizedReactMarkdown
        className={cn(
          'prose',
          'dark:prose-invert',
          'prose-p:leading-relaxed',
          'prose-pre:p-0',
          'break-words'
        )}
        remarkPlugins={[remarkGfm, remarkMath]}
        components={{
          p({ children }) {
            return <p className="mb-2 last:mb-0">{children}</p>
          },
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')

            const inline = isInline(children)

            if (inline) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            }

            return (
              <CodeBlock
                key={Math.random()}
                language={(match && match[1]) || ''}
                value={String(children).replace(/\n$/, '')}
                {...props}
              />
            )
          }
        }}
      >
        {message.content}
      </MemoizedReactMarkdown>
    )
  }

  return <div>{message.content}</div>
}
