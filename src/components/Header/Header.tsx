"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const LINKS = [
    { href: '/', label: 'Home' },
    { href: '/media', label: 'Podcasts' },
]

export default function Header() {
    const pathName = usePathname() || '/'

    return (
        <header className="header__container">
            <nav className="header__nav" aria-label="Navegación principal">
                {LINKS.map(({ href, label }, index) => (
                    <span key={href}>
                        {index > 0 ? <span aria-hidden="true">&nbsp;&nbsp;|&nbsp;&nbsp;</span> : null}
                        <Link
                            href={href}
                            className="header__link"
                            aria-current={pathName === href ? 'page' : undefined}
                            style={{ color: pathName === href ? '#1f9b7e' : '' }}
                        >
                            {label}
                        </Link>
                    </span>
                ))}
            </nav>
        </header>
    )
}
