import type { MetadataRoute } from 'next'
import { SITE_URL } from '../constants/site'
import { getAllServices } from '../services'
import { createSlug } from '../helpers'
import { serviceType } from './types'

// Re-generate the sitemap hourly so newly published services show up
// without needing a redeploy.
export const revalidate = 3600

const staticRoutes: MetadataRoute.Sitemap = [
    {
        url: `${SITE_URL}/`,
        changeFrequency: 'weekly',
        priority: 1,
        lastModified: new Date(),
    },
    {
        url: `${SITE_URL}/media`,
        changeFrequency: 'monthly',
        priority: 0.5,
        lastModified: new Date(),
    },
    {
        url: `${SITE_URL}/politicas`,
        changeFrequency: 'yearly',
        priority: 0.3,
        lastModified: new Date(),
    },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    let serviceRoutes: MetadataRoute.Sitemap = []

    try {
        const services = await getAllServices()
        if (Array.isArray(services)) {
            serviceRoutes = services
                .filter((service: serviceType) => service?.active && service?.title)
                .map((service: serviceType) => ({
                    url: `${SITE_URL}/servicio/${createSlug(service.title || '')}`,
                    changeFrequency: 'weekly' as const,
                    priority: 0.8,
                    lastModified: new Date(),
                }))
        }
    } catch {
        // The services API is unavailable at build time; ship the static
        // routes rather than failing the whole build.
    }

    return [...staticRoutes, ...serviceRoutes]
}
