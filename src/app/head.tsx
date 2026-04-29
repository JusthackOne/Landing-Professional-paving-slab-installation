const defaultSiteUrl = 'https://xn--80aab1b2agif1b.xn--80adxhks'

function resolveSiteUrl() {
  try {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl).toString().replace(/\/$/, '')
  } catch {
    return defaultSiteUrl
  }
}
export default function Head() {
  const siteUrl = resolveSiteUrl()
  const title = 'Укладка тротуарной плитки в Москве и МО | ARTIS'
  const description =
    'Укладка тротуарной плитки, брусчатки и благоустройство участков в Москве и Московской области. Бесплатный замер, точная смета, монтаж под ключ.'
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: 'ARTIS',
    image: `${siteUrl}/images/logos/logo.png`,
    url: siteUrl,
    telephone: '+7-967-165-25-25',
    email: 'artis-plitka@yandex.ru',
    areaServed: ['Москва', 'Московская область'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Москва',
      addressRegion: 'Москва и Московская область',
      addressCountry: 'RU',
    },
    sameAs: ['https://wa.me/79671652525'],
  }

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ARTIS',
    url: siteUrl,
    inLanguage: 'ru-RU',
  }

  return (
    <>
      <meta charSet="utf-8" />
      <link href="/favicon.ico" rel="icon" sizes="any" />
      <link href="/favicon.png" rel="icon" sizes="371x385" type="image/png" />
      <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
      <link href="/site.webmanifest" rel="manifest" />
      <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
      <meta content="telephone=no" name="format-detection" />
      <meta content="ru" name="language" />
      <meta content="Russian" name="content-language" />
      <meta
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        name="robots"
      />
      <meta content="Москва, Московская область" name="geo.placename" />
      <meta content="RU-MOW" name="geo.region" />
      <meta content="55.7558;37.6173" name="ICBM" />
      <meta content="55.7558, 37.6173" name="geo.position" />
      <meta content={title} property="og:title" />
      <meta content={description} property="og:description" />
      <meta content={`${siteUrl}/images/bg/mainSection2.jpg`} property="og:image" />
      <meta content="1200" property="og:image:width" />
      <meta content="630" property="og:image:height" />
      <meta content="ARTIS - укладка тротуарной плитки" property="og:image:alt" />
      <meta content="summary_large_image" name="twitter:card" />
      <meta content={`${siteUrl}/images/bg/mainSection2.jpg`} name="twitter:image" />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        type="application/ld+json"
      />
    </>
  )
}
