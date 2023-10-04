import { useState, useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';

import { ProductApi } from '@/api';
import useToast from '@/utils/useToast';

const productsState = atom({
    key: 'productsStateKey',
    default: [],
});

export const useProducts = (fetchOnStart = true, isForce = false) => {
    const showToast = useToast();
    const [isLoading, setLoading] = useState(false);
    const [product, setProduct] = useState({});
    const [products, setProducts] = useRecoilState(productsState);

    const fetchProduct = async (id) => {
        // Look for products first.
        const foundProduct = products.find((_product) => _product.id === id);
        if (foundProduct) {
            return foundProduct;
        }

        // if doesn't exist, look for others.
        setLoading(true);
        try {
            const _product = await ProductApi.getProductDetail(id);
            setProduct(_product)
            setLoading(false);
        } catch (error) {
            showToast(error.toString(), "error");
            setLoading(false);
        }
    }

    const addProduct = async (product) => {
        try {
            await ProductApi.addProduct(product);
            setProducts([...products, product]);
        } catch (error) {
            throw error;
        }
    }

    const updateProduct = async (product) => {
        try {
            await ProductApi.updateProduct(product);
            setProducts(products.map(_product => (
                _product.id === product.id ? product : _product
            )));
        } catch (error) {
            throw error;
        }
    }

    const deleteProduct = async (id) => {
        try {
            await ProductApi.deleteProduct(id);
            setProducts(products.filter(_product => _product.id !== product.id));
        } catch (error) {
            throw error;
        }
    }

    const fetchProducts = async (page) => {
        setLoading(true);

        try {
            const _data = await ProductApi.getProducts(page);
            setProducts(_data.data);
            setLoading(false);
        } catch (error) {
            showToast(error.toString(), "error");
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isForce) {
            fetchProducts();
        }
        if (fetchOnStart && orders.length === 0) {
            fetchProducts();
        }
    }, []);

    return {
        product,
        setProduct,
        fetchProduct,
        addProduct,
        updateProduct,
        deleteProduct,

        products,
        setProducts,
        fetchProducts,

        isLoading,
        setLoading,
    };
}
