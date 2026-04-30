import { Link, useParams } from "react-router-dom";

import { ErrorState, LoadingState } from "../components/ui/states";
import { useMascotaDetailQuery } from "../features/mascotas/queries";
import { getApiErrorMessage } from "../lib/errors/api-error";

export const MascotaDetailPage = () => {
  const params = useParams();
  const id = Number(params.id);
  const detailQuery = useMascotaDetailQuery(id);

  if (detailQuery.isLoading) return <LoadingState text="Cargando detalle..." />;

  if (detailQuery.isError) {
    const status = detailQuery.error.status;
    if (status === 404) {
      return (
        <ErrorState
          title="Mascota no encontrada"
          message="La mascota que buscas no existe o fue removida."
          action={<Link to="/">Volver al listado</Link>}
        />
      );
    }
    return (
      <ErrorState title="Error al cargar detalle" message={getApiErrorMessage(detailQuery.error)} />
    );
  }

  const mascota = detailQuery.data;
  return (
    <article className="detail">
      <img src={mascota.foto_url} alt={`Foto de ${mascota.nombre}`} />
      <div>
        <h1>{mascota.nombre}</h1>
        <p>
          {mascota.especie} · {mascota.edad} anios
        </p>
        <p>{mascota.descripcion}</p>
        <Link to="/adopciones">Quiero adoptar</Link>
      </div>
    </article>
  );
};
