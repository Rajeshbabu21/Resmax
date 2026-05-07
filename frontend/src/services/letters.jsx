import { apiRequest } from './api';

export const getUserResumes = async () => {
    return await apiRequest('/get_user_resumes', {
        method: 'GET',
    });
};


export const generateEmailDraft = async (data) => {
    return await apiRequest('/generate_email_draft', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
};

export const generateCoverLetter = async (data) => {
    return await apiRequest('/generate_cover_letter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
};
