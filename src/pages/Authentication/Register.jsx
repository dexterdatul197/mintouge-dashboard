import * as Yup from 'yup';
import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback } from 'reactstrap';

import useToast from '@/utils/useToast';
import { useUser } from '@/store/user';
import * as AuthApi from '@/api/authApi';
import logoImg from '@assets/images/slogo-dark.svg';
import { Storage, SetStorageObject } from '@/utils';
import LoadingScreen from '@/components/LoadingScreen';

const Register = props => {
  document.title = "Register | Mintouge - Brands Dashboard";
  
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const onSignupSuccess = (response) => {
    SetStorageObject(Storage.OptedUser, response);

    showToast("Sign up successful.");

    setUser(response);
    navigate("/dashboard");
  };
  
  const onSignupFailed = (error) => {
    setErrorMessage(error.toString());
  };

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      brandName: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string()
        .required("Please Enter Your Password")
        // .min(8, 'Password must be 8 characters long')
        // .matches(/[0-9]/, 'Password requires a number')
        // .matches(/[a-z]/, 'Password requires a lowercase letter')
        // .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .matches(/[^\w]/, 'Password requires a symbol'),
        firstName: Yup.string().required("Please Enter Your First Name"),
        lastName: Yup.string().required("Please Enter Your Last Name"),
        brandName: Yup.string().required("Please Enter Your Brand Name"),
    }),
    onSubmit: async (values) => {
      try {

        setLoading(true);
        setErrorMessage(undefined);
        const response = await AuthApi.signUp(values);
        setLoading(false);
        onSignupSuccess(response);
      } catch (err) {
        setLoading(false);
        onSignupFailed(err);
      }
    }
  });

  useEffect(() => {
    // // dispatch(apiError(""));
  }, []);

  return (
    <React.Fragment>

      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Free Register</h5>
                        <p>Get your free Mintouge account now.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={"https://mintouge-s3-public.s3.eu-west-2.amazonaws.com/brand_dashboard/profile-img.webp"} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logoImg}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      {isLoading && <LoadingScreen />}
                      {errorMessage && <Alert color="danger">{errorMessage}</Alert>}

                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email ? true : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <Input
                          name="password"
                          type="password"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.password || ""}
                          invalid={
                            validation.touched.password && validation.errors.password ? true : false
                          }
                        />
                        {validation.touched.password && validation.errors.password ? (
                          <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">First Name</Label>
                        <Input
                          name="firstName"
                          type="text"
                          placeholder="Enter First Name"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.firstName || ""}
                          invalid={
                            validation.touched.firstName && validation.errors.firstName ? true : false
                          }
                        />
                        {validation.touched.usernafirstNameme && validation.errors.firstName ? (
                          <FormFeedback type="invalid">{validation.errors.firstName}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Last Name</Label>
                        <Input
                          name="lastName"
                          type="text"
                          placeholder="Enter Last Name"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.lastName || ""}
                          invalid={
                            validation.touched.lastName && validation.errors.lastName ? true : false
                          }
                        />
                        {validation.touched.lastName && validation.errors.lastName ? (
                          <FormFeedback type="invalid">{validation.errors.lastName}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Brand Name</Label>
                        <Input
                          name="brandName"
                          type="text"
                          placeholder="Enter your brand name. ex:) Gucci"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.brandName || ""}
                          invalid={
                            validation.touched.brandName && validation.errors.brandName ? true : false
                          }
                        />
                        {validation.touched.brandName && validation.errors.brandName ? (
                          <FormFeedback type="invalid">{validation.errors.brandName}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mt-4">
                        <button
                          className="btn btn-primary btn-block "
                          type="submit"
                        >
                          Register
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <p className="mb-0">
                          By registering you agree to the Mintouge{" "}
                          <Link to="#" className="text-primary">
                            Terms of Use
                          </Link>
                        </p>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Already have an account ?{" "}
                  <Link to="/login" className="font-weight-medium text-primary">
                    {" "}
                    Login
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} Mintouge. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger" /> by Mintouge
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Register;
