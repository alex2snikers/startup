import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:9010',
});

export default instance

axios.interceptors.request.use(function (config) {
    console.warn('config', config);

    const token = localStorage.getItem('token');

    config.headers.Authorization = `Bearer ${token}`;
    config.baseURL = 'http://localhost:9010';

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
