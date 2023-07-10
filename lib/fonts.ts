import {
  Roboto_Condensed as FontSans,
  Roboto_Mono as FontMono
} from 'next/font/google'

export const fontSans = FontSans({
  weight: ['300', '700'],
  subsets: ['latin']
})

export const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono'
})
