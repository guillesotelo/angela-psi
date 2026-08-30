import type { Metadata } from 'next'
import { noIndexMetadata } from '../../constants/seo'

export const metadata: Metadata = noIndexMetadata('Acceso')

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
