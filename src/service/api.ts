import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
});

AxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('user');

        const accessToken = token && JSON.parse(token);

        if (accessToken) {
            if (config.headers) config.headers.token = accessToken;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default AxiosInstance;