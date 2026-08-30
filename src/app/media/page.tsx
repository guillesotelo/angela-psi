import type { Metadata } from 'next'

const title = 'Podcasts y Vídeos'
const description =
    'Podcasts y vídeos de Ángela Sanguino García sobre psicología, autoconocimiento, relaciones y bienestar emocional.'

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: '/media' },
    openGraph: {
        title,
        description,
        url: '/media',
        type: 'website',
    },
}

export default function Media() {
    return <div className="media__container">
        <div className="media__wrapper">
            <h1>Mis Podcasts &amp; Vídeos</h1>
            <p>Muy pronto...</p>
        </div>
    </div>
}