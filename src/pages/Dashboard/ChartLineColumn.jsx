import React from "react";
import ReactApexChart from "react-apexcharts";
import { Input } from 'reactstrap';

import getChartColorsArray from "./ChartsDynamicColor";

const ChartLineColumn = (props) => {
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

  return (
    <div className="table-responsive border-1 p-3">
      <div className="flex-group h-80px">
        <div className="d-flex">
          <Input
            addon
            aria-label="Checkbox for following text input"
            type="checkbox"
            className="me-2"
          />
          <span>Digital Passport</span>
        </div>
        <div>1450</div>
        <div>Minted today 43</div>
      </div>

      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height="300"
      />
    </div>
  );
};

export default ChartLineColumn;
