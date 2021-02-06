import React from "react";

function StatBox({ dataName, dataValue, dataColor, dataIcon, dataLink }) {
  return (
    <div className="col-lg-3 col-6">
      <div className={`small-box ${dataColor}`}>
        <div className="inner">
          <h3>{dataValue}</h3>
          <p>{dataName}</p>
        </div>
        <div className="icon">
          <i className={dataIcon} />
        </div>
        <a href={dataLink} className="small-box-footer">
          More info <i className="fas fa-arrow-circle-right" />
        </a>
      </div>
    </div>
  );
}

export default StatBox;
