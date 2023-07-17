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
                  const stringData = (String(row[header.id]) || "");
                  const crop = (stringData.length > 50) ? (stringData.substring(0, 80) + "...") : stringData;

                  if (header.hasLink) {
                    return (
                      <td key={header.id}>
                        <Link to={(header.uri || "") + row[header.id]} className="underline text-primary" target="_blank">
                          {crop}
                        </Link>
                      </td>
                    )
                  }
                  return (
                    <td key={header.id}>
                      {crop}
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
