import React from "react";

function TableUtil({ tableHeaderData, tableBodyData, tableFootData }) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered m-0 table-sm">
        <thead>
          <tr>
            {tableHeaderData.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>{tableBodyData}</tbody>
        {/* <tbody>
          {tableBodyData.map((item) => (
            <tr key={item.clientId}>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>+{item.phoneNo}</td>
              <td>{item.clientId}</td>
              <td align="center">
                <a href={`/clients/${item.clientId}`}>
                  {" "}
                  <i className="fas fa-ellipsis-h" />
                </a>
              </td>
            </tr>
          ))}
        </tbody> */}
        <tfoot>{tableFootData}</tfoot>
      </table>
    </div>
  );
}

export default TableUtil;
