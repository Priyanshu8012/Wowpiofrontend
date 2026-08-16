import apiClient from './apiClient.js';

export const submitContact = async (contactData) => {
    const { data } = await apiClient.post('/contact', contactData);
    return data;
};

export const getMessages = async (page = 1) => {
    const { data } = await apiClient.get(`/contact?page=${page}`);
    return data;
};

export const getUnreadCount = async () => {
    const { data } = await apiClient.get('/contact/unread-count');
    return data?.count ?? 0;
};

export const markAsRead = async (id) => {
    const { data } = await apiClient.put(`/contact/${id}/read`);
    return data;
};

export const deleteMessage = async (id) => {
    const { data } = await apiClient.delete(`/contact/${id}`);
    return data;
};
