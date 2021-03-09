import { useState, useEffect } from "react";
import axios from "./axios";
import { API_BASE_URL } from "../constants/index";

const useRequest = ({ url }) => {
  const [apiData, setApiData] = useState();
  const [statusCode, setStatusCode] = useState();

  useEffect(() => {
    (async () => {
      await axios
        .get(url)
        .then(({status, data }) => {
          setStatusCode(status)
          setApiData(data);
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
        });
    })();
  }, [url]);

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
