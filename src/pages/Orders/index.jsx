import React from "react"

// import images
import img1 from "@assets/images/small/img-1.jpg"
import TableOrders from "@/components/Tables/Orders"

const Orders = () => {
  const ordersList = [
    {
      id: 1,
      img: img1,
      productName: "Item Name of maximum 60 caracthers",
      digitalPassport: "38373362162338",
      passportUrl: "https://google.com",
      value: "4058",
      user: "@eidhhd",
      insurance: true,
    },
    {
      id: 2,
      img: img1,
      productName: "Item Name of maximum 60 caracthers",
      digitalPassport: "38373362162338",
      passportUrl: "https://google.com",
      value: "4058",
      user: "@eidhhd",
      insurance: false,
    },
    {
      id: 3,
      img: img1,
      productName: "Item Name of maximum 60 caracthers",
      digitalPassport: "38373362162338",
      passportUrl: "https://google.com",
      value: "4058",
      user: "@eidhhd",
      insurance: true,
    },
    {
      id: 4,
      img: img1,
      productName: "Item Name of maximum 60 caracthers",
      digitalPassport: "38373362162338",
      passportUrl: "https://google.com",
      value: "4058",
      user: "@eidhhd",
      insurance: false,
    },
  ]
  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="page-title-container mb-4">
          <div className="me-2">
            <h3 className="">Orders</h3>
          </div>
          <input className="orders-search" placeholder="Search" />
        </div>

        <div className="table-responsive border-1 p-2">
          <TableOrders ordersList={ordersList} />
        </div>
      </div>
    </div>
  )
}

export default Orders
