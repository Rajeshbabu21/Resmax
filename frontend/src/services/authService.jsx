import { apiRequest } from './api';

export const login = async (email, password) => {
    const details = {
        'username': email,
        'password': password
    };

    const formBody = Object.keys(details)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key]))
        .join('&');

    const data = await apiRequest('/user_login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody,
    });

    return data;
};

export const register = async (userData) => {
    const data = await apiRequest('/register_users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    return data;
};
