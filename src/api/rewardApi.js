import * as yup from 'yup';

import { Storage, GetStorageObject } from '@/utils';
import { apiGet, apiPost, apiPut, apiDelete } from './baseApi';

export const initialReward = {
    brand: '',
    productKey: '',
    name: '',
    price: 0,
    discount: 0,
    offerEnd: new Date(),
    madeAt: new Date(),
    rating: 5,
    categoryId: 0,
    tags: [''],
    variation: [],
    images: [''],
    qrcode: '',
    productUrl: '',
    shortDescription: '',
    fullDescription: ''
};

export const RewardModelValidator = yup.object().shape({
    id: yup.number().required('Reward ID is missing'),
    name: yup.string().required('Reward Name is invalid.'),
    price: yup.number().required('Reward price is invalid'),
    productUrl: yup.string().required('Reward URL is invalid'),
    images: yup.array(yup.string()).required('Reward Images are not valid'),
    fullDescription: yup.string().required('Full Description is invalid'),
    productKey: yup.string().required('Reward ID is invalid'),
    madeAt: yup.date().required('Reward Made Date is missing'),
    asset3dUrl: yup.string().nullable().optional('Asset 3D URL is invalid'),

    // brand: yup.string().required('Brand Name is invalid'),
    // brandKey: yup.string().required('Brand Private Key should be string.'),
    // discount: yup.number().nullable().optional('Reward discount is invalid'),
    // offerEnd: yup.date().nullable().optional('Reward Offer Date is invalid'),
    // rating: yup.number().nullable().nullable().optional('Reward Rating is invalid'),
    // saleCount: yup.number().required('Reward Sales is invalid'),
    // categoryId: yup.number().required('Reward Sales is invalid'),
    // tags: yup.array(yup.string()).optional('Brand Private Key should be string.'),
    // variation: yup.array(yup.object({
    //     color: yup.string().required('Variation Color is invalid.'),
    //     image: yup.string().required('Variation Color is invalid.'),
    // })).optional('Variation format is invalid'),

    // qrcode: yup.string().nullable().optional(),
    // shortDescription: yup.string().nullable().nullable().optional('Short Description is invalid'),
});

/**
 * This function validates the product response coming from backend.
 * 
 * @param {RewardModelValidator} product An product object or an array of products
 */
const productValidate = async (products) => {
    try {
        if (Array.isArray(products)) {
            for (let product of products) {
                await RewardModelValidator.validate(product);
            }
        } else {
            await RewardModelValidator.validate(products);
        }
    } catch (validationError) {
        console.error(validationError);
        throw validationError;
    }
}

/**
 * Get paginationized products from backend.
 * 
 * There are 2 ways of getting products from backend.
 * One is to use access_token given when logged in.
 * Another one is to use API_PRIVATE_KEY as a token.
 * As we send access_token by default in baseApi, we follow first one.
 * 
 * @param {number} page Page Number starting from 0
 * @param {number} pageSize Page Size. default is 15.
 * @returns An array of products
 */
export const getRewards = async (page = 0, size = 15, apiKey) => {
    const optedUser = GetStorageObject(Storage.OptedUser);
    const pubKey = optedUser ? optedUser.apiPublicKey : '';

    try {
        const response = await apiGet({
            url: '/product',
            queryParams: { page, size, pubKey },
        });

        await productValidate(response.data);

        return response;
    } catch (error) {
        console.error('[Error] getRewards Failed.', error);
        throw error;
    }
};

/**
 * Get a specific product based on product id.
 * 
 * if return value is undefined, it will show 404 Not Found Page.
 * 
 * @param {number} productId ID of the selected product
 * @returns An object to describe details
 */
export const getRewardDetail = async (productId) => {
    try {
        const product = await apiGet({
            url: `/product/${productId}`,
        });

        await productValidate(product);

        return product;
    } catch (error) {
        console.error('[Error] getReward Failed.', error);
        throw error;
    }
}

/**
 * Add a product to backend database and return the added on.
 * 
 * @param {RewardModel} product A product object
 * @returns An added object. Undefined if failed.
 */
export const addReward = async (product) => {
    try {
        product = { 
            ...initialReward,
            productKey: String(Date.now()),
            ...product,
        };
        const newReward = await apiPost({
            url: '/product',
            bodyParam: product,
        });

        await productValidate(newReward);

        return newReward;
    } catch (error) {
        console.error('[Error] newReward Failed.', error);
        throw error;
    }
}

/**
 * Updated a product to backend database and return the updated on.
 * 
 * @param {RewardModel} product A product object
 * @returns An updated object. Undefined if failed.
 */
export const updateReward = async (product) => {
    try {
        product = { 
            ...initialReward,
            ...product,
        };
        const updatedReward = await apiPut({
            url: `/product/${product.id}`,
            bodyParam: product,
        });

        return updatedReward;
    } catch (error) {
        console.error('[Error] updateReward Failed.', error);
        throw error;
    }
}

/**
 * Delete a product from backend database and return the deleted on.
 * 
 * @param {id} productId A product id
 */
export const deleteReward = async (productId) => {
    try {
        await apiDelete({
            url: `/product/${productId}`,
        });
    } catch (error) {
        console.error('[Error] Delete Reward Failed.', error);
        throw error;
    }
}