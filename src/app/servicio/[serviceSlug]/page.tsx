import { Metadata } from 'next'
import { serviceType } from 'src/app/types'
import Service from './Service'
import { getServiceBySlug } from 'src/services'

interface ServicePageProps {
    params: {
        serviceSlug: string
        service: serviceType
    }
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
    const { serviceSlug } = params
    const service = await getServiceBySlug(serviceSlug)
    const { title, description, image } = service || {}

    if (serviceSlug) {
        return {
            title,
            description,
            openGraph: {
                title,
                description,
                images: [{ url: '/logo_515x515.png' }],
            },
        }
    }

    return {
        title: 'Servicio no encontrado'
    }
}

export default async function ServicePage({ params }: ServicePageProps) {
    const { serviceSlug } = params
    const service = await getServiceBySlug(serviceSlug)

    return <Service service={service} />
}