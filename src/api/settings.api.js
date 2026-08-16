import apiClient from './apiClient.js';

export const getSettings = async () => {
    const { data } = await apiClient.get('/settings');
    return data;
};

export const updateSettings = async (settingsData) => {
    const { data } = await apiClient.put('/settings', settingsData);
    return data;
};
