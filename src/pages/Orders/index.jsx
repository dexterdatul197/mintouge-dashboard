import React, { useState, useMemo } from 'react';

import { OrderHeaders } from '@/utils/constants';
import img1 from '@assets/images/small/img-1.jpg';
import Table from '@/components/Table';

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const ordersList = [
    {
      id: 1,
      images: [img1],
      name: "Product Name",
      digitalPassport: "38373362162338",
      passportUrl: "https://google.com",
      price: "4058",
      user: "@eidhhd",
      insurance: true,
    },
    {
      id: 2,
      images: [img1],
      name: "Product Name",
      digitalPassport: "38373362162338",
      passportUrl: "https://google.com",
      price: "4058",
      user: "@eidhhd",
      insurance: false,
    },
    {
      id: 3,
      images: [img1],
      name: "Product Name",
      digitalPassport: "38373362162338",
      passportUrl: "https://google.com",
      price: "4058",
      user: "@eidhhd",
      insurance: true,
    },
    {
      id: 4,
      images: [img1],
      name: "Product Name",
      digitalPassport: "38373362162338",
      passportUrl: "https://google.com",
      price: "4058",
      user: "@eidhhd",
      insurance: false,
    },
  ];

  const filteredOrdersList = useMemo(() => {
    const searchTermRegex = new RegExp(searchQuery, 'gi');

    return ordersList.filter(item => {
      const searchText = item.name + ' ' +
        item.digitalPassport + ' ' +
        item.value + ' ' + item.user + ' ' +
        (item.insurance ? "insured" : "not insured");
      return Boolean(searchText.match(searchTermRegex));
    })
  }, [searchQuery, ordersList]);

  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="page-title-container mb-4">
          <div className="me-2">
            <h3 className="">Orders</h3>
          </div>
          <input
            className="orders-search"
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="table-responsive border-1 p-2">
          <Table headers={OrderHeaders} data={filteredOrdersList} />
        </div>
      </div>
    </div>
  )
}

export default Orders
