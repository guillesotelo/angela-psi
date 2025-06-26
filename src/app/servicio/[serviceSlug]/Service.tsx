'use client'

import { useEffect, useState } from "react";
import { dataObj, serviceType } from "src/app/types"
import Button from "src/components/Button/Button";
import InputField from "src/components/InputField/InputField";
import { STRIPE_PIBLISHABLE_KEY } from "src/constants";
import Calendar from 'react-calendar'
import { TileDisabledFunc } from 'react-calendar/dist/shared/types'
import { createOrder } from "src/services";
import toast from "react-hot-toast";

type Props = {
    service?: serviceType
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'stripe-buy-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}

export default function Service({ service }: Props) {
    const [data, setData] = useState<dataObj>({})
    const [date, setDate] = useState<Date | null>(null)
    const [showPayButton, setShowPayButton] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [orderLoading, setOrderLoading] = useState(false)
    const [checkoutLoading, setCheckoutLoading] = useState(false)
    const [openCalendar, setOpenCalendar] = useState(false)
    const [orderId, setOrderId] = useState('')

    const {
        title,
        subtitle,
        description,
        image,
        priceCOP,
        priceEUR,
        paymentLink,
        buy_button_id,
        slug
    } = service || {}

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://js.stripe.com/v3/buy-button.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script)
        };
    }, [])

    const updateData = (key: string, e: any) => {
        setData(prev => ({ ...prev, [key]: e.target.value }))
    }

    const tileDisabled: TileDisabledFunc = ({ activeStartDate, date, view }): boolean => {
        const day = date.getDay()
        const today = new Date()
        const isTodayOrBefore = date.getTime() < today.getTime() - 100000000
        const dayIsAvailable = true
        if (dayIsAvailable) return day == 3 || isTodayOrBefore
        return false
    }

    const selectDate = (date: any) => {
        setDate(date)
        setOpenCalendar(false)
    }

    const getPrice = () => {
        let price = ''
        // if (priceCOP) {
        //     price += `$${parseFloat(priceCOP).toFixed(2)} COP`
        // }
        if (priceEUR) {
            price += `€${parseFloat(priceEUR).toFixed(2)}`
        }
        return price
    }

    const renderStripeButton = () => {
        return (
            <div className="service__stripe">
                <stripe-buy-button
                    buy-button-id={buy_button_id}
                    publishable-key={STRIPE_PIBLISHABLE_KEY}
                >
                </stripe-buy-button>
            </div >
        )
    }

    const checkData = () => {
        if (!data.name || !data.lastName || (!data.email && !data.phone) || !data.country) return true
        if (!data.email.includes('@')) return true
        return false
    }

    const createNewOrder = async () => {
        try {
            setOrderLoading(true)
            const order = await createOrder({ ...data, date, title })
            if (order && order._id) {
                setOrderId(order._id)
                setShowPayButton(true)
            } else toast.error('Ocurrió un error. Intenta nuevamente')
            setOrderLoading(false)
        } catch (error) {
            setOrderLoading(false)
            console.error(error)
        }
    }

    const handlePay = async () => {
        try {
            setCheckoutLoading(true)

            const res = await fetch('/api/create-checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId, slug, quantity: 1 })
            })

            const d = await res.json()
            window.location.href = d.url
            setCheckoutLoading(false)
        } catch (error) {
            setCheckoutLoading(false)
            console.error(error)
        }
    }

    return (
        <div className="service__container">
            <div className="service__card">
                <div className="service__card-wrapper">
                    <h1 className="service__title">{title}</h1>
                    <h2 className="service__subtitle">{subtitle}</h2>
                    <p className="service__description">{description}</p>
                    {/* <p className="service__price">{getPrice()}</p> */}

                    {showForm ?
                        <>
                            <h3>Información personal:</h3>
                            <div className="service__form">
                                <div className="service__form-row">
                                    <InputField
                                        label="Nombre(s)"
                                        name="name"
                                        updateData={updateData} />
                                    <InputField
                                        label="Apellido"
                                        name="lastName"
                                        updateData={updateData} />
                                </div>
                                <div className="service__form-row">
                                    <InputField
                                        label="Email"
                                        name="email"
                                        updateData={updateData} />
                                    <InputField
                                        label="Teléfono"
                                        name="phone"
                                        updateData={updateData} />
                                </div>
                                <div className="service__form-row">
                                    <InputField
                                        label="Edad"
                                        name="age"
                                        updateData={updateData}
                                        type="number"
                                        style={{ width: '5rem' }} />
                                    <InputField
                                        label="País de residencia"
                                        name="country"
                                        updateData={updateData} />
                                    {openCalendar ?
                                        <Calendar
                                            locale='es-ES'
                                            onChange={selectDate}
                                            value={date}
                                            tileDisabled={tileDisabled}
                                            className='react-calendar'
                                        />
                                        :
                                        <Button
                                            label={date ? new Date(date).toLocaleDateString('es-ES') : 'Seleccioná una fecha'}
                                            handleClick={() => setOpenCalendar(true)}
                                            bgColor="#3b978c"
                                            textColor="#fff"
                                            style={{ height: '2.5rem' }}
                                        />}
                                </div>
                            </div>
                        </>
                        :
                        <Button
                            label="Agendar cita"
                            handleClick={() => setShowForm(true)}
                            bgColor="#276276e6"
                            textColor="#fff"
                            style={{}} />}

                    {showPayButton ? //renderStripeButton()
                        <Button
                            label="Pagar"
                            handleClick={handlePay}
                            bgColor="#276276e6"
                            textColor="#fff"
                            style={{ marginTop: '2rem' }} />
                        : showForm ?
                            <Button
                                label="Siguiente"
                                handleClick={createNewOrder}
                                bgColor="#276276e6"
                                textColor="#fff"
                                disabled={checkData() || orderLoading}
                                style={{ marginTop: '2rem' }} />
                            : ''}
                    {/* <a href={paymentLink} className="service__paybutton">Pagar</a> */}
                </div>
            </div>
        </div>
    )
}