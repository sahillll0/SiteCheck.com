import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://site-check-api.vercel.app/api",
    withCredentials: true,
});
