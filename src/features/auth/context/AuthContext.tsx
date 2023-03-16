import { createContext, useState } from "react";
import {
  SignInParams,
  SignUpParams,
  signIn as signInApi,
  signOut as signOutApi,
  signUp as signUpApi,
} from "../api/auth.api";
import { User } from "../users/user.types";

interface AuthContextType {
  user?: User;
  signUp: (variables: SignUpParams) => Promise<void>;
  signIn: (variables: SignInParams) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>();

  const signUp = async (variables: SignUpParams) => {
    const newUser = await signUpApi(variables);
    setUser(newUser);
  };

  const signIn = async (variables: SignInParams) => {
    const newUser = await signInApi(variables);
    setUser(newUser);
  };

  const signOut = async () => {
    await signOutApi();
    setUser(undefined);
  };

  const value = { user, signUp, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
