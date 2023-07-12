import * as yup from 'yup';

import { Storage, GetStorageObject } from '@/utils';
import { productsData } from "./mockData";
import { apiGet, apiPost, API_ENDPOINT } from "./baseApi";

export const ProductModelValidator = yup.object().shape({
    id: yup.number().required('Product ID is missing'),
    brand: yup.string().required('Brand Name is invalid'),
    brandKey: yup.string().required('Brand Private Key should be string.'),
    productId: yup.number().required('Product ID is invalid'),
    name: yup.string().required('Product Name is invalid.'),
    price: yup.number().required('Product price is invalid'),
    discount: yup.number().optional('Product discount is invalid'),
    offerEnd: yup.date().optional('Product Offer Date is invalid'),
    madeAt: yup.date().optional('Product Made Date is missing'),
    rating: yup.number().optional('Product Rating is invalid'),
    saleCount: yup.number().required('Product Sales is invalid'),
    categoryId: yup.number().required('Product Sales is invalid'),
    tags: yup.string().optional('Brand Private Key should be string.'),
    variation: yup.array(yup.object({
        color: yup.string().required('Variation Color is invalid.'),
        image: yup.string().required('Variation Color is invalid.'),
    })).optional('Variation format is invalid'),

    image: yup.array(yup.string()).required('Product Images are not valid'),
    qrcode: yup.string().optional(),
    asset3dUrl: yup.string().optional(),
    productUrl: yup.string().required('Product URL is invalid'),
    shortDescription: yup.string().required('Short Description is invalid'),
    fullDescription: yup.string().required('Full Description is invalid'),
});

/**
 * This function validates the product response coming from backend.
 * 
 * @param {ProductModelValidator} product An product object or an array of products
 */
const productValidate = async (product) => {
    try {
        const validatedResponse = await ProductModelValidator.validate(product);
        console.log(validatedResponse);

        return validatedResponse;
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
export const getProducts = async (page, size = 15, apiKey) => {
    if (import.meta.env.VITE_APP_MOCK_BACKEND === "true") {
        return productsData;
    }

    const optedUser = GetStorageObject(Storage.OptedUser);
    const pubKey = optedUser ? optedUser.apiPublicKey : "";

    try {
        const data = await apiGet({
            url: API_ENDPOINT + "/product",
            queryParams: { page, size, pubKey },
        });

        await productValidate(data);

        return products;
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
    if (import.meta.env.VITE_APP_MOCK_BACKEND === "true") {
        return productsData.find((_product) => _product.id === productId);
    }

    try {
        const product = await apiGet({
            url: API_ENDPOINT + "/products",
            queryParams: { productId },
            hasToken: false
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
    if (import.meta.env.VITE_APP_MOCK_BACKEND === "true") {
        product.id = productsData[productsData.length - 1].id + 1;
        productsData.push(product);

        return productsData[productsData.length - 1];
    }

    try {
        const newProduct = await apiPost({
            url: API_ENDPOINT + "/products",
            bodyParam: { product },
            hasToken: true
        });

        await productValidate(newProduct);

        return newProduct;
    } catch (error) {
        console.error('[Error] newProduct Failed.', error);
        throw error;
    }
}