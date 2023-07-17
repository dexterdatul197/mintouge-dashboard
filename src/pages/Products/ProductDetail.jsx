import * as yup from 'yup';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import {
    Button,
    Label,
    Input,
    Container,
    Form,
    FormFeedback,
} from 'reactstrap';

import { ProductApi } from '@/api';
import useToast from '@/utils/useToast';
import Pages404 from '@pages/Utility/pages-404';
import Breadcrumbs from '@components/Breadcrumb';
import ImageSlider from '@/components/ImageSlider';
import LoadingScreen from '@/components/LoadingScreen';

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

const ProductDetail = (props) => {
    //meta title
    document.title = 'Product Details | Mintouge - Brands Dashboard';

    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [product, setProduct] = useState({});
    const [isLoading, setLoading] = useState(true);
    const isAdding = location.pathname.endsWith("add-product");
    const [isInvalid, setInvalid] = useState(id === "undefined" || id === "null");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const _product = await ProductApi.getProductDetail(id);
                setProduct(_product);
                formik.handleReset();
                setLoading(false);
            } catch (error) {
                showToast(error.toString(), "error");
                setInvalid(true);
                setLoading(false);
            }
        }

        !isInvalid && fetchProducts();
    }, []);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: Number(product?.id) || 0,
            name: product?.name || "",
            productKey: product?.productKey || "",
            images: product?.images || [],
            fullDescription: product?.fullDescription || "",
            asset3dUrl: product?.asset3dUrl || "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Please Enter Product Name"),
            productKey: yup.string().required("Please Enter Product Key"),
            images: yup.array().min(1).required('Please Add Product Images'),
            fullDescription: yup.string().required('Please provide description'),
            asset3dUrl: yup.string().optional('Please provide description'),
        }),
        onSubmit: async (values) => {
            handleSave(values);
        }
    });

    const handleSave = async (values) => {
        try {
            if (isAdding) {
                await ProductApi.addProduct(values);
                showToast("Product was successfully added");
            } else {
                await ProductApi.updateProduct(values);
                showToast("Product was successfully updated.");
            }
        } catch (error) {
            showToast(error.toString(), "error");
        }
    };

    const handleDelete = async () => {
        try {
            await ProductApi.deleteProduct(id);
            showToast("Product was successfully deleted");

            navigate("/products");
        } catch (error) {
            showToast(error.toString(), "error");
        }
    };

    const handleCancel = () => {
        navigate("/products");
    };

    if (!isAdding && isInvalid) {
        return <Pages404 />
    } else if (isLoading) {
        return <LoadingScreen />
    }

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Product" breadcrumbItem="Product Detail" />
                    <Form
                        className="d-flex flex-column gap-4 mb-3"
                        onSubmit={(e) => {
                            e.preventDefault();
                            formik.handleSubmit();
                            return false;
                        }}
                    >
                        <ImageSlider images={product.images || []} />
                        <InputItem name="name" label="Product Name" formik={formik} />
                        <InputItem name="fullDescription" label="Product Description" formik={formik} isMultiline={"true"} rows={7} />
                        <InputItem name="productKey" label="Digital Passport" formik={formik} divider={true} horizontal={true} />
                        <InputItem name="asset3dUrl" label="3D Asset" formik={formik} divider={true} horizontal={true} />
                        <div className="d-flex justify-content-between gap-2">
                            <Button type="button" onClick={handleDelete} className="bg-danger border-0" color="secondary">
                                Delete
                            </Button>
                            <div className="d-flex gap-2">
                                <Button type="submit" color="primary" className="btn ">
                                    Save
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

export default ProductDetail;
