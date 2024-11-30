import axios from 'axios';

const api = axios.create();

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
