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

/**
 * Add Content-Type, Accept and Client-Id headers
 * @param {Object} request
 * @returns {Object}
 */
export const addBaseHeaders = (request: AxiosRequestConfig<any>) => {
  if (request.headers) {
    request.headers["Content-Type"] = "application/json";
    request.headers["Accept"] = "application/json";
    if (process.env.REACT_APP_CLIENT_ID)
      request.headers["Client-Id"] = process.env.REACT_APP_CLIENT_ID;
  }
  return request;
};

/**
 * Camelize all response data keys
 * @param {Object} response
 * @returns {Object}
 */
export const camelizeData = (response: CustomAxiosResponse) => {
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

/**
 * Decamelize all request params keys
 * @param {Object} request
 * @returns {Object}
 */
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

/**
 * Decamelize all request data keys
 * @param {Object} request
 * @returns {Object}
 */
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
