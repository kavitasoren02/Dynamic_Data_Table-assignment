import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://dynamic-data-table-assignment.onrender.com"

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
})

export default apiClient