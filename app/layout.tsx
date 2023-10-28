import './globals.css'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { Providers } from '@/components/providers'
import { Header } from '@/components/header/header'
import { Viewport } from 'next'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '0 0% 100%' },
    { media: '(prefers-color-scheme: dark)', color: '222.2 84% 4.9%' }
  ]
}

export const metadata = {
  title: 'Voithos',
  description: 'Voithos | Chat GPT',
  openGraph: {
    title: 'Voithos',
    description: 'Voithos | Chat GPT',
    type: 'website',
    url: process.env.NEXT_PUBLIC_BASE_URL
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-sans antialiased')}>
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className={cn('container', 'mx-auto', 'max-w-xl')}>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
