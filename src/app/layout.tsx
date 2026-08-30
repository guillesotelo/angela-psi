// src/app/layout.tsx

import type { Metadata, Viewport } from 'next'
import '../styles/globals.css'
import '../styles/scss/app.scss'
import { AppProvider } from './context/AppContext'
import WithHeaderAndFooter from './layouts/HeaderAndFooter'
import { Toaster } from 'react-hot-toast'
import GoogleAnalytics from '../components/GoogleAnalytics/GoogleAnalytics'
import JsonLd from '../components/JsonLd/JsonLd'
import {
    AUTHOR_NAME,
    KEYWORDS,
    SITE_DESCRIPTION,
    SITE_LOCALE,
    SITE_NAME,
    SITE_TITLE,
    SITE_URL,
    PHONE_DISPLAY,
    WHATSAPP_URL,
} from '../constants/site'

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: SITE_TITLE,
        template: `%s | ${AUTHOR_NAME}`,
    },
    description: SITE_DESCRIPTION,
    keywords: KEYWORDS,
    authors: [{ name: AUTHOR_NAME, url: SITE_URL }],
    creator: AUTHOR_NAME,
    publisher: AUTHOR_NAME,
    applicationName: SITE_NAME,
    generator: 'Next.js',
    referrer: 'origin-when-cross-origin',
    openGraph: {
        type: 'website',
        locale: SITE_LOCALE,
        url: SITE_URL,
        siteName: SITE_NAME,
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
    },
    twitter: {
        card: 'summary_large_image',
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    formatDetection: {
        telephone: true,
        email: true,
        address: false,
    },
    category: 'health',
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#1f9b7e',
    colorScheme: 'light',
}

const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#practice`,
    name: SITE_NAME,
    alternateName: SITE_TITLE,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    telephone: PHONE_DISPLAY,
    priceRange: '€€',
    image: `${SITE_URL}/opengraph-image`,
    availableLanguage: ['es'],
    areaServed: 'Global',
    sameAs: [WHATSAPP_URL],
    provider: {
        '@type': 'Person',
        '@id': `${SITE_URL}/#angela`,
        name: AUTHOR_NAME,
        jobTitle: 'Psicóloga Clínica',
        url: SITE_URL,
        image: `${SITE_URL}/assets/images/profile.png`,
        description: SITE_DESCRIPTION,
        knowsLanguage: 'es',
        hasCredential: {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'Registro Profesional',
            recognizedBy: {
                '@type': 'CollegeOrUniversity',
                name: 'Fundación Universitaria Konrad Lorenz',
            },
            identifier: '001565 F.U.K.L. 2000 Colombia',
        },
        alumniOf: {
            '@type': 'CollegeOrUniversity',
            name: 'Fundación Universitaria Konrad Lorenz',
        },
    },
}

const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: 'es-ES',
    publisher: { '@id': `${SITE_URL}/#angela` },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
            <body>
                <JsonLd data={organizationSchema} id="ld-practice" />
                <JsonLd data={websiteSchema} id="ld-website" />
                <AppProvider>
                    <WithHeaderAndFooter>
                        <GoogleAnalytics />
                        <Toaster />
                        {children}
                    </WithHeaderAndFooter>
                </AppProvider>
            </body>
        </html>
    )
}
