import React from "react"

// import images
import img1 from "@assets/images/small/img-1.jpg"
import TableOrders from "@/components/Tables/Orders"

const LastOrders = () => {
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
    <div className="table-responsive border-1 p-2">
      <div className="page-title-container mb-2 ps-3 pe-3">
        <div className="me-2">
          <h3 className="">Last Orders</h3>
        </div>
        <input className="orders-search" placeholder="Search" />
      </div>
      <TableOrders ordersList={ordersList} />
    </div>
  )
}

export default LastOrders
