import axios from 'axios';
import adminStore from './stores/adminStore';

const api = axios.create();


api.interceptors.request.use((config) => {
    const accessToken = adminStore.accessToken;
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 404) {
            return Promise.reject(new Error('Запрашиваемый ресурс не найден'));
        }
        return Promise.reject(error);
    }
);


export default api;
