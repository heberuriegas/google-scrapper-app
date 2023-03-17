import { createContext, useEffect, useState } from "react";
import {
  SignInParams,
  SignUpParams,
  me,
  signIn as signInApi,
  signOut as signOutApi,
  signUp as signUpApi,
} from "../api/auth.api";
import { storageCredentials, storeCredentials } from "../helpers/credentials";
import { User } from "../users/user.types";

interface AuthContextType {
  user?: User;
  userLoading: boolean;
  signUp: (variables: SignUpParams) => Promise<void>;
  signIn: (variables: SignInParams) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: undefined,
  userLoading: true,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>();
  const [userLoading, setUserLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const credentials = storageCredentials();
      if (credentials) {
        setUserLoading(true);
        const newUser = await me();
        setUser(newUser);
      }
      setUserLoading(false);
    })();
  }, []);

  const signUp = async (variables: SignUpParams) => {
    const newUser = await signUpApi(variables);
    setUser(newUser);
  };

  const signIn = async (variables: SignInParams) => {
    const credentials = await signInApi(variables);
    storeCredentials(credentials);
    const newUser = await me();
    setUser(newUser);
  };

  const signOut = async () => {
    await signOutApi();
    setUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userLoading,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
