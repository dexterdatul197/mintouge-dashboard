import React from "react";
import ReactApexChart from "react-apexcharts";
import { Input } from 'reactstrap';

const ChartLineColumn = (props) => {
  const { series, options, stats } = props;


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
        <div>{stats?.orderCount}</div>
        <div>Minted today {stats?.todayMinted || 0}</div>
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
