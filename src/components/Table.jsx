import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Switch from 'react-switch';
import { HeaderIDs } from '@/utils/constants';

const Table = (props) => {
  const { data, headers, updateData } = props;
  const navigate = useNavigate();

  return (
    <table className="table align-middle table-nowrap mb-0">
      {data.length === 0
        ? <div className="d-flex align-items-center justify-content-center w-100">No Data</div>
        : <>
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
                          onClick={() => navigate(`/products/${row.productId || row.id}`)}
                        >
                          <img
                            src={row.images[0]}
                            loading="lazy"
                            height="50px"
                            alt="Product Image"
                            className="avatar-sm d-block rounded me-4 object-fit-cover"
                            onError={(e) => {
                              e.onerror = null;
                              e.target.src = "https://cdn.vaultik.com/brand_dashboard/no_image.jpeg";
                            }}
                          />
                          <span className="table-element underline text-primary">
                            {row.name}
                          </span>
                        </td>
                      )
                    }
                    case HeaderIDs.REWARD_NAME: {
                      return (
                        <td
                          key={header.id}
                          className="d-flex cursor-pointer"
                          onClick={() => navigate(`/rewards/${row.productId || row.id}`)}
                        >
                          <img
                            src={row.coverImage}
                            loading="lazy"
                            height="50px"
                            alt="Product Image"
                            className="avatar-sm d-block rounded me-4 object-fit-cover"
                            onError={(e) => {
                              e.onerror = null;
                              e.target.src = "https://cdn.vaultik.com/brand_dashboard/no_image.jpeg";
                            }}
                          />
                          <span className="table-element underline text-primary">
                            {row.title}
                          </span>
                        </td>
                      )
                    }
                    case HeaderIDs.REWARD_ACTIVE: {
                      return (
                        <td key={header.id}>
                          <Switch
                            uncheckedIcon={<div />}
                            checkedIcon={<div />}
                            onColor="#34c38f"
                            onChange={() => {
                              updateData(row.id, header.id)
                            }}
                            checked={row[header.id]}
                          />
                        </td>
                      )
                    }
                    case HeaderIDs.INSURANCE: {
                      return (
                        <td key={header.id}>
                          {row[header.id]
                            ? <div className="state success-color">Insured</div>
                            : <div className="state failed-color">Not Insured</div>
                          }
                        </td>
                      )
                    }
                    case HeaderIDs.REDEEM: {
                      return (
                        <td key={header.id}>
                          {row[header.id]
                            ? <div className="state success-color">Redeemed</div>
                            : <div className="state failed-color">Not Redeemed</div>
                          }
                        </td>
                      )
                    }
                    case HeaderIDs.DPP: {
                      return (
                        <td key={header.id}>
                          <Link to={`${header.uri}${row.tokenAddress}\\${row.tokenId}`} className="underline text-primary" target="_blank">
                            {row[header.id]}
                          </Link>
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
        </>}
    </table>
  )
}

export default Table;
