import axios from 'axios';
import { API_ORIGIN } from '../config/api.js';

const apiClient = axios.create({
    baseURL: `${API_ORIGIN}/api`,
});

// Interceptor to add JWT token from localStorage
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('wowpio_admin_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
