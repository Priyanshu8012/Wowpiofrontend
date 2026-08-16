import apiClient from './apiClient.js';

export const subscribeEmail = async (email, source = 'footer') => {
  const { data } = await apiClient.post('/subscribers', { email, source });
  return data;
};

export const getSubscribers = async (page = 1) => {
  const { data } = await apiClient.get(`/subscribers?page=${page}`);
  return data;
};

export const deleteSubscriber = async (id) => {
  const { data } = await apiClient.delete(`/subscribers/${id}`);
  return data;
};
