import axios from "axios";

export const http = axios.create({
  baseURL: "https://emiscode-tv-series-api.herokuapp.com/api/",
});
