import { Message } from 'ai'
import remarkGfm from 'remark-gfm'
import { MemoizedReactMarkdown } from '@/components/chat-panel/messages-display/markdown'
import { CodeBlock } from '@/components/chat-panel/messages-display/codeblock'
import { cn } from '@/lib/utils'

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
        remarkPlugins={[remarkGfm]}
        components={{
          p({ children }) {
            return <p className="mb-2 last:mb-0">{children}</p>
          },
          code({ node, inline, className, children, ...props }) {
            if (children.length) {
              if (children[0] == '▍') {
                return (
                  <span className="mt-1 animate-pulse cursor-default">▍</span>
                )
              }

              children[0] = (children[0] as string).replace('`▍`', '▍')
            }

            const match = /language-(\w+)/.exec(className || '')

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
