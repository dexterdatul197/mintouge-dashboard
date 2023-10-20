import * as yup from 'yup';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import {
    Form,
    Label,
    Input,
    Button,
    Container,
} from 'reactstrap';
import Switch from 'react-switch';

import { RewardApi } from '@/api';
import useToast from '@/utils/useToast';
import Pages404 from '@pages/Utility/pages-404';
import InputItem from '@/components/InputItem';
import ProductItem from '@/components/ProductItem';
import LoadingScreen from '@/components/LoadingScreen';
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
            discount: yup.number().min(0).max(100)
                .optional('Please type Discount.'),
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
