import { useQuery } from "@tanstack/react-query";

import { getMascotaById, getMascotas } from "./api";

export const mascotasQueryKey = ["mascotas"] as const;

export const useMascotasQuery = () => {
  return useQuery({
    queryKey: mascotasQueryKey,
    queryFn: getMascotas,
  });
};

export const useMascotaDetailQuery = (id: number) => {
  return useQuery({
    queryKey: [...mascotasQueryKey, id],
    queryFn: () => getMascotaById(id),
    enabled: Number.isFinite(id),
  });
};
