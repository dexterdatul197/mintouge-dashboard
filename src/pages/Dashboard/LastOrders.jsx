import React, { useState, useMemo } from 'react';

import { OrderHeaders } from '@/utils/constants';
import img1 from '@assets/images/small/img-1.jpg'
import Table from '@/components/Table';

const LastOrders = () => {
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
      const searchText = item.productName + ' ' +
        item.digitalPassport + ' ' +
        item.value + ' ' + item.user + ' ' +
        (item.insurance ? "insured" : "not insured");
      return Boolean(searchText.match(searchTermRegex));
    })
  }, [searchQuery, ordersList]);

  return (
    <div className="table-responsive border-1 p-2">
      <div className="page-title-container mb-2 ps-3 pe-3">
        <div className="me-2">
          <h3 className="">Last Orders</h3>
        </div>
        <input
          className="orders-search"
          placeholder="Search"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Table headers={OrderHeaders} data={filteredOrdersList} />
    </div>
  )
}

export default LastOrders
