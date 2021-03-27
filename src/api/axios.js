import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN } from "../constants/index";

const instance = axios.create({

  baseURL: API_BASE_URL,

});
// All requests using this instance will wait 2 second before timing out
instance.defaults.timeout = 2000;
instance.defaults.headers.common[
  "Authorization"
] = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`;

export default instance;
