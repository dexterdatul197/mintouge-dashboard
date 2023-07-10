export const API_ENDPOINT = import.meta.env.VITE_APP_ENDPOINT || 'http://localhost:3000';

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
    const token = hasToken ? localStorage.getItem('accessToken') : undefined;
    if (!url.endsWith('/') && !url.endsWith('\\')) {
        url += '/';
    }

    const queryString = !queryParams ? '' : Object.keys(queryParams)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');

    try {
    const response = await fetch(
        url + queryString,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token ? `Bearer ${token}` : undefined
            },
        }
    );

    if (response.ok) {
        const data = await response.json();

        return data;
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
export const apiPost = async ({ url, queryParams, bodyParam, hasToken = true }) => {
    const token = hasToken ? localStorage.getItem('accessToken') : undefined;

    if (!url.endsWith('/') && !url.endsWith('\\')) {
        url += '/';
    }

    const queryString = !queryParams ? '' : Object.keys(queryParams)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');

    try {
        const response = await fetch(
            url + queryString,
            {
                method: 'POST',
                body: bodyParam,
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token ? `Bearer ${token}` : undefined
                },
            }
        );

        if (response.ok) {
            const data = await response.json();

            return data;
        } else {
            throw Error(response.statusText);
        }
    } catch (error) {
        throw error;
    }
};