import { authAxiosInstance, axiosInstance } from "../../../clients/axios";
import { Credentials, storeCredentialsHeaders } from "../helpers/credentials";
import { User } from "../users/user.types";

export const me = async () => {
  const result = await axiosInstance.get<void, { data: User }>("/me");
  return result.data;
};

export interface SignInParams {
  email: string;
  password: string;
}
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

export const signOut = async () => {
  return new Promise((response) => {
    setTimeout(() => {
      response(null);
    }, 100);
  });
};

export interface SignUpParams {
  email: string;
  password: string;
}

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
