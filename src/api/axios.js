import axios from "axios";

const instance = axios.create({
  baseURL: "https://dashboardbarbershopapi.herokuapp.com/api/v1/",
});

export default instance;
