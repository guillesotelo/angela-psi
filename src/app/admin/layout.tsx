import type { Metadata } from 'next'
import { noIndexMetadata } from '../../constants/seo'

export const metadata: Metadata = noIndexMetadata('Administración')

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
