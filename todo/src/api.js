import axios from 'axios';
import adminStore from './stores/adminStore';

const api = axios.create();


api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 404) {
      return Promise.reject(new Error('Запрашиваемый ресурс не найден'));
    }

    if ((error.response && error.response.status === 401) || (error.status === 401)) {
      adminStore.logout();
      window.location.href = '/login';
      return Promise.reject(new Error('Пользователь не авторизован'));
    }
    return Promise.reject(error);
  }
);


export default api;
