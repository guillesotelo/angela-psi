import { Metadata } from 'next'
import { cache } from 'react'
import Home from './home/page'

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://angela-psinews.com' : 'http://localhost:3000'),
    title: 'angela-psi.',
    description: '',
    openGraph: {
        title: '',
        description: '',
        images: ['/logo_515x515.png'],
        url: 'https://www.angela-psinews.com',
        type: 'website',
    },
    twitter: {
    },
}

const HomePage = async () => {

    return <Home />
}

export default HomePage
