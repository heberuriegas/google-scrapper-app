import axios from "axios";
import { storageCredentials } from "../features/auth/helpers/credentials";
import {
  addBaseHeaders,
  camelizeResponse,
  decamelizeData,
  decamelizeParams,
} from "./axiosUtils";

// Axios instance for auth requests
export const authAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_HOST || "http://localhost:3001/",
});

authAxiosInstance.interceptors.request.use(
  (request) => {
    request = addBaseHeaders(request);
    request = decamelizeParams(request);
    request = decamelizeData(request);
    return request;
  },
  (response) => Promise.reject(response)
);

authAxiosInstance.interceptors.response.use(
  (response) => camelizeResponse(response),
  (response) => Promise.reject(response)
);

// Axios instance for authenticated requests
export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_HOST
    ? process.env.REACT_APP_API_HOST + "/api"
    : "http://localhost:3001/api/",
});

axiosInstance.interceptors.request.use(
  (request) => {
    request = addBaseHeaders(request);
    request = decamelizeParams(request);
    request = decamelizeData(request);

    const credentials = storageCredentials();
    if (credentials && request.headers)
      request.headers["Authorization"] = `Bearer ${credentials.accessToken}`;
    return request;
  },
  (response) => Promise.reject(response)
);

axiosInstance.interceptors.response.use(
  (response) => camelizeResponse(response),
  (response) => Promise.reject(response)
);
