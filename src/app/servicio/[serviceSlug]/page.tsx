import { Metadata } from 'next'
import { serviceType } from 'src/app/types'
import { SERVICES } from 'src/constants/services'
import { createSlug } from 'src/helpers'
import Service from './Service'

interface ServicePageProps {
    params: {
        serviceSlug: string
        service: serviceType
    }
}

export async function generateStaticParams() {
    return SERVICES.map(service => ({
        serviceSlug: createSlug(service.title)
    }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
    const { serviceSlug } = params
    const service = SERVICES.map(s => ({...s, slug: createSlug(s.title)})).find(s => s.slug === serviceSlug)
    const { title, description, image } = service || {}

    if (serviceSlug) {
        return {
            title,
            description,
            openGraph: {
                title,
                description,
                images: [{ url: image || '' }],
            },
        }
    }

    return {
        title: 'Servicio no encontrado'
    }
}

export default async function EditionPage({ params }: ServicePageProps) {
    const { serviceSlug } = params
    const service = SERVICES.map(s => ({...s, slug: createSlug(s.title)})).find(s => s.slug === serviceSlug)
    
    return <Service service={service} />
}