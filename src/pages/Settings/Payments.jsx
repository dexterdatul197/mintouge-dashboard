import React, { useState } from 'react';

import {
  Container,
  Row,
  Col,
  Input,
  Card,
  Form,
  FormGroup,
  Label,
  CardBody,
  CardTitle,
} from 'reactstrap';
import { Link } from 'react-router-dom';

//Import Breadcrumb
import Breadcrumbs from '@components/Breadcrumb';

const Payments = () => {
  document.title = "Checkout | Mintouge - Brands Dashboard";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Checkout" />

          <Row>
            <div className="checkout-tabs">
              <Col xl="12">
                <Card>
                  <CardBody>
                    <div>
                      <CardTitle>Payment information</CardTitle>
                      <p className="card-title-desc">
                        Fill in Card Information below
                      </p>

                      <div className="p-4 border">
                        <Form>
                          <FormGroup className="mb-0">
                            <Label htmlFor="cardnumberInput">
                              Card Number
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="cardnumberInput"
                              placeholder="0000 0000 0000 0000"
                            />
                          </FormGroup>
                          <Row>
                            <Col lg="6">
                              <FormGroup className="mt-4 mb-0">
                                <Label htmlFor="cardnameInput">
                                  Name on card
                                </Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="cardnameInput"
                                  placeholder="Name on Card"
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="3">
                              <FormGroup className=" mt-4 mb-0">
                                <Label htmlFor="expirydateInput">
                                  Expiry date
                                </Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="expirydateInput"
                                  placeholder="MM/YY"
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="3">
                              <FormGroup className="mt-4 mb-0">
                                <Label htmlFor="cvvcodeInput">
                                  CVV Code
                                </Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="cvvcodeInput"
                                  placeholder="Enter CVV Code"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Form>
                      </div>
                    </div>
                  </CardBody>
                </Card>
                <Row className="mt-4">
                  <Col sm="6">
                    <Link
                      to="/dashboard"
                      className="btn text-muted d-none d-sm-inline-block btn-link"
                    >
                      <i className="mdi mdi-arrow-left me-1" /> Back to
                      Dashboard{" "}
                    </Link>
                  </Col>

                  <Col sm="6">
                    <div className="text-sm-end">
                      <Link
                        to="/payments"
                        className="btn btn-success"
                      >
                        <i className="mdi mdi-truck-fast me-1" />
                        Save
                      </Link>
                    </div>
                  </Col>
                </Row>
              </Col>
            </div>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Payments
