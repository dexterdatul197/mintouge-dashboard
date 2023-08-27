import PropTypes from 'prop-types';
import React from 'react';
import {
  Row,
  Col,
  Alert,
  Card,
  CardBody,
  Container,
  FormFeedback,
  Input,
  Label,
  Form,
} from 'reactstrap';
import { Link } from 'react-router-dom';

// Formik Validation
import * as Yup from 'yup';
import { useFormik } from 'formik';

// import images
const logo = 'https://cdn.mintouge.com/mini-web/assets/vaultik_logo.svg';

const ForgetPasswordPage = (props) => {
  //meta title
  document.title =
    "Forget Password | Vaultik - Brands Dashboard";

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
    }),
    onSubmit: (values) => {
      // dispatch(userForgetPassword(values, props.history));
    },
  });

  const { forgetError, forgetSuccessMsg } = {};

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
                  <Link to="/" className="auth-logo-light"> 
                    <div className="d-flex justify-content-center align-items-baseline">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle" style={{ background: 'var(--bs-body-bg)'}}>
                          <img
                            src={logo}
                            alt=""
                            className=""
                            height="34"
                          />
                        </span>
                      </div>
                    </div>
                  </Link>
               </div>
              <Card className="overflow-hidden" style={{ background: "#EFEEF4", borderRadius: '12px', boxShadow: "0px 25px 50px -12px #10182840"}}>
                <CardBody className="pt-0 my-4">
                  <div className="p-2">
                    {forgetError && forgetError ? (
                      <Alert color="danger" style={{ marginTop: "13px" }}>
                        {forgetError}
                      </Alert>
                    ) : null}
                    {forgetSuccessMsg ? (
                      <Alert color="success" style={{ marginTop: "13px" }}>
                        {forgetSuccessMsg}
                      </Alert>
                    ) : null}

                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      <div className="mb-3">
                        <Input
                          name="email"
                          className="form-control rounded text-secondary"
                          style={{ height: '60px' }}
                          placeholder="Enter email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email
                              ? true
                              : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">
                            {validation.errors.email}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <Row className="mb-3">
                        <Col className="text-end d-grid">
                          <button
                            className="btn w-md text-white rounded-4"
                            style={{ background: "#222639", height: '60px'}}
                            type="submit"
                          >
                            Reset
                          </button>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-3 text-center">
                <p>
                  Go back to{" "}
                  <Link to="/login" className="font-weight-medium text-primary">
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

ForgetPasswordPage.propTypes = {
  history: PropTypes.object,
};

export default ForgetPasswordPage;
