// Central SEO / site identity config.
// Canonical host is www: the apex 308-redirects to www on Vercel.
export const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.amorsinmiedo.com'

export const SITE_NAME = 'Amor Sin Miedo'

export const AUTHOR_NAME = 'Ángela Sanguino García'

export const SITE_TITLE = `${AUTHOR_NAME} - Psicóloga Clínica`

export const SITE_DESCRIPTION =
    'Psicóloga clínica con 25 años de experiencia. Terapia online individual, de pareja, familiar y grupal desde un abordaje Integrativo Transpersonal. Reserva tu cita por Google Meet.'

export const SITE_LOCALE = 'es_ES'

export const PHONE = '+34650609282'

export const PHONE_DISPLAY = '+34 650 60 92 82'

export const WHATSAPP_URL = `https://wa.me/${PHONE}`

export const KEYWORDS = [
    'psicóloga clínica',
    'psicología online',
    'terapia online',
    'terapia de pareja',
    'terapia familiar',
    'psicoterapia integrativa',
    'psicología transpersonal',
    'Ángela Sanguino García',
    'amor sin miedo',
    'sesiones de psicología',
    'ansiedad',
    'autoconocimiento',
]

// Routes that must never be indexed.
export const PRIVATE_ROUTES = [
    '/admin',
    '/login',
    '/confirmation',
    '/canceled',
    '/api',
]
