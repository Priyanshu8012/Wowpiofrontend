import apiClient from './apiClient.js';

export const getHeroData = async () => {
    const { data } = await apiClient.get('/hero');
    return data;
};

export const updateHeroData = async (heroData) => {
    const { data } = await apiClient.put('/hero', heroData);
    return data;
};
