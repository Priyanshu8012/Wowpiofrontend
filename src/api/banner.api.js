import apiClient from './apiClient.js';

export const getPublicBanners = async () => {
    const { data } = await apiClient.get('/banner');
    return data;
};

export const getAllBanners = async () => {
    const { data } = await apiClient.get('/banner/all');
    return data;
};

export const createBanner = async (bannerData) => {
    const { data } = await apiClient.post('/banner', bannerData);
    return data;
};

export const updateBanner = async (id, bannerData) => {
    const { data } = await apiClient.put(`/banner/${id}`, bannerData);
    return data;
};

export const deleteBanner = async (id) => {
    const { data } = await apiClient.delete(`/banner/${id}`);
    return data;
};

export const reorderBanners = async (updates) => {
    const { data } = await apiClient.put('/banner/reorder/all', updates);
    return data;
};
