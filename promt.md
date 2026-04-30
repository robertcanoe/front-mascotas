# PROMPT PARA OTRA IA: CLIENTE REACT CONSUMIENDO API MASCOTAS

Actua como un senior frontend engineer especializado en React + TypeScript.

Tu tarea es construir el **cliente web** en un repositorio nuevo, consumiendo esta API REST ya desplegada:

- Base URL produccion: `https://api-mascotas-70fo.onrender.com`

No implementes backend ni modifiques la API. Solo cliente frontend.

## 0) Regla obligatoria de pautas del proyecto

Antes de implementar nada, lee y respeta las pautas definidas en la carpeta `.agents/skills` del proyecto origen, en especial:

- `.agents/skills/mvc_procedimiento.md`

Usa esas pautas como contrato tecnico (estructura, convenciones, seguridad y calidad). Si una decision de implementacion entra en conflicto, prioriza las pautas de `.agents/skills`.

## 1) Requisitos de arquitectura frontend

- Stack: React + TypeScript + Vite.
- Gestion de estado: React Query (TanStack Query) para data fetching.
- Routing: React Router.
- Formularios: React Hook Form + validacion con Zod.
- HTTP client: `fetch` o `axios` (elige uno y manten coherencia).
- Estilos: limpio y responsive (Tailwind o CSS Modules, elige uno).
- Manejo de errores global y estados loading/empty/error por pantalla.
- Variables de entorno: `VITE_API_BASE_URL`.
- No hardcodear URLs fuera de config.

## 2) Endpoints de la API (contrato)

### Publicos
- `GET /`
  - Info de la API.
- `GET /health`
  - Estado del servicio.
- `GET /mascotas`
  - Lista de mascotas activas.
- `GET /mascotas/{id}`
  - Detalle de mascota.
- `POST /adopciones`
  - Crea solicitud de adopcion.
- `POST /auth/login`
  - Devuelve JWT.

### Admin (requieren JWT Bearer)
- `POST /mascotas`
- `PUT /mascotas/{id}`
- `DELETE /mascotas/{id}`

### Headers importantes
- `Content-Type: application/json` en requests con body JSON.
- `Authorization: Bearer <token>` en rutas admin.

## 3) Credenciales de ejemplo para desarrollo

Usa este login para obtener token:

- email: `admin@protectora.local`
- password: `Admin1234!`

El login devuelve `data.token`. Debes guardarlo y reutilizarlo en rutas admin.

## 4) Estructura funcional esperada en el cliente

Implementa estas vistas/paginas:

1. **Home/Listado de mascotas**
   - Carga `GET /mascotas`.
   - Buscador por nombre/especie.
   - Tarjetas con nombre, especie, edad, descripcion y foto.
   - Link a detalle.

2. **Detalle de mascota**
   - Carga `GET /mascotas/{id}`.
   - Maneja `404` mostrando estado amigable.

3. **Formulario de adopcion**
   - `POST /adopciones`.
   - Campos:
     - `mascota_id` (number)
     - `solicitante` (string)
     - `email` (string)
     - `mensaje` (string opcional)
   - Mostrar feedback de exito/error.

4. **Login admin**
   - `POST /auth/login`.
   - Guardar token en memoria + `localStorage` (con estrategia clara).
   - Logout.

5. **Panel admin mascotas**
   - Crear mascota (`POST /mascotas`)
   - Editar mascota (`PUT /mascotas/{id}`)
   - Eliminar mascota (`DELETE /mascotas/{id}`)
   - Si hay `401`, redirigir a login y limpiar token.

## 5) Tipado de datos sugerido (TypeScript)

Define interfaces/types para:

- `Mascota`
  - `id: number | string`
  - `nombre: string`
  - `especie: string`
  - `edad: number | string`
  - `foto_url: string`
  - `descripcion: string`
- `AuthLoginResponse`
  - `message: string`
  - `data.token: string`
  - `data.token_type: "Bearer"`
  - `data.expires_in: number`
  - `data.user: { id, nombre, email, rol }`
- `ApiError`
  - `error: string`
  - `message?: string`
  - `details?: Record<string, string | string[]>`

Incluye normalizadores cuando el backend devuelva numericos como string.

## 6) Requisitos de UX y robustez

- Skeleton/loading en cada llamada.
- Pantalla vacia si no hay mascotas.
- Toasts para success/error.
- Botones deshabilitados durante submit.
- Reintento controlado en queries (no infinito).
- Manejo centralizado de errores HTTP.

## 7) Seguridad y autenticacion en frontend

- No exponer secretos.
- Token solo cliente.
- Interceptor/middleware HTTP para inyectar Bearer automaticamente.
- En `401`, invalidar sesion y redirigir.

## 8) Entregables esperados

1. Estructura del proyecto creada.
2. Todas las pantallas funcionales con la API real.
3. README con:
   - instalacion
   - variables `.env`
   - scripts
   - flujo de login
4. Coleccion de ejemplos de peticiones desde app.
5. Breve lista de mejoras futuras.

## 9) Criterios de aceptacion

- El usuario puede listar y ver detalle de mascotas.
- Puede enviar adopciones desde formulario.
- Puede hacer login y operar CRUD admin con JWT.
- Los errores de red/API se muestran correctamente.
- El proyecto compila y corre con `npm run dev` y `npm run build`.

## 10) Nota final para la IA

Primero genera la estructura y tipos, despues capa API, luego pantallas, luego auth/admin.
Trabaja por pasos pequenos y verifica cada endpoint real antes de avanzar.
