import { authAxiosInstance } from "../../../config/axios";
import { User } from "../users/user.types";

export interface SignInParams {
  email: string;
  password: string;
}
export const signIn = async (variables: SignInParams) => {
  return authAxiosInstance.post<SignInParams, User>("/oauth/token", variables);
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
  return authAxiosInstance.post<SignUpParams, User>("/users", {
    user: variables,
  });
};
