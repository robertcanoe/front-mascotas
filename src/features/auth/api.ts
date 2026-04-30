import { httpClient } from "../../lib/http/client";
import type { AuthLoginPayload, AuthLoginResponse } from "./types";

export const loginAdmin = async (payload: AuthLoginPayload) => {
  const response = await httpClient.post<AuthLoginResponse>("/auth/login", payload);
  return response.data;
};
