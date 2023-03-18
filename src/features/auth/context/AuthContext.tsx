import { createContext, useEffect, useState } from "react";
import {
  SignInParams,
  SignUpParams,
  me,
  signIn as signInApi,
  signOut as signOutApi,
  signUp as signUpApi,
} from "../api/auth.api";
import {
  clearCredentials,
  storageCredentials,
  storeCredentials,
} from "../helpers/credentials";
import { User } from "../types/user.types";

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

/**
 * Provide user and auth operations like sign up, sign in and sign out.
 * @param {Object} obj
 * @param {ReactElement} obj.children
 * @returns {Provider}
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>();
  const [userLoading, setUserLoading] = useState<boolean>(true);

  // Fill initial user with me endpoint
  useEffect(() => {
    (async () => {
      try {
        const credentials = storageCredentials();
        if (credentials) {
          setUserLoading(true);
          const newUser = await me();
          setUser(newUser);
        }
      } finally {
        setUserLoading(false);
      }
    })();
  }, []);

  // Create a user and set new user
  const signUp = async (variables: SignUpParams) => {
    const newUser = await signUpApi(variables);
    setUser(newUser);
  };

  // Create a user, store credentials and set new user
  const signIn = async (variables: SignInParams) => {
    const credentials = await signInApi(variables);
    storeCredentials(credentials);
    const newUser = await me();
    setUser(newUser);
  };

  // Revoke access token, clear credentials and clear user
  const signOut = async () => {
    await signOutApi();
    clearCredentials();
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
