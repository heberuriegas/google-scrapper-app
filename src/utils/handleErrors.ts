interface ValidationError {
  [key: string]: [string];
}

export const responseErrors = (err: any) =>
  err?.response?.data?.errors as ValidationError;
