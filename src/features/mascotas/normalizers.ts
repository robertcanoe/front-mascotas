import type { Mascota, MascotaApiRaw } from "./types";

export const normalizeMascota = (raw: MascotaApiRaw): Mascota => ({
  ...raw,
  id: Number(raw.id),
  edad: Number(raw.edad),
});
