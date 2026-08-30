import { Metadata } from 'next'
import Home from './home/Home'
import { getAllServices } from 'src/services'
import { createSlug } from 'src/helpers'
import { serviceType } from './types'
import JsonLd from '../components/JsonLd/JsonLd'
import {
    SITE_DESCRIPTION,
    SITE_TITLE,
    SITE_URL,
} from '../constants/site'

export const revalidate = 3600

export const metadata: Metadata = {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        type: 'website',
    },
}

const buildServiceCatalog = (services: unknown) => {
    if (!Array.isArray(services)) return null

    const items = services
        .filter((service: serviceType) => service?.active && service?.title)
        .map((service: serviceType, index: number) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'Service',
                name: service.title,
                url: `${SITE_URL}/servicio/${createSlug(service.title || '')}`,
                serviceType: service.type === 'Grupal' ? 'Sesión Grupal' : 'Sesión Privada',
                provider: { '@id': `${SITE_URL}/#angela` },
                areaServed: 'Global',
                ...(service.priceEUR
                    ? {
                        offers: {
                            '@type': 'Offer',
                            price: String(service.priceEUR),
                            priceCurrency: 'EUR',
                            availability: 'https://schema.org/InStock',
                            url: `${SITE_URL}/servicio/${createSlug(service.title || '')}`,
                        },
                    }
                    : {}),
            },
        }))

    if (!items.length) return null

    return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        '@id': `${SITE_URL}/#services`,
        name: 'Servicios de psicología',
        itemListElement: items,
    }
}

const HomePage = async () => {
    const services = await getAllServices()
    const catalog = buildServiceCatalog(services)

    return (
        <>
            {catalog ? <JsonLd data={catalog} id="ld-services" /> : null}
            <Home services={services} />
        </>
    )
}

export default HomePage
