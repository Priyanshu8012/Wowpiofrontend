import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api',
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
