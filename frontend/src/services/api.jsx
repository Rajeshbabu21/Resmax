import { API_BASE_URL } from '../config/env';

export const apiRequest = async (endpoint, options = {}) => {
    const defaultHeaders = {};

    const token = localStorage.getItem('access_token');
    if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const fetchOptions = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, fetchOptions);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.detail || data.message || `Request failed with status ${response.status}`);
        }

        return data;
    } catch (error) {
        throw error;
    }
};
