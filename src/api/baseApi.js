export const API_ENDPOINT = import.meta.env.VITE_APP_ENDPOINT || 'http://localhost:3000/';

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

    const queryString = !queryParams ? '' : '?' + Object.keys(queryParams)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
        .join('&');

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'no-cors');
    token && (headers.append('authorization', `Bearer ${token}`));
    
    try {
        const response = await fetch(
            url + queryString,
            {
                method: 'GET',
                headers,
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
export const apiPost = async ({ url, queryParams, bodyParam, hasToken = false }) => {
    const token = hasToken ? localStorage.getItem('accessToken') : undefined;

    const queryString = !queryParams ? '' : '?' + Object.keys(queryParams)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
        .join('&');

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    token && (headers.append('authorization', `Bearer ${token}`));

    try {
        const response = await fetch(
            url + queryString,
            {
                method: 'POST',
                body: JSON.stringify(bodyParam),
                headers: headers,
            }
        );

        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw Error(data.message);
        }
    } catch (error) {
        throw error;
    }
};