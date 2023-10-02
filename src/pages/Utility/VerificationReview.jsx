import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

const VerificationReview = () => {
    //meta title
    document.title = "Register | Vaultik - Brands Dashboard";

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-5">
        <Container>
          <Row>
            <Col lg="12">
              <div className="text-center mb-5">
                <div className="mt-5 text-center">
                  We are reviewing your account.
                  <br />
                  Please wait until we approve your account.
                </div>
                <div className="mt-5 text-center">
                  <Link
                    className="btn btn-primary "
                    to="/dashboard"
                  >
                    Back to Dashboard
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="8" xl="6">
              <div>
                <img src={"https://cdn.mintouge.com/brand_dashboard/error-img.webp"} alt="" className="img-fluid" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default VerificationReview;