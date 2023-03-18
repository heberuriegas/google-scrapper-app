import axios from "axios";
import { storageCredentials } from "../features/auth/helpers/credentials";
import {
  addBaseHeaders,
  camelizeData,
  decamelizeData,
  decamelizeParams,
} from "./axiosUtils";

// Axios instance for auth requests
export const authAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_HOST || "http://localhost:3001/",
});

/**
 * Prepare sign up and sign in requests to be able to be read it by the server. It will:
 * 1. Add base headers (Content-Type and Accept)
 * 2. Decamelize params keys
 * 3. Decamelize data keys
 */
authAxiosInstance.interceptors.request.use(
  (request) => {
    request = addBaseHeaders(request);
    request = decamelizeParams(request);
    request = decamelizeData(request);
    return request;
  },
  (response) => Promise.reject(response)
);

/**
 * Prepare sign up and sign in server responses to be able to be read it by the client. It will:
 * 1. Camelize response keys
 */
authAxiosInstance.interceptors.response.use(
  (response) => camelizeData(response),
  (response) => Promise.reject(response)
);

// Axios instance for authenticated requests
export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_HOST
    ? process.env.REACT_APP_API_HOST + "/api"
    : "http://localhost:3001/api/",
});

/**
 * Prepare requests to be able to be read it by the server. It will:
 * 1. Add base headers (Content-Type and Accept)
 * 2. Decamelize params keys
 * 3. Decamelize data keys
 * 4. Add access token to Authorization Header
 */
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

/**
 * Prepare server response to be able to be read it by the client. It will:
 * 1. Camelize response keys
 */
axiosInstance.interceptors.response.use(
  (response) => camelizeData(response),
  (response) => Promise.reject(response)
);
