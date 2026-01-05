import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Modified to use Template Literal
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
