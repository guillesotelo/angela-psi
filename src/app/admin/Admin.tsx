'use client'

import { useEffect, useState } from "react"
import DataTable from "src/components/DataTable/DataTable"
import Modal from "src/components/Modal/Modal"
import { bookingHeaders, COUNTRIES } from "src/constants"
import { createOrder, deleteOrder, getAllBookings } from "src/services"
import { dataObj } from "../types"
import { getUser } from "src/helpers"
import toast from "react-hot-toast"
import InputField from "src/components/InputField/InputField"
import Dropdown from "src/components/Dropdown/Dropdown"
import Calendar, { TileDisabledFunc } from "react-calendar"
import Button from "src/components/Button/Button"

export default function Admin() {
    const [bookings, setBookings] = useState([])
    const [selectedBooking, setSelectedBooking] = useState(-1)
    const [booking, setBooking] = useState<null | dataObj>(null)
    const [loading, setLoading] = useState(false)
    const [openCalendar, setOpenCalendar] = useState(false)

    useEffect(() => {
        getBookings(true)
    }, [])

    useEffect(() => {
        if (selectedBooking !== -1) setBooking(bookings[selectedBooking])
        else setBooking(null)
    }, [selectedBooking])

    const getBookings = async (load = false) => {
        try {
            setLoading(load)
            const _bookings = await getAllBookings()
            if (_bookings && _bookings.length) setBookings(_bookings)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }

    const saveBooking = async () => {
        try {
            setLoading(true)
            if (booking) {
                const saved = await createOrder(booking, getUser().token)
                if (saved) {
                    toast.success('Cita creada con exito!')
                    await getBookings()
                }
                else toast.error('Error al crear cita. Prueba nuevamente')
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }

    const deleteBooking = async () => {
        try {
            setLoading(true)
            if (booking) {
                const deleted = await deleteOrder(booking, getUser().token)
                if (deleted) {
                    setSelectedBooking(-1)
                    toast.success('Cita eliminada!')
                    await getBookings()
                }
                else toast.error('Error al eliminar la cita. Prueba nuevamente')
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }

    console.log(booking)

    const updateData = (key: string, e: any) => {
        setBooking(prev => ({ ...prev, [key]: e.target.value }))
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
        updateData('date', { target: { value: date } })
        setOpenCalendar(false)
    }

    return (
        <div className="admin__container">
            <h1 style={{ filter: booking ? 'blur(4px)' : '' }}>Admin Panel</h1>
            <DataTable
                title="Citas"
                tableData={bookings}
                tableHeaders={bookingHeaders}
                setSelected={setSelectedBooking}
                selected={selectedBooking}
                loading={loading}
                style={{ filter: booking ? 'blur(4px)' : '' }}
                orderDataBy={bookingHeaders[0]}
                max={15}
            />
            {booking ?
                <Modal
                    title={`${booking.name} ${booking.lastName}`}
                    subtitle={booking.title}
                    onClose={() => setSelectedBooking(-1)}>
                    <div className="admin__modal-content">
                        <div className="service__form">
                            <div className="service__form-row">
                                <InputField
                                    label="Nombre(s)"
                                    name="name"
                                    value={booking.name || ''}
                                    updateData={updateData} />
                                <InputField
                                    label="Apellido"
                                    name="lastName"
                                    value={booking.lastName || ''}
                                    updateData={updateData} />
                            </div>
                            <div className="service__form-row">
                                <InputField
                                    label="Email"
                                    name="email"
                                    value={booking.email || ''}
                                    updateData={updateData} />
                                <InputField
                                    label="Teléfono"
                                    name="phone"
                                    value={booking.phone || ''}
                                    updateData={updateData} />
                            </div>
                            <div className="service__form-row">
                                <InputField
                                    label="Edad"
                                    name="age"
                                    updateData={updateData}
                                    type="number"
                                    value={booking.age || ''}
                                    style={{ width: '5rem' }} />

                                <Dropdown
                                    label="País de residencia"
                                    options={COUNTRIES}
                                    value={booking.country}
                                    selected={booking.country}
                                    setSelected={value => updateData('country', { target: { value } })}
                                    style={{ width: '45rem' }}
                                    maxHeight="25vh" />
                                {openCalendar ?
                                    <Calendar
                                        locale='es-ES'
                                        onChange={selectDate}
                                        value={booking.date}
                                        tileDisabled={tileDisabled}
                                        className='react-calendar'
                                    />
                                    :
                                    <Button
                                        label={booking.date ? new Date(booking.date).toLocaleDateString('es-ES') : 'Seleccioná una fecha'}
                                        handleClick={() => setOpenCalendar(true)}
                                        bgColor="#3b978c"
                                        textColor="#fff"
                                        style={{ height: '2.5rem' }}
                                        disabled={loading}
                                    />}
                            </div>
                            <div className="service__form-row" style={{ marginTop: '2rem' }}>
                                <Button
                                    label="Cancelar"
                                    handleClick={() => setSelectedBooking(-1)}
                                    bgColor="gray"
                                    disabled={loading}
                                    textColor="#fff" />
                                <Button
                                    label="Eliminar"
                                    handleClick={deleteBooking}
                                    bgColor="#a24d4d"
                                    disabled={loading}
                                    textColor="#fff" />
                                <Button
                                    label="Guardar cambios"
                                    handleClick={saveBooking}
                                    disabled={loading}
                                    textColor="#fff" />
                            </div>
                        </div>
                    </div>
                </Modal>
                : ''}
        </div>
    )
}