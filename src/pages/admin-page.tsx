import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useState } from "react";

import { createMascota, deleteMascota, updateMascota } from "../features/mascotas/api";
import { mascotasQueryKey, useMascotasQuery } from "../features/mascotas/queries";
import type { Mascota } from "../features/mascotas/types";
import { getApiErrorMessage } from "../lib/errors/api-error";
import { LoadingState } from "../components/ui/states";

const mascotaSchema = z.object({
  nombre: z.string().min(2),
  especie: z.string().min(2),
  edad: z.coerce.number().int().nonnegative(),
  foto_url: z.string().url(),
  descripcion: z.string().min(5),
});

type MascotaValues = z.infer<typeof mascotaSchema>;

export const AdminPage = () => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const mascotasQuery = useMascotasQuery();
  const { register, handleSubmit, reset, formState } = useForm<MascotaValues>({
    resolver: zodResolver(mascotaSchema),
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: mascotasQueryKey });

  const createMutation = useMutation({
    mutationFn: createMascota,
    onSuccess: () => {
      toast.success("Mascota creada.");
      reset();
      void invalidate();
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: number; values: MascotaValues }) => updateMascota(id, values),
    onSuccess: () => {
      toast.success("Mascota actualizada.");
      void invalidate();
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMascota,
    onSuccess: () => {
      toast.success("Mascota eliminada.");
      void invalidate();
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });

  const loadForEdit = (mascota: Mascota) => {
    setEditingId(mascota.id);
    reset({
      nombre: mascota.nombre,
      especie: mascota.especie,
      edad: mascota.edad,
      foto_url: mascota.foto_url,
      descripcion: mascota.descripcion,
    });
  };

  if (mascotasQuery.isLoading) return <LoadingState text="Cargando panel admin..." />;

  return (
    <section>
      <h1>Panel admin mascotas</h1>
      <form
        className="form"
        onSubmit={handleSubmit((values) => {
          if (editingId) {
            updateMutation.mutate({ id: editingId, values });
            return;
          }
          createMutation.mutate(values);
        })}
      >
        <label className="field">
          Nombre
          <input {...register("nombre")} />
          <span className="error-text">{formState.errors.nombre?.message}</span>
        </label>
        <label className="field">
          Especie
          <input {...register("especie")} />
          <span className="error-text">{formState.errors.especie?.message}</span>
        </label>
        <label className="field">
          Edad
          <input type="number" {...register("edad")} />
          <span className="error-text">{formState.errors.edad?.message}</span>
        </label>
        <label className="field">
          Foto URL
          <input {...register("foto_url")} />
          <span className="error-text">{formState.errors.foto_url?.message}</span>
        </label>
        <label className="field">
          Descripcion
          <textarea rows={3} {...register("descripcion")} />
          <span className="error-text">{formState.errors.descripcion?.message}</span>
        </label>
        <button disabled={createMutation.isPending || updateMutation.isPending} type="submit">
          {editingId
            ? updateMutation.isPending
              ? "Actualizando..."
              : "Actualizar mascota"
            : createMutation.isPending
              ? "Guardando..."
              : "Crear mascota"}
        </button>
        {editingId ? (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              reset();
            }}
          >
            Cancelar edicion
          </button>
        ) : null}
      </form>

      <div className="cards-grid">
        {(mascotasQuery.data ?? []).map((mascota) => (
          <article key={mascota.id} className="card">
            <img src={mascota.foto_url} alt={`Foto de ${mascota.nombre}`} />
            <h2>{mascota.nombre}</h2>
            <p>{mascota.especie}</p>
            <div className="card-actions">
              <button type="button" onClick={() => loadForEdit(mascota)}>
                Cargar en formulario
              </button>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("Eliminar mascota?")) {
                    deleteMutation.mutate(mascota.id);
                  }
                }}
              >
                Eliminar
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
