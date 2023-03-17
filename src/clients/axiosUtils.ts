import { AxiosRequestConfig, AxiosResponse } from "axios";
import { camelizeKeys, decamelizeKeys } from "humps";

export type CustomAxiosResponse = AxiosResponse<any> & {
  config: {
    skipTransformData?: boolean;
    preserveDataKeys?: string[];
  };
};

export type CustomAxiosRequestConfig = AxiosRequestConfig<any> & {
  config?: {
    skipTransformData?: boolean;
    skipTransformParams?: boolean;

    preserveParamsKeys?: string[];
    preserveDataKeys?: string[];
  };
};

export const addBaseHeaders = (config: AxiosRequestConfig<any>) => {
  if (config.headers) {
    config.headers["Content-Type"] = "application/json";
    config.headers["Accept"] = "application/json";
    if (process.env.REACT_APP_CLIENT_ID)
      config.headers["Client-Id"] = process.env.REACT_APP_CLIENT_ID;
  }
  return config;
};

export const camelizeResponse = (response: CustomAxiosResponse) => {
  if (response.data) {
    response.data = camelizeKeys(response.data, (key, convert) => {
      return (response.config &&
        response.config.preserveDataKeys &&
        response.config.preserveDataKeys.includes(key)) ||
        (response.config && response.config.skipTransformData)
        ? key
        : convert(key);
    });
  }
  return response;
};

export const decamelizeParams = (request: CustomAxiosRequestConfig) => {
  if (request.params) {
    request.params = decamelizeKeys(request.params, (key, convert) => {
      return (request.config &&
        request.config.preserveParamsKeys &&
        request.config.preserveParamsKeys.includes(key)) ||
        (request.config && request.config.skipTransformParams)
        ? key
        : convert(key);
    });
  }
  return request;
};

export const decamelizeData = (request: CustomAxiosRequestConfig) => {
  if (request.data) {
    request.data = decamelizeKeys(request.data, (key, convert) => {
      return (request.config &&
        request.config.preserveParamsKeys &&
        request.config.preserveParamsKeys.includes(key)) ||
        (request.config && request.config.skipTransformParams)
        ? key
        : convert(key);
    });
  }
  return request;
};
