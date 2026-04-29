import './globals.scss'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

const defaultSiteUrl = 'https://xn--80aab1b2agif1b.xn--80adxhks'

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
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', sizes: '371x385', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.ico',
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
  themeColor: '#ffffff',
  colorScheme: 'light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim()
  const yandexMetrikaId = 108266591

  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground`} suppressHydrationWarning>
        {gtmId ? (
          <Script
            id="gtm-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        ) : null}
        <Script
          id="yandex-metrika-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=${yandexMetrikaId}','ym');ym(${yandexMetrikaId},'init',{webvisor:true,clickmap:true,ecommerce:'dataLayer',referrer:document.referrer,url:location.href,accurateTrackBounce:true,trackLinks:true});`,
          }}
        />
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
      </body>
    </html>
  )
}
