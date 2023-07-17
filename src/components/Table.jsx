import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { HeaderIDs } from '@/utils/constants';

const Table = (props) => {
  const { data, headers } = props;
  const navigate = useNavigate();

  return (
    <table className="table align-middle table-nowrap mb-0">
      <thead>
        <tr style={{ borderColor: "lightgray" }}>
          {headers.map(header => (
            <th scope="col" key={header.id}>
              {header.title}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, index) => (
          <tr
            key={row.id}
            style={(index > data.length - 2) ? {} : { borderColor: "lightgray" }}
          >
            {headers.map(header => {
              switch (header.id) {
                case HeaderIDs.PRODUCT_NAME: {
                  return (
                    <td
                      key={header.id}
                      className="d-flex cursor-pointer"
                      onClick={() => navigate(`/products/${row.id}`)}
                    >
                      <img
                        src={row.images[0]}
                        loading="lazy"
                        height="50px"
                        alt="Product Image"
                        className="avatar-sm d-block rounded me-4 object-fit-cover"
                        onError={(e) => {
                          e.onerror = null;
                          e.target.src = "https://mintouge-s3-public.s3.eu-west-2.amazonaws.com/brand_dashboard/no_image.jpeg";
                      }}
                      />
                      <span className="table-element underline text-primary">
                        {row.name}
                      </span>
                    </td>
                  )
                }
                case HeaderIDs.DPP: {
                  return (
                    <td key={header.id}>
                      <Link to={row.passportUrl} className="underline text-primary" target="_blank">
                        {row.digitalPassport}
                      </Link>
                    </td>
                  )
                }
                case HeaderIDs.INSURANCE: {
                  return (
                    <td key={header.id}>
                      {row.insurance
                        ? <div className="state success-color">Insured</div>
                        : <div className="state failed-color">Not Insured</div>
                      }
                    </td>
                  )
                }
                default: {
                  return (
                    <td key={header.id}>
                      {row[header.id]}
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

export default Table;
