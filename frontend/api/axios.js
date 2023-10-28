import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://172.20.10.2:3500/bookpals",
  headers: {
    "Content-Type": "application/json"
  }
});

export default axiosInstance;
