import apiClient from './apiClient.js';

export const getGalleryItems = async () => {
    const { data } = await apiClient.get('/gallery');
    return data;
};

export const createGalleryItem = async (itemData) => {
    const { data } = await apiClient.post('/gallery', itemData);
    return data;
};

export const updateGalleryItem = async (id, itemData) => {
    const { data } = await apiClient.put(`/gallery/${id}`, itemData);
    return data;
};

export const deleteGalleryItem = async (id) => {
    const { data } = await apiClient.delete(`/gallery/${id}`);
    return data;
};
