import * as yup from 'yup';

import { Storage, GetStorageObject } from '@/utils';
import { apiGet, apiPost, apiPut, apiDelete } from './baseApi';

export const initialProduct = {
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

export const ProductModelValidator = yup.object().shape({
    id: yup.number().required('Product ID is missing'),
    name: yup.string().required('Product Name is invalid.'),
    price: yup.number().required('Product price is invalid'),
    productUrl: yup.string().required('Product URL is invalid'),
    images: yup.array(yup.string()).required('Product Images are not valid'),
    fullDescription: yup.string().required('Full Description is invalid'),
    productKey: yup.string().required('Product ID is invalid'),
    madeAt: yup.date().required('Product Made Date is missing'),
    asset3dUrl: yup.string().nullable().optional('Asset 3D URL is invalid'),

    // brand: yup.string().required('Brand Name is invalid'),
    // brandKey: yup.string().required('Brand Private Key should be string.'),
    // discount: yup.number().nullable().optional('Product discount is invalid'),
    // offerEnd: yup.date().nullable().optional('Product Offer Date is invalid'),
    // rating: yup.number().nullable().nullable().optional('Product Rating is invalid'),
    // saleCount: yup.number().required('Product Sales is invalid'),
    // categoryId: yup.number().required('Product Sales is invalid'),
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
 * @param {ProductModelValidator} product An product object or an array of products
 */
const productValidate = async (products) => {
    try {
        if (Array.isArray(products)) {
            for (let product of products) {
                await ProductModelValidator.validate(product);
            }
        } else {
            await ProductModelValidator.validate(products);
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
export const getProducts = async (page = 0, size = 15, apiKey) => {
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
        console.error('[Error] getProducts Failed.', error);
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
export const getProductDetail = async (productId) => {
    try {
        const product = await apiGet({
            url: `/product/${productId}`,
        });

        await productValidate(product);

        return product;
    } catch (error) {
        console.error('[Error] getProduct Failed.', error);
        throw error;
    }
}

/**
 * Add a product to backend database and return the added on.
 * 
 * @param {ProductModel} product A product object
 * @returns An added object. Undefined if failed.
 */
export const addProduct = async (product) => {
    try {
        product = { 
            ...initialProduct,
            productKey: String(Date.now()),
            ...product,
        };
        const newProduct = await apiPost({
            url: '/product',
            bodyParam: product,
        });

        await productValidate(newProduct);

        return newProduct;
    } catch (error) {
        console.error('[Error] newProduct Failed.', error);
        throw error;
    }
}

/**
 * Updated a product to backend database and return the updated on.
 * 
 * @param {ProductModel} product A product object
 * @returns An updated object. Undefined if failed.
 */
export const updateProduct = async (product) => {
    try {
        product = { 
            ...initialProduct,
            ...product,
        };
        const updatedProduct = await apiPut({
            url: `/product/${product.id}`,
            bodyParam: product,
        });

        return updatedProduct;
    } catch (error) {
        console.error('[Error] updateProduct Failed.', error);
        throw error;
    }
}

/**
 * Delete a product from backend database and return the deleted on.
 * 
 * @param {id} productId A product id
 */
export const deleteProduct = async (productId) => {
    try {
        await apiDelete({
            url: `/product/${productId}`,
        });
    } catch (error) {
        console.error('[Error] Delete Product Failed.', error);
        throw error;
    }
}