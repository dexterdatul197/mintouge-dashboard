import React, { useState, useMemo } from 'react';

import { ClientHeaders } from '@/utils/constants';
import Table from '@/components/Table';

const Clients = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const clientList = [
    {
      id: 1,
      name: "Takao Kato",
      email: "takao@mintouge.com",
      phone: "+81 50 5479 2016",
      address: "Shinjuku, Tokyo, Japan",
    },
    {
      id: 2,
      name: "Takao Kato",
      email: "takao@mintouge.com",
      phone: "+81 50 5479 2016",
      address: "Shinjuku, Tokyo, Japan",
    },
    {
      id: 3,
      name: "Takao Kato",
      email: "takao@mintouge.com",
      phone: "+81 50 5479 2016",
      address: "Shinjuku, Tokyo, Japan",
    },
    {
      id: 4,
      name: "Takao Kato",
      email: "takao@mintouge.com",
      phone: "+81 50 5479 2016",
      address: "Shinjuku, Tokyo, Japan",
    },
    {
      id: 5,
      name: "Takao Kato",
      email: "takao@mintouge.com",
      phone: "+81 50 5479 2016",
      address: "Shinjuku, Tokyo, Japan",
    },
    {
      id: 6,
      name: "Takao Kato",
      email: "takao@mintouge.com",
      phone: "+81 50 5479 2016",
      address: "Shinjuku, Tokyo, Japan",
    },
    {
      id: 7,
      name: "Takao Kato",
      email: "takao@mintouge.com",
      phone: "+81 50 5479 2016",
      address: "Shinjuku, Tokyo, Japan",
    },
    {
      id: 8,
      name: "Takao Kato",
      email: "takao@mintouge.com",
      phone: "+81 50 5479 2016",
      address: "Shinjuku, Tokyo, Japan",
    },
    {
      id: 9,
      name: "Takao Kato",
      email: "takao@mintouge.com",
      phone: "+81 50 5479 2016",
      address: "Shinjuku, Tokyo, Japan",
    },
  ];

  const filteredOrdersList = useMemo(() => {
    const searchTermRegex = new RegExp(searchQuery, 'gi');

    return clientList.filter(item => {
      const searchText = item.name + ' ' +
        item.digitalPassport + ' ' +
        item.value + ' ' + item.user + ' ' +
        (item.insurance ? "insured" : "not insured");
      return Boolean(searchText.match(searchTermRegex));
    })
  }, [searchQuery, clientList]);

  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="page-title-container mb-4">
          <div className="me-2">
            <h3 className="">Clients</h3>
          </div>
          <input
            className="orders-search"
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="table-responsive border-1 p-2">
          <Table headers={ClientHeaders} data={filteredOrdersList} />
        </div>
      </div>
    </div>
  )
}

export default Clients;
