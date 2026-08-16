import apiClient from './apiClient.js';

export const getAnnouncement = async () => {
  const { data } = await apiClient.get('/announcement');
  return data;
};

export const getAnnouncementAdmin = async () => {
  const { data } = await apiClient.get('/announcement/admin');
  return data;
};

export const updateAnnouncement = async (payload) => {
  const { data } = await apiClient.put('/announcement', payload);
  return data;
};
