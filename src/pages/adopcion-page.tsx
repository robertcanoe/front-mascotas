import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { createAdopcion } from "../features/adopciones/api";
import { adopcionSchema, type AdopcionFormValues } from "../features/adopciones/schema";
import { getApiErrorMessage } from "../lib/errors/api-error";

export const AdopcionPage = () => {
  const { register, handleSubmit, formState, reset } = useForm<AdopcionFormValues>({
    resolver: zodResolver(adopcionSchema),
    defaultValues: { mensaje: "" },
  });

  const mutation = useMutation({
    mutationFn: createAdopcion,
    onSuccess: () => {
      toast.success("Solicitud enviada correctamente.");
      reset();
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });

  return (
    <section>
      <h1>Solicitud de adopcion</h1>
      <form className="form" onSubmit={handleSubmit((values) => mutation.mutate(values))}>
        <label className="field">
          ID de mascota
          <input type="number" {...register("mascota_id")} />
          <span className="error-text">{formState.errors.mascota_id?.message}</span>
        </label>
        <label className="field">
          Nombre solicitante
          <input {...register("solicitante")} />
          <span className="error-text">{formState.errors.solicitante?.message}</span>
        </label>
        <label className="field">
          Email
          <input type="email" {...register("email")} />
          <span className="error-text">{formState.errors.email?.message}</span>
        </label>
        <label className="field">
          Mensaje
          <textarea rows={4} {...register("mensaje")} />
        </label>
        <button disabled={mutation.isPending} type="submit">
          {mutation.isPending ? "Enviando..." : "Enviar solicitud"}
        </button>
      </form>
    </section>
  );
};
