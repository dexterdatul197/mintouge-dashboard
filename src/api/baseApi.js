import axios from 'axios'
import { Storage, GetStorageObject } from '@/utils';

export const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'https://brand.api.vaultik.com';

const axiosApi = axios.create({
    baseURL: API_ENDPOINT
});

/**
 * HTTP Request using GET method
 * 
 * @param {string} url A url endpoint
 * @param {string} queryParams Query Params 
 * @param {string} hasToken A flag to indicate if it is a public api or private
 * 
 * @returns HTTP Request Response
 */
export const apiGet = async ({ url, queryParams, hasToken = true }) => {
    const token = GetStorageObject(Storage.OptedUser)?.token;
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'no-cors',
        'Authorization': `Bearer ${token}`
    };
    if (!hasToken) {
        delete headers.Authorization;
    }

    try {
        const response = await axiosApi.get(url, {
            params: queryParams,
            headers,
            withCredentials: true,
        });

        if (response.status < 300) {
            return response.data;
        } else {
            throw Error(response.statusText);
        }
    } catch (error) {
        throw error?.response?.data?.message;
    }
};

/**
 * HTTP Request using POST method
 * 
 * @param {string} url A url endpoint
 * @param {string} queryParams Query Params 
 * @param {string} bodyParam Body Params 
 * @param {string} hasToken A flag to indicate if it is a public api or private
 * 
 * @returns HTTP Request Response
 */
export const apiPost = async ({ url, queryParams, bodyParam, hasToken = true }) => {
    const token = GetStorageObject(Storage.OptedUser)?.token;
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'no-cors',
        'Authorization': `Bearer ${token}`
    };
    if (!hasToken) {
        delete headers.Authorization;
    }

    try {
        const response = await axiosApi.post(url, bodyParam, {
            params: queryParams,
            headers: headers,
            withCredentials: true,
        });

        if (response.status < 300) {
            return response.data;
        } else {
            throw Error(data.message);
        }
    } catch (error) {
        throw error?.response?.data?.message;
    }
};


/**
 * HTTP Request using POST method
 * 
 * @param {string} url A url endpoint
 * @param {string} queryParams Query Params 
 * @param {string} bodyParam Body Params 
 * @param {string} hasToken A flag to indicate if it is a public api or private
 * 
 * @returns HTTP Request Response
 */
export const apiPut = async ({ url, queryParams, bodyParam, hasToken = true }) => {
    const token = GetStorageObject(Storage.OptedUser)?.token;
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'no-cors',
        'Authorization': `Bearer ${token}`
    };
    if (!hasToken) {
        delete headers.Authorization;
    }

    try {
        const response = await axiosApi.put(url, bodyParam, {
            params: queryParams,
            headers: headers,
            withCredentials: true,
        });

        if (response.status < 300) {
            return response.data;
        } else {
            throw Error(data.message);
        }
    } catch (error) {
        throw error?.response?.data?.message;
    }
};


/**
 * HTTP Request using POST method
 * 
 * @param {string} url A url endpoint
 * @param {string} queryParams Query Params 
 * @param {string} bodyParam Body Params 
 * @param {string} hasToken A flag to indicate if it is a public api or private
 * 
 * @returns HTTP Request Response
 */
export const apiDelete = async ({ url, hasToken = true }) => {
    const token = GetStorageObject(Storage.OptedUser)?.token;
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'no-cors',
        'Authorization': `Bearer ${token}`
    };
    if (!hasToken) {
        delete headers.Authorization;
    }

    try {
        const response = await axiosApi.delete(url, {
            headers: headers,
            withCredentials: true,
        });

        if (response.status < 300) {
            return response.data;
        } else {
            throw Error(data.message);
        }
    } catch (error) {
        throw error?.response?.data?.message;
    }
};
