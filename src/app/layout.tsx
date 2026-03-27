import './globals.scss'

import { Analytics } from '@vercel/analytics/next'
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
  applicationName: 'ARTIS',
  title: {
    default: 'Укладка тротуарной плитки в Москве и МО | ARTIS',
    template: '%s | ARTIS',
  },
  description:
    'Укладка тротуарной плитки, брусчатки и благоустройство участков в Москве и Московской области. Бесплатный замер, точная смета, монтаж под ключ.',
  keywords: [
    'укладка тротуарной плитки',
    'укладка брусчатки',
    'мощение дорожек',
    'укладка тротуарной плитки в Москве',
    'укладка тротуарной плитки в Московской области',
    'благоустройство участка',
    'укладка плитки под ключ',
    'ARTIS',
  ],
  authors: [{ name: 'ARTIS' }],
  creator: 'ARTIS',
  publisher: 'ARTIS',
  category: 'construction',
  alternates: {
    canonical: '/',
    languages: {
      'ru-RU': '/',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/images/logos/logo.png', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
    shortcut: ['/favicon.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: 'Укладка тротуарной плитки в Москве и МО | ARTIS',
    description:
      'Укладка тротуарной плитки, брусчатки и благоустройство участков в Москве и Московской области. Бесплатный замер, точная смета, монтаж под ключ.',
    type: 'website',
    url: '/',
    locale: 'ru_RU',
    siteName: 'ARTIS',
    images: [
      {
        url: '/images/bg/mainSection2.jpg',
        width: 1200,
        height: 630,
        alt: 'ARTIS - укладка тротуарной плитки',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Укладка тротуарной плитки в Москве и МО | ARTIS',
    description:
      'Укладка тротуарной плитки, брусчатки и благоустройство участков в Москве и Московской области. Бесплатный замер, точная смета, монтаж под ключ.',
    images: ['/images/bg/mainSection2.jpg'],
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0d6b37',
  colorScheme: 'light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim()

  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground`} suppressHydrationWarning>
        {gtmId ? (
          <noscript>
            <iframe
              height="0"
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              style={{ display: 'none', visibility: 'hidden' }}
              title="Google Tag Manager"
              width="0"
            />
          </noscript>
        ) : null}
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
