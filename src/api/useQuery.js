import { useState, useEffect } from "react";
import axios from "./axios";
import { useHistory } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";

const useQuery = ({ url }) => {
  const [statusCode, setStatusCode] = useState();
  const [apiData, setApiData] = useState();
  const history = useHistory();

  const token = localStorage.getItem(ACCESS_TOKEN);

  useEffect(() => {
    (async () => {
      await axios
        .get(url, { headers: { Authorization: `Bearer ${token}` } })
        .then(({ status, data }) => {
          setStatusCode(status);
          setApiData(data);
        })
        .catch((error) => {
          if (error.response === undefined || error.response.status !== 401) {
            history.push({
              pathname: "/error",
              state: { detail: error.message },
            });
          } else if (error.response.status === 401) {
            history.push("/login");
          } else {
            history.push({
              pathname: "/error",
              state: { detail: error.message },
            });
          }
        });
    })();
  }, [url, history, token]);

  return { apiData, statusCode };
};

export default useQuery;
