import React from "react"
import { Link } from "react-router-dom"

const TableOrders = (props) => {
  const { ordersList } = props;

  return (
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
  )
}

export default TableOrders
