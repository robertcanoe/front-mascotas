export type Mascota = {
  id: number;
  nombre: string;
  especie: string;
  edad: number;
  foto_url: string;
  descripcion: string;
};

export type MascotaApiRaw = {
  id: number | string;
  nombre: string;
  especie: string;
  edad: number | string;
  foto_url: string;
  descripcion: string;
};

export type MascotaPayload = {
  nombre: string;
  especie: string;
  edad: number;
  foto_url: string;
  descripcion: string;
};
