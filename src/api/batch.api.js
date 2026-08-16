import apiClient from './apiClient.js';

export const getBatches = async () => {
  const { data } = await apiClient.get('/batches');
  return data;
};

export const getAllBatches = async () => {
  const { data } = await apiClient.get('/batches/all');
  return data;
};

export const createBatch = async (payload) => {
  const { data } = await apiClient.post('/batches', payload);
  return data;
};

export const updateBatch = async (id, payload) => {
  const { data } = await apiClient.put(`/batches/${id}`, payload);
  return data;
};

export const deleteBatch = async (id) => {
  const { data } = await apiClient.delete(`/batches/${id}`);
  return data;
};
