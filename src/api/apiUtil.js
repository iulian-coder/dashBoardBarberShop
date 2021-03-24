import { useState, useEffect } from "react";
import axios from "./axios";
import { API_BASE_URL } from "../constants/index";
import apiRoute from "./apiRoute";
import { useHistory } from "react-router-dom";

const useRequest = ({ url }) => {
  const history = useHistory();
  const [apiData, setApiData] = useState();

  useEffect(() => {
    (async () => {
      await axios
        .get(url)
        .then(({ data }) => {
          setApiData(data);
        })
        .catch((error) => {
          // console.error(error);
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            history.replace(history.location.pathname, {
              errorStatusCode: error.response.status,
              errorMessage: error.response.data.message,
            });
          } else if (error.request) {
            // The request was made but no response was received
            history.replace(history.location.pathname, {
              errorStatusCode: "general",
              errorMessage:
                "Something went wrong with the response from the server!",
            });
          } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Error", error.message);
          }
        });
    })();
  }, [url, history]);

  return { apiData };
};

export default useRequest;

export async function GetCurrentUser() {
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
