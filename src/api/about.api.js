import apiClient from './apiClient.js';

export const getAbout = async () => {
    const { data } = await apiClient.get('/about');
    return data;
};

export const updateAbout = async (aboutData) => {
    const { data } = await apiClient.put('/about', aboutData);
    return data;
};
