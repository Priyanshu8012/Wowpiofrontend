import apiClient from './apiClient.js';

export const submitChatEnquiry = async (payload) => {
  const { data } = await apiClient.post('/chat-enquiries', payload);
  return data;
};

export const getChatEnquiries = async (page = 1) => {
  const { data } = await apiClient.get(`/chat-enquiries?page=${page}`);
  return data;
};

export const getChatEnquiryUnreadCount = async () => {
  const { data } = await apiClient.get('/chat-enquiries/unread-count');
  return data?.count ?? 0;
};

export const markChatEnquiryRead = async (id) => {
  const { data } = await apiClient.put(`/chat-enquiries/${id}/read`);
  return data;
};

export const deleteChatEnquiry = async (id) => {
  const { data } = await apiClient.delete(`/chat-enquiries/${id}`);
  return data;
};
