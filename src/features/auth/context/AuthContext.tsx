import { createContext, useState } from "react";
import {
  signIn as signInApi,
  signOut as signOutApi,
  signUp as signUpApi,
} from "../api/auth.api";

interface AuthContextType {
  user: any;
  signIn: (
    email: string,
    password: string,
    callback: VoidFunction
  ) => Promise<void>;
  signOut: (callback: VoidFunction) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  const signUp = async (
    email: string,
    password: string,
    callback: VoidFunction
  ) => {
    const newUser = await signUpApi(email, password);
    setUser(newUser);
    if (callback) callback();
  };

  const signIn = async (
    email: string,
    password: string,
    callback: VoidFunction
  ) => {
    const newUser = await signInApi(email, password);
    setUser(newUser);
    if (callback) callback();
  };

  const signOut = async (callback: VoidFunction) => {
    await signOutApi();
    setUser(null);
    if (callback) callback();
  };

  const value = { user, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
