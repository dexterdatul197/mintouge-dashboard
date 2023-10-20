import * as yup from 'yup';
import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import {
    Form,
    Button,
    Container,
} from 'reactstrap';

import { EmailApi, OrderApi } from '@/api';
import useToast from '@/utils/useToast';
import InputItem from '@/components/InputItem';
import ProductItem from '@/components/ProductItem';
import { useProducts } from '@/store/productStore';

const SalesFront = () => {

    //meta title
    const isDev = import.meta.env.VITE_ENV === "production";
    document.title = 'Sales Front | Vaultik - Brands Dashboard';

    const showToast = useToast();
    const [isLoading, setLoading] = useState(false);
    const { products, fetchProducts } = useProducts();

    useEffect(() => {
        !products.length && fetchProducts();
    }, []);

    const mintNFTs = async (values) => {
        if (isLoading) return;

        const { firstName, lastName, phone, email, productIds } = values;

        setLoading(true);
        try {
            // Mint NFTs
            const templateData = {
                "invoiceNumber": `#invoice-${String(Date.now()).split('').reverse().join('')}`,
                "date": (new Date()).toLocaleDateString(),
                "products": []
            };
            let index  = 0;
            for (const productId of productIds) {
                const dpp = Date.now();
                formik.setFieldValue("dpp", dpp);
                
                const _product = products.find(item => item.id === productId);
                if (!_product) {
                    showToast("Could not find Product:", productId);
                    continue;
                }
                const order = {
                    productInfo: { productKey: _product.productKey },
                    consumerInfo: { email, phone, firstName, lastName, },
                    chain: isDev ? "goerli" : "polygon",
                    dpp: String(dpp+index),
                    redeemCode: String(dpp+index),
                };

                await OrderApi.addOrder(order);

                templateData["products"].push({
                    "name": _product.name,
                    "count": 1,
                    "price": "$" + _product.price.toLocaleString("en-US"),
                    "dpp": (dpp+index)
                });

                index++;
            }

            // Send Email
            const options = {
                from: "noreply@vaultik.com",
                to: email,
                templateId: import.meta.env.VITE_SENDGRID_TEMPLATE_ID,
                dynamic_template_data: templateData
            };
            await EmailApi.sendEmail(JSON.stringify(options));

            setLoading(false);
            showToast("Digital Product Passport is stored as an NFT.");
        } catch (error) {
            showToast(error.toString(), "error");
            setLoading(false);
        }
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            dpp: "",
            productIds: [],
        },
        validationSchema: yup.object({
            email: yup
                .string()
                .email('Invalid email format')
                .required('Email is required'),
            phone: yup
                .string()
                .matches(/^\+*(?:\d{1,4}[-.()\s]?)(?:\d{1,5}[-.()\s]?)(?:\d{1,6}[-.()\s]?)\d{1,10}$/, 'Invalid Phone number format')
                .required('Phone number is required'),
            firstName: yup
                .string()
                .min(1, 'First name must be at least 1 character')
                .max(50, 'First name cannot exceed 50 characters')
                .matches(/^[A-Za-z]+$/, 'First name must contain only letters')
                .required('First name is required'),
            lastName: yup
                .string()
                .min(1, 'Last name must be at least 1 character')
                .max(50, 'Last name cannot exceed 50 characters')
                .matches(/^[A-Za-z]+$/, 'Last name must contain only letters')
                .required('Last name is required'),
            dpp: yup
                .string()
                .matches(/^(?:\d{6}|\d{13})$/, 'DPP should be 6 or 13 digits'),
            productIds: yup
                .array()
                .min(1, 'Please select product'),
        }),
        onSubmit: async (values) => {
            mintNFTs(values);
        }
    });

    const handleValidate = async () => {
        const errors = await formik.validateForm();
        const keys = Object.keys(errors);
        if (keys.length > 0) {
            showToast(errors[keys[0]], "error");
        }
    }

    const handleCancel = () => {

    };

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <div className="page-title-container mb-4">
                        <div className="me-2">
                            <h3 className="">Sales Front</h3>
                        </div>
                    </div>
                    <Form
                        className="d-flex flex-column gap-4 mb-3"
                        onSubmit={(e) => {
                            e.preventDefault();
                            formik.handleSubmit();
                            handleValidate();
                            return false;
                        }}
                    >
                        <InputItem name="firstName" label="First Name" formik={formik} />
                        <InputItem name="lastName" label="last Name" formik={formik} />
                        <InputItem name="phone" label="Phone" formik={formik} />
                        <InputItem name="email" label="Email" formik={formik} />
                        <InputItem name="dpp" label="DPP" formik={formik} disabled
                            startAdornment={<>
                                <Button color="primary" className="btn" onClick={() => formik.setFieldValue("dpp", String(Date.now()))}>
                                    Generate
                                </Button>
                            </>}
                        />
                        <ProductItem name="productIds" label="Products" formik={formik} />
                        <div className="d-flex justify-content-between gap-2">
                            <div />
                            <div className="d-flex gap-2">
                                <Button type="submit" color="primary" className="btn " style={{minWidth: 80}}>
                                    {isLoading ? "Minting..." : "Submit"}
                                </Button>
                                <Button type="button" onClick={handleCancel} color="secondary">
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </Form>

                </Container>
            </div >
        </>
    );
};

export default SalesFront;
