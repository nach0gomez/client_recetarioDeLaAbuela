import axios from 'axios';
import { ACCESS_TOKEN } from '../constants';

const apiUsuario = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/auth/me',
});

apiUsuario.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default apiUsuario;
