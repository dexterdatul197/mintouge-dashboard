import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
} from 'reactstrap';

const WalletStats = ({ wallet, isMenu, toggleMenu }) => {
  return (
    <Card>
      <CardBody>
        <div className="d-flex">
          <div className="me-4">
            <i className="mdi mdi-account-circle text-primary h1" />
          </div>

          <div className="flex-grow-1">
            <div className="text-muted">
              <h5>{wallet.userName}</h5>
              <p className="mb-1">{wallet.email}</p>
              <p className="mb-0">Id no: {wallet.id}</p>
            </div>
          </div>

          <Dropdown isOpen={isMenu} toggle={toggleMenu} className="ms-2">
            <DropdownToggle tag="i" className="text-muted">
              <i className="mdi mdi-dots-horizontal font-size-18" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem href="#">Action</DropdownItem>
              <DropdownItem href="#">Another action</DropdownItem>
              <DropdownItem href="#">Something else</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </CardBody>
      <CardBody className="border-top">
        <Row>
          <Col sm="6">
            <div>
              <p className="text-muted mb-2">Available Balance</p>
              <h5>{wallet.availableBalance}</h5>
            </div>
          </Col>
          <Col sm="6">
            <div className="text-sm-end mt-4 mt-sm-0">
              <p className="text-muted mb-2">Since last month</p>
              <h5>
                {wallet.lastMonthDifference}
                <span className="badge bg-success ms-2 align-bottom">
                  {wallet.lastMonthDifferencePercent}
                </span>
              </h5>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

WalletStats.propTypes = {
  wallet: PropTypes.any,
  isMenu: PropTypes.bool,
  toggleMenu: PropTypes.func,
}

export default WalletStats
