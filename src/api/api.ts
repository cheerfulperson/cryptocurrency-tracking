import axios from 'axios'

console.log(process.env.SERVER_BASE_URL)

export const requestApi = axios.create({
    baseURL: process.env.SERVER_BASE_URL,
})
