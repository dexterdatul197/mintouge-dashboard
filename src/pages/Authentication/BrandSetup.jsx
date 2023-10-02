import * as Yup from 'yup';
import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback } from 'reactstrap';

import useToast from '@/utils/useToast';
import { useUser } from '@/store/userStore';
import LoadingScreen from '@/components/LoadingScreen';

const logoImg = 'https://cdn.vaultik.com/mini-web/assets/vaultik_logo.svg';
const BrandSeup = props => {
  document.title = "Register | Vaultik - Brands Dashboard";
  
  const showToast = useToast();
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
              <div>
                    <Link to="/">
                      <div className="d-flex justify-content-center align-items-baseline">
                        <div className="avatar-md profile-user-wid mb-4">
                          <span className="avatar-title" style={{ background: 'var(--bs-body-bg)'}}>
                            <img
                              src={logoImg}
                              alt=""
                              className=""
                              height="34"
                            />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
              <Card className="overflow-hidden"  style={{ background: "#EFEEF4", borderRadius: '12px', boxShadow: "0px 25px 50px -12px #10182840"}}>
                <CardBody className="pt-0">
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
                        <Input
                          id="email"
                          name="email"
                          className="form-control rounded-3"
                          style={{ height: '60px' }}
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
                        <Input
                          name="password"
                          type="password"
                          className="form-control rounded-3"
                          placeholder="Enter Password"
                          style={{ height: '60px' }}
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
                        <Input
                          name="firstName"
                          type="text"
                          className="form-control rounded-3"
                          style={{ height: '60px' }}
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
                        <Input
                          name="lastName"
                          type="text"
                          className="form-control rounded-3"
                          placeholder="Enter Last Name"
                          style={{ height: '60px' }}
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
                        <Input
                          name="brandName"
                          type="text"
                          className="form-control rounded-3"
                          placeholder="Enter your brand name. ex:) Gucci"
                          style={{ height: '60px' }}
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

                      <div className="mt-4 d-grid">
                        <button
                          className="btn btn-block text-white"
                          style={{ height: '60px', background: "#262239", borderRadius: '18px' }}
                          type="submit"
                        >
                          Register
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <p className="mb-0">
                          By registering you agree to the Vaultik{" "}
                          <Link to="#" className="text-primary">
                            Terms of Use
                          </Link>
                        </p>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-3 text-center">
                <p>
                  Already have an account ?{" "}
                  <Link to="/login" className="font-weight-medium text-primary">
                    {" "}
                    Login
                  </Link>{" "}
                </p>
                <p className="mt-5">
                  © {new Date().getFullYear()} Vaultik. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger" /> by Vaultik
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default BrandSetup;
