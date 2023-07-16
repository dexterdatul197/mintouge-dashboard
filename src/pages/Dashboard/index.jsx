import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';

import ChartLineColumn from './ChartLineColumn';
import LastOrders from './LastOrders';
import SmallCard from './SmallCard';

const Dashboard = (props) => {
  const reports = [
    {
      icon: "bx bx-copy-alt",
      title: "Orders",
      value: "1,452",
      badgeValue: "+ 0.2%",
      color: "#d1efec",
      desc: "From previous period",
    },
    {
      icon: "bx bx-archive-in",
      title: "Revenue",
      value: "$ 28,452",
      badgeValue: "+ 0.2%",
      color: "#d2e4e1",
      desc: "From previous period",
    },
    {
      icon: "bx bx-purchase-tag-alt",
      title: "Average Price",
      value: "$ 16.2",
      badgeValue: "0%",
      color: "#fae6d8",
      desc: "From previous period",
    },
  ];

  //meta title
  document.title = "Dashboard | Mintouge - Brands Dashboard";

  return (
    <div className="page-content">
      <Container fluid>
        <div className="page-title-container mb-4">
          <div className="me-2">
            <h3 className="">Dashboard</h3>
          </div>
        </div>

        <Row className="mb-4">
          <Col md="9">
            <ChartLineColumn />
          </Col>
          <Col md="3" className="flex-group h-429px">
            {reports.map((report, key) => (
              <SmallCard report={report} key={key} />
            ))}
          </Col>
        </Row>

        <LastOrders />
      </Container>
    </div>
  );
};

Dashboard.propTypes = {
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default Dashboard;
