import { Metadata } from 'next'
import { cache } from 'react'
import Home from './home/page'

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://angela-psi-nine.vercel.app' : 'http://localhost:3000'),
    title: 'Angela PSI',
    description: '',
    openGraph: {
        title: '',
        description: '',
        images: ['/logo_515x515.png'],
        url: 'https://www.angela-psi-nine.vercel.app',
        type: 'website',
    },
    twitter: {
    },
}

const HomePage = async () => {

    return <Home />
}

export default HomePage
