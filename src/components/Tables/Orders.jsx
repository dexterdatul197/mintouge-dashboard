import React from "react"
import { Link } from "react-router-dom"

const TableOrders = (props) => {
  const { ordersList } = props;

  const headers = [
    {
      id: "productName",
      title: "Product Name",
    },
    {
      id: "digitalPassport",
      title: "Digital Passport",
    },
    {
      id: "value",
      title: "Value",
    },
    {
      id: "user",
      title: "User",
    },
    {
      id: "insurance",
      title: "Insurance",
    },
  ]

  return (
    <table className="table align-middle table-nowrap mb-0">
      <thead>
        <tr>
          {headers.map(header => (
            <th
              scope="col"
              key={header.id}
            >
              {header.title}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {ordersList.map(ordersList => (
          <tr key={ordersList.id}>
            {headers.map(header => {
              switch (header.id) {
                case "productName": {
                  return (
                    <td className="d-flex" key={header.id}>
                      <img
                        src={ordersList.img}
                        alt=""
                        className="avatar-md h-auto d-block rounded me-4"
                      />
                      <span className="table-element">
                        {ordersList.productName}
                      </span>
                    </td>
                  )
                }
                case "digitalPassport": {
                  return (
                    <td key={header.id}>
                      <Link to={ordersList.passportUrl} className="text-dark underline" target="_blank">
                        {ordersList.digitalPassport}
                      </Link>
                    </td>
                  )
                }
                case "insurance": {
                  return (
                    <td key={header.id}>
                      {ordersList.insurance
                        ? <div className="state success-color">Insured</div>
                        : <div className="state failed-color">Not Insured</div>
                      }
                    </td>
                  )
                }
                default: {
                  return (
                    <td key={header.id}>
                      {ordersList[header.id]}
                    </td>
                  )
                }
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TableOrders
