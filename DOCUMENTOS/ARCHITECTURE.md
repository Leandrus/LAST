# Technical Architecture: Team LAST

## 1. Tech Stack
- **Framework:** Next.js 14+ (App Router).
- **Styling:** Tailwind CSS.
- **Componentes:** shadcn/ui (personalizado para estética Dark/Glassmorphism).
- **Backend/Database:** Supabase (PostgreSQL).
- **Auth:** Supabase Auth (Magic Links & Social).
- **State Management:** TanStack Query (para manejo de APIs y caché).

## 2. Estrategia de Datos (Hybrid API)
Para mantener la web viva sin depender 100% de servicios externos:
1. La app consulta la API externa (iRacing/SimGrid).
2. Si la respuesta es exitosa, se actualiza la base de datos local en Supabase.
3. Si la API falla o hay rate-limiting, la app sirve los datos desde Supabase (Last Known Good State).

## 3. Estructura de Directorios
```text
/src
  /app (Routes & Pages)
  /components (Atomic design: ui, layout, cards)
  /lib (API wrappers, Supabase client)
  /hooks (Custom data fetching)
  /types (TypeScript definitions)

## 4. Seguridad
- Rutas protegidas mediante Middleware de Next.js.
- Row Level Security (RLS) en Supabase para el área de Setups y Telemetría.
