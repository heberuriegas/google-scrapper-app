import { createContext, useState } from "react";
import { signIn as signInApi, signOut as signOutApi } from "../api/auth.api";

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
  let [user, setUser] = useState<any>(null);

  let signIn = async (
    email: string,
    password: string,
    callback: VoidFunction
  ) => {
    const newUser = await signInApi(email, password);
    setUser(newUser);
    callback();
  };

  let signOut = async (callback: VoidFunction) => {
    await signOutApi();
    setUser(null);
    callback();
  };

  let value = { user, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
