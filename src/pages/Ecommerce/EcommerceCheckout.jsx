import React, { useState } from 'react';

import {
  Container,
  Row,
  Col,
  Table,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Card,
  Form,
  FormGroup,
  Label,
  CardBody,
  CardTitle,
} from 'reactstrap';
import Select from 'react-select';
import { Link } from 'react-router-dom';

import classnames from 'classnames';

//Import Breadcrumb
import Breadcrumbs from '@components/Common/Breadcrumb';

//Import Images
import img1 from '@assets/images/product/img-1.png';
import img7 from '@assets/images/product/img-7.png';

const optionGroup = [
  {
    label: "Picnic",
    options: [
      { label: "Mustard", value: "Mustard" },
      { label: "Ketchup", value: "Ketchup" },
      { label: "Relish", value: "Relish" },
    ],
  },
  {
    label: "Camping",
    options: [
      { label: "Tent", value: "Tent" },
      { label: "Flashlight", value: "Flashlight" },
      { label: "Toilet Paper", value: "Toilet Paper" },
    ],
  },
]

const orderSummary = [
  {
    id: 1,
    img: img1,
    productTitle: "Half sleeve T-shirt (64GB)",
    price: 450,
    qty: 1,
  },
  { id: 2, img: img7, productTitle: "Wireless Headphone", price: 225, qty: 1 },
]

const EcommerceCheckout = () => {

  //meta title
  document.title = "Checkout | Mintouge - Brands Dashboard";

  const [activeTab, setactiveTab] = useState("1")
  const [selectedGroup, setselectedGroup] = useState(null)

  function handleSelectGroup(selectedGroup) {
    setselectedGroup(selectedGroup)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Checkout" />

          <div className="checkout-tabs">
            <Row>
              <Col xl="10" sm="9">
                <Card>
                  <CardBody>
                    <div>
                      <CardTitle>Payment information</CardTitle>
                      <p className="card-title-desc">
                        Fill all information below
                      </p>
                      <div>
                        <div className="form-check form-check-inline font-size-16">
                          <Input
                            type="radio"
                            value="1"
                            id="customRadioInline1"
                            name="customRadioInline1"
                            className="form-check-input"
                            defaultChecked
                          />
                          <Label
                            className="form-check-label font-size-13"
                            htmlFor="customRadioInline1"
                          >
                            <i className="fab fa-cc-mastercard me-1 font-size-20 align-top" />{" "}
                            Credit / Debit Card
                          </Label>
                        </div>
                      </div>

                      <h5 className="mt-5 mb-3 font-size-15">
                        For card Payment
                      </h5>
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
                        to="/ecommerce-checkout"
                        className="btn btn-success"
                      >
                        <i className="mdi mdi-truck-fast me-1" /> 
                        Save
                      </Link>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default EcommerceCheckout
