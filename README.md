# Cliente React Mascotas

Cliente web en React + TypeScript para consumir la API de mascotas en:

- `https://api-mascotas-70fo.onrender.com`

## Instalacion

```bash
pnpm install
cp .env.example .env
pnpm dev
```

## Variables de entorno

Archivo `.env`:

```env
VITE_API_BASE_URL=https://api-mascotas-70fo.onrender.com
```

## Scripts

- `pnpm dev`: levanta el cliente en desarrollo.
- `pnpm build`: construye para produccion.
- `pnpm lint`: ejecuta ESLint.
- `pnpm preview`: sirve la build local.

## Flujo de login admin

1. Ir a `/login`.
2. Enviar credenciales admin (`admin@protectora.local` / `Admin1234!`).
3. El token JWT se guarda en memoria + `localStorage`.
4. Acceder a `/admin` para crear/editar/eliminar mascotas.
5. Si la API responde `401`, la sesion se limpia y el usuario vuelve a login.

## Endpoints usados desde la app

- Publicos:
  - `GET /mascotas`
  - `GET /mascotas/{id}`
  - `POST /adopciones`
- Auth:
  - `POST /auth/login`
- Admin (Bearer):
  - `POST /mascotas`
  - `PUT /mascotas/{id}`
  - `DELETE /mascotas/{id}`

## Mejoras futuras

- Formulario admin dedicado para editar con preview de cambios por campo.
- Paginacion/filtros server-side cuando el listado crezca.
- Tests E2E para flujos clave (listado, adopcion, login y CRUD admin).
