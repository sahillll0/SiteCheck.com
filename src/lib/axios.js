import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "https://site-check-apis-1y4fizc0n-sahillll0s-projects.vercel.app/api",
    withCredentials: true,
});
