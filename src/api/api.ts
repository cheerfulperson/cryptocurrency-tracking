import axios from 'axios'

export const requestApi = axios.create({
    baseURL: process.env.SERVER_BASE_URL,
})
