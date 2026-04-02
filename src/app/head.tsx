import Script from 'next/script'

const defaultSiteUrl = 'https://example.com'

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
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim()
  const yandexMetrikaId = 108266591

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
          __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=${yandexMetrikaId}','ym');ym(${yandexMetrikaId},'init',{ssr:true,webvisor:true,clickmap:true,ecommerce:'dataLayer',referrer:document.referrer,url:location.href,accurateTrackBounce:true,trackLinks:true});`,
        }}
      />
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
