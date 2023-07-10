import './globals.css'
import { fontMono, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { Providers } from '@/components/providers'
import { Header } from '@/components/header/header'

export const metadata = {
  title: 'Voithos',
  description: 'Voithos | Chat GPT',
  openGraph: {
    title: 'Voithos',
    description: 'Voithos | Chat GPT',
    type: 'website',
    url: process.env.NEXT_PUBLIC_BASE_URL
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#020617' }
  ]
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'font-sans antialiased',
          fontSans.style,
          fontMono.variable
        )}
      >
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
