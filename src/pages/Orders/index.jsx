import React from "react"
import { Link } from "react-router-dom"

// import images
import img1 from "@assets/images/small/img-1.jpg"

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
          <table className="table align-middle table-nowrap mb-0">
            <thead>
              <tr>
                <th scope="col" colSpan="2">Product Name</th>
                <th scope="col">Digital Passport</th>
                <th scope="col">Value</th>
                <th scope="col">User</th>
                <th scope="col">Insurance</th>
              </tr>
            </thead>

            <tbody>
              {ordersList.map(ordersList => (
                <tr key={ordersList.id}>
                  <td style={{ width: "100px" }}>
                    <img
                      src={ordersList.img}
                      alt=""
                      className="avatar-md h-auto d-block rounded"
                    />
                  </td>
                  <td>
                    {ordersList.productName}
                  </td>
                  <td>
                    <Link to={ordersList.passportUrl} className="text-dark underline" target="_blank">
                      {ordersList.digitalPassport}
                    </Link>
                  </td>
                  <td>
                    {ordersList.value}
                  </td>
                  <td>
                    {ordersList.user}
                  </td>
                  <td>
                    {ordersList.insurance
                      ? <div className="state success-color">Insured</div>
                      : <div className="state failed-color">Not Insured</div>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Orders
