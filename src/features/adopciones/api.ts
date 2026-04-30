import { httpClient } from "../../lib/http/client";
import type { AdopcionPayload } from "./types";

export const createAdopcion = async (payload: AdopcionPayload) => {
  const response = await httpClient.post("/adopciones", payload);
  return response.data;
};
