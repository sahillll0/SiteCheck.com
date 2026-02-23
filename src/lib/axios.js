import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "https://site-check-apis.vercel.app/api",
    withCredentials: true,
});
