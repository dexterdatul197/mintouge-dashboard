import axios from 'axios'

export const API_ENDPOINT = import.meta.env.VITE_APP_ENDPOINT || 'https://brand.api.mintouge.com';

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
export const apiGet = async ({ url, queryParams, hasToken = false }) => {
    const token = hasToken ? localStorage.getItem('accessToken') : undefined;


    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'no-cors');
    token && (headers.append('authorization', `Bearer ${token}`));

    try {
        const response = await axiosApi.get(url, {
            params: queryParams,
            headers,
            withCredentials: true,
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw Error(response.statusText);
        }
    } catch (error) {
        throw error;
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
export const apiPost = async ({ url, queryParams, bodyParam, hasToken = false }) => {
    const token = hasToken ? localStorage.getItem('accessToken') : undefined;

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'no-cors');
    token && (headers.append('authorization', `Bearer ${token}`));

    try {
        const response = await axiosApi.post(url, bodyParam, {
            params: queryParams,
            headers: headers,
            withCredentials: true,
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw Error(data.message);
        }
    } catch (error) {
        throw error;
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
export const apiPut = async ({ url, queryParams, bodyParam, hasToken = false }) => {
    const token = hasToken ? localStorage.getItem('accessToken') : undefined;

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'no-cors');
    token && (headers.append('authorization', `Bearer ${token}`));

    try {
        const response = await axiosApi.put(url, bodyParam, {
            params: queryParams,
            headers: headers,
            withCredentials: true,
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw Error(data.message);
        }
    } catch (error) {
        throw error;
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
export const apiDelete = async ({ url }) => {
    try {
        const response = await axiosApi.delete(url, {
            withCredentials: true,
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw Error(data.message);
        }
    } catch (error) {
        throw error;
    }
};
