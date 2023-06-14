import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { map } from 'lodash';


//Import Breadcrumb
import Breadcrumbs from '@components/commons/Breadcrumb';

//Import Card invoice
import CardInvoice from './card-invoice';

const InvoicesList = (props) => {
  //meta title
  document.title =
    "Invoice List | Mintouge - Brands Dashboard";


  const { invoices } = {};

  useEffect(() => {
    // dispatch(onGetInvoices());
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Invoices" breadcrumbItem="Invoice List" />

          <Row>
            {map(invoices, (invoice, key) => (
              <CardInvoice data={invoice} key={"_invoice_" + key} />
            ))}
          </Row>
          <Row>
            <Col xs="12">
              <div className="text-center my-3">
                <Link to="#" className="text-success">
                  <i className="bx bx-loader bx-spin font-size-18 align-middle me-2" />
                  Load more
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

InvoicesList.propTypes = {
  invoices: PropTypes.array,
  onGetInvoices: PropTypes.func,
};

export default InvoicesList;
