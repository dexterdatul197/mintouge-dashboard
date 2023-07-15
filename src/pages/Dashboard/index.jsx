import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
} from 'reactstrap';

import LineColumnArea from "./LineColumnArea"

const Dashboard = props => {
  const { chartsData } = {};

  const reports = [
    { title: "Orders", iconClass: "bx-copy-alt", description: "1,235" },
    { title: "Revenue", iconClass: "bx-archive-in", description: "$35, 723" },
    { title: "Analytics", iconClass: "bx-analyse", description: "Consumer" }
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

        <Row>
          <Col md="9">
            <Card>
              <CardBody>
                <CardTitle className="mb-4">
                  Line, Column & Area Chart{" "}
                </CardTitle>
                <LineColumnArea dataColors='["--bs-danger","--bs-primary", "--bs-success"]' />
              </CardBody>
            </Card>
          </Col>
          <Col md="3">
            {reports.map((report, key) => (
              <Col key={"_col_" + key}>
                <Card className="mini-stats-wid">
                  <CardBody>
                    <div className="d-flex">
                      <div className="flex-grow-1">
                        <p className="text-muted fw-medium">
                          {report.title}
                        </p>
                        <h4 className="mb-0">{report.description}</h4>
                      </div>
                      <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                        <span className="avatar-title rounded-circle bg-primary">
                          <i
                            className={
                              "bx " + report.iconClass + " font-size-24"
                            }
                          ></i>
                        </span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Col>
        </Row>

        <Row>

        </Row>
      </Container>
    </div>
  );
};

Dashboard.propTypes = {
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default Dashboard;
