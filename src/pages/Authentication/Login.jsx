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

import useToast from '@/utils/useToast';
import { useUser } from '@/store/userStore';
import * as AuthApi from '@/api/authApi';
import { Storage, SetStorageObject } from '@/utils';
import LoadingScreen from '@/components/LoadingScreen';

const logo = 'https://cdn.mintouge.com/mini-web/assets/vaultik_slogo.svg';
const Login = (props) => {
  //meta title
  const { setUser } = useUser();
  const [errorMessage, setErrorMessage] = useState("");

  document.title = "Login | Vaultik - Brands Dashboard";
  const navigate = useNavigate();

  const showToast = useToast();
  const [isLoading, setLoading] = useState(false);

  const onLoginSuccess = (response) => {
    showToast("Log in successful.");
    SetStorageObject(Storage.OptedUser, response);
    setUser(response);
    navigate("/dashboard");
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
        setLoading(true);
        const response = await AuthApi.signIn({ email, password });
        setLoading(false);
        onLoginSuccess(response);
      } catch (err) {
        setLoading(false);
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
      <div className="account-pages my-3 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <div>
                <Link to="/" className="auth-logo-light"> 
                  <div className="d-flex justify-content-center align-items-baseline">
                    <div className="avatar-md profile-user-wid mb-4">
                      <span className="avatar-title rounded-circle" style={{ background: 'var(--bs-body-bg)'}}>
                        <img
                          src={logo}
                          alt=""
                          className="rounded-circle"
                          height="34"
                        />
                      </span>
                    </div>
                    <div>
                      <h6 className="text-dark display-6">Vaultik</h6>
                    </div>
                  </div>
                </Link>
              </div>

              <Card className="overflow-hidden" style={{ background: "#EFEEF4", borderRadius: '12px', boxShadow: "0px 25px 50px -12px #10182840"}}>

                <CardBody className="pt-0">

                  <div className="px-2 py-5">
                    <Form
                      className="form-horizontal"
                      style={{ }}
                      onSubmit={(e) => {
                        e.preventDefault();
                        loginFormik.handleSubmit();
                        return false;
                      }}
                    >
                      {isLoading && <LoadingScreen />}
                      {errorMessage && <Alert color="danger">{errorMessage}</Alert>}

                      <div className="mb-3">
                        <Input
                          name="email"
                          className="form-control rounded"
                          style={{ height: '60px', color: "#D4D4D4" }}
                          placeholder="Your email"
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
                        <Input
                          name="password"
                          className="form-control rounded"
                          style={{ height: '60px', color: "#D4D4D4" }}
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

                      <div className="mt-3 d-grid">
                        <button
                          id="login-button"
                          className="btn btn-block text-white"
                          style={{ height: '60px', background: "#262239", borderRadius: '18px'}}
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

              <div className="mt-3 text-center">
                <p>
                  Don&#39;t have an account ?{" "}
                  <Link to="/register" className="fw-medium text-primary">
                    {" "}
                    Request an Account Now{" "}
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

export default Login;

Login.propTypes = {
  history: PropTypes.object,
};
