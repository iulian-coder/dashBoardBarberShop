import { useState, useEffect } from "react";
import axios from "../api/axios";
import { useHistory } from "react-router-dom";

const useQuery = ({ url }) => {
  const [statusCode, setStatusCode] = useState();
  const [apiData, setApiData] = useState();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      await axios
        .get(url)
        .then(({ status, data }) => {
          setStatusCode(status);
          setApiData(data);
        })
        .catch((error) => {
          history.push({
            pathname: "/error",
            state: { detail: error.message },
          });
        });
    })();
  }, [url, history]);

  return { apiData, statusCode };
};

export default useQuery;
