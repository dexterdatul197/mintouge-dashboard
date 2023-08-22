import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';

import Orders from '../Orders';
import SmallCard from './SmallCard';
import ChartLineColumn from './ChartLineColumn';
import getChartColorsArray from "./ChartsDynamicColor";

const Dashboard = (props) => {
  const dataColors = '["--bs-danger","--bs-primary", "--bs-success"]';
  const lineColumnAreaColors = getChartColorsArray(dataColors);

  const series = [
    {
      name: "A",
      type: "column",
      data: [5, 11, 22, 27, 13, 22, 37],
    },
    {
      name: "B",
      type: "line",
      data: [10, 25, 16, 30, 45, 10, 64],
    },
  ];

  const options = {
    chart: {
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: [0, 3],
      curve: "smooth",
    },
    plotOptions: {
      bar: {
        columnWidth: "20px",
      },
    },
    colors: lineColumnAreaColors,

    fill: {
      opacity: [0.85, 1],
      gradient: {
        inverseColors: false,
        shade: "light",
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100],
      },
    },
    labels: [
      "01/01/2023",
      "02/01/2023",
      "03/01/2023",
      "04/01/2023",
      "05/01/2023",
      "06/01/2023",
      "07/01/2023",
    ],
    markers: {
      size: 0,
    },
    legend: {
      offsetY: 11,
    },
    xaxis: {
      type: "datetime",
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " points";
          }
          return y;
        },
      },
    },
    grid: {
      borderColor: "#f1f1f1",
    },
  };

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
  document.title = "Dashboard | Vaultik - Brands Dashboard";

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
            <ChartLineColumn
              series={series}
              options={options}
            />
          </Col>
          <Col md="3" className="flex-group h-429px">
            {reports.map((report, key) => (
              <SmallCard
                report={report}
                key={key}
              />
            ))}
          </Col>
        </Row>

        <Orders title="Latest Orders" isLast={true} />
      </Container>
    </div>
  );
};

Dashboard.propTypes = {
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default Dashboard;
