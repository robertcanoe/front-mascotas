import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

import { EmptyState, ErrorState, LoadingState } from "../components/ui/states";
import { useMascotasQuery } from "../features/mascotas/queries";
import { getApiErrorMessage } from "../lib/errors/api-error";

export const HomePage = () => {
  const [search, setSearch] = useState("");
  const mascotasQuery = useMascotasQuery();

  const filteredMascotas = useMemo(() => {
    const term = search.toLowerCase().trim();
    if (!term) return mascotasQuery.data ?? [];
    return (mascotasQuery.data ?? []).filter(
      (m) => m.nombre.toLowerCase().includes(term) || m.especie.toLowerCase().includes(term),
    );
  }, [mascotasQuery.data, search]);

  if (mascotasQuery.isLoading) return <LoadingState text="Cargando mascotas..." />;
  if (mascotasQuery.isError) {
    return (
      <ErrorState
        title="No pudimos cargar mascotas"
        message={getApiErrorMessage(mascotasQuery.error)}
      />
    );
  }

  return (
    <section>
      <h1>Listado de mascotas</h1>
      <label className="field">
        Buscar por nombre o especie
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Ej: Luna o perro"
        />
      </label>

      {filteredMascotas.length === 0 ? (
        <EmptyState title="Sin resultados" message="No hay mascotas para ese filtro." />
      ) : (
        <div className="cards-grid">
          {filteredMascotas.map((mascota) => (
            <article className="card" key={mascota.id}>
              <img src={mascota.foto_url} alt={`Foto de ${mascota.nombre}`} />
              <div>
                <h2>{mascota.nombre}</h2>
                <p>
                  {mascota.especie} · {mascota.edad} anios
                </p>
                <p>{mascota.descripcion}</p>
                <Link to={`/mascotas/${mascota.id}`}>Ver detalle</Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
