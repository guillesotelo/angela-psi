import type { Metadata } from 'next'

/**
 * Metadata for pages that must stay out of search results
 * (auth, admin and post-checkout pages).
 */
export const noIndexMetadata = (title: string): Metadata => ({
    title,
    robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: { index: false, follow: false },
    },
})
