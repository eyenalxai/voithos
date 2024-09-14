import './globals.css'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { Providers } from '@/components/providers'
import { Viewport } from 'next'
import { fontMono, fontSans } from '@/components/ui/fonts'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '0 0% 100%' },
    { media: '(prefers-color-scheme: dark)', color: '222.2 84% 4.9%' }
  ]
}

export const metadata = {
  title: 'Voithos',
  description: 'Voithos | Chat GPT'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'font-sans',
          'antialiased',
          fontSans.variable,
          fontMono.variable
        )}
      >
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <main className={cn('container', 'mx-auto', 'max-w-5xl')}>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
