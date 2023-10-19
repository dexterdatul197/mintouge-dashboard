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
import { OrderApi } from '@/api';

const Dashboard = (props) => {
  const dataColors = '["--bs-danger","--bs-primary", "--bs-success"]';
  const lineColumnAreaColors = getChartColorsArray(dataColors);
  const [statics, setStatics] = useState({});

  const graphData = statics?.chatData?.map(val => val?.orders);

  const series = [
    {
      name: "",
      type: "column",
      data: [...graphData || []]
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
    labels: statics?.chatData?.map(val => val?.statsDate),
    markers: {
      size: 0,
    },
    legend: {
      offsetY: 11,
    },
    xaxis: {
      type: "string",
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0);
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
      value: statics?.orderCount || 0,
      badgeValue: "+ 0.2%",
      color: "#d1efec",
      desc: "From previous period",
    },
    {
      icon: "bx bx-archive-in",
      title: "Revenue",
      value: `$ ${Number(statics?.revenue).toFixed(1)}`,
      badgeValue: "+ 0.2%",
      color: "#d2e4e1",
      desc: "From previous period",
    },
    {
      icon: "bx bx-purchase-tag-alt",
      title: "Average Price",
      value: `$ ${Number(statics?.avgPrice).toFixed(1)}`,
      badgeValue: "0%",
      color: "#fae6d8",
      desc: "From previous period",
    },
  ];

  const fetchStatics = async () => {
    const response = await OrderApi.statsOrder();
    setStatics(response);
  };

  useEffect(() => {
    fetchStatics();
  }, []);

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
              stats={statics}
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
