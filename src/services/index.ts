import axios from 'axios';
import { dataObj, userType } from '../app/types';

const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASE_URL : ''

// USER
const loginUser = async (data: userType) => {
    try {
        const user = await axios.post(`${BASE_URL}/api/user/login`, data, { withCredentials: true })
        const localUser = JSON.parse(localStorage.getItem('user') || '{}')
        localStorage.setItem('user', JSON.stringify({
            ...localUser,
            ...user.data
        }))
        return user.data
    } catch (err) { console.error(err) }
}

const verifyToken = async (token?: string) => {
    try {
        const verify = await axios.post(`${BASE_URL}/api/user/verify`, {}, { withCredentials: true, params: { token } })
        return verify.data || false
    } catch (err) { return false }
}

const registerUser = async (data: userType) => {
    try {
        const newUser = await axios.post(`${BASE_URL}/api/user/create`, data, { withCredentials: true })
        return newUser.data
    } catch (err) { console.error(err) }
}

const updateUser = async (data: userType, token?: string) => {
    try {
        const user = await axios.post(`${BASE_URL}/api/user/update`, data, { withCredentials: true, params: { token } })
        const localUser = JSON.parse(localStorage.getItem('user') || '{}')
        localStorage.setItem('user', JSON.stringify({
            ...localUser,
            ...user.data
        }))
        return user.data
    } catch (err) { console.error(err) }
}

const logOut = async () => {
    try {
        const loggedOut = await axios.post(`${BASE_URL}/api/user/logout`, {}, { withCredentials: true })
        return loggedOut.data
    } catch (err) { return false }
}

// SERVICES
const getAllServices = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/api/service/getAll`)
        return res.data
    } catch (err) { console.error(err) }
}

const getServiceById = async (_id: string) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/service/getById`, { params: { _id } })
        return res.data
    } catch (err) { console.error(err) }
}

const getServiceBySlug = async (slug: string) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/service/getBySlug`, { params: { slug } })
        return res.data
    } catch (err) { console.error(err) }
}

const createService = async (data: dataObj, token?: string) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/service/create`, data, { withCredentials: true, params: { token } })
        return res.data
    } catch (err) { console.error(err) }
}

const updateService = async (data: dataObj, token?: string) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/service/update`, data, { withCredentials: true, params: { token } })
        return res.data
    } catch (err) { console.error(err) }
}

const deleteService = async (data: dataObj, token?: string) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/service/remove`, data, { withCredentials: true, params: { token } })
        return res.data
    } catch (err) { console.error(err) }
}

// BOOKINGS
const getAllBookings = async (token?: string) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/order/getAll`, { withCredentials: true, params: { token } })
        return res.data
    } catch (err) { console.error(err) }
}

const createOrder = async (data: dataObj, token?: string) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/order/create`, data, { withCredentials: true, params: { token } })
        return res.data
    } catch (err) { console.error(err) }
}

const getOrderById = async (_id: string) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/order/getById`, { params: { _id } })
        return res.data
    } catch (err) { console.error(err) }
}

const updateBooking = async (data: dataObj, token?: string) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/order/update`, data, { withCredentials: true, params: { token } })
        return res.data
    } catch (err) { console.error(err) }
}

const deleteOrder = async (data: dataObj, token?: string) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/order/remove`, data, { withCredentials: true, params: { token } })
        return res.data
    } catch (err) { console.error(err) }
}

export {
    loginUser,
    verifyToken,
    registerUser,
    updateUser,
    logOut,

    createOrder,
    deleteOrder,
    getOrderById,
    updateBooking,
    getAllBookings,

    getAllServices,
    getServiceById,
    getServiceBySlug,
    createService,
    updateService,
    deleteService,

}