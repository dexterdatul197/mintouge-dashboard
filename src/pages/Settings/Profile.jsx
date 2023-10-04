import * as yup from 'yup';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Form,
    Input,
    Button,
    Container,
} from 'reactstrap';

import { CompanyApi, MediaApi, CollectionApi, AuthApi } from '@/api';
import useToast from '@/utils/useToast';
import InputItem from '@/components/InputItem';
import LoadingScreen from '@/components/LoadingScreen';
import Preview from '@/components/Preview';
import { SetStorageObject, GetStorageObject, Storage } from '@/utils';

const Profile = () => {

    //meta title
    document.title = 'Profile | Vaultik - Brands Dashboard';

    const showToast = useToast();
    const navigate = useNavigate();
    const brand = GetStorageObject(Storage.OptedUser);
    const profile = brand.company;
    const [isLoading, setLoading] = useState(false);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            companyName: brand?.brandName || "",
            companyLogo: brand?.logoUrl || "",
            companySmallLogo: brand?.smallLogoUrl || "",
            address: profile?.address || "",
            address2: profile?.address2 || "",
            city: profile?.city || "",
            zipcode: profile?.zipcode || "",
            country: profile?.country || "",
            vat: profile?.vat || "",
            invoiceEmail: profile?.invoiceEmail || "",
            contactNumber: profile?.contactNumer || "",
        },
        validationSchema: yup.object({
            companyName: yup.string()
                .required('Please type Company Name.'),
            companyLogo: yup.string()
                .required('Please type Company Logo.'),
            companySmallLogo: yup.string()
                .required('Please type Company Logo.'),
            address: yup.string()
                .optional('Please type Address.'),
            city: yup.string()
                .optional('Please type City'),
            zipcode: yup.string()
                .optional('Please type Zipcode.'),
            country: yup.string()
                .optional('Please select Country.'),
            vat: yup.string()
                .optional('Please type VAT Number'),
            invoiceEmail: yup.string()
                .optional('Please type invoicing Email'),
            contactNumber: yup.string()
                .optional('Please type Contact Number'),
        }),
        onSubmit: async (values) => {
            try {
                setLoading(true);

                // Update Company
                const _profile = {
                    ...values
                };

                if (_profile.invoiceEmail.trim() === "") {
                    delete _profile.invoiceEmail;
                }

                await CompanyApi.updateCompany(_profile);

                // Update Collection
                const payload = {
                    "name": values.companyName,
                    "description": values.companyName,
                    "image": values.companySmallLogo,
                    "chain": "goerli"
                };

                let newCollection = {};
                if (brand?.collections && brand?.collections?.length >= 1) {
                    const collection = brand.collections[0];
                    newCollection = await CollectionApi.updateCollection(collection.id, {
                        ...collection,
                        ...payload,
                    });
                    brand.collections[0] = newCollection;
                } else {
                    newCollection = await CollectionApi.createCollection(payload);
                    brand.collections.push(newCollection);
                }

                // Update Brand
                await AuthApi.updateBrand({
                    "email": brand.email,
                    "brandName": values.companyName,
                    "logoUrl": values.companyLogo,
                    "smallLogoUrl": values.companySmallLogo,
                    "firstName": brand.firstName,
                    "lastName": brand.lastName,
                    "phone": brand.phone,
                    "address": brand.address,
                });

                // Update LocalStorage
                SetStorageObject(Storage.OptedUser, {
                    ...brand,
                    "brandName": values.companyName,
                    "logoUrl": values.companyLogo,
                    "smallLogoUrl": values.companySmallLogo,
                });

                showToast("Profile was successfully updated.");
                setLoading(false);
            } catch (err) {
                showToast("Profile update failed", "error");
                setLoading(false);
            }
        }
    });

    const handleValidate = async () => {
        const errors = await formik.validateForm();
        const keys = Object.keys(errors);
        if (keys.length > 0) {
            showToast(errors[keys[0]], "error");
        }
    }

    const onLogoUpload = async (selectedFile) => {
        const logoLink = await MediaApi.uploadFile(selectedFile, { img: { path: "", filename: "" } });
        formik.setFieldValue("companyLogo", logoLink.path);
    };

    const onSmallLogoUpload = async (selectedFile) => {
        const logoLink = await MediaApi.uploadFile(selectedFile, { img: { path: "", filename: "" } });
        formik.setFieldValue("companySmallLogo", logoLink.path);
    };

    const handleCancel = () => {
        navigate("/");
    };

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <div className="page-title-container mb-4">
                        <div className="me-2">
                            <h3 className="">Profile</h3>
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
                        <InputItem name="companyName" label="Company Name" formik={formik} />
                        <InputItem
                            type="file"
                            name="companyLogo"
                            label="Company Logo"
                            onFileUpload={onLogoUpload}
                            formik={formik}
                            startAdornment={
                                <React.Fragment>
                                    <Input
                                        name="companyLogo"
                                        type="text"
                                        className="form-control"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values["companyLogo"]}
                                        invalid={
                                            formik.values["companyLogo"]
                                                ? false
                                                : true
                                        }
                                    />
                                    <span>or</span>
                                </React.Fragment>
                            }
                        />
                        <Preview file={formik.values["companyLogo"]} />

                        <InputItem
                            type="file"
                            name="companySmallLogo"
                            label="Small Logo"
                            onFileUpload={onSmallLogoUpload}
                            formik={formik}
                            startAdornment={
                                <React.Fragment>
                                    <Input
                                        name="companySmallLogo"
                                        type="text"
                                        className="form-control"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values["companySmallLogo"]}
                                        invalid={
                                            formik.values["companySmallLogo"]
                                                ? false
                                                : true
                                        }
                                    />
                                    <span>or</span>
                                </React.Fragment>
                            }
                        />
                        <Preview file={formik.values["companySmallLogo"]} />
                        <InputItem name="address" label="Address Line" isOptional={true} formik={formik} />
                        <InputItem name="address2" label="Address Line2" isOptional={true} formik={formik} />
                        <InputItem name="city" label="City" isOptional={true} formik={formik} />
                        <InputItem name="zipcode" label="Zip Code" isOptional={true} formik={formik} />
                        <InputItem name="country" label="Country" isOptional={true} formik={formik} type="select" >
                            <option></option>
                            <option>United Kingdom</option>
                            <option>Germany</option>
                            <option>United States</option>
                        </InputItem>
                        <InputItem name="invoiceEmail" label="Invoice Email" isOptional={true} formik={formik} />
                        <InputItem name="contactNumber" label="Contact Number" isOptional={true} formik={formik} />
                        {/* <InputItem name="coverImage" label="Cover Image" type="file" additionalText="at least 1200 x 830px" onFileUpload={onFileUpload} formik={formik} /> */}
                        <div className="d-flex justify-content-end gap-2">
                            <div className="d-flex gap-2">
                                <Button type="submit" color="primary" className="btn" disabled={isLoading}>
                                    {
                                        isLoading ?
                                            <LoadingScreen styles={{ width: '100%', maxHeight: '10px' }} /> :
                                            "Save"
                                    }
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

export default Profile;
