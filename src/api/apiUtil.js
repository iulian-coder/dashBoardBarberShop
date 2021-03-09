import { useState, useEffect } from "react";
import axios from "./axios";
import { useHistory } from "react-router-dom";
import { API_BASE_URL } from "../constants/index";

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
          console.log("object");
          if (error.response === undefined) {
            history.push({
              pathname: "/error",
              state: { detail: error.message },
            });
          } else if (error.response.status === 401) {
            localStorage.setItem(
              "message",
              "Hello, you will need to login first!"
            );
            history.push({ pathname: "/login" });
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

export function GetCurrentUser() {
  const dataResponse = axios.get(API_BASE_URL + "/user/me");
  return dataResponse;
}

export async function UsePost({ url, params }) {
  const dataResponse = await axios.post(url, params);
  return dataResponse.data;
}

export async function UsePut({ url, params }) {
  const dataResponse = await axios.put(url, params);
  return dataResponse.data;
}

export async function UseDelete({ url, params }) {
  const dataResponse = await axios.delete(url, {
    data: params,
  });
  return dataResponse.data;
}
