"use client"

import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function Header() {
    const [page, setPage] = useState('/')
    const router = useRouter()
    const pathName = usePathname()

    useEffect(() => {
        if (pathName.includes('media')) setPage('media')
        else setPage('/')
        console.log(pathName)
    }, [pathName])

    return (
        <div className="header__container">
            <p className="header__link" style={{ color: page === '/' ? '#1f9b7e' : '' }} onClick={() => router.push('/')}>Home</p>
            <p>&nbsp;&nbsp;|&nbsp;&nbsp;</p>
            <p className="header__link" style={{ color: page === 'media' ? '#1f9b7e' : '' }} onClick={() => router.push('/media')}>Podcasts</p>
        </div>
    )
}