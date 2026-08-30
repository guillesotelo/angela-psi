import type { MetadataRoute } from 'next'
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE } from '../constants/site'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: SITE_TITLE,
        short_name: SITE_NAME,
        description: SITE_DESCRIPTION,
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#1f9b7e',
        lang: 'es-ES',
        categories: ['health', 'medical', 'lifestyle'],
        icons: [
            { src: '/icon', sizes: '32x32', type: 'image/png' },
            { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
        ],
    }
}
