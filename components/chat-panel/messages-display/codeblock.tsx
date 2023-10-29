'use client'

import { FC, memo, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import { IconCheck, IconCopy } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CopyToClipboard } from 'react-copy-to-clipboard'

interface Props {
  language: string
  value: string
}

const CodeBlock: FC<Props> = memo(({ language, value }) => {
  const [isCopied, setIsCopied] = useState<Boolean>(false)

  return (
    <div className="codeblock relative w-full bg-slate-950 font-sans">
      <div
        className={cn(
          'flex',
          'w-full',
          'items-center',
          'justify-between',
          ['bg-slate-50', 'dark:bg-slate-800'],
          'px-6',
          'py-2',
          'pr-4',
          ['text-slate-950', 'dark:text-slate-100']
        )}
      >
        <span className="text-xs lowercase">{language}</span>
        <div className="flex items-center space-x-1">
          <CopyToClipboard text={value}>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'text-xs',
                ['hover:bg-slate-200', 'dark:hover:bg-slate-800'],
                'focus-visible:ring-1',
                'focus-visible:ring-slate-700',
                'focus-visible:ring-offset-0'
              )}
              onClick={() => {
                setIsCopied(true)
                const timer = setTimeout(() => setIsCopied(false), 1000)
                return () => clearTimeout(timer)
              }}
            >
              {isCopied ? <IconCheck /> : <IconCopy />}
              <span className="sr-only">Copy code</span>
            </Button>
          </CopyToClipboard>
        </div>
      </div>
      <SyntaxHighlighter
        language={language}
        style={nord}
        PreTag="div"
        customStyle={{
          margin: 0,
          width: '100%',
          background: 'transparent',
          padding: '1.5rem 1rem'
        }}
        codeTagProps={{
          style: {
            fontSize: '0.9rem',
            fontFamily: 'var(--font-mono)'
          }
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  )
})
CodeBlock.displayName = 'CodeBlock'

export { CodeBlock }
