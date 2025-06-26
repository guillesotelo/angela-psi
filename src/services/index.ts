import axios from 'axios';
import { dataObj, userType } from '../app/types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

// User
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

const createOrder = async (data: dataObj) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/order/create`, data)
        return res.data
    } catch (err) { console.error(err) }
}

const getOrderById = async (id: string) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/order/getById`, { params: { id }})
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
    getOrderById
}