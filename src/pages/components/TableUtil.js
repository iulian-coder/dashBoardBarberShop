import React from "react";

function TableUtil({ tableHeaderData, tableBodyData, tableFootData }) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered m-0 table-sm">
        <thead>
          <tr >
            {tableHeaderData.map((item, index) => (
              <th  key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>{tableBodyData}</tbody>
        <tfoot>{tableFootData}</tfoot>
      </table>
    </div>
  );
}

export default TableUtil;
