import React from "react";
import { formatDate } from "../components/Tables";
import { useHistory } from "react-router-dom";

function StatBox({
  dataName,
  reportDate,
  dataValue,
  dataColor,
  dataIcon,
  dataLink,
}) {
  const history = useHistory();

  const handleIconClick = (link) => {
    history.push(link);
  };
  return (
    <div className="col-lg-3 col-6">
      <div className={`small-box ${dataColor}`}>
        <div className="inner">
          <h3>{dataValue}</h3>
          <p>
            {dataName} {formatDate({ date: reportDate, option: "MONTH" })}
          </p>
        </div>
        <div className="icon">
          <i className={dataIcon} onClick={() => handleIconClick(dataLink)} />
        </div>
        <a href={dataLink} className="small-box-footer">
          More info <i className="fas fa-arrow-circle-right" />
        </a>
      </div>
    </div>
  );
}

export default StatBox;
