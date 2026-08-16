import apiClient from './apiClient.js';

export const loginAdmin = async (username, password) => {
    const { data } = await apiClient.post('/auth/login', { username, password });
    return data;
};

export const getMe = async () => {
    const { data } = await apiClient.get('/auth/me');
    return data;
};

export const changePassword = async (currentPassword, newPassword) => {
    const { data } = await apiClient.put('/auth/change-password', { currentPassword, newPassword });
    return data;
};

export const updateAdminProfile = async (profile) => {
    const { data } = await apiClient.put('/auth/profile', profile);
    return data;
};
