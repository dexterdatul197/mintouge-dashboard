import { apiPost, apiGet, apiPut } from './baseApi';

/**
 *  Company Profile API
 *  update company profile.
 *  @param {object} info current company info
 */

export const updateCompany = async (info) => {
    const response = await apiPut({
        url: '/user/company',
        bodyParam: info
    });
    return response;
};