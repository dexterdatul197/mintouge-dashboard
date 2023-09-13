import * as yup from 'yup';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Form,
    Button,
    Container,
} from 'reactstrap';

import { RewardApi } from '@/api';
import useToast from '@/utils/useToast';
import Pages404 from '@pages/Utility/pages-404';
import InputItem from '@/components/InputItem';
import LoadingScreen from '@/components/LoadingScreen';

const Profile = () => {

    //meta title
    document.title = 'Profile | Vaultik - Brands Dashboard';

    const showToast = useToast();
    const navigate = useNavigate();
    const [profile, setProfile] = useState({});
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {

    }, []);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            companyName: profile?.companyName || "LuxDemoStore",
            companyLogo: profile?.companyLogo || "https://cdn.vaultik.com/mini-web/assets/store_logo.svg",
            address: profile?.address || "51 Provost Street",
            address2: profile?.address2 || "",
            city: profile?.city || "London",
            zipcode: profile?.zipcode || "N1 7FD",
            country: profile?.country || "United Kingdom",
            vat: profile?.vat || "-",
            invoiceEmail: profile?.invoiceEmail || "pietro@vaultik.com",
            contactNumer: profile?.contactNumer || "+44.7584771060",
        },
        validationSchema: yup.object({
            companyName: yup.string()
                .required('Please type Company Name.'),
            companyLogo: yup.string()
                .required('Please type Company Logo.'),
            address: yup.string()
                .required('Please type Address.'),
            city: yup.string()
                .required('Please type City'),
            zipcode: yup.string()
                .required('Please type Zipcode.'),
            country: yup.string()
                .required('Please select Country.'),
            vat: yup.string()
                .required('Please type VAT Number'),
            invoiceEmail: yup.string()
                .required('Please type invoicing Email'),
            contactNumer: yup.string()
                .required('Please type Contact Number'),
        }),
        onSubmit: async (values) => {
            handleUpdate(values);
        }
    });

    const handleValidate = async () => {
        const errors = await formik.validateForm();
        const keys = Object.keys(errors);
        if (keys.length > 0) {
            showToast(errors[keys[0]], "error");
        }
    }

    const handleUpdate = async (values) => {
        try {
            showToast("Profile was successfully updated.");
            navigate("/");
        } catch (error) {
            showToast(error.toString(), "error");
        }
    };

    const onFileUpload = (selectedFile) => {
        formik.setFieldValue("companyLogo", selectedFile);
    };

    const handleCancel = () => {
        navigate("/");
    };

    if (isLoading) {
        return <LoadingScreen />
    }

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
                        <InputItem name="companyLogo" label="Company Logo" type="url" formik={formik} />
                        <InputItem name="address" label="Address Line" formik={formik} />
                        <InputItem name="address2" label="Address Line2" isOptional={true} formik={formik} />
                        <InputItem name="city" label="City" formik={formik} />
                        <InputItem name="zipcode" label="Zip Code" formik={formik} />
                        <InputItem name="country" label="Country" formik={formik} type="select" >
                            <option></option>
                            <option>United Kingdom</option>
                            <option>Germany</option>
                            <option>United States</option>
                        </InputItem>
                        <InputItem name="vat" label="Zip Code" formik={formik} />
                        <InputItem name="invoiceEmail" label="Invoice Email" formik={formik} />
                        <InputItem name="contactNumber" label="Contact Number" formik={formik} />
                        {/* <InputItem name="coverImage" label="Cover Image" type="file" additionalText="at least 1200 x 830px" onFileUpload={onFileUpload} formik={formik} /> */}
                        <div className="d-flex justify-content-end gap-2">
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

export default Profile;
