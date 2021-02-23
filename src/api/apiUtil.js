import { useState, useEffect } from "react";
import axios from "./axios";
import { useHistory } from "react-router-dom";

const useRequest = ({ url }) => {
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
          if (error.response === undefined || error.response.status !== 401) {
            history.push({
              pathname: "/error",
              state: { detail: error.message },
            });
          } else if (error.response.status === 401) {
            localStorage.setItem("message", "Login for access!");
            history.push("/login");
          } else {
            history.push({
              pathname: "/error",
              state: { detail: error.message },
            });
          }
        });
    })();
  }, [url, history]);

  return { apiData, statusCode };
};

export default useRequest;

export async function UsePost(url, params) {
  const dataResponse = await axios.post(url, params);
  return dataResponse.data;
}

export async function UsePut(url, params) {
  const dataResponse = await axios.put(url, params);
  return dataResponse.data;
}

export async function UseDelete(url, params) {
  const dataResponse = await axios.delete(url, {
    data: params,
  });
  return dataResponse.data;
}
