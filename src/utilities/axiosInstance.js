import axios from 'axios';
import i18n from '../i18n';

const axiosInstance = axios.create({
  baseURL: 'https://football-challenge-backend.vercel.app/api/', // Your API base URL
});
axios.defaults.headers.common['Accept-Language'] = i18n.language
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Retrieve the stored token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach the token to the request header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;