import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || (import.meta.env.MODE === "development" ? "http://localhost:8001/api" : "/api"),
    withCredentials: true,
});
