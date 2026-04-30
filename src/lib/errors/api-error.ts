export type ApiError = {
  error: string;
  message?: string;
  details?: Record<string, string | string[]>;
  status?: number;
};

export const getApiErrorMessage = (apiError: unknown): string => {
  const value = apiError as Partial<ApiError> | undefined;
  return value?.message ?? value?.error ?? "Unexpected error";
};
