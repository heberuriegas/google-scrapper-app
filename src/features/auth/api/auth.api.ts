import { authAxiosInstance, axiosInstance } from "../../../clients/axios";
import {
  Credentials,
  storageCredentials,
  storeCredentialsHeaders,
} from "../helpers/credentials";
import { User } from "../types/user.types";

/**
 * Returns the authenticated user detail
 * @returns {User}
 */
export const me = async () => {
  const result = await axiosInstance.get<void, { data: User }>("/me");
  return result.data;
};

export interface SignInParams {
  email: string;
  password: string;
}
/**
 * Authenticate a user
 * @param {Object} obj
 * @param {string} obj.email
 * @param {string} obj.password
 * @returns
 */
export const signIn = async (variables: SignInParams) => {
  const result = await authAxiosInstance.post<
    SignInParams,
    { data: Credentials }
  >("/oauth/token", {
    ...variables,
    grant_type: "password",
    client_id: process.env.REACT_APP_CLIENT_ID,
  });
  return result.data;
};

interface SignOutParams {
  client_id: string;
  token: string;
}

/**
 * Revoke access token in server
 */
export const signOut = async () => {
  const credentials = storageCredentials();
  if (credentials) {
    await authAxiosInstance.post<SignOutParams>("/oauth/revoke", {
      client_id: process.env.REACT_APP_CLIENT_ID,
      token: credentials.accessToken,
    });
  }
};

export interface SignUpParams {
  email: string;
  password: string;
}

/**
 * Create a user and store credentials to local storage
 * @param {Object} obj
 * @param {string} obj.email
 * @param {string} obj.password
 * @returns {User}
 */
export const signUp = async (variables: SignUpParams) => {
  const result = await authAxiosInstance.post<
    SignUpParams,
    { data: User; headers: Record<string, string> }
  >("/users", {
    user: variables,
  });

  storeCredentialsHeaders(result.headers);

  return result.data;
};
