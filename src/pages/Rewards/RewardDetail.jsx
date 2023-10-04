import * as yup from 'yup';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import {
    Card,
    Form,
    Label,
    Modal,
    Input,
    Button,
    Container,
    UncontrolledTooltip,
} from 'reactstrap';
import Switch from 'react-switch';

import { RewardApi } from '@/api';
import { useProductsApi } from '@/store/productStore';
import useToast from '@/utils/useToast';
import Pages404 from '@pages/Utility/pages-404';
import InputItem from '@/components/InputItem';
import LoadingScreen from '@/components/LoadingScreen';
import DeletableChip from '@/components/DeletableChip';
import Preview from '@/components/Preview';

const ExpireItem = (props) => {
    const { formik } = props;

    return (
        <div className="d-flex flex-row align-items-center gap-3">
            <Label style={{ minWidth: "120px", maxWidth: "120px" }} >Expiration</Label>
            <div className="d-flex flex-column gap-3">
                <span className="d-flex flow-row align-items-center gap-1">
                    <InputItem name="eventFrom" type="date" formik={formik} disabled={!formik.values["hasExpire"]} />
                    -
                    <InputItem name="eventTo" type="date" formik={formik} disabled={!formik.values["hasExpire"]} />
                </span>
                <span className="d-flex flow-row align-items-center gap-1">
                    <Switch
                        uncheckedIcon={<div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                                fontSize: 12,
                                color: "#fff",
                                paddingRight: 2,
                            }}
                        >
                            {" "}
                            No
                        </div>}
                        checkedIcon={<div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                                fontSize: 12,
                                color: "#fff",
                                paddingRight: 2,
                            }}
                        >
                            {" "}
                            Yes
                        </div>}
                        onColor="#34c38f"
                        onChange={() => {
                            formik.setFieldValue("hasExpire", !formik.values["hasExpire"]);
                        }}
                        checked={formik.values["hasExpire"]}
                    />
                    <span>{`This reward has ${formik.values["hasExpire"] ? "" : "no"} expiration`}</span>
                </span>
            </div>
        </div>
    )
};

const ProductItem = (props) => {
    const { name, label, tooltip, formik } = props;
    const [selectedProducts, selectProducts] = useState(formik.values[name] || []);
    const [openProductModal, showProductModal] = useState(false);
    const { fetchProducts, products } = useProductsApi();

    useEffect(() => {
        !products.length && fetchProducts();
    }, []);

    useEffect(() => {
        selectProducts(formik.values[name]);
    }, [formik.values[name]]);

    const handleAdd = async (event) => {
        event.preventDefault();
        showProductModal(true);
    }

    const handleCancel = () => {
        selectProducts(() => formik.values[name] || []);
        showProductModal(false);
    };

    const handleConfirm = () => {
        formik.setFieldValue(name, selectedProducts);
        showProductModal(false);
    }

    const getProductName = (productId) => {
        const _products = products.filter(_product => _product.id === productId);
        if (_products.length > 0) {
            return _products[0]?.name;
        }

        return null;
    }

    const handleDeleteChip = (productId) => {
        const _selectedProducts = selectedProducts.filter(_productId => _productId !== productId);
        formik.setFieldValue(name, _selectedProducts);
        selectProducts(_selectedProducts);
    }

    return (
        <>
            <div className="d-flex flex-row align-items-center gap-3">
                <Label id="label" style={{ minWidth: "120px", maxWidth: "120px" }} htmlFor={name}>{label}</Label>
                <Card
                    id={name}
                    outline
                    color="primary"
                    className="border w-100 p-2 d-flex flex-row flex-wrap gap-1 mb-0"
                    onClick={handleAdd}
                    style={{ minHeight: "50px" }}
                >
                    {products.length > 0 && Array.isArray(selectedProducts) && selectedProducts.map(_productId => (
                        <DeletableChip
                            key={_productId}
                            label={getProductName(_productId)}
                            onDelete={(event) => { event.stopPropagation(); handleDeleteChip(_productId); }}
                        />
                    ))}
                </Card>
                <UncontrolledTooltip
                    placement="top"
                    target={name}
                    className="w-100"
                >
                    {tooltip}
                    You can choose to match the reward to a specific product.
                    Leaving the field blank will make the reward available on all products.
                </UncontrolledTooltip>
            </div >

            <Modal
                className="modal-dialog-centered"
                isOpen={openProductModal}
                toggle={() => showProductModal(false)}
            >
                <div className="modal-header" style={{ backgroundColor: "var(--bs-body-bg)" }}>
                    Select Products
                </div>
                <div className="modal-body" style={{ backgroundColor: "var(--bs-body-bg)" }}>
                    <table className="table align-middle table-nowrap mb-0">
                        <thead>
                            <tr style={{ borderColor: "lightgray" }}>
                                <th scope="col">
                                    Product
                                </th>
                                <th scope="col">
                                    Active
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map((row, index) => (
                                <tr
                                    key={row.id}
                                    style={(index > products.length - 2) ? {} : { borderColor: "lightgray" }}
                                >
                                    <td className="d-flex">
                                        <img
                                            src={row.images[0]}
                                            loading="lazy"
                                            height="50px"
                                            alt="Product Image"
                                            className="avatar-sm d-block rounded me-4 object-fit-cover"
                                            onError={(e) => {
                                                e.onerror = null;
                                                e.target.src = "https://cdn.vaultik.com/brand_dashboard/no_image.jpeg";
                                            }}
                                        />
                                        <span className="table-element underline text-primary">
                                            {row.name}
                                        </span>
                                    </td>
                                    <td>
                                        <Switch
                                            uncheckedIcon={<div />}
                                            checkedIcon={<div />}
                                            onColor="#34c38f"
                                            onChange={() => {
                                                if (!selectedProducts.includes(row.id)) {
                                                    selectProducts([...selectedProducts, row.id]);
                                                } else {
                                                    selectProducts(selectedProducts.filter(_productId => _productId !== row.id));
                                                }
                                            }}
                                            checked={selectedProducts.includes(row.id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="modal-footer" style={{ backgroundColor: "var(--bs-body-bg)" }}>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="btn btn-secondary "
                        data-dismiss="modal"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleConfirm}
                    >
                        OK
                    </button>
                </div>
            </Modal>
        </>
    )
};

const RewardDetail = () => {

    //meta title
    document.title = 'Reward Details | Vaultik - Brands Dashboard';

    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const showToast = useToast();
    const [reward, setReward] = useState({});
    const [isLoading, setLoading] = useState(false);
    const isAdding = location.pathname.endsWith("add-reward");
    const [isInvalid, setInvalid] = useState(id === "undefined" || id === "null");

    useEffect(() => {
        const fetchRewards = async () => {
            setLoading(true);
            try {
                const _reward = await RewardApi.getRewardDetail(id);
                setReward(_reward);
                formik.handleReset();
                setLoading(false);
            } catch (error) {
                showToast(error.toString(), "error");
                setInvalid(true);
                setLoading(false);
            }
        }

        !(isInvalid || isAdding) && fetchRewards();
    }, []);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: Number(reward?.id) || 0,
            title: reward?.title || "",
            category: reward?.category || "",
            discount: reward?.discount || 0,
            isActive: reward?.isActive || true,
            videoLink: reward?.videoLink || "",
            cta: reward?.cta || "",
            description: reward?.description || "",
            coverUrl: reward?.coverUrl || "",
            coverImage: reward?.coverImage || "",
            rewardCode: reward?.rewardCode || "",
            eventFrom: reward?.eventFrom?.split('T')[0] || new Date().toISOString().split('T')[0],
            eventTo: reward?.eventTo?.split('T')[0] || new Date().toISOString().split('T')[0],
            hasExpire: reward?.hasExpire || false,
            triggerProductIds: reward?.triggerProductIds || [],
            applyToProductIds: reward?.applyToProductIds || [],
        },
        validationSchema: yup.object({
            isActive: yup.boolean()
                .required('isActive type is invalid.'),
            title: yup.string()
                .required('Please type Title.'),
            category: yup.string()
                .required('Please select Category.'),
            discount: yup.number().min(0.01).max(99.9)
                .required('Please type Discount.'),
            videoLink: yup.string()
                .optional('Reward URL is invalid'),
            cta: yup.string()
                .optional('Reward Images are not valid.'),
            description: yup.string()
                .required('Please type Description.'),
            coverUrl: yup.string()
                .optional('Please type cover url'),
            coverImage: yup.string()
                .optional('Please upload Cover Image.'),
            eventFrom: yup.date()
                .optional('Asset 3D URL is invalid'),
            eventTo: yup.date()
                .optional('Asset 3D URL is invalid'),
            hasExpire: yup.boolean()
                .required('Expiration flag should be set'),
            triggerProductIds: yup.array(yup.number())
                .required('Products should not be null'),
            applyToProductIds: yup.array(yup.number())
                .required('Rewarding Products should not be null'),
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
                await RewardApi.addReward(values);
                showToast("Reward was successfully added");

                navigate("/rewards");
            } else {
                await RewardApi.updateReward(values);
                showToast("Reward was successfully updated.");
            }
        } catch (error) {
            showToast(error.toString(), "error");
        }
    };

    const handleDelete = async () => {
        try {
            await RewardApi.deleteReward(id);
            showToast("Reward was successfully deleted");

            navigate("/rewards");
        } catch (error) {
            showToast(error.toString(), "error");
        }
    };

    const onFileUpload = (selectedFile) => {
        formik.setFieldValue("coverImage", selectedFile);
    };

    const handleCancel = () => {
        navigate("/rewards");
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
                    <div className="page-title-container mb-4">
                        <div className="me-2">
                            <h3 className="">{isAdding ? "Create a new Reward" : "Reward Detail"}</h3>
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
                        <InputItem name="title" label="Title" formik={formik} />
                        <InputItem name="category" label="Category" formik={formik} type="select" >
                            <option></option>
                            <option>Discount</option>
                            <option>Presale</option>
                            <option>Event</option>
                            <option>General</option>
                        </InputItem>
                        <InputItem name="discount" label="Discount(%)" type="number" disabled={formik.values["category"] !== "Discount"} formik={formik} />
                        <InputItem name="videoLink" label="Video Link" type="url" isOptional={true} formik={formik} />
                        <InputItem name="cta" label="External Link" type="url" isOptional={true} formik={formik} />
                        <InputItem name="description" label="Description" formik={formik} type="textarea" rows={7} />
                        <InputItem 
                            type="file" 
                            name="coverImage" 
                            label="Cover Image" 
                            onFileUpload={onFileUpload} 
                            formik={formik} 
                            startAdornment={
                                <React.Fragment>
                                    <Input
                                        name="coverImage"
                                        type="text"
                                        className="form-control"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values["coverImage"]}
                                        invalid={
                                            formik.values["coverImage"]
                                               ? false
                                               : true
                                        }
                                    />
                                    <span>or</span>
                                </React.Fragment>
                            }    
                        />
                        <Preview
                            file={formik.values["coverImage"]}
                        />
                        {/* <InputItem name="coverImage" label="Cover Image" type="file" additionalText="at least 1200 x 830px" onFileUpload={onFileUpload} formik={formik} /> */}
                        <InputItem name="rewardCode" label="Unique Code" isOptional={true} formik={formik} />
                        <ExpireItem formik={formik} />
                        <ProductItem name="triggerProductIds" label="Trigger Products" formik={formik} />
                        <ProductItem name="applyToProductIds" label="Apply To" formik={formik} />
                        <div className="d-flex justify-content-between gap-2">
                            <Button type="button" onClick={handleDelete} className="bg-danger border-0" color="secondary">
                                Delete
                            </Button>
                            <div className="d-flex gap-2">
                                <Button type="submit" color="primary" className="btn ">
                                    {isAdding ? "Add" : "Save"}
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

export default RewardDetail;
