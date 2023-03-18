interface ValidationError {
  [key: string]: [string];
}

/**
 * Check if a errors object was returned from an api call
 * @param {any} err
 * @returns {Object}
 */
export const responseErrors = (err: any) =>
  err?.response?.data?.errors as ValidationError;
