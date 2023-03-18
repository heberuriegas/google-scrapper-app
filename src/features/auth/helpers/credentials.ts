export interface Credentials {
  accessToken: string;
  createdAt: string;
  expiresIn: string;
  refreshToken: string;
  tokenType: string;
}
/**
 * Detect if a set of headers includes credentials and store them to local storage
 * @param {Object} headers
 */
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

/**
 * Stringify a credentials object and save to local storage
 * @param {Credentials} credentials
 */
export const storeCredentials = (credentials: Credentials) => {
  localStorage.setItem("credentials", JSON.stringify(credentials));
};

/**
 * Clear credentials from local storage
 */
export const clearCredentials = () => {
  localStorage.removeItem("credentials");
};

/**
 * Read credentials from local storage
 * @returns {Credentials}
 */
export const storageCredentials = () => {
  const credentials = localStorage.getItem("credentials");
  if (credentials) return JSON.parse(credentials) as Credentials;
};
