import React from "react";
import tableData from "./tableData";
function TableUtil({ tableHeaderData, tableBodyData, tableFootData }) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered m-0 table-sm">
        <thead>
          <tr>
            {Object.values(tableHeaderData).map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <>
            {tableBodyData.map((item, index) => (
              <tr key={index}>
                {Object.keys(tableHeaderData).map((col, key) => (
                  <td key={key}>{tableData(col, item)}</td>
                ))}
              </tr>
            ))}
          </>
        </tbody>
        <tfoot>{tableFootData}</tfoot>
      </table>
    </div>
  );
}

export default TableUtil;
