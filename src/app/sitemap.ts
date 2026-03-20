import type { MetadataRoute } from 'next'

const defaultSiteUrl = 'https://example.com'

function resolveSiteUrl() {
  try {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl).toString()
  } catch {
    return defaultSiteUrl
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = resolveSiteUrl()
  const now = new Date()

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
