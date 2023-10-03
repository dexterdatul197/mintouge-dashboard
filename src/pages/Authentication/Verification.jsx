import PropTypes from 'prop-types';
import React, { useState } from 'react';
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
import { AuthApi } from '@/api';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '@/components/LoadingScreen';
import { GetStorageObject, Storage } from '@/utils';
import useToast from '@/utils/useToast';

// import images
const logo = 'https://cdn.vaultik.com/mini-web/assets/vaultik_logo.svg';

const Verification = (props) => {
  //meta title
  document.title =
    "Email Verification | Vaultik - Brands Dashboard";

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isLoading, setLoading] = useState(false);

  const showToast = useToast();

  const onVerificationFailed = (err) => {
    setErrorMessage(err.toString());
  };

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      verify: "",
    },
    validationSchema: Yup.object({
      verify: Yup
              .string()
              .matches(/^[0-9]{6}$/, "Must be exactly 6 digit")
    }),
    onSubmit: async (values) => {
      // dispatch(userForgetPassword(values, props.history));
        try {
            const { verify } = values;
            setLoading(true);
            const response = await AuthApi.verifyEmail(verify);
            navigate("/verification-review");
            setErrorMessage(undefined);
        } catch (err) {
            setLoading(false);
            onVerificationFailed(err);
            // navigate("/verification-review");
        }
    },
  });

  const handleResendCode = async () => {
    const email = GetStorageObject(Storage.OptedUser).email;
    await AuthApi.resedVerification(email);
    showToast("Check your verification code after 30 seconds");
  };

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
                <CardBody className="pt-2">
                  <div>
                    {errorMessage && 
                      <Alert color="danger" className="mt-2 text-center">
                        {errorMessage}
                      </Alert>}

                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      <div className="text-center mt-2" style={{ fontSize: '18px' }}>Please type your verification code</div>
                      <div className="position-relative mt-3">
                        <Input
                          name="verify"
                          className="form-control rounded text-secondary"
                          style={{ height: '60px' }}
                          placeholder="Input your 6-digit code"
                          type="verify"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.verify || ""}
                          invalid={
                            validation.touched.verify && validation.errors.verify
                              ? true
                              : false
                          }
                        />
                        { errorMessage && 
                          <div
                            onClick={handleResendCode} 
                            className="position-absolute" 
                            style={{ right: "10px", bottom: "17px", fontSize: "15px", color: "cornflowerblue", textDecoration: "underline", cursor: "pointer"}}
                          >
                            Resend Code
                          </div> }
                        {validation.touched.verify && validation.errors.verify ? (
                          <FormFeedback type="invalid">
                            {validation.errors.verify}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <Row className="mt-3">
                        <Col className="text-end d-grid">
                          <button
                            className="btn w-md text-white rounded-4"
                            style={{ background: "#222639", height: '60px'}}
                            type="submit"
                          >
                            {isLoading ? 
                              <LoadingScreen styles={{ marginBottom: '5px' }}/> : 
                              errorMessage ? "Resend" : "Send"
                            }
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

Verification.propTypes = {
  history: PropTypes.object,
};

export default Verification;
