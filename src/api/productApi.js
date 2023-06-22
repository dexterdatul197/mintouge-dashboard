import { apiGet, apiPost, API_ENDPOINT } from "./baseApi";
import { productsData } from "./mockData";

export const getProducts = async (page, pageSize) => {
    if (process.env.VITE_APP_MOCK_BACKEND) {
        return productsData;
    }

    try {
        const products = await apiGet({
            url: API_ENDPOINT + "/products",
            queryParams: { page, pageSize },
        });

        return products;
    } catch (error) {
        console.error('[Error] getProducts Failed.', error);
        throw error;
    }
};

export const getProductDetail = async (productId) => {
    if (process.env.VITE_APP_MOCK_BACKEND) {
        return productsData.find((_product) => _product.id === productId);
    }

    try {
        const product = await apiGet({
            url: API_ENDPOINT + "/products",
            queryParams: { productId },
            hasToken: false
        });

        return product;
    } catch (error) {
        console.error('[Error] getProduct Failed.', error);
        throw error;
    }
}

export const addProduct = async (product) => {
    if (process.env.VITE_APP_MOCK_BACKEND) {
        product.id = productsData[productsData.length-1].id + 1;
        productsData.push(product);

        return productsData[productsData.length-1];
    }

    try {
        const newProduct = await apiPost({
            url: API_ENDPOINT + "/products",
            bodyParam: { product },
            hasToken: true
        });

        return newProduct;
    } catch (error) {
        console.error('[Error] newProduct Failed.', error);
        throw error;
    }
}

