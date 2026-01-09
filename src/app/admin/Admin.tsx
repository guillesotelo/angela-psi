'use client'

import { useContext, useEffect, useRef, useState } from "react"
import DataTable from "src/components/DataTable/DataTable"
import Modal from "src/components/Modal/Modal"
import { bookingHeaders, COUNTRIES, serviceHeaders } from "src/constants"
import { createOrder, createService, deleteOrder, deleteService, getAllBookings, getAllServices, updateBooking, updateService } from "src/services"
import { dataObj } from "../types"
import { convertToBase64, createSlug, getDate, getPrice, getUser } from "src/helpers"
import toast from "react-hot-toast"
import InputField from "src/components/InputField/InputField"
import Dropdown from "src/components/Dropdown/Dropdown"
import Calendar, { TileDisabledFunc } from "react-calendar"
import Button from "src/components/Button/Button"
import imageCompression from 'browser-image-compression';
import Switch from "src/components/Switch/Switch"
import { Calendar as EventCalendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment';
import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { AppContext } from "../context/AppContext"
import { useRouter } from "next/navigation"
import TextData from "src/components/TextData/TextData"

export default function Admin() {
    const [bookings, setBookings] = useState<dataObj[]>([])
    const [services, setServices] = useState([])
    const [selectedBooking, setSelectedBooking] = useState(-1)
    const [selectedService, setSelectedService] = useState(-1)
    const [booking, setBooking] = useState<null | dataObj>(null)
    const [service, setService] = useState<null | dataObj>(null)
    const [loading, setLoading] = useState(false)
    const [openCalendar, setOpenCalendar] = useState(false)
    const [view, setView] = useState<any>(Views.MONTH)
    const [calendarDate, setCalendarDate] = useState<any>(null)
    const imageUrlRef = useRef<HTMLInputElement | null>(null)
    const localizer = momentLocalizer(moment)
    const { isLoggedIn } = useContext(AppContext)
    const router = useRouter()

    useEffect(() => {
        if (isLoggedIn === false) router.push('/')
        getBookings(true)
        getServices(true)
    }, [])

    useEffect(() => {
        if (selectedBooking !== -1) setBooking(bookings[selectedBooking])
        else setBooking(null)
    }, [selectedBooking])

    useEffect(() => {
        if (selectedService !== -1) setService(services[selectedService])
        else setService(null)
    }, [selectedService])

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

    const getServices = async (load = false) => {
        try {
            setLoading(load)
            const _services = await getAllServices()
            if (_services && _services.length) setServices(_services)
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
                const saved = selectedBooking !== -1 ? await updateBooking(booking, getUser().token)
                    : await createOrder(booking, getUser().token)
                if (saved && saved._id) {
                    toast.success('Cita guardada con exito!')
                    await getBookings()
                    cancel()
                }
                else toast.error('Error al guardar cita. Prueba nuevamente')
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
                    cancel()
                }
                else toast.error('Error al eliminar la cita. Prueba nuevamente')
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }

    const saveService = async () => {
        try {
            setLoading(true)
            if (service) {
                const serviceData = {
                    ...service,
                    slug: createSlug(service.title)
                }
                const saved = selectedService !== -1 ? await updateService(serviceData, getUser().token)
                    : await createService(serviceData, getUser().token)

                if (saved && saved._id) {
                    toast.success('Servicio guardado con exito!')
                    await getServices()
                    cancel()
                }
                else toast.error('Error al guardar servicio. Prueba nuevamente')
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }

    const removeService = async () => {
        try {
            setLoading(true)
            if (service) {
                const deleted = await deleteService(service, getUser().token)
                if (deleted) {
                    setSelectedService(-1)
                    toast.success('Servicio eliminado!')
                    await getServices()
                    cancel()
                }
                else toast.error('Error al eliminar el servicio. Prueba nuevamente')
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }

    const updateBookingData = (key: string, e: any) => {
        setBooking(prev => ({ ...prev, [key]: e.target.value }))
    }

    const updateServiceData = (key: string, e: any) => {
        setService(prev => ({ ...prev, [key]: e.target.value }))
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
        updateBookingData('date', { target: { value: date } })
        setOpenCalendar(false)
    }

    const cancel = () => {
        setSelectedBooking(-1)
        setSelectedService(-1)
        setService(null)
        setBooking(null)
    }

    const uploadImage = async (e: any) => {
        if (e.target.files) {
            const file = e.target.files[0]
            const compressOptions = {
                maxSizeMB: 0.45,
                maxWidthOrHeight: 1000,
                useWebWorker: true
            }

            const compressedFile = await imageCompression(file, compressOptions)
            const base64 = await convertToBase64(compressedFile)

            setService(prev => ({
                ...prev,
                image: String(base64)
            }))
        }
    }

    const getCalendarEvents = () => {
        let bookingEvents: dataObj[] = []
        bookings.forEach(booking => {
            bookingEvents.push({
                ...booking,
                // id: booking._id,
                title: `${booking.title} - ${booking.name} ${booking.lastName}`,
                start: moment(booking.date).toDate(),
                end: moment(booking.date).add(booking.duration || 60, 'minutes').toDate()
            })
        })
        return bookingEvents
    }


    const handleSelectBooking = (booking: dataObj) => {
        setBooking(booking)
    }

    const handleSelectSlot = (booking: dataObj) => {
        const { start, end } = booking
        if (start) setCalendarDate(start)
        setBooking({
            date: start,
            start,
            end,
            new: true
        })
    }

    const messages = {
        allDay: 'Todo el día',
        previous: '◄ Anterior',
        next: 'Siguiente ►',
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
        day: 'Día',
        date: 'Fecha',
        time: 'Hora',
        event: 'Turno',
        noEventsInRange: 'No hay citas en este rango',
    }

    const disablePastDays = (date: Date) => {
        const isPastDay = new Date(date).getTime() - new Date().getTime() < 0
        const day = date.getDay() // 0 = Sunday, 6 = Saturday
        return !isPastDay
    }


    const getPriceWithDiscounts = () => {
        const { priceEUR, discounts, discountsApply, country, quantity } = service || {}
        let discountApplies = false
        let price = Number(priceEUR)

        if (country && discountsApply) {
            discountApplies = discountsApply.toLowerCase().includes(country.toLowerCase())
                || discountsApply.toLowerCase().includes('todos')
        }

        if (discounts && discounts.includes('50% en la segunda hora') && quantity > 1) {
            price = Number(priceEUR) * quantity * .75
            if (quantity > 2) {
                // All regular price but one (the second hour)
                price = Number(priceEUR) * (quantity - 1) + Number(priceEUR) * .5
            } else {
                // One regular price + 50% on the second
                price = Number(priceEUR) + Number(priceEUR) * .5
            }
        }
        return getPrice(price) || '-'
    }

    return (
        <div className="admin__container">
            <h1 style={{ filter: booking || service ? 'blur(4px)' : '' }}>Admin Panel</h1>
            <EventCalendar
                localizer={localizer}
                events={getCalendarEvents()}
                startAccessor="start"
                endAccessor="end"
                defaultDate={new Date()}
                views={["day", "agenda", "week", "month"]}
                view={view}
                date={calendarDate}
                selectable
                defaultView="month"
                style={{
                    height: "70vh",
                    width: '60vw',
                    zIndex: 0,
                    marginBottom: '5rem',
                    filter: booking || service ? 'blur(5px)' : ''
                }}
                onSelectEvent={handleSelectBooking}
                onSelectSlot={handleSelectSlot}
                min={new Date(0, 0, 0, 8, 0, 0)}
                max={new Date(0, 0, 0, 21, 0, 0)}
                messages={messages}
                onView={(view) => setView(view)}
                onNavigate={(d) => setCalendarDate(new Date(d))}
                dayPropGetter={(d) => {
                    return disablePastDays(d) ? {} :
                        (getDate(new Date()) === getDate(d)) ?
                            { className: "rbc-day-bg-today" }
                            :
                            {
                                className: "rbc-off-range-bg",
                                style: { backgroundColor: "#f0f0f0", pointerEvents: "none" }
                            }
                }}
            />
            <DataTable
                title="Citas"
                tableData={bookings}
                tableHeaders={bookingHeaders}
                setSelected={setSelectedBooking}
                selected={selectedBooking}
                loading={loading}
                style={{ filter: booking || service ? 'blur(4px)' : '' }}
                orderDataBy={bookingHeaders[0]}
                max={15}
            />
            <br />
            <DataTable
                title="Servicios"
                tableData={services}
                tableHeaders={serviceHeaders}
                setSelected={setSelectedService}
                selected={selectedService}
                loading={loading}
                style={{ filter: booking || service ? 'blur(4px)' : '' }}
                orderDataBy={serviceHeaders[0]}
                max={15}
            />
            {service ?
                <Modal
                    title={`${service.title}`}
                    subtitle={service.subtitle || ''}
                    onClose={cancel}
                    style={{ minHeight: '70vh', minWidth: '40vw' }}>
                    <div className="admin__modal-content">
                        <div className="service__form" style={{ height: '60vh', justifyContent: 'space-between' }}>
                            <div className="service__form-row">
                                <InputField
                                    label="Título"
                                    name="title"
                                    value={service.title || ''}
                                    updateData={updateServiceData} />
                                <InputField
                                    label="Subtítulo"
                                    name="subtitle"
                                    value={service.subtitle || ''}
                                    updateData={updateServiceData} />
                                <Dropdown
                                    label="Tipo de descuento"
                                    options={['Privada', 'Grupal']}
                                    value={service.type}
                                    selected={service.type}
                                    setSelected={value => updateServiceData('type', { target: { value } })}
                                    maxHeight="15vh" />
                            </div>
                            <div className="service__form-row">
                                <InputField
                                    label="Descripción"
                                    name="description"
                                    value={service.description || ''}
                                    updateData={updateServiceData}
                                    type="textarea"
                                    rows={6} />
                            </div>
                            <div className="service__form-row">
                                <InputField
                                    label="Precio en €"
                                    name="priceEUR"
                                    updateData={updateServiceData}
                                    value={service.priceEUR || ''}
                                    style={{ width: '8rem' }} />
                                <Switch
                                    label="Reservas múltiples"
                                    on="Si"
                                    off="No"
                                    value={service.bulkBook}
                                    setValue={value => updateServiceData('bulkBook', { target: { value } })} />
                                <Dropdown
                                    label="Tipo de descuento"
                                    options={['Sin descuento', '50% en la segunda hora']}
                                    value={service.discounts}
                                    selected={service.discounts}
                                    setSelected={value => updateServiceData('discounts', { target: { value } })}
                                    maxHeight="15vh"
                                    style={{ minWidth: '10rem' }} />
                                <Dropdown
                                    label="Descuento aplica para"
                                    options={['Todos', 'Colombia', 'España']}
                                    value={service.discountsApply || 'Todos'}
                                    selected={service.discountsApply || 'Todos'}
                                    setSelected={value => updateServiceData('discountsApply', { target: { value } })}
                                    maxHeight="15vh"
                                    style={{ minWidth: '10rem' }} />
                                <Switch
                                    label="Activo"
                                    on="Si"
                                    off="No"
                                    value={service.active}
                                    setValue={value => updateServiceData('active', { target: { value } })} />
                            </div>
                            <p style={{ fontSize: '.8rem', fontStyle: 'italic', margin: 0 }}>Nota: Los descuentos para residentes colombianos se aplican automáticamente y no es necesario configurar ningún descuento aquí.</p>
                            {/* <TextData label="Precio con descuento" value={getPriceWithDiscounts()} /> */}
                            <div style={{ border: '1px solid lightgray', padding: '1rem', width: 'fit-content', borderRadius: '.5rem' }}>
                                <p style={{ margin: '0 0 .5rem 0', fontSize: '.8rem', color: '#696869' }}>Imagen</p>
                                <div className="service__form-row">
                                    <div style={{ display: 'flex' }}>
                                        {service.image ? <img src={service.image} alt="Image" style={{ height: '8rem', marginRight: '1rem' }} /> : ''}
                                        <input ref={imageUrlRef} type='file' accept='image/*' onChange={uploadImage} />
                                    </div>
                                </div>
                            </div>
                            <div className="service__form-row" style={{ marginTop: '2rem' }}>
                                <Button
                                    label="Cancelar"
                                    handleClick={cancel}
                                    bgColor="gray"
                                    disabled={loading}
                                    textColor="#fff" />
                                <Button
                                    label="Eliminar"
                                    handleClick={removeService}
                                    bgColor="#a24d4d"
                                    disabled={loading}
                                    textColor="#fff" />
                                <Button
                                    label="Guardar cambios"
                                    handleClick={saveService}
                                    disabled={loading}
                                    textColor="#fff" />
                            </div>
                        </div>
                    </div>
                </Modal>
                : ''}
            {booking ?
                <Modal
                    title={`${booking.name} ${booking.lastName}`}
                    subtitle={booking.title}
                    onClose={cancel}>
                    <div className="admin__modal-content">
                        <div className="service__form">
                            <div className="service__form-row">
                                <InputField
                                    label="Nombre(s)"
                                    name="name"
                                    value={booking.name || ''}
                                    updateData={updateBookingData} />
                                <InputField
                                    label="Apellido"
                                    name="lastName"
                                    value={booking.lastName || ''}
                                    updateData={updateBookingData} />
                            </div>
                            <div className="service__form-row">
                                <InputField
                                    label="Email"
                                    name="email"
                                    value={booking.email || ''}
                                    updateData={updateBookingData} />
                                <InputField
                                    label="Teléfono"
                                    name="phone"
                                    value={booking.phone || ''}
                                    updateData={updateBookingData} />
                            </div>
                            <div className="service__form-row">
                                <InputField
                                    label="Edad"
                                    name="age"
                                    updateData={updateBookingData}
                                    type="number"
                                    value={booking.age || ''}
                                    style={{ width: '5rem' }} />
                                <Dropdown
                                    label="País de residencia"
                                    options={COUNTRIES.map(c => c.name)}
                                    value={booking.country}
                                    selected={booking.country}
                                    setSelected={value => updateBookingData('country', { target: { value } })}
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
                                        bgColor="#3c758a"
                                        textColor="#fff"
                                        style={{ height: '2.5rem', margin: '0 1rem' }}
                                        disabled={loading}
                                    />}
                                <Switch
                                    label="Pagado"
                                    on="Si"
                                    off="No"
                                    value={booking.isPaid}
                                    setValue={value => updateBookingData('isPaid', { target: { value } })}
                                />
                            </div>
                            <div className="service__form-row" style={{ marginTop: '2rem' }}>
                                <Button
                                    label="Cancelar"
                                    handleClick={cancel}
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