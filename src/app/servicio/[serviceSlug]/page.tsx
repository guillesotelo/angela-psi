import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { serviceType } from 'src/app/types'
import Service from './Service'
import { getServiceBySlug } from 'src/services'
import JsonLd from 'src/components/JsonLd/JsonLd'
import { AUTHOR_NAME, SITE_NAME, SITE_URL } from 'src/constants/site'

interface ServicePageProps {
    params: {
        serviceSlug: string
    }
}

// Strip markdown so meta descriptions stay clean plain text.
const toPlainText = (markdown?: string, maxLength = 160) => {
    if (!markdown) return ''
    const text = markdown
        .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
        .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
        .replace(/[#*_`>~-]/g, '')
        .replace(/\s+/g, ' ')
        .trim()

    if (text.length <= maxLength) return text
    return `${text.slice(0, maxLength - 1).trimEnd()}…`
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
    const { serviceSlug } = params
    const service: serviceType | undefined = await getServiceBySlug(serviceSlug)

    if (!service?.title) {
        return {
            title: 'Servicio no encontrado',
            robots: { index: false, follow: true },
        }
    }

    const title = service.title
    const description =
        toPlainText(service.subtitle) ||
        toPlainText(service.description) ||
        `Reserva tu sesión de ${service.title} con ${AUTHOR_NAME}, psicóloga clínica con 25 años de experiencia.`
    const canonical = `/servicio/${serviceSlug}`

    return {
        title,
        description,
        alternates: { canonical },
        openGraph: {
            title,
            description,
            url: canonical,
            type: 'website',
            siteName: SITE_NAME,
            ...(service.image ? { images: [{ url: service.image }] } : {}),
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    }
}

export default async function ServicePage({ params }: ServicePageProps) {
    const { serviceSlug } = params
    const service: serviceType | undefined = await getServiceBySlug(serviceSlug)

    if (!service?.title) notFound()

    const url = `${SITE_URL}/servicio/${serviceSlug}`

    const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${url}#service`,
        name: service.title,
        description: toPlainText(service.description, 500),
        url,
        serviceType: service.type === 'Grupal' ? 'Sesión Grupal' : 'Sesión Privada',
        category: 'Psicoterapia',
        areaServed: 'Global',
        availableChannel: {
            '@type': 'ServiceChannel',
            serviceUrl: url,
            availableLanguage: { '@type': 'Language', name: 'Spanish' },
        },
        provider: { '@id': `${SITE_URL}/#angela` },
        ...(service.priceEUR
            ? {
                offers: {
                    '@type': 'Offer',
                    price: String(service.priceEUR),
                    priceCurrency: 'EUR',
                    availability: 'https://schema.org/InStock',
                    url,
                },
            }
            : {}),
    }

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Inicio',
                item: `${SITE_URL}/`,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: service.title,
                item: url,
            },
        ],
    }

    return (
        <>
            <JsonLd data={serviceSchema} id="ld-service" />
            <JsonLd data={breadcrumbSchema} id="ld-breadcrumb" />
            <Service service={service} />
        </>
    )
}
