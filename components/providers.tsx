'use client'

import * as React from 'react'
import { useState } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient } from '@tanstack/query-core'
import { QueryClientProvider } from '@tanstack/react-query'

export function Providers({ children, ...props }: ThemeProviderProps) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider {...props}>
        <TooltipProvider>{children}</TooltipProvider>
      </NextThemesProvider>
    </QueryClientProvider>
  )
}
