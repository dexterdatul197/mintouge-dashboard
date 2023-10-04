import { apiPost, apiGet, apiPut } from './baseApi';

/**
 *  Collection update API
 *  
 *  @param {object} info 
 */

export const updateCollection = async (id, info) => {
    const response = await apiPut({
        url: `/collection/${id}`,
        bodyParam: info
    });
    
    return response;
};

/**
 *  Collection Create API
 *  
 *  @param {object} info 
 */

export const createCollection = async (info) => {
    const response = await apiPost({
        url: '/collection',
        bodyParam: info
    });

    return response;
};
