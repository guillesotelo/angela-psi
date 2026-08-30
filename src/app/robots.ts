import type { MetadataRoute } from 'next'
import { PRIVATE_ROUTES, SITE_URL } from '../constants/site'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: PRIVATE_ROUTES.map((route) => `${route}/`),
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    }
}
