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
    Modal,
    FormFeedback,
} from 'reactstrap';

import { ProductApi, OrderApi } from '@/api';
import useToast from '@/utils/useToast';
import Pages404 from '@pages/Utility/pages-404';
import ImageSlider from '@/components/ImageSlider';
import LoadingScreen from '@/components/LoadingScreen';

const InputItem = ({ name, label, isMultiline, formik, rows }) => {
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
    const showToast = useToast();
    const [product, setProduct] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [newImage, setNewImage] = useState("");
    const [openImageModal, showImageModal] = useState(false);
    const isAdding = location.pathname.endsWith("add-product");
    const [isInvalid, setInvalid] = useState(id === "undefined" || id === "null");

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
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

        !(isInvalid || isAdding) && fetchProducts();
    }, []);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: Number(product?.id) || 0,
            name: product?.name || "",
            productUrl: product?.productUrl || 0,
            price: product?.price || "",
            images: product?.images || [],
            fullDescription: product?.fullDescription || "",
            asset3dUrl: product?.asset3dUrl || "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Please Enter Product Name"),
            productUrl: yup.string().required("Please Enter Product Key"),
            images: yup.array().min(1).required('Please Add Product Images'),
            fullDescription: yup.string().required('Please provide description'),
            asset3dUrl: yup.string().optional('Please provide description'),
            price: yup.number().min(0).required('Price should be greater than 0'),
        }),
        onSubmit: async (values) => {
            handleSave(values);
        }
    });

    const handleValidate = async () => {
        const errors = await formik.validateForm();
        const keys = Object.keys(errors);
        if (keys.length > 0) {
            showToast(errors[keys[0]], "error");
        }
    }

    const handleSave = async (values) => {
        try {
            if (isAdding) {
                await ProductApi.addProduct(values);
                showToast("Product was successfully added");

                navigate("/products");
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

    const handleAddImage = () => {
        formik.setFieldValue(
            "images",
            [...formik.values.images, newImage]
        );
        showImageModal(false);
    }

    const handleRemoveImage = (removeIndex) => {
        formik.setFieldValue(
            "images",
            formik.values.images.filter((_value, index) => index != removeIndex)
        );
    };

    const handleCancel = () => {
        navigate("/products");
    };

    const handleMint = async () => {
        let fee = 0;
        try {
            const _fee = await OrderApi.getOrderFee(product.productKey);
            fee = _fee.feeInUsd + _fee.insuranceFeeInUsd + _fee.commissionFeeInUsd;

            showToast("Fee was successfully fetched");
        } catch (error) {
            showToast("Get Fee failed: " + error.toString(), "error");
            return;
        };

        try {
            const dpp = String(Date.now());
            const order = {
                productInfo: product,
                consumerInfo: {
                    "email": "test2@ex.com",
                    "phone": "+0 000-000-0000",
                    "firstName": "Test",
                    "lastName": "User"
                },
                amount: Math.round(fee * 100),
                chain: "goerli",
                dpp: dpp,
                redeemCode: dpp,
            };

            await OrderApi.addOrder(order);

            showToast("Order was successfully");
        } catch (error) {
            showToast(error.toString(), "error");
            return;
        }
    }

    if (!isAdding && isInvalid) {
        return <Pages404 />
    } else if (isLoading) {
        return <LoadingScreen />
    }

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <div className="page-title-container mb-4">
                        <div className="me-2">
                            <h3 className="">{isAdding ? "Add a Product" : "Product Detail"}</h3>
                        </div>
                        <Button color="primary" onClick={() => showImageModal(true)}>
                            Add Image
                        </Button>
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
                        <ImageSlider images={formik.values.images || []} onRemove={handleRemoveImage} />
                        <InputItem name="name" label="Product Name" formik={formik} />
                        <InputItem name="fullDescription" label="Product Description" formik={formik} isMultiline={"true"} rows={7} />
                        <InputItem name="productUrl" label="Product URL" formik={formik} divider={true} horizontal={true} />
                        <InputItem name="price" label="Price" formik={formik} divider={true} horizontal={true} />
                        <InputItem name="asset3dUrl" label="3D Asset" formik={formik} divider={true} horizontal={true} />
                        <div className="d-flex justify-content-between gap-2">
                            <Button type="button" onClick={handleDelete} className="bg-danger border-0" color="secondary">
                                Delete
                            </Button>
                            <div className="d-flex gap-2">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleMint}
                                >
                                    Mint
                                </button>
                                <Button type="submit" color="primary" className="btn ">
                                    Save
                                </Button>
                                <Button type="button" onClick={handleCancel} color="secondary">
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </Form>

                    <Modal
                        className="modal-dialog-centered"
                        isOpen={openImageModal}
                        toggle={() => showImageModal(state => !state)}
                    >
                        <div className="modal-header">
                            Add a new image
                        </div>
                        <div className="modal-body">
                            <Label htmlFor="newImage">Product Image</Label>
                            <Input
                                id="newImage"
                                name="newImage"
                                className="form-control"
                                placeholder="Enter a product url here.."
                                onChange={(e) => setNewImage(e.target.value)}
                            />
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                onClick={() => showImageModal(state => !state)}
                                className="btn btn-secondary "
                                data-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleAddImage}
                            >
                                Add
                            </button>
                        </div>
                    </Modal>
                </Container>
            </div >
        </>
    );
};

export default ProductDetail;
