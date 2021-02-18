import axios from 'axios';

export const configurateInterceptors = () => {
    axios.interceptors.request.use(function (config) {
        const token = localStorage.getItem('token');

        config.headers.Authorization = `Bearer ${token}`;
        config.baseURL = 'http://localhost:9010';

        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });
}