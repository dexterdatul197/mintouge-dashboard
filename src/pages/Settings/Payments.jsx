import React, { useEffect, useState } from 'react';

import {
  Container,
  Input,
  Row,
  Col,
  Card,
  Form,
  FormGroup,
  Label,
  CardBody,
  CardTitle,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from '@stripe/react-stripe-js';

import { PaymentApi } from '@/api';
import useToast from '@/utils/useToast';
import Breadcrumbs from '@components/Breadcrumb';
import LoadingScreen from '@/components/LoadingScreen';

const Payments = () => {
  document.title = "Checkout | Mintouge - Brands Dashboard";

  const stripe = useStripe();
  const elements = useElements();
  const showToast = useToast();
  const [cards, setCards] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        const _cards = await PaymentApi.getCards();
        setCards(_cards);

        setLoading(false);
      } catch (error) {
        showToast(error.toString(), "error");
        setLoading(false);
      }
    }

    fetchCards();
  }, []);

  const handleActivate = async (card) => {
    try {
      await PaymentApi.activateCard(card.id);

      setCards((_cards) => cards.map(_card => (
        _card.id === card.id
          ? { ..._card, active: true }
          : { ..._card, active: false }
      )));

      showToast("Payment Method was successfully activated.");
    } catch (error) {
      showToast(error.toString(), "error");
    }
  }

  const handleDelete = async (card) => {
    try {
      await PaymentApi.deleteCard(card.id);

      setCards((_cards) => cards.filter(_card => _card.id != card.id));

      showToast("Payment Method was successfully deleted.");
    } catch (error) {
      showToast(error.toString(), "error");
    }
  }

  const handlePaymentSetup = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const response = await stripe.createToken(elements.getElement(CardNumberElement));
    if (response.error) {
      showToast(response.error.message, "error");
      return;
    }

    const token = response.token;
    const _card = {
      cardId: token.card.id,
      tokenId: token.id,
      last4: token.card.last4,
      clientIp: token.client_ip,
      brand: token.card.brand,
      expireMonth: token.card.exp_month,
      expireYear: token.card.exp_year,
    };

    try {
      await PaymentApi.addCard(_card);

      setCards((_cards) => ([..._cards, _card]));
      showToast("Payment Method was successfully added.");
    } catch (error) {
      showToast(error.toString(), "error");
    }

    handleActivate(_card);
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
    classes: {
      base: "p-2 border-1",
    },
    showIcon: true, // Show card icon
  };

  if (isLoading) {
    return <LoadingScreen />
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Checkout" />

          {cards && cards.length > 0 && <Row>
            <div className="checkout-tabs">
              <Col xl="12">
                <Card>
                  <CardBody>
                    <div>
                      <CardTitle>Activate a card below</CardTitle>

                      {cards.map(card => (
                        <div key={card.id} className="p-4 border">
                          <Form>
                            <Row>
                              <Col sm="4">
                                <FormGroup className="mb-0">
                                  <Label htmlFor="card-number">
                                    Card Number
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="card-number"
                                    value={`**** **** **** ${card.last4}`}
                                    readOnly
                                  />
                                </FormGroup>
                              </Col>
                              <Col sm="3">
                                <FormGroup className="mb-0">
                                  <Label htmlFor="expiry-date">
                                    Expiry date
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="expiry-date"
                                    value={`${card.expireMonth.toString().padStart(2, '0')}/${card.expireYear % 2000}`}
                                    readOnly
                                  />
                                </FormGroup>
                              </Col>
                              <Col sm="2">
                                <FormGroup className="mb-0">
                                  <Label htmlFor="cvc">
                                    CVC
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="cvc"
                                    placeholder="***"
                                    readOnly
                                  />
                                </FormGroup>
                              </Col>
                              <Col sm="3" className="d-flex justify-content-center align-items-center">
                                <FormGroup className="mb-0">
                                  <Label htmlFor="actions">
                                    Actions
                                  </Label>
                                  <div id="actions" className="d-flex gap-2" style={{ height: 36.5 }}>
                                    <button type="button" className="btn btn-success px-1" onClick={() => (handleActivate(card))} >
                                      Activate
                                    </button>
                                    <button type="button" className="btn btn-secondary bg-danger px-1" onClick={() => (handleDelete(card))} >
                                      Delete
                                    </button>
                                  </div>
                                </FormGroup>

                              </Col>
                            </Row>
                          </Form>
                        </div>

                      ))}
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </div>
          </Row>}

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
                            <Label htmlFor="card-number">
                              Card Number
                            </Label>
                            <CardNumberElement options={cardElementOptions} />
                          </FormGroup>
                          <Row>
                            <Col lg="6">
                              <FormGroup className=" mt-4 mb-0">
                                <Label htmlFor="expiry-date">
                                  Expiry date
                                </Label>
                                <CardExpiryElement id="expiry-date" options={cardElementOptions} />
                              </FormGroup>
                            </Col>
                            <Col lg="6">
                              <FormGroup className="mt-4 mb-0">
                                <Label htmlFor="cvc">
                                  CVC Code
                                </Label>
                                <CardCvcElement id="cvc" options={cardElementOptions} />
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
                      <button className="btn btn-success" onClick={handlePaymentSetup}>
                        <i className="mdi mdi-truck-fast me-1" />
                        Add
                      </button>
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
