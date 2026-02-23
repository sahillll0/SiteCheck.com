import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || (import.meta.env.MODE === "development" ? "https://site-check-api.vercel.app/api" : "/api"),
    withCredentials: true,
});
