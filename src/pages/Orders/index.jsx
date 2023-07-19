import React, { useState, useMemo, useEffect } from 'react';

import { OrderApi } from '@/api';
import Table from '@/components/Table';
import useToast from '@/utils/useToast';
import { OrderHeaders } from '@/utils/constants';
import LoadingScreen from '@/components/LoadingScreen';

const Orders = ({ title, isLast }) => {
  const [isLoading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [ordersList, setOrderList] = useState([]);
  const showToast = useToast();

  useEffect(() => {
    const fetchOrders = async () => {
      const page = 0;
      const pageSize = isLast ? 5 : 100;
      try {
        setLoading(true);
        const _data = await OrderApi.getOrders(page, pageSize);
        const orders = _data.data.map(order => ({
          ...order.product,
          ...order.consumer,
          user: order.consumer.email,
          tokenId: order.tokenId,
          insurance: order.insurance,
          redeemed: order.redeemed,
          id: order.id,
          productId: order.product.id,
          dpp: order.dpp,
          tokenAddress: order.collection.address,
        }));

        console.log(orders);

        setOrderList(orders);
      } catch (error) {
        showToast(error.toString(), "error");
      }
      setLoading(false);
    }

    fetchOrders();
  }, []);

  const filteredOrdersList = useMemo(() => {
    const searchTermRegex = new RegExp(searchQuery, 'gi');

    return ordersList.filter(item => {
      const searchText = item.name + ' ' +
        item.dpp + ' ' +
        item.price + ' ' + item.user + ' ' +
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
            <h3 className="">{title || Orders}</h3>
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