import { httpClient } from "../../lib/http/client";
import { normalizeMascota } from "./normalizers";
import type { Mascota, MascotaApiRaw, MascotaPayload } from "./types";

type ApiResponse<T> = {
  data: T;
};

const unwrapApiData = <T>(payload: T | ApiResponse<T>): T => {
  if (payload && typeof payload === "object" && "data" in payload) {
    return (payload as ApiResponse<T>).data;
  }
  return payload as T;
};

export const getMascotas = async (): Promise<Mascota[]> => {
  const response = await httpClient.get<MascotaApiRaw[] | ApiResponse<MascotaApiRaw[]>>("/mascotas");
  return unwrapApiData(response.data).map(normalizeMascota);
};

export const getMascotaById = async (id: number): Promise<Mascota> => {
  const response = await httpClient.get<MascotaApiRaw | ApiResponse<MascotaApiRaw>>(`/mascotas/${id}`);
  return normalizeMascota(unwrapApiData(response.data));
};

export const createMascota = async (payload: MascotaPayload) => {
  const response = await httpClient.post<MascotaApiRaw | ApiResponse<MascotaApiRaw>>("/mascotas", payload);
  return normalizeMascota(unwrapApiData(response.data));
};

export const updateMascota = async (id: number, payload: MascotaPayload) => {
  const response = await httpClient.put<MascotaApiRaw | ApiResponse<MascotaApiRaw>>(
    `/mascotas/${id}`,
    payload,
  );
  return normalizeMascota(unwrapApiData(response.data));
};

export const deleteMascota = async (id: number) => {
  await httpClient.delete(`/mascotas/${id}`);
};
