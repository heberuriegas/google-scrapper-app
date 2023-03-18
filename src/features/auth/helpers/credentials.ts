export interface Credentials {
  accessToken: string;
  createdAt: string;
  expiresIn: string;
  refreshToken: string;
  tokenType: string;
}

export const storeCredentialsHeaders = (headers: Record<string, string>) => {
  if (headers["access-token"]) {
    const accessToken = headers["access-token"];
    const createdAt = headers["created-at"];
    const expiresIn = headers["expires-in"];
    const refreshToken = headers["refresh-token"];
    const tokenType = headers["token-type"];

    const credentials: Credentials = {
      accessToken,
      createdAt,
      expiresIn,
      refreshToken,
      tokenType,
    };

    storeCredentials(credentials);
  }
};

export const storeCredentials = (credentials: Credentials) => {
  localStorage.setItem("credentials", JSON.stringify(credentials));
};

export const clearCredentials = () => {
  localStorage.removeItem("credentials");
};

export const storageCredentials = () => {
  const credentials = localStorage.getItem("credentials");
  if (credentials) return JSON.parse(credentials) as Credentials;
};
