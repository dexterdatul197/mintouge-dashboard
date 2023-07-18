import React, { useState, useMemo, useEffect } from 'react';

import { OrderApi } from '@/api';
import Table from '@/components/Table';
import { OrderHeaders } from '@/utils/constants';
import LoadingScreen from '@/components/LoadingScreen';

const _ordersList = [
  {
    id: 10,
    images: ["https://cdn-images.farfetch-contents.com/19/66/40/44/19664044_43931188_1000.jpg"],
    name: "logo-knit gingham tote bag",
    dpp: "100",
    passportUrl: "https://google.com",
    price: "1400",
    user: "@eidhhd",
    insurance: true,
  },
  {
    id: 12,
    images: ["https://cdn-images.farfetch-contents.com/19/66/40/44/19664044_43931188_1000.jpg"],
    name: "logo-knit gingham tote bag",
    dpp: "100",
    passportUrl: "https://google.com",
    price: "1400",
    user: "@eidhhd",
    insurance: false,
  },
  {
    id: 13,
    images: ["https://cdn-images.farfetch-contents.com/19/66/40/44/19664044_43931188_1000.jpg"],
    name: "logo-knit gingham tote bag",
    dpp: "100",
    passportUrl: "https://google.com",
    price: "1400",
    user: "@eidhhd",
    insurance: true,
  },
  {
    id: 14,
    images: ["https://cdn-images.farfetch-contents.com/19/66/40/44/19664044_43931188_1000.jpg"],
    name: "logo-knit gingham tote bag",
    dpp: "100",
    passportUrl: "https://google.com",
    price: "1400",
    user: "@eidhhd",
    insurance: false,
  },
];

const Orders = () => {
  const [isLoading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [ordersList, setOrderList] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const _data = await OrderApi.getOrders();

        setOrderList(_data.data);
        if (_data.data.length === 0) {
          setOrderList(_ordersList);
        }
        setLoading(false);
      } catch (error) {
        showToast(error.toString(), "error");
        setInvalid(true);
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

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

  if (isLoading) {
    return <LoadingScreen />
  }

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

export default Orders;