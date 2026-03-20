import './globals.scss'

import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const defaultSiteUrl = 'https://example.com'

function resolveBaseUrl() {
  try {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl)
  } catch {
    return new URL(defaultSiteUrl)
  }
}

export const metadata: Metadata = {
  metadataBase: resolveBaseUrl(),
  title: {
    default: 'Укладка тротуарной плитки | АРТИС',
    template: '%s | АРТИС',
  },
  description:
    'Профессиональная укладка тротуарной плитки в Москве и области: замер, смета, укладка под ключ.',
  keywords: [
    'укладка тротуарной плитки',
    'мощение плиткой',
    'тротуарная плитка под ключ',
    'укладка плитки москва',
    'дорожки из плитки',
  ],
  openGraph: {
    title: 'Профессиональная укладка тротуарной плитки | АРТИС',
    description: 'Замер, смета и укладка тротуарной плитки под ключ.',
    type: 'website',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Укладка тротуарной плитки | АРТИС',
    description: 'Только укладка тротуарной плитки. Аккуратно и в срок.',
  },
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground`} suppressHydrationWarning>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
