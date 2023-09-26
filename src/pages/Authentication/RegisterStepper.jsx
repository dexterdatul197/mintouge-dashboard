import React, { useState } from 'react'

import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  Label,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Button
} from 'reactstrap';

import classnames from 'classnames';
import { Link } from 'react-router-dom';
import useToast from '@/utils/useToast';
import { useFormik } from 'formik';
import * as yup from 'yup';
import InputItem from '@/components/InputItem';

//Import Breadcrumb
import Breadcrumbs from '../../components/Breadcrumb';

const RegisterStepper = ({ title }) => {

  //meta title
  document.title = title || "Register Stepper| Vaultik Brands Dashboard";

  const [activeTab, setactiveTab] = useState(1)
  const [activeTabVartical, setoggleTabVertical] = useState(1)

  const [passedSteps, setPassedSteps] = useState([1])
  const [passedStepsVertical, setPassedStepsVertical] = useState([1])

  const showToast = useToast();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
        companyName: "LuxDemoStore",
        companyLogo: "https://cdn.vaultik.com/mini-web/assets/store_logo.svg",
        address: "51 Provost Street",
        address2: "",
        city: "London",
        zipcode: "N1 7FD",
        country: "United Kingdom",
        vat: "-",
        invoiceEmail: "pietro@vaultik.com",
        contactNumer: "+44.7584771060",
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

   const handleCancel = () => {

   };

   const handleValidate = async () => {
        const errors = await formik.validateForm();
        const keys = Object.keys(errors);
        if (keys.length > 0) {
            showToast(errors[keys[0]], "error");
        }
    }

  function toggleTab(tab) {
    if (activeTab !== tab) {
      var modifiedSteps = [...passedSteps, tab]
      if (tab >= 1 && tab <= 4) {
        setactiveTab(tab)
        setPassedSteps(modifiedSteps)
      }
    }
  }

  function toggleTabVertical(tab) {
    if (activeTabVartical !== tab) {
      var modifiedSteps = [...passedStepsVertical, tab]

      if (tab >= 1 && tab <= 4) {
        setoggleTabVertical(tab)
        setPassedStepsVertical(modifiedSteps)
      }
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Form Register Step" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">Register Stepper</h4>
                  <div className="wizard clearfix">
                    <div className="steps clearfix">
                      <ul>
                        <NavItem
                          className={classnames({ current: activeTab === 1 })}
                        >
                          <NavLink
                            className={classnames({ current: activeTab === 1 })}
                            onClick={() => {
                              setactiveTab(1)
                            }}
                            disabled={!(passedSteps || []).includes(1)}
                          >
                            <span className="number">1.</span> Company Profile
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({ current: activeTab === 2 })}
                        >
                          <NavLink
                            className={classnames({ active: activeTab === 2 })}
                            onClick={() => {
                              setactiveTab(2)
                            }}
                            disabled={!(passedSteps || []).includes(2)}
                          >
                            <span className="number">2.</span> Collection
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({ current: activeTab === 3 })}
                        >
                          <NavLink
                            className={classnames({ active: activeTab === 3 })}
                            onClick={() => {
                              setactiveTab(3)
                            }}
                            disabled={!(passedSteps || []).includes(3)}
                          >
                            <span className="number">3.</span> Custom Settings
                          </NavLink>
                        </NavItem>
                      </ul>
                    </div>
                    <div className="content clearfix">
                      <TabContent activeTab={activeTab} className="body">
                        <TabPane tabId={1}>
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
                        </Form>

                        </TabPane>
                        <TabPane tabId={2}>
                            <Form
                                className="d-flex flex-column gap-4 mb-3"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    formik.handleSubmit();
                                    handleValidate();
                                    return false;
                                }}
                            >
                                <InputItem name="collectionName" label="Name" formik={formik} />
                                <InputItem name="collectionDescription" label="Description" type="url" formik={formik} />
                                <InputItem name="collectionImage" label="Images" formik={formik} />
                            </Form>
                        </TabPane>
                        <TabPane tabId={3}>
                          <div>
                            <Form>
                              <Row>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-namecard-input11">
                                      Name on Card
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-namecard-input11"
                                      placeholder="Enter Your Name on Card"
                                    />
                                  </div>
                                </Col>

                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label>Credit Card Type</Label>
                                    <select className="form-select">
                                      <option defaultValue>
                                        Select Card Type
                                      </option>
                                      <option value="AE">
                                        American Express
                                      </option>
                                      <option value="VI">Visa</option>
                                      <option value="MC">MasterCard</option>
                                      <option value="DI">Discover</option>
                                    </select>
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-cardno-input12">
                                      Credit Card Number
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-cardno-input12"
                                      placeholder="Credit Card Number"
                                    />
                                  </div>
                                </Col>

                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-card-verification-input0">
                                      Card Verification Number
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-card-verification-input0"
                                      placeholder="Credit Verification Number"
                                    />
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-expiration-input13">
                                      Expiration Date
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-expiration-input13"
                                      placeholder="Card Expiration Date"
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </Form>
                          </div>
                        </TabPane>
                        <TabPane tabId={4}>
                          <div className="row justify-content-center">
                            <Col lg="6">
                              <div className="text-center">
                                <div className="mb-4">
                                  <i className="mdi mdi-check-circle-outline text-success display-4" />
                                </div>
                                <div>
                                  <h5>Confirm Detail</h5>
                                  <p className="text-muted">
                                    If several languages coalesce, the grammar
                                    of the resulting
                                  </p>
                                </div>
                              </div>
                            </Col>
                          </div>
                        </TabPane>
                      </TabContent>
                    </div>
                    <div className="actions clearfix">
                      <ul>
                        <li
                          className={
                            activeTab === 1 ? "previous disabled" : "previous"
                          }
                        >
                          <Link
                            to="#"
                            onClick={() => {
                              toggleTab(activeTab - 1)
                            }}
                          >
                            Previous
                          </Link>
                        </li>
                        <li
                          className={activeTab === 3 ? "next disabled" : "next"}
                        >
                          <Link
                            to="#"
                            onClick={() => {
                              toggleTab(activeTab + 1)
                            }}
                          >
                            Next
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default RegisterStepper;
