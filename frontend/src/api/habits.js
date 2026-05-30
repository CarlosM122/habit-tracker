import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const authHeader = (token) => ({
    headers: { Authorization: `Bearer ${token}` }
});

export const getHabits = async (token) => {
    const response = await axios.get(`${API_URL}/api/habits`, authHeader(token));
    return response.data;
};

export const createHabit = async (token, name, description) => {
    const response = await axios.post(
        `${API_URL}/api/habits`,
        { name, description },
        authHeader(token)
    );
    return response.data;
};

export const completeHabit = async (token, id) => {
    const response = await axios.post(
        `${API_URL}/api/habits/${id}/complete`,
        {},
        authHeader(token)
    );
    return response.data;
};

export const deleteHabit = async (token, id) => {
    await axios.delete(`${API_URL}/api/habits/${id}`, authHeader(token));
};