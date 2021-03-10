import { useState, useEffect } from "react";
import axios from "./axios";
import { API_BASE_URL } from "../constants/index";
import apiRoute from "./apiRoute";

const useRequest = ({ url }) => {
  const [apiData, setApiData] = useState();

  useEffect(() => {
    (async () => {
      await axios
        .get(url)
        .then(({ data }) => {
          setApiData(data);
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
        });
    })();
  }, [url]);

  return { apiData };
};

export default useRequest;

export function GetCurrentUser() {
  const dataResponse = axios.get(API_BASE_URL + apiRoute.user);
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
