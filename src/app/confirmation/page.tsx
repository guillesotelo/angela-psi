"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { getOrderById } from "src/services"
import { dataObj } from "../types"
import TextData from "src/components/TextData/TextData"
import { getDate } from "src/helpers"

export default function Confirmation() {
    const [order, setOrder] = useState<dataObj | null>(null)
    const [loading, setLoading] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const orderId = new URLSearchParams(document.location.search).get('order')
        if (!order && !loading && orderId) getorder(orderId)
    }, [pathname])

    const getorder = async (id: string) => {
        try {
            setLoading(true)

            const _order = await getOrderById(id)
            setOrder(_order)

            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }

    return (
        <div className="confirmation__container">
            <h1>✔️ Pago confirmado</h1>
            <h2>¡Muchas gracias!</h2>

            {loading ? <p className="confirmation__loading">Cargando datos...</p>
                : order ?
                    <div className="confirmation__details">
                        <h3>Estos son los datos de la reserva:</h3>
                        <TextData
                            label='Servicio'
                            value={order.title}
                            inline />
                        <TextData
                            label='Fecha elegida'
                            value={getDate(order.date)}
                            inline />
                        <TextData
                            label='Nombre completo'
                            value={order.name + ' ' + order.lastName}
                            inline />
                        <TextData
                            label='Contacto'
                            value={order.email || order.phone}
                            inline />
                        <TextData
                            label='Edad'
                            value={order.age}
                            inline />
                        <TextData
                            label='País de residencia'
                            value={order.country}
                            inline />
                        <TextData
                            label='Estado de pago'
                            value='PAGADO'
                            inline />
                    </div>
                    : ''}

            <p className="confirmation__disclaimer">
                Esta página es sólo informacional, ya puedes cerrarla.
            </p>
        </div>
    )
}