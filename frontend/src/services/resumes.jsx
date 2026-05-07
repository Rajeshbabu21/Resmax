import { apiRequest } from './api';

export const saveResumeDraft = async (draftPayload) => {
    return apiRequest('/save_resume_draft', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(draftPayload)
    });
};
