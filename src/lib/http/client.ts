import axios from "axios";

import { authStorage } from "../../features/auth/auth-storage";
import { env } from "../../config/env";
import type { ApiError } from "../errors/api-error";

export const httpClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use((config) => {
  const token = authStorage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status as number | undefined;

    if (status === 401) {
      authStorage.clearToken();
    }

    const payload = error?.response?.data as Partial<ApiError> | undefined;
    const apiError: ApiError = {
      error: payload?.error ?? "Request failed",
      message: payload?.message,
      details: payload?.details,
      status,
    };

    return Promise.reject(apiError);
  },
);
