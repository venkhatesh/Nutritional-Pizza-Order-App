import axios from "axios";
import { API_BASE_URL } from "../config";
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if(token){
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return PromiseRejectionEvent.reject(error);
    }
);

export default axiosInstance;