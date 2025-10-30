export const createApiResponse = (
  success: boolean,
  message: string,
  data: any = null,
  status_code: number = 200
) => {
  return {
    success,
    message,
    ...(data ? { data } : {}),
    status_code,
  };
};

export const createPaginatedResponse = (
  success: boolean,
  message: string,
  meta: any = null,
  data: any = null,
  status_code: number = 200
) => ({
  success,
  message,
  meta,
  data,
  status_code,
});

export const createErrorResponse = (
  message: string,
  error: any = null,
  status_code: number = 500
) => {
  return {
    success: false,
    message,
    error,
    status_code,
  };
};
