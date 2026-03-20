import type { MetadataRoute } from 'next'

const defaultSiteUrl = 'https://example.com'

function resolveSiteUrl() {
  try {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl).toString()
  } catch {
    return defaultSiteUrl
  }
}

export default function robots(): MetadataRoute.Robots {
  const siteUrl = resolveSiteUrl()

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
