'use client'

import { useContext, useEffect, useState } from "react";
import { dataObj, serviceType } from "src/app/types"
import Button from "src/components/Button/Button";
import InputField from "src/components/InputField/InputField";
import { COUNTRIES, STRIPE_PIBLISHABLE_KEY } from "src/constants";
import Calendar from 'react-calendar'
import { TileDisabledFunc } from 'react-calendar/dist/shared/types'
import { createOrder } from "src/services";
import toast from "react-hot-toast";
import Dropdown from "src/components/Dropdown/Dropdown";
import TextData from "src/components/TextData/TextData";
import { getCountryCode, getPrice } from "src/helpers";
import { AppContext } from "src/app/context/AppContext";

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
    const [colombianResident, setColombianResident] = useState<boolean | null>(null)
    const { isMobile } = useContext(AppContext)

    const {
        title,
        subtitle,
        description,
        image,
        priceEUR,
        paymentLink,
        buy_button_id,
        _id,
        discounts,
        discountsApply,
        bulkBook
    } = service || {}

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://js.stripe.com/v3/buy-button.js";
        script.async = true;
        document.body.appendChild(script);

        getColombianDiscount()

        return () => {
            document.body.removeChild(script)
        };
    }, [])

    useEffect(() => {
        if (data.country && data.country === 'Colombia') {
            if (colombianResident !== false) setColombianResident(true)
        }
    }, [data.country])

    const getColombianDiscount = async () => {
        try {
            const countryCode = await getCountryCode()
            if (countryCode === 'co') setColombianResident(true)
        } catch (error) {
            console.error(error)
            setColombianResident(null)
        }
    }

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
        if (data.age && Number(data.age) < 3) return true
        if (!date) return true
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

            const res = await fetch('/api/order/create-checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId,
                    _id,
                    quantity: data.quantity || 1,
                    voluntary: data.voluntary,
                    country: data.country,
                    colombianResident
                })
            })

            const d = await res.json()
            if (d.url) window.location.href = d.url
            else toast.error(d.error || 'Ocurrió un error. Intena nuevamente')
            setCheckoutLoading(false)
        } catch (error) {
            toast.error('Ocurrió un error. Intena nuevamente')
            setCheckoutLoading(false)
            console.error(error)
        }
    }

    const getPriceWithDiscounts = () => {
        let discountApplies = false
        let price = Number(priceEUR)

        // Discount for Colombian residents
        if (colombianResident) {
            price = Number(priceEUR) * (data.quantity || 1) * .6
        }

        if (data.country && discountsApply) {
            discountApplies = discountsApply.toLowerCase().includes(data.country.toLowerCase())
                || discountsApply.toLowerCase().includes('todos')
        }

        // Discounts on 2nd hour
        if (discountApplies && discounts && discounts.includes('50% en la segunda hora') && data.quantity > 1) {
            price = price * data.quantity * .75
            if (data.quantity > 2) {
                // All regular price but one (the second hour)
                price = price * (data.quantity - 1) + Number(priceEUR) * .5
            } else {
                // One regular price + 50% on the second
                price = price + price * .5
            }
        }

        return getPrice(price) || '-'
    }

    return (
        <div className="service__container">
            <div className="service__card">
                <div className="service__card-wrapper">
                    <h1 className="service__title">{title}</h1>
                    <h2 className="service__subtitle">{subtitle}</h2>
                    <div className="service__description" dangerouslySetInnerHTML={{ __html: description?.replace(/\n/g, "<br />") || '' }} />
                    <div className="service__price">
                        <p className="service__price-unit">Precio unitario: <strong>{getPrice(priceEUR) || '-'}</strong></p>
                        <div className="service__price-total-container">
                            <p style={{ margin: 0 }}>Precio total:</p>
                            <p className="service__price-total"> <strong>{getPriceWithDiscounts()}</strong></p>
                        </div>
                    </div>
                    {colombianResident ? <p style={{ color: '#276276e6', fontWeight: 'bold', fontStyle: 'italic', marginTop: '2rem', textAlign: 'center' }}>Se ha aplicado un descuento automático del 40% por ser residente colombiano!</p> : ''}
                    {showForm ?
                        <>
                            <h3>Información personal:</h3>
                            {!showPayButton ?
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
                                            style={{ width: isMobile ? '' : '5rem' }} />

                                        <Dropdown
                                            label="País de residencia"
                                            options={COUNTRIES.map(c => c.name)}
                                            value={data.country}
                                            selected={data.country}
                                            setSelected={value => updateData('country', { target: { value } })}
                                            style={{ width: isMobile ? '' : '45rem' }}
                                            maxHeight="25vh" />
                                        {bulkBook ?
                                            <Dropdown
                                                label="Cantidad (horas)"
                                                options={Array.from({ length: 20 }).map((_, i) => i + 1)}
                                                value={data.quantity || 1}
                                                selected={data.quantity || 1}
                                                setSelected={value => updateData('quantity', { target: { value } })}
                                                style={{ width: isMobile ? '' : '20rem' }}
                                                maxHeight="25vh" /> : ''}
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
                                                bgColor="#3c758a"
                                                textColor="#fff"
                                                // style={{ height: '2.5rem' }}
                                                disabled={orderLoading}
                                            />}
                                        {!Number(service?.priceEUR) ?
                                            <div className="service__form-row">
                                                <InputField
                                                    label="Aporte voluntario €"
                                                    name="voluntary"
                                                    updateData={updateData}
                                                    type="number"
                                                    value={parseInt(data.voluntary) || 5}
                                                    style={{ width: '5rem' }} />
                                            </div> : ''}
                                    </div>
                                </div>
                                :
                                <div className="service__form">
                                    <div className="service__form-row">
                                        <TextData label="Nombre completo" value={data.name + ' ' + data.lastName} />
                                        <TextData label="Contacto" value={data.email || data.phone} />
                                        <TextData label="Edad" value={data.age} />
                                        <TextData label="País de residencia" value={data.country} />
                                        {Number(service?.priceEUR) < 1 &&
                                            <TextData label="Aporte voluntario €" value={data.voluntary} />}
                                    </div>
                                    <TextData label="Fecha de cita" value={new Date(date || '').toLocaleDateString('es-ES')} />
                                </div>
                            }
                        </>
                        :
                        <Button
                            label="Agendar cita"
                            handleClick={() => setShowForm(true)}
                            bgColor="#276276e6"
                            textColor="#fff"
                            style={{ marginTop: '1rem' }} />}
                    {showPayButton && !orderLoading ? <p>✅ Orden creada.</p> : ''}
                    {showPayButton ? //renderStripeButton()
                        <Button
                            label="Pagar"
                            handleClick={handlePay}
                            bgColor="#3c758a"
                            textColor="#fff"
                            loading={checkoutLoading}
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