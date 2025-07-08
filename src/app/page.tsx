import { Metadata } from 'next'
import Home from './home/page'
import { getAllServices } from 'src/services'

const title = 'Ángela Sanguino García - Psicóloga Clínica'
const description = 'Mi objetivo central estará en que sientas calma y percibas correctamente en medio de algún conflicto y que operes consciente de la libertad que dispones para dirigir tu propio mundo mental al comunicarte y relacionarte.'

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://angela-psi-nine.vercel.app' : 'http://localhost:3000'),
    title,
    description,
    openGraph: {
        title,
        description,
        images: ['/logo_515x515.png'],
        url: 'https://www.angela-psi-nine.vercel.app',
        type: 'website',
    },
    twitter: {
    },
}

const HomePage = async () => {
    const services = await getAllServices()
    return <Home services={services} />
}

export default HomePage
