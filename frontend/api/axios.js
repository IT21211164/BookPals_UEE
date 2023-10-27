import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.8.117:3500/bookpals",
  headers: {
    "Content-Type": "application/json"
  }
});

export default axiosInstance;
