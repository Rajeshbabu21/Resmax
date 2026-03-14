import { apiRequest } from './api';

export const getProfile = async () => {
    const data = await apiRequest('/getprofile', {
        method: 'GET',
    });
    // console.log(data);
    return data;
};