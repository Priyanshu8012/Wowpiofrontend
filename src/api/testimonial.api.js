import apiClient from './apiClient.js';

export const getTestimonials = async () => {
    const { data } = await apiClient.get('/testimonials');
    return data;
};

export const createTestimonial = async (testimonialData) => {
    const { data } = await apiClient.post('/testimonials', testimonialData);
    return data;
};

export const updateTestimonial = async (id, testimonialData) => {
    const { data } = await apiClient.put(`/testimonials/${id}`, testimonialData);
    return data;
};

export const deleteTestimonial = async (id) => {
    const { data } = await apiClient.delete(`/testimonials/${id}`);
    return data;
};
