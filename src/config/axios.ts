import axios from "axios";

export const authAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_HOST || "http://localhost:3001/",
});

export const axiosInstance = axios.create({
  baseURL:
    process.env.REACT_APP_API_HOST + "/api" || "http://localhost:3001/api/",
});

axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    // TODO: Camelize
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
