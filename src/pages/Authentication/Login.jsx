import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
} from 'reactstrap';

import { useUser } from '@/store/user';
import * as AuthApi from '@/api/authApi';
import logo from '@assets/images/slogo-dark.svg';
import { Storage, SetStorageObject } from '@/utils';

const Login = (props) => {
  //meta title
  const { setUser } = useUser();
  const [errorMessage, setErrorMessage] = useState("");

  document.title = "Login | Mintouge - Brands Dashboard";
  const navigate = useNavigate();

  const onLoginSuccess = (response) => {
    SetStorageObject(Storage.OptedUser, response);
    
    setUser(response);
    navigate("/dashboard");
  };

  const onLoginFailed = () => {
    setErrorMessage("Your Email or Password is incorrect.");
  };

  const loginFormik = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: async (values) => {
      const { email, password } = values;
      try {
        const response = await AuthApi.signIn({ email, password });
        onLoginSuccess(response);
      } catch (err) {
        console.log(err);
        onLoginFailed();
      }
    },
  });

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
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>Sign in to continue to Mintouge.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={"https://mintouge-s3-public.s3.eu-west-2.amazonaws.com/brand_dashboard/profile-img.webp"} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>

                <CardBody className="pt-0">
                  <div>
                    <Link to="/" className="auth-logo-light">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
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
                        loginFormik.handleSubmit();
                        return false;
                      }}
                    >
                      {errorMessage ? <Alert color="danger">{errorMessage}</Alert> : null}

                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={loginFormik.handleChange}
                          onBlur={loginFormik.handleBlur}
                          value={loginFormik.values.email || ""}
                          invalid={
                            loginFormik.touched.email && loginFormik.errors.email
                              ? true
                              : false
                          }
                        />
                        {loginFormik.touched.email && loginFormik.errors.email ? (
                          <FormFeedback type="invalid">
                            {loginFormik.errors.email}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <Input
                          name="password"
                          value={loginFormik.values.password || ""}
                          type="password"
                          placeholder="Enter Password"
                          onChange={loginFormik.handleChange}
                          onBlur={loginFormik.handleBlur}
                          invalid={
                            loginFormik.touched.password &&
                              loginFormik.errors.password
                              ? true
                              : false
                          }
                        />
                        {loginFormik.touched.password &&
                          loginFormik.errors.password ? (
                          <FormFeedback type="invalid">
                            {loginFormik.errors.password}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="form-check">
                        <input
                          name="rememberMe"
                          type="checkbox"
                          className="form-check-input"
                          id="rememberMe"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="rememberMe"
                        >
                          Remember me
                        </label>
                      </div>

                      <div className="mt-3 d-grid">
                        <button
                          id="login-button"
                          className="btn btn-primary btn-block"
                          type="submit"
                        >
                          Log In
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <Link to="/forgot-password" className="text-muted">
                          <i className="mdi mdi-lock me-1" />
                          Forgot your password?
                        </Link>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>

              <div className="mt-5 text-center">
                <p>
                  Don&#39;t have an account ?{" "}
                  <Link to="/register" className="fw-medium text-primary">
                    {" "}
                    Signup now{" "}
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

export default Login;

Login.propTypes = {
  history: PropTypes.object,
};
