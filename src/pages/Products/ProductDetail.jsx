import * as yup from 'yup';
import { useFormik } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';
import {
    Button,
    Label,
    Input,
    Container,
    Form,
    FormFeedback,
} from 'reactstrap';

import Breadcrumbs from '@components/Breadcrumb';
import ImageSlider from '@/components/ImageSlider';


const InputItem = ({ name, label, isMultiline, formik, rows, horizontal, divider }) => {
    return (
        <div>
            <Label htmlFor={name}>{label}</Label>
            <Input
                id={name}
                name={name}
                type={isMultiline ? "textarea" : "text"}
                className="form-control"
                placeholder={label}
                rows={rows || 1}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[name] || ""}
                invalid={
                    formik.touched[name] && formik.errors[name]
                        ? true
                        : false
                }
            />

            {formik.touched[name] && formik.errors[name] ? (
                <FormFeedback type="invalid">
                    {formik.errors[name]}
                </FormFeedback>
            ) : null}
        </div>
    )
};

const ProductDetail = ({ product }) => {
    //meta title
    document.title = 'Product Details | Mintouge - Brands Dashboard';

    const formik = useFormik({
        initialValues: {
            name: product?.name || "",
            productKey: product?.productKey || "",
            images: product?.images || [],
            dpp: product?.dpp || "",
            fullDescription: product?.fullDescription || "",
            asset3dUrl: product?.asset3dUrl || "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Please Enter Product Name"),
            productKey: yup.string().required("Please Enter Product Key"),
            images: yup.array().min(1).required('Please Add Product Images'),
            dpp: yup.string().required('Please provide description'),
            fullDescription: yup.string().required('Please provide description'),
            asset3dUrl: yup.string().optional('Please provide description'),
        }),
        onSubmit: async (values) => {
            product ? onSaveProduct(values) : onAddProduct(values);
        }
    });

    const onAddProduct = (values) => {

    };

    const onSaveProduct = (values) => {

    };

    const handleDeleteProduct = () => {

    };

    const images = [
        "https://cdn-images.farfetch-contents.com/19/66/40/44/19664044_43931188_1000.jpg",
        "https://cdn-images.farfetch-contents.com/19/66/40/44/19664044_43932218_1000.jpg",
        "https://cdn-images.farfetch-contents.com/19/66/40/44/19664044_43932138_1000.jpg",
        "https://cdn-images.farfetch-contents.com/19/66/40/44/19664044_43931130_1000.jpg",
        "https://cdn-images.farfetch-contents.com/19/66/40/44/19664044_43932100_1000.jpg",
        "https://cdn-images.farfetch-contents.com/19/66/40/44/19664044_43932176_1000.jpg"
    ];

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Product" breadcrumbItem="Product Detail" />
                    <Form className="d-flex flex-column gap-4 mb-3" onSubmit={e => props.formik.handleSubmit()}>
                        <ImageSlider images={images} />
                        <InputItem name="name" label="Product Name" formik={formik} />
                        <InputItem name="fullDescription" label="Product Description" formik={formik} isMultiline={"true"} rows={7} />
                        <InputItem name="dpp" label="Digital Passport" formik={formik} divider={true} horizontal={true} />
                        <InputItem name="asset3dUrl" label="3D Asset" formik={formik} divider={true}  horizontal={true} />
                        <div className="d-flex justify-content-between gap-2">
                            <Button type="button" className="bg-danger border-0" color="secondary">
                                Delete
                            </Button>
                            <div className="d-flex gap-2">
                                <Button type="submit" color="primary" className="btn ">
                                    Save
                                </Button>
                                <Button type="button" color="secondary">
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

export default ProductDetail;
